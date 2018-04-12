<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑客户</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>
      <el-form-item v-bind:label="$t('balance.balance')" prop="balance">
        <el-input type="number" v-model="ruleForm.balance"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('balance.currency')" prop="currency">
        <el-radio-group v-model="ruleForm.currency">
          <el-radio v-for="i in currencyArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
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
  import { modelUpdate, modelDetail } from 'api/customer/balance';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          id: this.$route.params.id,
          balance: undefined,
          currency: undefined,
        },
        rules: {
          balance: [
            { required: true, message: '余额不能为空' }
          ],
          currency: [
            { required: true, message: '币种不能为空' }
          ],
        },
        currencyArr: [{ id: 0, name: '人民币' }, { id: 1, name: '美元' }, { id: 2, name: '台币' }],
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
            this.ruleForm.balance = data.balance;
            this.ruleForm.currency = data.currency;
          }
        })
      },
      cancelForm() {
        this.$router.push('/customer/balance');
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
                this.$router.push('/customer/balance');
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
