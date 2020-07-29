<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8" :offset="8">
        <template v-for="asset in assetListNum">
          <label>{{ asset.name }}</label>
          <el-tag :type="asset.type" class="asset">{{asset.num}}</el-tag>
        </template>
      </el-col>
    </el-row>

    <el-form ref="form" class="form"  :model="formData">
      <el-row :gutter="2">
        <el-col :span="6">
          <el-input style="width: 358px" v-model="formData.input1" placeholder="请输入内容" class="input-with-select">
            <el-select slot="prepend" v-model="formData.select" placeholder="请选择">
              <el-option label="全部字段" value="1"/>
              <el-option label="资产名称" value="2"/>
              <el-option label="资产IP" value="3"/>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="6">
          <select-super v-model="formData.input2" :selectList="osList" searchValue="操作系统" :selects.sync="input2"></select-super>
        </el-col>
        <el-col :span="6">
          <select-super v-model="formData.input3" :selectList="macList" searchValue="mac地址"
                        :selects.sync="input3"></select-super>
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
          <select-super v-model="formData.input4" :selectList="groupList" searchValue="资产组"
                        :selects.sync="input4"></select-super>
        </el-col>
        <el-col :span="6">
          <select-super multiple v-model="formData.select1" :selectList="tags" searchValue="标签"
                        :selects.sync="select1"></select-super>
        </el-col>
        <el-col :span="6">
          <el-tag class="score" type="info">评分</el-tag>
          <el-rate v-model="formData.score" @change="handleChange"/>
        </el-col>
        <el-col :span="6"/>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="8">
        <el-row>
          <i class="el-icon-share">资产</i>
        </el-row>
        <el-row>
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange">
          </el-tree>
        </el-row>

      </el-col>
      <el-col :span="16">
        <el-row>
          <el-tabs @tab-click="handleClick" v-model="activeName">
            <el-tab-pane label="资产属性" name="first">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-for="prop in property" :title="prop.title" :name="prop.num">
                  <div>{{prop.content}}</div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="漏洞详情" name="second">
              <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="level"
                  label="风险等级"
                  width="180">
                   <template slot-scope="{row}">
                    <el-tag :type="row.level|levelFilter" size="mini">{{ levelMessage(row.level) }}</el-tag>
                   </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="漏洞名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="所属分类">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import SelectSuper from '@/components/SelectSuper'
  export default {
    components: {SelectSuper},
    name: 'Asset',
    filters: {
    levelFilter(level) {
      const statusMap = {
        1: 'danger',
        2: 'warn',
        3: 'info'
      }
      return statusMap[level]
    }
  },
    data() {
      return {
        formData: {
          input1: '',
          input2: 'redhat',
          input3: '',
          input4: '',
          select: '1',
          score: '',
          select1: []
        },
        dropFlag: false,
        activeNames: ['1'],
        assetListNum: [
          {'name': '全部资产', 'type': 'success', num: 200},
          {'name': '主机资产', 'type': 'danger', num: 60},
          {'name': 'WEB资产', 'type': 'primary', num: 140}
        ],
        osList: [
          {'name': 'redhat'},
          {'name': 'windows'},
          {'name': 'centos'}
        ],
        macList: [
          {'name': '00-50-56-C0-00-01'},
          {'name': '00-50-56-C0-00-02'},
          {'name': '00-50-56-C0-00-03'}
        ],
        groupList: [
          {'id': 1, 'name': '资产组1'},
          {'id': 2, 'name': '资产组2'},
          {'id': 3, 'name': '资产组3'}
        ],
        tags: [
          {'label': 'A', 'name': 'A'},
          {'label': 'B', 'name': 'B'},
          {'label': 'C', 'name': 'C'}
        ],
        property: [
          { 'title': '主机名称', 'content': 'test.vuweb.com', 'num': 1 },
          { 'title': 'ip地址', 'content': '69.172.201.153', 'num': 2 },
          { 'title': '操作系统', 'content': 'linux', 'num': 3 },
        ],
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1,
        activeName: 'first',
        tableData: [
          { 'level': 1, 'name': 'xxx', 'type': 'a' },
          { 'level': 2, 'name': 'xxx', 'type': 'b' },
          { 'level': 3, 'name': 'xxx', 'type': 'c' }
        ],
      }
    },
    methods: {
      handleClear() {
        this.$refs.form.resetFields()
      },
      handleChange(val) {
        console.log(this.score)
      },
      handleDrop(val) {
        this.dropFlag = val;
      },

      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{name: 'region1'}, {name: 'region2'}]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }
          resolve(data);
        }, 500);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      levelMessage(level) {
      const message = {
        1: '高危',
        2: '中危',
        3: '低危'
      }
      return message[level]
    },
    }
  }
</script>

<style scoped>
  .asset {
    margin-right: 10px;
  }

  .el-select {
    width: 110px;
  }

  .tag {
    display: inline;
  }

  .el-rate {
    display: inline;
  }

  .score {
    margin-top: 4px;
    width: 110px;
    height: 35px;
    position: relative;
    top: -4px;
    line-height: 26px;
    text-align: center;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .form {
    margin-top: 10px;
  }

  .el-row {
    margin-top: 10px;
  }
</style>
