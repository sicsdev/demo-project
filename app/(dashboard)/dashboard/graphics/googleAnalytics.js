import React, { useEffect } from 'react';
import ReactGA from "react-ga4";

const GoogleAnalytics = () => {

    useEffect(() => {
        ReactGA.initialize("G-HFHNKD99J4");
        ReactGA.send("pageview");


    }, []);

    const triggerGA = () => {
        ReactGA.event({
            action: "This is a test for Deflection AI! working!",
            category: "Button",
            label: "Google Analytic event triggered",
        });
    };

    return (
        <div>
            <button className='btn bg-sky rounded p-3' onClick={triggerGA}>
                Trigger a test event on Google Analytics
                </button>
            <section id="auth-button"></section>
            <section id="view-selector"></section>
            <section id="timeline"></section>
        </div>
    );
};

export default GoogleAnalytics;
