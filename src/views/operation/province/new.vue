<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <!--span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添省市</el-button></span -->
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('province.provinceCode')"  :prop="provinceCode">
          <el-input type = "number"  v-model="domain.provinceCode"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('province.nameCn')"  :prop="nameCn">
          <el-input  v-model="domain.nameCn"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('province.cityCode')" prop="cityCode">
          <el-input   v-model="domain.cityCode"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('province.city')" prop="city">
          <el-input   v-model="domain.city"></el-input>
        </el-form-item>

        <!-- el-form-item v-bind:label="$t('province.parentCode')" prop="parentCode">
          <el-input  v-model="ruleForm.parentCode"></el-input>
        </el-form-item -->

        <el-form-item v-bind:label="$t('province.parentCode')" prop="parentCode">
          <el-select v-model="domain.parentCode" filterable clearable :placeholder="$t('province.parentCode')">
            <el-option v-for="i in provinceType0Arr" :key="i.provinceCode" :label="i.nameCn" :value="i.provinceCode">{{i.nameCn}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('province.countryCode')" prop="countryCode">
          <el-select v-model="domain.countryCode" filterable clearable :placeholder="$t('province.countryCode')">
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('province.abbr')" prop="abbr">
          <el-input  v-model="domain.abbr"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('province.type')" prop="type">
          <el-radio-group v-model="domain.type" radio="0">
            <el-radio v-for="i in typeArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
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
  import { modelCreate,provinceType0Map } from 'api/operation/province';
  import { countryMap } from 'api/operation/country';
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

        },
        countryCodeArr: [],
        provinceType0Arr:[],
        typeArr:[{ id: 0, name: '省' }, { id: 1, name: '市' }],
      }
    },
    created() {
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
        this.$router.push('/operation/province');
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
      width: 200px;
    }
    .el-input, .el-select {
      width: 300px;
    }
    .el-form-item {
      margin-bottom: 20px;
      label {
        width: 120px;
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
