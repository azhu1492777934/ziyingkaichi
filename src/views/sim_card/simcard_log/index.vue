<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>

        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('simcard_log.imsi')" v-model="listQuery.q.imsi" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('simcard_log.iccid')" v-model="listQuery.q.iccid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="8">
          <el-date-picker style="width: 100%;"
                          v-model="listQuery.q.insertDateRange"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          :start-placeholder="$t('simcard_log.insertTime')" :end-placeholder="$t('simcard_log.insertTime')">
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button style="margin-left: 10px" type="primary" icon="search" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>

    </div>

    <br/>
    <!-- 列表-start -->
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        prop="imsi"
        v-bind:label="$t('simcard_log.imsi')"
        width="140">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/ts_imsi_log_list?imsi=' + scope.row.imsi" target="_blank">{{ scope.row.imsi }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="iccid"
        v-bind:label="$t('simcard_log.iccid')"
        width="180">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/imsi_list?imsi=' + scope.row.imsi" target="_blank">{{ scope.row.iccid }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="type"
        v-bind:label="$t('simcard_log.type')"
        width="120">
      </el-table-column>

      <el-table-column
        prop="beforeStatusCn"
        v-bind:label="$t('simcard_log.beforeStatusCn')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="afterStatusCn"
        v-bind:label="$t('simcard_log.afterStatusCn')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="insertTimeCn"
        v-bind:label="$t('simcard_log.insertTimeCn')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="describe"
        v-bind:label="$t('simcard_log.describe')"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="140"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="small" v-show="scope.row.canRecover" @click="handelRecover(scope.row.imsi,scope.row.beforeStatus,scope.row.beforeStatusCn)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->

  </div>
</template>


<script>

  import { modelList,modelRecover} from 'api/sim_card/simcard_log';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          perPage: 100,
          q: {
            imsi: undefined,
            iccid: undefined,
            insertDateRange: undefined,
          }
        },
      }
    },
    created() {
      this.getList();
    },
    methods: {

      resetFilter() {
        this.listQuery.q.imsi = ''
        this.listQuery.q.iccid = ''
        this.listQuery.q.insertDateRange = ''
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
      },

      handelRecover(imsi,afterStatus,afterStatusCn) {
        this.$confirm('此操作将恢复卡: ' + imsi + '的状态到故障前 ' + afterStatusCn+ ' 状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.listLoading = true;
          modelRecover(imsi,afterStatus).then(response => {
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '恢复成功',
                type: 'success',
                duration: _const.messageDuration,
                showClose: true
              });
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消恢复操作',
            duration: _const.messageDuration,
            showClose: true
          });
        });
      },
      getList() {
        this.listLoading = true;
        modelList(this.listQuery).then(response => {
          const res = response.data;
          if (res.status > 0) {
            const data = res.data;
            this.list = data.list;
            this.total = data.extra.totalCount;
          }
          this.listLoading = false
        })

        // if (!this.list) {
        //   this.getList()
        // }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #basicData_search_index {
    font-size: 12px;
    .buttonStyle{
      display: inline-block;
    }
  }
</style>
