import React, { Component } from 'react';
import Typed from 'react-typed';
import { Link } from 'react-router-dom';
import '../css/index.css';


class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <h1>LeetTrack</h1>
                <div className="animated-typing">
                    <p>
                        <Typed strings={["/*Made for your friendly neighborhood Type-A Leetcoder*/"]} typeSpeed={100} />
                    </p>
                </div>
                <div className="custom-button" align="center">
                    <Link to="/usersigns"><button>Get Started</button></Link>
                </div>
            </div>
        );
    }
}

export default LandingPage;
