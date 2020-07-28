<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" :offset="8">
        <template v-for="asset in assetListNum" >
          <label :key="asset.name">{{ asset.name }}</label>
          <el-tag :key="asset.name" :type="asset.type" class="asset">{{asset.num}}</el-tag>
        </template>
      </el-col>
    </el-row>

    <el-form ref="form">
      <el-row :gutter="2">
        <el-col :span="6">
          <el-input v-model="input1" placeholder="请输入内容" class="input-with-select">
            <el-select slot="prepend" v-model="select" placeholder="请选择">
              <el-option label="全部字段" value="1" />
              <el-option label="资产名称" value="2" />
              <el-option label="资产IP" value="3" />
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="input2">
            <el-option v-for="os in osList" :label="os.name">{{ os.name }}</el-option>
            <template slot="prepend">操作系统</template>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="input3">
            <el-option v-for="mac in macList" :label="mac.name">{{ mac.name }}</el-option>
            <template slot="prefix">mac地址</template>
          </el-select>
        </el-col>
        <el-col :span="6">
          <i v-show="!dropFlag" class="el-icon-caret-bottom" @click="handleDrop(true)"></i>
          <i v-show="dropFlag" class="el-icon-caret-top" @click="handleDrop(false)"></i>
          <el-button type="primary">查询</el-button>
          <el-button plain @click="handleClear">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="2" v-show="dropFlag">
        <el-col :span="6">
          <el-select v-model="input4">
            <el-option v-for="group in groupList" :label="group.id">{{ group.name }}</el-option>
            <template slot="prefix">资产组</template>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="select1" multiple placeholder="请选择">
            <el-option
              v-for="tag in tags"
              :key="tag.value"
              :label="tag.label"
              :value="tag.value"
            />
            <template slot="prefix">标签</template>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-rate v-model="score" @change="handleChange" />
        </el-col>
        <el-col :span="6" />
      </el-row>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'Asset',
  data() {
    return {
      input2: '',
      input3: '',
      input4: '',
      input1: '',
      select: '1',
      dropFlag: false,
      assetListNum: [
        { 'name': '全部资产', 'type': 'success', num: 200 },
        { 'name': '主机资产', 'type': 'danger', num: 60 },
        { 'name': 'WEB资产', 'type': 'primary', num: 140 }
      ],
      osList: [
        { 'name': 'redhat' },
        { 'name': 'windows' },
        { 'name': 'centos' }
      ],
      macList: [
        { 'name': '00-50-56-C0-00-01' },
        { 'name': '00-50-56-C0-00-02' },
        { 'name': '00-50-56-C0-00-03' }
      ],
      groupList: [
        { 'id': 1, 'name': '资产组1' },
        { 'id': 2, 'name': '资产组2' },
        { 'id': 3, 'name': '资产组3' }
      ],
      select1: [],
      tags: [
        { 'label': 'A', 'value': 'A' },
        { 'label': 'B', 'value': 'B' },
        { 'label': 'C', 'value': 'C' }
      ],
      score: ''
    }
  },
  methods: {
    handleClear() {
      this.$refs.form
    },
    handleChange() {
      console.log(this.score)
    },
    handleDrop(val){
      this.dropFlag = val;
    },
  }
}
</script>

<style scoped>
  .asset{
    margin-right: 10px;
  }
  .el-select {
    width: 110px;
  }
</style>
