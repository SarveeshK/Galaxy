import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Check, AlertCircle, Loader2, ChevronRight, ChevronLeft, Upload, CreditCard } from 'lucide-react';
import PremiumCheck from '../components/PremiumCheck';
import CustomSelect from '../components/CustomSelect';
import Stepper, { Step } from '../components/Stepper';
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
  const [step, setStep] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Scroll to top when step changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  // Handle Main Back Button Logic
  const handleMainBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (eventName: string) => {
    const isChecked = formData.events.includes(eventName);

    setFormData(prev => {
      const newEvents = !isChecked
        ? [...prev.events, eventName]
        : prev.events.filter(event => event !== eventName);

      const newTeamDetails = { ...prev.teamDetails };

      if (!isChecked) {
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

  const validateStep1 = () => {
    if (formData.events.length === 0) {
      alert('Please select at least one event to proceed.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.college || !formData.department || !formData.year || !formData.gender) {
      alert('Please fill in all personal and academic details.');
      return false;
    }

    // Validate Team Details on Step 2
    for (const eventName of formData.events) {
      const eventDetails = Object.values(eventData).find(e => e.name === eventName);
      if (eventDetails && eventDetails.maxMembers > 1) {
        const teamInfo = formData.teamDetails[eventName];
        // Simple check: Lead details required
        if (!teamInfo?.leadName || !teamInfo?.leadPhone) {
          alert(`Please fill in Team Lead details for ${eventName}`);
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (GOOGLE_SCRIPT_URL.includes('REPLACE')) {
      alert('Please deploy the Google Script and update the URL in Register.tsx');
      return;
    }

    // Final check
    if (!formData.transactionId || !formData.paymentScreenshot) {
      alert('Please provide transaction ID and payment screenshot.');
      return;
    }

    const submissionData = {
      ...formData,
      events: formData.events,
      teamDetails: formData.teamDetails
    };

    submitToSheet(submissionData, GOOGLE_SCRIPT_URL);
  };

  const calculateTotal = () => {
    return formData.events.reduce((total, eventName) => {
      const event = Object.values(eventData).find(e => e.name === eventName);
      return total + (event?.price || 0);
    }, 0);
  };

  const techEvents = Object.values(eventData).filter(e => e.type === 'TECHNICAL');
  const nonTechEvents = Object.values(eventData).filter(e => e.type === 'NON TECHNICAL');
  const flagshipEvents = Object.values(eventData).filter(e => e.type === 'FLAGSHIP');

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg mx-auto p-8 glass-strong rounded-3xl border border-white/20 text-center shadow-[0_0_50px_rgba(255,255,255,0.1)]"
      >
        <div className="flex items-center justify-center mx-auto mb-6">
          <PremiumCheck className="w-24 h-24" />
        </div>
        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">REGISTRATION SUCCESSFUL!</h2>
        <p className="text-white/70 mb-8 font-light">
          Thank you for registering for Galaxy 2k26. A confirmation email has been sent to {formData.email}.
        </p>
        <button
          onClick={onBack}
          className="px-8 py-3 bg-white text-black font-orbitron text-sm font-bold tracking-widest hover:bg-slate-200 transition-colors rounded-none skew-x-[-10deg]"
        >
          <span className="skew-x-[10deg] inline-block">BACK TO HOME</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-5xl mx-auto pb-20 px-4"
    >
      <button
        onClick={handleMainBack}
        className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-light tracking-wide">
          {step > 1 ? 'PREVIOUS STEP' : 'BACK TO HOME'}
        </span>
      </button>

      {/* Progress Steps via New Stepper Component */}
      <div className="mb-10 max-w-2xl mx-auto">
        <Stepper
          initialStep={1}
          currentStepExternal={step}
          hideFooter={true} // We use our own buttons for validation & logic
        >
          {/* STEP 1: EVENT SELECTION */}
          <Step>
            <div className="backdrop-blur-md bg-black/60 rounded-3xl border border-white/20 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
              <div className="p-5 md:p-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="text-center mb-8">
                    <h2 className="font-orbitron text-3xl font-bold text-white mb-2 tracking-wider">EVENT SELECTION</h2>
                    <p className="text-slate-400 font-light">Technical: ₹200 | Non-Technical: ₹150</p>
                  </div>

                  {/* Flagship Events Grid - Highlighted */}
                  {flagshipEvents.length > 0 && (
                    <div className="mb-10 relative">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-purple-600/10 to-red-600/10 blur-xl opacity-50 animate-pulse"></div>

                      <div className="relative border border-red-500/30 bg-red-900/10 rounded-2xl p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2 border-l-2 border-red-500 pl-4">
                          Flagship Event
                          <span className="h-[1px] flex-grow bg-gradient-to-r from-red-500/50 to-transparent ml-4"></span>
                          <span className="px-2 py-0.5 bg-red-600 text-[10px] text-white rounded font-bold animate-pulse">FEATURED</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                          {flagshipEvents.map((event) => (
                            <EventCard
                              key={event.name}
                              event={event}
                              selected={formData.events.includes(event.name)}
                              onToggle={() => handleCheckboxChange(event.name)}
                              isFlagship={true}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Technical Events Grid */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.2em] border-l-2 border-white pl-4 flex items-center gap-2">
                      Technical Events
                      <span className="h-[1px] flex-grow bg-white/10 ml-4"></span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {techEvents.map((event) => (
                        <EventCard
                          key={event.name}
                          event={event}
                          selected={formData.events.includes(event.name)}
                          onToggle={() => handleCheckboxChange(event.name)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Non-Technical Events Grid */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.2em] border-l-2 border-white pl-4 flex items-center gap-2">
                      Non-Technical Events
                      <span className="h-[1px] flex-grow bg-white/10 ml-4"></span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {nonTechEvents.map((event) => (
                        <EventCard
                          key={event.name}
                          event={event}
                          selected={formData.events.includes(event.name)}
                          onToggle={() => handleCheckboxChange(event.name)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Total Panel */}
                  <div className="sticky bottom-4 z-20 bg-black/90 backdrop-blur-xl border border-white/20 p-4 rounded-xl flex justify-between items-center shadow-[0_0_30px_rgba(0,0,0,0.8)] gap-4">
                    <div className="flex flex-col">
                      <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mb-0.5">Total Amount</p>
                      <p className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wide">₹{calculateTotal()}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 md:px-8 bg-white text-black font-orbitron text-xs md:text-sm font-bold tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2 whitespace-nowrap rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-95"
                    >
                      NEXT STEP <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </Step>

          {/* STEP 2: PARTICIPANT & TEAM DETAILS */}
          <Step>
            <div className="backdrop-blur-xl bg-black/40 rounded-3xl border border-white/20 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
              <div className="p-5 md:p-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-2 tracking-wider">DETAILS</h2>
                    <p className="text-slate-400 font-light text-sm md:text-base">Personal & Team Information</p>
                  </div>

                  {/* Personal Details */}
                  <div className="space-y-6">
                    <h3 className="font-orbitron text-xs md:text-sm text-white/70 uppercase tracking-widest border-b border-white/10 pb-2">Personal info</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2 group">
                        <label className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-bold ml-1 group-focus-within:text-white transition-colors">Full Name</label>
                        <input
                          required
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/20 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-white focus:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white/50 transition-all font-orbitron tracking-wide text-sm"
                          placeholder="ENTER NAME"
                        />
                      </div>

                      {/* Email with Validation */}
                      <div className="space-y-2 group">
                        <label className={`text-[10px] md:text-xs uppercase tracking-widest font-bold ml-1 transition-colors ${formData.email && !formData.email.includes('@') ? 'text-red-400' : 'text-white/50 group-focus-within:text-white'
                          }`}>Email Address</label>
                        <div className={`
                           relative transition-all duration-300 rounded-lg
                           ${formData.email && !formData.email.includes('@')
                            ? 'bg-red-500/5 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                            : 'bg-transparent border border-white/20 focus-within:border-white focus-within:bg-white/5'
                          }
                        `}>
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`
                                w-full bg-transparent p-4 text-white placeholder:text-white/20 focus:outline-none transition-all font-orbitron tracking-wide text-sm rounded-lg
                                ${formData.email && !formData.email.includes('@') ? 'text-red-300' : ''}
                             `}
                            placeholder="EMAIL ID"
                          />
                          {formData.email && !formData.email.includes('@') && (
                            <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5 animate-pulse" />
                          )}
                          {formData.email && formData.email.includes('@') && (
                            <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {/* Phone Number - Digits Only */}
                      <div className="space-y-2 group">
                        <label className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-bold ml-1 group-focus-within:text-white transition-colors">Phone Number</label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData(prev => ({ ...prev, phone: val }));
                          }}
                          className="w-full bg-transparent border border-white/20 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-white focus:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white/50 transition-all font-orbitron tracking-widest text-sm"
                          placeholder="MOBILE NUMBER"
                        />
                      </div>

                      <div className="space-y-2">
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
                          placeholder="SELECT GENDER"
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-bold ml-1 group-focus-within:text-white transition-colors">College</label>
                        <input
                          required
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/20 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-white focus:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white/50 transition-all font-orbitron tracking-wide text-sm"
                          placeholder="COLLEGE NAME"
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-bold ml-1 group-focus-within:text-white transition-colors">Department</label>
                        <input
                          required
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full bg-transparent border border-white/20 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-white focus:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white/50 transition-all font-orbitron tracking-wide text-sm"
                          placeholder="DEPARTMENT (e.g. ECE)"
                        />
                      </div>
                      <div className="space-y-2">
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
                          placeholder="SELECT YEAR"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Team Details Section (Events with maxMembers > 1) */}
                  {formData.events.some(evName => {
                    const ev = Object.values(eventData).find(e => e.name === evName);
                    return ev && ev.maxMembers > 1;
                  }) && (
                      <div className="space-y-8 pt-8 border-t border-white/10">
                        <div className="text-center">
                          <h3 className="font-orbitron text-lg md:text-xl font-bold text-white tracking-wider">TEAM DETAILS</h3>
                          <p className="text-slate-400 text-xs md:text-sm font-light">Enter details for your team members</p>
                        </div>

                        {formData.events.map(eventName => {
                          const event = Object.values(eventData).find(e => e.name === eventName);
                          if (!event || event.maxMembers <= 1) return null;

                          return (
                            <div key={eventName} className="bg-white/5 border border-white/20 rounded-xl p-6 space-y-6 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                  <h4 className="font-orbitron font-bold text-base md:text-lg text-white">{event.name}</h4>
                                  <div className="bg-green-500/20 p-1 rounded-full">
                                    <Check className="w-3 h-3 text-green-400" />
                                  </div>
                                </div>
                                <span className="font-orbitron font-bold text-white text-base md:text-lg">₹{event.price}</span>
                              </div>

                              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Team Details ({event.teamSize})</p>

                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-[10px] text-white/50 uppercase font-bold">Lead Name</label>
                                  <input
                                    required
                                    type="text"
                                    placeholder="LEAD NAME"
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-white/50 outline-none transition-all font-orbitron tracking-wide"
                                    value={formData.teamDetails[event.name]?.leadName || ''}
                                    onChange={(e) => handleTeamDetailChange(event.name, 'leadName', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] text-white/50 uppercase font-bold">Lead Phone</label>
                                  <input
                                    required
                                    type="tel"
                                    placeholder="LEAD PHONE"
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-white/50 outline-none transition-all font-orbitron tracking-wide"
                                    value={formData.teamDetails[event.name]?.leadPhone || ''}
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                      handleTeamDetailChange(event.name, 'leadPhone', val);
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="space-y-4">
                                {formData.teamDetails[event.name]?.members.map((member: string, idx: number) => (
                                  <div key={idx} className="space-y-2">
                                    <label className="text-[10px] text-white/50 uppercase font-bold">Member {idx + 2}</label>
                                    <input
                                      type="text"
                                      placeholder={`MEMBER ${idx + 2} NAME`}
                                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-white/50 outline-none transition-all font-orbitron tracking-wide"
                                      value={member}
                                      onChange={(e) => handleTeamDetailChange(event.name, 'member', e.target.value, idx)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  <div className="sticky bottom-4 z-20 bg-black/90 backdrop-blur-xl border border-white/20 p-4 rounded-xl grid grid-cols-2 gap-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] mt-8">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-full px-4 py-3 border border-white/20 text-white font-orbitron text-xs md:text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2 tracking-widest rounded-lg"
                    >
                      <ChevronLeft size={16} /> BACK
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full px-4 py-3 bg-white text-black font-orbitron text-xs md:text-sm font-bold tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2 whitespace-nowrap rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-95"
                    >
                      NEXT STEP <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </Step>

          {/* STEP 3: PAYMENT */}
          <Step>
            <div className="backdrop-blur-xl bg-black/40 rounded-3xl border border-white/20 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
              <div className="p-5 md:p-12">
                <form onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="text-center mb-4">
                      <h2 className="font-orbitron text-3xl font-bold text-white mb-2 tracking-wider">PAYMENT</h2>
                      <p className="text-slate-400 font-light">Complete your registration</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      {/* Summary */}
                      <div className="space-y-6">
                        <h3 className="font-orbitron text-lg text-white border-b border-white/10 pb-3">ORDER SUMMARY</h3>
                        <div className="space-y-4">
                          {formData.events.map(eventName => {
                            const ev = Object.values(eventData).find(e => e.name === eventName);
                            return (
                              <div key={eventName} className="flex justify-between items-center text-sm">
                                <span className="text-slate-300">{eventName}</span>
                                <span className="text-white font-mono">₹{ev?.price}</span>
                              </div>
                            );
                          })}
                          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                            <span className="text-white font-bold uppercase tracking-wider">Total Payable</span>
                            <span className="text-2xl font-orbitron text-white font-bold">₹{calculateTotal()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div className="space-y-6">
                        <h3 className="font-orbitron text-lg text-white border-b border-white/10 pb-3">SCAN TO PAY</h3>

                        <div className="bg-white p-4 rounded-xl w-fit mx-auto shadow-xl">
                          <img src="/qr-code.png.jpeg" alt="QR Code" className="w-48 h-48 object-contain" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-xs text-slate-400 uppercase tracking-widest">UPI ID</p>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                            <span className="text-white font-mono text-sm">sarveeshkaarthic05@okhdfcbank</span>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <label className="text-xs text-white/60 uppercase tracking-widest font-bold ml-1">Transaction ID</label>
                            <div className="flex items-center gap-3 bg-black/30 border border-white/20 rounded-lg p-3">
                              <CreditCard size={18} className="text-white/50" />
                              <input
                                required
                                type="text"
                                name="transactionId"
                                value={formData.transactionId}
                                onChange={handleChange}
                                className="bg-transparent w-full text-white focus:outline-none font-mono tracking-widest"
                                placeholder="ENTER UTR / REF ID"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs text-white/60 uppercase tracking-widest font-bold ml-1">Upload Screenshot</label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 hover:border-white/40 transition-all">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {formData.paymentScreenshot ? (
                                  <div className="flex items-center gap-2 text-green-400">
                                    <Check size={24} />
                                    <p className="text-sm">Screenshot Uploaded</p>
                                  </div>
                                ) : (
                                  <>
                                    <Upload className="w-8 h-8 text-white/40 mb-2" />
                                    <p className="text-sm text-white/60">Click to upload image</p>
                                    <p className="text-xs text-white/40 mt-1">Max 5MB</p>
                                  </>
                                )}
                              </div>
                              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} required />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle size={18} />
                        {error}
                      </div>
                    )}

                    <div className="sticky bottom-4 z-20 bg-black/90 backdrop-blur-xl border border-white/20 p-4 rounded-xl grid grid-cols-2 gap-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] mt-8">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="w-full px-4 py-3 border border-white/20 text-white font-orbitron text-xs md:text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2 tracking-widest rounded-lg"
                      >
                        <ChevronLeft size={16} /> BACK
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 bg-white text-black font-orbitron text-xs md:text-sm font-bold tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2 whitespace-nowrap rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? <Loader2 className="animate-spin" /> : <Send size={16} />}
                        SUBMIT
                      </button>
                    </div>

                  </motion.div>
                </form>
              </div>
            </div>
          </Step>
        </Stepper>
      </div>
    </motion.div>
  );
}

// Helper Component for Event Card
function EventCard({ event, selected, onToggle, isFlagship = false }: any) {
  return (
    <div
      onClick={onToggle}
      className={`
           relative border transition-all duration-300 rounded-xl overflow-hidden group cursor-pointer
           ${selected
          ? (isFlagship
            ? 'bg-white/10 border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
            : 'bg-white/5 border-white shadow-[0_0_10px_rgba(255,255,255,0.05)]')
          : (isFlagship
            ? 'bg-transparent border-white/30 hover:border-white/60 hover:bg-white/5'
            : 'bg-transparent border-white/10 hover:border-white/30 hover:bg-white/5')}
        `}
      style={{ willChange: 'transform' }}
    >
      <div className="p-5 flex justify-between items-start gap-4">
        <div className="space-y-1 flex-1 pr-2">
          <div className="flex items-center gap-2">
            <h4 className={`font-orbitron font-bold text-sm md:text-base leading-tight break-words ${selected ? 'text-white' : 'text-slate-300'}`}>
              {event.name}
            </h4>
            {selected && (
              <div className="bg-green-500/20 p-0.5 rounded-full border border-green-500/50 shadow-[0_0_10px_rgba(74,222,128,0.3)] animate-in fade-in zoom-in duration-300 shrink-0">
                <Check className="w-3 h-3 text-green-400" strokeWidth={3} />
              </div>
            )}
          </div>
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold pt-1">
            {event.type}
          </p>
        </div>

        <div className="text-right flex flex-col items-end gap-1 shrink-0">
          <p className="font-orbitron text-white text-lg md:text-xl font-bold">₹{event.price}</p>
          {event.price === 0 && <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded font-bold uppercase">Free</span>}
        </div>
      </div>

      {/* Active Indicator Bar */}
      {selected && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50" />
      )}
    </div>
  );
}
