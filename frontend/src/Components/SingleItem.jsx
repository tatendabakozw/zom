import React from 'react'

const ItemCategory = ({ realatedcatefory }) => {
    return (
        <div className="similarcats bg-gray-100 rounded px-2 py-1 mx-2 my-1">
            <p className="text-xs text-gray-700 font-semibold">{realatedcatefory}</p>
        </div>
    )
}

export default ItemCategory
