import React from 'react'
import search from '../Images/searching.svg'
import referal from '../Images/referral.svg'
import analytics from '../Images/analyticsB.svg'
import General from '../Layout/General'

function Howitworks() {
    return (
        <General>
            <div  className="flex flex-col items-center md:px-36 px-8 pt-8">
                <p className="bg-green-100 self-center text-sm font-semibold text-green-900 p-1 rounded">How it works?</p>
                <p className="text-gray-700 dark:text-gray-200 md:text-xl text-sm text-center font-semibold self-center mt-4 mb-16">How to use the ZimOnlineMarket platform</p>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 items-center justify-between">
                    <HowItem
                        pic={search}
                        text="Search professional from around your area"
                        className={'col-span-1'}
                    />
                    <HowItem
                        pic={referal}
                        className={'col-span-1'}
                        text="Professionals create accounts and manage their services and stock while users can use referrals to connect professionals and clients"
                    />
                    <HowItem
                        pic={analytics}
                        className={'col-span-1'}
                        text="Analyse growth of your business and manage your customers using analytics dashboard"
                    />
                </div>
                <p className="bg-green-100 self-center text-sm font-semibold text-green-900 my-8 p-1 rounded">ZimOnlineMarket overflow</p>
                <p className="text-center  dark:text-white">How the store works? and how to share</p>

            </div>
        </General>
    )
}

const HowItem = ({pic, text, className}) => {
    return (
        <div className={`${className} flex flex-col w-60  mb-2 items-center`}>
            <div className="imag w-40 md:h-40 h-28 md:mb-4 mb-16">
                <img src={pic} alt="search_svg" />
            </div>
            <p className="text-gray-700 dark:text-white text-sm text-center">{text}</p>
        </div>
    )
}

export default Howitworks
