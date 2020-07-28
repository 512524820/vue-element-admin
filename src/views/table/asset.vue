<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" :offset="8">
        <template v-for="asset in assetListNum">
          <label>{{asset.name}}</label>
          <el-table type="{{asset.type}}">{{asset.num}}</el-table>
        </template>
      </el-col>
    </el-row>

    <el-form ref="form">
      <el-row :gutter="2">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="全部字段" value="1"></el-option>
              <el-option label="资产名称" value="2"></el-option>
              <el-option label="资产IP" value="3"></el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="input2">
            <el-option label="{{os.name}}" v-for="os in osList">{{os.name}}</el-option>
            <template slot="prefix">操作系统</template>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="input3">
            <el-option label="{{mac.name}}" v-for="mac in macList">{{mac.name}}</el-option>
            <template slot="prefix">mac地址</template>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-icon></el-icon>
          <el-button type="primary">查询</el-button>
          <el-button plain @click="handleClear">重置</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="2">
        <el-col :span="6">
          <el-select v-model="input4">
            <el-option label="{{group.id}}" v-for="group in groupList">{{group.name}}</el-option>
            <template slot="prefix">资产组</template>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="select1" multiple placeholder="请选择">
            <el-option
              v-for="tag in tags"
              :key="tag.value"
              :label="tag.label"
              :value="tag.value">
            </el-option>
            <template slot="prefix">标签</template>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-rate v-model="score" @change="handleChange"></el-rate>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
  export default {
    name: "asset",
    data() {
      return {
        input4: '',
        input1: '',
        assetListNum: [],
        osList: [
          {'name': 'redhat'},
          {'name': 'windows'},
          {'name': 'centos'},
        ],
        macList: [
          {'name': '00-50-56-C0-00-01'},
          {'name': '00-50-56-C0-00-02'},
          {'name': '00-50-56-C0-00-03'},
        ],
        groupList: [
          {'id': 1, 'name': '资产组1'},
          {'id': 2, 'name': '资产组2'},
          {'id': 3, 'name': '资产组3'}
        ],
        select1: [],
        tags: [
          {'label': 'A', 'value': 'A'},
          {'label': 'B', 'value': 'B'},
          {'label': 'C', 'value': 'C'}
        ],
        score: '',

      }
    },
    methods: {
      handleClear() {
        this.$refs.form
      },
      handleChange(){
        console.log(this.score);
      },
    }
  }
</script>

<style scoped>

</style>
