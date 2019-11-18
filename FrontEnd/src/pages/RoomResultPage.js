import React, { Fragment } from 'react';
import { Card, Button, Spin, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import store from "../store";
// import background from './SearchBarBgp.jpg'
import AccountBar from '../components/AccounBar';
import SearchHotelBar from '../components/SearchHotelBar';

class RoomResultPage extends React.Component {
    state={
        loading:true,
    }
    //拿到搜索的房间列表
    componentWillMount(){
        var data = store.getState().reserveInfo;
        var hotel = store.getState().hotelItem;
        if(data.city !== null){
            let formData = new FormData();
            formData.append("hotelId", hotel.hotelId);
            formData.append("startTime", data.startTime);
            formData.append("endTime", data.endTime);
            formData.append("numberOfPeople", data.numberOfPeople);
            this.query(formData)
        }
    }

    query=(formData)=>{
        const init = {
            method:'POST',
            body:formData,
        }
        fetch("http://localhost:8080/roomQuery",init)
        .then(res => res.json())
        .then(data => {
            this.setState({
                roomList:data,
                loading:false
            })
            console.log(this.state.roomList)
        })
    }

    handleSubmitRoom(item){
        const action={
            type:"RoomPage",
            roomItem:item,
        }
        store.dispatch(action);
    }

    //判断搜索信息是否充足
    isInfoComplete=()=>{
        if(this.state.roomList === undefined){
            message.error("您需要选择更多的信息来搜索!",1.5);
            return ;
        }
        return (
            <Fragment>
                {this.state.roomList.map(
                    (item, index)=>{
                        return (
                            <div>
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={23}>
                                        <Link to='/room'>
                                        <Button  onClick={this.handleSubmitRoom.bind(this, item)} style={{height:100,width:1000}}>
                                            <Row>
                                                <Col span={7} style={{fontSize:30}}>{item.roomType}</Col>
                                                <Col span={12}></Col>
                                                <Col span={5} style={{fontSize:20}}>价格：{item.costPerNight}元/晚</Col>
                                            </Row>
                                        </Button>
                                        </Link>
                                    </Col>
                                </Row>

                                <Row style={{height:15}}>
                                </Row>
                                
                            </div>
                           
                        )
                    }
                )}
            </Fragment>
        );
    }

    render(){
        if(this.state.loading){
            return (<div>
                <Row style={{height:300}}></Row>
                <Row>
                    <Col span={12}></Col>
                    <Spin size="large"/>
                </Row>
            </div>)
        }else{
            return(
                //<div style={{backgroundImage: `url(${background})`,backgroundSize: 'cover'}}>
                <div>
                    <Row style={{height:20}}></Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={12} >
                            <SearchHotelBar path='/roomResult' searchSubmit={this.query}></SearchHotelBar>
                        </Col>
                        <Col span={5}/>
                        <Col span={6}>
                            <AccountBar path='/roomResult'/>
                            <Link to='/'>
                            <Button icon="left-square" size="large" type="link" style={{color:"#000000"}}>返回主页</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row style={{height:40}}></Row>
                    {this.isInfoComplete()}
                    <Row style={{height:500}}/>
                </div>
            )
        }
    }
}
export default RoomResultPage;