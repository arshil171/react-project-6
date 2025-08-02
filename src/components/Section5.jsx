import React from 'react'
import './section5.css'

const Section5 = () => {
  return (
   <div>
     <section id="banner4">
         <div class="banner-box4">
          
            <h2>SEASONAL SALE</h2>
            <h3>Winter Collection -50% OFF</h3>
            
        </div>
        <div class="banner-box4 banner-box4-2">
          
            <h2>NEW FOOTWEAR COLLECTION</h2>
            <h3>Spring / Summer 2022</h3>
            
        </div>
        <div class="banner-box4 banner-box4-3">
          
            <h2>T-SHIRTS</h2>
            <h3>New Trendy Prints</h3>
            
        </div>
    </section>
    
    <section id="newsletter"  className="section-m1 section-p1">
        <div class="newstext">
            <h4>Sign Up For Newsletters</h4>
            <p>Get E-mail Updates about our Latest shop and <span>special offers.</span></p>
        </div>
        <div class="form">
            <input type="text" placeholder="Your email address"/>
            <button class="normal">Sign Up</button>
        </div>
    </section>
    </div>
  )
}

export default Section5