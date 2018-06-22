<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal.tsid')"
                    v-model="listQuery.q.tsid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal.ssid')"
                    v-model="listQuery.q.ssid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal.batch')"
                    v-model="listQuery.q.batch" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.q.status" filterable clearable :placeholder="$t('terminal.status')">
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="8">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdateVisible = true">批量修改状态</el-button>
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
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        v-bind:label="$t('terminal.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tsid"
        v-bind:label="$t('terminal.tsid')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="ssid"
        v-bind:label="$t('terminal.ssid')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="wifiPassword"
        v-bind:label="$t('terminal.wifiPassword')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="mac"
        v-bind:label="$t('terminal.mac')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="batch"
        v-bind:label="$t('terminal.batch')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sversion"
        v-bind:label="$t('terminal.sversion')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('terminal.status')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="imei"
        v-bind:label="$t('terminal.imei')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="upLogCn"
        v-bind:label="$t('terminal.upLog')"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <el-button size="small" @click="handelStop(scope.row.id)" v-if="scope.row.status != 2">停用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading && total > 0" class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-size="listQuery.perPage" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <!-- 列表-end -->

    <!-- 批量修改-start -->
    <el-dialog title="批量修改" :visible.sync="dialogUpdateVisible" size="tiny" @close="dialogUpdateVisible=false">
      <el-form :model="batchUpdateForm">
        <el-form-item v-bind:label="$t('terminal.status')" :label-width="formLabelWidth" prop="status" :rules="rules.status">
          <el-select v-model="batchUpdateForm.status" placeholder="请选择">
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量修改-end -->
  </div>
</template>


<script>
  import { modelList, modelStop, batchUpdate } from 'api/terminal/terminal';
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
            tsid: '',
            ssid: '',
            batch: '',
            status: '',
          }
        },
        rules: {
          status: [
            { required: true, message: this.$t('terminal.status') + '不能为空' }
          ],
        },
        batchUpdateForm: {
          status: '',
        },
        modelDelete: true,
        modelIds: [],
        dialogUpdateVisible: false,
        formLabelWidth: '150px',
        statusArr: [{id: 0, name: '正常'},{id: 1, name: '未初始化'},{id: 2, name: '停用'},{id: 3, name: '注销'}],
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
      handleSelectionChange(val) {
        this.modelIds = this.getModelIds(val);
        console.log("modelIds: " + this.modelIds )
        if (this.modelIds.length !== 0) {
          this.modelDelete = false;
        } else {
          this.modelDelete = true;
        }
      },
      getModelIds(k) {
        const Ids = [];
        k.forEach(l => {
          Ids.push(l.id)
        })
        return Ids;
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
        if (this.listQuery.q.tsid == '' && this.listQuery.q.ssid == '' && this.listQuery.q.batch == '' && this.listQuery.q.status == '') {
          this.modelDelete = true;
        } else {
          this.modelDelete = false;
        }
      },
      handelUpdate() {
        const noColumn = this.listQuery.q.tsid == '' && this.listQuery.q.ssid == '' && this.listQuery.q.batch == '' && this.listQuery.q.status == '';
        if (!noColumn) {
          batchUpdate(this.modelIds, this.listQuery.q, this.batchUpdateForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '更新成功',
                type: 'success',
                duration: 0,
                showClose: true
              });
              this.dialogUpdateVisible = false;
              this.getList();
            }
          });
        } else {
          this.dialogUpdateVisible = false;
        }
      },
      handelStop(id) {
        this.$confirm('此操作将永久停用, 是否继续?', '提示', {
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
