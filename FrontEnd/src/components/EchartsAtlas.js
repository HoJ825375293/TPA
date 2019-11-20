import React, { Component } from 'react';

var echarts = require('echarts');

class EchartsAtlas extends Component {
    constructor(props){
        super(props)
        this.state={
            timer:0,
            max: 50
        }
        this.timer = null;
        this.Stop = this.Stop.bind(this);
    }

    
    
    Stop(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    componentDidMount(){
        const me = this;
        var myChart = echarts.init(document.getElementById("Atlas"));
        var data = [{
            fixed: true,
            x: myChart.getWidth() / 2,
            y: myChart.getHeight() / 2,
            symbolSize: 20,
            id: '-1'
        }];
        var edges = [];

        
        myChart.setOption({
            series: [{
                type: 'graph',
                layout: 'force',
                animation: false,
                data: data,
                force: {
                    // initLayout: 'circular'
                    // gravity: 0
                    repulsion: 100,
                    edgeLength: 5
                },
                edges: edges
                }]
        })

        this.timer = setInterval(function(){
            me.setState({
                timer:me.state.timer + 1
            })
            if(me.state.timer == me.state.max){
                me.Stop();
            }
            console.log(me.state.timer);
            console.log(me.timer)
            console.log(data);
            console.log(edges);
            
            data.push({
                id: data.length
            });
            var source = Math.round((data.length - 1) * Math.random());
            var target = Math.round((data.length - 1) * Math.random());
            if (source !== target) {
                edges.push({
                    source: source,
                    target: target
                });

                myChart.setOption({
                    series: [{
                        roam: true,
                        data: data,
                        edges: edges
                    }]
                })
            } 
        },500)

        
    };
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render(){
        return (
            <div>
            <div id = "Atlas" style = {{width:600, height:400}}> </div>
            </div>
        );
    }
}

export default EchartsAtlas;