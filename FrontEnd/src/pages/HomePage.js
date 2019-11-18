import React from 'react';
import { Row, Col, Card } from 'antd';
import AccountBar from '../components/AccounBar';
import store from '../store'

const tabListNoTitle = [
  {
    key: 'Hotea',
    tab: 'Hotea',
  },
  {
    key: 'Ticket',
    tab: 'Ticket',
  },
];

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
              <Row style={{ height:100, fontSize:60 }} type="flex" justify="center" align="middle">
                  唐诗图谱
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
