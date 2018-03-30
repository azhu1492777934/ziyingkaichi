<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('simcard.cpIP')" v-model="listQuery.q.cpIP" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('simcard.imsi')" v-model="listQuery.q.imsi" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('simcard.iccid')" v-model="listQuery.q.iccid" clearable type="text"> </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-select v-model="listQuery.q.countryCode" filterable clearable :placeholder="$t('simcard.countryCode')">
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="listQuery.q.operatorCode" filterable clearable :placeholder="$t('simcard.operatorCode')">
            <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="listQuery.q.packageId" filterable clearable :placeholder="$t('simcard.packageId')">
            <el-option v-for="i in packageArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="listQuery.q.status" filterable clearable :placeholder="$t('simcard.status')">
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="listQuery.q.cpStatus" filterable clearable :placeholder="$t('simcard.cpStatus')">
            <el-option v-for="i in cpStatusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="listQuery.q.offPeriod" filterable clearable :placeholder="$t('simcard.offPeriod')">
            <el-option v-for="i in offPeriodArr" :key="i" :label="i" :value="i.id">{{i}}</el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-date-picker style="width: 100%;"
                          v-model="listQuery.q.insertDateRange"
                          type="daterange"
                          :start-placeholder="$t('simcard.insertDate')" :end-placeholder="$t('simcard.insertDate')">
          </el-date-picker>
        </el-col>
        <el-col :span="5">
          <el-date-picker style="width: 100%;"
                          v-model="listQuery.q.expiryDateRange"
                          type="daterange"
                          :start-placeholder="$t('simcard.expiryDate')" :end-placeholder="$t('simcard.expiryDate')">
          </el-date-picker>
        </el-col>

        <el-col :span="8">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <a :href="'#/sim_card/sim_card/new'" target="_blank" style="margin-left: 10px;">
            <el-button class="filter-item el-icon-plus" type="primary">新建</el-button>
          </a>
          <el-button type="primary" @click="handleDownload">下载当前结果</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdatePackageVisible = true">批量修改套餐</el-button>
        <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdateMonthVisible = true">批量修改月流量账期</el-button>
        <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdateExpiryDateVisible = true">批量更新卡有效期</el-button>
        <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdateAPNVisible = true">批量更新APN</el-button>
        <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdateStatusVisible = true">批量更新状态</el-button>
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
        v-bind:label="$t('simcard.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="cpIP"
        v-bind:label="$t('simcard.cpIP')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="cpChannelId"
        v-bind:label="$t('simcard.cpChannelId')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('simcard.imsi')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="iccid"
        v-bind:label="$t('simcard.iccid')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="countryCodeCn"
        v-bind:label="$t('simcard.countryCode')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="operatorCodeCn"
        v-bind:label="$t('simcard.operatorCode')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="packageCn"
        v-bind:label="$t('simcard.packageId')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="offPeriod"
        v-bind:label="$t('simcard.offPeriod')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('simcard.status')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="cpStatusCn"
        v-bind:label="$t('simcard.cpStatus')"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <a :href="'#/sim_card/sim_card/edit/' + scope.row.id" target="_blank"><el-button size="small">编辑</el-button></a>
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

    <!-- 批量修改套餐-start -->
    <el-dialog title="批量修改套餐" :visible.sync="dialogUpdatePackageVisible" size="tiny" @close="handleCancel()">
      <el-form :model="batchUpdatePackageForm">
        <el-form-item v-bind:label="$t('simcard.packageId')" prop="packageId">
          <el-select v-model="batchUpdatePackageForm.packageId" filterable clearable>
            <el-option v-for="i in packageArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdatePackageVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelUpdatePackage()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量修改套餐-end -->

    <!-- 批量修改月流量账期-start -->
    <el-dialog title="批量修改月流量账期" :visible.sync="dialogUpdateMonthVisible" size="tiny" @close="handleCancel()">
      <el-form :model="batchUpdateMonthForm">
        <el-form-item v-bind:label="$t('simcard.offPeriod')" prop="offPeriod">
          <el-input v-model="batchUpdateMonthForm.offPeriod"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.suStained')" prop="suStained">
          <el-input v-model="batchUpdateMonthForm.suStained"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateMonthVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelUpdateMonth()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量修改月流量账期-end -->

    <!-- 批量更新卡有效期-start -->
    <el-dialog title="批量更新卡有效期" :visible.sync="dialogUpdateExpiryDateVisible" size="tiny" @close="handleCancel()">
      <el-form :model="batchUpdateExpiryDateForm">
        <el-form-item v-bind:label="$t('simcard.expiryDate')" prop="expiryDate">
          <el-date-picker type="date" v-model="batchUpdateExpiryDateForm.expiryDate"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateExpiryDateVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelUpdateExpiryDate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量更新卡有效期-end -->

    <!-- 批量更新APN-start -->
    <el-dialog title="批量更新APN" :visible.sync="dialogUpdateAPNVisible" size="tiny" @close="handleCancel()">
      <el-form :model="batchUpdateAPNForm">
        <el-form-item v-bind:label="$t('simcard.apn')" prop="apn">
          <el-input v-model="batchUpdateAPNForm.apn"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateAPNVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelUpdateAPN()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量更新APN-end -->

    <!-- 批量更新状态-start -->
    <el-dialog title="批量更新状态" :visible.sync="dialogUpdateStatusVisible" size="tiny" @close="handleCancel()">
      <el-form :model="batchUpdateStatusForm">
        <el-form-item v-bind:label="$t('simcard.status')" prop="status">
          <el-select v-model="batchUpdateStatusForm.status" filterable clearable>
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateStatusVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelUpdateStatus()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量更新状态-end -->
  </div>
</template>


<script>
  import { countryMap } from 'api/operation/country';
  import { operatorMap } from 'api/operation/operator';
  import { simpackageMap } from 'api/sim_card/simpackage';
  import { modelList, batchUpdatePackage, batchUpdateOffPeriod, batchUpdateExpiryDate, batchUpdateAPN, batchUpdateStatus, download, } from 'api/sim_card/sim_card';
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
            cpIP: undefined,
            imsi: undefined,
            iccid: undefined,
            countryCode: undefined,
            operatorCode: undefined,
            packageId: undefined,
            status: undefined,
            cpStatus: undefined,
            offPeriod: undefined,
            insertDateRange: undefined,
            expiryDateRange: undefined,
          }
        },
        batchUpdatePackageForm: {},
        batchUpdateMonthForm: {},
        batchUpdateExpiryDateForm: {},
        batchUpdateAPNForm: {},
        batchUpdateStatusForm: {},
        rules: {},
        modelDelete: true,
        dialogUpdatePackageVisible: false,
        dialogUpdateMonthVisible: false,
        dialogUpdateExpiryDateVisible: false,
        dialogUpdateAPNVisible: false,
        dialogUpdateStatusVisible: false,
        formLabelWidth: '150px',
        countryCodeArr: [],
        operatorCodeArr: [],
        packageArr: [],
        modelIds: [],
        customerArr: [],
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '停用' }, { id: 2, name: '指定' }, { id: 3, name: '待激活' }, { id: 4, name: '作废' }, { id: 5, name: '冻结' }],
        cpStatusArr: [{ id: 0, name: '正常' }, { id: 1, name: '待激活' }, { id: 2, name: '拔出' }, { id: 8, name: '超时' },],
        offPeriodArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,''],
      }
    },
    created() {
      this.getList();
      this.getCountryMap();
      this.getOperatorMap();
      this.getSimPackageMap();
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
      getOperatorMap() {
        operatorMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.operatorCodeArr = res.data;
          }
        });
      },
      getSimPackageMap() {
        simpackageMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.packageArr = res.data;
          }
        });
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
        if (this.listQuery.q.cpIP == ''
          && this.listQuery.q.imsi == ''
          && this.listQuery.q.iccid == ''
          && this.listQuery.q.countryCode == ''
          && this.listQuery.q.operatorCode == ''
          && this.listQuery.q.packageId == ''
          && this.listQuery.q.status == ''
          && this.listQuery.q.cpStatus == ''
          && this.listQuery.q.offPeriod == ''
          && this.listQuery.q.insertDateRange == ''
          && this.listQuery.q.expiryDateRange == ''
        ) {
          this.modelDelete = true;
        } else {
          this.modelDelete = false;
        }
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
      handleCancel() {
        this.dialogUpdatePackageVisible = false;
        this.dialogUpdateMonthVisible = false;
        this.dialogUpdateExpiryDateVisible = false;
        this.dialogUpdateAPNVisible = false;
        this.dialogUpdateStatusVisible = false;
      },
      handelUpdatePackage() {
        const noColumn = this.batchUpdatePackageForm.packageId == '';
        if (!noColumn) {
          batchUpdatePackage(this.modelIds, this.listQuery.q, this.batchUpdatePackageForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '更新成功',
                type: 'success',
                duration: 0,
                showClose: true
              });
              this.handleCancel();
              this.getList();
            }
          });
        } else {
          this.handleCancel();
        }
      },
      handelUpdateMonth() {
        const noColumn = this.batchUpdateMonthForm.offPeriod == '' && this.batchUpdateMonthForm.suStained == '';
        if (!noColumn) {
          batchUpdateOffPeriod(this.modelIds, this.listQuery.q, this.batchUpdateMonthForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '更新成功',
                type: 'success',
                duration: 0,
                showClose: true
              });
              this.handleCancel();
              this.getList();
            }
          });
        } else {
          this.handleCancel();
        }
      },
      handelUpdateExpiryDate() {
        const noColumn = this.batchUpdateExpiryDateForm.expiryDate == '';
        if (!noColumn) {
          batchUpdateExpiryDate(this.modelIds, this.listQuery.q, this.batchUpdateExpiryDateForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '更新成功',
                type: 'success',
                duration: 0,
                showClose: true
              });
              this.handleCancel();
              this.getList();
            }
          });
        } else {
          this.handleCancel();
        }
      },
      handelUpdateAPN() {
        const noColumn = this.batchUpdateAPNForm.apn == '';
        if (!noColumn) {
          batchUpdateAPN(this.modelIds, this.listQuery.q, this.batchUpdateAPNForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '更新成功',
                type: 'success',
                duration: 0,
                showClose: true
              });
              this.handleCancel();
              this.getList();
            }
          });
        } else {
          this.handleCancel();
        }
      },
      handelUpdateStatus() {
        const noColumn = this.batchUpdateStatusForm.status == '';
        if (!noColumn) {
          batchUpdateStatus(this.modelIds, this.listQuery.q, this.batchUpdateStatusForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '更新成功',
                type: 'success',
                duration: 0,
                showClose: true
              });
              this.handleCancel();
              this.getList();
            }
          });
        } else {
          this.handleCancel();
        }
      },
      handleDownload() {
        download(this.modelIds, this.listQuery.q, {}).then(response=>{
          const res = response.data;
          require.ensure([], () => {
            const { export_json_to_excel } = require('vendor/Export2Excel');
            const tHeader = res.data.headList;
            const data = res.data.dataList;
            const fileName = res.data.fileName;
            export_json_to_excel(tHeader, data, fileName);
          })
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
