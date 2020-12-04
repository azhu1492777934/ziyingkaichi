<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑副卡PLMN配置</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('channel_card_prefer.operatorCode')"  prop="operatorCode">
        <el-select v-model="ruleForm.operatorCode" filterable clearable :placeholder="$t('country_operator.operatorCode')" :disabled="false">
          <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.id" :value="i.id">{{i.id}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-bind:label="$t('channel_card_prefer.mcc')"  prop="mcc">
        <el-input v-model="ruleForm.mcc" :disabled="false"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('channel_card_prefer.rplmn')"  prop="rplmn">
        <el-input v-model="ruleForm.rplmn"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('channel_card_prefer.pplmn')"  prop="pplmn">
        <el-input v-model="ruleForm.pplmn"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('channel_card_prefer.fplmn')"  prop="fplmn">
        <el-input v-model="ruleForm.fplmn"></el-input>
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
  import { modelDetail, modelUpdate } from 'api/channel_card/channel_card_prefer';
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
            { required: true, message: this.$t('channel_card_prefer.operatorCode') + '不能为空' }
          ],
          mcc: [
            { required: true, message: this.$t('channel_card_prefer.mcc') + '不能为空' }
          ],
          rplmn: [
            { required: true, message: this.$t('channel_card_prefer.rplmn') + '不能为空' }
          ],
          pplmn: [
            { required: true, message: this.$t('channel_card_prefer.pplmn') + '不能为空' }
          ],
          fplmn: [
            { required: true, message: this.$t('channel_card_prefer.fplmn') + '不能为空' }
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
            this.ruleForm = data;
          }
        })
      },
      cancelForm() {
        this.$router.push('/channel_card/channel_card_prefer');
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
                this.$router.push('/channel_card/channel_card_prefer');
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
