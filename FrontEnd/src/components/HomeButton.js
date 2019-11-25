import React from 'react';
import { Button, Tooltip } from 'antd';
import { Redirect, Link } from 'react-router-dom';
// const defaultData = [{
//         fixed: true,
//         name: '时间',
//         itemStyle: {
//             color: 'rgb(0,191,255)'
//         },
//         x: myChart.getWidth() / 8,
//         y: myChart.getHeight() / 6,
//         symbolSize: 30,
//         id: 0
//     },{
//         fixed: true,
//         name: '地点',
//         itemStyle: {
//             color: 'rgb(72,209,204)'
//         },
//         x: myChart.getWidth()*3 / 8,
//         y: myChart.getHeight() / 6,
//         symbolSize: 30,
//         id: 1627
//     },{
//         fixed: true,
//         name: '景物',
//         itemStyle: {
//             color: 'rgb(34,139,34)'
//         },
//         x: myChart.getWidth()*5 / 8,
//         y: myChart.getHeight() / 6,
//         symbolSize: 30,
//         id: 357
//     },{
//         fixed: true,
//         name: '人',
//         itemStyle: {
//             color: 'rgb(255,69,0)'
//         },
//         x: myChart.getWidth()*7 / 8,
//         y: myChart.getHeight() / 6,
//         symbolSize: 30,
//         id: 2700
//     },{
//         name: '节日',
//         itemStyle: {
//             color: 'rgb(0,191,255)'
//         },
//         symbolSize: 30,
//         id: 
//     },{
//         name: '季节',
//         itemStyle: {
//             color: 'rgb(0,191,255)'
//         },
//         symbolSize: 30,
//         id: 0
//     },{
//         name: '元宵',
//         itemStyle: {
//             color: 'rgb(0,191,255)'
//         },
//         symbolSize: 30,
//         id: 
//     },{
//         name: '春',
//         itemStyle: {
//             color: 'rgb(0,191,255)'
//         },
//         symbolSize: 30,
//         id: 
//     },{
//         name: '山',
//         itemStyle: {
//             color: 'rgb(34,139,34)'
//         },
//         symbolSize: 30,
//         id: 357
//     },{
//         name: '名胜',
//         itemStyle: {
//             color: 'rgb(34,139,34)'
//         },
//         symbolSize: 30,
//         id: 357
//     },{
//         name: '名楼',
//         itemStyle: {
//             color: 'rgb(34,139,34)'
//         },
//         symbolSize: 30,
//         id: 357
//     },{
//         name: '天气',
//         itemStyle: {
//             color: 'rgb(34,139,34)'
//         },
//         symbolSize: 30,
//         id: 357
//     },{
//         name: '植物',
//         itemStyle: {
//             color: 'rgb(34,139,34)'
//         },
//         symbolSize: 30,
//         id: 357
//     },{
//         name: '基本需求',
//         itemStyle: {
//             color: 'rgb(255,69,0)'
//         },
//         symbolSize: 30,
//         id: 2700
//     },{
//         name: '基本属性',
//         itemStyle: {
//             color: 'rgb(255,69,0)'
//         },
//         symbolSize: 30,
//         id: 2700
//     },{
//         name: '住',
//         itemStyle: {
//             color: 'rgb(255,69,0)'
//         },
//         symbolSize: 30,
//         id: 2700
//     }
// ];
        
class HomeButton extends React.Component {
    state={
        redirect:false,
    }

    handleOrder = () =>{
       this.setState({
           redirect:true
       })
    }

    render(){
        // if(redirect){
        //     return <Redirect to={'/'}/>;
        // }
        return(
            <Tooltip placement="top" title="返回主页面">
                <Link to={{pathname:'/room'}}>
                    <Button icon="home" type="link" onClick={()=>this.handleOrder()}></Button>
                </Link>
            </Tooltip>
        )
    }
}
export default HomeButton;