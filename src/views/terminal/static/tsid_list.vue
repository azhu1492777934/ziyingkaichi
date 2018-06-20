<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal_sim.tsid')"
                    v-model="listQuery.q.tsid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-date-picker clearable :placeholder="$t('terminal_sim.date')" type="date" v-model="listQuery.q.date"></el-date-picker>
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
        prop="num"
        v-bind:label="$t('terminal_tsid.num')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tsid"
        v-bind:label="$t('terminal_tsid.tsid')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('terminal_tsid.imsi')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="time"
        v-bind:label="$t('terminal_tsid.time')"
        width="170">
      </el-table-column>
      <el-table-column
        prop="flowincrement"
        v-bind:label="$t('terminal_tsid.flowincrement')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="type"
        v-bind:label="$t('terminal_tsid.type')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="location"
        v-bind:label="$t('terminal_tsid.location')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="resultDesc"
        v-bind:label="$t('terminal_tsid.resultDesc')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="signaly"
        v-bind:label="$t('terminal_tsid.signaly')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="signalType"
        v-bind:label="$t('terminal_tsid.signalType')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="userCount"
        v-bind:label="$t('terminal_tsid.userCount')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="spid"
        v-bind:label="$t('terminal_tsid.spid')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="channelId"
        v-bind:label="$t('terminal_tsid.channelId')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="apn"
        v-bind:label="$t('terminal_tsid.apn')"
        width="160">
      </el-table-column>
    </el-table>

  </div>
</template>


<script>
  import { modelTsidList } from 'api/terminal/static';
  import * as moment from 'moment';

  export default {
    data() {
      return {
        list: [],
        listLoading: false,
        listQuery: {
          q: {
            tsid: this.$route.query.tsid,
            date: this.$route.query.date,
            fromDate: undefined,
            toDate: undefined,
          }
        },
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        if (this.listQuery.q.tsid != undefined && this.listQuery.q.date != undefined ) {
          this.listQuery.q.date = moment(this.listQuery.q.date).format('YYYY-MM-DD');
          this.listQuery.q.fromDate = this.listQuery.q.date + ' 00:00:00';
          this.listQuery.q.toDate = this.listQuery.q.date + ' 23:59:59';
          this.listLoading = true;
          modelTsidList(this.listQuery.q).then(response => {
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
        this.listQuery.page = val;
        this.getList()
      },
      handleFilter() {
        this.listQuery.page = 1;
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
