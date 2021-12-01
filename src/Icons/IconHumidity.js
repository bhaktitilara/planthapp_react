import React from 'react';
// import PropTypes from 'prop-types';

const IconHumidity = props => {
    return (
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
                <rect x="5" y="5" width="60" height="60" rx="10" fill="white" fillOpacity="0.95" shapeRendering="crispEdges"/>
            </g>
            <g clipPath="url(#clip0)">
                <path d="M35.2807 50.9422C41.3526 50.9422 46.1984 46.2152 46.1984 40.2816C46.1984 36.9984 44.5765 33.7745 43.1723 31.144L37.5354 20.6218C37.0014 19.6725 36.2498 19.2175 35.2807 19.2175C34.2917 19.2175 33.5401 19.6922 33.0457 20.6218L27.4088 31.144C26.0045 33.7745 24.3629 36.9984 24.3629 40.2816C24.3629 46.2152 29.2086 50.9422 35.2807 50.9422ZM35.2807 48.0546C30.8305 48.0546 27.2506 44.6329 27.2506 40.2816C27.2506 37.6313 28.5955 35.1392 29.9998 32.5087L35.2213 22.7777C35.2411 22.6788 35.34 22.6788 35.3795 22.7777L40.5813 32.5087C41.9855 35.1392 43.3107 37.6313 43.3107 40.2816C43.3107 44.6329 39.7506 48.0546 35.2807 48.0546Z" fill="black"/>
            </g>
            <defs>
                <filter id="filter0_d" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
                <clipPath id="clip0">
                    <rect width="22.6835" height="32" fill="white" transform="translate(24 19)"/>
                </clipPath>
            </defs>
        </svg>



    );
};

IconHumidity.propTypes = {};

export default IconHumidity;
