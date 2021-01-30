<template>
    <div class="app-container calendar-list-container" id="basicData_search_index">
        <div class="filter-container search">
            <el-row>
                <el-col :span="4" >
                    <el-select  v-model="listQuery.q.usergroup" filterable clearable :placeholder="$t('terminal_group.userGroup')">
                        <el-option v-for="i in groupCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" style="margin: 0 0 10px 26px;">搜索</el-button>
                </el-col>
            </el-row>
            <el-table
                ref="multipleTable"
                v-loading="listLoading"
                :data="list"
                border
                max-height="560"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="组编号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="tsid"
                    label="分组名"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="imsi"
                    label="发卡运营商"
                    width="140">
                </el-table-column>
                <el-table-column
                    prop="dateCn"
                    label="网络类型"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="beatTimeCn"
                    label="IMIE"
                    width="160">
                </el-table-column>

                <el-table-column
                    prop="usergroup"
                    label="重置周期"
                    width="120">
                </el-table-column>

                <el-table-column
                    prop="provinceName"
                    label="重置流量(G)"
                    width="140">
                </el-table-column>

                <el-table-column
                    prop="dayFlow"
                    align="right"
                    label="重置时间"
                    width="100">
                </el-table-column>

                <el-table-column
                    prop="monthFlow"
                    align="right"
                    label="调度策略"
                    width="100">
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center"
                    width="120"
                    fixed="right">
                    <template slot-scope="scope">
                    <el-button size="small" type="primary" plain @click="handelUnbind(scope.row.tsid)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>


<script>
    import { groupMap } from 'api/terminal/terminal';
    import { modelList } from 'api/terminal/terminal_group';

    export default {
        data() {
            return {
                listLoading: false,
                groupCodeArr: [],
                listQuery: {
                    page: 1,
                    perPage: 100,
                    q: {
                        usergroup: '',
                    }
                },
                list: [],

            }
        },
        created() {
            this.getList();
            this.getGroupMap();
        },
        methods: {
            getList() {
                this.listLoading = true;
                modelList(this.listQuery).then(response => {
                const res = response.data;
                console.log(res);
                if (res.status > 0) {
                    const data = res.data;
                    this.list = data.list;
                    this.total = data.extra.totalCount;
                }
                this.listLoading = false
                })
            },
            getGroupMap() {
                groupMap().then(response=>{
                const res = response.data;
                if (res.status > 0) {
                    this.groupCodeArr = res.data;
                }
                });
            },
            handleSelectionChange() {
                console.log(1);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #basicData_search_index {
    font-size: 12px;
  }
</style>