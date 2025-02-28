import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function MediaProgressbar({ isMediaUploading, progress }) {
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        if (isMediaUploading) {
            setShowProgress(true);
            setAnimatedProgress(progress);
        } else if (progress >= 100) {
            setTimeout(() => setShowProgress(false), 1500); // 100% hone ke baad 1.5s me fade-out
        }
    }, [isMediaUploading, progress]);

    if (!showProgress) return null;

    return (
        <motion.div
            className="w-full bg-gray-300 rounded-full h-4 mt-5 mb-5 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-blue-600 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${animatedProgress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {/* Shimmer Effect When Uploading Completes */}
            {progress >= 100 && isMediaUploading && (
                <motion.div
                    className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                />
            )}
        </motion.div>
    );
}

export default MediaProgressbar;


