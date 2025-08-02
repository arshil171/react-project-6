import React from 'react'
import './footer.css'
import { FaFacebook, FaInstagramSquare, FaPinterestSquare, FaTwitterSquare, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer class="section-p1" >
            <div class="col">
                <img class="logo" src="sectionImg/logo.png" alt=""/>
                    <h4>Contact</h4>
                    <div className=''> <strong>Address :</strong> 562 Wellington Road,Street 32 , San Francisco</div>
                    <div> <strong>Phone:</strong>+01 2222 365 / (+91) 01 2345 6789</div>
                    <div> <strong>Hours:</strong>10:00 - 18:00 , Mon - Sat</div>
                    <div className="follow">
                        <h4>Follow Us</h4>
                        <div class="icon">
                            <i class="fab fa-facebook-f"><FaFacebook /></i>
                            <i class="fab fa-twitter"><FaTwitterSquare /></i>
                            <i class="fab fa-instagram"><FaInstagramSquare /></i>
                            <i class="fab fa-pinterest-p"><FaPinterestSquare /></i>
                            <i class="fab fa-youtube"><FaYoutube /></i>
                        </div>
                    </div>
            </div>

            <div class="col">
                <h4>About</h4>
                <a href="#">About Us</a>
                <a href="#">Delivery Information</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Condition</a>
                <a href="#">Contact Us</a>
            </div>

            <div class="col">
                <h4>My Account</h4>
                <a href="#">Sign In</a>
                <a href="#">View Cart</a>
                <a href="#">My WishList</a>
                <a href="#">Track My Order</a>
                <a href="#">Help</a>
            </div>

            <div class="col install">
                <div>Install App</div>
                <div>From App Store or Google Play</div>
                <div class="row">
                    <img src="sectionImg/pay/app.jpg" alt=""/>
                        <img src="sectionImg/pay/play.jpg" alt=""/>
                        </div>
                        <div>Secured Payment Gateways</div>
                        <img src="sectionImg/pay/pay.png" alt=""/>
                        </div>


                        <div className="copyright">
                            <div>@ 2021 , Arshil - React TailwindCss</div>
                        </div>
                    </footer>

                    )
}

                    export default Footer