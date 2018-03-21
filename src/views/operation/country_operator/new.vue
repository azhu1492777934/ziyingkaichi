<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添运营商支持国家</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('country_operator.roamCountryCode')"  :prop="'modelCondition.' + index + '.roamCountryCode'" :rules="rules.roamCountryCode">
          <el-select v-model="domain.roamCountryCode" filterable clearable :placeholder="$t('country_operator.roamCountryCode')">
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_operator.operatorCode')"  :prop="'modelCondition.' + index + '.operatorCode'" :rules="rules.operatorCode">
          <el-select v-model="domain.operatorCode" filterable clearable :placeholder="$t('country_operator.operatorCode')">
            <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_operator.level')"  :prop="'modelCondition.' + index + '.level'" :rules="rules.level">
          <el-input v-model="domain.level"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_operator.status')"  :prop="'modelCondition.' + index + '.status'" :rules="rules.status">
          <el-radio-group v-model="domain.status">
            <el-radio v-for="i in statusArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
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
  import { modelCreate } from 'api/operation/country_operator';
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
          roamCountryCode: [
            { required: true, message: this.$t('country_operator.roamCountryCode') + '不能为空' }
          ],
          operatorCode: [
            { required: true, message: this.$t('country_operator.operatorCode') + '不能为空' }
          ],
          level: [
            { required: true, message: this.$t('country_operator.level') + '不能为空' }
          ],
          status: [
            { required: true, message: this.$t('country_operator.status') + '不能为空' }
          ],
        },
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '禁用' }],
        countryCodeArr: [],
        operatorCodeArr: [],
      }
    },
    created() {
      this.getCountryMap();
      this.getOperatorMap();
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
        this.$router.push('/operation/country_operator');
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
                this.$router.push('/operation/country_operator');
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
