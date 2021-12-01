import React, {useEffect, useState} from 'react';
import axios from "axios";
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import Menu from "antd/es/menu";
import {Image, Row, Space, Col} from "antd";
import avatar from "../asset/imgs/avatar.png"
import {Divider} from "antd/es";
import {Link} from "react-router-dom";
import IconSetting from "../Icons/IconSetting";
import IconNoti from "../Icons/IconNoti";
import IconTemp from "../Icons/IconTemp";
import IconTree from "../Icons/IconTree";
import IconHumidity from "../Icons/IconHumidity";
import IconSun from "../Icons/IconSun";
import SingleChart from "../common/SingleChart";
import {CHALLENGE_PATH, DONATION_PATH, DASHBOARD_PATH, EMPLOYEE_PATH} from "../config/path";
import * as fs from 'fs';
import ImageGallery from 'react-image-gallery';
import IconCamera from '../Icons/IconCamera';
import IconCameraOff from '../Icons/IconCameraOff';
import Gallery from "react-photo-gallery";
import Modal from "antd/es/modal/Modal";

const PrivateLayout = props => {

    const {children} = props
    const [challenges, setChallenges] = useState([])
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const [images, setImages] = useState([])

    const [photos, setPhotos] = useState([])

    const formattedDate = () => {
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
        return new Date().toLocaleDateString("en-US", options);
    }

    const formattedGreeting = () => {
        const hour = new Date().getHours();
        return ("Good " + (hour<12 && "Morning" || hour<18 && "Afternoon" || "Evening") + "!");
    }

    const buttons = () => {
        if (images.length === 0) {
            return <div></div>
        } else {
            return (
                <>
                    <IconCamera onClick={captureCamera}/>
                    <IconCameraOff onClick={stopCamera}/>
                </>
            );
        }
    }

    const challengePercentage = (userId, challenges) => {
        let allChallenges = challenges.filter(e => e.user_id[0] === userId)
        let completedChallenges = allChallenges.filter(e => e.completed_at != null)
        return Math.trunc((completedChallenges.length / allChallenges.length) * 100)
    }

    const challengeCompleted = (userId, challenges) => {
        let allChallenges = challenges.filter(e => e.user_id[0] === userId)
        let completedChallenges = allChallenges.filter(e => e.completed_at != null)
        return completedChallenges.length
    }

    const getData = async () => {
        var config = {
            method: 'get',
            url: 'https://api.airtable.com/v0/appBaILYQNEF52Azn/challenge_user',
            headers: { 
              'Authorization': 'Bearer key3f6b1OpzYzfguf'
            }
        };
        const response = await (await axios.request(config))?.data?.records ?? []
        const data = response.map(e => ({...e.fields, dbId: e.id}))
        console.log("here", data)
        setChallenges(data)

        var config1 = {
            method: 'get',
            url: `https://api.airtable.com/v0/appBaILYQNEF52Azn/user/${currentUser.dbId}`,
            headers: {
              'Authorization': 'Bearer key3f6b1OpzYzfguf'
            }
        };

        const response1 = await (await axios.request(config1)).data
        const newUser1 = {...response1.fields, 
            dbId: response1.id, 
            challenge_percentage: challengePercentage(response1.id, data),
            total_char_completed: challengeCompleted(response1.id, data)}
        localStorage.setItem('currentUser', JSON.stringify(newUser1))
        currentUser = newUser1
    }

    const getImage = async () => {
        var config = {
            method: 'get',
            url: `https://api.airtable.com/v0/appBaILYQNEF52Azn/image_user`,
            headers: {
                'Authorization': 'Bearer key3f6b1OpzYzfguf'
            }
        };

        const response = await (await axios.request(config)).data
        let data = response.records.map(record => ({
            original: record.fields.image[0].url,
            originalHeight: 200,
            originalWidth:200,
            rank: record.fields.id
        })).sort((a,b) => {return b.rank - a.rank})

        let photo =  response.records.map(record => ({
            src: record.fields.image[0].url,
            width: 4,
            height: 3
        })).sort((a,b) => {return b.rank - a.rank})

        setImages(data)

        setPhotos(photo)
    }

    const stopCamera = async () => {
        var config = {
            method: 'get',
            url: `http://139.59.232.38:3300/stop-camera/${currentUser.dbId}`,
            headers: { }
          };

        const response = (await axios.request(config)).data
        console.log(response)
    }

    const captureCamera = async () => {
        var config = {
            method: 'get',
            url: `http://139.59.232.38:3300/capture-camera/${currentUser.dbId}`,
            headers: { }
          };

        const response = (await axios.request(config)).data
        console.log(response)
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        getData()
        getImage()
    }, [])

    return (
        <Layout style={{minHeight: '100vh'}} hasSider>
            <Modal title="Gallery" style={{ top: 0 }} visible={isModalVisible} onOk={handleOk} width={'100%'} onCancel={handleCancel}>
                <Gallery photos={photos} />
            </Modal>
            <Layout style={{paddingTop: 17}}>
                <Header theme="light" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to={DASHBOARD_PATH}>Garden</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={CHALLENGE_PATH}>Challenges</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            My Corner
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={DONATION_PATH}>Donations</Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to={EMPLOYEE_PATH}>Employees</Link>
                        </Menu.Item>
                    </Menu>
                    <div className="d-flex align-center">
                        <Space size={"large"} className="d-flex align-center">
                            <IconSetting/>
                            <IconNoti/>
                        </Space>
                    </div>
                </Header>
                <Content>
                    <div className="d-flex align-center">
                        <div className="title-weather">
                            {currentUser.username}'s Garden
                        </div>
                        <div className="divider-weather"/>
                        <div className="title-weather">
                            {formattedDate()}
                        </div>
                    </div>
                    <div className="title-hello">
                        {formattedGreeting()}
                    </div>
                    <div className="content-weather mt-2 d-flex">
                        <Space style={{paddingRight: 100}}>
                            <IconTemp/>
                            <div>
                                <div className="title-weather-common">
                                    Temperature
                                </div>
                                <div className="title-weather-index">
                                    {currentUser.temperature}<sup>o</sup>C
                                </div>
                            </div>
                        </Space>
                        <Space style={{paddingRight: 100}}>
                            <IconHumidity/>
                            <div>
                                <div className="title-weather-common">
                                    Humidity
                                </div>
                                <div className="title-weather-index">
                                    {currentUser.humidity}%
                                </div>
                            </div>
                        </Space>
                        <Space style={{paddingRight: 100}}>
                            <IconSun/>
                            <div>
                                <div className="title-weather-common">
                                    Sunlight
                                </div>
                                <div className="title-badge">
                                    Good
                                </div>
                            </div>
                        </Space>
                        <Space style={{paddingLeft: 100}}>
                            <div>
                                <ImageGallery originalClass={'test'} showFullscreenButton={false} onClick={showModal}  showThumbnails={false} showPlayButton={false} items={images} />
                            </div>
                            {/* <IconCamera onClick={captureCamera}/>
                            <IconCameraOff onClick={stopCamera}/> */}
                            {buttons()}
                        </Space>
                    </div>
                    <Row>
                        <Col xs={24} sm={24} md={6} lg={6}>
                            <div className="d-flex justify-center" style={{flexDirection: 'column'}}>
                                {/*<SingleChart strokeDasharray={"40, 100"} className={"single-chart mt-2"} title={"Harvest"} percent={'40%'}/>*/}
                                <SingleChart strokeDasharray={`${currentUser.challenge_percentage || 0}, 100`} className={"single-chart mt-2"} title={"Challenges"} percent={`${currentUser.challenge_percentage || 0}%`}/>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={18}>
                            {children}
                        </Col>
                    </Row>
                </Content>
            </Layout>
            <Sider
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"
                width={375}
                defaultCollapsed={window.innerWidth < '992'}
            >
                <div className="sidebar-right">
                    <Space direction={"vertical"} style={{width: '100%'}}>
                        <div className="user-info">
                            <Space direction={"vertical"} className={"center"}>
                                <Image className={"avatar-border"} src={currentUser.avatar[0]?.url ?? avatar} width={110} height={110}/>
                                <div className="username">
                                    {currentUser.fullname}
                                </div>
                                <Link to={'/'}>Edit profile</Link>
                            </Space>
                        </div>
                        <Divider/>
                        <Space direction={"vertical"} className={"center w-100"}>
                            <div className="title">
                                Harvest points
                            </div>
                            <h2 style={{fontSize: 36}}>{currentUser.harvest_point}</h2>
                        </Space>
                        <Divider/>
                        <Space direction={"vertical"} className={"center w-100"}>
                            <div className="title">
                                Challenge completed
                            </div>
                            <h2 style={{fontSize: 36}}>{currentUser.total_char_completed}</h2>
                        </Space>
                        <Divider/>
                        <Space direction={"vertical"} className={"center w-100"}>
                            <div className="title">
                                Tree planted
                            </div>
                            <h2 style={{fontSize: 36}}>{currentUser.total_tree_planted}</h2>
                        </Space>
                        <Divider/>
                        <Space direction={"vertical"} className={"center w-100"}>
                            <div className="title">
                                Total donated
                            </div>
                            <h2 style={{fontSize: 36}}>{currentUser.total_donated}</h2>
                        </Space>
                        <Divider/>
                    </Space>
                </div>
            </Sider>
        </Layout>
    );
};

PrivateLayout.propTypes = {};

export default PrivateLayout;
