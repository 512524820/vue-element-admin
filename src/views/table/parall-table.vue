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
            v-loading="tableData1.listLoading"
            :data="tableData1.list"
            stripe
            style=""
            @select="handleSelect"
          >
            <el-table-column type="selection" />
            <el-table-column
              prop="title"
              label="模板名称"
              width=""
            />
            <el-table-column
              prop="type"
              label="操作"
              width=""
            />
          </el-table>
        </el-row>
        <el-row>
          <el-col :span="8">
            <pagination v-show="tableData1.total>0" style="width: 100px" :total="tableData1.total" :page.sync="tableData1.query.page" :limit.sync="tableData1.query.limit" @pagination="getList1" />
          </el-col>
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
              <el-button v-if="row.status==1" type="success" size="mini" @click="handleModifyStatus(row)"><i class="el-icon-check">已启用</i></el-button>
              <el-button v-else type="danger" size="mini" @click="handleModifyStatus(row)"><i class="el-icon-check">已禁用</i></el-button>
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
            <el-input v-model="tableData3.query.title" placeholder="搜索名称/编号/CVE/CNNVD" size="mini" @keyup.enter.native="handleFilter">
              <el-button slot="append" icon="el-icon-search" @click="handleFilter" />
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            v-loading="tableData3.listLoading"
            :data="tableData3.list"
            stripe
            style=""
          >
            <el-table-column type="selection" />
            <el-table-column
              label="漏洞名称"
              width=""
            >
              <template slot-scope="{row}">
                <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="level"
              label="漏洞等级"
              width=""
            >
              <template slot-scope="{row}">
                <el-tag :type="row.level|levelFilter" size="mini">{{ levelMessage(row.level) }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-col :span="8">
            <pagination v-show="tableData3.total>0" style="width: 100px" :total="tableData3.total" :page.sync="tableData3.query.page" :limit.sync="tableData3.query.limit" @pagination="getList3" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog :title="titleMessage" :visible.sync="dialogFormVisible">
      <el-form label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="漏洞名称">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="漏洞等级">
          <el-select v-model="temp.level" class="filter-item" placeholder="Please select">
            <el-option v-for="item in levelOptions" :key="item.key" :value="item.key" :label="item.display_name" />
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="temp.author" />
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="temp.display_time" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchTest } from '@/api/article'
import Pagination from '@/components/Pagination'

const levelOptions = [
  { key: 1, display_name: '高危' },
  { key: 2, display_name: '中危' },
  { key: 3, display_name: '低危' }
]

export default {
  components: { Pagination },
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
      titleMessage: '漏洞详情',
      levelOptions,
      tableData1: {
        listLoading: true,
        list: null,
        total: 0,
        query: {
          page: 1,
          limit: 10,
          title: ''
        }
      },
      tableData2: [{
        total: '123',
        name: 'linux本地安全',
        status: 1
      }, {
        total: '252',
        name: 'unix本地安全',
        status: 1
      }, {
        total: '114',
        name: 'window本地安全',
        status: 1
      }, {
        total: '222',
        name: '其它',
        status: 1
      }
      ],
      tableData3: {
        listLoading: true,
        list: null,
        total: 0,
        query: {
          page: 1,
          limit: 10,
          title: '',
          checklist: ''
        }
      },
      search: '',
      checklist: [],
      temp: {
        title: '',
        level: '',
        author: '',
        display_time: ''
      },
      dialogFormVisible: false
    }
  },
  computed: {

  },
  created() {
    this.getList1()
    this.getList3()
  },
  methods: {
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogFormVisible = true
    },
    levelMessage(level) {
      const message = {
        1: '高危',
        2: '中危',
        3: '低危'
      }
      return message[level]
    },
    getList1() {
      this.tableData1.listLoading = true
      fetchTest(this.tableData1.query).then(response => {
        this.tableData1.list = response.data.items
        this.tableData1.total = response.data.total
        this.$nextTick(() => {
          this.tableData1.listLoading = false
        })
      })
    },
    getList3() {
      this.tableData3.listLoading = true
      fetchTest(this.tableData3.query).then(response => {
        this.tableData3.list = response.data.items
        this.tableData3.total = response.data.total

        // Just to simulate the time of the request
        this.tableData3.listLoading = false
      })
    },
    handleFilter() {
      this.tableData3.query.page = 1
      this.getList3()
    },
    handleSelect(select, row) {
      console.log(select)
      console.log(row)
    },
    handleCheckList() {
      this.tableData3.query.checklist = this.checklist.join()
      this.getList3()
      // console.log(this.tableData3.query.checklist)
    },
    handleModifyStatus(row) {
      row.status = !row.status
      // this.$message({
      //   message: '更改成功',
      //   type: 'success'
      // })
      this.$notify({
        title: '提示',
        message: '更改成功',
        type: 'success',
        duration: 2000
      })
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
