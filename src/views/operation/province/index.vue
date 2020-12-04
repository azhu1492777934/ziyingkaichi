<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('province.nameCn')"
                    v-model="listQuery.q.nameCn" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <a :href="'#/operation/province/new'" target="_self" style="margin-left: 10px;">
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
        prop="id"
        v-bind:label="$t('province.id')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="provinceCode"
        v-bind:label="$t('province.provinceCode')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="nameCn"
        v-bind:label="$t('province.nameCn')"
        width="300">
      </el-table-column>
      <el-table-column
        prop="cityCode"
        v-bind:label="$t('province.cityCode')"
        width="100" >
      </el-table-column>
      <el-table-column
        prop="city"
        v-bind:label="$t('province.city')"
        width="100" >
      </el-table-column>
      <el-table-column
        prop="parentCode"
        v-bind:label="$t('province.parentCode')"
        width="100" >
      </el-table-column>
      <el-table-column
        prop="parentName"
        v-bind:label="$t('province.parentName')"
        width="100" >
      </el-table-column>
      <el-table-column
        prop="countryCode"
        v-bind:label="$t('province.countryCode')"
        width="100" hidden:true>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <a :href="'#/operation/province/edit/' + scope.row.id" target="_self"><el-button size="small">编辑</el-button></a>
          <el-button size="small" @click="handelDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->
  </div>
</template>


<script>
  import { modelList, modelDelete } from 'api/operation/province';
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
            nameCn: '',
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
