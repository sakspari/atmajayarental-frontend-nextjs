import React from 'react';

const LoadingComponent = ({isLoading}) => {
    return (
        <div>
            {isLoading && (
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 animate-ping">

                    </div>
                    <span>loading...</span>
                </div>
            )}
        </div>
    );
};

export default LoadingComponent;
