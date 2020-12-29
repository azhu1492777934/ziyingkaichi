<template>
  <div class="app-container calendar-list-container" id="basicData_search_index">
    <div class="filter-container search">
      <el-row>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal.tsid')"
                    v-model="listQuery.q.tsid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal.ssid')"
                    v-model="listQuery.q.ssid" clearable type="text"> </el-input>
        </el-col>
        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal.model')"
                    v-model="listQuery.q.model" clearable type="text"> </el-input>
        </el-col>
        
        <el-col :span="4">
          <el-select v-model="listQuery.q.usergroup" filterable clearable :placeholder="$t('terminal.userGroup')">
            <el-option v-for="i in groupCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-input class="filter-item" :placeholder="$t('terminal.ciccid')"
                    v-model="listQuery.q.ciccid" clearable type="text"> </el-input>
        </el-col>

        <el-col :span="4">
          <el-select v-model="listQuery.q.status" filterable clearable :placeholder="$t('terminal.status')">
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-col>
      </el-row>

       <el-row style="margin-top: 10px;">
          <el-col :span="4">
            <el-select v-model="listQuery.q.province" filterable clearable :placeholder="$t('terminal.provinceCode')">
              <el-option v-for="i in provinceCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <el-button style="margin-left: 26px;" type="primary" icon="search" @click="handleFilter">搜索</el-button>
              <el-button type="primary" @click="handleDownload">下载当前结果</el-button>
              <el-button :disabled="modelDelete" class="filter-item" type="primary" @click="dialogUpdateVisible = true">批量修改</el-button>
              <el-button  class="filter-item" type="primary" @click="dialogGroupUpdateVisible = true">分组修改</el-button>
              <a :href="'/template1.xlsx'" target="_self">
                <el-button style="margin-left: 10px" icon="search" @click="importTeminal">模版</el-button>
              </a>
            <el-button type="primary" style="margin-left: 10px" @click="opendialog">导入<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-col>
          <el-col :span="4" >
            <FileButton :tableLabel="tableLabel" ></FileButton>
          </el-col>
        </el-row>
    </div>

    <br/>



    <!-- 列表-start -->
     <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      max-height="520"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      
      <el-table-column
        prop="tsid"
        v-bind:label="$t('terminal.tsid')"
        width="100"
        fixed
        >
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/cost_day_list?tsid=' + scope.row.tsid" target="_blank">{{ scope.row.tsid }}</a>
        </template>
      </el-table-column>
      
        
      <FileTable :tableLabel='tableLabel'></FileTable>
      <el-table-column
        label="操作"
        align="center"
        min-width="160"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="small" type="warning" plain @click="handelStop(scope.row.id)" v-if="scope.row.status != 2">停用</el-button>
          <el-button size="small" type="danger" plain @click="handelDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



     <!-- 分页全局组件 -->
    <my-pagination :listQuery="listQuery" :total="total" :listLoading="listLoading" @get="getList()"></my-pagination>
    <!-- 列表-end -->

    <!-- 批量修改-start -->
    <el-dialog title="批量修改" :visible.sync="dialogUpdateVisible" top="2vh" v-if="dialogUpdateVisible"  size="tiny" @close="dialogUpdateVisible=false">
      <el-form :model="batchUpdateForm">
        <el-form-item v-bind:label="$t('terminal.status')" :label-width="formLabelWidth" prop="status" :rules="rules.status">
          <el-select v-model="batchUpdateForm.status" placeholder="请选择">
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.upLog')" :label-width="formLabelWidth" prop="upLog" :rules="rules.upLog">
          <el-radio-group v-model="batchUpdateForm.upLog">
            <el-radio v-for="i in upLogArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.model')" :label-width="formLabelWidth" prop="model" :rules="rules.model">
          <el-input v-model="batchUpdateForm.model"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.networkChoose')" :label-width="formLabelWidth" prop="status" :rules="rules.status">
          <el-select v-model="batchUpdateForm.networkChoose" placeholder="请选择">
            <el-option v-for="i in networkChooseArr" :key="i.id" :label="i.name" :value="i.name">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.userGroup')" :label-width="formLabelWidth" prop="usergroup" :rules="rules.usergroup">
          <el-input v-model="batchUpdateForm.usergroup"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.maxDayData')" :label-width="formLabelWidth" prop="maxDayData" :rules="rules.maxDayData">
          <el-input type="text" placeholder="请输入数字" v-model="batchUpdateForm.maxDayData"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.dayspeedlimit')" :label-width="formLabelWidth" prop="dayspeedlimit" :rules="rules.dayspeedlimit">
          <el-input type="text" placeholder="请输入数字" v-model="batchUpdateForm.dayspeedlimit"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.maxMonthData')" :label-width="formLabelWidth" prop="maxMonthData" :rules="rules.maxMonthData">
          <el-input type="text" placeholder="请输入数字" v-model="batchUpdateForm.maxMonthData"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.monthSpeedlimit')" :label-width="formLabelWidth" prop="monthSpeedlimit" :rules="rules.monthSpeedlimit">
          <el-input type="text" placeholder="请输入数字" v-model="batchUpdateForm.monthSpeedlimit"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.timedShutoff')" :label-width="formLabelWidth" prop="timedShutoff" :rules="rules.timedShutoff">
          <el-input type="text" placeholder="请输入终端无连接关机等待分钟数，0表示不关机" v-model="batchUpdateForm.timedShutoff"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal.ota')" :label-width="formLabelWidth" prop="ota" :rules="rules.ota">
          <el-select v-model="batchUpdateForm.ota" placeholder="请选择">
            <el-option v-for="i in otaArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogUpdateVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="handelUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量修改-end -->

    <!-- 分组修改-start -->
    <el-dialog title="分组修改 - 请选择一个分组" :visible.sync="dialogGroupUpdateVisible"  v-if="dialogGroupUpdateVisible" top="2vh"  size="tiny" @close="dialogGroupUpdateVisible=false">
      <div class="filter-container search">
      <el-row>
      <el-col  :span="8">
        <el-select v-model="groupQuery.q.usergroup" filterable clearable :placeholder="$t('terminal.userGroup')">
          <el-option v-for="i in groupCodeArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
        </el-select>
      </el-col>
      </el-row>
        <el-row>-----------------------------------------------------------------------------------------------------------------------------</el-row>
        <el-row></el-row>
      </div>

      <el-form :model="batchGroupUpdateForm">
        <el-form-item v-bind:label="$t('terminal.status')" :label-width="formLabelWidth" prop="status" :rules="rules.status">
          <el-select v-model="batchGroupUpdateForm.status" placeholder="请选择">
            <el-option v-for="i in statusArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.upLog')" :label-width="formLabelWidth" prop="upLog" :rules="rules.upLog">
          <el-radio-group v-model="batchGroupUpdateForm.upLog">
            <el-radio v-for="i in upLogArr" :key="i.id" :label="i.id" :value="i.id">{{ i.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.model')" :label-width="formLabelWidth" prop="model" :rules="rules.model">
          <el-input v-model="batchGroupUpdateForm.model"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.networkChoose')" :label-width="formLabelWidth" prop="status" :rules="rules.status">
          <el-select v-model="batchUpdateForm.networkChoose" placeholder="请选择">
            <el-option v-for="i in networkChooseArr" :key="i.id" :label="i.name" :value="i.name">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.maxDayData')" :label-width="formLabelWidth" prop="maxDayData" :rules="rules.maxDayData">
          <el-input type="text" placeholder="请输入数字" v-model="batchGroupUpdateForm.maxDayData"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.dayspeedlimit')" :label-width="formLabelWidth" prop="dayspeedlimit" :rules="rules.dayspeedlimit">
          <el-input type="text" placeholder="请输入数字" v-model="batchGroupUpdateForm.dayspeedlimit"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.maxMonthData')" :label-width="formLabelWidth" prop="maxMonthData" :rules="rules.maxMonthData">
          <el-input type="text" placeholder="请输入数字" v-model="batchGroupUpdateForm.maxMonthData"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.monthSpeedlimit')" :label-width="formLabelWidth" prop="monthSpeedlimit" :rules="rules.monthSpeedlimit">
          <el-input type="text" placeholder="请输入数字" v-model="batchGroupUpdateForm.monthSpeedlimit"></el-input>
        </el-form-item>
        <el-form-item v-bind:label="$t('terminal.timedShutoff')" :label-width="formLabelWidth" prop="timedShutoff" :rules="rules.timedShutoff">
          <el-input type="text" placeholder="请输入终端无连接关机等待分钟数，0表示不关机" v-model="batchGroupUpdateForm.timedShutoff"></el-input>
        </el-form-item>

        <el-form-item v-bind:label="$t('terminal.ota')" :label-width="formLabelWidth" prop="ota" :rules="rules.ota">
          <el-select v-model="batchUpdateForm.ota" placeholder="请选择">
            <el-option v-for="i in otaArr" :key="i.id" :label="i.name" :value="i.id">{{i.name}}</el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGroupUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelGroupUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分组修改-end -->

  <!-- 上传文件 -->
    <el-dialog title="文件上传" :visible.sync="dialogVisibleUpload"  v-if="dialogVisibleUpload"  size="tiny" @close="dialogVisibleUpload=false">
    <!--el-dialog title="文件上传" :visible.sync="dialogVisibleUpload"  @close="dialogVisibleUpload = false"-->
      <el-upload
        ref="upload"
        class="upload-demo"
        :auto-upload="false"
        accept=".xlsx"
        :show-file-list="true"
        action=""
        :before-upload="beforeUpload"
        :limit="1"
        :file-list="fileList">

        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10MB</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <!--el-button v-on:click="closedialog">取 消</el-button-->
        <el-button type="primary" @click="uploadFile">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>


<script>
  import FileTable from '@/components/FileTable/FileTable'
  import FileButton from '@/components/FileButton/FileButton'
  import { modelList, modelStop,modelDelete, batchUpdate,batchUpdateByUserGroup,uploadTerminalFile,download,groupMap } from 'api/terminal/terminal';
  import { Message } from 'element-ui';
  import { provinceMap } from 'api/operation/province';
  export default {
    components: { FileTable ,FileButton },
    data() {
      return {
        show:false,
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          perPage: 100,
          q: {
            tsid: '',
            ssid: '',
            batch: '',
            status: '',
            province: [],
            networkChoose: '',
          }
        },
        groupQuery: {
          page: 1,
          perPage: 100,
          q: {
            usergroup: '',
          }
        },
        rules: {
          status: [
            { required: true, message: this.$t('terminal.status') + '不能为空' }
          ],
          upLog: [
            { required: true, message: this.$t('terminal.upLog') + '不能为空' }
          ],
        },
        batchUpdateForm: {
          status: -1,
          upLog: -1,
          networkChoose: '自动'
        },
        batchGroupUpdateForm: {
          status: -1,
          upLog: -1,
          networkChoose: '自动'
        },
        modelDelete: true,
        modelIds: [],
        dialogUpdateVisible: false,
        dialogGroupUpdateVisible:false,
        formLabelWidth: '150px',
        statusArr: [{id: 0, name: '正常'},{id: 1, name: '未初始化'},{id: 2, name: '停用'},{id: 3, name: '注销'}],
        networkChooseArr: [{id: 0, name: '自动'},{id: 1, name: '移动优先'},{id: 2, name: '联通优先'},{id: 3, name: '电信优先'}],
        otaArr: [{id: 0, name: '不支持'},{id: 1, name: '支持'}],
        upLogArr: [{id: 0, name: '否'},{id: 1, name: '是'}],
        fileList: [],
        dialogVisibleUpload: false,
        uploadForm: new FormData(),
        groupCodeArr:[],
        provinceCodeArr: [],
        download: null,
        tableLabel: [
          { label: 'ID', width: '80', prop: 'id', show: true },
          { label: 'IMEI', width: '160', prop: 'imei', show: true },
          { label: 'SSID', width: '140', prop: 'ssid', show: true },
          { label: '密码', width: '100', prop: 'wifiPassword', show: true },
          { label: '分组', width: '100', prop: 'usergroup', show: true },
          { label: '型号', width: '80', prop: 'model', show: true },
          { label: 'ICCID', width: '180', prop: 'ciccid', show: true },
          { label: '状态', width: '80', prop: 'statusCn', show: true },
          { label: '地区', width: '140', prop: 'provinceName', show: true },
          { label: '每日限额(KB)', width: '130', prop: 'maxDayData', show: true },
          { label: '限速速率(Kbps)', width: '130', prop: 'dayspeedlimit', show: true },
          { label: '每月限额(GB)', width: '140', prop: 'maxMonthData', show: true },
          { label: '每月限速速率(Kbps)', width: '150', prop: 'monthSpeedlimit', show: true },
          { label: '无连接等待', width: '100', prop: 'timedShutoff', show: true },
          { label: 'MAC', width: '140', prop: 'mac', show: false },
          { label: '批次', width: '80', prop: 'batch', show: false },
          { label: '版本', width: '80', prop: 'sversion', show: true },
          { label: 'OTA', width: '80', prop: 'otaCn', show: true },
          { label: 'Android版本', width: '120', prop: 'androidVersion', show: true },
          { label: '上传日志', width: '80', prop: 'upLogCn', show: false },
        ]
      }
    },

    created() {
      this.getList();
      this.getGroupMap();
      this.getProvinceMap();
    },
    methods: {
      getList() {
        this.listLoading = true;
        modelList(this.listQuery).then(response => {
          const res = response.data;
          if (res.status > 0) {
            const data = res.data;
            this.list = data.list;
            this.total = data.extra.totalCount;
          }
          this.listLoading = false
        })

        // if (!this.list) {
        //   this.getList()
        // }
      },
      getGroupMap() {
        groupMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.groupCodeArr = res.data;
          }
        });
      },
       getProvinceMap() {
        provinceMap().then(response=>{
          const res = response.data;
          if (res.status > 0) {
            this.provinceCodeArr = res.data;
          }
        });
      },
      

      handleDownload() {
        if(this.download) {
          clearTimeout(this.download)
        }
        this.download = setTimeout( () => {
          download(this.modelIds, this.listQuery.q, {}).then(response=>{
            const res = response.data;
            require.ensure([], () => {
              const { export_json_to_excel } = require('vendor/Export2Excel');
              const tHeader = res.data.headList;
              const data = res.data.dataList;
              const fileName = res.data.fileName;
              export_json_to_excel(tHeader, data, fileName);
            })
          });
      },600)
    },

      handleSelectionChange(val) {
        this.modelIds = this.getModelIds(val);
        console.log("modelIds: " + this.modelIds )
        if (this.modelIds.length !== 0) {
          this.modelDelete = false;
        } else {
          this.modelDelete = true;
        }
      },
      getModelIds(k) {
        const Ids = [];
        k.forEach(l => {
          Ids.push(l.id)
        })
        return Ids;
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
        if (this.listQuery.q.tsid == '' && this.listQuery.q.ssid == '' && this.listQuery.q.batch == '' && this.listQuery.q.status == '') {
          this.modelDelete = true;
        } else {
          this.modelDelete = false;
        }
      },
      handelUpdate() {
        const noColumn = this.listQuery.q.tsid == '' && this.listQuery.q.ssid == ''
          && this.listQuery.q.batch == '' && this.listQuery.q.status == ''
          && this.modelIds.length == 0;
        debugger;
        if (!noColumn) {
          batchUpdate(this.modelIds, this.listQuery.q, this.batchUpdateForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '更新成功',
                type: 'success',
                duration: _const.messageDuration,
                showClose: true
              });
              this.dialogUpdateVisible = false;
              this.getList();
            }
          });
        } else {
          this.dialogUpdateVisible = false;
        }
      },

      handelGroupUpdate() {
        batchUpdateByUserGroup(this.modelIds, this.groupQuery.q, this.batchGroupUpdateForm).then(response=>{
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '更新成功',
                type: 'success',
                duration: _const.messageDuration,
                showClose: true
              });
              this.dialogGroupUpdateVisible = false;
              this.getList();
            }
          });
      },


      handelStop(id) {
        this.$confirm('此操作将停用终端, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.listLoading = true;
          modelStop(id).then(response => {
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '停用成功',
                type: 'success',
                duration: _const.messageDuration,
                showClose: true
              });
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用',
            duration: _const.messageDuration,
            showClose: true
          });
        });
      },
      handelDelete(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.listLoading = true;
          modelDelete(id).then(response => {
            const res = response.data;
            if (res.status > 0) {
              Message({
                message: '删除成功',
                type: 'success',
                duration: _const.messageDuration,
                showClose: true
              });
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: _const.messageDuration,
            showClose: true
          });
        });
      },

      opendialog(){
        this.dialogVisibleUpload = true;
        // this.$refs.upload.fileList = [];


      },
      closedialog(){
        // console.log(JSON.stringify(this.$refs.upload.fileList));
        // alert(this.$refs)
        // this.$refs.upload.clearFiles();
        // this.$refs.upload.fileList = [];
        // this.resetFields();
        // this.$refs.uploadForm.fileList = [];

        // this.$refs.uploadForm.reset();
        // this.$refs.uploadForm.batchDelete();
        // this.$refs.uploadForm.delete('file');

        // alert(this.$refs.uploadForm.entries());

        this.dialogVisibleUpload = false;

        // location.reload();

        // alert(this.$refs.upload.fileList.length);
        // const mainImg = this.$refs.upload;
        // if (mainImg && mainImg.length) {
        //   mainImg.forEach(item => {
        //     item.clearFiles();
        //   })
        // }

      },
      beforeUpload (file) {
        this.uploadForm.append('file', file);

        return false;
      },
      uploadFile() {
        //uploadTerminalFile
        this.listLoading = true;
        uploadTerminalFile(this.uploadForm).then(response => {
          const res = response.data;
          if (res.status > 0) {
            Message({
              message: '上传成功',
              type: 'success',
              duration: _const.messageDuration,
              showClose: true
            });
          }

          this.listLoading = false;
          this.closedialog();
          this.getList();
        })
        this.$refs.upload.submit();
        //this.$refs.upload.submit()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #basicData_search_index {
    font-size: 12px;
    .buttonStyle{
      display: inline-block;
    }
  }
</style>
