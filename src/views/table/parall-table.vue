<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-row style="line-height: 30px">
          <el-col :span="6">
            <i class="el-icon-s-grid">漏洞模板</i>
          </el-col>
          <el-col :span="4" :offset="14">
            <el-button type="plain" size="mini">增加模板</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="tableData1"
            stripe
            style=""
            @select="handleSelect"
          >
            <el-table-column type="selection" />
            <el-table-column
              prop="name"
              label="模板名称"
              width="400"
            />
            <el-table-column
              prop="operator"
              label="操作"
              width=""
            />
          </el-table>
        </el-row>
      </el-col>

      <el-col :span="8">
        <div style="line-height:30px">
          <i class="el-icon-s-order">漏洞类别</i>
        </div>
        <el-table
          :data="tableData2"
          stripe
          style=""
        >
          <el-table-column type="selection" />
          <el-table-column
            label="类别名称"
            width=""
          >
            <template slot-scope="{row}">
              <el-button type="success" size="mini"><i class="el-icon-check">已启用</i></el-button>
              <span style="padding-left: 10px">{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="total"
            label="总计"
            width=""
          />
        </el-table>
      </el-col>

      <el-col :span="8">
        <el-row style="line-height: 25px">
          <el-col :span="10">
            <el-checkbox-group v-model="checklist" @change="handleCheckList">
              <el-checkbox label="1">高</el-checkbox>
              <el-checkbox label="2">中</el-checkbox>
              <el-checkbox label="3">低</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="11" :offset="3">
            <el-input v-model="search" placeholder="搜索名称/编号/CVE/CNNVD" size="mini">
              <el-button slot="append" icon="el-icon-search" />
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="tableData3"
            stripe
            style=""
          >
            <el-table-column type="selection" />
            <el-table-column
              prop="name"
              label="漏洞名称"
              width=""
            />
          </el-table>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData1: [{
        operator: '--',
        name: '人大金仓数据库漏洞',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        operator: '--',
        name: '达梦数据库漏洞',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        operator: '--',
        name: '国产系统和软件漏洞',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        operator: '--',
        name: 'P2P安全漏洞',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableData2: [{
        total: '123',
        name: 'linux本地安全'
      }, {
        total: '252',
        name: 'unix本地安全'
      }, {
        total: '114',
        name: 'window本地安全'
      }, {
        total: '222',
        name: '其它'
      }
      ],
      tableData3: [{
        name: 'Portable OpenSSH \'ssh-keysig\'本地未授权访问漏洞(CNVD-2011-1725)'
      }, {
        name: 'OpenSSH\'ssh/kex.c\'拒绝服务漏洞（CVE-2016-8858）'
      }, {
        name: 'Fastjson远程代码执行漏洞(fastjson 1.2.6)'
      }, {
        name: '检测到华为摄像头设备正在运行'
      }, {
        name: 'Tomcat源码包servlets-examples未删除【POC】'
      }
      ],
      checklist: [],
      search: ''
    }
  },
  methods: {
    handleSelect(select, row) {
      console.log(select)
      console.log(row)
    },
    handleCheckList() {
      console.log(this.checklist)
    }
  }
}
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .bg-purple-dark {
    background-color: #d0d0d0;
  }

  .bg-purple-light {
    background-color: #4d4d4d;
  }

  .bg-purple {
    background-color: #000000;
  }
</style>
