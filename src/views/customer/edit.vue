<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑客户</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
      </el-form-item>

      <el-form-item label="名字" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="显示名" prop="realName">
        <el-input v-model="ruleForm.realName"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="所属国家" prop="countryCode">
        <el-select v-model="ruleForm.countryCode" filterable clearable>
          <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio v-for="i in statusArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { countryMap } from 'api/country';
  import { modelDetail, modelUpdate } from 'api/customer';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          id: this.$route.params.id,
          phoneNumber: undefined,
          name: undefined,
          realName: undefined,
          email: undefined,
          countryCode: undefined,
          status: undefined,
        },
        rules: {
          phoneNumber: [
            { required: true, message: '手机号不能为空' }
          ],
          name: [
            { required: true, message: '名字不能为空' }
          ],
          realName: [
            { required: true, message: '名字不能为空' }
          ],
          email: [
            { required: true, message: '邮箱不能为空' },
            { type: 'email', message: '请输入正确的邮箱地址' }
          ],
          countryCode: [
            { required: true, message: '所属国家不能为空' }
          ],
          status: [
            { required: true, message: '状态不能为空' }
          ],
        },
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '停用' }],
        countryCodeArr: [],
      }
    },
    created() {
      this.getCountryMap();
      this.getDetail();
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
      getDetail() {
        modelDetail(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.ruleForm.id = data.id;
            this.ruleForm.phoneNumber = data.phoneNumber;
            this.ruleForm.name = data.name;
            this.ruleForm.realName = data.realName;
            this.ruleForm.email = data.email;
            this.ruleForm.countryCode = data.countryCode;
            this.ruleForm.status = data.status;

            console.log(this.ruleForm);
          }
        })
      },
      cancelForm() {
        this.$router.push('/customer/index');
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
                this.$router.push('/customer/index');
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
        width: 80px;
      }
      .el-form-item__error{
        margin-left: 80px;
      }
    }
    .is-default-hidden {
      display: none;
    }
  }
</style>
