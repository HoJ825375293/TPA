import React from 'react';
import { Row, Col, Card } from 'antd';
import EchartsAtlas from '../components/EchartsAtlas';
import background from './BGP.jpg'
import StatCharts from '../components/StatCharts'

//主页面 主要组件为card


//card 跳转内容两个
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

//渲染的card内两个内容，分别以两个组件整合
const contentList = {
  图谱: <EchartsAtlas></EchartsAtlas>,  //节点图
  统计: <StatCharts></StatCharts>       //统计图
};

class HomePage extends React.Component {

  state={ //一开始显示的card
    Key: '图谱'
  }

  onTabChange = (key) => {
    this.setState({ Key: key });
  };

  render() {
    return (  
      <div style={{height:1000, width: '100%',
        backgroundImage: `url(${background})`,backgroundSize: 'cover'}}>
        {/* <Row style={{ height:50 }}>
          <Col span={19}/>
          <Col span={5} style={{paddingLeft:50, paddingTop:20}}>
            <AccountBar path='/'/>
          </Col>
        </Row> */}
        {/* <Row style={{ height:15 }}></Row> */}
        <div>
        <Row>
          <Col span={1}/>
          <Col span={22} >
              <Row style={{ height:10 }}></Row>
              <Card
                style={{ width: '100%'}}
                title="古诗词图谱"
                tabList={tabList}
                headStyle = {{fontSize:'25px'}}
                bodyStyle = {{}}
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
      </div>
    );
  }
}
export default HomePage;
