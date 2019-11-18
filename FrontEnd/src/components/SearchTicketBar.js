import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Button, AutoComplete, DatePicker } from 'antd';
import moment from 'moment';
import store from '../store';

const dateFormat = 'YYYY/MM/DD';
const dataSource = ['北京', '上海', '广州'];
class SearchTicketBar extends React.Component {

  state={
    sourceCity:null,
    destinationCity:null,
    travelTime:null,
    transportType:null,
    date:null,
  }

  onChangeSourceLocation = (value)=>{
    console.log(value);
    this.setState({sourceCity:value});
    const action={
      type:"changeSourceCity",
      sourceCity:value
    }
    store.dispatch(action);
  }

  onChangeDestinationLocation = (value)=>{
    console.log(value);
    this.setState({destinationCity:value});
    const action={
      type:"changeDestinationCity",
      destinationCity:value
    }
    store.dispatch(action);
  }

  onChangeTimeRange = (value1, value2)=>{
    console.log(value2);
    //增加date用于记录标准日期，且只有有日期时才进行标准化
    var date = null;
    if(value2 !== null && value2 !== "" && value2 !== undefined)
    date = moment(value2, dateFormat);
    this.setState({
        travelTime:value2,
        date:date
    });
    const action={
        type:"changeTravelTime",
        travelTime:value2,
    }
    store.dispatch(action);
  }

  onChangeTransportType = (value)=>{
    console.log(value);
    this.setState({transportType:value});
    const action={
      type:"changeTransportType",
      transportType:value
    }
    store.dispatch(action);
  }

  componentWillMount(){
      //拿到订票的信息
    const info = store.getState().reserveTicketInfo;
    var date;
    if(info.travelTime !== null && info.travelTime !== "")
    date = moment(info.travelTime, dateFormat);
    this.setState({
        sourceCity:info.sourceCity,
        destinationCity:info.destinationCity,
        travelTime:info.travelTime,
        transportType:info.transportType,
        date:date,
    });
  }
  
  handleSearch = ()=>{
    if(this.props.hasOwnProperty('searchSubmit')){
        let formData = new FormData();
        formData.append("travelTime", this.state.travelTime);
        if(this.state.transportType === "火车票")
        formData.append("transportType", "Train");
        else if(this.state.transportType === "飞机票")
        formData.append("transportType", "Flight");
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
                placeholder="始发地"
                onChange={(value)=>this.onChangeSourceLocation(value)}
                value={this.state.sourceCity}
            />

            <AutoComplete
                style={{ width: 150 }}
                size="large"
                dataSource={dataSource}
                placeholder="目的地"
                onChange={(value)=>this.onChangeDestinationLocation(value)}
                value={this.state.destinationCity}
            />

            <DatePicker  
              style={{ width: 150 }}
              size="large"
              placeholder="出行日期"
              value={this.state.date}
              onChange = {(value1, value2)=>this.onChangeTimeRange(value1, value2)}
            />

            <AutoComplete
              style={{ width: 150}}
              size="large"
              dataSource={["火车票","飞机票"]}
              placeholder="出行方式"
              value={this.state.transportType}
              onChange = {(value)=>this.onChangeTransportType(value)}
            />

            <Link to={{ 
              pathname:'/transportResult',
              state:{fromPath:this.props.path}
            }}>
              <Button size="large" onClick={this.handleSearch}>搜索</Button>
            </Link>
          </div>
        </Row>
    );
  }
}
export default SearchTicketBar;
