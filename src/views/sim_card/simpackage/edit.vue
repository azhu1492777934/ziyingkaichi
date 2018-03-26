<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px">编辑流量套餐</span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <hr/>
      <br/>

      <el-form-item v-bind:label="$t('simpackage.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('simpackage.operatorCode')" prop="operatorCode">
        <el-select v-model="ruleForm.operatorCode" filterable clearable>
          <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-bind:label="$t('simpackage.maxFlow')" prop="maxFlow">
        <el-input v-model="ruleForm.maxFlow"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('simpackage.maxRoamFlow')" prop="maxRoamFlow">
        <el-input v-model="ruleForm.maxRoamFlow"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('simpackage.level')" prop="level">
        <el-input v-model="ruleForm.level"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('simpackage.mccs')" prop="mccs">
        <el-input v-model="ruleForm.mccs"></el-input>
      </el-form-item>

      <el-form-item v-bind:label="$t('simpackage.status')" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio v-for="i in statusArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
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
  import { operatorMap } from 'api/operation/operator';
  import { modelDetail, modelUpdate } from 'api/sim_card/simpackage';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        listLoading: true,
        ruleForm: {
        },
        rules: {
          name: [
            { required: true, message: this.$t('simpackage.name') + '不能为空' }
          ],
          operatorCode: [
            { required: true, message: this.$t('simpackage.operatorCode') + '不能为空' }
          ],
          maxFlow: [
            { required: true, message: this.$t('simpackage.maxFlow') + '不能为空' }
          ],
          maxRoamFlow: [
            { required: true, message: this.$t('simpackage.maxRoamFlow') + '不能为空' }
          ],
          level: [
            { required: true, message: this.$t('simpackage.level') + '不能为空' }
          ],
          mccs: [
            { required: true, message: this.$t('simpackage.mccs') + '不能为空' }
          ],
          status: [
            { required: true, message: this.$t('simpackage.status') + '不能为空' }
          ],
        },
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '删除' }],
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
        this.$router.push('/sim_card/simpackage');
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
                this.$router.push('/sim_card/simpackage');
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
        width: 160px;
      }
      .el-form-item__error{
        margin-left: 160px;
      }
    }
    .is-default-hidden {
      display: none;
    }
  }
</style>
