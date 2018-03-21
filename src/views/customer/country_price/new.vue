<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添客户</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>
        <el-form-item v-bind:label="$t('country_price.countryCode')" :prop="'modelCondition.' + index + '.countryCode'" :rules="rules.countryCode">
          <el-select v-model="domain.countryCode" filterable clearable>
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.customerRealName')" :prop="'modelCondition.' + index + '.customerId'" :rules="rules.customerId">
          <el-select :remote-method="remoteMethod" remote filterable clearable v-model="domain.customerId" placeholder="" class="permission-input">
            <el-option v-for="i in customerArr" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.currency')" :prop="'modelCondition.' + index + '.currency'" :rules="rules.currency">
          <el-radio-group v-model="domain.currency">
            <el-radio v-for="i in currencyArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.price')" :prop="'modelCondition.' + index + '.price'" :rules="rules.price">
          <el-input v-model="domain.price"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.maxData')" :prop="'modelCondition.' + index + '.maxData'" :rules="rules.maxData">
          <el-input v-model="domain.maxData"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.speedLimit')" :prop="'modelCondition.' + index + '.speedLimit'" :rules="rules.speedLimit">
          <el-input v-model="domain.speedLimit"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country_price.describe')" :prop="'modelCondition.' + index + '.describe'" :rules="rules.describe">
          <el-input v-model="domain.describe"></el-input>
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
  import { countryMap } from 'api/operation/country';
  import { modelCreate } from 'api/customer/country_price';
  import { queryCustomer } from 'api/customer/customer';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        customerArr: [],
        ruleForm: {
          modelCondition: [
            {
              countryCode: undefined,
              customerId: undefined,
              currency: undefined,
              price: undefined,
              maxData: undefined,
              speedLimit: undefined,
              describe: undefined,
            }
          ]
        },
        rules: {
          countryCode: [
            { required: true, message: this.$t('country_price.countryCode') + '不能为空' }
          ],
          customerId: [
            { required: true, message: this.$t('country_price.customerRealName') + '不能为空' }
          ],
          currency: [
            { required: true, message: this.$t('country_price.currency') + '不能为空' }
          ],
          price: [
            { required: true, message: this.$t('country_price.price') + '不能为空' }
          ],
          maxData: [
            { required: true, message: this.$t('country_price.maxData') + '不能为空' }
          ],
          speedLimit: [
            { required: true, message: this.$t('country_price.speedLimit') + '不能为空' }
          ],
          describe: [
            { required: true, message: this.$t('country_price.describe') + '不能为空' }
          ],
        },
        currencyArr: [{ id: 0, name: '人民币' }, { id: 1, name: '美元' }, { id: 2, name: '台币' }],
        countryCodeArr: [],
      }
    },
    created() {
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
      queryCustomers(name) {
        queryCustomer(name).then(response => {
          const res = response.data;
          if (res.status > 0) {
            this.customerArr = res.data;
          }
        })
      },
      remoteMethod(query) {
        if (query !== '') {
          this.queryCustomers(query);
        } else {
          this.customerArr = [];
        }
      },
      removeModelCondition(item) {
        const index = this.ruleForm.modelCondition.indexOf(item);
        if (index !== 0) {
          this.ruleForm.modelCondition.splice(index, 1)
        } else {
          Message({
            message: '默认项不能删除',
            type: 'error',
            duration: 0,
            showClose: true
          });
        }
      },
      addModelForm() {
        this.ruleForm.modelCondition.push({
          phoneNumber: undefined,
          name: undefined,
          email: undefined
        });

      },
      cancelForm() {
        this.$router.push('/customer/country_price');
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
                  duration: 0,
                  showClose: true
                });
                this.$router.push('/customer/country_price');
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
        width: 120px;
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
