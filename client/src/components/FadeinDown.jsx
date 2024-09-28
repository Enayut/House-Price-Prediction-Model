import React from "react";
import { motion } from "framer-motion";

function FadeInDownComponent({content}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="container mx-auto text-center"
        >
            {content}
        </motion.div>
    );
}

export default FadeInDownComponent;