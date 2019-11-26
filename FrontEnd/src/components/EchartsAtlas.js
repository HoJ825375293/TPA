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
class EchartsAtlas extends Component {
    constructor(props){
        super(props)
        this.state={
            timer:0,
            max: 75,
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
                    repulsion: 100,
                    edgeLength: 30
                },
                edges: edges
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
        //set default
        tempData = [];
        console.log("data")
        console.log(data)
        if(this.state.selc === "1"){
            let tempName = "";
            const nodeName = this.state.from;
            if(nodeName === ""){
                message.error('要有输入才合法哦!');
            }else{
                let i;
                let len = GmlEdge.length;
                let j;
                tempName = nodeName;

                for(i = 0; i < len; i++){
                    if(GmlEdge[i].source === nodeName){
                        for(j = 0; j < len; j++){
                            if(GmlEdge[j].source === )
                        }

                    }
                }

                // len = tempData.length-1;
                // let cor;

                // for(i = 0; i < tempData.length; i++){
                //     for(j = 0; j < data.length; j++){
                //         if(tempData[i].source === data[j].name){
                //             break;
                //         }
                //     }
                //     if(j === data.length){
                //         data.push({
                //             name:tempData[i].source,
                //             itemStyle: {
                //                 color: cor
                //             },
                //             symbolSize: 20,
                //         })
                //     }
                //     for(j = 0; j < data.length; j++){
                //         if(tempData[i].target === data[j].name){
                //             break;
                //         }
                //     }
                //     if(j === data.length){
                //         data.push({
                //             name:tempData[i].target,
                //             itemStyle: {
                //                 color: cor
                //             },
                //             symbolSize: 20,
                //         })
                //     }
                // }
                // for(i = 0; i < tempData.length; i++){
                //     edges.push(tempData[i])
                // }

                myChart.setOption({
                    series: [{
                        data: data,
                        edges: edges
                    }]
                })

                console.log("----------")
                console.log(data)
                console.log(edges)
            }
        }else if(this.state.selc === "2"){
            let temp = [];
            const nodeName = this.state.from;
            const nodeName2 = this.state.to;
            if(nodeName === "" || nodeName2 === ""){
                message.error('要有两个输入才合法哦!');
            }else{
                let i,j;
                this.check(nodeName,nodeName2);

                let cor = 'red'
                for(i = 0; i < tempData.length; i++){
                    if(data !== undefined && data.hasOwnProperty('length')){
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
                    }else{
                        data.push({
                            name:tempData[i].source,
                            itemStyle: {
                                color: cor
                            },
                            symbolSize: 20,
                        })
                    }
                    
                    if(data !== undefined && data.hasOwnProperty('length')){
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
                    }else{
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
                        <Input
                        style={{ width: 180, textAlign: 'center' }}
                        placeholder="请输入查询属性"
                        onChange={event => this.handleFrom(event)}
                        allowClear = {true}
                        />
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