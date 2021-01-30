<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal_sim_log.imsi')"
                    v-model="listQuery.q.imsi" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
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
      max-height="640"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="tsid"
        v-bind:label="$t('terminal_sim_log.tsid')"
        width="120">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/tsid_list?tsid=' + scope.row.tsid" target="_blank">{{ scope.row.tsid }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('terminal_sim_log.imsi')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="dateCn"
        v-bind:label="$t('terminal_sim_log.dateCn')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="beatTimeCn"
        v-bind:label="$t('terminal_sim_log.beatTimeCn')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="result"
        v-bind:label="$t('terminal_sim_log.result')"
        width="">
      </el-table-column>
    </el-table>
    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
  </div>
</template>


<script>
  import { logList } from 'api/terminal/terminal_sim';
  import * as moment from 'moment';

  export default {
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          perPage: 100,
          q: {
            imsi: this.$route.query.imsi,
          }
        },
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        if (this.listQuery.q.imsi != undefined) {
          this.listLoading = true;
          logList(this.listQuery).then(response => {
            const res = response.data;
            if (res.status > 0) {
              const data = res.data;
              this.list = data.list;
              this.total = res.data.extra.totalCount;
            }
            this.listLoading = false
          })
        }
      },

      
      handleFilter() {
        this.getList();
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
