<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添流量套餐</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('simpackage.name')" :prop="'modelCondition.' + index + '.name'" :rules="rules.name">
          <el-input v-model="domain.name"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('simpackage.operatorCode')" :prop="'modelCondition.' + index + '.operatorCode'" :rules="rules.operatorCode">
          <el-select v-model="domain.operatorCode" filterable clearable>
            <el-option v-for="i in operatorCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-bind:label="$t('simpackage.maxFlow')" :prop="'modelCondition.' + index + '.maxFlow'" :rules="rules.maxFlow">
          <el-input type="number" v-model="domain.maxFlow"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('simpackage.maxRoamFlow')" :prop="'modelCondition.' + index + '.maxRoamFlow'" :rules="rules.maxRoamFlow">
          <el-input type="number" v-model="domain.maxRoamFlow"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('simpackage.level')" :prop="'modelCondition.' + index + '.level'" :rules="rules.level">
          <el-input type="number" v-model="domain.level"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('simpackage.mccs')" :prop="'modelCondition.' + index + '.mccs'" :rules="rules.mccs">
          <el-input v-model="domain.mccs"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('simpackage.status')" :prop="'modelCondition.' + index + '.status'" :rules="rules.status">
          <el-radio-group v-model="domain.status">
            <el-radio v-for="i in statusArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
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
  import { operatorMap } from 'api/operation/operator';
  import { modelCreate } from 'api/sim_card/simpackage';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        customerArr: [],
        ruleForm: {
          modelCondition: [
            {
            }
          ]
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
        this.$router.push('/sim_card/simpackage');
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
