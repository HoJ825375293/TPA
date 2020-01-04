import React, { Component} from 'react';

var echarts = require('echarts');
var myChart;

class StatCharts extends Component {
    componentDidMount(){
        myChart = echarts.init(document.getElementById('Stat'));
        myChart.setOption({
            baseOption: {
                timeline: {
                    axisType: 'category',
                    show: true,
                    playInterval: 1000,
                    data: ['各时期', '过度时期', '季节影响','天气影响','风景影响']
                },
                grid: { 
                    left: '5%',
                    right: '7%',
                    bottom: '12%',
                    containLabel: true 
                },
                title: {
                    text: '统计信息',
                    subtext: '这里展示了一些相关统计信息'
                },
                tooltip: {
                    trigger: 'axis',
                },
                toolbox:{
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
            },
            options:[
                {
                    legend: {
                        data: ['各个时期']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['初唐', '盛唐', '中唐', '晚唐']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                    series: [
                    {
                        name: '各个时期',
                        type: 'line',
                        data: [56.08,70.75,78.49,75.24],
                        // markPoint: {
                        //     data: [
                        //         {type: 'max', name: '最高值'},
                        //         {type: 'min', name: '最值'}
                        //     ]
                        // },
                    }]
                },{
                    legend: {
                        data: ['过度时期']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['初唐->盛唐', '盛唐->中唐', '中唐->晚唐']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                    series: [{
                        name: '过度时期',
                        type: 'line',
                        data: [61.36,74.49,77.24],
                    }]
                },{
                    legend: {
                        data: ['春', '夏', '秋', '冬']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['哀伤','失意','愁绪','喜悦','孤独','恐惧','愤怒','怨恨','惊讶']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                    series: [{
                            name: '春',
                            type: 'line',
                            data: [24.42,12.57,8.61,44.98,5.02,1.42,1.02,1.38,0.58],
                        },{
                            name: '夏',
                            type: 'line',
                            data: [33.63,17.7,8.85,17.7,8.85,6.19,1.77,2.65,2.65,],
                        },{
                            name: '秋',
                            type: 'line',
                            data: [39.63,21.99,7.05,10.89,11.93,3.32,3.32,1.56,0.31,],
                        },{
                            name: '冬',
                            type: 'line',
                            data: [37.24,25,4.08,12.24,9.18,3.57,5.1,2.04,1.53],
                        },
                    ]
                },{
                    legend: {
                        data: ['雨', '雪', '露', '风','云']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['哀伤','失意','愁绪','喜悦','孤独','恐惧','愤怒','怨恨','惊讶']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                    series: [{
                            name: '雨',
                            type: 'line',
                            data: [55.36,12.8,7.44,11.61,8.33,2.38,0.89,0.6,0.6,],
                        },{
                            name: '雪',
                            type: 'line',
                            data: [34.75,19.15,9.93,17.73,9.22,4.96,2.84,1.42,0,],
                        },{
                            name: '露',
                            type: 'line',
                            data: [37.83,17.6,4.49,21.35,9.36,2.62,4.12,2.25,0.37,],
                        },{
                            name: '风',
                            type: 'line',
                            data: [35.03,15.92,10.19,17.2,8.28,3.18,7.01,2.55,0.64,],
                        },{
                            name: '云',
                            type: 'line',
                            data: [41.63,16.74,5.58,16.74,9.44,6.44,2.15,0.43,0.86,],
                        },
                    ]
                },{
                    legend: {
                        data: ['山', '水', '边塞', '建筑','名胜']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['哀伤','失意','愁绪','喜悦','孤独','恐惧','愤怒','怨恨','惊讶']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                    series: [{
                            name: '山',
                            type: 'line',
                            data: [41.01,19.82,5.07,18.89,9.22,1.38,1.84,0.92,1.84,],
                        },{
                            name: '水',
                            type: 'line',
                            data: [34.18,21.02,8.31,19.63,9.47,3,2.31,1.39,0.69,],
                        },{
                            name: '边塞',
                            type: 'line',
                            data: [43.3,17.26,7.07,15.76,6.97,3.75,3.43,2.36,0.11,],
                        },{
                            name: '建筑',
                            type: 'line',
                            data: [33.72,18.13,7.64,23.97,9.86,2.33,1.8,1.48,1.06,],
                        },{
                            name: '名胜',
                            type: 'line',
                            data: [40,18.81,5.97,19.1,8.06,3.58,3.28,0.6,0.6,],
                        },
                    ]
                }
            ]
        })
    }

    render(){
        return (
            <div>
            <div style = {{height:15,backgroundColor:'#FFFAFA'}}></div>
            <div id = "Stat" style = {{width:'100%',height:540}}></div>
            </div>
        );
    }
}

export default StatCharts;