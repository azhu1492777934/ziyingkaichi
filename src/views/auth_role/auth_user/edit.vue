<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑账号</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('auth_user.name')"  prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('auth_user.phonenumber')"  prop="phonenumber">
        <el-input v-model="ruleForm.phonenumber"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('auth_user.describe')"  prop="describe">
        <el-input v-model="ruleForm.describe"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { modelDetail, modelUpdate } from 'api/auth_role/auth_user';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
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
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        modelDetail(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.ruleForm = data;
          }
        })
      },
      cancelForm() {
        this.$router.push('/auth_role/auth_user');
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
    .el-input, .el-select {
      width: 300px;
    }
    .el-form-item {
      margin-bottom: 20px;
      label {
        width: 100px;
      }
      .el-form-item__error{
        margin-left: 100px;
      }
    }
    .is-default-hidden {
      display: none;
    }
  }
</style>
