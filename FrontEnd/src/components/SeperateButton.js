import React from 'react';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import store from "../store";

class SeperateButton extends React.Component {

    handleOrder = () =>{
        const action ={
            type:"RoomPage",
            item:this.props.item
        }
        store.dispatch(action);
    }

    render(){
        return(
            <Tooltip placement="top" title="点击来查看具体信息">
                <Link to={{pathname:'/room'}}>
                    <Button icon="edit" type="link" onClick={()=>this.handleOrder()}>Travel安居</Button>
                </Link>
            </Tooltip>
        )
    }
}
export default SeperateButton;