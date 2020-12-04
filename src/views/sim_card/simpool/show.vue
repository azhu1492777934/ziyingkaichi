<template>
  <div class="app-container calendar-list-container">
    <el-form v-loading.body="listLoading">
      <el-row>
        <el-col :span="4">
      <el-form-item v-bind:label="$t('simpool.spid')"> <div class="item">{{ detail.spid }}</div> </el-form-item>
        </el-col>
        <el-col :span="4">
      <el-form-item v-bind:label="$t('simpool.ip')"> <div class="item">{{ detail.ip }}</div> </el-form-item>
        </el-col>
        <el-col :span="4">
      <el-form-item v-bind:label="$t('simpool.port')"> <div class="item">{{ detail.port }}</div> </el-form-item>
        </el-col>
        <el-col :span="4">
      <el-form-item v-bind:label="$t('simpool.webPort')"> <div class="item">{{ detail.webPort }}</div> </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>-->
        <!--<el-col :span="4">-->
        <el-form-item v-bind:label="$t('simpool.noCardCount')"> <div class="item">{{ detail.noCardCount }}</div> </el-form-item>
      <!--</el-col>-->
        <!--<el-col :span="4">-->
          <el-form-item v-bind:label="$t('simpool.offlineCount')"> <div class="item">{{ detail.offlineCount }}</div> </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="4">-->
          <el-form-item v-bind:label="$t('simpool.usedCount')"> <div class="item">{{ detail.usedCount }}</div> </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="4">-->
          <el-form-item v-bind:label="$t('simpool.freeCount')"> <div class="item">{{ detail.freeCount }}</div> </el-form-item>
        <!--</el-col>-->
      <!--</el-row>-->
    </el-form>
    <el-table
      ref="multipleTable"
      :data="detail.cards"
      border
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="cpId"
        v-bind:label="$t('simpool_card.cpId')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cpChannelId"
        v-bind:label="$t('simpool_card.cpChannelId')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cpStatusCn"
        v-bind:label="$t('simpool_card.cpStatusCn')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('simpool_card.imsi')"
        width="180">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/imsi_list?imsi=' + scope.row.imsi" target="_blank">{{ scope.row.imsi }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="iccid"
        v-bind:label="$t('simpool_card.iccid')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('simpool_card.statusCn')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="tsid"
        v-bind:label="$t('simpool_card.tsid')"
        width="120">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/tsid_list?tsid=' + scope.row.tsid" target="_blank">{{ scope.row.tsid }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="dateCn"
        v-bind:label="$t('simpool_card.dateCn')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="beatTimeCn"
        v-bind:label="$t('simpool_card.beatTimeCn')"
        width="180">
      </el-table-column>


    </el-table>

  </div>
</template>

<script>
  import { modelDetail } from 'api/sim_card/simpool';
  import { Message } from 'element-ui';
  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: false,
        detail: {},
        tripForm: {
          id: undefined,
          tsid: undefined,
          status: undefined,
        },
        dialogTripForm: false,
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '停用' }],
      };
    },
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.listLoading = true;
        modelDetail(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            this.detail = res.data;
          }
          this.listLoading = false;
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-form {
      margin: 50px;
      p {
        margin: 0;
      }
      .item {
        margin-left: 100px;
      }
    }
    .detail-buttons {
      float: right;
    }
  }
</style>
