import React from 'react'
import logo from '../Images/blueLogo.png'
import FormatQuote from '@material-ui/icons/FormatQuote';
import General from '../Layout/General';
import aboutBanner from '../Images/aboutBanner.jpg'

function About() {
    return (
        <General>
            <div className="min-h-screen flex pb-8 md:flex-col flex-row pt-8 items-center">
                <div className="banner flex flex-col w-5/6 self-center mb-8 rounded h-60 pt-8 pb-2 pr-2 pl-8 justify-between shadow"
                    style={{
                        backgroundImage: `url(${aboutBanner})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <img src={logo} alt="logo" className="w-24 h-24" />
                    <p className="text-right font-bold text-white">"Your Wellness, Our Heartbeat"</p>
                </div>
                <div className="below__banner flex flex-row w-5/6">
                    <div className="flex flex-col w-2/3 px-2">
                        <p className="font-semibold text-center mb-1 text-green-700 dark:text-green-500 text-2xl">About Us</p>
                        <p className="text-gray-700 dark:text-white mb-8">Zimbabwe Online Market is a free software under the buy and sell category which enables easy identification of small businesses
                        within a specific radii so as to aqcuire required product.
                        We provide a non physical interraction between sellers and buyers so as to minimise movements
                        and wastage of time when consulting for needs and wants.
                        We are a bridge  between the society and all the business people and help users witrh their need.</p>
                        <p className="font-semibold text-center mb-1 text-green-700 dark:text-green-500 text-2xl">Services</p>
                        <p className="text-gray-700 dark:text-white mb-8">For end users, Zim Online Market has a mobile application which is compartible on both android and iOS. It enables the users
                        to search for specific products from different stores within their radii or even nation wide hence knowing
                        the stock in store and also compare prices in different sellers. It also gives allowance for buyers to
                        communicate with sellers on their orders and how to take them.
                        
                        For sellers, Zim Online Market has a admin inventory management dashboard, where the seller can manage
                        their stock and orders from end users.
                        We ensure security of information between user and information will remain confidential at all times.
                        </p>
                        <p className="font-semibold text-center mb-1 text-green-700 dark:text-green-500 dark:text-white text-2xl">Disclaimer</p>
                        <p className="text-gray-700 mb-8 dark:text-white">Description content on this platform is for informational purposes only. 
                        It is not intended to be substituted for professional store advice
                        </p>
                    </div>
                    <div className="border-r border-green-700"></div>
                    <div className="other w-1/3 p-3">
                        <FormatQuote className="text-green-700 dark:text-green-500" fontSize="large"/>
                        <p className="text-gray-500 dark:text-white flex flex-col"><p>Let us be the ones who say we do not accept that a child dies every three seconds simply because 
                            he does not have the drugs you and I have. Let us be the ones to say we are not satisfied that your 
                            place of birth determines your right for life. Let us be outraged, let us be loud, let us be bold.</p> <p className="text-gray-700">--Brad Pitt</p> </p>
                            
                            <FormatQuote className="text-green-700 dark:text-green-500" fontSize="large"/>
                    </div>
                </div>
            </div>
        </General>
    )
}

export default About
