import React, { Component } from 'react';

var echarts = require('echarts');

class EchartsAtlas extends Component {
    Draw(){
        document.getElementById("Atlas").removeAttribute("_echarts_instance_")
        var myChart = echarts.init(document.getElementById("Atlas"));}
    render(){
        return (
            <div>
            <div>{this.Draw()} </div> 
            <div id = "Atlas" style = {{width:500, height:400}}> </div>
            </div>
        );
    }
}

export default EchartsAtlas;