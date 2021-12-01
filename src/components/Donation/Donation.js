import React from 'react';
// import PropTypes from 'prop-types';
import './Donation.scss'
import {Pagination, Row} from "antd";
import Col from "antd/es/grid/col";
import avatar from "../../asset/imgs/avatar.png"
import Space from "antd/es/space";
const Donation = props => {
    return (
        <div className="donation-wrapper donation">
            <div className="donation--title mb-4">
                Donations
            </div>
            <Row gutter={[20, 20]} className={"mb-4"}>
                <Col span={12}>
                    <div className="donation__card donation__card--success">
                        <div className="d-flex">
                            <Space>
                                <img src={avatar} alt={'avatar'} width={36} height={36} className="border-radius-50"/>
                                <div>
                                    <div>
                                        Ariyanto has donated 1$ to “Give a Wish”
                                    </div>
                                    <div>
                                        19/09/2021
                                    </div>
                                </div>
                            </Space>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="donation__card donation__card--success-2">
                        <div className="d-flex">
                            <Space>
                                <img src={avatar} alt={'avatar'} width={36} height={36} className="border-radius-50"/>
                                <div>
                                    <div>
                                        Ariyanto has donated 1$ to “Give a Wish”
                                    </div>
                                    <div>
                                        19/09/2021
                                    </div>
                                </div>
                            </Space>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="donation__card donation__card--success">
                        <div className="d-flex">
                            <Space>
                                <img src={avatar} alt={'avatar'} width={36} height={36} className="border-radius-50"/>
                                <div>
                                    <div>
                                        Ariyanto has donated 1$ to “Give a Wish”
                                    </div>
                                    <div>
                                        19/09/2021
                                    </div>
                                </div>
                            </Space>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="donation__card donation__card--success-2">
                        <div className="d-flex">
                            <Space>
                                <img src={avatar} alt={'avatar'} width={36} height={36} className="border-radius-50"/>
                                <div>
                                    <div>
                                        Ariyanto has donated 1$ to “Give a Wish”
                                    </div>
                                    <div>
                                        19/09/2021
                                    </div>
                                </div>
                            </Space>
                        </div>
                    </div>
                </Col>
            </Row>
            {/* <div className="d-flex justify-center">
                <Pagination total={50}/>
            </div> */}
        </div>
    );
};

Donation.propTypes = {

};

export default Donation;
