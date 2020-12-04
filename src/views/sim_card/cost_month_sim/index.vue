<template>
   <div class="app-container" id="basicData_search_index">
    <el-row :gutter="20">
        <el-col :span="6">
             <el-input class="filter-item" :placeholder="$t('cost_month_sim.iccid')"
                    v-model="listQuery.q.tsid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="6">
             <el-input class="filter-item" :placeholder="$t('cost_month_sim.packageId')"
                    v-model="listQuery.q.userGroup" clearable type="text"> </el-input>
        </el-col>
       <!-- <el-col :span="4">
          <el-date-picker clearable :placeholder="$t('cost_day_sim.startDate')" type="date" v-model="listQuery.q.startDate"></el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-date-picker clearable :placeholder="$t('cost_day_sim.endDate')" type="date" v-model="listQuery.q.endDate"></el-date-picker>
        </el-col> -->
        <el-date-picker
            v-model="listQuery.q.month"
            type="month"
            :placeholder="$t('cost_month_sim.month')">
        </el-date-picker>
    </el-row>
    <el-row :gutter="20" style="margin: 10px 0">
        <el-col>
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button style="margin-left: 26px" type="primary" @click="handleDownload">下载当前结果</el-button>
        </el-col>
    </el-row>


   <!-- 列表 start -->
    <el-table
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      prop="tsid"
      :label="$t('cost_month_sim.iccid')"
      width="180">
    </el-table-column>
    <el-table-column
      prop="userGroup"
      :label="$t('cost_month_sim.packageId')">
    </el-table-column>
    <el-table-column
      prop="month"
      :label="$t('cost_month_sim.month')"
      width="180">
    </el-table-column>
    <el-table-column
      prop="days"
      :label="$t('cost_day_sim.days')">
    </el-table-column>
    <el-table-column
      prop="duration"
      :label="$t('cost_day_sim.duration')">
    </el-table-column>
    <el-table-column
      prop="flow"
      :label="$t('cost_day_sim.flow')">
    </el-table-column>
    
    </el-table>
    <!-- 列表 end -->

   <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
   </div>
   
</template>
<script>
import { modelList,download } from 'api/sim_card/cost_day_sim';

    export default {
        data() {
            return {
              listLoading: true,
              total: null,
              listQuery: {
                page: 1,
                perPage: 100,
                q: {
                    tsid: '',
                    month: '',
                    insertDateRange: undefined,
                }
              },
              list:[]
            }
        },
        created() {
          this.getList();
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

          handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList()
          },
          handleDownload() {
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
          },
          handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        }
      },
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
