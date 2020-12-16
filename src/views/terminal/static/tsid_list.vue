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
        align="right"
        prop="flowincrement"
        v-bind:label="$t('terminal_tsid.flowincrement')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="typeCn"
        v-bind:label="$t('terminal_tsid.type')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="locationCn"
        v-bind:label="$t('terminal_tsid.location')"
        width="80">
      </el-table-column>
      <!--el-table-column
        prop="resultdesc"
        v-bind:label="$t('terminal_tsid.resultDesc')"
        width="80">
      </el-table-column-->
      <el-table-column
        prop="signaly"
        v-bind:label="$t('terminal_tsid.signaly')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="signaltype"
        v-bind:label="$t('terminal_tsid.signalType')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="usercount"
        align="right"
        v-bind:label="$t('terminal_tsid.userCount')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="spid"
        v-bind:label="$t('terminal_tsid.spid')"
        width="70">
      </el-table-column>
      <el-table-column
        prop="spip"
        v-bind:label="$t('terminal_tsid.spip')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="apn"
        v-bind:label="$t('terminal_tsid.apn')"
        show-overflow-tooltip
        width="80">
      </el-table-column>
      <el-table-column
        prop="longitude"
        v-bind:label="$t('terminal_tsid.longitude')"
        width="60">
      </el-table-column>
      <el-table-column
      prop="latitude"
      v-bind:label="$t('terminal_tsid.latitude')"
      width="60">
    </el-table-column>
      <el-table-column
        prop="power"
        v-bind:label="$t('terminal_tsid.power')"
        width="50">
      </el-table-column>
      <el-table-column
        prop="operatorcode"
        v-bind:label="$t('terminal_tsid.operatorcode')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="operatorcn"
        v-bind:label="$t('terminal_tsid.operatorcn')"
        width="100">
      </el-table-column>
    </el-table>
    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
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
          page: 1,
          perPage: 100,
          q: {
            tsid: this.$route.query.tsid,
            date: new Date(),
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
        if (this.listQuery.q.tsid != undefined) {
          if (this.listQuery.q.date != undefined ) {
            this.listQuery.q.date = moment(this.listQuery.q.date).format('YYYY-MM-DD');
            this.listQuery.q.fromDate = this.listQuery.q.date + ' 00:00:00';
            this.listQuery.q.toDate = this.listQuery.q.date + ' 23:59:59';
          } else {
            this.listQuery.q.fromDate = '';
            this.listQuery.q.toDate = '';
          }
          this.listLoading = true;
          modelTsidList(this.listQuery.q).then(response => {
            const res = response.data;
            if (res.status > 0) {
              const data = res.data;
              this.list = data;
              console.log(this.list);
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
