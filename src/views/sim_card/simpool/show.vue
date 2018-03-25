<template>
  <div class="app-container calendar-list-container">
    <el-form v-loading.body="listLoading">
      <el-form-item v-bind:label="$t('simpool.id')"> <div class="item"> {{ detail.id}}</div> </el-form-item>
      <el-form-item v-bind:label="$t('simpool.spid')"> <div class="item">{{ detail.spid }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('simpool.ip')"> <div class="item">{{ detail.ip }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('simpool.port')"> <div class="item">{{ detail.port }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('simpool.sumIp')"> <div class="item">{{ detail.sumIp }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('simpool.webPort')"> <div class="item">{{ detail.webPort }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('simpool.version')"> <div class="item">{{ detail.version }}</div> </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="detail.cards"
      border
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="cpId"
        v-bind:label="$t('simcard.cpId')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="cpChannelId"
        v-bind:label="$t('simcard.cpChannelId')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="cpStatus"
        v-bind:label="$t('simcard.cpStatus')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('simcard.imsi')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="iccid"
        v-bind:label="$t('simcard.iccid')"
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
