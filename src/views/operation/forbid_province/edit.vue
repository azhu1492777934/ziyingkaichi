<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑禁用省市</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('forbid_province.provinceCode')" prop="provinceCode">
        <el-input  type = "number" disabled v-model="ruleForm.provinceCode"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('forbid_province.provinceName')" prop="provinceName">
        <el-input  disabled v-model="ruleForm.provinceName"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('forbid_province.mccmncs')" prop="mccmncs">
        <el-input  v-model="ruleForm.mccmncs"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { modelDetail, modelUpdate } from 'api/operation/forbid_province';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          id: this.$route.params.id,
          provinceCode: undefined,
          provinceName: undefined,
          mccmncs: undefined,
        },
        rules: {

          mccmncs: [
            { required: true, message: this.$t('forbid_province.mccmncs') + '不能为空' }
          ],
        },
      }
    },
    created() {
      this.getDetail();
      this.getOperatorMap();
    },
    methods: {
      getOperatorMap() {
        operatorMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.operatorCodeArr = res.data;
          }
        });
      },
      getDetail() {
        modelDetail(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.ruleForm.id = data.id;
            this.ruleForm.provinceCode = data.provinceCode;
            this.ruleForm.provinceName = data.provinceName;
            this.ruleForm.mccmncs = data.mccmncs;
          }
        })
      },
      cancelForm() {
        this.$router.push('/operation/forbid_province');
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
                this.$router.push('/operation/forbid_province');
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
      width: 300px;
    }
    .el-input {
      width: 300px;
    }
    .el-form-item {
      margin-bottom: 20px;
      label {
        width: 220px;
      }
      .el-form-item__error{
        margin-left: 220px;
      }
    }
    .is-default-hidden {
      display: none;
    }
  }
</style>
