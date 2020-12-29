<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑客户</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>
      <el-form-item v-bind:label="$t('country_price.countryCode')" prop="countryCode">
        <el-select v-model="ruleForm.countryCode" filterable clearable>
          <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-bind:label="$t('country_price.customerRealName')" prop="customerId">
        <el-select :remote-method="remoteMethod" remote filterable clearable v-model="ruleForm.customerId"
                   placeholder="" class="permission-input" :onchange="selectCustomerRealName(ruleForm)">
          <el-option v-for="i in customerArr" :key="i.id" :label="i.name" :value="i.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-bind:label="$t('country_price.currency')" prop="currency">
        <el-radio-group v-model="ruleForm.currency" :disabled="true">
          <el-radio v-for="i in currencyArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-bind:label="$t('country_price.price')" prop="price">
        <el-input type="number" v-model="ruleForm.price"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('country_price.maxData')" prop="maxData">
        <el-input type="number" v-model="ruleForm.maxData"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('country_price.speedLimit')" prop="speedLimit">
        <el-input type="number" v-model="ruleForm.speedLimit"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('country_price.describe')" prop="describe">
        <el-input v-model="ruleForm.describe"></el-input>
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
  import { modelDetail, modelUpdate } from 'api/customer/country_price';
  import { queryCustomer } from 'api/customer/customer';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          id: this.$route.params.id,
          countryCode: undefined,
          customerId: undefined,
          currency: undefined,
          price: undefined,
          maxData: undefined,
          speedLimit: undefined,
          describe: undefined,
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
        currencyArr: [{ id: 0, name: '人民币' }, { id: 1, name: '美元' }, { id: 2, name: '台币' }],
        countryCodeArr: [],
        customerArr: [],
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
            this.ruleForm.id = data.id;
            this.ruleForm.countryCode = data.countryCode;
            this.customerArr.push({
              id: data.customerId,
              name: data.customerRealName
            });
            this.ruleForm.customerId = data.customerId;
            this.ruleForm.currency = data.currency;
            this.ruleForm.price = data.price;
            this.ruleForm.maxData = data.maxData;
            this.ruleForm.speedLimit = data.speedLimit;
            this.ruleForm.describe = data.describe;
            console.log(this.ruleForm);
          }
        })
      },
      queryCustomers(name) {
        queryCustomer(name).then(response => {
          const res = response.data;
          if (res.status > 0) {
            this.customerArr = res.data;
          }
        })
      },
      selectCustomerRealName(item) {
        for (var i = 0; i < this.customerArr.length; i++){
          var cus = this.customerArr[i];
          if (cus.id == item.customerId) {
            this.ruleForm.currency = cus.code
          }
        }
      },
      remoteMethod(query) {
        if (query !== '') {
          this.queryCustomers(query);
        } else {
          this.customerArr = [];
        }
      },
      cancelForm() {
        this.$router.push('/customer/customer');
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
    .el-input, .el-select {
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
