import React, {useEffect, useState} from 'react';
import PrivateLayout from "../layout/PrivateLayout";
import '../components/Challenge/Challenge.scss'
import axios from "axios";
import {Col} from "antd";
import avatarDefault from '../asset/imgs/avatar1.png'
import Row from "antd/es/grid/row";
import IconSmile from "../Icons/IconSmile";
import IconNormal from "../Icons/IconNormal";
import IconSad from "../Icons/IconSad";
import Modal from "antd/es/modal/Modal";
import Image from "antd/es/image";
import {BASE_URL_IMG} from "../config/const";

const EmployeeContainer = props => {

    const [users, setUsers] = useState([])

    const [tracking, setTracking] = useState([])

    const [challenges, setChallenges] = useState([])

    const [challenge, setChallenge] = useState([])

    const [challengeInfo, setChallengeInfo] = useState([])

    const getUsers = async () => {
        var config = {
            method: 'get',
            url: `https://api.airtable.com/v0/appBaILYQNEF52Azn/user`,
            headers: {
                'Authorization': 'Bearer key3f6b1OpzYzfguf'
            }
        };

        const response = await (await axios.request(config)).data.records

        setUsers(response)
    }

    const getTracking = async () => {
        var config = {
            method: 'get',
            url: `https://api.airtable.com/v0/appBaILYQNEF52Azn/tracking`,
            headers: {
                'Authorization': 'Bearer key3f6b1OpzYzfguf'
            }
        };

        const response = await (await axios.request(config)).data.records.reverse()

        setTracking(response)
    }

    const getChallenge = async () => {
        var config = {
            method: 'get',
            url: `https://api.airtable.com/v0/appBaILYQNEF52Azn/challenge_user`,
            headers: {
                'Authorization': 'Bearer key3f6b1OpzYzfguf'
            }
        };

        const response = await (await axios.request(config)).data.records

        setChallenges(response)
    }

    const getChallengeInfo = async () => {
        var config = {
            method: 'get',
            url: `https://api.airtable.com/v0/appBaILYQNEF52Azn/challenges`,
            headers: {
                'Authorization': 'Bearer key3f6b1OpzYzfguf'
            }
        };

        const response = await (await axios.request(config)).data.records

        setChallengeInfo(response)
    }

    useEffect(getChallengeInfo, [])


    useEffect(getUsers, [])

    useEffect(getTracking, [])

    useEffect(getChallenge, [])

    const checkData = (challenge) => {
        let data = tracking.find(track => track.fields.user_id[0] == challenge.id)
        if (data) {
            return {
                engagement: data.fields.engagement,
                wellness: data.fields.wellness
            }
        }
        return {
            engagement: 0,
            wellness: 0
        }
    }

    const checkFace = (wellness) => {
        if (wellness === 0) {
            return <IconNormal/>
        }

        if (wellness <= 6) {
            return <IconSad/>
        }

        if (wellness >= 8) {
            return <IconSmile/>
        }

        return <IconNormal/>
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [trackingModal, setTrackingModal] = useState([]);

    const [user, setUser] = useState({});

    const showModal = (userData) => {
        setIsModalVisible(true);
        setUser(userData)
        let data = challenges.filter(challenge => challenge.fields.user_id[0] == userData.id && challenge.fields.completed_at !== null)
        let trackings = tracking.filter(track => track.fields.user_id[0] == userData.id)
        setTrackingModal(trackings)
        setChallenge(data)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setUser({})
    };

    return (
        <PrivateLayout>
            <Row gutter={[20, 20]}>
                <Modal title="Employee" style={{top: 20}} visible={isModalVisible} onOk={handleOk} width={'50%'}
                       onCancel={handleCancel}>
                    <div>
                        {
                            Object.keys(user).length > 0 &&
                            <div>
                                <div style={{display: 'flex'}}>
                                    <Image width={140} height={180} style={{objectFit: "cover"}}
                                           src={user.fields?.avatar ? user.fields?.avatar[0].url : avatarDefault}/>
                                    <div style={{paddingLeft: 30}}>
                                        <h1>
                                            {user.fields.fullname}
                                        </h1>
                                        <h3>
                                            Wellness: {checkData(user).wellness}
                                        </h3>
                                        <h3>
                                            Engagement: {checkData(user).engagement}
                                        </h3>
                                    </div>
                                </div>
                                <div style={{paddingTop: 30, paddingBottom: 30}}>
                                    <h1>Challenge:</h1>
                                    <Row gutter={[20, 20]} className="challenge-wrapper challenge">
                                        {challenge.length > 0 && challenge.map(challenge2 => (
                                            <Col key={challenge2.id} span={6} style={{cursor: 'pointer'}}>
                                                <div className="challenge__box">
                                                    <div>
                                                        <img alt={'cover'} style={{
                                                            width: '100%',
                                                            objectFit: 'cover',
                                                            height: '130px'
                                                        }}
                                                             src={`${challengeInfo.find(challeng => challeng.id == challenge2.fields.challenge_id[0]).fields.avatar[0].url}`}/>
                                                    </div>
                                                    <div className="challenge__box--title">
                                                        {challengeInfo.find(challeng => challeng.id == challenge2.fields.challenge_id[0]).fields.title}
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                        }
                                    </Row>
                                </div>
                                <div style={{paddingTop: 30, paddingBottom: 30}}>
                                    <h1>History:</h1>
                                    
                                    <Row gutter={[8, 8]}>
                                    
                                        { trackingModal.length > 0 && trackingModal.map(track => (
                                            <Col span={{ lg: 2, md: 2, xs: 8}}>
                                                <div className={"matrix matrix-gold"} style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: track.fields.wellness >= 8 ? "#5CA986" : track.fields.wellness >= 6 ? "#80B169" : "#CDD755" }}>
                                                    {track.fields.wellness}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </div>
                        }
                    </div>
                </Modal>
                {
                    users.length > 0 && users.map(challenge => (
                        <Col key={challenge.id} span={5} style={{cursor: 'pointer'}}
                             onClick={() => showModal(challenge)}>
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
                                <div style={{position: 'relative'}}>
                                    <img alt={'cover'}
                                         style={{width: 140, height: 180, objectFit: 'cover', borderRadius: 10}}
                                         src={challenge.fields?.avatar ? challenge.fields?.avatar[0].url : avatarDefault}/>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0, display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '140px',
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        borderRadius: '0 0 10px 10px',
                                        alignItems: 'center',
                                        padding: 5
                                    }}
                                    >
                                        <div style={{color: 'white'}}>{challenge.fields.username}</div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            {
                                                checkFace(Number.parseInt(checkData(challenge).wellness))
                                            }
                                            <div style={{paddingLeft: 5, color: '#80E372F2'}}>
                                                {
                                                    checkData(challenge).engagement
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="challenge__box--title">
                                    {challenge.title}
                                </div>
                            </div>
                        </Col>
                    ))

                }
            </Row>
        </PrivateLayout>
    );
};

EmployeeContainer.propTypes = {};

export default EmployeeContainer;
