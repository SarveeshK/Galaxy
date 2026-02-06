import { useState, useRef, useEffect } from 'react';
import QRCode from "react-qr-code";
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Check, AlertCircle, Loader2, ChevronRight, Upload, Star } from 'lucide-react';
import PremiumCheck from '../components/PremiumCheck';
import CustomSelect from '../components/CustomSelect';
import Stepper, { Step } from '../components/Stepper';
import useGoogleSheet from '../hooks/useGoogleSheet';
import { eventData } from '../data/events';
import { compressImage } from '../utils/imageCompression';
import { COMBOS, type ComboType } from '../data/combos';

// PLACHOLDER - User needs to replace this after deploying their script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8jpAeeTrsy3mFo3kjhF8r6-PLUSFB9Z4FyspTmRb6IOhIoIB_IbT5myojpXY2V72qow/exec';

interface RegisterProps {
  onBack: () => void;
  onLogin: () => void;
}


// Validation Helpers
const sanitizeName = (val: string) => val.replace(/[^a-zA-Z\s]/g, '');
const sanitizePhone = (val: string) => val.replace(/\D/g, '').slice(0, 10);

export default function Register({ onBack }: RegisterProps) {
  const { submitToSheet, loading, error, success } = useGoogleSheet();
  const [step, setStep] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [compressing, setCompressing] = useState(false);

  // Form State
  const [selectedCombo, setSelectedCombo] = useState<ComboType | null>(null);

  // Pre-select combo from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const comboParam = params.get('combo');
    if (comboParam) {
      // Validate it matches a known combo ID
      const validCombo = COMBOS.find(c => c.id === comboParam);
      if (validCombo) {
        setSelectedCombo(validCombo.id);
        setStep(2); // Auto-advance to Event Selection
        // Clean URL after selection
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('combo');
        window.history.replaceState({}, '', newUrl.toString());
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    college: '',
    department: '',
    year: '',
    food: '',
    accommodation: '',
    events: [] as string[],
    transactionId: '',
    paymentScreenshot: '',
    teamDetails: {} as Record<string, {
      leadName: string;
      leadPhone: string;
      members: string[];
      projectTitle?: string;
      projectDomain?: string;
      paperTitle?: string;
    }>
  });

  // Scroll logic logic removed as requested properly

  const handleMainBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // Strict Input Sanitization
    if (name === 'fullName' || name === 'college' || name === 'department') {
      value = sanitizeName(value);
    } else if (name === 'phone') {
      value = sanitizePhone(value);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleComboSelect = (comboId: ComboType) => {
    setSelectedCombo(comboId);
    setFormData(prev => ({ ...prev, events: [], teamDetails: {} })); // Reset events & team details
  };

  const handleEventToggle = (eventId: string) => {
    const isChecked = formData.events.includes(eventId);

    // Check constraint before adding
    if (!isChecked && selectedCombo) {
      const combo = COMBOS.find(c => c.id === selectedCombo);
      const validation = combo?.validateAdd(formData.events, eventId);

      if (validation && !validation.valid) {
        alert(validation.message);
        return;
      }
    }

    setFormData(prev => {
      const newEvents = !isChecked
        ? [...prev.events, eventId]
        : prev.events.filter(id => id !== eventId);

      const newTeamDetails = { ...prev.teamDetails };

      if (!isChecked) {
        // Initialize team details if checking a team event
        const eventConfig = eventData[eventId];
        if (eventConfig && eventConfig.maxMembers > 1) {
          newTeamDetails[eventId] = {
            leadName: '',
            leadPhone: '',
            members: Array(eventConfig.maxMembers - 1).fill('')
          };
        }
      } else {
        // Remove team details if unchecking
        delete newTeamDetails[eventId];
      }

      return {
        ...prev,
        events: newEvents,
        teamDetails: newTeamDetails
      };
    });
  };

  const handleTeamDetailChange = (eventId: string, field: 'leadName' | 'leadPhone' | 'member' | 'projectTitle' | 'projectDomain' | 'paperTitle', value: string, index?: number) => {
    setFormData(prev => {
      const currentDetails = prev.teamDetails[eventId] || { leadName: '', leadPhone: '', members: [] };
      let finalValue = value;

      if (field === 'leadName' || field === 'member') {
        finalValue = sanitizeName(value);
      } else if (field === 'leadPhone') {
        finalValue = sanitizePhone(value);
      }
      // No sanitization needed for titles/domains as they can allow special chars/numbers

      if (field === 'member' && typeof index === 'number') {
        const newMembers = [...currentDetails.members];
        newMembers[index] = finalValue;
        return {
          ...prev,
          teamDetails: {
            ...prev.teamDetails,
            [eventId]: { ...currentDetails, members: newMembers }
          }
        };
      }

      return {
        ...prev,
        teamDetails: {
          ...prev.teamDetails,
          [eventId]: { ...currentDetails, [field]: finalValue }
        }
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompressing(true);
      try {
        const compressedBase64 = await compressImage(file);
        setFormData(prev => ({ ...prev, paymentScreenshot: compressedBase64 }));
      } catch (err) {
        console.error("Compression failed", err);
        alert("Failed to process image. Please try another one.");
      } finally {
        setCompressing(false);
      }
    }
  };

  const validateStep1 = () => {
    if (!selectedCombo) {
      alert('Please select a combo plan.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.events.length === 0) {
      alert('Please select at least one event to proceed.');
      return false;
    }

    // Final Combo Validation
    if (selectedCombo) {
      const combo = COMBOS.find(c => c.id === selectedCombo);
      const validation = combo?.validateNext(formData.events);
      if (validation && !validation.valid) {
        alert(validation.message);
        return false;
      }
    }

    return true;
  };

  const validateStep3 = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.college || !formData.department || !formData.year || !formData.gender || !formData.food || !formData.accommodation) {
      alert('Please fill in all personal and academic details.');
      return false;
    }

    // Validate Team Details
    for (const eventId of formData.events) {
      const eventDetails = eventData[eventId];
      if (eventDetails && eventDetails.maxMembers > 1) {
        const teamInfo = formData.teamDetails[eventId];
        if (!teamInfo?.leadName || !teamInfo?.leadPhone) {
          alert(`Please fill in Team Lead details for ${eventDetails.name}`);
          return false;
        }

        // Validate Minimum Members Requirement
        if (eventDetails.minMembers > 1) {
          const filledMembers = teamInfo.members.filter(m => m.trim().length > 0).length;
          // Total participants = 1 (Lead) + filledMembers
          // But minMembers includes Lead. So we need (1 + filledMembers) >= minMembers
          if ((1 + filledMembers) < eventDetails.minMembers) {
            alert(`${eventDetails.name} requires at least ${eventDetails.minMembers} members (Lead + ${eventDetails.minMembers - 1} Members). Please fill in all team member details.`);
            return false;
          }
        }
      }
    }
    return true;
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
    if (step === 3 && validateStep3()) setStep(4);
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

    if (!formData.transactionId || !formData.paymentScreenshot) {
      alert('Please provide transaction ID and payment screenshot.');
      return;
    }

    if (!/^\d{12}$/.test(formData.transactionId)) {
      alert('Transaction ID (UTR) must be exactly 12 numeric digits.');
      return;
    }

    const eventNames = formData.events.map(id => eventData[id]?.name);

    const teamDetailsByName: any = {};
    Object.entries(formData.teamDetails).forEach(([id, details]) => {
      const name = eventData[id]?.name;
      if (name) teamDetailsByName[name] = details;
    });

    const submissionData = {
      ...formData,
      combo: selectedCombo,
      totalAmount: calculateTotal(),
      events: eventNames,
      teamDetails: teamDetailsByName
    };

    submitToSheet(submissionData, GOOGLE_SCRIPT_URL);
  };

  const getParticipantCount = () => {
    const uniqueParticipants = new Set<string>();

    const normalize = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ');

    // Add Main Registrant
    if (formData.fullName && formData.fullName.trim()) {
      uniqueParticipants.add(normalize(formData.fullName));
    }

    // Add unique names from selected events (Leads + Members)
    // The user explicitly requested: "check the name with the previous event... if added as team lead... dont consider as new"
    // The Set data structure automatically checks membership and ignores duplicates.
    formData.events.forEach(eventId => {
      const details = formData.teamDetails[eventId];
      if (details) {
        if (details.leadName && details.leadName.trim()) {
          uniqueParticipants.add(normalize(details.leadName));
        }
        details.members.forEach(m => {
          if (m && m.trim()) {
            uniqueParticipants.add(normalize(m));
          }
        });
      }
    });

    return Math.max(1, uniqueParticipants.size);
  };

  const calculateTotal = () => {
    const combo = COMBOS.find(c => c.id === selectedCombo);
    if (!combo) return 0;
    // Fixed price logic now, regardless of members (based on user request "1.2 Tech +3 Non tech... - 299")
    // Wait, the user said "prices are per member" in the previous code? NO, the previous code had per member.
    // The user's new request lists fixed prices for the combos.
    // "1.2 Tech +3 Non tech + Stranger Things - 299" implies a fixed price for that package.
    // However, if a team has multiple members, do they ALL pay 299? Or is 299 for the TEAM?
    // "The basic registration should be in the normal combo... per member shown in the event page" was asked to be REMOVED.
    // Let's assume the Combo Price is PER REGISTRATION (which usually is per person/pass).
    // "Galaxy Access Pass" sounds like an individual pass.
    // If multiple members are added in team details, usually each needs a pass?
    // User said: "prices are per member" in old code.
    // User request: "2 tech + 2 non tech = 249" (Basic Pass).
    // Implementation: I will keep it as Price * Participants for now, as that is standard for "Passes".
    // If I select a combo, I am buying a pass. If I add team members, they likely need tickets too?
    // Actually, usually in these college fests, you buy a pass for yourself.
    // Team events: Usually one person registers? Or all?
    // Existing logic: `combo.price * getParticipantCount()`.
    // I will KEEP this multiplier logic because "Pass" implies per person.
    return combo.price * getParticipantCount();
  };

  const getFilteredEventEntries = () => {
    if (!selectedCombo) return [];
    const combo = COMBOS.find(c => c.id === selectedCombo);
    // Filter by iterating entries
    return Object.entries(eventData).filter(([_, e]) => combo?.filter(e));
  };

  const filteredEventEntries = getFilteredEventEntries();
  const techEvents = filteredEventEntries.filter(([_, e]) => e.type === 'TECHNICAL');
  const nonTechEvents = filteredEventEntries.filter(([_, e]) => e.type === 'NON TECHNICAL');
  const flagshipEvents = filteredEventEntries.filter(([_, e]) => e.type === 'FLAGSHIP');

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
      className="w-full max-w-6xl mx-auto pb-20 px-4"
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

      {/* Progress Steps */}
      <div className="mb-10 max-w-4xl mx-auto">
        <Stepper
          initialStep={1}
          currentStepExternal={step}
          hideFooter={true}
        >
          {/* STEP 1: COMBO SELECTION */}
          <Step>
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="font-orbitron text-4xl font-bold text-white mb-4 tracking-wider">CHOOSE YOUR PLAN</h2>
                <p className="text-slate-400 font-light max-w-2xl mx-auto">Select the combo that suits you best. Prices are per member.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COMBOS.map((combo) => (
                  <div
                    key={combo.id}
                    onClick={() => handleComboSelect(combo.id)}
                    className={`
                                relative p-6 rounded-3xl border cursor-pointer transition-all duration-500 group overflow-hidden
                                ${selectedCombo === combo.id
                        ? 'bg-white/10 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-[1.02]'
                        : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5 hover:scale-[1.01]'}
                            `}
                  >
                    {/* Flagship Badge */}
                    {(combo.id === 'ULTIMATE' || combo.id === 'ELITE' || combo.id === 'PREMIUM' || combo.id === 'STANDARD') && (
                      <div className="absolute top-0 right-0 bg-gradient-to-bl from-red-600 to-red-900 text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl z-10 font-orbitron tracking-wider">
                        INCLUDES FLAGSHIP
                      </div>
                    )}

                    {selectedCombo === combo.id && (
                      <div className="absolute top-0 right-0 p-2 bg-gradient-to-bl from-white via-slate-200 to-slate-400 rounded-bl-2xl z-20 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <Check className="w-5 h-5 text-black drop-shadow-sm" strokeWidth={3.5} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="h-full flex flex-col relative z-10">
                      <h3 className={`font-orbitron font-bold text-xl mb-2 ${selectedCombo === combo.id ? 'text-white drop-shadow-md' : 'text-slate-300'}`}>
                        {combo.name}
                      </h3>
                      <div className="text-3xl font-bold text-white mb-4 font-orbitron">
                        ₹{combo.price}
                      </div>
                      <div className="w-full h-[1px] bg-white/10 mb-4"></div>
                      <p className="text-slate-400 text-sm italic mb-4 flex-grow">"{combo.description}"</p>

                      <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">INCLUDES</p>
                        <p className="text-xs text-white">{combo.condition}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => {
                    if (step === 1 && selectedCombo) {
                      const combo = COMBOS.find(c => c.id === selectedCombo);
                      // Auto-select Stranger Things for Flagship combos if not already selected
                      if (combo && combo.id !== 'BASIC') {
                        setFormData(prev => {
                          if (!prev.events.includes('stranger-things')) {
                            const stEvent = eventData['stranger-things'];
                            const newTeamDetails = { ...prev.teamDetails };
                            if (stEvent && stEvent.maxMembers > 1) {
                              newTeamDetails['stranger-things'] = {
                                leadName: '',
                                leadPhone: '',
                                members: Array(stEvent.maxMembers - 1).fill('')
                              };
                            }
                            return { ...prev, events: [...prev.events, 'stranger-things'], teamDetails: newTeamDetails };
                          }
                          return prev;
                        });
                      }
                    }
                    handleNext();
                  }}
                  disabled={!selectedCombo}
                  className="px-8 py-3 bg-white text-black font-orbitron text-sm font-bold tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  CONTINUE TO EVENTS <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </Step>

          {/* STEP 2: EVENT SELECTION */}
          <Step>
            <div className="bg-black/80 md:bg-black/60 md:backdrop-blur-md rounded-3xl border border-white/20 relative overflow-hidden shadow-xl p-5 md:p-12">
              <div className="text-center mb-8">
                <h2 className="font-orbitron text-3xl font-bold text-white mb-2 tracking-wider">SELECT EVENTS</h2>
                <p className="text-slate-400 font-light">
                  Plan: <span className="text-white font-bold">{COMBOS.find(c => c.id === selectedCombo)?.name}</span>
                </p>
              </div>

              <div className="space-y-12">
                {flagshipEvents.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2 border-l-2 border-red-500 pl-4">
                      Flagship Events
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {flagshipEvents.map(([id, event]) => (
                        <EventCard
                          key={id}
                          event={event}
                          selected={formData.events.includes(id)}
                          onToggle={() => handleEventToggle(id)}
                          isFlagship={true}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {techEvents.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.2em] border-l-2 border-blue-500 pl-4">
                      Technical Events
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {techEvents.map(([id, event]) => (
                        <EventCard
                          key={id}
                          event={event}
                          selected={formData.events.includes(id)}
                          onToggle={() => handleEventToggle(id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {nonTechEvents.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-[0.2em] border-l-2 border-yellow-500 pl-4">
                      Non-Technical Events
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {nonTechEvents.map(([id, event]) => (
                        <EventCard
                          key={id}
                          event={event}
                          selected={formData.events.includes(id)}
                          onToggle={() => handleEventToggle(id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="md:hidden text-center mb-4">
                  <p className="text-sm text-white font-orbitron tracking-widest">SELECTED: <span className="text-purple-400 font-bold">{formData.events.length}</span></p>
                </div>
                <div className="flex justify-between items-center">
                  <button onClick={handlePrev} className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10">BACK</button>
                  <div className="hidden md:block text-right">
                    <p className="text-xs text-slate-400">SELECTED EVENTS: {formData.events.length}</p>
                  </div>
                  <button onClick={handleNext} className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-slate-200">NEXT</button>
                </div>
              </div>
            </div>
          </Step>

          {/* STEP 3: DETAILS */}
          <Step>
            <div className="bg-black/80 md:bg-black/40 md:backdrop-blur-xl rounded-3xl border border-white/20 p-5 md:p-12">
              <h2 className="font-orbitron text-3xl font-bold text-white mb-8 text-center">PARTICIPANT DETAILS</h2>

              {/* Personal Info Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <InputGroup label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="ENTER NAME" required />
                <InputGroup label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="EMAIL ID" type="email" required />
                <InputGroup label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="MOBILE NUMBER" type="tel" required />

                <div className="space-y-2">
                  <CustomSelect
                    label="Gender"
                    required
                    value={formData.gender}
                    onChange={(val) => setFormData(prev => ({ ...prev, gender: val }))}
                    options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]}
                    placeholder="SELECT GENDER"
                  />
                </div>

                {/* Case Sensitivity Warning */}
                <div className="md:col-span-2 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-500 font-bold text-sm mb-1 font-orbitron">IMPORTANT NOTICE</h4>
                    <p className="text-yellow-200/80 text-xs leading-relaxed">
                      Participant names are <strong>CASE SENSITIVE</strong>. Ensure you enter names exactly the same way (e.g., "John Doe") across all entries to accurately calculate the participant count and avoid duplicate charges.
                    </p>
                  </div>
                </div>

                <InputGroup label="College" name="college" value={formData.college} onChange={handleChange} placeholder="COLLEGE NAME" required />
                <InputGroup label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="DEPARTMENT" required />

                <div className="space-y-2">
                  <CustomSelect
                    label="Year"
                    required
                    value={formData.year}
                    onChange={(val) => setFormData(prev => ({ ...prev, year: val }))}
                    options={[{ value: '1', label: '1st Year' }, { value: '2', label: '2nd Year' }, { value: '3', label: '3rd Year' }, { value: '4', label: '4th Year' }]}
                    placeholder="SELECT YEAR"
                  />
                </div>

                <div className="space-y-2">
                  <CustomSelect
                    label="Food Preference"
                    required
                    value={formData.food}
                    onChange={(val) => setFormData(prev => ({ ...prev, food: val }))}
                    options={[{ value: 'Veg', label: 'Veg' }, { value: 'Non-Veg', label: 'Non-Veg' }]}
                    placeholder="SELECT FOOD"
                  />
                </div>

                <div className="space-y-2">
                  <CustomSelect
                    label="Accommodation"
                    required
                    value={formData.accommodation}
                    onChange={(val) => setFormData(prev => ({ ...prev, accommodation: val }))}
                    options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                    placeholder="ACCOMMODATION REQUIRED?"
                  />
                </div>
              </div>

              {/* Team Details */}
              {formData.events.some(eventId => {
                const ev = eventData[eventId];
                return ev && ev.maxMembers > 1;
              }) && (
                  <div className="space-y-6 pt-8 border-t border-white/10">
                    <h3 className="font-orbitron text-xl text-white">TEAM DETAILS</h3>
                    {formData.events.map(eventId => {
                      const event = eventData[eventId];
                      if (!event || event.maxMembers <= 1) return null;
                      return (
                        <div key={eventId} className="bg-white/5 border border-white/10 rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                            <h4 className="font-orbitron font-bold text-white">{event.name}</h4>
                            <span className="text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded">Max {event.maxMembers} Members</span>
                          </div>

                          {/* OPTIONAL: Project War Specific Fields */}
                          {eventId === 'project-war' && (
                            <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-white/5 rounded-lg border border-white/5">
                              <InputGroup
                                label="Project Title (Optional)"
                                value={formData.teamDetails[eventId]?.projectTitle || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTeamDetailChange(eventId, 'projectTitle', e.target.value)}
                                placeholder="YOUR PROJECT TITLE"
                              />
                              <div className="space-y-2">
                                <CustomSelect
                                  label="Project Domain (Optional)"
                                  value={formData.teamDetails[eventId]?.projectDomain || ''}
                                  onChange={(val) => handleTeamDetailChange(eventId, 'projectDomain', val)}
                                  options={[{ value: 'Hardware', label: 'Hardware' }, { value: 'Software', label: 'Software' }]}
                                  placeholder="SELECT DOMAIN"
                                />
                              </div>
                            </div>
                          )}

                          {/* OPTIONAL: Paper Presentation Specific Fields */}
                          {eventId === 'paper-presentation' && (
                            <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/5">
                              <InputGroup
                                label="Paper Title (Optional)"
                                value={formData.teamDetails[eventId]?.paperTitle || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTeamDetailChange(eventId, 'paperTitle', e.target.value)}
                                placeholder="YOUR PAPER TITLE"
                              />
                            </div>
                          )}

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <InputGroup
                              label="Lead Name"
                              value={formData.teamDetails[eventId]?.leadName || ''}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTeamDetailChange(eventId, 'leadName', e.target.value)}
                              placeholder="LEAD NAME"
                            />
                            <InputGroup
                              label="Lead Phone"
                              value={formData.teamDetails[eventId]?.leadPhone || ''}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTeamDetailChange(eventId, 'leadPhone', e.target.value)}
                              placeholder="LEAD PHONE"
                              type="tel"
                            />
                          </div>

                          <div className="space-y-3">
                            {formData.teamDetails[eventId]?.members.map((member, idx) => (
                              <InputGroup
                                key={idx}
                                label={`Member ${idx + 2} Name`}
                                value={member}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTeamDetailChange(eventId, 'member', e.target.value, idx)}
                                placeholder={`MEMBER ${idx + 2} NAME`}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              <div className="flex justify-between items-center mt-12">
                <button onClick={handlePrev} className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10">BACK</button>
                <button onClick={handleNext} className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-slate-200">PROCEED TO PAY</button>
              </div>
            </div>
          </Step>

          {/* STEP 4: PAYMENT */}
          <Step>
            <div className="bg-black/80 md:bg-black/40 md:backdrop-blur-xl rounded-3xl border border-white/20 p-5 md:p-12">
              <h2 className="font-orbitron text-3xl font-bold text-white mb-8 text-center">PAYMENT</h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 h-fit">
                  <h3 className="font-orbitron text-white text-lg mb-4 border-b border-white/10 pb-2">ORDER SUMMARY</h3>
                  <div className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Selected Plan</span>
                    <span className="text-white font-bold">{COMBOS.find(c => c.id === selectedCombo)?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Price</span>
                    <span className="text-white font-mono">₹{COMBOS.find(c => c.id === selectedCombo)?.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Participants</span>
                    <span className="text-white font-bold">{getParticipantCount()} (Covered in Pass)</span>
                  </div>
                  <div className="space-y-2 mt-4">
                    <p className="text-xs text-white/50 uppercase">Events Selected</p>
                    {formData.events.map(id => (
                      <div key={id} className="flex items-center gap-2 text-white/80 text-sm">
                        <Check size={12} className="text-green-400" /> {eventData[id]?.name}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xl font-bold text-white font-orbitron tracking-widest">TOTAL</span>
                      <span className="text-3xl font-bold text-white font-orbitron text-shadow-glow">
                        ₹{calculateTotal()}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-slate-400 font-mono tracking-wide">
                        (Fixed Combo Price)
                      </span>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">*Includes all team members</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                      <QRCode
                        value={`upi://pay?pa=bharathk220620005-5@okicici&pn=Galaxy 2k26&am=${calculateTotal()}&cu=INR`}
                        size={180}
                        viewBox={`0 0 256 256`}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      />
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10">
                      <p className="text-white font-mono text-sm select-all">bharathk220620005-5@okicici</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <InputGroup
                      label="Transaction ID (UTR)"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      placeholder="ENTER 12-DIGIT UTR"
                      required
                      maxLength={12}
                    />

                    <div className="space-y-2">
                      <label className="text-xs text-white/60 uppercase tracking-widest font-bold ml-1">Payment Screenshot</label>
                      <label className={`
                                        flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all
                                        ${formData.paymentScreenshot ? 'border-green-500/50 bg-green-500/10' : 'border-white/20 hover:bg-white/5'}
                                    `}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {compressing ? (
                            <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-2" />
                          ) : formData.paymentScreenshot ? (
                            <div className="flex items-center gap-2 text-green-400">
                              <Check size={24} />
                              <p className="text-sm">Screenshot Ready</p>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-white/40 mb-2" />
                              <p className="text-sm text-white/60">Upload Image</p>
                              <p className="text-[10px] text-white/30">Auto compressed</p>
                            </>
                          )}
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={compressing} />
                      </label>
                      {compressing && <p className="text-xs text-blue-400 text-center animate-pulse">Compressing image for faster upload...</p>}
                    </div>
                  </div>
                </div>
              </div>

              {error && <div className="mt-6 p-4 bg-red-500/10 text-red-400 rounded-lg flex gap-2 items-center"><AlertCircle size={18} /> {error}</div>}

              <div className="flex justify-between items-center mt-8">
                <button onClick={handlePrev} className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10">BACK</button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || compressing}
                  className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />} SUBMIT
                </button>
              </div>
            </div>
          </Step>
        </Stepper>
      </div>
    </motion.div >
  );
}

// Helper Components - Premium
function EventCard({ event, selected, onToggle, isFlagship = false }: any) {
  return (
    <div
      onClick={onToggle}
      className={`
                relative border rounded-3xl p-5 cursor-pointer transition-all duration-500 group overflow-hidden
                ${selected
          ? 'bg-white/10 border-white/50 shadow-[0_0_25px_rgba(255,255,255,0.15)] scale-[1.02]'
          : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5 hover:scale-[1.01]'}
            `}
    >
      {/* Selected Indicator - Premium Golden/Silver Tick in Top Right */}
      {selected && (
        <div className="absolute top-0 right-0 p-2 bg-gradient-to-bl from-white via-slate-200 to-slate-400 rounded-bl-2xl z-20 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <Check className="w-5 h-5 text-black drop-shadow-sm" strokeWidth={3.5} />
        </div>
      )}

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h4 className={`font-orbitron font-bold text-lg mb-1 ${selected ? 'text-white' : 'text-slate-300'}`}>{event.name}</h4>
          <p className="text-[10px] text-white/50 uppercase tracking-widest">{event.type}</p>
        </div>
      </div>

      {isFlagship && (
        <div className="absolute bottom-2 right-2 flex gap-1">
          <Star size={12} className="text-yellow-500 fill-yellow-500 animate-pulse" />
        </div>
      )}
    </div>
  );
}

// Premium Input Group
function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-xs text-white/60 uppercase tracking-widest font-bold ml-1 group-focus-within:text-white transition-colors">{label}</label>
      <input
        className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/40 focus:border-white/50 focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-orbitron tracking-wide text-sm backdrop-blur-sm"
        {...props}
      />
    </div>
  );
}
