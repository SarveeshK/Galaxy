import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Instagram, Youtube } from 'lucide-react';

export default function Contact() {
  return (
    <footer id="contact" className="relative pt-32 pb-12 px-4 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="font-orbitron text-2xl font-bold text-white tracking-wider">GALAXY 2K26</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              The National Level Technical Symposium organized by the Department of ECE.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/gce._.galaxy26?igsh=bTg4Ym1ucnV6NWtw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@galaxyece_gcee?si=yT44m4tvgZmTTQdo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron text-sm font-bold text-white mb-6 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-4">
              {['Events', 'Timeline', 'Register'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-orbitron text-sm font-bold text-white mb-6 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-sm text-gray-500">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                <span>Government College of Engineering,<br />Erode - 638316</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-gray-500">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <a href="mailto:galaxyece2k26@gmail.com" className="hover:text-white transition-colors">galaxyece2k26@gmail.com</a>
              </li>
              <li className="flex items-center gap-4 text-sm text-gray-500">
                <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
            </ul>
          </div>

          {/* Coordinators */}
          <div>
            <h3 className="font-orbitron text-sm font-bold text-white mb-6 uppercase tracking-wider">Faculty Coordinators</h3>
            <ul className="space-y-4">
              <li className="group cursor-pointer">
                <p className="text-white text-sm font-medium group-hover:text-gray-300 transition-colors">Dr. P. Example</p>
                <p className="text-gray-600 text-xs mt-1">HOD, Dept of ECE</p>
              </li>
              <li className="group cursor-pointer">
                <p className="text-white text-sm font-medium group-hover:text-gray-300 transition-colors">Prof. S. Sample</p>
                <p className="text-gray-600 text-xs mt-1">Staff Coordinator</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 Galaxy Symposium. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
