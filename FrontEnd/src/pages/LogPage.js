import React from 'react';
import { Row, Col, Card, Form, Input, Button, message, Icon, Checkbox, notification} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import store from "../store";

const FormItem = Form.Item;
class LogPage extends React.Component {
  state={
    redirect:false,
    username: '',
    password: '',
    remind:'',
    rememberPassword: false,
    fromPath:'/'
  }

  loadAccountInfo=()=>{
    let arr, reg = new RegExp("(^| )"+'accountInfo'+"=([^;]*)(;|$)");
    let accountInfo = '';
    arr = document.cookie.match(reg)
    if(arr){
        accountInfo = unescape(arr[2]);
    }
    else{
        accountInfo = null;
    }
    if(Boolean(accountInfo) === false){
        return false;
    }else{
        let userName = "";
        let passWord = "";
        let Remind = "";
 
        let i = new Array()
        i = accountInfo.split("&");
        userName = i[0];
        passWord = i[1];
        Remind = i[2];
        this.setState({
            username: userName,
            password: passWord,
            remind: Remind
        })
      }
  }

  saveFromPath=()=>{
    if(this.props.location.state != null){
      this.setState({
        fromPath:this.props.location.state.fromPath
      })
    }
  }

  componentWillMount() {
    this.loadAccountInfo();
    this.saveFromPath();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        let formData = new FormData();
        formData.append("telephone",values.username);
        formData.append("passCode",values.password);

        const init = {
            method:'POST',
            body:formData,
          }
          fetch("http://localhost:8080/login",init)
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if(data){
                if(values.remember){
                    let accountInfo = '';
                    if(this.state.remind === '')
                      accountInfo = values.username+ '&' +values.password + '&' + 'true';
                    else accountInfo = values.username+ '&' +values.password + '&' + this.state.remind;
                    let Days = 3;
                    let exp = new Date();
                    exp.setTime(exp.getTime() + Days*24*60*60*1000);
                    document.cookie = 'accountInfo' + "="+ escape(accountInfo) + ";expires=" + exp.toGMTString()
              }
                this.setState({redirect: true});
                message.success(`${userInfo.username}, welcome`);
                }
              else {
                alert('Password error');
              }
            }
          )
        }
     })
  }

  render() {
      const action = {
        type:"user",
        user:1,
        UserName:this.state.username
      }
      if (this.state.redirect) {
        notification['success']({
            message:"欢迎来到Travel Helper",
            duration: 1
        });
        store.dispatch(action);
        this.setState({redirect:false})
        return <Redirect to={this.state.fromPath} />;
      } 
      const {getFieldDecorator} = this.props.form;
      
      return (
        //<div  style={{backgroundImage: `url(${background})`,backgroundSize: 'cover'}}>
        <div>
          <Row style={{height:150}}></Row>
          <Row style={{height:650}}>
            <Col span={8} />
            <Col span={8}>
              <Card title="账户登录" extra={
                  <Link to={{ pathname:this.state.fromPath }}>
                    <Button type="link">返回</Button>
                  </Link>
                } color='black' >
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {
                      getFieldDecorator('username',{
                        initialValue: this.state.username,
                        rules:[
                          {
                            required:true,
                            message:'用户名不能为空'
                          },
                          {
                            min:4,max:20,
                            message:'长度最小为4,最长为20'
                          },
                          {
                            pattern:new RegExp('^\\w+$','g'),
                            message:'用户名必须为有效数字与字符或下划线'
                          }
                        ]
                      })(
                        <Input 
                          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)'}}/>} 
                          placeholder='username:13781111111'
                        ></Input>
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator('password',{
                        initialValue:this.state.password,
                        rules:[
                          {
                            required:true,
                            message:'密码不能为空'
                          },
                        ]
                      })(
                        <Input 
                          prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)'}}/>} 
                          placeholder='password:bupt123456' type='password'
                        ></Input>
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>记住我</Checkbox>
                    )}
                    <Row>
                      <Button type='primary' htmlType="submit" style={{ width: '100%' }}>登录</Button>
                    </Row>
                    <a  href='/'>忘记密码</a>         
                  </FormItem>
                </Form>
              </Card>
            </Col>
          <Col span={8} />
        </Row>
      </div>
    );
  }    
}

export default Form.create()(LogPage);