import React from 'react';
import PrivateLayout from "../layout/PrivateLayout";
import Donation from "../components/Donation/Donation";
// import PropTypes from 'prop-types';

const DonationContainer = props => {
    return (
        <PrivateLayout>
            <Donation/>
        </PrivateLayout>
    );
};

DonationContainer.propTypes = {

};

export default DonationContainer;
