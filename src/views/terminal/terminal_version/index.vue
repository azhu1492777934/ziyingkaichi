<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal_version.oVersion')"
                    v-model="listQuery.q.oVersion" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal_version.tVersion')"
                    v-model="listQuery.q.tVersion" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <a :href="'#/terminal/terminal_version/new'" target="_self" style="margin-left: 10px;">
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
        v-bind:label="$t('terminal_version.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="describe"
        v-bind:label="$t('terminal_version.describe')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="oversion"
        v-bind:label="$t('terminal_version.oVersion')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="tversion"
        v-bind:label="$t('terminal_version.tVersion')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="downUrl"
        v-bind:label="$t('terminal_version.downUrl')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="typeCn"
        v-bind:label="$t('terminal_version.type')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('terminal_version.status')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="terminalList"
        v-bind:label="$t('terminal_version.terminalList')"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <el-button size="small" @click="handelDelete(scope.row.id)">删除</el-button>
          <el-button size="small" @click="handelUnbind(scope.row.id)">停用</el-button>
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
  import { modelList, modelDelete, modelStop } from 'api/terminal/terminal_version';
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
            oVersion: '',
            tVersion: '',
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
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList()
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
      },
      handelUnbind(id) {
        this.$confirm('此操作将停用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.listLoading = true;
          modelStop(id).then(response => {
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '停用成功',
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
            message: '已取消停用',
            duration: 0,
            showClose: true
          });
        });
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
