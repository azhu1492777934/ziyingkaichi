<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('auth_permission.text')"
                    v-model="listQuery.q.text" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <a :href="'#/auth_role/auth_permission/new'" target="_self" style="margin-left: 10px;">
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
        v-bind:label="$t('auth_permission.id')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="text"
        v-bind:label="$t('auth_permission.text')"
        width="250">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="parentCn"-->
        <!--v-bind:label="$t('auth_permission.parentCn')"-->
        <!--width="140">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="url"
        v-bind:label="$t('auth_permission.url')"
        width="250">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="orderNum"-->
        <!--v-bind:label="$t('auth_permission.orderNum')"-->
        <!--width="140">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="statusCn"-->
        <!--v-bind:label="$t('auth_permission.status')"-->
        <!--width="140">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="isMenuCn"-->
        <!--v-bind:label="$t('auth_permission.isMenu')"-->
        <!--width="140">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="funDesc"
        v-bind:label="$t('auth_permission.funDesc')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTimeCn"
        v-bind:label="$t('auth_permission.createTime')"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
        fixed="right"
      >
        <template slot-scope="scope">
          <a :href="'#/auth_role/auth_permission/edit/' + scope.row.id" target="_self"><el-button size="small">编辑</el-button></a>
          <el-button size="small" @click="handelDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表-end -->

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>

  </div>
</template>


<script>
  import { modelList, modelDelete, authSetPermission } from 'api/auth_role/auth_permission';
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
