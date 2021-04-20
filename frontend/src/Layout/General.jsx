import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Grid from '@material-ui/core/Grid';
import { motion } from "framer-motion"

function General({ children }) {
    return (
        <div>
            <div className="header">
                <Navbar />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen md:pt-16 pt-24 bg-gray-50 dark:bg-gray-900">
                {children}
            </motion.div>
            <Grid className="footer">
                <Footer />
            </Grid>
        </div>
    )
}

export default General
