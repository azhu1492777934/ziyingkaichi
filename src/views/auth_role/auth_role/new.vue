<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添权限</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('auth_role.name')"  :prop="'modelCondition.' + index + '.name'" :rules="rules.name">
          <el-input v-model="domain.name"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_role.code')"  :prop="'modelCondition.' + index + '.code'" :rules="rules.code">
          <el-input v-model="domain.code"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('auth_role.code')"  :prop="'modelCondition.' + index + '.authPermissionId'"  >
          <!--<el-checkbox-group v-model="domain.authPermissionId" style="display: inline-block">-->
            <!--<el-checkbox v-for="i in authPermissionIdArr" :label="i.id" :key="i.id" style="color: #1f2d3d">{{ i.name }}</el-checkbox>-->
          <!--</el-checkbox-group>-->
          <el-select v-model="domain.authPermissionId" multiple filterable placeholder="请选择">
            <el-option
              v-for="i in authPermissionIdArr"
              :key="i.id"
              :label="i.name"
              :value="i.id">
            </el-option>
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
  import { authPermissionMap } from 'api/auth_role/auth_permission';
  import { modelCreate } from 'api/auth_role/auth_role';
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
          name: [
            { required: true, message: this.$t('auth_role.name') + '不能为空' }
          ],
          code: [
            { required: true, message: this.$t('auth_role.code') + '不能为空' }
          ],
          authPermissionId: [
          ],
        },
        authPermissionIdArr: [],
      }
    },
    created() {
      this.getAuthPermissionMap();
    },
    methods: {
      getAuthPermissionMap(){
        authPermissionMap().then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.authPermissionIdArr = data;
          }
        })
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
        this.$router.push('/auth_role/auth_role');
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
        width: 180px;
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
