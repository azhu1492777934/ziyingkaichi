<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添副卡配置</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('terminal_channel.tsid')" :prop="'modelCondition.' + index + '.tsid'" :rules="rules.tsid">
          <el-input type="number" v-model="domain.tsid"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal_channel.imsi')" :prop="'modelCondition.' + index + '.imsi'" :rules="rules.imsi">
          <el-input type="number" v-model="domain.imsi"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal_channel.status')" :prop="'modelCondition.' + index + '.status'" :rules="rules.status">
          <el-select v-model="domain.status" filterable clearable :placeholder="$t('terminal_channel.status')">
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
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
  import { modelCreate } from 'api/channel_card/terminal_channel';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        customerArr: [],
        ruleForm: {
          modelCondition: [
            {
            }
          ]
        },
        rules: {
          tsid: [
            { required: true, message: this.$t('terminal_channel.tsid') + '不能为空' }
          ],
          imsi: [
            { required: true, message: this.$t('terminal_channel.imsi') + '不能为空' }
          ],
          status: [
            { required: true, message: this.$t('terminal_channel.status') + '不能为空' }
          ],
        },
        statusArr: [{id: 0, name: '已同步'},{id: 1, name: '新增'},{id: 2, name: '删除'}],
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
            duration: _const.messageDuration,
            showClose: true
          });
        }
      },
      addModelForm() {
        this.ruleForm.modelCondition.push({
        });

      },
      cancelForm() {
        this.$router.push('/channel_card/terminal_channel');
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
                this.$router.push('/channel_card/terminal_channel');
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
