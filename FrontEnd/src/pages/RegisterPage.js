// import React from 'react';
// import {Form,Input,notification,Select,Row,Col,Button,Card} from 'antd';
// import { Redirect, Link } from 'react-router-dom';

// const { Option } = Select;
  
// class RegisterPage extends React.Component {
//     state = {
//       redirect:false,
//       confirmDirty: false,
//       autoCompleteResult: [],
//       fromPath:'/'
//     };
//     componentWillMount(){
//       if(this.props.location.state != null){
//         this.setState({
//           fromPath:this.props.location.state.fromPath
//         })
//       }
//     }
//     handleSubmit = e => {
//       e.preventDefault();

//       this.props.form.validateFields((err,values)=>{
//         if(!err){
//           console.log('Received values of form: ', values);

//           let formData = new FormData();
//           formData.append("telephone",values.phone);
//           formData.append("passCode",values.password);
//           console.log(values.password);
//           formData.append("name",values.name);

//           const init = {
//               method:'POST',
//               body:formData,
//             }
//           fetch("http://localhost:8080/register",init)
//             .then(res => res.json())
//             .then(data => {
//               console.log(data)
//               if(data){
//                 this.setState({redirect: true});
//               }else{
//                 notification['error']({
//                   message:"已经有人用您的信息注册过了",
//                   duration: 3
//                 });
//               }
//             })
//         }
//       })
//     };
  
//     handleConfirmBlur = e => {
//       const value = e.target.value;
//       this.setState({ confirmDirty: this.state.confirmDirty || !!value });
//     };
  
//     compareToFirstPassword = (rule, value, callback) => {
//       const form = this.props.form;
//       if (value && value !== form.getFieldValue('password')) {
//         callback('与第一次输入的密码不相符!');
//       } else {
//         callback();
//       }
//     };
  
//     validateToNextPassword = (rule, value, callback) => {
//       const form = this.props.form;
//       if (value && this.state.confirmDirty) {
//         form.validateFields(['confirm'], { force: true });
//       }
//       callback();
//     };
  
//     render() {
//       if (this.state.redirect) {
//         notification['success']({
//             message:"注册成功!",
//             duration: 1
//         });
//         this.setState({redirect:false})
//         return <Redirect to={{
//           pathname:'/login',
//           state:{fromPath:this.state.fromPath}
//         }} />;
//       } 
//       const { getFieldDecorator } = this.props.form;
  
//       const formItemLayout = {
//         labelCol: {
//           xs: { span: 24 },
//           sm: { span: 8 },
//         },
//         wrapperCol: {
//           xs: { span: 24 },
//           sm: { span: 16 },
//         },
//       };
//       const tailFormItemLayout = {
//         wrapperCol: {
//           xs: {
//             span: 24,
//             offset: 0,
//           },
//           sm: {
//             span: 16,
//             offset: 8,
//           },
//         },
//       };
//       const prefixSelector = getFieldDecorator('prefix', {
//         initialValue: '86',
//       })(
//         <Select style={{ width: 70 }}>
//           <Option value="86">+86</Option>
//           <Option value="87">+87</Option>
//         </Select>,
//       );
  
//       return (
//         // <div  style={{backgroundImage: `url(${background})`,backgroundSize: 'cover'}}>
//        <div>
//         <Row style={{height:80}}></Row>
//         <Row style={{height:680}}>
//           <Col span={6}/>
//           <Col span={14}>
//           <Card size="big" title="注册信息" extra={
//                 <Link to={{ pathname:this.state.fromPath }}>
//                   <Button type="link">返回</Button>
//                 </Link>}
//               bodyStyle={{paddingRight:120}} style={{ width:700}}>
//           <Form {...formItemLayout} onSubmit={this.handleSubmit}>
//             <Form.Item label="电话号码" >
//               {getFieldDecorator('phone', {
//                 rules: [{ required: true, message: '请输入您的电话号码!' }],
//               })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
//             </Form.Item>
//             <Form.Item label="密码" hasFeedback>
//               {getFieldDecorator('password', {
//                 rules: [
//                   {
//                     required: true,
//                     message: '输入您的密码!',
//                   },
//                   {
//                     validator: this.validateToNextPassword,
//                   },
//                 ],
//               })(<Input.Password />)}
//             </Form.Item>
//             <Form.Item label="确认密码" hasFeedback>
//               {getFieldDecorator('confirm', {
//                 rules: [
//                   {
//                     required: true,
//                     message: '请确认您的密码!',
//                   },
//                   {
//                     validator: this.compareToFirstPassword,
//                   },
//                 ],
//               })(<Input.Password onBlur={this.handleConfirmBlur} />)}
//             </Form.Item>
//             <Form.Item  label="姓名" hasFeedback>
//               {getFieldDecorator('name', {
//                 rules: [{ required: true, message: '输入您的姓名!', whitespace: true }],
//               })(<Input />)}
//             </Form.Item>
            
//             <Form.Item {...tailFormItemLayout}>
//               <Button type="primary" htmlType="submit">
//                 注册
//               </Button>
//             </Form.Item>
//           </Form>
//           </Card>
//           </Col>
//           <Col span={4}/>
//         </Row>
//         <Row span={4}/>
//         </div>
//       );
//     }
// }

// export default Form.create()(RegisterPage)