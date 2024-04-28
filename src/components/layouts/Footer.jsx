import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <div className="footer-content">
                    <h4>Project Deal</h4>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta natus vitae, beatae ullam odio dicta voluptatem aliquam. Assumenda, qui! Harum enim corrupti omnis alias dolor?</p>
                </div>
                <div className="footer-content">
                    <h4>Projects</h4>
                    <ul>
                        <li><Link to='#'>Mercury</Link></li>
                        <li><Link to="#">Venus</Link></li>
                        <li><Link to="#">Earth</Link></li>
                        <li><Link to="#">Mars</Link></li>
                        <li><Link to="#">Jupiter</Link></li>
                    </ul>

                </div>
                <div className="footer-content">
                    <h4>Contact Us</h4>
                    <ul>
                        <li><Link to="#">Mercury</Link></li>
                        <li><Link to="#">Venus</Link></li>
                        <li><Link to="#">Earth</Link></li>
                        <li><Link to="#">Mars</Link></li>
                        <li><Link to="#">Jupiter</Link></li>
                    </ul>

                </div>
                <div className="footer-content">
                    <h4>Support</h4>
                    <ul>
                        <li><Link to="#">FAQ</Link></li>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">Help</Link></li>
                        <li><Link to="#">Contact</Link></li>
                    </ul>
                </div>
                </div>
                <div className='footer-copyright'>Copyright@ Sectionhhhhhhhhhhhhhhhhhh</div>
            
        </footer>
    )
}

export default Footer;