import React, { useEffect, useState } from 'react'

function useDarkMode() {



    const [theme, setTheme] = useState(localStorage.getItem('zomtheme'))


    const colorTheme = theme === 'dark' ? 'light' : 'dark';
    useEffect(() => {
        if (localStorage.getItem('zomtheme') === null) {
            localStorage.setItem('zomtheme', 'light')
        }
        const root = window.document.documentElement;

        root.classList.remove(colorTheme)
        root.classList.add(theme)
        localStorage.setItem('zomtheme', theme)
    }, [theme, colorTheme])

    return [colorTheme, setTheme]
}

export default useDarkMode
