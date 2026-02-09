import { motion } from 'framer-motion';
import { Check, X, Info, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onDismiss: (id: string) => void;
}

const ToastIcon = ({ type }: { type: ToastType }) => {
    switch (type) {
        case 'success': return <Check size={18} className="text-green-400" />;
        case 'error': return <X size={18} className="text-red-400" />;
        case 'warning': return <AlertTriangle size={18} className="text-yellow-400" />;
        default: return <Info size={18} className="text-blue-400" />;
    }
};

const ToastBorderColor = (type: ToastType) => {
    switch (type) {
        case 'success': return 'border-green-500/30';
        case 'error': return 'border-red-500/30';
        case 'warning': return 'border-yellow-500/30';
        default: return 'border-blue-500/30';
    }
};

export default function Toast({ id, message, type, onDismiss }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(id);
        }, 5000);

        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`
        relative flex items-center gap-3 w-full max-w-sm p-4 rounded-xl 
        bg-black/80 backdrop-blur-md border shadow-lg 
        ${ToastBorderColor(type)}
      `}
        >
            <div className={`p-2 rounded-full bg-white/5 border border-white/5`}>
                <ToastIcon type={type} />
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-white/90 font-orbitron tracking-wide">
                    {message}
                </p>
            </div>
            <button
                onClick={() => onDismiss(id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
                <X size={14} className="text-white/40" />
            </button>

            {/* Progress Bar */}
            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-[2px] ${type === 'success' ? 'bg-green-500/50' :
                    type === 'error' ? 'bg-red-500/50' :
                        type === 'warning' ? 'bg-yellow-500/50' :
                            'bg-blue-500/50'
                    }`}
            />
        </motion.div>
    );
}
