import React from 'react';
import { Row, Col, Card } from 'antd';
import EchartsAtlas from '../components/EchartsAtlas';
// import Compre from '../components/Compre';
// import AccountBar from '../components/AccounBar';
// import store from '../store'

const tabList = [
  {
    key: 'Atlas',
    tab: 'Atlas',
  },
  {
    key: 'Statistic',
    tab: 'Statistic',
  },
];

const contentList = {
  Atlas: <EchartsAtlas path='/'></EchartsAtlas>,
  Statistic: <div>NOT YET</div>
};

class HomePage extends React.Component {

  state={
    Key: 'Atlas'
  }

  onTabChange = (key) => {
    this.setState({ Key: key });
    // const action={
    //   type:"changeHomePageBar",
    //   key:key,
    // }
    // store.dispatch(action);
  };

  // componentWillMount(){
  //   var data = store.getState();
  //   if(data.homePageKey !== null)
  //   this.setState({ noTitleKey: data.homePageKey });
  // }

  render() {
    return (  
      <div>
        {/* <Row style={{ height:50 }}>
          <Col span={19}/>
          <Col span={5} style={{paddingLeft:50, paddingTop:20}}>
            <AccountBar path='/'/>
          </Col>
        </Row> */}
        <Row style={{ height:25 }}></Row>
        
        <Row>
          <Col span={2}/>
          <Col span={20} >
              <Row style={{ height:75, fontSize:55 }} type="flex" justify="center" align="middle">
                  Tang Poetry Atlas
              </Row>
              <Row style={{ height:25 }}></Row>
              <Card
                style={{ width: '100%'}}
                tabList={tabList}
                activeTabKey={this.state.Key}
                onTabChange={key => {
                  this.onTabChange(key);
                }}
              >
                {contentList[this.state.Key]}
              </Card>
          </Col>
          <Col span={2}/>
        </Row>
        
      </div>
    );
  }
}
export default HomePage;
