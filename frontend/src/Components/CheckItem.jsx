import React, { useState } from 'react'
import RemoveIcon from '@material-ui/icons/Remove';

const CheckItem = ({ text, category }) => {
    const [filterCategory, setFilterCategory] = useState('')
    
    return (
        <div className="home lg:flex md:none  flex-row items-center text-gray-500 dark:text-white text-sm">
            <span onClick={() => setFilterCategory(category)} className="flex my-2 flex-row hover:underline hover:text-green-600 cursor-pointer items-center">
                <RemoveIcon/>
                <p className="text-gray-700 dark:text-gray-100 text-xs">{text}</p>
            </span>
        </div>
    )
}

export default CheckItem
