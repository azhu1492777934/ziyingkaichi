<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑终端流量</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('flow_balance.tsid')" prop="tsid">
        <el-input type="number" v-model="ruleForm.tsid"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('flow_balance.allowFlow')" prop="allowFlow">
        <el-input type="number" v-model="ruleForm.allowFlow"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('flow_balance.validityDate')" prop="validityDate">
        <el-date-picker type="date" v-model="ruleForm.validityDate"></el-date-picker>
      </el-form-item>

      <el-form-item v-bind:label="$t('flow_balance.note')" prop="note">
        <el-input v-model="ruleForm.note"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { modelDetail, modelUpdate } from 'api/terminal/flow_balance';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
          id: this.$route.params.id,
          tsid: undefined,
          allowFlow: undefined,
          validityDate: undefined,
          note: undefined,
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
            this.ruleForm.tsid = data.tsid;
            this.ruleForm.allowFlow = data.allowFlow;
            this.ruleForm.validityDate = data.validityDate;
            this.ruleForm.note = data.note;
          }
        })
      },
      cancelForm() {
        this.$router.push('/terminal/flow_balance');
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
