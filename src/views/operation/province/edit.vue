<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑省市</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('province.provinceCode')" prop="provinceCode">
        <el-input  type = "number" disabled v-model="ruleForm.provinceCode"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('province.nameCn')" prop="nameCn">
        <el-input  v-model="ruleForm.nameCn"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('province.cityCode')" prop="cityCode">
        <el-input  type = "number" disabled v-model="ruleForm.cityCode"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('province.city')" prop="city">
        <el-input   disabled v-model="ruleForm.city"></el-input>
      </el-form-item>

      <!-- el-form-item v-bind:label="$t('province.parentCode')" prop="parentCode">
        <el-input  v-model="ruleForm.parentCode"></el-input>
      </el-form-item -->

      <el-form-item v-bind:label="$t('province.parentCode')" prop="parentCode">
        <el-select v-model="ruleForm.parentCode" filterable clearable :placeholder="$t('province.parentCode')">
          <el-option v-for="i in provinceType0Arr" :key="i.provinceCode" :label="i.nameCn" :value="i.provinceCode">{{i.nameCn}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-bind:label="$t('province.countryCode')" prop="countryCode">
        <el-select v-model="ruleForm.countryCode" filterable clearable :placeholder="$t('province.countryCode')">
          <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-bind:label="$t('province.abbr')" prop="abbr">
        <el-input  v-model="ruleForm.abbr"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('province.type')" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio v-for="i in typeArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
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
  import { modelDetail, modelUpdate,provinceType0Map } from 'api/operation/province';
  import { countryMap } from 'api/operation/country';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          id: this.$route.params.id,
          provinceCode: undefined,
          nameCn: undefined,
          countryCode: undefined,
          cityCode:undefined,
          city:undefined,
          parentCode:undefined,
          type:undefined,
          abbr: undefined,
        },
        rules: {

          provinceCode: [
            { required: true, message: this.$t('province.provinceCode') + '不能为空' }
          ],
          nameCn: [
            { required: true, message: this.$t('province.nameCn') + '不能为空' }
          ],
          cityCode: [
            { required: true, message: this.$t('province.cityCode') + '不能为空' }
          ],
          city: [
            { required: true, message: this.$t('province.cityCode') + '不能为空' }
          ],
          parentCode: [
            { required: true, message: this.$t('province.parentCode') + '不能为空' }
          ],
          type: [
            { required: true, message: this.$t('province.type') + '不能为空' }
          ],
        },
        countryCodeArr: [],
        provinceType0Arr:[],
        typeArr:[{ id: 0, name: '省' }, { id: 1, name: '市' }],
      }
    },
    created() {
      this.getDetail();
      this.getProvinceType0Map();
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

      getProvinceType0Map() {
        provinceType0Map().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.provinceType0Arr = res.data;
          }
        });
      },

      getDetail() {
        modelDetail(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            var data = res.data;
            this.ruleForm=data;
            this.countryCodeArr.push({id: data.countryCode, name: data.countryCodeCn});
            this.provinceType0Arr.push({id:data.parentCode, name: data.parentName});
            this.typeArr.push({id:data.type,name:data.type})
          }
        })
      },
      cancelForm() {
        this.$router.push('/operation/province');
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
                this.$router.push('/operation/province');
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
    .el-input, .el-select {
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
