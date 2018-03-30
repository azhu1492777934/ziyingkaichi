<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('operator.mcc')"
                    v-model="listQuery.q.mcc" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('operator.operatorNameEn')"
                    v-model="listQuery.q.operatorNameEn" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('operator.operatorNameCn')"
                    v-model="listQuery.q.operatorNameCn" clearable type="text"> </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-select v-model="listQuery.q.countryCode" filterable clearable :placeholder="$t('operator.countryCode')">
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('operator.apn')"
                    v-model="listQuery.q.apn" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.q.status" clearable :placeholder="$t('operator.status')">
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <a :href="'#/operation/operator/new'" target="_blank" style="margin-left: 10px;">
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
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="operatorCode"
        v-bind:label="$t('operator.operatorCode')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="operatorNameEn"
        v-bind:label="$t('operator.operatorNameEn')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="operatorNameCn"
        v-bind:label="$t('operator.operatorNameCn')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="countryCodeCn"
        v-bind:label="$t('operator.countryCode')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="mcc"
        v-bind:label="$t('operator.mcc')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="mnc"
        v-bind:label="$t('operator.mnc')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="apn"
        v-bind:label="$t('operator.apn')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="level"
        v-bind:label="$t('operator.level')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('operator.status')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="groupSize"
        v-bind:label="$t('operator.groupSize')"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <a :href="'#/operation/operator/edit/' + scope.row.id" target="_blank"><el-button size="small">编辑</el-button></a>
          <el-button size="small" @click="handelDelete(scope.row.id)">删除</el-button>
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
  import { countryMap } from 'api/operation/country';
  import { modelList, modelDelete } from 'api/operation/operator';
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
          }
        },
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '禁用' }],
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

        if (!this.list) {
          this.getList()
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
                duration: 0,
                showClose: true
              });
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 0,
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
