<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-select v-model="listQuery.q.roamCountryCode" filterable clearable :placeholder="$t('country_operator.roamCountryCode')">
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('country_operator.operatorCode')"
                    v-model="listQuery.q.operatorCode" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="4">
          <el-select v-model="listQuery.q.status" clearable :placeholder="$t('country_operator.status')">
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <a :href="'#/operation/country_operator/new'" target="_self" style="margin-left: 10px;">
            <el-button class="filter-item el-icon-plus" type="primary" style="margin-right: 10px;">新建</el-button>
          </a>
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
      max-height="600"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="id"
        v-bind:label="$t('country_operator.id')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="roamCountryCode"
        v-bind:label="$t('country_operator.roamCountryCode')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="roamCountryCodeCn"
        v-bind:label="$t('country_operator.roamCountryCodeCn')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="operatorCode"
        v-bind:label="$t('country_operator.operatorCode')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="operatorCodeCn"
        v-bind:label="$t('country_operator.operatorCodeCn')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="level"
        v-bind:label="$t('country_operator.level')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('country_operator.status')"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="small" :type="scope.row.status == 0 ? 'warning' : 'primary'" plain @click="handelUpdateStatus(scope.row.id, scope.row.status == 0 ? 1 : 0, scope.row.status == 0 ? '停用' : '可用')">{{scope.row.status == 0 ? '停用' : '可用'}}</el-button>
          <el-button size="small" type="dangger" plain @click="handelDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->
  </div>
</template>


<script>
  import { countryMap } from 'api/operation/country';
  import { modelList, modelDelete, modelUpdateStatus } from 'api/operation/country_operator';
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
          }
        },
        statusArr: [{ id: 0, name: '可用' }, { id: 1, name: '停用' }],
        countryCodeArr: [],
      }
    },
    created() {
      this.getList();
      this.getCountryMap();
    },
    methods: {
      getCountryMap() {
        countryMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.countryCodeArr = res.data;
          }
        });
      },
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
      handelDelete(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.listLoading = true;
          modelDelete(id).then(response => {
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '删除成功',
                type: 'success',
                duration: _const.messageDuration,
                showClose: true
              });
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: _const.messageDuration,
            showClose: true
          });
        });
      },
      handelUpdateStatus(id, status, statusCn) {
        this.$confirm('此操作将' + statusCn + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.listLoading = true;
          modelUpdateStatus(id, status).then(response => {
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '成功',
                type: 'success',
                duration: _const.messageDuration,
                showClose: true
              });
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
            duration: _const.messageDuration,
            showClose: true
          });
        });
      }
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
