import React, { Component,Fragment } from 'react';
import { Button,Input, Tooltip, Select, message, Row, Menu, Dropdown, Icon,notification} from 'antd';
// import { GmlData } from './GmlData';
import { GmlEdge } from './Edge';
import { defaultData } from './DefaultData';
import { defaultEdge } from './DefaultEdge';
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';

var IntroJs = require('intro.js')

var echarts = require('echarts');
const InputGroup = Input.Group;
const { Option } = Select;
var data = [];
var edges = [];
var myChart;
var tempData = [];
var map = [];
var stack = [];

class EchartsAtlas extends Component {
    constructor(props){
        super(props)
        this.state={
            from:"",
            to:"",
            selc:"1",
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
                    repulsion: 500,
                    edgeLength: 55
                },
                edges: defaultEdge
                }]
        })
    };

    Intro = (key) => {
		notification.close(key)
		IntroJs().setOptions({
			prevLabel: "上一步",
			nextLabel: "下一步",
			skipLabel: "跳过",
			doneLabel: "结束",
			showProgress: true,
			exitOnEsc: true,
			showButtons: true,
			showStepNumbers: true,
			keyboardNavigation: true,
			showBullets: false,
		}).oncomplete(function () {
			message.success('开始你的关系找寻之旅吧！')
		}).onexit(function () {
		}).start();
	}

    openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <div>
                <Button type="primary" onClick={() => this.Intro(key)} style={{ marginRight: '30px' }}>
                    需要
                </Button>
            </div>
        );
        notification.open({
            message: '是否需要帮助？',
            description: '点击下方的"需要"按钮，可以帮助您进行简单的引导。',
            style: {
                width: 400,
            },
            duration: 3.5,
            icon: <Icon type="smile" style={{ color: '#FFC125' }} />,
            btn,
            key
        });
    };
    
    componentWillMount(){
        this.openNotification()
    }

    handleFrom(event){
        let value = event.target.value;
        this.setState({from:value})
    }

    handleTo(event){
        let value = event.target.value;
        this.setState({to:value })
    }

    check(node1,node2){
        let temp = []
        let tempName;
        let i,j,found;

        stack.push(node1);
        
        found = 0;
        for(j = 0; j < stack.length; j++){
            for(i = 0; i < GmlEdge.length; i++){
                if(map[i] !== 1 && GmlEdge[i].source === stack[j]){
                    map[i] = 1;
                    stack.push(GmlEdge[i].target)
                    temp.push(GmlEdge[i])
                    if(GmlEdge[i].target === node2){
                        found = 1;
                        break;
                    }
                }
                if(map[i] !== 1 && GmlEdge[i].target === stack[j]){
                    map[i] = 1;
                    stack.push(GmlEdge[i].source)
                    temp.push(GmlEdge[i])
                    if(GmlEdge[i].source === node2){
                        found = 1;
                        break;
                    }
                }
            }
            if(found){
                break;
            }
        }

        tempName = node2;
        while(tempName !== node1){
            for(i = 0; i < temp.length; i++){
                if(temp[i].source === tempName){
                    tempData.push(temp[i])
                    tempName = temp[i].target
                    break
                }
                if(temp[i].target === tempName){
                    tempData.push(temp[i])
                    tempName = temp[i].source
                    break
                }
            }
        }
    }

    handleIn(){
        tempData = [];
        if(this.state.selc === "1"){
            data = [];
            edges = [];
            let tempName = "";
            const nodeName = this.state.from;
            if(nodeName === ""){
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
                    symbolSize: 55,
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
                                symbolSize: 37,
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
                                            symbolSize: 30,
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

                if(!edges.hasOwnProperty('length')){
                    message.error("找不到它的关系哦!")
                }

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
            }else if(nodeName === nodeName2){
                message.error('两个属性名字应不同哦!');
            }
            else{
                data = [];
                edges = [];
                let i,j;
                map = [];
                stack = [];
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
                            symbolSize: 30,
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
                            symbolSize: 30,
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
            }
        }
    }

    handleSelect(value){
        this.setState({selc:value});
    }

    OnMenu(key){
        this.setState({
            from:key.item.props.children
        })
    }

    SearchBar=()=>{
        const modeType = this.state.selc;
        const menu = (
            <Menu onClick={(key)=>this.OnMenu(key)}>
              <Menu.Item key="0">时间</Menu.Item>
              <Menu.Item key="1">王昭君</Menu.Item>
              <Menu.Item key="3">送别</Menu.Item>
              <Menu.Item key="4">酒</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="5">这里是一些例子</Menu.Item>
            </Menu>
        );

        if(modeType === "1"){
            return (
                <Fragment>
                    <InputGroup compact onSearch={value => console.log(value)}>
                        <div data-step="1" data-intro="在这里选择输入的模式:“属性图”用于搜索单属性范围关系；“关系图”用于搜索两属性之间的路径关系" data-position="right">
                        <Select defaultValue="1" onChange={(value)=>this.handleSelect(value)}>
                        <Option value="1">属性图</Option>
                        <Option value="2">关系图</Option>
                        </Select>
                        </div>
                    
                        <Tooltip title="属性可以是任何时间,地点,景物,人">
                        <div data-step="2" data-intro="点击输入框,获取一些例子,或者自定义输入" data-position="right">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Input
                            style={{ width: 180, textAlign: 'center' }}
                            placeholder="请输入查询属性"
                            value = {this.state.from}
                            onChange={event => this.handleFrom(event)}
                            allowClear = {true}
                            />
                        </Dropdown>
                        </div>
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
                    <div data-step="3" data-intro="这里是主要输入框" data-position="right">
                    {this.SearchBar()}  
                    </div>
                </Fragment>
                <Row style={{ height:10 }}></Row>        
            </div>    
            <div id = "Atlas" data-step="4" data-intro="我们已经为你展示出一个实例结果,开始自己的探索吧!" data-position="right" 
            style = {{width:'100%', height:540}}> </div>
            </div>
        );
    }
}

export default EchartsAtlas;