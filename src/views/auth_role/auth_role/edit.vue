<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑权限</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('auth_role.name')"  prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('auth_role.code')"  prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('auth_role.code')" prop="authPermissionId" >
        <!--<el-checkbox :indeterminate="isAll" v-model="ruleForm.isAll" @change="handleCheckAll" style="color: #1f2d3d;float: left">全部</el-checkbox>-->
        <!--<el-checkbox-group v-model="ruleForm.authPermissionId" @change="handleChecked" style="display: inline-block">-->
          <!--<el-checkbox v-for="i in authPermissionIdArr" :label="i.id" :key="i.id" style="color: #1f2d3d">{{ i.name }}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <el-select v-model="ruleForm.authPermissionId" multiple filterable placeholder="请选择">
          <el-option
            v-for="i in authPermissionIdArr"
            :key="i.id"
            :label="i.name"
            :value="i.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { authPermissionMap } from 'api/auth_role/auth_permission';
  import { modelPermissionDetail, modelUpdate } from 'api/auth_role/auth_role';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          id: this.$route.params.id,
          authPermissionId: undefined,
          name: undefined,
          code: undefined,
          createDate: undefined,
          status: undefined,
          isAll: false,
        },
        rules: {
          name: [
            { required: true, message: this.$t('auth_role.name') + '不能为空' }
          ],
          code: [
            { required: true, message: this.$t('auth_role.code') + '不能为空' }
          ],
          authPermissionId: [
          ],
        },
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '禁用' }],
        authPermissionIdArr: [],
        isAll: false,
      }
    },
    created() {
      this.getDetail();
      this.getAuthPermissionMap();
    },
    methods: {
      getAuthRoleMap(){
        authRoleMap().then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.authRoleIdArr = data;
          }
        })
      },
      getAuthPermissionMap(){
        authPermissionMap().then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.authPermissionIdArr = data;
          }
        })
      },
      getDetail() {
        modelPermissionDetail(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.ruleForm.name = data.authRoleDetail.name;
            this.ruleForm.code = data.authRoleDetail.code;
            this.ruleForm.createDate = data.authRoleDetail.createDate;
            this.ruleForm.status = data.authRoleDetail.status;
            this.ruleForm.authPermissionId = data.authPermissionDetails.map(item=> {
              return item.id
            });
          }
        })
      },
      cancelForm() {
        this.$router.push('/auth_role/auth_role');
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
                this.$router.push('/auth_role/auth_role');
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
