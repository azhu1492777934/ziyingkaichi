<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('channel_card.imsi')"
                    v-model="listQuery.q.imsi" clearable type="text"> </el-input>
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
      max-height="560"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        v-bind:label="$t('channel_card.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('channel_card.imsi')"
        width="150">
      </el-table-column>
      <el-table-column
        prop="iccid"
        v-bind:label="$t('channel_card.iccid')"
        width="200">
      </el-table-column>
      <el-table-column
        prop="operatorCode"
        v-bind:label="$t('channel_card.operatorCode')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="countryCode"
        v-bind:label="$t('channel_card.countryCode')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="countryCn"
        v-bind:label="$t('channel_card.countryCn')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="mcNumber"
        v-bind:label="$t('channel_card.mcNumber')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('channel_card.status')"
        width="">
      </el-table-column>
    </el-table>

   <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->

    <!-- 批量修改-start -->
    <el-dialog title="批量修改" :visible.sync="dialogUpdateVisible" size="tiny" @close="dialogUpdateVisible=false">
      <el-form :model="batchUpdateForm">
        <el-form-item v-bind:label="$t('channel_card.status')" :label-width="formLabelWidth" prop="status" :rules="rules.status">
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
  import { countryMap } from 'api/operation/country';
  import { modelList, batchUpdate } from 'api/channel_card/channel_card';
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
            imsi: '',
          }
        },
        rules: {
          status: [
            { required: true, message: this.$t('channel_card.status') + '不能为空' }
          ],
        },
        batchUpdateForm: {
          status: '',
        },
        modelDelete: true,
        modelIds: [],
        dialogUpdateVisible: false,
        formLabelWidth: '150px',
        statusArr: [{id: 0, name: '预置卡'},{id: 1, name: '临时卡'},{id: 2, name: '作废'}],
        countryCodeArr: [],
      }
    },
    created() {
      this.getList();
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
        if (this.listQuery.q.imsi == '') {
          this.modelDelete = true;
        } else {
          this.modelDelete = false;
        }
      },
      handelUpdate() {
        const noColumn = this.listQuery.q.imsi == '';
        if (!noColumn || this.modelIds.length !== 0) {
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
