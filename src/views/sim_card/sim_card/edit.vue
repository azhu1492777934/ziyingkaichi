<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑主卡信息</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>


      <el-form-item v-bind:label="$t('simcard.imsi')" prop="imsi" >
        <el-input type="number" v-model="ruleForm.imsi" :disabled="false"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.number')" prop="number">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('simcard.tempImei')" prop="tempImei">
        <el-input  v-model="ruleForm.tempImei"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('simcard.iccid')" prop="iccid">
        <el-input v-model="ruleForm.iccid"  :disabled="false"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.pin')" prop="pin">
        <el-input v-model="ruleForm.pin"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.operatorCode')" prop="operatorCode">
        <el-select v-model="ruleForm.operatorCode" filterable clearable>
          <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.mcNumber')" prop="mcNumber">
        <el-input v-model="ruleForm.mcNumber"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.packageId')" prop="packageId">
        <el-select v-model="ruleForm.packageId" filterable clearable  :disabled="false">
          <el-option v-for="i in packageArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.offPeriod')" prop="offPeriod">
        <el-input type="number" v-model="ruleForm.offPeriod"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.suStained')" prop="suStained">
        <el-input type="number" v-model="ruleForm.suStained"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.simMeProtocol')" prop="simMeProtocol">
        <el-input v-model="ruleForm.simMeProtocol"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.status')" prop="status">
        <el-select v-model="ruleForm.status" filterable clearable>
          <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.cpStatus')" prop="cpStatus">
        <el-select v-model="ruleForm.cpStatus" filterable clearable  :disabled="false">
          <el-option v-for="i in cpStatusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.cpId')" prop="cpId">
        <el-select v-model="ruleForm.cpId" filterable clearable  :disabled="false">
          <el-option v-for="i in simPoolArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.cpChannelId')" prop="cpChannelId">
        <el-input type="number" v-model="ruleForm.cpChannelId"  :disabled="false"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.countryCode')" prop="countryCode">
        <el-select v-model="ruleForm.countryCode" filterable clearable>
          <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.provinceCode')" prop="provinceCode">
        <el-input type="number" v-model="ruleForm.provinceCode"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.expiryDate')" prop="expiryDate">
        <el-date-picker type="date" v-model="ruleForm.expiryDate"></el-date-picker>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.insertDate')" prop="insertDate">
        <el-date-picker type="date" v-model="ruleForm.insertDate"  :disabled="false"></el-date-picker>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.usedVpn')" prop="usedVpn">
        <el-input type="number" v-model="ruleForm.usedVpn"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.vpnIP')" prop="vpnIP">
        <el-input v-model="ruleForm.vpnIP"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.vpnName')" prop="vpnName">
        <el-input v-model="ruleForm.vpnName"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.vpnPass')" prop="vpnPass">
        <el-input v-model="ruleForm.vpnPass"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.softType')" prop="softType">
        <el-select v-model="ruleForm.softType" filterable clearable>
          <el-option v-for="i in softTypeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.ki')" prop="ki">
        <el-input v-model="ruleForm.ki"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.opc')" prop="opc">
        <el-input v-model="ruleForm.opc"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.op')" prop="op">
        <el-input v-model="ruleForm.op"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.apn')" prop="apn">
        <el-input v-model="ruleForm.apn"></el-input>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.openDate')" prop="openDate">
        <el-date-picker type="date" v-model="ruleForm.openDate"></el-date-picker>
      </el-form-item>
      <el-form-item v-bind:label="$t('simcard.note')" prop="note">
        <el-input v-model="ruleForm.note"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { countryMap } from 'api/operation/country';
  import { operatorMap } from 'api/operation/operator';
  import { simpackageMap } from 'api/sim_card/simpackage';
  import { simpoolMap } from 'api/sim_card/simpool';
  import { modelDetail, modelUpdate } from 'api/sim_card/sim_card';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
        },
        rules: {
          number: [
            { required: true, message: this.$t('simcard.number') + '不能为空' }
          ],
          operatorCode: [
            { required: true, message: this.$t('simcard.operatorCode') + '不能为空' }
          ],
          mcNumber: [
            { required: true, message: this.$t('simcard.mcNumber') + '不能为空' }
          ],
          offPeriod: [
            { required: true, message: this.$t('simcard.offPeriod') + '不能为空' }
          ],
          suStained: [
            { required: true, message: this.$t('simcard.suStained') + '不能为空' }
          ],
          simMeProtocol: [
            { required: true, message: this.$t('simcard.simMeProtocol') + '不能为空' }
          ],
          status: [
            { required: true, message: this.$t('simcard.status') + '不能为空' }
          ],
          countryCode: [
            { required: true, message: this.$t('simcard.countryCode') + '不能为空' }
          ],
          usedVpn: [
            { required: true, message: this.$t('simcard.usedVpn') + '不能为空' }
          ],
          softType: [
            { required: true, message: this.$t('simcard.softType') + '不能为空' }
          ],
        },
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '停用' }, { id: 2, name: '指定' }, { id: 3, name: '待激活' }, { id: 4, name: '作废' }, { id: 5, name: '冻结' }, { id: 6, name: '失败' }],
        cpStatusArr: [{ id: 0, name: '正常' }, { id: 1, name: '待激活' }, { id: 2, name: '拔出' }, { id: 8, name: '超时' },],
        softTypeArr: [{ id: 0, name: '实卡' }, { id: 1, name: '软卡' }, ],
        offPeriodArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,''],
        countryCodeArr: [],
        operatorCodeArr: [],
        packageArr: [],
        simPoolArr: [],
      }
    },
    created() {
      this.getDetail();
      this.getCountryMap();
      this.getOperatorMap();
      this.getSimPackageMap();
      this.getSimpoolMap();
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
      getOperatorMap() {
        operatorMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.operatorCodeArr = res.data;
          }
        });
      },
      getSimPackageMap() {
        simpackageMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.packageArr = res.data;
          }
        });
      },
      getSimpoolMap() {
        simpoolMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.simPoolArr = res.data;
          }
        });
      },
      getDetail() {
        modelDetail(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.ruleForm = data;
            console.log(this.ruleForm);
          }
        })
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
      cancelForm() {
        this.$router.push('/sim_card/sim_card');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var ruleForm = this.ruleForm;
          console.log(ruleForm);
          if (valid) {
            modelUpdate(ruleForm).then(response=>{
              const res = response.data;
              if (res.status > 0) {
                Message({
                  message: '更新成功',
                  type: 'success',
                  duration: _const.messageDuration,
                  showClose: true
                });
                this.$router.push('/sim_card/sim_card');
              }
            });
          }
        });
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  #basicData_new {
    .permission-input {
      width: 200px;
    }
    .el-input {
      width: 300px;
    }
    .el-form-item {
      margin-bottom: 20px;
      label {
        width: 120px;
      }
      .el-form-item__error{
        margin-left: 120px;
      }
    }
    .is-default-hidden {
      display: none;
    }
  }
</style>
