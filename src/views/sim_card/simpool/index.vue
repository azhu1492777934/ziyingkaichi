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
        width="120">
      </el-table-column>
      <el-table-column
        prop="port"
        v-bind:label="$t('simpool.port')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sumIp"
        v-bind:label="$t('simpool.sumIp')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="webPort"
        v-bind:label="$t('simpool.webPort')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="version"
        v-bind:label="$t('simpool.version')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="isActiveCn"
        v-bind:label="$t('simpool.isActiveCn')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="freeCount"
        v-bind:label="$t('simpool.freeCount')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="offlineCount"
        v-bind:label="$t('simpool.offlineCount')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="usedCount"
        v-bind:label="$t('simpool.usedCount')"
        width="100">
      </el-table-column>


      <el-table-column
        label="操作"
        align="center"
        width=""
        fixed="right"
      >
        <template slot-scope="scope">
          <a style="text-decoration: underline"  :href="'#/terminal/static/simpool_show/' + scope.row.id" ><el-button size="small">查看</el-button></a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
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
          perPage: 100,
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

        // if (!this.list) {
        //   this.getList()
        // }
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
