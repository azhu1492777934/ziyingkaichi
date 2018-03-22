<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑PLMN配置</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('operator_prefer.operatorCode')" prop="operatorCode">
        <el-select v-model="ruleForm.operatorCode" filterable clearable :placeholder="$t('country_operator.operatorCode')">
          <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator_prefer.roamMcc')" prop="roamMcc">
        <el-input v-model="ruleForm.roamMcc"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator_prefer.pPlmn')" prop="pPlmn">
        <el-input v-model="ruleForm.pPlmn"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator_prefer.fPlmn')" prop="fPlmn">
        <el-input v-model="ruleForm.fPlmn"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { operatorMap } from 'api/operation/operator';
  import { modelDetail, modelUpdate } from 'api/operation/operator_prefer';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          id: this.$route.params.id,
          operatorCode: undefined,
          operatorCodeCn: undefined,
          roamMcc: undefined,
          pPlmn: undefined,
          fPlmn: undefined,
        },
        rules: {
          operatorCode: [
            { required: true, message: this.$t('operator_prefer.operatorCode') + '不能为空' }
          ],
          roamMcc: [
            { required: true, message: this.$t('operator_prefer.roamMcc') + '不能为空' }
          ],
          pPlmn: [
            { required: true, message: this.$t('operator_prefer.pPlmn') + '不能为空' }
          ],
          fPlmn: [
            { required: true, message: this.$t('operator_prefer.fPlmn') + '不能为空' }
          ],
        },
        operatorCodeArr: []
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
            this.operatorCodeArr.push({id: data.operatorCode, name: data.operatorCodeCn});
            this.ruleForm.id = data.id;
            this.ruleForm.operatorCode = data.operatorCode;
            this.ruleForm.roamMcc = data.roamMcc;
            this.ruleForm.pPlmn = data.pplmn;
            this.ruleForm.fPlmn = data.fplmn;
          }
        })
      },
      cancelForm() {
        this.$router.push('/operation/operator_prefer');
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
                this.$router.push('/operation/operator_prefer');
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
