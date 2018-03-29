<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑账号</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item label="权限" prop="authRoleIds" >
        <el-checkbox :indeterminate="isAll" v-model="ruleForm.isAll" @change="handleCheckAll" style="color: #1f2d3d;float: left">全部</el-checkbox>
        <el-checkbox-group v-model="ruleForm.authRoleId" @change="handleChecked" style="display: inline-block">
          <el-checkbox v-for="i in authRoleIdArr" :label="i.id" :title="i.name" :key="i.name" style="color: #1f2d3d">{{ i.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { modelRoleDetail,modelRoleUpdate } from 'api/auth_role/auth_user';
  import { authRoleMap } from 'api/auth_role/auth_role';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          authRoleId: [],
          isAll: false,
        },
        rules: {
        },
        authRoleIdArr: [],
        isAll: false,
      }
    },
    created() {
      this.getDetail();
      this.getAuthRoleMap();
    },
    methods: {
      // 遍历数组获取数组内的id值
      getIds(s) {
        const ids = [];
        s.forEach(k => {
          ids.push(k.id);
        });
        return ids;
      },
      handleCheckAll(val) {
        this.ruleForm.authRoleId = val ? this.getIds(this.authRoleIdArr) : [];
        this.isAll = false;
      },
      handleChecked(value) {
        var checkedCount = value.length;
        this.ruleForm.isAll = checkedCount === this.authRoleIdArr.length;
        this.isAll = checkedCount > 0 && checkedCount < this.authRoleIdArr.length;
      },
      getAuthRoleMap(){
        authRoleMap().then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.authRoleIdArr = data;
          }
        })
      },
      getDetail() {
        modelRoleDetail(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.ruleForm.authRoleId = data.authRoleDetails.map(item=> {
              return item.id
            });
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
            modelRoleUpdate(this.id, ruleForm.authRoleId).then(response=>{
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
