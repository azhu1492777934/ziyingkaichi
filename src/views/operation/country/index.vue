<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('country.countryName')"
                    v-model="listQuery.q.countryName" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('country.nameCn')"
                    v-model="listQuery.q.nameCn" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.q.status" clearable>
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <a :href="'#/operation/country/new'" target="_self" style="margin-left: 10px;">
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
      max-height=520px
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="countryCode"
        v-bind:label="$t('country.countryCode')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="countryName"
        v-bind:label="$t('country.countryName')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="continentCodeCn"
        v-bind:label="$t('country.continentCode')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="timeZone"
        v-bind:label="$t('country.timeZone')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="nameCn"
        v-bind:label="$t('country.nameCn')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="longItude"
        v-bind:label="$t('country.longItude')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="latItude"
        v-bind:label="$t('country.latItude')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('country.status')"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
        fixed="right"
      >
        <template slot-scope="scope">
          <a :href="'#/operation/country/edit/' + scope.row.id" target="_self"><el-button type="primary" plain size="small">编辑</el-button></a>
          <el-button size="small" type="danger" plain @click="handelDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->
  </div>
</template>


<script>
  import { modelList, modelDelete } from 'api/operation/country';
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
            countryCode: '',
            customerRealName: '',
          }
        },
        statusArr: [{ id: '0', name: '不可用' }, { id: '1', name: '可用' }],
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
