<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('order.identifier')"
                    v-model="listQuery.q.identifier" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('order.customerRealName')"
                    v-model="listQuery.q.customerRealName" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdateVisible = true">批量修改</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogBindVisible = true">批量绑定设备</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogRefundVisible = true">批量退订</el-button>
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
        v-bind:label="$t('order.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="identifier"
        v-bind:label="$t('order.identifier')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="customerRealName"
        v-bind:label="$t('order.customerID')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tsCount"
        v-bind:label="$t('order.tsCount')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="type"
        v-bind:label="$t('order.type')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="countryCode"
        v-bind:label="$t('order.countryCode')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="beginDateCn"
        v-bind:label="$t('order.beginDate')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="endDateCn"
        v-bind:label="$t('order.endDate')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="total"
        v-bind:label="$t('order.total')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="currencyCn"
        v-bind:label="$t('order.currency')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('order.status')"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <a :href="'#/customer/order/show/' + scope.row.id" target="_blank"><el-button size="small">查看</el-button></a>
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
    <el-dialog title="批量修改" :visible.sync="dialogUpdateVisible" size="tiny" @close="handleCancel('batchUpdateForm')">
      <el-form :model="batchUpdateForm">
        <el-form-item v-bind:label="$t('order.tsCount')" :label-width="formLabelWidth" prop="tsCount" :rules="rules.tsCount">
          <el-input v-model="batchUpdateForm.tsCount"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('order.countryCode')" :label-width="formLabelWidth" prop="countryCode" :rules="rules.countryCode">
          <el-select v-model="batchUpdateForm.countryCode" multiple placeholder="请选择">
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('order.beginDate')" :label-width="formLabelWidth" prop="beginDate" :rules="rules.beginDate">
          <el-date-picker v-model="batchUpdateForm.beginDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item v-bind:label="$t('order.endDate')" :label-width="formLabelWidth" prop="endDate" :rules="rules.endDate">
          <el-date-picker v-model="batchUpdateForm.endDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量修改-end -->

    <!-- 批量绑定-start -->
    <el-dialog title="批量修改" :visible.sync="dialogBindVisible" size="tiny" @close="handleCancel('batchBindForm')">
      <el-form :model="batchBindForm">
        <el-form-item v-bind:label="$t('orderTrip.tsid')" :label-width="formLabelWidth" prop="tsid" :rules="rules.tsid">
          <el-input v-model="batchBindForm.tsid"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBindVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelBind()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 批量绑定-start -->
    <el-dialog title="批量退订" :visible.sync="dialogRefundVisible" size="tiny" @close="handleCancel('batchRefund')">
      <span>确定批量退订?</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRefundVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelRefund()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量绑定-end -->
  </div>
</template>


<script>
  import { countryMap } from 'api/operation/country';
  import { modelList, batchUpdate, batchBind, batchRefund } from 'api/customer/order';
  import * as moment from 'moment';
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
            identifier: '',
            customerRealName: '',
          }
        },
        batchUpdateForm: {
          tsCount: undefined,
          countryCode: undefined,
          beginDate: undefined,
          endDate: undefined,
        },
        batchBindForm: {
          tsid: undefined,
        },
        rules: {
          countryCode: [
            // { type: true, message: this.$t('country_price.countryCode') + '不能为空' }
          ],
        },
        modelDelete: true,
        dialogUpdateVisible: false,
        dialogBindVisible: false,
        dialogRefundVisible: false,
        formLabelWidth: '150px',
        countryCodeArr: [],
        modelIds: [],
        customerArr: [],
        currencyArr: [{ id: 0, name: '人民币' }, { id: 1, name: '美元' }, { id: 2, name: '台币' }],
      }
    },
    created() {
      this.getList();
      this.getCountryMap();
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
      getCountryMap() {
        countryMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.countryCodeArr = res.data;
          }
        });
      },
      handelUpdate() {
        const noColumn = this.batchUpdateForm.countryCode == '' && this.batchUpdateForm.tsCount == '' && this.batchUpdateForm.beginDate == '' && this.batchUpdateForm.endDate == '';
        if (!noColumn) {
          if (this.batchUpdateForm.beginDate != null) {
            this.batchUpdateForm.beginDate = moment(this.batchUpdateForm.beginDate).format('YYYY-MM-DD HH:mm:ss')
          }
          if (this.batchUpdateForm.endDate != null) {
            this.batchUpdateForm.endDate = moment(this.batchUpdateForm.endDate).format('YYYY-MM-DD HH:mm:ss')
          }
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
      handelBind() {
        const noColumn = this.batchBindForm.tsid == ''
        if (!noColumn) {
          batchBind(this.modelIds, this.listQuery.q, this.batchBindForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '绑定成功',
                type: 'success',
                duration: 0,
                showClose: true
              });
              this.dialogBindVisible = false;
              this.getList();
            }
          });
        } else {
          this.dialogBindVisible = false;
        }
      },
      handelRefund() {
        batchRefund(this.modelIds, this.listQuery.q).then(response=>{
          const res = response.data;
          if (res.status > 0) {
            Message({
              message: '退订成功',
              type: 'success',
              duration: 0,
              showClose: true
            });
            this.dialogRefundVisible = false;
            this.getList();
          }
        });
      },
      handleCancel(formName) {
        this.dialogUpdateVisible = false;
        this.dialogBindVisible = false;
        this.dialogRefundVisible = false;
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
        if (this.listQuery.q.countryCode == '' && this.listQuery.q.customerRealName == '') {
          this.modelDelete = true;
        } else {
          this.modelDelete = false;
        }
      },
      batchRefund() {

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
