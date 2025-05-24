import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="bubbles">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="bubble"
                        style={{
                            '--size': `${2 + Math.random() * 4}rem`,
                            '--distance': `${6 + Math.random() * 4}rem`,
                            '--position': `${-5 + Math.random() * 110}%`,
                            '--time': `${2 + Math.random() * 2}s`,
                            '--delay': `${-1 * (2 + Math.random() * 2)}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="footer-content">
                {/* Left - Logo and Address */}
                <div className="footer-content-left">
                    <img src="biteamin2_icon.png" alt="Logo" style={{ width: '70px', marginBottom: '10px' }} />
                    <h2>Biteamin HQ</h2>
                    <p>Allenhouse Group of Institutions, Plot No.-176</p>
                    <p>Kulgaon Road, Rooma, Kanpur</p>
                    <p>Uttar Pradesh 208008</p>
                    <div className="footer-social-icons">
                        <a href="https://facebook.com/biteamin" target="_blank" rel="noreferrer"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="https://instagram.com/biteaminofficial" target="_blank" rel="noreferrer"><FaInstagram /></a>
                    </div>
                </div>

                {/* Center - Navigation */}
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li>
                            <a 
                                href="/FreshBite_Privacy_Policy_Corrected.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Right - Contact */}
                <div className="footer-content-right">
                    <h2>Get in Touch</h2>
                    <ul>
                        <li>📞 <a href="tel:+9109990543567">+91-09990543567</a></li>
                        <li>📧 <a href="mailto:admin@biteamin.in">admin@biteamin.in</a></li>
                    </ul>
                </div>
            </div>

            <hr />
            <div className="footer-bottom">
                © 2025 Biteamin.com - All Rights Reserved.
            </div>
        </div>
    );
};

export default Footer;