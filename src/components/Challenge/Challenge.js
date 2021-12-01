import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
import './Challenge.scss'
import {Col, Divider, InputNumber, message, Pagination, Row} from "antd";
import Button from "antd/es/button";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import Form from "antd/es/form/Form";
import Input from "antd/es/input";
import Select from "antd/es/select";
import DatePicker from "antd/es/date-picker";
import moment from "moment"
import Upload from "antd/es/upload";
import {UploadOutlined} from '@ant-design/icons';
import {nullOrUndefined} from '../../config/function';
import {BASE_URL_IMG} from "../../config/const";

const Challenge = props => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const [users, setUsers] = useState([])

    const [badges, setBadges] = useState([])

    const [fileList, setFileList] = useState([])

    const [challenges, setChallenges] = useState([])

    const [isAcceptChallengeVisible, setIsAcceptChallengeVisible] = useState(false)

    const [challenge, setChallenge] = useState(null)

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleOk2 = () => {
        setIsModalVisible2(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const getUsers = async () => {
        var config = {
            method: 'get',
            url: 'https://api.airtable.com/v0/appBaILYQNEF52Azn/user',
            headers: {
              'Authorization': 'Bearer key3f6b1OpzYzfguf',
              'Cookie': 'brw=brwbbgY5vbRNYIm6d'
            }
        };
        const response = await (await axios.request(config))?.data?.records ?? []
        const data = response.map(e => ({...e.fields, dbId: e.id}))
        setUsers(data)
    }

    const getBadges = async () => {
        var config = {
            method: 'get',
            url: 'https://api.airtable.com/v0/appBaILYQNEF52Azn/badges',
            headers: { 
              'Authorization': 'Bearer key3f6b1OpzYzfguf', 
              'Cookie': 'brw=brwHK40Jz3N3pbBwP'
            }
        };
        const response = await (await axios.request(config))?.data?.records ?? []
        const data = response.map(e => ({...e.fields, dbId: e.id, avatar: e.fields.avatar[0].url}))
        setBadges(data)
    }

    const getChallenges = async () => {
        var config = {
            method: 'get',
            url: 'https://api.airtable.com/v0/appBaILYQNEF52Azn/challenges',
            headers: { 
                'Authorization': 'Bearer key3f6b1OpzYzfguf'
            }
        };
        const response = await (await axios.request(config))?.data?.records ?? []
        const data = response.map(e => ({...e.fields, dbId: e.id, avatar: e.fields.avatar[0].url}))
        console.log(data)
        setChallenges(data)
    }

    useEffect(() => {
        getUsers()
        getBadges()
        getChallenges()
    }, [])

    const onFinish = async (data) => {
        const {badge_id, title, harvest_point, description, date} = data
        if (nullOrUndefined([badge_id, title, harvest_point, description, date]) || fileList.length === 0 || date.length < 2) {
            setIsModalVisible(false)
            return;
        }

        let formImage = new FormData()
        formImage.append('avatar', fileList[0])
        const fileName = await (await axios.post('http://139.59.232.38:3300/image', formImage)).data.fileName

        var data = JSON.stringify({
            "records": [
              {
                "fields": {
                  "title": title,
                  "avatar": [
                    {
                      "url": `${BASE_URL_IMG}/${fileName}`
                    }
                  ],
                  "created_by": [currentUser.dbId],
                  "start_at": moment(date[0]).format('MM-DD-YYYY'),
                  "end_at": moment(date[1]).format('MM-DD-YYYY'),
                  "harvest_point": harvest_point,
                  "description": description,
                  "created_at": moment().format('MM-DD-YYYY'),
                  "badge_id": [badge_id]
                }
              }
            ]
        });
        
        var config = {
            method: 'post',
            url: 'https://api.airtable.com/v0/appBaILYQNEF52Azn/challenges',
            headers: { 
                'Authorization': 'Bearer key3f6b1OpzYzfguf', 
                'Content-Type': 'application/json'
            },
            data : data
        };

        const response = await (await axios.request(config))?.data?.records ?? []
        const formatted = response.map(e => ({...e.fields, dbId: e.id, avatar: e.fields.avatar[0].url}))
        setIsModalVisible(false)
        message.success('Create successfully.');
        setChallenges([...formatted, ...challenges])
    }

    const propFiles = {
        beforeUpload: file => {
            setFileList([file])
            return false;
        },
        fileList,
    };

    const showAcceptChallenge = (value) => {
        setIsAcceptChallengeVisible(true)
        setChallenge(value)
    }

    const onAcceptChallenge = async (payload) => {
        var payload = JSON.stringify({
            "records": [
              {
                "fields": {
                  "challenge_id": [challenge.dbId],
                  "user_id": [currentUser.dbId],
                  "created_at": moment().format('MM-DD-YYYY')
                }
              }
            ]
        });
        
        var config = {
        method: 'post',
        url: 'https://api.airtable.com/v0/appBaILYQNEF52Azn/challenge_user',
        headers: { 
            'Authorization': 'Bearer key3f6b1OpzYzfguf', 
            'Content-Type': 'application/json'
        },
        data : payload
        };

        const response = await (await axios.request(config))?.data?.records ?? []
        // const data = response.map(e => ({...e.fields, dbId: e.id, avatar: e.fields.avatar[0].url}))
        console.log(response)

        setIsAcceptChallengeVisible(false)
        setIsModalVisible2(true)
        message.success('AcceptChallenge Successfully')
    }

    const onHideChallenge = () => {
        setIsAcceptChallengeVisible(false)
        setChallenge(null)
    }

    const onChallengeOtherUser = async (payload) => {
        var payload = JSON.stringify({
            "records": [
              {
                "fields": {
                  "challenge_id": [challenge.dbId],
                  "user_id": [payload.user_id],
                  "challenger_id": [currentUser.dbId],
                  "created_at": moment().format('MM-DD-YYYY')
                }
              }
            ]
        });
        
        var config = {
        method: 'post',
        url: 'https://api.airtable.com/v0/appBaILYQNEF52Azn/challenge_user',
        headers: { 
            'Authorization': 'Bearer key3f6b1OpzYzfguf', 
            'Content-Type': 'application/json'
        },
        data : payload
        };

        const response = await (await axios.request(config))?.data?.records ?? []
        // const data = response.map(e => ({...e.fields, dbId: e.id, avatar: e.fields.avatar[0].url}))
        console.log(response)

        setIsAcceptChallengeVisible(false)
        setIsModalVisible2(true)
        message.success('Challenge Successfully')
    }

    const onFinishTrick = () => {
        setIsModalVisible2(false)
    }

    return (
        <div className="challenge-wrapper challenge">
            <div className="challenge--title mb-4">
                Challenges
            </div>
            
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Button className="basic-button" onClick={showModal}>
                        Add Challenge
                    </Button>
                    <Modal title="Add challenge" visible={isModalVisible} footer={null} onOk={handleOk}
                           onCancel={handleCancel}>
                        <Form
                            labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                            onFinish={onFinish}
                        >
                            <Form.Item label={"Avatar"} name={"avatar"}>
                                <Upload {...propFiles}>
                                    <Button icon={<UploadOutlined/>}>Select File</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label="Title" name={"title"} rule={[
                                {
                                    required: true
                                }
                            ]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Description" name={"description"}>
                                <Input.TextArea/>
                            </Form.Item>
                            <Form.Item label="Point" name={"harvest_point"}>
                                <InputNumber style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item name="badge_id" label="Badge">
                                <Select>
                                    {badges.map(badge => (
                                        <Select.Option key={badge.dbId} value={badge.dbId}>{badge.title}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="date" label="Date">
                                <DatePicker.RangePicker format="MM-DD-YYYY" style={{width: '100%'}}/>
                            </Form.Item>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button className="basic-button" htmlType="submit">
                                    Add
                                </Button>
                            </div>
                        </Form>
                    </Modal>
                </Col>
                {
                    challenges.length > 0 && challenges.map(challenge => (
                        <Col key={challenge.id} span={6} style={{cursor: 'pointer'}} onClick={() => showAcceptChallenge(challenge)}>
                            <div className="challenge__box">
                                <div className="challenge__box__title">
                                    {/*<div className="challenge__box__title--name">*/}
                                    {/*    <Space>*/}
                                    {/*        <img alt={'linh'} src={avatar} width={16} height={16}*/}
                                    {/*             style={{objectFit: 'cover', borderRadius: '50%'}}/>*/}
                                    {/*        <div>Linh</div>*/}
                                    {/*    </Space>*/}
                                    {/*</div>*/}
                                    {/*<div>*/}
                                    {/*    <IconTick/>*/}
                                    {/*</div>*/}
                                </div>
                                <div>
                                    <img alt={'cover'} style={{width: '100%', objectFit: 'cover', height: '130px'}}
                                         src={challenge.avatar}/>
                                </div>
                                <div className="challenge__box--title">
                                    {challenge.title}
                                </div>
                            </div>
                        </Col>
                    ))

                }
                <Modal title="Accept challenge" visible={isAcceptChallengeVisible} footer={null} onOk={handleOk}
                       onCancel={onHideChallenge}>
                    <Form onFinish={onChallengeOtherUser} >
                        <div style={{display: "flex", width: "100%"}}>
                            <Form.Item name="user_id" style={{width: "100%", marginRight: 16}}>
                                <Select>
                                    {users.map(user => (
                                        <Select.Option key={user.dbId} value={user.dbId}>{user.username}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Button className="basic-button" htmlType="submit">
                                Challenge
                            </Button>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 0}}>
                            <Button style={{width: "100%"}} className="basic-button" onClick={onAcceptChallenge}>
                                Accept Challenge
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </Row>
            <Divider/>
        </div>
    );
};

Challenge.propTypes = {};

export default Challenge;
