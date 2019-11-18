import React, { Fragment } from 'react';
import { Card, Button, Spin, Row, Col, message, notification } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import store from "../store";
import AccountBar from '../components/AccounBar';
import SearchTicketBar from '../components/SearchTicketBar';

class TransportResultPage extends React.Component {
    state={
        loading:true,
        fromPath:'/',
        willJump:false,
    }
    //拿到符合条件的列车/飞机列表
    componentWillMount(){
        this.queryTransport();
        if(this.props.location.state != null){
            this.setState({
                fromPath:this.props.location.state.fromPath
            })
        }
    }

    queryTransport=()=>{
        var data = store.getState().reserveTicketInfo;
        console.log(data)
        if(data.sourceCity !== null && data.destinationCity !== null){
            let formData = new FormData();
            formData.append("travelTime", data.travelTime);
            if(data.transportType === "火车票")
            formData.append("transportType", "Train");
            else if(data.transportType === "飞机票")
            formData.append("transportType", "Flight");      
            this.query(formData);
        }
    }

    query=(formData)=>{
        const init = {
            method:'POST',
            body:formData,
        }
        fetch("http://localhost:8080/queryTicket",init)
        .then(res => res.json())
        .then(data => {
            this.setState({
                transportList:data,
                loading:false
            })
        })
    }

    handleSubmitTicket(item){
        const StoreState = store.getState();
        if(StoreState.user === 0){
          this.setState({willJump:true})
          return ;
        }
        let formData = new FormData();
        formData.append("startTime",item.departureTime);
        formData.append("endTime",item.arrivalTime);
        formData.append("telephone",StoreState.UserName);
        formData.append("transportType",item.transportType);
        formData.append("transportId",item.transportId);
         
        const init = {
            method:'POST',
            body:formData,
        }
        fetch("http://localhost:8080/ticketOrder", init)
        .then(res => res.json())
        .then(data => {
            if(data){
                notification['success']({
                    message:"购买成功!",
                    duration: 2
                });
            }else{
                notification['error']({
                    message:"购买失败!房间已满",
                    duration: 2
                });
            }
            this.queryTransport();
        })
    }

    //判断搜索信息是否充足
    isInfoComplete=()=>{
        if(this.state.transportList === undefined){
            message.error("您需要选择更多的信息来搜索!",1.5);
            return ;
        }
        console.log(this.state.transportList);
        return (
            <Fragment>
                {this.state.transportList.map(
                    (item, index)=>{
                        return (
                            <Row>
                                <Col span={1}></Col>
                                <Col span={16}>
                                    <Card style={{ width: "100%" }} activeTabKey={index}>
                                        <Row>
                                            <Col span={3}>{item.transportId}</Col>
                                            <Col span={6}>{item.departureTime}</Col>
                                            <Col span={6}>{item.arrivalTime}</Col>
                                            <Col span={3}>{item.transportType}</Col>
                                            <Col span={3}>{item.costPerTravel}</Col>
                                            <Col span={3}><Button onClick={this.handleSubmitTicket.bind(this, item)}>购买</Button></Col>
                                        </Row>
                                    </Card>
                                </Col>
                                <Col span={7}></Col>
                            </Row>
                        )
                    }
                )}
            </Fragment>
        );
    }

    render(){
        if(this.state.willJump){
            return <Redirect to={{
              pathname:'/login',
              state:{fromPath:'/transportResult'}
            }}></Redirect>
        }
        else if(this.state.loading){
            return (
                <div>
                    <Row style={{height:300}}></Row>
                    <Row>
                        <Col span={12}></Col>
                        <Spin size="large"/>
                    </Row>
                </div>
            )
            
        }else{
            return(
                <div>
                    <Row style={{height:20}}></Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={12} >
                            <SearchTicketBar path='/transportResult' searchSubmit={this.query}></SearchTicketBar>
                        </Col>
                        <Col span={5}/>
                        <Col span={6}>
                            <AccountBar path='/transportResult'/>
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
export default TransportResultPage;