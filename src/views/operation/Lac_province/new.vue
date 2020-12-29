<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添禁用省市</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('lac_province.provinceCode')"  :prop="'modelCondition.' + index + '.provinceCode'" :rules="rules.provinceCode">
          <el-select v-model="domain.provinceCode" filterable clearable :placeholder="$t('lac_province.provinceCode')">
            <el-option v-for="i in provinceCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('lac_province.operatorCode')"  :prop="'modelCondition.' + index + '.operatorCode'" :rules="rules.operatorCode">
          <el-input type="number"  v-model="domain.operatorCode"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('lac_province.lacPref')"  :prop="'modelCondition.' + index + '.lacPref'" :rules="rules.lacPref">
          <el-input  v-model="domain.lacPref"></el-input>
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
  import { provinceMap } from 'api/operation/province';
  import { modelCreate } from 'api/operation/lac_province';
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
          provinceCode: [
            { required: true, message: this.$t('lac_province.provinceCode') + '不能为空' }
          ],
          operatorCode: [
            { required: true, message: this.$t('lac_province.operatorCode') + '不能为空' }
          ],
          lacPref: [
            { required: true, message: this.$t('lac_province.lacPref') + '不能为空' }
          ],
        },
        provinceCodeArr: [],
      }
    },
    created() {
      this.getProvinceMap();
    },
    methods: {
      getProvinceMap() {
        provinceMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.provinceCodeArr = res.data;
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
        this.$router.push('/operation/lac_province');
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
                this.$router.push('/operation/lac_province');
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
