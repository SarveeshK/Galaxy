import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Home } from 'lucide-react';
import './PillNav.css';

export type PillNavItem = {
    label: string;
    id: string;
    ariaLabel?: string;
};

export interface PillNavProps {
    items: PillNavItem[];
    activeId?: string;
    className?: string;
    onNavigate: (id: string) => void;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    pillTextColor?: string;
}

const PillNav: React.FC<PillNavProps> = ({
    items,
    activeId,
    className = '',
    onNavigate,
    baseColor = '#000',
    pillColor = '#fff',
    hoveredPillTextColor = '#000',
    pillTextColor,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
    const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
    const navItemsRef = useRef<HTMLDivElement | null>(null);

    const ease = 'power3.easeOut';

    // ... (useEffect for GSAP remains same, skipping lines for brevity if possible, but replace tool needs context. I'll include it all to be safe or use strategic chunks)
    // Actually, I can keep the useEffect logic mostly as is, but I need to handle mobile view not running this layout logic if items are hidden.
    // Let's just wrap the return.

    useEffect(() => {
        // Only run layout logic on desktop or if items are visible
        if (window.innerWidth < 768) return;

        const layout = () => {
            // ... existing layout logic ...
            circleRefs.current.forEach(circle => {
                if (!circle?.parentElement) return;

                const pill = circle.parentElement as HTMLElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;

                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`
                });

                const label = pill.querySelector<HTMLElement>('.pill-label');
                const white = pill.querySelector<HTMLElement>('.pill-label-hover');

                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                const index = circleRefs.current.indexOf(circle);
                if (index === -1) return;

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.5, ease, overwrite: 'auto' }, 0);

                if (label) {
                    tl.to(label, { y: -20, duration: 0.5, ease, overwrite: 'auto' }, 0);
                }

                if (white) {
                    gsap.set(white, { y: 20, opacity: 0 });
                    tl.to(white, { y: 0, opacity: 1, duration: 0.5, ease, overwrite: 'auto' }, 0);
                }

                tlRefs.current[index] = tl;
            });
        };

        const timer = setTimeout(layout, 100);
        window.addEventListener('resize', layout);

        if (document.fonts?.ready) {
            document.fonts.ready.then(layout).catch(() => { });
        }

        // Removed initial load animation to keep header fixed/static
        // const navItems = navItemsRef.current;
        // if (navItems) {
        //     gsap.fromTo(navItems, { width: 0, opacity: 0 }, { width: 'auto', opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
        // }

        return () => {
            window.removeEventListener('resize', layout);
            clearTimeout(timer);
        };
    }, [items]);

    const handleEnter = (i: number) => {
        if (window.innerWidth < 768) return;
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.3,
            ease,
            overwrite: 'auto'
        });
    };

    const handleLeave = (i: number) => {
        if (window.innerWidth < 768) return;
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.2,
            ease,
            overwrite: 'auto'
        });
    };

    const resolvedPillTextColor = pillTextColor ?? baseColor;

    const cssVars = {
        ['--base']: baseColor,
        ['--pill-bg']: pillColor,
        ['--hover-text']: hoveredPillTextColor,
        ['--pill-text']: resolvedPillTextColor
    } as React.CSSProperties;

    return (
        <div className="pill-nav-container">
            {/* Desktop Navigation */}
            <nav className={`pill-nav ${className} desktop-only`} aria-label="Primary" style={cssVars}>
                <div className="pill-nav-items" ref={navItemsRef}>
                    <ul className="pill-list" role="menubar">
                        {items.map((item, i) => (
                            <li key={item.id} role="none">
                                <button
                                    role="menuitem"
                                    className={`pill${activeId === item.id ? ' is-active' : ''}`}
                                    aria-label={item.ariaLabel || item.label}
                                    onClick={() => onNavigate(item.id)}
                                    onMouseEnter={() => handleEnter(i)}
                                    onMouseLeave={() => handleLeave(i)}
                                >
                                    <span
                                        className="hover-circle"
                                        aria-hidden="true"
                                        ref={el => { circleRefs.current[i] = el; }}
                                    />
                                    <span className="label-stack">
                                        <span className="pill-label">{item.label}</span>
                                        <span className="pill-label-hover" aria-hidden="true">
                                            {item.label}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className="mobile-only pointer-events-auto">
                {/* Hamburger Button (Left) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileMenuOpen(true);
                    }}
                    className="fixed top-6 left-6 z-[200] p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/20 transition-all cursor-pointer group"
                    aria-label="Open Menu"
                >
                    <Menu size={24} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* Home Button (Right) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('home');
                    }}
                    className="fixed top-6 right-6 z-[200] p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/20 transition-all cursor-pointer group"
                    aria-label="Go Home"
                >
                    <Home size={24} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* Click Here Hint - Static, No Icon */}
                <div className="fixed top-24 left-6 z-[190] bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-3 pointer-events-none">
                    <div className="text-white/80 text-xs font-orbitron tracking-wider">
                        CLICK FOR MENU
                    </div>
                </div>

                {/* Full Screen Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onNavigate(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-2xl font-orbitron font-bold tracking-widest uppercase transition-all duration-300 ${activeId === item.id
                                        ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                                        : 'text-white/40 hover:text-white hover:scale-105'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            {/* Explicit Register Option for Mobile if not in items */}
                            <button
                                onClick={() => {
                                    onNavigate('register');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="px-8 py-3 mt-4 bg-white text-black font-orbitron font-bold rounded-full hover:bg-slate-200 transition-colors"
                            >
                                REGISTER
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default PillNav;
