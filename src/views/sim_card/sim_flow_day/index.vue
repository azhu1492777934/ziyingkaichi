<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>

        <el-col :span="4">
          <el-select v-model="listQuery.q.operatorCode" filterable clearable :placeholder="$t('sim_flow_day.operatorCode')">
            <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

          <el-col :span="4">
            <el-select v-model="listQuery.q.packageId" filterable clearable :placeholder="$t('sim_flow_day.packageId')">
              <el-option v-for="i in packageArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-select v-model="listQuery.q.cpId" filterable clearable :placeholder="$t('sim_flow_day.cpId')">
              <el-option v-for="i in simpoolArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-input class="filter-item" :placeholder="$t('sim_flow_day.iccid')" v-model="listQuery.q.iccid" clearable type="text"> </el-input>
          </el-col>

          <el-col :span="8">
            <el-date-picker style="width: 100%;"
                            v-model="listQuery.q.insertDateRange"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            :start-placeholder="$t('sim_flow_day.startDate')" :end-placeholder="$t('sim_flow_day.endDate')">
            </el-date-picker>
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
      max-height="510"
      tooltip-effect="dark"
      style="width: 100%"
     >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        prop="iccid"
        v-bind:label="$t('sim_flow_day.iccid')"
        width="200">
      </el-table-column>

      <el-table-column
        prop="imsi"
        v-bind:label="$t('sim_flow_day.imsi')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="cpId"
        v-bind:label="$t('sim_flow_day.cpId')"
        width="100">
      </el-table-column>

      <el-table-column
        prop="packageCn"
        v-bind:label="$t('sim_flow_day.packageCn')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="operatorCodeCn"
        v-bind:label="$t('sim_flow_day.operatorCodeCn')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="dateCn"
        v-bind:label="$t('sim_flow_day.dateCn')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="flow"
        align="right"
        v-bind:label="$t('sim_flow_day.flow')"
        width="120">
      </el-table-column>

      <el-table-column
        prop="statusCn"
        v-bind:label="$t('sim_flow_day.statusCn')"
        width="">
      </el-table-column>

    </el-table>

   <el-row style="margin-top: 10px;">
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
  import { modelList,download,totalFlow} from 'api/sim_card/sim_flow_day';
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
           this.totalFlow = (data.totalFlow) / (1024 * 1024 )
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
      font-size: 13px;
      color: #fff;
      border-radius: 3px;
      background-color: #3F9EFF;
      margin-top: 4px;
      padding: 6px 5px;
    }
  }
</style>
