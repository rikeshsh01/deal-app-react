import React from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const About = () => {
    return (
        <>
            <Header />
            <div>
                <h1 className="about-us">About Us</h1>
                <div className="about-container">
                    <img className="about-img" src="https://images.pexels.com/photos/164645/pexels-photo-164645.jpeg?auto=compress&cs=tinysrgb&w=600" alt="About Us" />
                    <div className="about-content">
                        <h2>Who we are?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab at earum quisquam consequuntur ea, dicta exercitationem iste. Velit, minima eius enim ex aspernatur tempora cupiditate dignissimos. Porro quibusdam, corporis dolor, optio incidunt a tenetur ex delectus repellendus, sequi eaque corrupti totam. Consequuntur, quos. Sed necessitatibus cum harum mollitia, odio adipisci. 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus obcaecati enim, vitae saepe impedit, ipsam nisi, facere commodi illum veritatis autem. Laborum, praesentium. Dolorem, ut deserunt! Repellendus, quidem quibusdam voluptates incidunt ducimus corporis nemo maiores voluptatibus, quasi ipsum laboriosam. Aspernatur commodi enim placeat facilis, aperiam odit delectus assumenda quas eligendi.

                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
