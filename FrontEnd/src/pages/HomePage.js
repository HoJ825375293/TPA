import React from 'react';
import { Row, Col, Card } from 'antd';
import EchartsAtlas from '../components/EchartsAtlas';
// import Compre from '../components/Compre';
import AccountBar from '../components/AccounBar';
import store from '../store'

const tabListNoTitle = [
  {
    key: 'Atlas',
    tab: 'Atlas',
  },
  {
    key: 'Other',
    tab: 'Other',
  },
];

const contentListNoTitle = {
  Atlas: <EchartsAtlas path='/'></EchartsAtlas>,
  Other: <div>NOT YET</div>
};
class HomePage extends React.Component {

  state={
    key: 'tab1',
    noTitleKey: 'tab2',
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
        <Row style={{ height:25 }}></Row>
        <div>
        <Row>
          <Col span={3}/>
          <Col span={18} >
              <Row style={{ height:100, fontSize:60 }} type="flex" justify="center" align="middle">
                  Tang Poetry Atlas
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
          <Col span={3}/>
        </Row>
        </div>
      </div>
    );
  }
}
export default HomePage;
