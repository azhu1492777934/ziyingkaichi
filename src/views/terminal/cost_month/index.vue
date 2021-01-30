<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('cost_month.tsid')"
                    v-model="listQuery.q.tsid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.q.usergroup" filterable clearable :placeholder="$t('cost_month.userGroup')">
            <el-option v-for="i in groupCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker style="width: 100%;"
                          v-model="listQuery.q.insertDateRange"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          :start-placeholder="$t('cost_month.startDate')" :end-placeholder="$t('cost_month.endDate')">
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
      max-height="560"
      tooltip-effect="dark"
      style="width: 100%"
     >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        prop="tsid"
        v-bind:label="$t('cost_month.tsid')"
        width="100">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/cost_day_list?tsid=' + scope.row.tsid + '&startDate=' + scope.row.startDateCn + '&endDate=' + scope.row.endDateCn" target="_blank">{{ scope.row.tsid }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="imei"
        v-bind:label="$t('cost_month.imei')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="userGroup"
        v-bind:label="$t('cost_month.userGroup')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="startDateCn"
        v-bind:label="$t('cost_month.startDateCn')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="endDateCn"
        v-bind:label="$t('cost_month.endDateCn')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="days"
        align="right"
        v-bind:label="$t('cost_month.days')"
        width="100">
      </el-table-column>

      <el-table-column
        prop="duration"
        align="right"
        v-bind:label="$t('cost_month.duration')"
        width="120">
      </el-table-column>

      <el-table-column
        prop="flow"
        align="right"
        v-bind:label="$t('cost_month.flow')"
        width="">
      </el-table-column>

    </el-table>

    <el-row style="margin-top: 10px;">
      <el-col :span="4" v-show="totalFlow > 0 && !listLoading">
        <span class="totalFlow">{{`总流量: ${totalFlow.toFixed(2)}TB`}}</span>
      </el-col>
      <el-col :span="16">
        <!-- 分页组件 -->
        <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
      </el-col>
    </el-row>
    <!-- 列表-end -->
  </div>
</template>


<script>
  import { modelList,download,totalFlow } from 'api/terminal/cost_month';
  import { Message } from 'element-ui';
  import { groupMap } from 'api/terminal/terminal';
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
            tsid: '',
            insertDateRange: undefined,
          }
        },
        totalFlow: 0,
        download: null,
        groupCodeArr: [],
      }
    },
    created() {
      this.getList();
      this.getTotalFlow();
      this.getGroupMap();
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

      getGroupMap() {
        groupMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.groupCodeArr = res.data;
          }
        });
      },

      getTotalFlow() {
        totalFlow(this.listQuery).then(response => {
          const res = response.data
          if(res.status > 0) {
           const data = res.data;
           this.totalFlow = (data.totalFlow) / (1024)
          }
        })
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
