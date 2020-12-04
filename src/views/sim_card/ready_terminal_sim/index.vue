<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('ready_terminal_sim.tsid')"
                    v-model="listQuery.q.tsid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('ready_terminal_sim.imsi')"
                    v-model="listQuery.q.imsi" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.q.type" clearable :placeholder="$t('ready_terminal_sim.type')">
            <el-option v-for="i in typeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="12">
          <el-button style="margin-left: 26px" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="batchDelete()">批量删除</el-button>
          <a :href="'#/sim_card/ready_terminal_sim/new'" target="_self" style="margin-left: 10px;">
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
        v-bind:label="$t('ready_terminal_sim.id')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="tsid"
        v-bind:label="$t('ready_terminal_sim.tsid')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('ready_terminal_sim.imsi')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="lastStatusCn"
        v-bind:label="$t('ready_terminal_sim.lastStatus')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="insertDateCn"
        v-bind:label="$t('ready_terminal_sim.insertDate')"
        width="160">
      </el-table-column>
      <el-table-column
        prop="typeCn"
        v-bind:label="$t('ready_terminal_sim.type')"
        width="140">
      </el-table-column>
    </el-table>

    <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->
  </div>
</template>


<script>
  import { modelList, batchDelete, modelDelete } from 'api/sim_card/ready_terminal_sim';
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
            type: '',
          }
        },
        typeArr: [{ id: 0, name: '临时指定一次' }, { id: 1, name: '一直指定' }],
        modelDelete: true,
        dialogUpdateVisible: false,
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
      batchDelete() {
        var x;
        const noModelIds = this.modelIds.length === 0;
        const noQuery = this.listQuery.q.tsid == '' && this.listQuery.q.imsi == '' && this.listQuery.q.type == '';
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
                  this.listQuery.q.tsid = strNull;
                  this.listQuery.q.imsi = strNull;
                  this.listQuery.q.type = strNull;
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
                    this.listQuery.q.tsid = strNull;
                    this.listQuery.q.imsi = strNull;
                    this.listQuery.q.type = strNull;
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
