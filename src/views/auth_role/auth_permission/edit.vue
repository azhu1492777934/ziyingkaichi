<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑接口</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('auth_permission.text')"  prop="text">
        <el-input v-model="ruleForm.text"></el-input>
      </el-form-item>

      <!--<el-form-item v-bind:label="$t('auth_permission.parentId')"  prop="parentId">-->
        <!--<el-input v-model="ruleForm.parentId"></el-input>-->
      <!--</el-form-item>-->

      <el-form-item v-bind:label="$t('auth_permission.url')"  prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>

      <!--<el-form-item v-bind:label="$t('auth_permission.orderNum')"  prop="orderNum">-->
        <!--<el-input v-model="ruleForm.orderNum"></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item v-bind:label="$t('auth_permission.status')"  prop="status">-->
        <!--<el-radio-group v-model="ruleForm.status">-->
          <!--<el-radio v-for="i in statusArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-form-item>-->

      <!--<el-form-item v-bind:label="$t('auth_permission.isMenu')"  prop="isMenu">-->
        <!--<el-radio-group v-model="ruleForm.isMenu">-->
          <!--<el-radio v-for="i in isMenuArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-form-item>-->

      <el-form-item v-bind:label="$t('auth_permission.funDesc')"  prop="funDesc">
        <el-input v-model="ruleForm.funDesc"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('auth_permission.createTime')"  prop="createTime">
        <el-date-picker type="datetime" v-model="ruleForm.createTime" disabled="false"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { modelDetail, modelUpdate } from 'api/auth_role/auth_permission';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          orderNum: 0
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
        this.$router.push('/auth_role/auth_permission');
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
