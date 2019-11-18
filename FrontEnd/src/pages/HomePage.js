import React from 'react';
import { Row, Col, Card } from 'antd';
import SearchHotelBar from '../components/SearchHotelBar';
import SearchTicketBar from '../components/SearchTicketBar';
import AccountBar from '../components/AccounBar';
import store from '../store'
/**
 * 默认主页面，包含AccoutBar,SearchBar,并将自身路由传递过去
 */

const tabListNoTitle = [
  {
    key: 'Hotel',
    tab: 'Hotel',
  },
  {
    key: 'Ticket',
    tab: 'Ticket',
  },
];

const contentListNoTitle = {
  Hotel: <SearchHotelBar path='/'></SearchHotelBar>,
  Ticket: <SearchTicketBar path='/'></SearchTicketBar>
};
class HomePage extends React.Component {

  state={
    key: 'tab1',
    noTitleKey: 'Hotel',
  }

  onTabChange = (key) => {
    this.setState({ noTitleKey: key });
    const action={
      type:"changeHomePageBar",
      key:key,
    }
    store.dispatch(action);
  };

  componentWillMount(){
    var data = store.getState();
    if(data.homePageKey !== null)
    this.setState({ noTitleKey: data.homePageKey });
  }

  render() {
    return (  
      <div>
        <Row style={{ height:50 }}>
          <Col span={19}/>
          <Col span={5} style={{paddingLeft:50, paddingTop:20}}>
            <AccountBar path='/'/>
          </Col>
        </Row>
        <Row style={{ height:20 }}></Row>
        <div>
        <Row>
          <Col span={5}/>
          <Col span={14} >
              <Row style={{ height:150 }}></Row>
              <Row style={{ height:100, fontSize:60 }} type="flex" justify="center" align="middle">
                  Travel Helper
              </Row>
              <Row style={{ height:50 }}></Row>
              <Card
                style={{ width: '100%'}}
                tabList={tabListNoTitle}
                activeTabKey={this.state.noTitleKey}
                onTabChange={key => {
                  this.onTabChange(key);
                }}
              >
                {contentListNoTitle[this.state.noTitleKey]}
              </Card>
          </Col>
          <Col span={5}/>
        </Row>
        <Row style={{ height:450 }}/>  
        </div>
      </div>
    );
  }
}
export default HomePage;
