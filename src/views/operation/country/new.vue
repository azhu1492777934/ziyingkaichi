<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添国家</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>
        <el-form-item v-bind:label="$t('country.countryCode')" :prop="'modelCondition.' + index + '.countryCode'" :rules="rules.countryCode">
          <el-input type="number" v-model="domain.countryCode"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country.countryName')" :prop="'modelCondition.' + index + '.countryName'" :rules="rules.countryName">
          <el-input v-model="domain.countryName"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country.continentCode')" :prop="'modelCondition.' + index + '.continentCode'" :rules="rules.continentCode">
          <el-input type="number" v-model="domain.continentCode"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country.timeZone')" :prop="'modelCondition.' + index + '.timeZone'" :rules="rules.timeZone">
          <el-input v-model="domain.timeZone"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country.nameCn')" :prop="'modelCondition.' + index + '.nameCn'" :rules="rules.nameCn">
          <el-input v-model="domain.nameCn"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country.longItude')" :prop="'modelCondition.' + index + '.longItude'" :rules="rules.longItude">
          <el-input type="number" v-model="domain.longItude"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country.latItude')" :prop="'modelCondition.' + index + '.latItude'" :rules="rules.latItude">
          <el-input type="number" v-model="domain.latItude"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('country.status')" :prop="'modelCondition.' + index + '.status'" :rules="rules.status">
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
  import { modelCreate } from 'api/operation/country';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        customerArr: [],
        ruleForm: {
          modelCondition: [
            {
              countryCode: undefined,
              customerId: undefined,
              currency: undefined,
              price: undefined,
              maxData: undefined,
              speedLimit: undefined,
              describe: undefined,
            }
          ]
        },
        rules: {
          countryCode: [
            { required: true, message: this.$t('country.countryCode') + '不能为空' }
          ],
          countryName: [
            { required: true, message: this.$t('country.countryName') + '不能为空' }
          ],
          continentCode: [
            { required: true, message: this.$t('country.continentCode') + '不能为空' }
          ],
          timeZone: [
            { required: true, message: this.$t('country.timeZone') + '不能为空' }
          ],
          nameCn: [
            { required: true, message: this.$t('country.nameCn') + '不能为空' }
          ],
          longItude: [
            { required: true, message: this.$t('country.longItude') + '不能为空' }
          ],
          latItude: [
            { required: true, message: this.$t('country.latItude') + '不能为空' }
          ],
          status: [
            { required: true, message: this.$t('country.status') + '不能为空' }
          ],
        },
        statusArr: [{ id: '0', name: '不可用' }, { id: '1', name: '可用' }],
      }
    },
    methods: {
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
        this.$router.push('/operation/country');
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
                this.$router.push('/operation/country');
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
