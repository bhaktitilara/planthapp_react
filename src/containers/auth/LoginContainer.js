import React from 'react';
import {Form, Input, Button, Space, Card} from 'antd';
import axios from "axios";
import { Route, useHistory } from 'react-router-dom'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";

const LoginContainer = props => {
    const history = useHistory()

    const onFinish = async (values) => {
        // let formData = new FormData()
        // formData.append('email', values.email)
        // formData.append('password', values.password)
        // const result = await axios.post('http://139.59.232.38:3300/login', formData)
        // const {id} = result.data;

        // if (id) {
        //     localStorage.setItem('currentUser', JSON.stringify(result.data))
        //     history.push('/')
        // }

        var config = {
            method: 'get',
            url: 'https://api.airtable.com/v0/appBaILYQNEF52Azn/user',
            headers: {
                'Authorization': 'Bearer key3f6b1OpzYzfguf',
                'Cookie': 'brw=brwbbgY5vbRNYIm6d'
            }
        };

        const records = await (await (axios.request(config))).data.records.map(e => {
            const obj = e.fields
            obj.dbId = e.id
            return obj
        })

        console.log(records)

        for (const record of records) {
            console.log(record, record.email, record.password, values.email, values.password)
            if (record.email === values.email && record.password === values.password) {
                localStorage.setItem('currentUser', JSON.stringify(record))
                history.push('/')
            }
        }
    };

    return (
        <Route>
            <Row>
                <Col span={8} offset={8} style={{paddingTop: 150}}>
                    <Card title={'Planthapp'}>
                        <Form
                            name="login"
                            labelAlign="left"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{required: true, message: 'Please input your email!'}]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Route>
    );
  };

export default LoginContainer;
