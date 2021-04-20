import React from 'react'
import { motion } from "framer-motion"
import DashboardFooter from '../Components/DashboardFooter'
import DashboardNav from '../Components/DashboardNav'

function StoreDashboard({ children }) {
    return (
        <div>
            <div className="nav">
                <DashboardNav />
            </div>
            <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="body min-h-screen px-2 pt-24 bg-gray-50 dark:bg-gray-900">
                {children}
            </motion.div>
            <DashboardFooter />
        </div>
    )
}

export default StoreDashboard
