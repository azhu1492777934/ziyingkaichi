<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal_sim.tsid')"
                    v-model="listQuery.q.tsid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal_sim.imsi')"
                    v-model="listQuery.q.imsi" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.q.vCountryCode" filterable clearable :placeholder="$t('terminal_sim.vCountryCode')">
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="handelBatchUnbind()" icon="delete" style="left: 10px">批量释放主卡</el-button>
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
        v-bind:label="$t('terminal_sim.id')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tsid"
        v-bind:label="$t('terminal_sim.tsid')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('terminal_sim.imsi')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        v-bind:label="$t('terminal_sim.date')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="beatTime"
        v-bind:label="$t('terminal_sim.beatTime')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="vcountryCodeCn"
        v-bind:label="$t('terminal_sim.vCountryCode')"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <el-button size="small" @click="handelUnbind(scope.row.tsid)">释放主卡</el-button>
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
  import { countryMap } from 'api/operation/country';
  import { modelList, modelUnbind, modelBatchUnbind } from 'api/terminal/terminal_sim';
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
            tsid: '',
            imsi: '',
            vCountryCode: '',
          }
        },
        modelDelete: true,
        modelIds: [],
        countryCodeArr: [],
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
        if (this.listQuery.q.tsid == '' && this.listQuery.q.imsi == '' && this.listQuery.q.vCountryCode == '') {
          this.modelDelete = true;
        } else {
          this.modelDelete = false;
        }
      },
      handelBatchUnbind() {
        var x;
        const noModelIds = this.modelIds.length === 0;
        if (noModelIds) {
          x = this.total;

        } else {
          x = this.modelIds.length;
        }
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '释放主卡当前数据 '),
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
              instance.confirmButtonText = '释放主卡中...';
              setTimeout(() => {
                this.listLoading = true;
                done();
                var strNull = '';
                if (!noModelIds) {
                  this.listQuery.q.tsid = strNull;
                  this.listQuery.q.imsi = strNull;
                  this.listQuery.q.vCountryCode = strNull;
                }
                console.log("this.modelIds = " + this.modelIds)
                console.log("this.listQuery.q = " + this.listQuery.q)
                modelBatchUnbind(this.modelIds, this.listQuery.q).then(response=>{
                  const res = response.data;
                  if (res.status > 0) {
                    Message({
                      message: '释放主卡成功',
                      type: 'success',
                      duration: 0,
                      showClose: true
                    });
                    this.listQuery.q.tsid = strNull;
                    this.listQuery.q.imsi = strNull;
                    this.listQuery.q.vCountryCode = strNull;
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
                message: '已取消释放主卡',
                duration: 0,
                showClose: true
              });
            }
          }
        });
      },
      handelUnbind(id) {
        this.$confirm('此操作将永久释放主卡, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.listLoading = true;
          modelUnbind(id).then(response => {
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '释放主卡成功',
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
            message: '已取消释放主卡',
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
