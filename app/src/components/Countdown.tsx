import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function Countdown() {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date('2026-02-26T18:00:00') - +new Date();
        let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[90px] flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <span className="font-orbitron text-2xl md:text-4xl font-bold text-white tracking-widest">
                    {value.toString().padStart(2, '0')}
                </span>
            </div>
            <span className="text-white/40 text-[10px] md:text-xs mt-2 uppercase tracking-[0.2em] font-orbitron">
                {label}
            </span>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrapjustify-center items-center mb-12"
        >
            <TimeUnit value={timeLeft.days} label="Days" />
            <span className="text-white/20 text-2xl md:text-4xl pb-6">:</span>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <span className="text-white/20 text-2xl md:text-4xl pb-6">:</span>
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <span className="text-white/20 text-2xl md:text-4xl pb-6">:</span>
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>
    );
}
