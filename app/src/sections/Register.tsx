import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import useGoogleSheet from '../hooks/useGoogleSheet';

// PLACHOLDER - User needs to replace this after deploying their script
const GOOGLE_SCRIPT_URL = 'REPLACE_WITH_YOUR_DEPLOYED_GOOGLE_SCRIPT_URL';

interface RegisterProps {
  onBack: () => void;
  onLogin: () => void;
}

export default function Register({ onBack }: RegisterProps) {
  const { submitToSheet, loading, error, success } = useGoogleSheet();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    college: '',
    department: '',
    year: '',
    rollNo: '',
    events: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      events: checked
        ? [...prev.events, value]
        : prev.events.filter(event => event !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (GOOGLE_SCRIPT_URL.includes('REPLACE')) {
      alert('Please deploy the Google Script and update the URL in Register.tsx');
      return;
    }
    submitToSheet(formData, GOOGLE_SCRIPT_URL);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto p-8 glass-strong rounded-3xl border border-white/10 text-center"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">REGISTRATION SUCCESSFUL!</h2>
        <p className="text-white/70 mb-8">
          Thank you for registering for Galaxy 2k26. A confirmation email has been sent to {formData.email}.
        </p>
        <button
          onClick={onBack}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-orbitron text-sm transition-colors"
        >
          BACK TO HOME
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-4xl mx-auto pb-20"
    >
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to Home</span>
      </button>

      <div className="backdrop-blur-xl bg-black/30 rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="font-orbitron text-3xl font-bold text-white mb-2 text-center tracking-wider">REGISTER FOR GALAXY 2K26</h2>
          <p className="text-white/60 text-center mb-10">Fill in your details to participate</p>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Personal Details */}
            <div className="space-y-6">
              <h3 className="font-orbitron text-xl text-cyan-400 border-b border-white/10 pb-4 tracking-wider">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-bold ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-bold ml-1">Gender</label>
                  <select
                    required
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-black text-gray-500">Select Gender</option>
                    <option value="Male" className="bg-black">Male</option>
                    <option value="Female" className="bg-black">Female</option>
                    <option value="Other" className="bg-black">Other</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-bold ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-bold ml-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-6">
              <h3 className="font-orbitron text-xl text-cyan-400 border-b border-white/10 pb-4 tracking-wider">Academic Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-bold ml-1">College Name</label>
                  <input
                    required
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="Your College Name"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-bold ml-1">Roll Number</label>
                  <input
                    required
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="College Roll No"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-bold ml-1">Department</label>
                  <input
                    required
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="e.g. ECE, CSE"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-bold ml-1">Year of Study</label>
                  <select
                    required
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-black text-gray-500">Select Year</option>
                    <option value="1" className="bg-black">1st Year</option>
                    <option value="2" className="bg-black">2nd Year</option>
                    <option value="3" className="bg-black">3rd Year</option>
                    <option value="4" className="bg-black">4th Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Event Selection */}
            <div className="space-y-8">
              <h3 className="font-orbitron text-xl text-cyan-400 border-b border-white/10 pb-4 tracking-wider">Event Registration</h3>

              {/* Technical Events */}
              <div>
                <h4 className="font-orbitron text-sm text-white/80 mb-4 tracking-wider border-l-2 border-cyan-500 pl-3">TECHNICAL EVENTS</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {['Research Paper Presentation', 'Project War', 'AI Prompt Battle', 'Arduino Hackathon', 'Circuit Debugging'].map((event) => (
                    <label key={event} className={`
                      flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300
                      ${formData.events.includes(event)
                        ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'}
                    `}>
                      <div className={`
                        w-6 h-6 rounded flex items-center justify-center border transition-all duration-300
                        ${formData.events.includes(event) ? 'bg-cyan-500 border-cyan-500' : 'border-white/30'}
                      `}>
                        {formData.events.includes(event) && <CheckCircle className="w-4 h-4 text-black" />}
                      </div>
                      <input
                        type="checkbox"
                        value={event}
                        checked={formData.events.includes(event)}
                        onChange={handleCheckboxChange}
                        className="hidden"
                      />
                      <span className={`text-sm font-medium transition-colors ${formData.events.includes(event) ? 'text-white' : 'text-white/70'}`}>
                        {event}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Non-Technical Events */}
              <div>
                <h4 className="font-orbitron text-sm text-white/80 mb-4 tracking-wider border-l-2 border-purple-500 pl-3">NON-TECHNICAL EVENTS</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {['IPL Auction', 'Short Film', 'HintDrop', 'Spin And Win', 'Stranger Things', 'Photography'].map((event) => (
                    <label key={event} className={`
                      flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300
                      ${formData.events.includes(event)
                        ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'}
                    `}>
                      <div className={`
                        w-6 h-6 rounded flex items-center justify-center border transition-all duration-300
                        ${formData.events.includes(event) ? 'bg-purple-500 border-purple-500' : 'border-white/30'}
                      `}>
                        {formData.events.includes(event) && <CheckCircle className="w-4 h-4 text-black" />}
                      </div>
                      <input
                        type="checkbox"
                        value={event}
                        checked={formData.events.includes(event)}
                        onChange={handleCheckboxChange}
                        className="hidden"
                      />
                      <span className={`text-sm font-medium transition-colors ${formData.events.includes(event) ? 'text-white' : 'text-white/70'}`}>
                        {event}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-orbitron font-bold text-white tracking-widest hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  REGISTERING...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  SUBMIT REGISTRATION
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </motion.div>
  );
}
