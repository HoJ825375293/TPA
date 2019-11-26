import React, { Component,Fragment } from 'react';
import { Button,Input, Tooltip, Select, message, Row, Col } from 'antd';
import { GmlData } from './GmlData';
import { GmlEdge } from './Edge';
import { defaultData } from './DefaultData';
import { defaultEdge } from './DefaultEdge';

var echarts = require('echarts');
const InputGroup = Input.Group;
const { Option } = Select;
const corList = [{att:"时间",cor:'rgb(123,104,238)'},{att:"地点",cor:'rgb(65,105,225)'},
                {att:"景物",cor:'rgb(34,139,34)'},{att:"人",cor:'rgb(255,69,0)'}]
var data = [];
var edges = [];
var myChart;
var tempData = [];
var map = [];
var from;
class EchartsAtlas extends Component {
    constructor(props){
        super(props)
        this.state={
            from:"",
            to:"",
            selc:"1"
        }
    }
    
    componentDidMount(){
        myChart = echarts.init(document.getElementById("Atlas"));
        
        myChart.setOption({
            series: [{
                roam: true,
                type: 'graph',
                layout: 'force',
                animation: false,
                focusNodeAdjacency:true,
                edgeSymbol: ['arrow'],
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
                data: defaultData,
                force: {
                    // initLayout: 'circular'
                    // gravity: 0
                    repulsion: 200,
                    edgeLength: 50
                },
                edges: defaultEdge
                }]
        })
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

    check(node1,node2){
        if(node1 === node2){
            return true;
        }
        let i,have;
        while(1){
            have = 0;
            for(i = 0; i < GmlEdge.length; i++){
                if(map[i] !== 1 && GmlEdge[i].source === node1){
                    have = 1;
                    map[i] = 1;
                    if(this.check(GmlEdge[i].target,node2)){
                        tempData.push(GmlEdge[i]);
                        return true;
                    }
                }
                if(map[i] !== 1 && GmlEdge[i].target === node1){
                    have = 1;
                    map[i] = 1;
                    if(this.check(GmlEdge[i].source,node2)){
                        tempData.push(GmlEdge[i]);
                        return true;
                    }
                }
            }
            if(!have){
                break;
            };
        }
        return false
    }

    handleIn(){
        tempData = [];
        if(this.state.selc === "1"){
            data = [];
            edges = [];
            let tempName = "";
            const nodeName = from;
            if(nodeName === "" || nodeName === undefined){
                message.error('要有输入才合法哦!');
            }else{
                let i,j,k;
                let len = GmlEdge.length;
                let ci,cj;
                tempName = nodeName;

                data.push({
                    name: nodeName,
                    itemStyle: {
                        color: 'rgb(123,104,238)'
                    },
                    x: myChart.getWidth()/2,
                    y: myChart.getHeight()/2,
                    symbolSize: 50,
                })
                ci = 0;
                for(i = 0; i < len; i++){
                    if(ci > 5){
                        break;
                    }
                    if(GmlEdge[i].source === nodeName){
                        tempName = GmlEdge[i].target;
                        for(k = 0; k < data.length; k++){
                            if(data[k].name === tempName){
                                break;
                            }    
                        }
                        if(k === data.length){
                            ci++;
                            tempData.push(GmlEdge[i])
                            data.push({
                                name: tempName,
                                itemStyle: {
                                    color: 'rgb(65,105,225)'
                                },
                                symbolSize: 32,
                            });
                            cj = 0;
                            for(j = 0; j < len; j++){
                                if(cj > 3){
                                    break;
                                }
                                if(GmlEdge[j].source === tempName){
                                    for(k = 0; k < data.length; k++){
                                        if(data[k].name === GmlEdge[j].target){
                                            break;
                                        }    
                                    }
                                    if(k === data.length){
                                        cj++;
                                        tempData.push(GmlEdge[j]);
                                        data.push({
                                            name: GmlEdge[j].target,
                                            itemStyle: {
                                                color: 'rgb(255,69,0)'
                                            },
                                            symbolSize: 25,
                                        })
                                    }
                                }
                            }
                        }
                    }
                }

                for(i = 0; i < tempData.length; i++){
                    for(j = 0; j < edges.length; j++){
                        if(edges[j].source === tempData[i].source
                        && edges[j].target === tempData[i].target){
                            break;
                        }
                    }
                    if(j === edges.length){
                        edges.push(tempData[i])
                    }
                }

                // console.log("----------")
                // console.log(data)
                // console.log(edges)

                myChart.setOption({
                    series: [{
                        data: data,
                        edges: edges
                    }]
                })
            }
        }else if(this.state.selc === "2"){
            const nodeName = this.state.from;
            const nodeName2 = this.state.to;
            if(nodeName === "" || nodeName2 === ""
            || nodeName === undefined || nodeName2 === undefined){
                message.error('要有两个输入才合法哦!');
            }else{
                data = [];
                edges = [];
                let i,j;
                this.check(nodeName,nodeName2);

                data.push({
                    name:nodeName,
                    itemStyle: {
                        color: 'rgb(123,104,238)'
                    },
                    x:100,
                    y:200,
                    symbolSize: 55,
                })
                data.push({
                    name:nodeName2,
                    itemStyle: {
                        color: 'rgb(65,105,225)'
                    },
                    x:500,
                    y:200,
                    symbolSize: 55,
                })

                let cor = 'red'
                for(i = 0; i < tempData.length; i++){
                    for(j = 0; j < data.length; j++){
                        if(tempData[i].source === data[j].name){
                            break;
                        }
                    }
                    if(j === data.length){
                        data.push({
                            name:tempData[i].source,
                            itemStyle: {
                                color: cor
                            },
                            symbolSize: 20,
                        })
                    }
                    
                    for(j = 0; j < data.length; j++){
                        if(tempData[i].target === data[j].name){
                            break;
                        }
                    }
                    if(j === data.length){
                        data.push({
                            name:tempData[i].target,
                            itemStyle: {
                                color: cor
                            },
                            symbolSize: 20,
                        })
                    }
                }
                
                for(i = 0; i < tempData.length; i++){
                    for(j = 0; j < edges.length; j++){
                        if(edges[j].source === tempData[i].source
                        && edges[j].target === tempData[i].target){
                            break;
                        }
                    }
                    if(j === edges.length){
                        edges.push(tempData[i])
                    }
                }

                myChart.setOption({
                    series: [{
                        data: data,
                        edges: edges
                    }]
                })
                console.log(data)
                console.log(edges)
                console.log(tempData)
            }
        }
        // console.log(this.state)
    }

    handleSelect(value){
        this.setState({selc:value});
    }

    onChange(value) {
        from = value
    }
      
    onSearch(val) {
        from = val
    }

    SearchBar=()=>{
        const modeType = this.state.selc;

        if(modeType === "1"){
            return (
                <Fragment>
                    <InputGroup compact onSearch={value => console.log(value)}>
                        <Select defaultValue="1" onChange={(value)=>this.handleSelect(value)}>
                        <Option value="1">属性图</Option>
                        <Option value="2">关系图</Option>
                        </Select>
                    
                        <Tooltip title="属性可以是任何时间,地点,景物,人">
                        <Select
                        showSearch
                        style={{ width: 200, textAlign: 'center' }}
                        allowClear = {true}
                        placeholder="点击--这里是一些示例"
                        onChange={this.onChange}
                        onSearch={this.onSearch}
                        notFoundContent={null}
                        >
                            <Option value="时间">时间</Option>
                            <Option value="送别">送别</Option>
                            <Option value="汉朝">汉朝</Option>
                            <Option value="水">水</Option>
                            <Option value="酒">酒</Option>
                            <Option value="王昭君">王昭君</Option>
                        </Select>
                        </Tooltip>
                        <Button type="primary" onClick={()=>{this.handleIn()}}>搜索</Button>
                    </InputGroup>
                </Fragment>
            );
        }
        else if(modeType === "2"){
            return (
                <Fragment>
                    <InputGroup compact onSearch={value => console.log(value)}>
                        <Select defaultValue="2" onChange={(value)=>this.handleSelect(value)}>
                        <Option value="1">属性图</Option>
                        <Option value="2">关系图</Option>
                        </Select>
                    
                        <Tooltip title="属性可以是任何时间,地点,景物,人">
                        <Input
                        style={{ width: 180, textAlign: 'center' }}
                        placeholder="请输入查询属性"
                        onChange={event => this.handleFrom(event)}
                        allowClear = {true}
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
                        allowClear = {true}
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
                <Row style={{ height:10 }}></Row>        
            </div>    
            <div id = "Atlas" style = {{width:'100%', height:540}}> </div>
            </div>
        );
    }
}

export default EchartsAtlas;