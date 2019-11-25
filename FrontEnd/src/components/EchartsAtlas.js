import React, { Component,Fragment } from 'react';
import { Button,Input, Tooltip, Select } from 'antd';

var echarts = require('echarts');
const InputGroup = Input.Group;
const { Option } = Select;

class EchartsAtlas extends Component {
    constructor(props){
        super(props)
        this.state={
            timer:0,
            max: 75,
            from:"",
            to:"",
            selc:1
        }
        this.timer = null;
        this.Stop = this.Stop.bind(this);
    }
    
    Stop(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    componentDidMount(){
        const me = this;
        var myChart = echarts.init(document.getElementById("Atlas"));
        var data = [{
            fixed: true,
            name: '时间',
            itemStyle: {
                color: 'rgb(123,104,238)'
            },
            x: myChart.getWidth() / 8,
            y: myChart.getHeight() / 6,
            symbolSize: 30,
            id: 0
        },{
            fixed: true,
            name: '地点',
            itemStyle: {
                color: 'rgb(65,105,225)'
            },
            x: myChart.getWidth()*3 / 8,
            y: myChart.getHeight() / 6,
            symbolSize: 30,
            id: 1627
        },{
            fixed: true,
            name: '景物',
            itemStyle: {
                color: 'rgb(34,139,34)'
            },
            x: myChart.getWidth()*5 / 8,
            y: myChart.getHeight() / 6,
            symbolSize: 30,
            id: 357
        },{
            fixed: true,
            name: '人',
            itemStyle: {
                color: 'rgb(255,69,0)'
            },
            x: myChart.getWidth()*7 / 8,
            y: myChart.getHeight() / 6,
            symbolSize: 30,
            id: 2700
        }
        ];
        var edges = [];
        
        myChart.setOption({
            series: [{
                type: 'graph',
                layout: 'force',
                animation: false,
                focusNodeAdjacency:true,
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                },
                label: {
                    show:true,
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                },
                data: data,
                force: {
                    // initLayout: 'circular'
                    // gravity: 0
                    repulsion: 50,
                    edgeLength: 5
                },
                edges: edges
                }]
        })

        this.timer = setInterval(function(){
            me.setState({
                timer:me.state.timer + 1
            })
            if(me.state.timer == me.state.max){
                me.Stop();
            }
            
            data.push({
                id: data.length
            });
            var source = Math.round((data.length - 1) * Math.random());
            var target = Math.round((data.length - 1) * Math.random());
            if (source !== target) {
                edges.push({
                    source: source,
                    target: target
                });

                myChart.setOption({
                    series: [{
                        roam: true,
                        data: data,
                        edges: edges
                    }]
                })
            } 
        },100)

        
    };
    
    handleFrom(event){
        if(event && event.target && event.target.value){
            let value = event.target.value;
            this.setState({from:value })
        }
    }

    handleTo(event){
        if(event && event.target && event.target.value){
            let value = event.target.value;
            this.setState({to:value })
        }
    }

    handleIn(){
        console.log(this.state)
    }

    handleSelect(value){
        this.setState({selc:value});
        console.log(value)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    SearchBar=()=>{
        const modeType = this.state.selc;
        if(modeType == 1){
            return (
                <Fragment>
                    <InputGroup compact onSearch={value => console.log(value)}>
                        <Select defaultValue="1" onChange={(value)=>this.handleSelect(value)}>
                        <Option value="1">属性图</Option>
                        <Option value="2">关系图</Option>
                        </Select>
                    
                        <Tooltip title="属性可以是时间,地点,景物,人">
                        <Input
                        style={{ width: 180, textAlign: 'center' }}
                        placeholder="请输入查询属性"
                        onChange={event => this.handleFrom(event)}
                        />
                        </Tooltip>
                        <Button type="primary" onClick={()=>{this.handleIn()}}>搜索</Button>
                    </InputGroup>
                </Fragment>
            );
        }
        else if(modeType == 2){
            return (
                <Fragment>
                    <InputGroup compact onSearch={value => console.log(value)}>
                        <Select defaultValue="1" onChange={(value)=>this.handleSelect(value)}>
                        <Option value="1">属性图</Option>
                        <Option value="2">关系图</Option>
                        </Select>
                    
                        <Tooltip title="属性可以是时间,地点,景物,人">
                        <Input
                        style={{ width: 180, textAlign: 'center' }}
                        placeholder="请输入查询属性"
                        onChange={event => this.handleFrom(event)}
                        />
                        </Tooltip>
                        <Input
                            style={{
                            width: 40,
                            pointerEvents: 'none',
                            backgroundColor: '#fff',
                            }}
                            placeholder="与"
                            disabled
                        />
                        <Tooltip title="属性可以是时间,地点,景物,人">
                        <Input
                        style={{ width: 180, textAlign: 'center' }}
                        placeholder="请输入查询属性"
                        onChange={event => this.handleTo(event)}
                        />
                        </Tooltip>
                        <Button type="primary" onClick={()=>{this.handleIn()}}>搜索</Button>
                    </InputGroup>
                </Fragment>
            );
        }
    }

    render(){
        return (
            <div>
            <div style={{width:'100%'}}>
                <Fragment>
                    {this.SearchBar()}  
                </Fragment>        
            </div>    
            <div id = "Atlas" style = {{width:'100%', height:550}}> </div>
            </div>
        );
    }
}

export default EchartsAtlas;