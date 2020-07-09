<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2">
        <span>新建任务类型</span>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-checkbox-group v-model="checklist" @change="handleCheckList">
          <el-checkbox label="1">系统扫描</el-checkbox>
          <el-checkbox label="2">web扫描</el-checkbox>
          <el-checkbox label="3">口令猜解</el-checkbox>
          <el-checkbox label="4">仅做基础探测</el-checkbox>
        </el-checkbox-group>
      </el-col>
      <el-col :span="8" :offset="2">
        <span>提示：如勾选仅做基础探测，则不进行漏洞扫描，仅探测资产存活状态和端口开放情况</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <span>扫描目标方式</span>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-radio-group v-model="radio">
          <el-radio :label="1">手动输入</el-radio>
          <el-radio :label="2">使用资产</el-radio>
          <el-radio :label="3">批量导入</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="8" :offset="2" />
    </el-row>
    <el-row v-if="radio=='1'">
      <el-col :span="2">
        <span>扫描目标</span>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="2"
        />
      </el-col>
      <el-col :span="8" :offset="2">
        <span>扫描目标填写规范：</span><br>
        <span>IP示例：</span><br>
        <span>IP段示例：</span><br>
        <span>域名示例：</span><br>
        <span>URL示例：</span><br>
        <span>排除某个IP：</span><br>
        <span>多个之间以英文逗号(,)隔开</span>
      </el-col>
    </el-row>
    <el-row v-if="radio=='2'">
      <el-col :span="2">
        <span>资产名称</span>
      </el-col>
      <el-col :span="10" :offset="2" />
      <el-col :span="8" :offset="2">
        <span>提示：选定资产组后，其组下的所有资产全部选定</span>
        <span>提示：选定资产组后，其组下的所有资产全部选定</span>
      </el-col>
    </el-row>
    <el-row v-if="radio==3" />
  </div>
</template>

<script>
export default {
  name: 'Newtask',
  data() {
    return {
      checklist: [],
      radio: '',
      textarea: ''

    }
  },
  methods: {
    handleCheckList() {

    }

  }
}
</script>

<style scoped>

</style>
