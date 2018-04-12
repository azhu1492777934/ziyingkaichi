<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添主卡信息</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('simcard.imsi')" :prop="'modelCondition.' + index + '.imsi'" :rules="rules.imsi">
          <el-input type="number" v-model="domain.imsi"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.number')" :prop="'modelCondition.' + index + '.number'" :rules="rules.number">
          <el-input v-model="domain.number"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.iccid')" :prop="'modelCondition.' + index + '.iccid'" :rules="rules.iccid">
          <el-input v-model="domain.iccid"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.pin')" :prop="'modelCondition.' + index + '.pin'">
          <el-input v-model="domain.pin"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.operatorCode')" :prop="'modelCondition.' + index + '.operatorCode'" :rules="rules.operatorCode">
          <el-select v-model="domain.operatorCode" filterable clearable>
            <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.mcNumber')" :prop="'modelCondition.' + index + '.mcNumber'" :rules="rules.mcNumber">
          <el-input v-model="domain.mcNumber"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.packageId')" :prop="'modelCondition.' + index + '.packageId'" :rules="rules.packageId">
          <el-select v-model="domain.packageId" filterable clearable>
            <el-option v-for="i in packageArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.offPeriod')" :prop="'modelCondition.' + index + '.offPeriod'" :rules="rules.offPeriod">
          <el-input type="number" v-model="domain.offPeriod"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.suStained')" :prop="'modelCondition.' + index + '.suStained'" :rules="rules.suStained">
          <el-input type="number" v-model="domain.suStained"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.simMeProtocol')" :prop="'modelCondition.' + index + '.simMeProtocol'" :rules="rules.simMeProtocol">
          <el-input v-model="domain.simMeProtocol"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.status')" :prop="'modelCondition.' + index + '.status'" :rules="rules.status">
          <el-select v-model="domain.status" filterable clearable>
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.cpStatus')" :prop="'modelCondition.' + index + '.cpStatus'"  :rules="rules.cpStatus">
          <el-select v-model="domain.cpStatus" filterable clearable>
            <el-option v-for="i in cpStatusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.cpId')" :prop="'modelCondition.' + index + '.cpId'" :rules="rules.cpId">
          <el-select v-model="domain.cpId" filterable clearable>
            <el-option v-for="i in simPoolArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.cpChannelId')" :prop="'modelCondition.' + index + '.cpChannelId'" :rules="rules.cpChannelId">
          <el-input type="number" v-model="domain.cpChannelId"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.countryCode')" :prop="'modelCondition.' + index + '.countryCode'" :rules="rules.countryCode">
          <el-select v-model="domain.countryCode" filterable clearable>
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.provinceCode')" :prop="'modelCondition.' + index + '.provinceCode'">
          <el-input type="number" v-model="domain.provinceCode"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.expiryDate')" :prop="'modelCondition.' + index + '.expiryDate'">
          <el-date-picker type="date" v-model="domain.expiryDate"></el-date-picker>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.insertDate')" :prop="'modelCondition.' + index + '.insertDate'" :rules="rules.insertDate">
          <el-date-picker type="date" v-model="domain.insertDate"></el-date-picker>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.usedVpn')" :prop="'modelCondition.' + index + '.usedVpn'" :rules="rules.usedVpn">
          <el-input type="number" v-model="domain.usedVpn"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.vpnIP')" :prop="'modelCondition.' + index + '.vpnIP'">
          <el-input v-model="domain.vpnIP"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.vpnName')" :prop="'modelCondition.' + index + '.vpnName'">
          <el-input v-model="domain.vpnName"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.vpnPass')" :prop="'modelCondition.' + index + '.vpnPass'">
          <el-input v-model="domain.vpnPass"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.softType')" :prop="'modelCondition.' + index + '.softType'" :rules="rules.softType">
          <el-select v-model="domain.softType" filterable clearable>
            <el-option v-for="i in softTypeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.ki')" :prop="'modelCondition.' + index + '.ki'">
          <el-input v-model="domain.ki"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.opc')" :prop="'modelCondition.' + index + '.opc'">
          <el-input v-model="domain.opc"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.op')" :prop="'modelCondition.' + index + '.op'">
          <el-input v-model="domain.op"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.apn')" :prop="'modelCondition.' + index + '.apn'">
          <el-input v-model="domain.apn"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.openDate')" :prop="'modelCondition.' + index + '.openDate'">
          <el-date-picker type="date" v-model="domain.openDate"></el-date-picker>
        </el-form-item>
        <el-form-item v-bind:label="$t('simcard.note')" :prop="'modelCondition.' + index + '.note'">
          <el-input v-model="domain.note"></el-input>
        </el-form-item>


        <el-form-item :class=" index == 0 ? 'is-default-hidden' : ''">
          <el-button @click.prevent="removeModelCondition(domain)">删除条件</el-button>
        </el-form-item>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
  import { modelCreate } from 'api/sim_card/sim_card';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        customerArr: [],
        ruleForm: {
          modelCondition: [
            {
            }
          ]
        },
        rules: {
          imsi: [
            { required: true, message: this.$t('simcard.imsi') + '不能为空' }
          ],
          iccid: [
            { required: true, message: this.$t('simcard.iccid') + '不能为空' }
          ],
          packageId: [
            { required: true, message: this.$t('simcard.packageId') + '不能为空' }
          ],
          cpStatus: [
            { required: true, message: this.$t('simcard.cpStatus') + '不能为空' }
          ],
          cpId: [
            { required: true, message: this.$t('simcard.cpId') + '不能为空' }
          ],
          cpChannelId: [
            { required: true, message: this.$t('simcard.cpChannelId') + '不能为空' }
          ],
          insertDate: [
            { required: true, message: this.$t('simcard.insertDate') + '不能为空' }
          ],

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
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '停用' }, { id: 2, name: '指定' }, { id: 3, name: '待激活' }, { id: 4, name: '作废' }, { id: 5, name: '冻结' }],
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
      addModelForm() {
        this.ruleForm.modelCondition.push({});
      },
      removeModelCondition(item) {
        const index = this.ruleForm.modelCondition.indexOf(item);
        if (index !== 0) {
          this.ruleForm.modelCondition.splice(index, 1)
        }
      },
      cancelForm() {
        this.$router.push('/sim_card/sim_card');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var array = this.ruleForm.modelCondition;
          console.log(array);
          if (valid) {
            modelCreate(array).then(response=>{
              const res = response.data;
              if (res.status > 0) {
                Message({
                  message: '更新成功',
                  type: 'success',
                  duration: 0,
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
