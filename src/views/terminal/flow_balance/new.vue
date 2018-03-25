<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添终端流量</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('flow_balance.tsid')" :prop="'modelCondition.' + index + '.tsid'" :rules="rules.tsid">
          <el-input v-model="domain.tsid"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('flow_balance.allowFlow')" :prop="'modelCondition.' + index + '.allowFlow'" :rules="rules.allowFlow">
          <el-input v-model="domain.allowFlow"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('flow_balance.validityDate')" :prop="'modelCondition.' + index + '.validityDate'" :rules="rules.validityDate">
          <el-date-picker type="date" v-model="domain.validityDate"></el-date-picker>
        </el-form-item>

        <el-form-item v-bind:label="$t('flow_balance.note')" :prop="'modelCondition.' + index + '.note'" :rules="rules.note">
          <el-input v-model="domain.note"></el-input>
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
  import { modelCreate } from 'api/terminal/flow_balance';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        customerArr: [],
        ruleForm: {
          modelCondition: [
            {
              tsid: undefined,
              allowFlow: undefined,
              validityDate: undefined,
              note: undefined,
            }
          ]
        },
        rules: {
          tsid: [
            { required: true, message: this.$t('flow_balance.tsid') + '不能为空' }
          ],
          allowFlow: [
            { required: true, message: this.$t('flow_balance.allowFlow') + '不能为空' }
          ],
          validityDate: [
            { required: true, message: this.$t('flow_balance.validityDate') + '不能为空' }
          ],
          note: [
            { required: true, message: this.$t('flow_balance.note') + '不能为空' }
          ],
        },
      }
    },
    methods: {
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
        this.$router.push('/terminal/flow_balance');
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
                this.$router.push('/terminal/flow_balance');
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
        margin-left: 120px;
      }
    }
    .is-default-hidden {
      display: none;
    }
  }
</style>
