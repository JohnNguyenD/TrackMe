import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

const AboutMe = () =>{
    return(
        <div>
            <Navbar />
            <div className ="main">
                
                    <h1>John Nguyen</h1>
                    <p>My hobbies are learning new things and listening music in the free time</p>
                    <p>My skills that I have achieved so far are</p>
                    <ol>
                        <li>HTML & CSS</li>
                        <li>Python</li>
                        <li>C#</li>
                        <li>General Knowledge of OOP</li>
                        <li>C language</li>
                    </ol>
                
                    <section>
                        <h2>Units I have completed so far</h2>
                        <ol>
                            <li>SIT122 ROBOTIC STUDIOS</li>
                            <li>SIT232 OBJECT-ORIENTED DEVELOPMENT</li>
                            <li>SIT190 INTRODUCTORY MATHEMATICAL METHODS</li>
                            <li>SIT107 SOFTWARE ENGINEERINGS 1: CONNECTING THE CYBER AND PHYSICAL WORLDS</li>
                            <li>SIT202 NETWORKS AND COMMUNICATION</li>
                            <li>ADV201 WEB DESIGN AND INTERACTIVITY</li>
                            <li>SIT192 DISCRETE MATHEMATICS</li>
                            <li>SIT210 EMBEDDED SYSTEMS DEVELOPMENT</li>
                        </ol>
                    </section>
            
                
            </div>
            <Footer />
        </div>
    )
}

export default AboutMe;