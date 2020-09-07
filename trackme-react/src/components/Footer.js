import React, { Component } from 'react';

import '../style.css'
const Footer = () =>{
    const year = new Date().getFullYear();
    return (
        <div className="main-footer" id="footer">
            <footer className="footer mx-auto py-3">
                
                <span className="text-muted">&copy;Copyright Tuan Trung Nguyen {year}</span>
                
            </footer>
        </div>
    )
}

export default Footer;