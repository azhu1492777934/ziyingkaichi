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
        <el-col :span="8">
          <el-date-picker style="width: 100%;"
                          v-model="listQuery.q.date"
                          type="daterange"
                          :start-placeholder="$t('terminal_sim.date')" :end-placeholder="$t('terminal_sim.date')">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal_sim.usergroup')"
                    v-model="listQuery.q.usergroup" clearable type="text"> </el-input>
        </el-col>
        <!-- el-col :span="4">
        <el-select v-model="listQuery.q.vCountryCode" filterable clearable :placeholder="$t('terminal_sim.vCountryCode')">
          <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-col -->

        <el-col :span="4">
          <el-select v-model="listQuery.q.province" filterable clearable :placeholder="$t('terminal_sim.provinceCode')">
            <el-option v-for="i in provinceCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-top: 10px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="handelBatchUnbind()" icon="delete" style="left: 10px">批量释放主卡</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="handelBatchReboot()" icon="delete" style="left: 10px">批量重启</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="handelBatchShutdown()" icon="delete" style="left: 10px">批量关机</el-button>
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
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/tsid_list?tsid=' + scope.row.tsid" target="_blank">{{ scope.row.tsid }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('terminal_sim.imsi')"
        width="140">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/imsi_list?imsi=' + scope.row.imsi" target="_blank">{{ scope.row.imsi }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="dateCn"
        v-bind:label="$t('terminal_sim.date')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="beatTimeCn"
        v-bind:label="$t('terminal_sim.beatTime')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="usergroup"
        v-bind:label="$t('terminal_sim.usergroup')"
        width="120">
      </el-table-column>

      <el-table-column
        prop="provinceName"
        v-bind:label="$t('terminal_sim.provinceName')"
        width="140">
      </el-table-column>

      <el-table-column
        prop="dayFlow"
        align="right"
        v-bind:label="$t('terminal_sim.dayFlow')"
        width="100">
      </el-table-column>

      <el-table-column
        prop="monthFlow"
        align="right"
        v-bind:label="$t('terminal_sim.monthFlow')"
        width="100">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="120"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="small" @click="handelUnbind(scope.row.tsid)">释放主卡</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->
  </div>
</template>


<script>
  import { countryMap } from 'api/operation/country';
  import { provinceMap } from 'api/operation/province';
  import { modelList, modelUnbind, modelBatchUnbind,modelBatchReboot,modelBatchShutdown } from 'api/terminal/terminal_sim';
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
          perPage: 100,
          q: {
            tsid: '',
            imsi: '',
            vCountryCode: '',
          }
        },
        modelDelete: true,
        modelIds: [],
        countryCodeArr: [],
        provinceCodeArr: [],
      }
    },
    created() {
      this.getList();
      this.getCountryMap();
      this.getProvinceMap();
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
      getCountryMap() {
        countryMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.countryCodeArr = res.data;
          }
        });
      },
      getProvinceMap() {
        provinceMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.provinceCodeArr = res.data;
          }
        });
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
                      duration: _const.messageDuration,
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
                duration: _const.messageDuration,
                showClose: true
              });
            }
          }
        });
      },

      handelBatchReboot() {
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
            h('span', null, '重启设备，终端在下一次心跳重启 '),
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
              instance.confirmButtonText = '设备下发重启指令中...';
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
                modelBatchReboot(this.modelIds, this.listQuery.q).then(response=>{
                  const res = response.data;
                  if (res.status > 0) {
                    Message({
                      message: '下发重启指令成功',
                      type: 'success',
                      duration: _const.messageDuration,
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
                message: '已取消重启指令',
                duration: _const.messageDuration,
                showClose: true
              });
            }
          }
        });
      },

      handelBatchShutdown() {
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
            h('span', null, '给终端下发关机指令 '),
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
              instance.confirmButtonText = '关机指令下发中...';
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
                modelBatchShutdown(this.modelIds, this.listQuery.q).then(response=>{
                  const res = response.data;
                  if (res.status > 0) {
                    Message({
                      message: '下发关机指令成功',
                      type: 'success',
                      duration: _const.messageDuration,
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
                message: '已取消释下发关机指令',
                duration: _const.messageDuration,
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
                duration: _const.messageDuration,
                showClose: true
              });
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消释放主卡',
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
