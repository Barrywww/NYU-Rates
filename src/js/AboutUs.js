import React from "react";
import {Layout} from 'antd';
import "../css/AboutUs.css";
import MainHeader from "../components/common/header";

const {Content, Footer } = Layout;

class AboutUs extends React.Component{

    render(){
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Content className='ContentArea'>
                    <div id="aboutUs-bannerText">About us</div>
                    <div className="paraWrapper">
                        <p className='param'>
                            NYURates is a site that is created by a group of NYU students. The main purpose is to provide
                            students as well as professors in NYU with an interactive platform to express thoughts on different professor's dinstinct courses.</p>
                        <p className='param'> All users (not viewers) of our website ought to be legit NYU enrolled members, which
                        will be verified by their NYU email addresses. </p>
                        <p className='param'> Student accounts will be able to search for or even add a new professor (if not already exist)
                        on our site, and view his/her info page. Students accounts can either just get a rough idea of the professor's
                        teaching style on different courses, or post a new comment and rating expressing their own takes on the difficulty or fairness of the courses.</p>
                        <p className='param'>Professor accounts will be able to do no more than simply viewing students comments and ratings, just to get a better idea of how 
                        students actually feel towards their lecturing </p>
                        <p className='param'>There are of course other unmentioned small functionalities, but the usage shoule be intuitive
                        , straightforward and handy.</p>
                        <p className='param'>Lastly, we hope this be a friendly and fair platform where students can honestly provide inputs for both future
                        lowerclassmen to choose courses and professors to consider improving their ways of lecturing. And all comments will be monitored and reviewed
                        by administartors to maintain a clean and healthy environment.</p>
                    </div>
 
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>

            
        )
    }
}

export default AboutUs;