<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal_sim.imsi')"
                    v-model="listQuery.q.imsi" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4" style="margin-right: 15px">
          <el-date-picker clearable :placeholder="$t('flow_day.startDate')" type="date" v-model="listQuery.q.startDate"></el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-date-picker clearable :placeholder="$t('flow_day.endDate')" type="date" v-model="listQuery.q.endDate"></el-date-picker>
        </el-col>
        <el-col :span="4">
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
        prop="id"
        v-bind:label="$t('flow_day.id')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="dateCn"
        v-bind:label="$t('flow_day.date')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('flow_day.imsi')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="flow"
        align="right"
        v-bind:label="$t('flow_day.flow')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="roamFlow"
        align="right"
        v-bind:label="$t('flow_day.roamFlow')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="lastUpDatetimeCn"
        v-bind:label="$t('flow_day.lastUpDateTime')"
        width="200">
      </el-table-column>
    </el-table>

  </div>
</template>


<script>
  import { modelImsiDateList } from 'api/terminal/static';
  import * as moment from 'moment';

  export default {
    data() {
      return {
        list: [],
        listLoading: false,
        listQuery: {
          q: {
            imsi: this.$route.query.imsi,
            startDate: undefined,
            endDate: undefined,
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
          modelImsiDateList(this.listQuery.q).then(response => {
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
