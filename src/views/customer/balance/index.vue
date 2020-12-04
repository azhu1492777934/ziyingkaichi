<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('balance.customerPhoneNumber')"
                    v-model="listQuery.q.customerPhoneNumber" type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('balance.customerRealName')"
                    v-model="listQuery.q.customerRealName" type="text"> </el-input>
        </el-col>
        <el-col :span="8">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <br/>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="id"
        v-bind:label="$t('balance.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="customerId"
        v-bind:label="$t('balance.customerId')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="customerPhoneNumber"
        v-bind:label="$t('balance.customerPhoneNumber')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="customerRealName"
        v-bind:label="$t('balance.customerRealName')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="currencyCn"
        v-bind:label="$t('balance.currency')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="balance"
        v-bind:label="$t('balance.balance')"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <a :href="'#/customer/balance/edit/' + scope.row.id" target="_self"><el-button size="small">编辑</el-button></a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>

  </div>
</template>


<script>
  import { modelList } from 'api/customer/balance';

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
            customerPhoneNumber: '',
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
