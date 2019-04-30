import React from 'react';

const Iframe = () => {
    // if (!source) {
    //     return <div>Loading...</div>
    // }

    return (
        <div className="embed-responsive embed-responsive-21by9">
            <iframe className="embed-responsive-item" title="myco2" src='https://reactco2emission.netlify.com'></iframe>     
        </div>
    );
};

export default Iframe;