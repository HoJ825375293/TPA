import React from 'react';
import { Row, Col, Card } from 'antd';
import EchartsAtlas from '../components/EchartsAtlas';
// import Compre from '../components/Compre';
// import AccountBar from '../components/AccounBar';
// import store from '../store'

const tabList = [
  {
    key: '图谱',
    tab: '图谱',
  },
  {
    key: '统计',
    tab: '统计',
  },
];

const contentList = {
  图谱: <EchartsAtlas path='/'></EchartsAtlas>,
  统计: <div>NOT YET</div>
};

class HomePage extends React.Component {

  state={
    Key: '图谱'
  }

  onTabChange = (key) => {
    this.setState({ Key: key });
  };

  render() {
    return (  
      <div>
        {/* <Row style={{ height:50 }}>
          <Col span={19}/>
          <Col span={5} style={{paddingLeft:50, paddingTop:20}}>
            <AccountBar path='/'/>
          </Col>
        </Row> */}
        {/* <Row style={{ height:15 }}></Row> */}
        
        <Row>
          <Col span={1}/>
          <Col span={22} >
              <Row style={{ height:10 }}></Row>
              <Card
                style={{ width: '100%'}}
                title="古诗词图谱"
                tabList={tabList}
                headStyle = {{fontSize:'25px'}}
                activeTabKey={this.state.Key}
                onTabChange={key => {
                  this.onTabChange(key);
                }}
              >
                {contentList[this.state.Key]}
              </Card>
          </Col>
          <Col span={1}/>
        </Row>
        
      </div>
    );
  }
}
export default HomePage;
