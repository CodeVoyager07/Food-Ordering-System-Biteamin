import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For a Better Experience, Download <br/> the Tomato App</p>
        
        <div className="app-download-platforms">
            {/* Google Play Store Link */}
            <a href="https://play.google.com/store/apps/details?id=com.application.zomato" target="_blank" rel="noopener noreferrer">
                <img src={assets.play_store} alt="Download on Google Play" />
            </a>

            {/* Apple App Store Link */}
            <a href="https://apps.apple.com/in/app/zomato-food-delivery-dining/id434613896" target="_blank" rel="noopener noreferrer">
                <img src={assets.app_store} alt="Download on App Store" />
            </a>
        </div>
    </div>
  );
}

export default AppDownload;
