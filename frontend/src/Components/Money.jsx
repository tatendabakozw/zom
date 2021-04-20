import React, { useEffect, useState } from 'react'

function Money({ amount, currency }) {
    const [dispCurr, setDispCurr] = useState('')
    console.log(currency)

    useEffect(() => {
        if (currency === 'zwl') {
            setDispCurr(amount * 83.2155)
        } else {
            setDispCurr(amount)
        }
    }, [currency])

    return (
        <>
            <span className="flex flex-row items-center">
                <p>{parseFloat(dispCurr).toFixed(2)}</p>
                <p className={`bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-1 text-xs rounded font-light text-gray-700`}>{currency}</p>
            </span>
        </>
    )
}

export default Money
