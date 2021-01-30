<template>
  <div class="app-container calendar-list-container">
    <div style="height: 40px">
      <ul @click="headelgetDetail($event)">
        <li>
          <a class="badge" href="javascript:;">{{$t('simpool.noCardCount')}}</a>
          <span>{{ detail.noCardCount }}</span>
        </li>
          <li>
          <a class="badge" style="background-color: #409EFF;" href="javascript:;">{{$t('simpool.usedCount')}}</a>
          <span>{{ detail.usedCount }}</span>
        </li>
          <li>
          <a class="badge" style="background-color: #4AE257;" href="javascript:;">{{$t('simpool.freeCount')}}</a>
          <span>{{ detail.freeCount }}</span>
        </li>
          <li>
          <a class="badge" href="javascript:;">{{$t('simpool.offlineCount')}}</a>
          <span>{{ detail.offlineCount }}</span>
        </li>
      </ul>
    </div>
    <el-row :gutter="20" style="margin-bottom: 15px;">
      <el-col :span="4">
        <el-select v-model="listQuery.q.channelStatus" filterable clearable :placeholder="$t('simpool_card.cpStatusCn')">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select> 
      </el-col>
      <el-col :span="4">
        <el-input :placeholder="$t('simpool_card.imsi')" clearable v-model="listQuery.q.imsi"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input  :placeholder="$t('simpool_card.iccid')" clearable v-model="listQuery.q.iccid"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button style="margin-left: 26px" type="primary" @click="getDetail()" icon="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-document" @click="dialogVisible = true">详情</el-button>
      </el-col>
    </el-row>
 
    <el-table
      ref="multipleTable"
      :data="detail.cards"
      v-loading="listLoading"
      border
      tooltip-effect="dark"
      max-height="640"
      >
      <el-table-column
        prop="cpId"
        v-bind:label="$t('simpool_card.cpId')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cpChannelId"
        v-bind:label="$t('simpool_card.cpChannelId')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cstatus"
        v-bind:label="$t('simpool_card.cpStatusCn')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="imsi"
        v-bind:label="$t('simpool_card.imsi')"
        width="180">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/imsi_list?imsi=' + scope.row.imsi" target="_blank">{{ scope.row.imsi }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="iccid"
        v-bind:label="$t('simpool_card.iccid')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="packageCn"
        v-bind:label="$t('simpool_card.packageCn')"
        width="130">
      </el-table-column>
      <el-table-column
        prop="statusCn"
        v-bind:label="$t('simpool_card.statusCn')"
        width="100">
      </el-table-column>
      <el-table-column
        prop="tsid"
        v-bind:label="$t('simpool_card.tsid')"
        width="120">
        <template slot-scope="scope">
          <a style="text-decoration: underline" :href="'#/terminal/static/tsid_list?tsid=' + scope.row.tsid" target="_blank">{{ scope.row.tsid }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="dateCn"
        v-bind:label="$t('simpool_card.dateCn')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="beatTimeCn"
        v-bind:label="$t('simpool_card.beatTimeCn')"
        width="">
      </el-table-column>
    </el-table>

    <!-- 弹框 start -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="1200px"
      top="20px"
      >
      <!-- 内容 start -->
      <div slot="title" class="dialog_title"> <i class="el-icon-document"></i> 详情</div>
      <div class="clearfix">
        <div class="fl clearfix">
          <table class="my_table fl">
            <tr>
              <td>{{$t("simpool.spid") + ' :'}}</td>
              <td>{{detail.spid}}</td>
            </tr>
            <tr>
              <td>{{$t("simpool.ip") + ' :'}}</td>
              <td>{{detail.ip}}</td>
            </tr>
            <tr>
              <td>{{$t("simpool.port") + ' :'}}</td>
              <td>{{detail.port}}</td>
            </tr>
            <tr>
              <td>{{$t("simpool.sumIp") + ' :'}}</td>
              <td>{{detail.sumIp}}</td>
            </tr>
            <tr>
              <td>{{$t("simpool.webPort") + ' :'}}</td>
              <td>{{detail.webPort}}</td>
            </tr>
            <tr>
              <td>{{$t("simpool.version") + ' :'}}</td>
              <td>{{detail.version}}</td>
            </tr>
            <tr>
              <td>{{$t("simpool.isActiveCn") + ' :'}}</td>
              <td>{{detail.isActiveCn}}</td>
            </tr>
            <tr>
              <td>{{$t("simpool.freeCount") + ' :'}}</td>
              <td>{{detail.freeCount}}</td>
            </tr>
            <tr>
              <td>{{$t("simpool.offlineCount") + ' :'}}</td>
              <td>{{detail.offlineCount}}</td>
            </tr>
            <tr>
              <td>{{$t("simpool.usedCount") + ' :'}}</td>
              <td>{{detail.usedCount}}</td>
            </tr>
          </table>
          <ul>
            <li>
              <svg-icon icon-class="sim_card_03"></svg-icon><span>{{$t('simpool.noCardCount') + ": " + detail.noCardCount}}</span>
            </li>
            <li>
              <svg-icon icon-class="sim_card_01"></svg-icon><span>{{$t('simpool.usedCount') + ": " + detail.usedCount}}</span>
            </li>
            <li>
              <svg-icon icon-class="sim_card_02"></svg-icon><span>{{$t('simpool.freeCount') + ": " + detail.freeCount}}</span>
            </li>
            <li>
              <svg-icon icon-class="sim_card_03"></svg-icon><span>{{$t('simpool.offlineCount') + ": " + detail.offlineCount}}</span>
            </li>
          </ul>
        </div>
        <div class="fr" style="width: 600px">
          <div v-for="(i,t) in detailCards" :key="t" class="tooltip_content">
            <el-tooltip placement="bottom" :open-delay="250">
              <span>{{i.cpChannelId}} <br/> <svg-icon :icon-class="setSvg(i.cstatus)"></svg-icon> </span>
              <div slot="content" >
                <span>{{$t('simpool_card.cpChannelId') + ': ' + i.cpChannelId}}</span><br/>
                <span>{{$t('simpool_card.cpStatusCn') + ': ' + i.cstatus}}</span><br/>
                <span>{{$t('simpool_card.tsid') + ': ' + i.tsid}}</span><br/>
                <span>{{$t('simpool_card.packageCn') + ': ' + i.packageCn}}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <!-- 内容 end -->

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 弹框 end -->

  </div>
</template>

<script>
  import { modelDetail } from 'api/sim_card/simpool';
  import { Message } from 'element-ui';
  export default {
    data() {
      return {
        id: this.$route.params.id,
        listQuery: {
          q: {
            imsi: undefined,
            iccid: undefined,
            channelStatus: '' //卡位状态
          }
        },
        listLoading: true,
        detail: {},
        detailCards: [],
        dialogTripForm: false,
        options: [{
          id: 0,
          label: '无卡'
        }, {
          id: 1,
          label: '空闲'
        }, {
          id: 2,
          label: '离线'
        }, {
          id: 3,
          label: '使用中',
        }],
        cpStatusCn: '',
        dialogVisible: false
      };
    },
    async created() {
      this.detailCards = await this.getDetail();
    },
    methods: {
      getDetail() {
        return new Promise((resolve, reject) => {
          this.listLoading = true;
          modelDetail(this.id, this.listQuery).then(response => {
            const res = response.data;
            if (res.status > 0) {
              this.detail = res.data;
            }
            this.listLoading = false;
            resolve(res.data.cards);
          })
        })
      },
      // headelgetDetail(event) {
      //   if(event.target.tagName.toLowerCase() === 'a') {
      //     console.log(event.target.innerHTML)
      //    }
      // },
      setSvg(data) {
        if(data == '使用中') {
          return 'sim_card_01'
        } else if(data == '空闲') {
          return 'sim_card_02'
        } else {
          return 'sim_card_03'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    ul {
      margin: 0;
      padding: 0;
        li {
        float: left;
        list-style: none;
        margin-right: 25px;
          .badge {
          display: inline-block;
          text-align: center;
          line-height: 25px;
          padding: 0 10px;
          height: 25px;
          border-radius: 25px;
          color: #fff;
          background-color: #8a8a8a;
        }
      }
    }
    .dialog_title {
      font-size: 20px;
      font-weight: 800;
      color: #3F9EFF;
      border-bottom: 1px solid #3F9EFF;
    }
    .my_table {
      border-collapse: collapse;
      border-spacing: 0;
      margin-top: 5px;
      margin-bottom: 20px;
      tr {
        &:nth-child(2n-1) {
          background-color: #F9F9F9;
        }
        td {
          padding: 10px 30px;
          border: 1px solid #ccc;
          &:first-child {
            width: 187px;
            text-align: right;
            padding-right: 8px;
          }
          &:last-child {
            width: 349px;
            padding-left: 8px;
          }
        }
      }
    }
    .tooltip_content {
      display: inline-block; 
      width: 30px;
      margin-top: 5px;
    }
  }
</style>
