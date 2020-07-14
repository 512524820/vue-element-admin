<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-row style="line-height: 30px">
          <el-col :span="6">
            <i class="el-icon-s-grid">探测未知站点</i>
          </el-col>
          <el-col :span="4" :offset="14">
            <el-button type="plain" size="mini">增加</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            v-loading="listLoading"
            :data="list.aaData"
            stripe
            style=""
          >
            <el-table-column type="selection"/>
            <el-table-column
              label="任务名称"
              width=""
            >
              <template slot-scope="{row}">
                <el-link @click="handleClickLink(row)">{{ row[1] }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="检测目标"
              width=""
            >
              <template slot-scope="{row}">
                <el-link @click="handleClickLink(row)">{{ row[2] }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="开始时间"
              width=""
            >
              <template slot-scope="{row}">
                <span>{{ row[3] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="结束时间"
              width=""
            >
              <template slot-scope="{row}">
                <span>{{ row[4] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="检测耗时"
              width=""
            >
              <template slot-scope="{row}">
                <span>{{ row[5] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="进度"
              width=""
            >
              <template slot-scope="{row}">
                <el-progress
                  :text-inside="true"
                  :stroke-width="20"
                  :percentage="getProgress(row)"
                  :color="customColors"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width=""
            >
              <template slot-scope="{row}">
                <el-button v-show="row[7]==4" type="primary" @click="handleClickStatus(row,6)">立即执行</el-button>
                <el-button v-show="row[7]==6" type="danger" @click="handleClickStatus(row,4)">结束</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

      </el-col>
    </el-row>

    <el-dialog :title="titleMessage" :visible.sync="dialogFormVisible">
      <el-form label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-table
          v-loading="listLoading"
          :data="rowAll"
          stripe
          style=""
        >
          <el-table-column
            label="URL地址"
            width=""
          >
            <template slot-scope="{row}">
              <el-link>{{ row.url }}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="服务器特征"
            width=""
          >
            <template slot-scope="{row}">
              <el-link>{{ row.banner }}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row :gutter="5">
          <el-col :span="3">
            <el-button type="primary" @click="handleClickTask">
              转成任务
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="success" @click="handleClickGroup">
              转成资产组
            </el-button>
          </el-col>
          <el-col :span="3" :offset="15">
            <el-button type="danger" @click="dialogFormVisible = false">
              取消
            </el-button>
          </el-col>

        </el-row>

      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customColors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ],
        list:
          {
            'aaData': [
              [73, '\u63a2\u6d4b\u76ee\u6807-172.18.253.236', '172.18.253.236', '2020-07-13 14:41:23', '2020-07-13 14:41:48', '25\u79d2', '55-0-0-45', 6, 315, '1-65535', [], 'yangjing', 1],
              [68, '\u63a2\u6d4b\u76ee\u6807-120', '172.18.0.1-120', '2020-07-01 10:14:22', '2020-07-01 10:14:25', '3\u79d2', '100-0-0-0', 4, 236, '80,443,8080,3128,8081,9080', [], 'admin', 1],
              [67, '\u63a2\u6d4b\u76ee\u6807-808080', '172.18.0.1-50', '2020-06-30 10:58:00', '2020-06-30 10:58:03', '3\u79d2', '100-0-0-0', 4, 232, '80,443,8080,3128,8081,9080', [], 'admin', 1],
              [32, '\u63a2\u6d4b\u76ee\u6807-191', '172.18.191.1/24', '2020-05-26 14:45:25', '2020-05-26 14:45:50', '25\u79d2', '100-14-0-0', 4, 122, '80,443,8080,3128,8081,9080', [{
                'banner': 'HUAWEI',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.191.1:80/'
              }, {
                'banner': 'HUAWEI',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.1:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.12:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.16:443/'
              }, {
                'banner': 'nginx/1.15.11',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.191.19:80/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.19:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.27:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.57:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.68:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.69:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.89:443/'
              }, {
                'banner': 'NSFOCUS',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.102:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.140:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.191.209:443/'
              }], 'zhangxiao', 1],
              [6, '\u63a2\u6d4b\u76ee\u6807-18', '172.18.0.1/24', '2020-05-22 11:59:56', '2020-05-22 12:03:17', '3\u520621\u79d2', '100-73-0-0', 4, 95, '80,443,8080,3128,8081,9080,10001,10002,10003,10004,10005,10006,10007,10008,10009,10010,10011,10012', [{
                'banner': 'HUAWEI',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.1:80/'
              }, {
                'banner': 'HUAWEI',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.1:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.2:443/'
              }, {
                'banner': 'Apache/2.4.23 (Win32) OpenSSL/1.0.2h PHP/5.6.28',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.5:443/'
              }, {
                'banner': 'Apache/2.2.14 (Ubuntu) mod_mono/2.4.3 PHP/5.3.2-1ubuntu4.5 with Suhosin-Patch mod_python/3.3.1 Python/2.6.5 mod_perl/2.0.4 Perl/v5.10.1',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.10:80/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.21:443/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.23:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.30:443/'
              }, {
                'banner': 'Apache-Coyote/1.1',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.31:10003/'
              }, {
                'banner': 'Apache/2.4.7 (Ubuntu)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.31:10004/'
              }, {
                'banner': 'Apache/2.4.7 (Ubuntu)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.31:10005/'
              }, {
                'banner': 'Apache-Coyote/1.1',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.31:10008/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.34:443/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.35:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.36:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.39:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.41:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.50:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.55:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.58:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.59:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.60:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.66:443/'
              }, {
                'banner': 'RaySaas/1.6',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.78:80/'
              }, {
                'banner': 'RaySaas/1.6',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.78:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.83:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.91:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.96:443/'
              }, {
                'banner': 'Apache/2.4.29 (Ubuntu)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.107:80/'
              }, {
                'banner': 'Microsoft-IIS/6.0',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.125:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.127:443/'
              }, {
                'banner': 'Microsoft-IIS/7.5',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.128:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.136:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.137:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.142:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.143:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.144:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.166:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.166:443/'
              }, {
                'banner': 'Apache/2.2.31 (Unix) mod_ssl/2.2.31 OpenSSL/1.0.1e-fips',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.170:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.170:443/'
              }, {
                'banner': 'Apache/2.2.31 (Unix) mod_ssl/2.2.31 OpenSSL/1.0.1e-fips',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.170:8080/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.175:80/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.175:443/'
              }, {
                'banner': 'Apache/2.4.6 (CentOS) PHP/5.4.16',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.177:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.179:443/'
              }, {
                'banner': 'nginx/1.10.2',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.190:80/'
              }, {
                'banner': 'Apache-Coyote/1.1',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.198:8080/'
              }, {
                'banner': 'Microsoft-IIS/7.5',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.199:80/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.201:80/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.201:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.202:80/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.202:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.203:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.204:443/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.209:443/'
              }, {
                'banner': 'Apache/2.2.15 (CentOS)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.211:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.219:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.220:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.221:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.221:8080/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.222:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.223:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.224:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.229:443/'
              }, {
                'banner': 'nginx/1.14.0',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.252:443/'
              }, {
                'banner': 'Apache/2.4.7 (Ubuntu)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.252:10001/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.252:10007/'
              }, {
                'banner': 'Apache/2.4.7 (Ubuntu)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.252:10009/'
              }, {
                'banner': 'Apache/2.4.10 (Debian)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.252:10010/'
              }, {
                'banner': 'Apache/2.2.31 (Unix) mod_ssl/2.2.31 OpenSSL/1.0.1t DAV/2',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.252:10011/'
              }, {
                'banner': 'Apache/2.4.7 (Ubuntu)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.252:10012/'
              }, {
                'banner': 'Jetty(9.4.z-SNAPSHOT)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.253:8080/'
              }], 'zhangxiao', 1],
              [3, '\u63a2\u6d4b\u76ee\u6807-172all', '172.18.0.1/24', '2020-04-02 01:48:59', '2020-04-02 01:50:07', '1\u52068\u79d2', '100-60-0-0', 4, 3, '80,443,8080,3128,8081,9080', [{
                'banner': 'HUAWEI',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.1:80/'
              }, {
                'banner': 'HUAWEI',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.1:443/'
              }, {
                'banner': 'Apache/2.4.23 (Win32) OpenSSL/1.0.2h PHP/5.6.28',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.5:443/'
              }, {
                'banner': 'Apache/2.2.14 (Ubuntu) mod_mono/2.4.3 PHP/5.3.2-1ubuntu4.5 with Suhosin-Patch mod_python/3.3.1 Python/2.6.5 mod_perl/2.0.4 Perl/v5.10.1',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.9:80/'
              }, {
                'banner': 'Apache-Coyote/1.1',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.9:8080/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.20:443/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.21:443/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.23:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.26:443/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.35:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.41:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.45:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.46:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.50:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.58:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.64:443/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.75:443/'
              }, {
                'banner': 'RaySaas/1.6',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.78:80/'
              }, {
                'banner': 'RaySaas/1.6',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.78:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.83:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.99:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.102:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.103:443/'
              }, {
                'banner': 'Apache/2.4.33 (Unix)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.104:80/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.104:8080/'
              }, {
                'banner': 'Jetty(9.2.11.v20150529)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.104:8081/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.106:443/'
              }, {
                'banner': 'Apache/2.4.29 (Ubuntu)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.107:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.112:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.120:443/'
              }, {
                'banner': 'Microsoft-IIS/6.0',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.125:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.144:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.148:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.150:443/'
              }, {
                'banner': 'RaySaas/1.6',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.160:80/'
              }, {
                'banner': 'RaySaas/1.6',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.160:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.166:443/'
              }, {
                'banner': 'Apache/2.2.31 (Unix) mod_ssl/2.2.31 OpenSSL/1.0.1e-fips',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.170:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.170:443/'
              }, {
                'banner': 'Apache/2.2.31 (Unix) mod_ssl/2.2.31 OpenSSL/1.0.1e-fips',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.170:8080/'
              }, {
                'banner': 'Apache/2.4.6 (CentOS) PHP/5.4.16',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.177:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.179:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.182:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.189:443/'
              }, {
                'banner': 'nginx/1.10.2',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.190:80/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.201:80/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.201:443/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.202:80/'
              }, {
                'banner': '',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.202:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.203:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.206:443/'
              }, {
                'banner': 'Microsoft-IIS/7.5',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.208:80/'
              }, {
                'banner': 'Apache',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.209:443/'
              }, {
                'banner': 'Apache/2.2.15 (CentOS)',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.211:80/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.222:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.223:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.224:443/'
              }, {
                'banner': 'nginx',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.229:443/'
              }, {
                'banner': 'nginx/1.14.0',
                'is_web': true,
                'title': '',
                'url': 'http://172.18.0.252:80/'
              }, {
                'banner': 'nginx/1.14.0',
                'is_web': true,
                'title': '',
                'url': 'https://172.18.0.252:443/'
              }], 'lehua', 1]
            ],
            'iTotalDisplayRecords': 6,
            'iTotalRecords': 6,
            'sEcho': 58
          },
      listLoading: false,
      status: false,
      titleMessage: '探测详情',
      dialogFormVisible: false,
      rowAll: ''
    }
  },
  computed: {},
  methods: {
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    },
    async handleClickStatus(row, val) {
      row[13] = false
      this.$set(row, 7, val)
      if (val == 4) {
        const tmp = row[6]
        this.$set(row, 6, tmp)
        row[13] = true
        return
      }
      const progress = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
      for (const i in progress) {
        if (row[13]) break
        this.$set(row, 6, progress[i])
        await this.sleep(1000)
      }
    },
    getProgress(row) {
      return parseInt(row[6].split('-')[0])
    },
    handleClickLink(row) {
      this.rowAll = row
      this.dialogFormVisible = true
    },
    handleClickTask(row) {
      this.$router.push({ name: 'newtask', params: { userId: 123 }})
    },
  }
}
</script>

<style scoped>

</style>
