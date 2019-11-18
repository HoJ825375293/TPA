import React, { Component, Fragment } from 'react';
import { Button, message, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import store from "../store";
class AccountBar extends Component {
    state={
        mode: 1,
        UserName:"null"
    }
    //判断是否登陆的函数
    handleStoreChange = () =>{
        const StoreState = store.getState();
        if(StoreState.user === 1){
            this.setState({
                mode:2,
                UserName:StoreState.UserName
            })
        }
        else{
            this.setState({
                mode:1,
            })
        }
    }

    componentWillMount(){
        this.handleStoreChange();
    }
    //登出时调用函数
    handleOut = () =>{
        const action={
            type:"user",
            user:0
        }
        store.dispatch(action);
        message.success("成功退出账户!")
        this.handleStoreChange();
    }
    //判断是否登陆，进而返回不同的组件
    isLogin=()=>{
        const userName = this.state.UserName.substring(0,1);
        const modeType = this.state.mode;
        if(modeType === 1){
            return (
                <Fragment>
                    <Link to={{pathname:'/login', state:{fromPath:this.props.path}}} 
                        style={{paddingRight:5}}
                    >
                    <Button icon="user" size="large" type="link" style={{color:"#000000"}}>登录</Button>
                    </Link>
                    <Link to={{pathname:'/register', state:{fromPath:this.props.path}}}>
                    <Button icon="user-add" size="large" type="link" style={{color:"#000000"}}>注册</Button>
                    </Link>
                </Fragment>
            );
        }
        else if(modeType === 2){
            return (
                <Fragment>
                    <Avatar size="large" style={{ color: '#FFFFFF', backgroundColor: '#87d068' }}>{userName}</Avatar>
                    <Button icon="user-delete" size="large" type="link"
                        onClick={()=>this.handleOut()}style={{color:"#000000"}}>
                        退出
                    </Button>
                </Fragment>
            );
        }
    }

    render(){
        return (
            <Fragment>
                {this.isLogin()}  
            </Fragment>   
        );
    }
}

export default AccountBar;