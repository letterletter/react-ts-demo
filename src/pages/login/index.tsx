import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { FormInstance } from 'antd/lib/form';
import { reqLogin, getMenuAndBtnListApi} from '../../api/test'
import { responseObj} from '../../types/response'
import './login.scss'
interface Prop_types extends RouteComponentProps {

}
interface FormValues {
    userMobile: string,
    userPassword: string
}
class LoginForm extends Component<Prop_types, {}> {

    saveRef = React.createRef<FormInstance>();
    formRef = React.createRef<FormInstance>();
    submit = (formvalues:FormValues) => {
        const { userMobile, userPassword } = formvalues
        reqLogin({userMobile, userPassword}).then((res:any) => {
            console.log(res)
            if(res.code === 200) {
                sessionStorage.setItem('token', res.data.token)
                setTimeout(() => {
                    this.props.history.push('/homepage')
                },1000)
            }else {
                message.error(res.data)
            }
        })
    }
    componentDidMount() {
        localStorage.clear()
        sessionStorage.clear()
    }

    render() {
        return (
            <div className='mainPanel' >
                <div className='contentPanel'>
                    <div className='title'>监测数据处理平台</div>
                    <div className='title2'>平台描述</div>
                    <div className='loginbox'>
                        <Form
                            wrapperCol={{ span: '100%' }}
                            ref={this.formRef}
                            onFinish={this.submit}
                        >
                            <Form.Item
                                name="userMobile"
                                rules={[
                                { required: true, message: '请输入' },
                                // { len: 11, pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: "输入有效11位手机号" }
                             ]}
                            >
                                <Input prefix={<UserOutlined
                                    style={{ marginLeft: '-10px', color: "#6a6f77", fontSize: '16px', fontWeight: 700, padding: '2px', }}
                                />} type="text" autoComplete='off' placeholder="请输入手机号码" />
                            </Form.Item>
                            <Form.Item
                                name="userPassword"
                                rules={[{ required: true, message: '请输入' }, { min: 5, message: '长度最小是5' }]}
                            >
                                <Input prefix={<LockOutlined
                                    style={{ marginLeft: '-10px', color: "#6a6f77", fontSize: '16px', fontWeight: 700, padding: '2px', }}
                                />} type="password" placeholder="请输入登录密码" />
                            </Form.Item>
                            <Button className="login-form-button" size='small' htmlType="submit" block   >登录</Button>
                            <Form.Item>
                                <Link className="login-form-newuser" to="/signin" >注册新用户</Link>
                                <Link className="login-form-forgot"  to="/forgetpwd">忘记密码?</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className='footer'>
                    <div className='first-row-sty'>版权所属        监测数据处理平台</div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginForm)