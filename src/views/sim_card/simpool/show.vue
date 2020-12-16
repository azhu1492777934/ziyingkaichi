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
      <el-col :span="3">
        <el-select v-model="cpStatusCn" :placeholder="$t('simpool_card.cpStatusCn')">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select> 
      </el-col>
      <el-col :span="4">
        <el-input :placeholder="$t('simpool_card.imsi')" v-model="listQuery.q.imsi"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input  :placeholder="$t('simpool_card.iccid')" v-model="listQuery.q.iccid"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button style="margin-left: 26px" type="primary" icon="search">搜索</el-button>
      </el-col>
    </el-row>
   
        
      
       
        
      
        
    <el-table
      ref="multipleTable"
      :data="detail.cards"
      border
      tooltip-effect="dark"
      height="1000"
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
        prop="cpStatusCn"
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
          page: 1,
          perPage: 100,
          q: {
            id: this.$route.params.id,
            imsi: undefined,
            iccid: undefined,
            cpStatusCn: '' //卡位状态
          }
        },
        listLoading: false,
        detail: {},
        dialogTripForm: false,
        options: [{
          id: 0,
          label: '无卡'
        }, {
          id: 1,
          label: '正常'
        }, {
          id: 2,
          label: '使用中'
        }, {
          id: 3,
          label: '离线',
        }],
        cpStatusCn: '',

      };
    },
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.listLoading = true;
        modelDetail(this.id).then(response => {
          const res = response.data;
          if (res.status > 0) {
            this.detail = res.data;
            console.log(this.detail);
          }
          this.listLoading = false;
        })
      },
      headelgetDetail(event) {
        if(event.target.tagName.toLowerCase() === 'a') {
          console.log(event.target.innerHTML)
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
          background: #8a8a8a;
        }
      }
    }
    
    
    
    
  }
</style>
