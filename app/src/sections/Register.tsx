import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Check, AlertCircle, Loader2, Users, User, Phone } from 'lucide-react';
import PremiumCheck from '../components/PremiumCheck';
import CustomSelect from '../components/CustomSelect';
import useGoogleSheet from '../hooks/useGoogleSheet';
import { eventData } from '../data/events';

// PLACHOLDER - User needs to replace this after deploying their script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8jpAeeTrsy3mFo3kjhF8r6-PLUSFB9Z4FyspTmRb6IOhIoIB_IbT5myojpXY2V72qow/exec';

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
    events: [] as string[],
    transactionId: '',
    paymentScreenshot: '',
    teamDetails: {} as Record<string, {
      leadName: string;
      leadPhone: string;
      members: string[];
    }>
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const eventName = value;

    setFormData(prev => {
      const newEvents = checked
        ? [...prev.events, eventName]
        : prev.events.filter(event => event !== eventName);

      const newTeamDetails = { ...prev.teamDetails };

      if (checked) {
        // Initialize team details if checking a team event
        const eventConfig = Object.values(eventData).find(e => e.name === eventName);
        if (eventConfig && eventConfig.maxMembers > 1) {
          newTeamDetails[eventName] = {
            leadName: '',
            leadPhone: '',
            members: Array(eventConfig.maxMembers - 1).fill('')
          };
        }
      } else {
        // Remove team details if unchecking
        delete newTeamDetails[eventName];
      }

      return {
        ...prev,
        events: newEvents,
        teamDetails: newTeamDetails
      };
    });
  };

  const handleTeamDetailChange = (eventName: string, field: 'leadName' | 'leadPhone' | 'member', value: string, index?: number) => {
    setFormData(prev => {
      const currentDetails = prev.teamDetails[eventName] || { leadName: '', leadPhone: '', members: [] };

      if (field === 'member' && typeof index === 'number') {
        const newMembers = [...currentDetails.members];
        newMembers[index] = value;
        return {
          ...prev,
          teamDetails: {
            ...prev.teamDetails,
            [eventName]: { ...currentDetails, members: newMembers }
          }
        };
      }

      return {
        ...prev,
        teamDetails: {
          ...prev.teamDetails,
          [eventName]: { ...currentDetails, [field]: value }
        }
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, paymentScreenshot: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (GOOGLE_SCRIPT_URL.includes('REPLACE')) {
      alert('Please deploy the Google Script and update the URL in Register.tsx');
      return;
    }
    // Validate Events
    if (formData.events.length === 0) {
      alert('Please select at least one event');
      return;
    }

    // Validate Team Members
    for (const eventName of formData.events) {
      const eventDetails = eventData[Object.keys(eventData).find(key => eventData[key].name === eventName) as string];
      if (eventDetails && eventDetails.maxMembers > 1) {
        const teamInfo = formData.teamDetails[eventName];
        if (!teamInfo || !teamInfo.leadName || !teamInfo.leadPhone) {
          // HTML5 validation might catch this if visible, but good to be safe.
          // Actually, HTML5 required attribute on hidden inputs (if tab switched) might not block submit or might be buggy.
          // The inputs are in the DOM if event is checked.
        }

        const filledMembers = teamInfo?.members.filter(m => m.trim()).length || 0;
        const requiredAdditional = eventDetails.minMembers - 1;

        if (filledMembers < requiredAdditional) {
          alert(`Please enter at least ${requiredAdditional} additional team member(s) for ${eventName}.`);
          return;
        }
      }
    }

    // Prepare data for submission
    // Format events to include team details for the sheet
    const formattedEvents = formData.events.map(eventName => {
      const details = formData.teamDetails[eventName];
      if (details) {
        const memberString = details.members.filter(m => m.trim()).join(', ');
        return `${eventName} [Lead: ${details.leadName} (${details.leadPhone})${memberString ? `, Members: ${memberString}` : ''}]`;
      }
      return eventName;
    });

    const submissionData = {
      ...formData,
      events: formattedEvents // Override array with formatted strings (hook will likely join them)
    };

    submitToSheet(submissionData, GOOGLE_SCRIPT_URL);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto p-8 glass-strong rounded-3xl border border-white/10 text-center"
      >
        <div className="flex items-center justify-center mx-auto mb-6">
          <PremiumCheck className="w-24 h-24" />
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

  const techEvents = Object.values(eventData).filter(e => e.type === 'TECHNICAL');
  const nonTechEvents = Object.values(eventData).filter(e => e.type === 'NON TECHNICAL');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-4xl mx-auto pb-20"
    >
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to Home</span>
      </button>

      <div className="backdrop-blur-xl bg-black/30 rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="font-orbitron text-3xl font-bold text-white mb-2 text-center tracking-wider">REGISTER FOR GALAXY 2K26</h2>
          <p className="text-white/90 text-center mb-10">Fill in your details to participate</p>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Personal Details */}
            <div className="space-y-6">
              <h3 className="font-orbitron text-xl text-white border-b border-white/10 pb-4 tracking-wider">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs text-slate-200 uppercase tracking-widest font-bold ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/60 focus:border-slate-300 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-3">
                  <CustomSelect
                    label="Gender"
                    required
                    value={formData.gender}
                    onChange={(val) => setFormData(prev => ({ ...prev, gender: val }))}
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                      { value: 'Other', label: 'Other' }
                    ]}
                    placeholder="Select Gender"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-slate-200 uppercase tracking-widest font-bold ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/60 focus:border-slate-300 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-slate-200 uppercase tracking-widest font-bold ml-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/60 focus:border-slate-300 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-6">
              <h3 className="font-orbitron text-xl text-white border-b border-white/10 pb-4 tracking-wider">Academic Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs text-slate-200 uppercase tracking-widest font-bold ml-1">College Name</label>
                  <input
                    required
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/60 focus:border-slate-300 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="Your College Name"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs text-slate-200 uppercase tracking-widest font-bold ml-1">Department</label>
                  <input
                    required
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/60 focus:border-slate-300 focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="e.g. ECE, CSE"
                  />
                </div>
                <div className="space-y-3">
                  <CustomSelect
                    label="Year of Study"
                    required
                    value={formData.year}
                    onChange={(val) => setFormData(prev => ({ ...prev, year: val }))}
                    options={[
                      { value: '1', label: '1st Year' },
                      { value: '2', label: '2nd Year' },
                      { value: '3', label: '3rd Year' },
                      { value: '4', label: '4th Year' }
                    ]}
                    placeholder="Select Year"
                  />
                </div>
              </div>
            </div>

            {/* Event Selection */}
            <div className="space-y-8">
              <h3 className="font-orbitron text-xl text-white border-b border-white/10 pb-4 tracking-wider">Event Registration</h3>

              {/* Technical Events */}
              <div>
                <h4 className="font-orbitron text-sm text-white/80 mb-4 tracking-wider border-l-2 border-white pl-3">TECHNICAL EVENTS</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {techEvents.map((event) => (
                    <div key={event.name} className="flex flex-col gap-2">
                      <label className={`
                        flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300
                        ${formData.events.includes(event.name)
                          ? 'bg-white/10 border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'}
                      `}>
                        <div className={`
                          w-6 h-6 rounded flex items-center justify-center border transition-all duration-300
                          ${formData.events.includes(event.name)
                            ? 'bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] scale-110'
                            : 'border-white/30 group-hover:border-white/50'}
                        `}>
                          {formData.events.includes(event.name) && <Check className="w-4 h-4 text-black stroke-[3]" />}
                        </div>
                        <input
                          type="checkbox"
                          value={event.name}
                          checked={formData.events.includes(event.name)}
                          onChange={handleCheckboxChange}
                          className="hidden"
                        />
                        <span className={`text-sm font-medium transition-colors ${formData.events.includes(event.name) ? 'text-white' : 'text-white/70'}`}>
                          {event.name}
                        </span>
                      </label>

                      {/* Team Details Section */}
                      <AnimatePresence>
                        {formData.events.includes(event.name) && event.maxMembers > 1 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white/5 rounded-xl p-4 border border-white/10 ml-4 border-l-2 border-l-slate-300 space-y-4"
                          >
                            <p className="text-xs text-white uppercase tracking-widest font-bold mb-2">Team Details ({event.teamSize})</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs md:text-sm text-white/50 uppercase block mb-1">Team Lead Name</label>
                                <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/10">
                                  <User size={16} className="text-white" />
                                  <input
                                    required
                                    type="text"
                                    placeholder="Name"
                                    className="bg-transparent w-full text-sm text-white outline-none placeholder:text-white/20"
                                    value={formData.teamDetails[event.name]?.leadName || ''}
                                    onChange={(e) => handleTeamDetailChange(event.name, 'leadName', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-xs md:text-sm text-white/50 uppercase block mb-1">Phone</label>
                                <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/10">
                                  <Phone size={16} className="text-slate-300" />
                                  <input
                                    required
                                    type="tel"
                                    placeholder="Phone"
                                    className="bg-transparent w-full text-sm text-white outline-none placeholder:text-white/20"
                                    value={formData.teamDetails[event.name]?.leadPhone || ''}
                                    onChange={(e) => handleTeamDetailChange(event.name, 'leadPhone', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Additional Members */}
                            <div className="space-y-3">
                              {formData.teamDetails[event.name]?.members.map((member, index) => (
                                <div key={index}>
                                  <label className="text-xs md:text-sm text-white/50 uppercase block mb-1">Team Member {index + 2} Name</label>
                                  <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/10">
                                    <Users size={16} className="text-white/40" />
                                    <input
                                      type="text"
                                      placeholder="Member Name (Optional)"
                                      className="bg-transparent w-full text-sm text-white outline-none placeholder:text-white/20"
                                      value={member}
                                      onChange={(e) => handleTeamDetailChange(event.name, 'member', e.target.value, index)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Technical Events */}
              <div>
                <h4 className="font-orbitron text-sm text-white/80 mb-4 tracking-wider border-l-2 border-white pl-3">NON-TECHNICAL EVENTS</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {nonTechEvents.map((event) => (
                    <div key={event.name} className="flex flex-col gap-2">
                      <label className={`
                        flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300
                        ${formData.events.includes(event.name)
                          ? 'bg-white/10 border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'}
                      `}>
                        <div className={`
                          w-6 h-6 rounded flex items-center justify-center border transition-all duration-300
                          ${formData.events.includes(event.name)
                            ? 'bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] scale-110'
                            : 'border-white/30 group-hover:border-white/50'}
                        `}>
                          {formData.events.includes(event.name) && <Check className="w-4 h-4 text-black stroke-[3]" />}
                        </div>
                        <input
                          type="checkbox"
                          value={event.name}
                          checked={formData.events.includes(event.name)}
                          onChange={handleCheckboxChange}
                          className="hidden"
                        />
                        <span className={`text-sm font-medium transition-colors ${formData.events.includes(event.name) ? 'text-white' : 'text-white/70'}`}>
                          {event.name}
                        </span>
                      </label>

                      {/* Team Details Section */}
                      <AnimatePresence>
                        {formData.events.includes(event.name) && event.maxMembers > 1 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white/5 rounded-xl p-4 border border-white/10 ml-4 border-l-2 border-l-slate-400 space-y-4"
                          >
                            <p className="text-xs text-slate-300 uppercase tracking-widest font-bold mb-2">Team Details ({event.teamSize})</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs md:text-sm text-white/50 uppercase block mb-1">Team Lead Name</label>
                                <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/10">
                                  <User size={16} className="text-slate-300" />
                                  <input
                                    required
                                    type="text"
                                    placeholder="Name"
                                    className="bg-transparent w-full text-sm text-white outline-none placeholder:text-white/20"
                                    value={formData.teamDetails[event.name]?.leadName || ''}
                                    onChange={(e) => handleTeamDetailChange(event.name, 'leadName', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-xs md:text-sm text-white/50 uppercase block mb-1">Phone</label>
                                <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/10">
                                  <Phone size={16} className="text-white" />
                                  <input
                                    required
                                    type="tel"
                                    placeholder="Phone"
                                    className="bg-transparent w-full text-sm text-white outline-none placeholder:text-white/20"
                                    value={formData.teamDetails[event.name]?.leadPhone || ''}
                                    onChange={(e) => handleTeamDetailChange(event.name, 'leadPhone', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Additional Members */}
                            <div className="space-y-3">
                              {formData.teamDetails[event.name]?.members.map((member, index) => (
                                <div key={index}>
                                  <label className="text-xs md:text-sm text-white/50 uppercase block mb-1">Team Member {index + 2} Name</label>
                                  <div className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/10">
                                    <Users size={16} className="text-white/40" />
                                    <input
                                      type="text"
                                      placeholder="Member Name (Optional)"
                                      className="bg-transparent w-full text-sm text-white outline-none placeholder:text-white/20"
                                      value={member}
                                      onChange={(e) => handleTeamDetailChange(event.name, 'member', e.target.value, index)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <h3 className="font-orbitron text-xl text-white border-b border-white/10 pb-4 tracking-wider">Payment Verification</h3>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col gap-6">

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* QR Code Placeholder/Area */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                      {/* QR Code Image */}
                      <img
                        src="/qr-code.png.jpeg"
                        alt="Payment QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs text-white/50 tracking-wider">sarveeshkaarthic05@okhdfcbank</span>
                  </div>

                  <div className="flex-grow space-y-4">
                    <p className="text-white">
                      Registration Fee: <span className="text-xl font-bold text-white">Tech: ₹200 | Non-Tech: ₹100</span>
                    </p>
                    <p className="text-sm text-white/90">
                      Please complete the payment using GPay, PhonePe, or Paytm.
                      Then enter the Transaction ID and upload the payment screenshot below.
                    </p>

                    <div className="space-y-3">
                      <label className="text-xs text-slate-200 uppercase tracking-widest font-bold ml-1">Transaction ID (UTR)</label>
                      <input
                        required
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-white placeholder-white/60 focus:border-white/50 focus:outline-none tracking-widest font-mono"
                        placeholder="e.g. 304218931284"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <label className="text-xs text-slate-200 uppercase tracking-widest font-bold ml-1">Upload Payment Screenshot (Max 5MB)</label>
                  <input
                    required
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer"
                  />
                  <p className="text-xs text-white/60">* Required for verification</p>
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
              className="w-full py-4 bg-white/10 border border-white/20 rounded-xl font-orbitron font-bold text-white tracking-widest hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
