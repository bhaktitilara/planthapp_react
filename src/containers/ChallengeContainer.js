import React from 'react';
import Challenge from "../components/Challenge/Challenge";
import PrivateLayout from "../layout/PrivateLayout";
// import PropTypes from 'prop-types';

const ChallengeContainer = props => {
    return (
        <PrivateLayout>
            <Challenge/>
        </PrivateLayout>
    );
};

ChallengeContainer.propTypes = {

};

export default ChallengeContainer;
