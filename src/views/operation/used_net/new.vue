<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添接入网络配置</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('used_net.operatorCode')"  :prop="'modelCondition.' + index + '.operatorCode'" :rules="rules.operatorCode">
          <el-select v-model="domain.operatorCode" filterable clearable :placeholder="$t('used_net.operatorCode')">
            <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('used_net.packageId')"  :prop="'modelCondition.' + index + '.packageId'" :rules="rules.packageId">
          <el-input type="number" v-model="domain.packageId"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('used_net.mcc')"  :prop="'modelCondition.' + index + '.mcc'" :rules="rules.mcc">
          <el-input v-model="domain.mcc"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('used_net.usedNet')"  :prop="'modelCondition.' + index + '.usedNet'" :rules="rules.usedNet">
          <el-select v-model="domain.usedNet" filterable clearable :placeholder="$t('used_net.usedNet')">
            <el-option v-for="i in usedNetArr" :key="i.id" :label="i.name" :value="i.id">{{ i.name }}</el-option>
          </el-select>
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
  import { operatorMap } from 'api/operation/operator';
  import { modelCreate } from 'api/operation/used_net';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        ruleForm: {
          modelCondition: [
            {
            }
          ]
        },
        rules: {
          operatorCode: [
            { required: true, message: this.$t('used_net.operatorCode') + '不能为空' }
          ],
          packageId: [
            { required: true, message: this.$t('used_net.packageId') + '不能为空' }
          ],
          mcc: [
            { required: true, message: this.$t('used_net.mcc') + '不能为空' }
          ],
          usedNet: [
            { required: true, message: this.$t('used_net.usedNet') + '不能为空' }
          ],
        },
        usedNetArr: [{ id: 0, name: 'NETWORK_MODE_WCDMA_PREF' }, { id: 1, name: 'NETWORK_MODE_GSM_ONLY' }, { id: 2, name: 'NETWORK_MODE_WCDMA_ONLY' },
          { id: 3, name: 'NETWORK_MODE_GSM_UMTS' }, { id: 4, name: 'NETWORK_MODE_CDMA' }, { id: 5, name: 'NETWORK_MODE_CDMA_NO_EVDO' },
          { id: 6, name: 'NETWORK_MODE_EVDO_NO_CDMA' }, { id: 7, name: 'NETWORK_MODE_GLOBAL' }, { id: 8, name: 'NETWORK_MODE_LTE_CDMA_EVDO' },
          { id: 9, name: 'NETWORK_MODE_LTE_GSM_WCDMA' }, { id: 10, name: 'NETWORK_MODE_LTE_CMDA_EVDO_GSM_WCDMA' }, { id: 11, name: 'NETWORK_MODE_LTE_ONLY' },
          { id: 12, name: 'NETWORK_MODE_LTE_WCDMA' }, { id: 13, name: 'NETWORK_MODE_TD_SCDMA_ONLY' }, { id: 14, name: 'NETWORK_MODE_TD_SCDMA_WCDMA' },
          { id: 15, name: 'NETWORK_MODE_TD_SCDMA_LTE' }, { id: 16, name: 'NETWORK_MODE_TD_SCDMA_GSM' }, ],
        operatorCodeArr: [],
      }
    },
    created() {
      this.getOperatorMap();
    },
    methods: {
      getOperatorMap() {
        operatorMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.operatorCodeArr = res.data;
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
        this.$router.push('/operation/used_net');
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
                  duration: _const.messageDuration,
                  showClose: true
                });
                this.$router.push('/operation/used_net');
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
    .el-input, .el-select {
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
