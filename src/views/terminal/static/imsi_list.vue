<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal_sim.imsi')"
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
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="date"
        v-bind:label="$t('flow_month.date')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('flow_month.imsi')"
        width="140">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/imsi_date_list?imsi=' + scope.row.imsi" target="_blank">{{ scope.row.imsi }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="maxFlow"
        align="right"
        v-bind:label="$t('flow_month.maxFlow')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="usedFlow"
        align="right"
        v-bind:label="$t('flow_month.usedFlow')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="residueFlow"
        align="right"
        v-bind:label="$t('flow_month.residueFlow')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="maxRoamFlow"
        align="right"
        v-bind:label="$t('flow_month.maxRoamFlow')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="usedRoamFlow"
        align="right"
        v-bind:label="$t('flow_month.usedRoamFlow')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="residueRoamFlow"
        align="right"
        v-bind:label="$t('flow_month.residueRoamFlow')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="accountPeriodStartDateCn"
        v-bind:label="$t('flow_month.accountPeriodStartDate')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="accountPeriodEndDateCn"
        v-bind:label="$t('flow_month.accountPeriodEndDate')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="lastUpDatetimeCn"
        v-bind:label="$t('flow_month.lastUpDateTime')"
        width="">
      </el-table-column>
    </el-table>
     <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>

  </div>
</template>


<script>
  import { modelImsiList } from 'api/terminal/static';
  import * as moment from 'moment';

  export default {
    data() {
      return {
        list: [],
        listLoading: false, 
        total: 0,
        listQuery: {
          page:1,
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
          modelImsiList(this.listQuery.q).then(response => {
            const res = response.data;
            if (res.status > 0) {
              const data = res.data;
              this.list = data;
            }
            this.listLoading = false
          })

/*          if (!this.list) {
            this.getList()
          }*/
        }
      },
      handleCurrentChange(val) {
        this.getList()
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
