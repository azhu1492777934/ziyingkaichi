<template>
  <div class="app-container calendar-list-container">
    <div class="detail-buttons">
      <a :href="'/customer/order/edit/' + this.id" target="_blank">
        <el-button class="filter-item" type="primary" >编辑</el-button>
      </a>
    </div>

    <el-form v-loading.body="listLoading">
      <el-form-item v-bind:label="$t('order.id')"> <div class="item"> {{ detail.id}}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.identifier')"> <div class="item">{{ detail.identifier }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.customerID')"> <div class="item">{{ detail.customerRealName }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.tsCount')"> <div class="item">{{ detail.tsCount }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.type')"> <div class="item">{{ detail.type }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.countryCode')"> <div class="item">{{ detail.countryCode }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.beginDate')"> <div class="item">{{ detail.beginDateCn }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.endDate')"> <div class="item">{{ detail.endDateCn }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.total')"> <div class="item">{{ detail.total }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.currency')"> <div class="item">{{ detail.currencyCn }}</div> </el-form-item>
      <el-form-item v-bind:label="$t('order.status')"> <div class="item">{{ detail.statusCn }}</div> </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="detail.orderTrips"
      border
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="orderID"
        v-bind:label="$t('orderTrip.orderID')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tsid"
        v-bind:label="$t('orderTrip.tsid')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="countryCode"
        v-bind:label="$t('orderTrip.countryCode')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tripDateCn"
        v-bind:label="$t('orderTrip.tripDate')"
        width="140">
      </el-table-column>
      <el-table-column
        prop="price"
        v-bind:label="$t('orderTrip.price')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="customerID"
        v-bind:label="$t('orderTrip.customerID')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="maxData"
        v-bind:label="$t('orderTrip.maxData')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="speedLimit"
        v-bind:label="$t('orderTrip.speedLimit')"
        width="80">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('orderTrip.status')"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width=""
      >
        <template slot-scope="scope">
          <el-button size="small" @click="handelUpdateTrip(scope.row.id, scope.row.tsid, scope.row.status)">修改设备号/状态</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改 -start -->
    <el-dialog title="修改设备号/状态" :visible.sync="dialogTripForm">
      <el-form :model="tripForm">
        <el-input v-model="tripForm.id" style="display: none"></el-input>
        <el-form-item label="设备号" prop="tsid">
          <el-input v-model="tripForm.tsid"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="tripForm.status">
            <el-radio v-for="i in statusArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTripForm = false">取 消</el-button>
        <el-button type="primary" @click="updateTrip()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -end -->
  </div>
</template>

<script>
  import { modelShow, updateOrderTrip } from 'api/customer/order';
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
        modelShow(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            this.detail = res.data;
          }
          this.listLoading = false;
        })
      },
      handelUpdateTrip(tripId, tsid, status){
        this.tripForm.id = tripId;
        this.tripForm.tsid = tsid;
        this.tripForm.status = status;
        this.dialogTripForm = true;
      },
      updateTrip(){
        updateOrderTrip(this.tripForm).then(response => {
          const res = response.data;
          if (res.status > 0) {
            Message({
              message: '修改成功',
              type: 'success',
              duration: 0,
              showClose: true
            });
          }
          this.dialogTripForm = false;
          this.getDetail();
        })
      }
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
