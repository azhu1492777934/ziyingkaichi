<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>

        <el-col :span="4">
          <el-select v-model="listQuery.q.operatorCode" filterable clearable :placeholder="$t('sim_flow_month.operatorCode')">
            <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.q.packageId" filterable clearable :placeholder="$t('sim_flow_month.packageId')">
              <el-option v-for="i in packageArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.q.cpId" filterable clearable :placeholder="$t('sim_flow_month.cpId')">
              <el-option v-for="i in simpoolArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input class="filter-item" :placeholder="$t('sim_flow_month.iccid')" v-model="listQuery.q.iccid" clearable type="text"> </el-input>
          </el-col>
          <el-col :span="4">
            <el-date-picker clearable :placeholder="$t('sim_flow_month.date')" type="month"  value-format="yyyy-MM" v-model="listQuery.q.date"></el-date-picker>
          </el-col>

        <el-col :span="12">
          <el-button style="margin-top: 10px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button type="primary" @click="handleDownload">下载当前结果</el-button>
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
      >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        prop="iccid"
        v-bind:label="$t('sim_flow_month.iccid')"
        width="200">
      </el-table-column>

      <el-table-column
        prop="imsi"
        v-bind:label="$t('sim_flow_month.imsi')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="cpId"
        v-bind:label="$t('sim_flow_month.cpId')"
        width="100">
      </el-table-column>

      <el-table-column
        prop="packageCn"
        v-bind:label="$t('sim_flow_month.packageCn')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="operatorName"
        v-bind:label="$t('sim_flow_month.operatorName')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="date"
        v-bind:label="$t('sim_flow_month.date')"
        width="120">
      </el-table-column>

      <el-table-column
        prop="maxFlow"
        align="right"
        v-bind:label="$t('sim_flow_month.maxFlow')"
        width="120">
      </el-table-column>

      <el-table-column
        prop="usedFlow"
        align="right"
        v-bind:label="$t('sim_flow_month.usedFlow')"
        width="120">
      </el-table-column>

      <!-- el-table-column
        prop="accountPeriodStartDateCn"
        v-bind:label="$t('sim_flow_month.accountPeriodStartDateCn')"
        width="120">
      </el-table-column>

      <el-table-column
        prop="accountPeriodEndDateCn"
        v-bind:label="$t('sim_flow_month.accountPeriodEndDateCn')"
        width="120">
      </el-table-column -->

      <el-table-column
        prop="statusCn"
        v-bind:label="$t('sim_flow_month.statusCn')"
        width="60">
      </el-table-column>

    </el-table>

    <!-- 分页全局组件 -->
    <el-row>
      <el-col :span="4" v-show="totalFlow > 0 && !listLoading">
        <span class="totalFlow">{{`总流量: ${totalFlow.toFixed(2)}TB`}}</span>
      </el-col>
      <el-col :span="16">
         <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
      </el-col>
    </el-row>
    
   
    <!-- 列表-end -->
  </div>
</template>


<script>
  import { modelList,download,totalFlow} from 'api/sim_card/sim_flow_month';
  import { simpackageMap } from 'api/sim_card/simpackage';
  import { operatorMap } from 'api/operation/operator';
  import { simpoolMap } from 'api/sim_card/simpool';

  import { Message } from 'element-ui';
  import * as moment from 'moment';

  export default {
    data() {
      return {
        list: [],
        listLoading: false,
        listQuery: {
          page: 1,
          perPage: 100,
          q: {
            tsid: this.$route.query.tsid,
            startDate: this.$route.query.startDate,
            endDate: this.$route.query.endDate,
            insertDateRange: undefined,
          }
        },
        packageArr:[],
        operatorCodeArr:[],
        simpoolArr:[],
        total: 0,
        totalFlow: 0,
        download: null,
      }
    },
    created() {
      this.getList();
      this.getTotalFlow();
      this.getSimPackageMap();
      this.getOperatorMap();
      this.getSimpoolMap();
    },

    methods: {
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

      },

       getTotalFlow() {
        totalFlow(this.listQuery).then(response => {
          const res = response.data
          if(res.status > 0) {
           const data = res.data;
           console.log(data.totalFlow)
           this.totalFlow = (data.totalFlow) / (1024)
          }
        })
      },

      getSimPackageMap() {
        simpackageMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.packageArr = res.data;
          }
        });
      },

      getOperatorMap() {
        operatorMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.operatorCodeArr = res.data;
          }
        });
      },

      getSimpoolMap() {
        simpoolMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.simpoolArr = res.data;
          }
        });
      },

      handleDownload() {
        if(this.download) {
          clearTimeout(this.download)
        }
        this.download = setTimeout( () => {
          download(this.modelIds, this.listQuery.q, {}).then(response=>{
            const res = response.data;
            require.ensure([], () => {
              const { export_json_to_excel } = require('vendor/Export2Excel');
              const tHeader = res.data.headList;
              const data = res.data.dataList;
              const fileName = res.data.fileName;
              export_json_to_excel(tHeader, data, fileName);
            })
          });
      },600)
    },

      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
        this.getTotalFlow();
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
    .totalFlow {
      display: inline-block;
      font-size: 14px;
      color: #444;
      margin-top: 9px;
    }
  }
</style>
