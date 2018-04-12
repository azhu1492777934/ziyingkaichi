<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑运营商</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('operator.operatorCode')" prop="operatorCode">
        <el-input type="number" v-model="ruleForm.operatorCode"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator.operatorNameEn')" prop="operatorNameEn">
        <el-input v-model="ruleForm.operatorNameEn"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator.operatorNameCn')" prop="operatorNameCn">
        <el-input v-model="ruleForm.operatorNameCn"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator.countryCode')" prop="countryCode">
        <el-select v-model="ruleForm.countryCode" filterable clearable :placeholder="$t('operator.countryCode')">
          <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator.mcc')" prop="mcc">
        <el-input v-model="ruleForm.mcc"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator.mnc')" prop="mnc">
        <el-input v-model="ruleForm.mnc"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator.apn')" prop="apn">
        <el-input v-model="ruleForm.apn"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator.level')" prop="level">
        <el-input type="number" v-model="ruleForm.level"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator.groupSize')" prop="groupSize">
        <el-input v-model="ruleForm.groupSize"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('operator.status')" prop="status">
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
  import { countryMap } from 'api/operation/country';
  import { modelDetail, modelUpdate } from 'api/operation/operator';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
        },
        rules: {
          operatorCode: [
            { required: true, message: this.$t('operator.operatorCode') + '不能为空' }
          ],
          operatorNameEn: [
            { required: true, message: this.$t('operator.operatorNameEn') + '不能为空' }
          ],
          operatorNameCn: [
            { required: true, message: this.$t('operator.operatorNameCn') + '不能为空' }
          ],
          countryCode: [
            { required: true, message: this.$t('operator.countryCode') + '不能为空' }
          ],
          mcc: [
            { required: true, message: this.$t('operator.mcc') + '不能为空' }
          ],
          mnc: [
            { required: true, message: this.$t('operator.mnc') + '不能为空' }
          ],
          apn: [
            { required: true, message: this.$t('operator.apn') + '不能为空' }
          ],
          level: [
            { required: true, message: this.$t('operator.level') + '不能为空' }
          ],
          groupSize: [
            { required: true, message: this.$t('operator.groupSize') + '不能为空' }
          ],
          status: [
            { required: true, message: this.$t('operator.status') + '不能为空' }
          ],
        },
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '禁用' }],
        countryCodeArr: []
      }
    },
    created() {
      this.getDetail();
      this.getCountryMap();
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
            this.ruleForm = data;
            this.countryCodeArr.push({id: data.countryCode, name: data.countryCodeCn});
          }
        })
      },
      cancelForm() {
        this.$router.push('/operation/operator');
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
                this.$router.push('/operation/operator');
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
