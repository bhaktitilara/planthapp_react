import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
import PrivateLayout from "../layout/PrivateLayout";
import {Col, Row, Space} from "antd";
import Popover from "antd/es/popover";
import IconTemp from "../Icons/IconTemp";
import IconHumidity from "../Icons/IconHumidity";
import IconSun from "../Icons/IconSun";
import SingleChart from "../common/SingleChart";
import avatar from "../asset/imgs/avatar.png"
import axios from "axios";
import Search from "antd/es/input/Search";

const HomeContainer = props => {

    const [challenges, setChallenges] = useState([])
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const challengePercentage = (userId, challenges) => {
        let allChallenges = challenges.filter(e => e.user_id[0] === userId)
        let completedChallenges = allChallenges.filter(e => e.completed_at != null)
        return Math.trunc((completedChallenges.length / allChallenges.length) * 100)
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
        console.log(data)
        setChallenges(data)

        var config1 = {
            method: 'get',
            url: 'https://api.airtable.com/v0/appBaILYQNEF52Azn/user',
            headers: { 
              'Authorization': 'Bearer key3f6b1OpzYzfguf'
            }
        };

        const response1 = await (await axios.request(config1))?.data?.records ?? []
        let data1 = response1.map(e => ({...e.fields, dbId: e.id, challenge_percentage: challengePercentage(e.id, data)})).filter(e => e.dbId !== currentUser.dbId)

        if (username !== '') {
            data1 = data1.filter(e => e.username.toLowerCase().includes(username.toLowerCase()))
        }
        console.log(data1)
        setUsers(data1)
    }

    useEffect(() => {
        getData()
    }, [username])

    const content = (user) => (
        <div className="content-user">
            <Space>
                <IconTemp/>
                <div>
                    <div className="title-weather-common">
                        Temperature
                    </div>
                    <div className="title-weather-index">
                        {user.temperature}<sup>o</sup>C
                    </div>
                </div>
            </Space>
            <Space>
                <IconHumidity/>
                <div>
                    <div className="title-weather-common">
                        Humidity
                    </div>
                    <div className="title-weather-index">
                        {user.humidity}%
                    </div>
                </div>
            </Space>
            <Space>
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
            <div className="archi">
                {/*<SingleChart strokeDasharray={"40, 100"} className={"single-chart mr-10"} title={"Harvest"} percent={'40%'}/>*/}
                <SingleChart strokeDasharray={`${user.challenge_percentage || 0}, 100`} className={"single-chart"} title={"Challenges"} percent={`${user.challenge_percentage || 0}%`}/>
            </div>
            <div className="avatar-info">
                <img alt={"hihi"} src={avatar} width={36} height={36} style={{borderRadius: '50%', marginRight: 20}}/>
                <div className="avatar-info__title">{user.username}</div>
            </div>
        </div>
    );

    const onSearch = value => {
        setUsername(value)
    };

    return (
        <PrivateLayout>
            <div>
                <Row gutter={[8, 8]}>
                    <Col span={6} offset={18} style={{paddingBottom: 30}}>
                        <Search size={"large"} placeholder="Search user..." onSearch={onSearch} enterButton />
                    </Col>
                    { users.length > 0 && users.map(user => (
                        <Col span={{ lg: 2, md: 2, xs: 8}}>
                            <Popover content={() => content(user)} placement={"top"} title="">
                                <div className={"matrix matrix-gold"}/>
                            </Popover>
                        </Col>
                    ))}
                </Row>
            </div>
        </PrivateLayout>
    );
};

HomeContainer.propTypes = {

};

export default HomeContainer;
