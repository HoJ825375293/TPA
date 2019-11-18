import React, { Fragment } from 'react';
import { Card, Button, Spin, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import store from "../store";
import AccountBar from '../components/AccounBar';
import SearchHotelBar from '../components/SearchHotelBar';

class HotelResultPage extends React.Component {
    state={
        loading:true,
    }
    //拿到搜索的酒店列表
    componentWillMount(){
        var data = store.getState().reserveInfo;
        if(data.city !== null){
            let formData = new FormData();
            formData.append("city",data.city);
            formData.append("startTime",data.startTime);
            formData.append("endTime",data.endTime);
            formData.append("numberOfPeople",data.numberOfPeople);
            this.query(formData)
        }
    }

    query=(formData)=>{
        const init = {
            method:'POST',
            body:formData,
        }
        fetch("http://localhost:8080/hotelQuery",init)
        .then(res => res.json())
        .then(data => {
            this.setState({
                hotelList:data,
                loading:false
            })
            console.log(data)
        })
    }

    handleSubmitHotel(item){
        const action={
            type:"HotelPage",
            hotelItem:item,
        }
        store.dispatch(action);
    }

    //判断搜索信息是否充足
    isInfoComplete=()=>{
        if(this.state.hotelList === undefined){
            message.error("您需要选择更多的信息来搜索!",1.5);
            return ;
        }
        return (
            <Fragment>       
                {this.state.hotelList.map(
                    (item, index)=>{
                        return (
                            <div>
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={23}>
                                        <Link to="/roomResult">
                                        <Button  onClick={this.handleSubmitHotel.bind(this, item)} style={{height:100,width:1000}}>
        
                                            <Row>
                                                <Col span={7} style={{fontSize:30}}>{item.hotelName}</Col>
                                                <Col span={12}></Col>
                                                <Col span={5} style={{fontSize:20}}>电话号码：{item.phoneNumber}</Col>
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
                            <SearchHotelBar searchSubmit={this.query} path='/hotelResult'></SearchHotelBar>
                        </Col>
                        <Col span={5}/>
                        <Col span={6}>
                            <AccountBar path='/hotelResult'/>
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
export default HotelResultPage;