<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添终端升级</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>
        <el-form-item v-bind:label="$t('terminal_version.describe')" :prop="'modelCondition.' + index + '.describe'" :rules="rules.describe">
          <el-input v-model="domain.describe"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal_version.oVersion')" :prop="'modelCondition.' + index + '.oVersion'" :rules="rules.oVersion">
          <el-input v-model="domain.oVersion"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal_version.tVersion')" :prop="'modelCondition.' + index + '.tVersion'" :rules="rules.tVersion">
          <el-input v-model="domain.tVersion"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal_version.downUrl')" :prop="'modelCondition.' + index + '.downUrl'" :rules="rules.downUrl">
          <el-input v-model="domain.downUrl"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal_version.type')" :prop="'modelCondition.' + index + '.type'" :rules="rules.type">
          <el-radio-group v-model="domain.type" @change="checkTerminalList(domain)">
            <el-radio v-for="i in typeArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal_version.status')" :prop="'modelCondition.' + index + '.status'" :rules="rules.status">
          <el-radio-group v-model="domain.status">
            <el-radio v-for="i in statusArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal_version.terminalList')" v-show="domain.type == 1" :prop="'modelCondition.' + index + '.terminalList'">
          <el-input v-model="domain.terminalList"></el-input>
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
  import { modelCreate } from 'api/terminal/terminal_version';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        customerArr: [],
        ruleForm: {
          modelCondition: [
            {
              terminalListShow: false,
            }
          ]
        },
        rules: {
          describe: [
            { required: true, message: this.$t('terminal_version.describe') + '不能为空' }
          ],
          oVersion: [
            { required: true, message: this.$t('terminal_version.oVersion') + '不能为空' }
          ],
          tVersion: [
            { required: true, message: this.$t('terminal_version.tVersion') + '不能为空' }
          ],
          downUrl: [
            { required: true, message: this.$t('terminal_version.downUrl') + '不能为空' }
          ],
          type: [
            { required: true, message: this.$t('terminal_version.type') + '不能为空' }
          ],
          status: [
            { required: true, message: this.$t('terminal_version.status') + '不能为空' }
          ],
        },
        statusArr: [{ id: '0', name: '有效' }, { id: '1', name: '无效' }],
        typeArr: [{ id: '0', name: '升级所有设备' }, { id: '1', name: '根据终端列表升级' }],
        terminalListVisible: false,
      }
    },
    methods: {
      checkTerminalList(item) {
        if (item.type != 1) {
          item.terminalList = undefined
        }
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
        this.$router.push('/terminal/terminal_version');
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
                this.$router.push('/terminal/terminal_version');
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
