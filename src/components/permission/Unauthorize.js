import React from 'react';
import PrivateLayout from "../../layout/PrivateLayout";
import {Button, Result} from "antd";
import {useHistory} from "react-router-dom";

const Unauthorized = () => {

    const history = useHistory()

    return (
        <PrivateLayout>
            <Result
                status="403"
                title="403"
                subTitle={'unauthorized'}
                extra={<Button onClick={() => history.goBack()} className={"btn btn-common"} size={"large"}>Back</Button>}
            />
        </PrivateLayout>
    );
};

export default Unauthorized;
