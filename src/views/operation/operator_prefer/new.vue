<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添PLMN配置</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('operator_prefer.operatorCode')"  :prop="'modelCondition.' + index + '.operatorCode'" :rules="rules.operatorCode">
          <el-select v-model="domain.operatorCode" filterable clearable :placeholder="$t('country_operator.operatorCode')">
            <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>


        <!-- <el-form-item v-bind:label="$t('operator_prefer.roamMcc')"  :prop="'modelCondition.' + index + '.roamMcc'" :rules="rules.roamMcc">
          <el-select v-model="domain.roamMcc" filterable clearable :placeholder="$t('operator_prefer.roamMcc')">
            <el-option v-for="i in mccArr" :key="i.id" :label="i.name" :value="i.name">{{i.name}}</el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item v-bind:label="$t('operator_prefer.roamMcc')"  :prop="'modelCondition.' + index + '.roamMcc'" :rules="rules.roamMcc">
          <el-input v-model="domain.roamMcc"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('operator_prefer.pPlmn')"  :prop="'modelCondition.' + index + '.pPlmn'" :rules="rules.pPlmn">
          <el-input v-model="domain.pPlmn"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('operator_prefer.fPlmn')"  :prop="'modelCondition.' + index + '.fPlmn'" :rules="rules.fPlmn">
          <el-input v-model="domain.fPlmn"></el-input>
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
  import { operatorMap,mccMap } from 'api/operation/operator';
  import { modelCreate } from 'api/operation/operator_prefer';
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
            { required: true, message: this.$t('operator_prefer.operatorCode') + '不能为空' }
          ],
          roamMcc: [
            { required: true, message: this.$t('operator_prefer.roamMcc') + '不能为空' }
          ],
          pPlmn: [
            { required: true, message: this.$t('operator_prefer.pPlmn') + '不能为空' }
          ],
          fPlmn: [
            { required: true, message: this.$t('operator_prefer.fPlmn') + '不能为空' }
          ],
        },
        operatorCodeArr: [],
        mccArr:[],
      }
    },
    created() {
      this.getOperatorMap();
      // this.getMccMap();
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
      // getMccMap() {
      //   mccMap().then(response=>{
      //     const res = response.data;
      //     if (res.status > 0) {
      //       this.mccArr = res.data;
      //       console.log(this.mccArr);
      //     }
      //   });
      // },
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
        this.$router.push('/operation/operator_prefer');
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
                this.$router.push('/operation/operator_prefer');
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
