<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑国家</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('country.countryCode')" prop="countryCode">
        <el-input type="number" v-model="ruleForm.countryCode"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('country.countryName')" prop="countryName">
        <el-input v-model="ruleForm.countryName"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('country.continentCode')" prop="continentCode">
        <el-radio-group v-model="ruleForm.continentCode">
          <el-radio v-for="i in continentCodeArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-bind:label="$t('country.timeZone')" prop="timeZone">
        <el-input v-model="ruleForm.timeZone"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('country.nameCn')" prop="nameCn">
        <el-input v-model="ruleForm.nameCn"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('country.longItude')" prop="longItude">
        <el-input type="number" v-model="ruleForm.longItude"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('country.latItude')" prop="latItude">
        <el-input type="number" v-model="ruleForm.latItude"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('country.status')" prop="status">
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
  import { modelDetail, modelUpdate } from 'api/operation/country';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          id: this.$route.params.id,
          countryCode: undefined,
          countryName: undefined,
          continentCode: undefined,
          timeZone: undefined,
          nameCn: undefined,
          longItude: undefined,
          latItude: undefined,
          status: undefined,
        },
        rules: {
          countryCode: [
            { required: true, message: this.$t('country.countryCode') + '不能为空' }
          ],
          countryName: [
            { required: true, message: this.$t('country.countryName') + '不能为空' }
          ],
          continentCode: [
            { required: true, message: this.$t('country.continentCode') + '不能为空' }
          ],
          timeZone: [
            { required: true, message: this.$t('country.timeZone') + '不能为空' }
          ],
          nameCn: [
            { required: true, message: this.$t('country.nameCn') + '不能为空' }
          ],
          longItude: [
            { required: true, message: this.$t('country.longItude') + '不能为空' }
          ],
          latItude: [
            { required: true, message: this.$t('country.latItude') + '不能为空' }
          ],
          status: [
            { required: true, message: this.$t('country.status') + '不能为空' }
          ],
        },
        statusArr: [{ id: 0, name: '不可用' }, { id: 1, name: '可用' }],
        continentCodeArr: [{ id: 1, name: '州' }, { id: 2, name: '欧洲' }, { id: 3, name: '非洲' },
          { id: 4, name: '南美洲' }, { id: 5, name: '北美洲' }, { id: 6, name: '大洋洲' }],
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
            this.ruleForm.id = data.id;
            this.ruleForm.countryCode = data.countryCode;
            this.ruleForm.countryName = data.countryName;
            this.ruleForm.continentCode = data.continentCode;
            this.ruleForm.timeZone = data.timeZone;
            this.ruleForm.nameCn = data.nameCn;
            this.ruleForm.longItude = data.longItude;
            this.ruleForm.latItude = data.latItude;
            this.ruleForm.status = data.status;
            console.log(this.ruleForm);
          }
        })
      },
      cancelForm() {
        this.$router.push('/operation/country');
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
                this.$router.push('/operation/country');
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
