<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('flow_balance.tsid')"
                    v-model="listQuery.q.tsid" clearable type="text"> </el-input>
        </el-col>


        <el-col :span="8">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdateVisible = true">批量修改</el-button>
          <a :href="'#/terminal/flow_balance/new'" target="_self" style="margin-left: 10px;">
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
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        v-bind:label="$t('flow_balance.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tsid"
        v-bind:label="$t('flow_balance.tsid')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="allowFlow"
        align="right"
        v-bind:label="$t('flow_balance.allowFlow')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="validityDateCn"
        v-bind:label="$t('flow_balance.validityDate')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="note"
        v-bind:label="$t('flow_balance.note')"
        width="140">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
        fixed="right"
      >
        <template slot-scope="scope">
          <a :href="'#/terminal/flow_balance/edit/' + scope.row.id" target="_self"><el-button size="small">编辑</el-button></a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->

    <!-- 批量修改-start -->
    <el-dialog title="批量修改" :visible.sync="dialogUpdateVisible" size="tiny" @close="dialogUpdateVisible = false">
      <el-form :model="batchUpdateForm">
        <el-form-item v-bind:label="$t('flow_balance.allowFlow')" :label-width="formLabelWidth" prop="allowFlow">
          <el-input v-model="batchUpdateForm.allowFlow"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('flow_balance.validityDate')" :label-width="formLabelWidth" prop="validityDate">
          <el-date-picker type="date" v-model="batchUpdateForm.validityDate"></el-date-picker>
        </el-form-item>

        <el-form-item v-bind:label="$t('flow_balance.note')" :label-width="formLabelWidth" prop="note">
          <el-input v-model="batchUpdateForm.note"></el-input>
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
  import { modelList, batchUpdate } from 'api/terminal/flow_balance';
  import { Message } from 'element-ui';
  import * as moment from 'moment';

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
            tsid: '',
          }
        },
        batchUpdateForm: {
          allowFlow: undefined,
          validityDate: undefined,
          note: undefined,
        },
        rules: {
        },
        modelDelete: true,
        dialogUpdateVisible: false,
        formLabelWidth: '150px',
        modelIds: [],
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
      handelUpdate() {
        const noColumn = this.batchUpdateForm.allowFlow == ''
          && this.batchUpdateForm.validityDate == ''
          && this.batchUpdateForm.note == '';
        this.batchUpdateForm.validityDate = moment(this.listQuery.q.validityDate).format('YYYY-MM-DD');
        if (!noColumn) {
          batchUpdate(this.modelIds, this.listQuery.q, this.batchUpdateForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '更新成功',
                type: 'success',
                duration: _const.messageDuration,
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
        if (this.listQuery.q.tsid == '') {
          this.modelDelete = true;
        } else {
          this.modelDelete = false;
        }
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
