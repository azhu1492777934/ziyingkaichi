<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-select v-model="listQuery.q.countryCode" filterable clearable>
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('country_price.customerRealName')"
                    v-model="listQuery.q.customerRealName" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="batchDelete()">批量删除</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdateVisible = true">批量修改</el-button>
          <a :href="'#/customer/country_price/new'" target="_self" style="margin-left: 10px;">
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
      max-height="600"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        v-bind:label="$t('country_price.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="countryCodeCn"
        v-bind:label="$t('country_price.countryCode')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="customerRealName"
        v-bind:label="$t('country_price.customerRealName')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="currencyCn"
        v-bind:label="$t('country_price.currency')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="price"
        v-bind:label="$t('country_price.price')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="maxData"
        v-bind:label="$t('country_price.maxData')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="speedLimit"
        v-bind:label="$t('country_price.speedLimit')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="describe"
        v-bind:label="$t('country_price.describe')"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
        fixed="right"
      >
        <template slot-scope="scope">
          <a :href="'#/customer/country_price/edit/' + scope.row.id" target="_self"><el-button size="small" type="primary" plain>编辑</el-button></a>
          <el-button size="small" type="danger" plain @click="handelDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->

    <!-- 批量修改-start -->
    <el-dialog class="modify" title="批量修改" :visible.sync="dialogUpdateVisible" size="tiny" @close="handleCancel('batchUpdateForm')">
      <el-form :model="batchUpdateForm">
        <el-form-item v-bind:label="$t('country_price.countryCode')" :label-width="formLabelWidth" prop="countryCode" :rules="rules.countryCode">
          <el-select v-model="batchUpdateForm.countryCode" filterable clearable>
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.customerRealName')" :label-width="formLabelWidth" prop="countryCode" :rules="rules.customerId">
          <el-select :remote-method="remoteMethod" remote filterable clearable v-model="batchUpdateForm.customerId" placeholder="" class="permission-input">
            <el-option v-for="i in customerArr" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.currency')" :label-width="formLabelWidth" prop="countryCode" :rules="rules.currency">
          <el-radio-group v-model="batchUpdateForm.currency">
            <el-radio v-for="i in currencyArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.price')" :label-width="formLabelWidth" prop="price" :rules="rules.price">
          <el-input v-model="batchUpdateForm.price"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.maxData')" :label-width="formLabelWidth" prop="maxData" :rules="rules.maxData">
          <el-input v-model="batchUpdateForm.maxData"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.speedLimit')" :label-width="formLabelWidth" prop="speedLimit" :rules="rules.speedLimit">
          <el-input v-model="batchUpdateForm.speedLimit"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.describe')" :label-width="formLabelWidth" prop="describe" :rules="rules.speedLimit">
          <el-input v-model="batchUpdateForm.describe"></el-input>
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
  import { modelList, batchDelete, modelDelete, batchUpdate } from 'api/customer/country_price';
  import { queryCustomer } from 'api/customer/customer';
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
        batchUpdateForm: {
          countryCode: undefined,
          customerId: undefined,
          currency: undefined,
          price: undefined,
          maxData: undefined,
          speedLimit: undefined,
          describe: undefined,
        },
        rules: {
          countryCode: [
            // { type: true, message: this.$t('country_price.countryCode') + '不能为空' }
          ],
          customerId: [
            // { required: true, message: this.$t('country_price.customerRealName') + '不能为空' }
          ],
          currency: [
            // { required: true, message: this.$t('country_price.currency') + '不能为空' }
          ],
          price: [
            // { required: true, message: this.$t('country_price.price') + '不能为空' }
          ],
          maxData: [
            // { required: true, message: this.$t('country_price.maxData') + '不能为空' }
          ],
          speedLimit: [
            // { required: true, message: this.$t('country_price.speedLimit') + '不能为空' }
          ],
          describe: [
            // { required: true, message: this.$t('country_price.describe') + '不能为空' }
          ],
        },
        modelDelete: true,
        dialogUpdateVisible: false,
        formLabelWidth: '150px',
        countryCodeArr: [],
        modelIds: [],
        customerArr: [],
        currencyArr: [{ id: 0, name: '人民币' }, { id: 1, name: '美元' }, { id: 2, name: '台币' }],
      }
    },
    created() {
      this.getCountryMap();
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
      handelUpdate() {
        const noColumn = this.batchUpdateForm.countryCode == ''
          && this.batchUpdateForm.customerId == ''
          && this.batchUpdateForm.currency == ''
          && this.batchUpdateForm.price == ''
          && this.batchUpdateForm.maxData == ''
          && this.batchUpdateForm.speedLimit == ''
          && this.batchUpdateForm.describe == '';
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
      handleCancel(formName) {
        this.batchUpdateForm.countryCode = '';
        this.dialogUpdateVisible = false;
      },
      queryCustomers(name) {
        queryCustomer(name).then(response => {
          const res = response.data;
          if (res.status > 0) {
            this.customerArr = res.data;
          }
        })
      },
      remoteMethod(query) {
        if (query !== '') {
          this.queryCustomers(query);
        } else {
          this.customerArr = [];
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
        if (this.listQuery.q.countryCode == '' && this.listQuery.q.customerRealName == '') {
          this.modelDelete = true;
        } else {
          this.modelDelete = false;
        }
      },
      batchDelete() {
        var x;
        const noModelIds = this.modelIds.length === 0;
        const noQuery = this.listQuery.q.countryCode == '' && this.listQuery.q.customerRealName == '';
        if (noModelIds) {
          x = this.total;
        } else {
          x = this.modelIds.length;
        }
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '删除当前数据 '),
            h('span', { style: 'color: red' }, x),
            h('span', null, '条 ')
          ]),
          showCancelButton: true,
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '删除中...';
              setTimeout(() => {
                this.listLoading = true;
                done();
                var strNull = '';
                if (!noModelIds) {
                  this.listQuery.q.countryCode = strNull;
                  this.listQuery.q.customerRealName = strNull;
                }
                console.log("this.modelIds = " + this.modelIds)
                console.log("this.listQuery.q = " + this.listQuery.q)
                batchDelete(this.modelIds, this.listQuery.q).then(response=>{
                  const res = response.data;
                  if (res.status > 0) {
                    Message({
                      message: '删除成功',
                      type: 'success',
                      duration: _const.messageDuration,
                      showClose: true
                    });
                    this.listQuery.q.countryCode = strNull;
                    this.listQuery.q.customerRealName = strNull;
                    this.getList();
                  }
                });
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1000);
            } else {
              console.log("else ------- done()");
              done();
              this.$message({
                type: 'info',
                message: '已取消删除',
                duration: _const.messageDuration,
                showClose: true
              });
            }
          }
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
    .modify .el-input, 
    .modify .el-select {
      width: 300px;
    }
  }
</style>
