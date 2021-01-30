<template>
    <div class="app-container calendar-list-container" id="basicData_search_index">
        <div class="info">
            <div style="margin-bottom: 20px;" class="clearfix">
                <div class="info_left fl">
                    <p class="info_top">所有概要信息</p>
                    <ul class="device_ul" >
                        <li v-for="i in deviceAll" :key="i.id">
                            <span class="device_count" :style="`background-color: #${i.color};`">{{i.count}}</span>
                            <p>{{i.value}}</p>
                        </li> 
                    </ul>
                </div>
                <div class="info_right fr">
                    <p class="info_top clearfix">
                        <span class="fl">流量池本月剩余流量</span>
                    </p>
                    <div class="echart_pie clearfix">
                        <div class="fr" ref="myChart_liquidFill" style="width:380px; height: 155px; "></div>
                        <div class="fl clearfix flow_info">
                            <span class="fl">
                                <i>总计: </i>4.84P
                            </span>
                            <br>
                            <span class="fl"> 
                                <i>已用: </i>1.61P
                            </span>
                            <br>
                            <span class="fl">
                                <i>剩余: </i>3.23P
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="footer">
            <p class="info_top">最近30天使用记录</p>
            <div class="echart_footer" >
                <div ref="myChart_line" style="width: 1200px; height: 250px;"></div>
                <div ref="myChart_bar" style="width: 1200px; height: 250px; margin-top: 20px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
    import { modelDevice } from 'api/sim_card/simcard_info';

    export default {
        data() {
            return {
                listLoading: true,
                total: null,
                listQuery: {
                    page: 1,
                    perPage: 100,
                    q: {
                        usergroup: '',
                        status: '',
                        network: '',
                        province: '',
                    }
                },
                dialogVisible: false,
                deviceAll: [],
                progress: {
                    num: 66
                },
            }
        },
        created() {
            this.getDevice();
        },
        mounted () {
            this.$nextTick(() => {
                this.setEchart();
            })
        },
        methods: {
            getDevice() {
                modelDevice().then( response => {
                    const res = response.data.data;
                    console.log(res);
                    this.deviceAll = [
                        {id: '1',count: res.simCardGroups, value: "卡组数", color: "58B5E3"},
                        {id: '2',count: res.simCards, value: "卡总数", color: "58B5E3"},
                        {id: '3',count: res.freeCards, value: "空闲卡", color: "53A840"},
                        {id: '4',count: res.useCards, value: "使用中", color: "4374E0"},
                        {id: '5',count: res.disableCards, value: "禁用中", color: "777777"},
                        {id: '6',count: res.failureCards, value: "失败卡", color: "D73E32"},
                        {id: '7',count: res.offLineCards, value: "离线", color: "cccccc"},
                        {id: '8',count: res.waitActivateCards, value: "新卡", color: "F3B400"},
                    ]
                }) 
            },

            setEchart() {
                // 水行图
                var _this = this;
                let myChart_liquidFill = this.$echarts.init(this.$refs.myChart_liquidFill);
                    myChart_liquidFill.setOption({
                    // backgroundColor: "#050038",
                    tooltip: {
                        trigger: 'item',
                        formatter: `剩余用量比例${this.progress.num}%`
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: ['剩余用量比例']
                    },
                    title: {
                    text: `3.23P`,
                    left: "center",
                    top: "70",
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 20,
                        color: "rgb(0,0,0)"
                    },
                    subtext: `剩余${this.progress.num}%`, //副标题
                    subtextStyle: {
                        fontWeight: "bold",
                        fontSize: 10,
                        color: "rgb(0,0,0)"
                    }
                    },

                    series: [
                    {
                        name: [''],
                        type: "liquidFill", // 图表类型
                        radius: "80%",
                        center: ["50%", "50%"],
                        data: [
                        { value:this.progress.num / 100, name: '剩余用量比例'},
                        ], // data个数代表波浪数
                        backgroundStyle: {
                        borderWidth: 1,
                        color: "#F4F9FF"
                        },
                        label: {
                        normal: {
                            show: false, //不显示label  用副标题代替了
                            formatter: (0.5 * 100).toFixed(0) + "%",
                            textStyle: {
                                fontSize: 14,
                                color: "#E4E9EF",
                                insideColor: '#42CFF1',
                            }
                        }
                        },
                        color: [  //color一定要是个数组 ，每一项对应一个波浪，可以给每个波浪单独配置颜色
                            {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                {
                                    offset: 1,
                                    color: "rgba(187,248,252,0.5)"
                                },
                                {
                                    offset: 0,
                                    color: "rgba(30,134,245,1)"
                                }
                                ],
                                globalCoord: false
                            },
                        ],
                        outline: {
                        show: false
                        }
                    },
                    //外层线
                    {
                        type: "pie",
                        center: ["50%", "50%"],
                        radius: ["92%", "93%"], //外层线粗细
                        hoverAnimation: false,
                        data: [
                        {
                            name: "",
                            value: 100,
                            labelLine: {
                            show: false
                            },
                            itemStyle: {
                            color: "#67CDFB"
                            },
                            emphasis: {
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                color: "#5886f0"
                            }
                            }
                        }
                        ]
                    },
                    //进度线
                    {
                        type: "pie",
                        center: ["50%", "50%"],
                        radius: ["90%", "95%"], //进度线粗细
                        hoverAnimation: false,
                        data: [
                        {
                            name: "",
                            value: this.progress.num, //进度
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 2,
                                colorStops: [
                                // !! 在此添加渐变过程色 !!
                                { offset: 0, color: "#33E2ED" },
                                { offset: 1, color: "#807AFE" }
                                ]
                            }
                            },
                            emphasis: {
                                labelLine: {
                                    show: false
                                },
                                itemStyle: {
                                    // color: "#5886f0"
                                }
                            }
                        },
                        {
                            //画剩余的刻度圆环
                            name: "",
                            value: 100 - this.progress.num,
                            itemStyle: {
                            color: "rgba(0,0,0,0)"
                            },
                            }
                        ]
                    }
                    ]
                });
                
                // 折线图
                let myChart_line = this.$echarts.init(this.$refs.myChart_line);
                    myChart_line.setOption({
                        title: {
                            text: '流量使用图',
                            left: '3%'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            },
                            formatter(params) {
                            　　var result = ''
                               
                            　　var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#00F6FF"></span>'
                            　　params.forEach(function (item) {
                            　　　　result += item.axisValue + "</br>" + dotHtml + '流量使用(G)  ' + _this.numFormat(item.data[1].toFixed(2))
                            　　})
                        　　    return result
                            }
                        },
                        
                        legend: {
                            data: ['流量使用(G)']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                axisLabel: {
                                    interval: 5,
                                    showMaxLabel: true,
                                },
                                
                            }

                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        
                        series: [
                            {
                                name: '流量使用(G)',
                                type: 'line',
                                stack: '总量',
                                lineStyle: {
                                    color: "rgba(0, 246, 255, 1)"
                                },
                                areaStyle: {
                                    normal: {
                                    // 填充色渐变
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: "#3F9EFF" },
                                        { offset: 1, color: "#38D8EE" }
                                    ])
                                    }
                                },
                                
                                data: [
                                    ['2019-10-10', 200],
                                    ['2019-10-11', 406.34],
                                    ['2019-10-12', 604.22],
                                    ['2019-10-13', 533.9],
                                    ['2019-10-14', 233],
                                    ['2019-10-15', 300],
                                    ['2019-10-16', 450],
                                    ['2019-10-17', 300],
                                    ['2019-10-18', 100],
                                    ['2019-10-19', 300],
                                    ['2019-10-20', 100],
                                    ['2019-10-21', 100],
                                    ['2019-10-22', 400],
                                    ['2019-10-23', 100],
                                    ['2019-10-24', 100],
                                    ['2019-10-25', 300],
                                    ['2019-10-26', 100],
                                    ['2019-10-27', 100],
                                    ['2019-10-28', 100],
                                    ['2019-10-29', 400],
                                    ['2019-10-30', 100],
                                    ['2019-10-31', 100],
                                    ['2019-11-01', 100],
                                    ['2019-11-02', 500],
                                    ['2019-11-03', 100],
                                    ['2019-11-04', 100],
                                    ['2019-11-05', 100],
                                    ['2019-11-06', 300],
                                    ['2019-11-07', 300],
                                    ['2019-11-08', 300],
                                    
                                ]
                            }
                        ]
                    })
           
                // 柱形图
                let myChart_bar = this.$echarts.init(this.$refs.myChart_bar);
                    myChart_bar.setOption({
                        title: {
                            text: '使用卡数图',
                            left: '3%'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            },
                            formatter: function(params) {
                            　　var result = ''
                            　　var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-image: linear-gradient(#3F9EFF, #38D8EE);"></span>'
                            　　params.forEach(function (item) {
                            　　　　result += item.axisValue + "</br>" + dotHtml + '使用卡数  ' + _this.numFormat(item.data[1])
                            　　})
                            　　return result
                            }
                        },
                        
                        legend: {
                            data: ['使用卡数']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                // boundaryGap: false,
                                axisLabel: {
                                    interval: 5,
                                    showMaxLabel: true,
                                 },
                                  axisTick: {//坐标轴刻度与标签对齐
                                    alignWithLabel: true
                                }

                            }

                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        
                        series: [
                            {
                                name: '使用卡数',
                                type: 'bar',
                                stack: '总量',
                                lineStyle: {
                                    color: "rgba(0, 246, 255, 1)"
                                },
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            { offset: 0, color: "#3F9EFF" },
                                            { offset: 1, color: "#38D8EE" }
                                        ]
                                    )
                                },
                                
                                data: [
                                    ['2019-10-10', 200],
                                    ['2019-10-11', 400],
                                    ['2019-10-12', 650],
                                    ['2019-10-13', 500],
                                    ['2019-10-14', 250],
                                    ['2019-10-15', 300],
                                    ['2019-10-16', 450],
                                    ['2019-10-17', 300],
                                    ['2019-10-18', 100],
                                    ['2019-10-19', 300],
                                    ['2019-10-20', 100],
                                    ['2019-10-21', 100],
                                    ['2019-10-22', 400],
                                    ['2019-10-23', 100],
                                    ['2019-10-24', 100],
                                    ['2019-10-25', 300],
                                    ['2019-10-26', 100],
                                    ['2019-10-27', 100],
                                    ['2019-10-28', 100],
                                    ['2019-10-29', 400],
                                    ['2019-10-30', 100],
                                    ['2019-10-31', 100],
                                    ['2019-11-01', 100],
                                    ['2019-11-02', 500],
                                    ['2019-11-03', 100],
                                    ['2019-11-04', 100],
                                    ['2019-11-05', 100],
                                    ['2019-11-06', 300],
                                    ['2019-11-07', 300],
                                    ['2019-11-08', 300],
                                    
                                ]
                            }
                        ]
                    })
            },
            numFormat(num) {
                let reg = /\B(?<!(\.\d+))(?=(\d{3})+\b)/g;
                let res = num.toString().replace(reg , ',')
                return res
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .info {
        margin-bottom: 20px;
        .info_left {
            width: 800px;
            .device_ul {
                display: -webkit-flex;
                display: flex;
                flex-wrap: wrap;
                border: 1px solid #E5E5E5;
                border-top: none;
                margin: 0;
                padding-left: 0;
                li {
                    width: 200px;
                    border: 1px solid #E5E5E5;
                    border-left: none;
                    border-top: none;
                    padding: 10px 10px;
                    margin: 0px -1px -1px 0px;
                    &:nth-child(4n) {
                        width: 201px;
                        border-right: 0;
                    }
                        .device_count {
                            display: -webkit-inline-block;
                            display: inline-block;
                            padding: 4px 6px;
                            border-radius: 6px;
                            font-size: 18px;
                            color: #fff;
                        }
                        p {
                            margin: 5px 0 10px 0;
                            font-size: 13px;
                        }
                }
            }
        }
        .info_right {
            width: 380px;
            .echart_pie {
                position: relative;
                width:380px;
                height: 155px;
                border: 1px solid #E5E5E5;
                border-top: none;
                .flow_info {
                    display: inline;
                    position: absolute;
                    top: 10;
                    left: 10;
                    margin: 0;
                    span {
                        padding: 5px 8px;
                        font-size: 14px;
                        i {
                            display: inline-block;
                            padding: 3px 3px;
                            margin-right: 4px;
                            border-radius: 4px;
                            font-style: normal;
                            background-image: linear-gradient(#3F9EFF, #38D8EE);
                        }
                    }
                }
            }
        }
    }
    .echart_footer {
        padding: 10px;
        border: 1px solid #ccc;           
        border-top: none;
    }
</style>