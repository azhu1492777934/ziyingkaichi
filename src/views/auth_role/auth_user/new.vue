<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添账号</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('auth_user.name')"  :prop="'modelCondition.' + index + '.name'" :rules="rules.name">
          <el-input v-model="domain.name"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_user.phonenumber')"  :prop="'modelCondition.' + index + '.phonenumber'" :rules="rules.phonenumber">
          <el-input v-model="domain.phonenumber"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_user.password')"  :prop="'modelCondition.' + index + '.password'" :rules="rules.password">
          <el-input v-model="domain.password"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_user.describe')"  :prop="'modelCondition.' + index + '.describe'" :rules="rules.describe">
          <el-input v-model="domain.describe"></el-input>
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
  import { modelCreate } from 'api/auth_role/auth_user';
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
          name: [
            { required: true, message: this.$t('auth_user.name') + '不能为空' }
          ],
          phonenumber: [
            { required: true, message: this.$t('auth_user.phonenumber') + '不能为空' }
          ],
          password: [
            { required: true, message: this.$t('auth_user.password') + '不能为空' }
          ],
          describe: [
            { required: true, message: this.$t('auth_user.describe') + '不能为空' }
          ],
        },
        operatorCodeArr: []
      }
    },
    methods: {
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
        this.$router.push('/auth_role/auth_user');
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
                this.$router.push('/auth_role/auth_user');
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
