import React from 'react';

const GenderDisplay = ({genderType}) => {
    return (
        <span>
            {genderType == 1 ? 'Pria' : 'Wanita'}
        </span>
    );
};

export default GenderDisplay;
