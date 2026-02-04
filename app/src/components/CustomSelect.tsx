import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
}

export default function CustomSelect({
    options,
    value,
    onChange,
    placeholder = 'Select',
    label,
    required
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedLabel = options.find(opt => opt.value === value)?.label || '';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="space-y-3" ref={containerRef}>
            {label && (
                <label className="text-xs text-slate-200 uppercase tracking-widest font-bold ml-1">
                    {label} {required && <span className="text-red-400">*</span>}
                </label>
            )}

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
            w-full bg-white/5 border rounded-xl p-4 text-left flex items-center justify-between
            transition-all duration-300 outline-none
            ${isOpen ? 'border-slate-300 bg-white/10 ring-1 ring-slate-300/50' : 'border-white/10 hover:border-white/30'}
          `}
                >
                    <span className={`${value ? 'text-white' : 'text-white/40'}`}>
                        {value ? selectedLabel : placeholder}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                        >
                            <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`
                      w-full px-4 py-3 text-left flex items-center justify-between text-sm transition-colors
                      ${value === option.value ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}
                    `}
                                    >
                                        <span>{option.label}</span>
                                        {value === option.value && <Check className="w-4 h-4 text-slate-200" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
