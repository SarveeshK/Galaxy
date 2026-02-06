import { motion } from 'framer-motion';

export default function PremiumCheck({ className = "w-20 h-20" }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />

            <svg
                viewBox="0 0 52 52"
                className="w-full h-full relative z-10"
            >
                <motion.circle
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <motion.path
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}
