import React from 'react';
import { Button, Tooltip } from 'antd';
import { Redirect, Link } from 'react-router-dom';


class HomeButton extends React.Component {
    state={
        redirect:false,
    }

    handleOrder = () =>{
       this.setState({
           redirect:true
       })
    }

    render(){
        // if(redirect){
        //     return <Redirect to={'/'}/>;
        // }
        return(
            <Tooltip placement="top" title="返回主页面">
                <Link to={{pathname:'/room'}}>
                    <Button icon="home" type="link" onClick={()=>this.handleOrder()}></Button>
                </Link>
            </Tooltip>
        )
    }
}
export default HomeButton;