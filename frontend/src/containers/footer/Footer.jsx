import React from 'react'
import "./Footer.css"
import gpt3Logo from "../../assets/eyeguard.png"

const Footer = () => {
  return (
    <div className='gpt3__footer section__padding'>
     <div className='gpt3__footer-heading'>
         {/* <h1 className='gradient__text'>This project is 100% Proof Of Concept</h1> */}
     </div>
     <div className='gpt3__footer-btn'>
        <p>Request Early Access</p>
     </div>
     <div className='gpt3__footer-links'>
        <div className='gpt3__footer-links_logo'>
        <div class="image-container">
            <img src={gpt3Logo} alt="logo" />
        </div>
           <p>Nithila Ariyapperuma, All Rights Reserved</p>
        </div>
        <div className='gpt3__footer-links_div'>
          <h4>Links</h4>
          <p>Overons</p>
          <p>Social Media</p>
          <p>Counters</p>
          <p>Contact</p>
        </div>
        <div className='gpt3__footer-links_div'>
          <h4>Company</h4>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>
        <div className='gpt3__footer-links_div'>
          <h4>Get in Touch</h4>
          <p>Random Address, Country</p>
          <p>061-726836</p>
          <p>info@eyeguard.net</p>
        </div>
     </div>
     <div className='gpt3__footer-copyright'>
      <p>© 2024 EyeGuard. All rights reserved.</p>
     </div>
    </div>
  )
}

export default Footer