<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添预置主卡</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>

        <el-form-item v-bind:label="$t('ready_terminal_sim.tsid')" :prop="'modelCondition.' + index + '.tsid'" :rules="rules.tsid">
          <el-input v-model="domain.tsid"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('ready_terminal_sim.imsi')" :prop="'modelCondition.' + index + '.imsi'" :rules="rules.imsi">
          <el-select :remote-method="remoteMethod" remote filterable clearable v-model="domain.imsi" placeholder="" class="permission-input">
            <el-option v-for="i in imsiArr" :key="i.name" :label="i.name" :value="i.name"></el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item v-bind:label="$t('ready_terminal_sim.lastStatus')" :prop="'modelCondition.' + index + '.lastStatus'" :rules="rules.lastStatus">-->
          <!--<el-input v-model="domain.lastStatus"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item v-bind:label="$t('ready_terminal_sim.insertDate')" :prop="'modelCondition.' + index + '.insertDate'" :rules="rules.insertDate">
          <el-date-picker type="date" v-model="domain.insertDate"></el-date-picker>
        </el-form-item>

        <el-form-item v-bind:label="$t('ready_terminal_sim.type')" :prop="'modelCondition.' + index + '.type'" :rules="rules.type">
          <el-radio-group v-model="domain.type" @change="checkTerminalList(domain)">
            <el-radio v-for="i in typeArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
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
  import { modelCreate } from 'api/sim_card/ready_terminal_sim';
  import { simcardMap } from 'api/sim_card/sim_card';
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
            { required: true, message: this.$t('ready_terminal_sim.tsid') + '不能为空' }
          ],
          imsi: [
            { required: true, message: this.$t('ready_terminal_sim.imsi') + '不能为空' }
          ],
          lastStatus: [
            { required: true, message: this.$t('ready_terminal_sim.lastStatus') + '不能为空' }
          ],
          insertDate: [
            { required: true, message: this.$t('ready_terminal_sim.insertDate') + '不能为空' }
          ],
          type: [
            { required: true, message: this.$t('ready_terminal_sim.type') + '不能为空' }
          ],
        },
        typeArr: [{ id: 0, name: '临时指定一次' }, { id: 1, name: '一直指定' }],
        imsiArr: [],
      }
    },
    methods: {
      queryImsis(name) {
        simcardMap(name).then(response => {
          const res = response.data;
          if (res.status > 0) {
            this.imsiArr = res.data;
          }
        })
      },
      remoteMethod(query) {
        if (query !== '') {
          this.queryImsis(query);
        } else {
          this.imsiArr = [];
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
        this.ruleForm.modelCondition.push({});
      },
      cancelForm() {
        this.$router.push('/sim_card/ready_terminal_sim');
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
                this.$router.push('/sim_card/ready_terminal_sim');
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
