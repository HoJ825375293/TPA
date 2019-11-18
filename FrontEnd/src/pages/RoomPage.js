import React from 'react';
import { Form, Icon, notification, Row, Col, Button, Card, DatePicker, AutoComplete } from 'antd';
import { Link, Redirect } from 'react-router-dom';
// import room1 from './SingelPeo.jpg';
import AccountBar from '../components/AccounBar';
import store from '../store';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
class RegisterPage extends React.Component {
    state={
      startTime:null,
      endTime:null,
      numberOfPeople:null,
      willJump:false,
      date:[],
      roomPage:false,
    }

    componentWillMount(){
      const StoreState = store.getState().reserveInfo;
      var date = [];
      if((StoreState.startTime !== null && StoreState.endTime !== null) &&
      (StoreState.startTime !== "" && StoreState.endTime !== ""))
      date = [moment(StoreState.startTime, dateFormat), moment(StoreState.endTime, dateFormat)];
      this.setState({
        willJump:false,
        startTime:StoreState.startTime,
        endTime:StoreState.endTime,
        numberOfPeople:StoreState.numberOfPeople,
        date:date
      })
    }

    handleSubmit = e => {
      const StoreState = store.getState();
      if(StoreState.user === 0){
        this.setState({willJump:true})
        return ;
      }
      e.preventDefault();
      this.props.form.validateFields((err)=>{
        if(!err){
          let formData = new FormData();
          formData.append("startTime",this.state.startTime);
          formData.append("endTime",this.state.endTime);
          formData.append("numberOfPeople",this.state.numberOfPeople);
          formData.append("roomId",StoreState.roomItem.roomId);
          formData.append("hotelId",StoreState.roomItem.hotelId);
          formData.append("telephone",StoreState.UserName);

          const init = {
              method:'POST',
              body:formData,
            }
          fetch("http://localhost:8080/order",init)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if(data){
              notification['success']({
                message:"预约成功!",
                duration: 2
              });
              this.setState({roomPage:true});
            }else{
              notification['error']({
                message:"预约失败!房间已满",
                duration: 2
              });
            }
          })
        }
      })
    }; 

    onChangeTimeRange = (dates, dateString) =>{
      this.setState({
        startTime:dateString[0],
        endTime:dateString[1],
        date:[moment(dateString[0], dateFormat), moment(dateString[1], dateFormat)]
      })
    }

    onChangePeo = (value) => {
      this.setState({
        numberOfPeople:value
      })
    }

    render(){
      if(this.state.willJump){
        return <Redirect to={{
          pathname:'/login',
          state:{fromPath:'/room'}
        }}></Redirect>
      }
      if(this.state.roomPage){
        return <Redirect to='/roomResult'></Redirect>
      }
      const StoreState = store.getState();
      let Item, PeoCont;
      Item = StoreState.roomItem;

      if(Item.roomType === "家庭房"){
        PeoCont = 3;
      }else if(Item.roomType === "大床房"){
        PeoCont = 1;
      }else{
        PeoCont = 2;
      }
      const { getFieldDecorator } = this.props.form;
      return (
        // <div style={{backgroundImage: `url(${room1})`,backgroundSize: 'cover'}}>
        <div>
          <Row style={{ height:50 }}>
            <Col span={18} />
            <Col span={6} style={{marginTop:30}}>
              <AccountBar path='/room'/>
              <Link to='/'>
              <Button icon="left-square" size="large" type="link" style={{ color:"#000000" }}>返回主页</Button>
              </Link>
            </Col>
          </Row>

          <Row style={{ height:600 }}>
            <Col span={3}/>
            <Col span={7}>
              <Row style={{ height:80 }}/>
              <Row style={{ height:250 }}>
                  <span style={{fontSize:75}}>{Item.roomType}</span>
              </Row>
              <Row style={{ height:20 }}/>
              <Row style={{ height:200 }}>
                <Icon type="usergroup-add" style={{fontSize:50}}/><span style={{fontSize:30}}>{PeoCont}</span>
                <Icon type="money-collect" style={{fontSize:50,marginLeft:40}}/><span style={{fontSize:30}}>{Item.costPerNight}</span>
              </Row>
            </Col>
            <Col span={6}/>
            <Col span={6}>
              <div style={{marginTop:75}}>
                <Card title="房间预定" color='black'>
                  <Form onSubmit={this.handleSubmit} className="room-form">
                    <FormItem label="日期">
                      {
                        getFieldDecorator('RandTime', {
                          rules: [{ required: true, message: '请选择入宿时间段' }],
                          initialValue: this.state.date
                        })
                        (<RangePicker 
                          size="large"
                          placeholder={["入住日期","退房日期"]}
                          onChange = {(value1,value2)=>this.onChangeTimeRange(value1,value2)}
                          />
                        )
                      }
                    </FormItem>
                    <FormItem label="人数">
                      {
                        getFieldDecorator('PeoCont', {
                          rules: [{ required: true, message: '请选择入宿人数' }],
                          initialValue: this.state.numberOfPeople
                        })
                        (
                          <AutoComplete
                            size="large"
                            dataSource={["1人","2人","3人"]}
                            placeholder="人数"
                            onChange = {(value)=>this.onChangePeo(value)}
                          />
                        )
                      }
                    </FormItem>
                    <FormItem>
                      <Row>
                        <Button type="danger" htmlType="submit" style={{ width: '100%' }}>确认预约</Button>
                      </Row>
                    </FormItem>
                  </Form>
                </Card>
              </div>
            </Col>
            <Col span={2}/>
          </Row>
        </div>
      );
    }
}

export default Form.create()(RegisterPage)