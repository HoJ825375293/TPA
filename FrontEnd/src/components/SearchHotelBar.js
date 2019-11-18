import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Button, AutoComplete, DatePicker, Col } from 'antd';
import moment from 'moment';
import store from '../store';

const dateFormat = 'YYYY/MM/DD';
const dataSource = ['北京', '上海', '广州'];
const { RangePicker } = DatePicker;
class SearchHotelBar extends React.Component {

  state={
    city:null,
    startTime:null,
    endTime:null,
    numberOfPeople:null,
    date:[]
  }

  onChangeLocation = (value)=>{
    console.log(value);
    this.setState({city:value});
    const action={
      type:"changeCity",
      city:value
    }
    store.dispatch(action);
  }

  onChangeTimeRange = (value1, value2)=>{
    console.log(value2);
    //增加date用于记录标准日期，且只有有日期时才进行标准化
    var date = [null, null];
    if((value2[0] !== null && value2[1] !== null) &&
    (value2[0] !== "" && value2[1] !== "")){
      date = [moment(value2[0], dateFormat), moment(value2[1], dateFormat)];
    }
    this.setState({
      startTime:value2[0], 
      endTime:value2[1],
      date:date
    });
    const action={
      type:"changeTime",
      startTime:value2[0],
      endTime:value2[1],
    }
    store.dispatch(action);
  }

  onChangeNumberOfPeople = (value)=>{
    console.log(value);
    this.setState({numberOfPeople:value});
    const action={
      type:"changePeople",
      numberOfPeople:value
    }
    store.dispatch(action);
  }

  componentWillMount(){
    const info = store.getState().reserveInfo;
    var date = [];
    if((info.startTime !== null && info.endTime !== null) &&
    (info.startTime !== "" && info.endTime !== ""))
    date = [moment(info.startTime, dateFormat), moment(info.endTime, dateFormat)];
    this.setState({
      city:info.city,
      startTime:info.startTime,
      endTime:info.endTime,
      numberOfPeople:info.numberOfPeople,
      date:date
    });
  }

  handleSearch = ()=>{
    if(this.props.hasOwnProperty('searchSubmit')){
        let formData = new FormData();
        formData.append("city",this.state.city);
        formData.append("startTime",this.state.startTime);
        formData.append("endTime",this.state.endTime);
        formData.append("numberOfPeople",this.state.numberOfPeople);
        this.props.searchSubmit(formData);
    }else {
        return ;
    }
  }
  render() {
    return (  
        <Row type="flex" justify="center" align="middle">
          <div>
            <AutoComplete
              style={{ width: 150 }}
              size="large"
              dataSource={dataSource}
              placeholder="目的地"
              onChange={(value)=>this.onChangeLocation(value)}
              value={this.state.city}
            />

            <RangePicker  
              style={{ width: 300 }}
              size="large"
              placeholder={["入住日期", "退房日期"]}
              value={this.state.date}
              onChange = {(value1,value2)=>this.onChangeTimeRange(value1,value2)}
            />

            <AutoComplete
              style={{ width: 150}}
              size="large"
              dataSource={["1","2","3"]}
              placeholder="人数"
              value={this.state.numberOfPeople}
              onChange = {(value)=>this.onChangeNumberOfPeople(value)}
            />

            <Link to={{ 
              pathname:'/hotelResult',
              state:{fromPath:this.props.path}
            }}>
              <Button size="large" onClick={this.handleSearch}>搜索</Button>
            </Link>
          </div>
        </Row>
    );
  }
}
export default SearchHotelBar;
