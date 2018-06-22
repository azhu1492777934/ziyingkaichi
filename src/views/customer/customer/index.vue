<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('customer.phoneNumber')"
                    v-model="listQuery.q.phoneNumber" type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('customer.name')"
                    v-model="listQuery.q.name" type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('customer.realName')"
                    v-model="listQuery.q.realName" type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="listQuery.q.status" :placeholder="$t('customer.status')">
            <el-option v-for="item in StatusArr" :key="item.key" :label="item.name" :value="item.id">{{ item.name }}
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="8">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="batchDelete()" icon="delete" style="left: 10px">删除</el-button>
          <a :href="'#/customer/customer/new'" target="_self">
            <el-button class="filter-item el-icon-plus" type="primary" style="margin-right: 10px;">新建</el-button>
          </a>
        </el-col>
      </el-row>
    </div>

    <br/>

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
        v-bind:label="$t('customer.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        v-bind:label="$t('customer.phoneNumber')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        v-bind:label="$t('customer.name')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="realName"
        v-bind:label="$t('customer.realName')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        v-bind:label="$t('customer.email')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="countryCodeCn"
        v-bind:label="$t('customer.countryCode')"
        width="120">
      </el-table-column>
      <el-table-column
        prop="currencyCn"
        v-bind:label="$t('customer.currency')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('customer.status')"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <a :href="'#/customer/customer/edit/' + scope.row.id" target="_self"><el-button size="small">编辑</el-button></a>
          <!--<router-link :to="'/customer/edit/' + scope.row.id"><el-button size="small">编辑</el-button> </router-link>-->
          <el-button size="small" @click="handelDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading && total > 0" class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-size="listQuery.perPage" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>

  </div>
</template>


<script>
  import { modelList, batchDelete, modelDelete } from 'api/customer/customer';
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
            phoneNumber: '',
            name: '',
            realName: '',
            status: '',
          }
        },
        modelDelete: true,
        Local: [],
        modelIds: [],
        StatusArr: [{ id: '0', name: '正常' }, { id: '1', name: '停用' }],
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
        if (this.listQuery.q.phoneNumber == '' && this.listQuery.q.name == '' && this.listQuery.q.realName == '' && this.listQuery.q.status == '') {
          this.modelDelete = true;
        } else {
          this.modelDelete = false;
        }
      },
      batchDelete() {
        var x;
        const noModelIds = this.modelIds.length === 0;
        const noQuery = this.listQuery.q.phoneNumber == '' && this.listQuery.q.name == '' && this.listQuery.q.realName == '' && this.listQuery.q.status == '';
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
                  this.listQuery.q.phoneNumber = strNull;
                  this.listQuery.q.name = strNull;
                  this.listQuery.q.realName = strNull;
                  this.listQuery.q.status = strNull;
                }
                console.log("this.modelIds = " + this.modelIds)
                console.log("this.listQuery.q = " + this.listQuery.q)
                batchDelete(this.modelIds, this.listQuery.q).then(response=>{
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
                duration: 0,
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
