<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('simpool.spid')"
                    v-model="listQuery.q.spid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('simpool.ip')"
                    v-model="listQuery.q.ip" clearable type="text"> </el-input>
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
        prop="id"
        v-bind:label="$t('simpool.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="spid"
        v-bind:label="$t('simpool.spid')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="ip"
        v-bind:label="$t('simpool.ip')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="port"
        v-bind:label="$t('simpool.port')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sumIp"
        v-bind:label="$t('simpool.sumIp')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="webPort"
        v-bind:label="$t('simpool.webPort')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="version"
        v-bind:label="$t('simpool.version')"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <a :href="'#/sim_card/simpool/show/' + scope.row.id" target="_blank"><el-button size="small">查看</el-button></a>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading && total > 0" class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-size="listQuery.perPage" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <!-- 列表-end -->

  </div>
</template>


<script>
  import { modelList, batchUpdate, batchBind, batchRefund } from 'api/sim_card/simpool';
  import * as moment from 'moment';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          perPage: 20,
          q: {
            spid: '',
            customerRealName: '',
          }
        },
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

        if (!this.list) {
          this.getList()
        }
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList()
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
