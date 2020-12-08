<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('select_sim.tsid')"
                    v-model="listQuery.q.tsid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('select_sim.imsi')"
                    v-model="listQuery.q.imsi" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('select_sim.usergroup')"
                    v-model="listQuery.q.usergroup" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="4">
          <el-select v-model="listQuery.q.province" filterable clearable :placeholder="$t('select_sim.provinceCode')">
            <el-option v-for="i in provinceCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>


        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
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
        prop="tsid"
        v-bind:label="$t('select_sim.tsid')"
        width="100">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/tsid_list?tsid=' + scope.row.tsid" target="_blank">{{ scope.row.tsid }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('select_sim.imsi')"
        width="140">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/imsi_list?imsi=' + scope.row.imsi" target="_blank">{{ scope.row.imsi }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="dateCn"
        v-bind:label="$t('select_sim.date')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="usergroup"
        v-bind:label="$t('select_sim.usergroup')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="resultCodeCn"
        v-bind:label="$t('select_sim.resultCodeCn')"
        width="120">
      </el-table-column>

      <el-table-column
        prop="lac2"
        v-bind:label="$t('select_sim.lac2')"
        width="120">
      </el-table-column>

      <el-table-column
        prop="provinceName"
        v-bind:label="$t('select_sim.provinceName')"
        width="160">
      </el-table-column>

      <el-table-column
        prop="dayFlow"
        align="right"
        v-bind:label="$t('select_sim.dayFlow')"
        width="100">
      </el-table-column>

      <el-table-column
        prop="monthFlow"
        align="right"
        v-bind:label="$t('select_sim.monthFlow')"
        width="100">
      </el-table-column>


    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->
  </div>
</template>


<script>
  import { provinceMap } from 'api/operation/province';
  import { modelList} from 'api/terminal/select_sim';
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
          }
        },
        modelDelete: true,
        modelIds: [],
        provinceCodeArr: [],
      }
    },
    created() {
      this.getList();
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
        if (this.listQuery.q.tsid == '' && this.listQuery.q.imsi == '' ) {
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
