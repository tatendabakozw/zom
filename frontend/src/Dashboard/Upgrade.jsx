import React from 'react'
import InfoIcon from '@material-ui/icons/Info';
import upload from '../Images/uploadI.svg'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import premium from '../Images/premium.svg'
import text from '../Images/textM.svg'
import StoreDashboard from '../Layout/StoreDashboard';

function Upgrade() {
    return (
        <StoreDashboard>
            <div className="grid md:grid-cols-2 grid-cols-1 px-8">
                <div className="left md:p-8 p-4 col-span-1">
                    <p className="text-gray-700 md:w-2/3 w-full text-3xl font-bold">Why you should ugrade your account?</p>
                    <p className="mb-4">By this upgrade you get all features from Basic, plus:</p>
                    <div className="item flex flex-col md:w-2/3 w-full">
                        <BenefitItem
                            bImage={upload}
                            benefit="More Uploads"
                            descr="Will be able to upload more images. Also able to upload promotional video"
                        />
                        <BenefitItem
                            bImage={premium}
                            benefit="Proof"
                            descr="Be featured as top professional in your area according to the category you fall under."
                        />
                        <BenefitItem
                            bImage={text}
                            benefit="Replying"
                            descr=" People and possible clients can inbox you and chat with you as well as view your contact details."
                        />
                    </div>
                </div>
                <div className="right p-2 col-span-1">
                    <form action="" className="bg-white md:w-4/5 w-full rounded shadow flex flex-col p-8">
                        <p className="text-gray-700 font-semibold self-center">Become a Pro now</p>
                        <p className="text-gray-500 text-sm self-center mb-4">Choose your preferred PRO access plan</p>
                        <span className="bg-gray-100 p-2 rounded mx-2">
                            <p className="text-gray-500 text-sm">Pro plan</p>
                            <span className="flex flex-row">
                                <p className="text-gray-700 font-semibold">$85</p>
                                <p className="text-gray-500 text-sm">/mo</p>
                            </span>
                            <p className="flex-row text-gray-600 mt-1 flex">
                                <p className="text-green-900 text-sm font-semibold">Your PRO plan</p>
                                <InfoIcon fontSize="small" />
                            </p>
                        </span>
                        <div className="border-b my-4 border-gray-300"></div>
                        <div className="items mx-2 flex flex-col">
                            <p className="text-gray-600 font-semibold">Billing Information</p>
                            <div className="border-2 text-gray-300 mt-1 border-gray-300 flex mb-2 flex-row rounded p-1">
                                <input type="text" className="w-full" placeholder="Card Number" />
                                <CreditCardIcon />
                            </div>
                            <div className="two grid md:grid-cols-2 grid-cols-1 gap-2 items-center">
                                <input
                                    placeholder="Security Code"
                                    type="text"
                                    className="border-2 col-span-1 border-gray-300 text-gray-300 p-1 rounded" />
                                <input
                                    placeholder="CVV"
                                    type="text"
                                    className="border-2 col-span-1 border-gray-300 text-gray-300 p-1 rounded" />
                            </div>
                            <button className="bg-green-600 text-white rounded p-1 w-full mt-4">Upgrade Now</button>
                            <span className="text-xs flex flex-row mt-4 self-center items-center text-gray-400">
                                <LockRoundedIcon fontSize="small" />
                                <p className="text-xs text-gray-400">payment info is held secure in our servers</p>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </StoreDashboard>
    )
}

const BenefitItem = ({ bImage, benefit, descr }) => {
    return (
        <div className="flex flex-row items-center mb-4">
            <img src={bImage} alt="upload_icon" className="w-12 mr-2" />
            <div>
                <p className="text-gray-800 font-bold">{benefit}</p>
                <p className="text-sm text-gray-500">{descr}</p>
            </div>
        </div>
    )
}

export default Upgrade
