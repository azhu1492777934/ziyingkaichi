<template>
  <div class="app-container calendar-list-container" id="basicData_new">

    <span style="margin-right: 10px"><el-button class="el-icon-plus" @click="addModelForm" style="font-weight: normal">新添客户</el-button></span>
    <span><b style="color: red;">*</b>为必填项</span>
    <br/><br/>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="modelCondition" v-for="(domain, index) in ruleForm.modelCondition" :key="domain.key" style="margin-left: 0px">
        <hr/>
        <br/>
        <el-form-item label="手机号" :prop="'modelCondition.' + index + '.phoneNumber'" :rules="rules.phoneNumber">
          <el-input v-model="domain.phoneNumber"></el-input>
        </el-form-item>

        <el-form-item label="名字" :prop="'modelCondition.' + index + '.name'" :rules="rules.name">
          <el-input v-model="domain.name"></el-input>
        </el-form-item>

        <el-form-item label="显示名" :prop="'modelCondition.' + index + '.realName'" :rules="rules.realName">
          <el-input v-model="domain.realName"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :prop="'modelCondition.' + index + '.email'" :rules="rules.email">
          <el-input v-model="domain.email"></el-input>
        </el-form-item>

        <el-form-item label="所属国家" :prop="'modelCondition.' + index + '.countryCode'" :rules="rules.countryCode">
          <el-select v-model="domain.countryCode" filterable clearable>
            <el-option v-for="i in countryCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :prop="'modelCondition.' + index + '.status'" :rules="rules.status">
          <el-radio-group v-model="domain.status">
            <el-radio v-for="i in statusArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="密码" :prop="'modelCondition.' + index + '.password'" :rules="rules.password">
          <el-input type="password" v-model="domain.password"></el-input>
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
  import { countryMap } from 'api/operation/country';
  import { modelCreate } from 'api/customer/customer';
  import { Message } from 'element-ui';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        Local: [],
        ruleForm: {
          modelCondition: [
            {
              phoneNumber: undefined,
              name: undefined,
              realName: undefined,
              email: undefined,
              countryCode: undefined,
              status: 0,
              password: undefined,
            }
          ]
        },
        rules: {
          phoneNumber: [
            { required: true, message: '手机号不能为空' }
          ],
          name: [
            { required: true, message: '名字不能为空' }
          ],
          realName: [
            { required: true, message: '名字不能为空' }
          ],
          email: [
            { required: true, message: '邮箱不能为空' },
            { type: 'email', message: '请输入正确的邮箱地址' }
          ],
          countryCode: [
            { required: true, message: '所属国家不能为空' }
          ],
          status: [
            { required: true, message: '状态不能为空' }
          ],
          password: [
            { required: true, message: '密码不能为空' }
          ],
        },
        statusArr: [{ id: 0, name: '正常' }, { id: 1, name: '停用' }],
        countryCodeArr: [],
      }
    },
    created() {
      this.getCountryMap();
    },
    methods: {
      getCountryMap() {
        countryMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.countryCodeArr = res.data;
          }
        });
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
        this.ruleForm.modelCondition.push({
          phoneNumber: undefined,
          name: undefined,
          email: undefined
        });

      },
      cancelForm() {
        this.$router.push('/customer/customer');
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
                this.$router.push('/customer/customer');
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
