<template>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card">
        <div class="user">
          <img  :src="img_url" >
          <div class="userinfo">
            <p class="name">{{ userName }}</p>
            <p class="access">{{ access }}</p>
          </div>
        </div>
        <div class="login-info">
          <p class="left">上次登录时间：<span>2034-3-27</span> </p>
          <p class="left">上次登录地点：<span>北京</span> </p>
        </div>
      </el-card>
      <el-card class="table-card">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(val, key) in tableList" :prop="key" :label="val" :key="key">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="count">
        <el-card v-for="item in countData" :key="item.name" class="count-card">
          <i :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="text">
            <p>{{ item.value }}</p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; margin: 0 15px;">
        
        <div ref="echarts1" style="height: 280px"></div>

      </el-card>
      <div class="graph" style="margin: 10px 15px;">
        <el-card style="height: 260px;">

          <div ref="echarts2" style="height: 260px; padding-top: 10px;"></div>

        </el-card>
        <el-card style="height: 260px;">

          <div ref="echarts3" style="height: 260px;"></div>

        </el-card>

      </div>

    </el-col>
  </el-row>
</template>

<script>
import {getData} from '../api'
import * as echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  data(){
    return {
      tableData:[],
      tableList:{
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总销售量"
      },
      countData:[
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  computed:{
    ...mapState({
            img_url: state => state.userInfo.infos.img,
            userName: state => state.userInfo.infos.name,
            access: state => state.userInfo.infos.access,
        })
  },

  mounted(){
    getData().then(
      ({ data }) => {
        const { tableData } = data.data
        this.tableData = tableData
        const echarts1 = echarts.init(this.$refs.echarts1)
        var echarts1Option = {}
        const { orderData } = data.data

        const xAxis = Object.keys(orderData.data[0])
        
        const xAxisData = {
          data: xAxis
        }

        echarts1Option.xAxis = xAxisData
        echarts1Option.legend = xAxisData
        echarts1Option.yAxis = {}
        echarts1Option.series = []
        xAxis.forEach(
          key => {
            echarts1Option.series.push(
              {
                name: key,
                data: orderData.data.map(item => item[key]),
                type: 'line'
              }
            )
          }
        )
        
        echarts1.setOption(echarts1Option) 
          

        
        const {userData} = data.data
        const xAxis_userData = userData.map(item => item['date'])

        

        const echarts2 = echarts.init(this.$refs.echarts2)

        var echarts2Option = {}

        echarts2Option.xAxis = {
          data: xAxis_userData
        }

        echarts2Option.yAxis = {}

        var new_obj = {
          name: '新增人数',
          type: 'bar',
          data: userData.map(item => item['new'])
        }

        var active_obj = {
          name: '活跃人数',
          type: 'bar',
          data: userData.map(item => item['active'])
        }

        echarts2Option.series = [
          new_obj, active_obj,
          
        ],

        echarts2Option.tooltip = {
            trigger: "axis",
        },

        echarts2Option.legend = {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },

        echarts2.setOption(echarts2Option)

        // 初始化
        const echarts3 = echarts.init(this.$refs.echarts3) 

        const { videoData } = data.data

        var video =  {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              type: 'pie',
              data: videoData
            }
          ],
        }

        echarts3.setOption(video)


      }
    )

      console.log(this.userName)
    
  },
  
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #999999;
  line-height: 0;
  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }

  .userinfo {
    
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.5;

    .name {
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 5px;
    }

    .access {
      font-size: 14px;
      color: #999999;
    }

  }
}


.login-info {
  line-height: 1.5;
  text-align: left;
  margin-left: 20px;

  .info-item {
    height: 50px;

    .left {

      span {
        display: block;

      }
    }

  }
}

.table-card{
  line-height: 5;
  margin-top: 20px;
  padding-top: 20px;  
  // background: red;
  // height: 500px;
}

.count{
  line-height: 1.5;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  .count-card{
    position: relative;
    min-width: 30%;
    margin-bottom: 10px;
    display: block;
    clear: both;
    
    /deep/.el-card__body { 
      padding: 0;
    }


    i{
      width: 80px;
      height: 80px;
      font-size: 40px;
      text-align: center;
      line-height: 2;
      color: #fff;
      float: left;
      
    }

    .text{
      float: left;
      width: 100px;
      height: 80px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-left:  10px;

      p{
        line-height: 1.5;
      }
    }
  }
}

.graph{
  display: flex;
  justify-content: space-between;
  
  /deep/.el-card__body {
    padding: 0;
  }
  .el-card{
    width: 49%;
  }
}

</style>