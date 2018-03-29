<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添接口</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('auth_permission.text')" :prop="'modelCondition.' + index + '.text'" :rules="rules.text">
          <el-input v-model="domain.text"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_permission.parentId')">
          <el-input v-model="domain.parentId"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_permission.url')" :prop="'modelCondition.' + index + '.url'" :rules="rules.url">
          <el-input v-model="domain.url"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_permission.orderNum')" :prop="'modelCondition.' + index + '.orderNum'" :rules="rules.orderNum">
          <el-input v-model="domain.orderNum"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_permission.isMenu')">
          <el-radio-group v-model="domain.isMenu">
            <el-radio v-for="i in isMenuArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_permission.funDesc')">
          <el-input v-model="domain.funDesc"></el-input>
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
  import { modelCreate } from 'api/auth_role/auth_permission';
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
          text: [
            { required: true, message: this.$t('auth_permission.text') + '不能为空' }
          ],
          url: [
            { required: true, message: this.$t('auth_permission.url') + '不能为空' }
          ],
          orderNum: [
            { required: true, message: this.$t('auth_permission.orderNum') + '不能为空' }
          ],
          status: [
            { required: true, message: this.$t('auth_permission.status') + '不能为空' }
          ],
        },
        isMenuArr: [{ id: 0, name: '正常' }, { id: 1, name: '菜单' }],
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
        this.$router.push('/auth_role/auth_permission');
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
                this.$router.push('/auth_role/auth_permission');
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
