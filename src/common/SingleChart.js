import React from 'react';

const SingleChart = ({strokeDasharray = "60, 100", percent, title, className="single-chart"}) => {
    return (
        <div className={className}>
            <svg viewBox="0 0 36 36" className="circular-chart orange">
                <path className="circle-bg"
                      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                      strokeDasharray={strokeDasharray}
                      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{percent}</text>
            </svg>
            <div className="title-circle">
                {title}
            </div>
        </div>
    );
};

export default SingleChart;
