<template>
  <div class="app-container">
    <el-row class="row-group">
      <el-col :span="2">
        <span>新建任务类型</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-checkbox-group v-model="checklist" @change="handleCheckList">
          <el-checkbox label="1">系统扫描</el-checkbox>
          <el-checkbox label="2">web扫描</el-checkbox>
          <el-checkbox label="3">口令猜解</el-checkbox>
          <el-checkbox label="4">仅做基础探测</el-checkbox>
        </el-checkbox-group>
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row class="row-group">
      <el-col :span="2">
        <span>扫描目标方式</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-radio-group v-model="radio">
          <el-radio :label="1">手动输入</el-radio>
          <el-radio :label="2">使用资产</el-radio>
          <el-radio :label="3">批量导入</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="4" />
    </el-row>
    <el-row v-if="radio=='1'" class="row-group">
      <el-col :span="2">
        <span>扫描目标</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="6"
          @blur="handleBlur"
        />
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row v-if="radio=='2'" class="row-group">
      <el-col :span="2">
        <span>资产名称</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-transfer v-model="value" class="transfer" filterable :data="data" />
      </el-col>
      <el-col :span="4">
        <span />
        <span />
      </el-col>
    </el-row>
    <el-row v-if="radio=='3'" class="row-group">
      <el-col :span="2">
        <span>模板文件</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="filelist"
        >
          <el-input v-model="filename" size="mini">
            <el-button slot="append" icon="el-icon-upload2" />
          </el-input>
          <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500KB</div>
        </el-upload>
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row class="row-group">
      <el-col :span="2">
        <span>资产组名称</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-select v-model="assetgroupid" size="mini">
          <el-option
            v-for="item in assetgroup"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row class="row-group">
      <el-col :span="2">
        <span>任务名称</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-input v-model="taskname" size="mini" />
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row class="row-group">
      <el-col :span="2">
        <span>执行方式</span>
      </el-col>
      <el-col :span="5" :offset="2">
        <el-select v-model="exemethodid" size="mini">
          <el-option
            v-for="item in exemethod"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-col>
      <el-col v-if="exemethodid==2" :span="5">
        <el-date-picker
          v-model="valueDate"
          size="mini"
          type="datetime"
          :picker-options="pickerOptions"
          placeholder="选择日期"
        />
      </el-col>
      <el-col v-if="exemethodid==4" :span="4">
        <el-select v-model="weekid" size="mini">
          <el-option
            v-for="item in weekAll"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-col>
      <el-col v-if="exemethodid==5" :span="4">
        <el-select v-model="monthid" size="mini" filterable>
          <el-option
            v-for="item in monthAll"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-col>
      <el-col v-if="exemethodid==3||exemethodid==4||exemethodid==5" :span="4">
        <el-time-picker
          v-model="valueTime"
          size="mini"
          placeholder="任意时间点"
        />
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row v-if="sysVisible" class="row-group">
      <el-col :span="2">
        <span>系统漏洞模板</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-select v-model="systemplateid" size="mini" filterable>
          <el-option
            v-for="item in systemplateAll"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row v-if="webVisible" class="row-group">
      <el-col :span="2">
        <span>WEB漏洞模板</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-select v-model="webtemplateid" size="mini" filterable>
          <el-option
            v-for="item in webtemplateAll"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row class="row-group">
      <el-col :span="2">
        <span>分布式引擎</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-select v-model="powerid" size="mini" filterable>
          <el-option
            :key="1"
            label="默认"
            :value="1"
          />
          <el-option
            :key="2"
            label="local"
            :value="2"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row class="row-group">
      <el-col :span="2">
        <span>执行优先级别</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-select v-model="queid" size="mini" filterable>
          <el-option
            :key="1"
            label="低"
            :value="1"
          />
          <el-option
            :key="2"
            label="中"
            :value="2"
          />
          <el-option
            :key="3"
            label="高"
            :value="3"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row class="row-group">
      <el-col :span="2">
        <span>告警模板</span>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-select v-model="alarmid" size="mini" filterable>
          <el-option
            :key="1"
            label="无"
            :value="1"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <span />
      </el-col>
    </el-row>
    <el-row class="row-group" />
  </div>
</template>

<script>
export default {
  name: 'Newtask',
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `选择 ${i}`,
          disabled: false
        })
      }
      return data
    }
    const monthall = _ => {
      const data = []
      for (let i = 1; i <= 31; i++) {
        data.push({
          key: i,
          value: i + '号'
        })
      }
      return data
    }
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
      },
      checklist: [],
      radio: '',
      textarea: '',
      data: generateData(),
      value: [],
      filelist: [],
      valueDate: '',
      valueTime: '',
      filename: '',
      taskname: '',
      assetgroupid: 1,
      exemethodid: 1,
      weekid: 1,
      monthid: 1,
      systemplateid: 1,
      webtemplateid: 1,
      powerid: 1,
      alarmid: 1,
      queid: 1,
      assetgroup: [
        { 'key': 1, value: '默认资产组' },
        { 'key': 2, value: '系统组' },
        { 'key': 3, value: 'web组' },
        { 'key': 4, value: '数据库组' },
        { 'key': 5, value: '口令猜解组' }
      ],
      exemethod: [
        { 'key': 1, value: '立即执行' },
        { 'key': 2, value: '定时执行一次' },
        { 'key': 3, value: '每天执行一次' },
        { 'key': 4, value: '每周执行一次' },
        { 'key': 5, value: '每月执行一次' }
      ],
      weekAll: [
        { 'key': 1, value: '星期一' },
        { 'key': 2, value: '星期二' },
        { 'key': 3, value: '星期三' },
        { 'key': 4, value: '星期四' },
        { 'key': 5, value: '星期五' },
        { 'key': 6, value: '星期六' },
        { 'key': 7, value: '星期天' }
      ],
      systemplateAll: [
        { key: 1, value: '全部漏洞扫描' },
        { key: 2, value: 'windows安全漏洞' },
        { key: 3, value: '数据库安全' },
        { key: 4, value: '网络设备安全' },
        { key: 5, value: 'P2P安全漏洞' },
        { key: 6, value: '云安全漏洞' }
      ],
      webtemplateAll: [
        { key: 1, value: '全部漏洞扫描' },
        { key: 2, value: '高/中/低风险漏洞' },
        { key: 3, value: '高/中风险漏洞' },
        { key: 4, value: '高风险漏洞' }
      ],
      monthAll: monthall()
    }
  },
  created() {
    console.log(this.$router.params.userId)
  },
  computed: {
    sysVisible() {
      if (this.checklist.indexOf('1') >= 0) {
        return true
      } else {
        return false
      }
    },
    webVisible() {
      if (this.checklist.indexOf('2') >= 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleCheckList() {
      console.log(this.checklist)
      if (this.checklist.pop() === '4') {
        const tmp = ['4']
        this.checklist = tmp
      } else {
        const index = this.checklist.indexOf('4')
        this.checklist.splice(index, 1)
      }
    },
    handleSuccess(resp, file, filelist) {
      console.log('文件上传成功')
      this.filename = filelist[0].name
    },
    handleRemove(file, filelist) {
      this.$message.success('文件删除成功')
      this.filename = ''
    },
    handleExceed(file, filelist) {
      this.$message.warning('上传限制一个文件')
    },
    handleBlur(event) {
      this.taskname = this.textarea.split(',')[0]
    }
  }
}
</script>

<style scoped>
.row-group{
  min-height: 60px;
  margin-bottom: 10px;
}
  .transfer /deep/ .el-button{
    display: block;
    margin-bottom: 2px;
    margin-left: 0px;
  }
  span{
    font-size: 13px;
  }
</style>
