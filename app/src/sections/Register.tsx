
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
import { useToast } from '../context/ToastContext';

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
  const { showToast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
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
    // Shared team details for ALL events
    commonTeamDetails: {
      leadName: '',
      leadPhone: '',
      members: ['', '', ''] // Max 3 extra members (Total 4)
    },
    // Event specific details (Project Title, etc.)
    eventSpecificDetails: {} as Record<string, {
      projectTitle?: string;
      projectDomain?: string;
      paperTitle?: string;
    }>
  });

  const handleMainBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    // Strict Input Sanitization
    if (name === 'fullName' || name === 'college' || name === 'department') {
      value = sanitizeName(value);
    } else if (name === 'phone') {
      value = sanitizePhone(value);
    } else if (name === 'transactionId') {
      value = value.replace(/\D/g, '').slice(0, 12);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCom = (comboId: ComboType) => {
    setSelectedCombo(comboId);
    setFormData(prev => ({ ...prev, events: [], eventSpecificDetails: {} })); // Reset events & specific details

    // Auto-scroll to next button
    setTimeout(() => {
      nextButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleEventToggle = (eventId: string) => {
    const isChecked = formData.events.includes(eventId);

    // Check constraint before adding
    if (!isChecked && selectedCombo) {
      const combo = COMBOS.find(c => c.id === selectedCombo);
      const validation = combo?.validateAdd(formData.events, eventId);

      if (validation && !validation.valid) {
        showToast(validation.message || 'Invalid selection', 'error');
        return;
      }
    }

    setFormData(prev => {
      const newEvents = !isChecked
        ? [...prev.events, eventId]
        : prev.events.filter(id => id !== eventId);

      const newSpecificDetails = { ...prev.eventSpecificDetails };

      if (isChecked) {
        // Remove specific details if unchecking
        delete newSpecificDetails[eventId];
      }
      // Note: We DO NOT clear commonTeamDetails when events change, 
      // as they might select another team event later.

      return {
        ...prev,
        events: newEvents,
        eventSpecificDetails: newSpecificDetails
      };
    });
  };

  const handleCommonTeamChange = (field: 'leadName' | 'leadPhone' | 'member', value: string, index?: number) => {
    setFormData(prev => {
      const currentDetails = prev.commonTeamDetails;
      let finalValue = value;

      if (field === 'leadName' || field === 'member') {
        finalValue = sanitizeName(value);
      } else if (field === 'leadPhone') {
        finalValue = sanitizePhone(value);
      }

      if (field === 'member' && typeof index === 'number') {
        const newMembers = [...currentDetails.members];
        newMembers[index] = finalValue;
        return {
          ...prev,
          commonTeamDetails: { ...currentDetails, members: newMembers }
        };
      }

      return {
        ...prev,
        commonTeamDetails: { ...currentDetails, [field]: finalValue }
      };
    });
  };

  // Handle specific fields (Project Title, Paper Title)
  const handleSpecificDetailChange = (eventId: string, field: 'projectTitle' | 'projectDomain' | 'paperTitle', value: string) => {
    setFormData(prev => ({
      ...prev,
      eventSpecificDetails: {
        ...prev.eventSpecificDetails,
        [eventId]: {
          ...prev.eventSpecificDetails[eventId],
          [field]: value
        }
      }
    }));
  };

  const handleApplyParticipantToLead = () => {
    setFormData(prev => {
      const isSame = prev.commonTeamDetails.leadName === prev.fullName &&
        prev.commonTeamDetails.leadPhone === prev.phone;

      if (!isSame) {
        return {
          ...prev,
          commonTeamDetails: {
            ...prev.commonTeamDetails,
            leadName: prev.fullName,
            leadPhone: prev.phone
          }
        };
      } else {
        return {
          ...prev,
          commonTeamDetails: {
            ...prev.commonTeamDetails,
            leadName: '',
            leadPhone: ''
          }
        };
      }
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
        showToast("Failed to process image. Please try another one.", 'error');
      } finally {
        setCompressing(false);
      }
    }
  };

  const validateStep1 = () => {
    if (!selectedCombo) {
      showToast('Please select a combo plan to continue', 'error');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.events.length === 0) {
      showToast('Please select at least one event to proceed', 'error');
      return false;
    }

    // Final Combo Validation
    if (selectedCombo) {
      const combo = COMBOS.find(c => c.id === selectedCombo);
      const validation = combo?.validateNext(formData.events);
      if (validation && !validation.valid) {
        showToast(validation.message || 'Invalid selection', 'error');
        return false;
      }
    }

    return true;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (formData.phone.length !== 10) newErrors.phone = "Phone number must be exactly 10 digits";

    if (!formData.college) newErrors.college = "College name is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.food) newErrors.food = "Food preference is required";
    if (!formData.accommodation) newErrors.accommodation = "Accommodation preference is required";

    // Validate Team Details ONCE if any team event is selected
    const hasTeamEvent = formData.events.some(id => eventData[id]?.maxMembers > 1);

    if (hasTeamEvent) {
      const { leadName, leadPhone, members } = formData.commonTeamDetails;

      if (!leadName) newErrors[`team-leadName`] = "Team Lead Name is required";
      if (!leadPhone) newErrors[`team-leadPhone`] = "Team Lead Phone is required";
      else if (leadPhone.length !== 10) newErrors[`team-leadPhone`] = "Phone must be 10 digits";

      // Validate Minimum Members Requirement against the max requirement of all selected events
      // Find the event with the highest minMembers requirement
      let maxMinMembersRequired = 0;
      let demandingEventName = '';

      formData.events.forEach(id => {
        const ev = eventData[id];
        if (ev && ev.minMembers > maxMinMembersRequired) {
          maxMinMembersRequired = ev.minMembers;
          demandingEventName = ev.name;
        }
      });

      if (maxMinMembersRequired > 1) {
        const filledMembers = members.filter(m => m.trim().length > 0).length;
        // Total team size = 1 (Lead) + filledMembers
        if ((1 + filledMembers) < maxMinMembersRequired) {
          showToast(`${demandingEventName} requires at least ${maxMinMembersRequired} members. Please add more members.`, 'error');
          isValid = false;
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fill in all mandatory fields', 'error');
      isValid = false;
    } else {
      setErrors({});
    }

    return isValid;
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
    if (step === 3 && validateStep3()) setStep(4);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (GOOGLE_SCRIPT_URL.includes('REPLACE')) {
      showToast('Please deploy the Google Script and update the URL in Register.tsx', 'error');
      return;
    }

    if (!formData.transactionId || !formData.paymentScreenshot) {
      showToast('Please provide transaction ID and payment screenshot', 'error');
      return;
    }

    if (!/^\d{12}$/.test(formData.transactionId)) {
      showToast('Transaction ID (UTR) must be exactly 12 numeric digits', 'error');
      return;
    }

    const eventNames = formData.events.map(id => eventData[id]?.name);

    // Construct teamDetailsByName mapping the SINGLE team details to ALL events
    const teamDetailsByName: any = {};

    formData.events.forEach(id => {
      const event = eventData[id];
      if (event?.maxMembers > 1) {
        const specific = formData.eventSpecificDetails[id] || {};

        // Merge common details with specific details
        teamDetailsByName[event.name] = {
          leadName: formData.commonTeamDetails.leadName,
          leadPhone: formData.commonTeamDetails.leadPhone,
          members: formData.commonTeamDetails.members,
          ...specific
        };
      }
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

    // Add shared team members (Lead + Members) if ANY team event is selected
    const hasTeamEvent = formData.events.some(id => eventData[id]?.maxMembers > 1);

    if (hasTeamEvent) {
      const { leadName, members } = formData.commonTeamDetails;
      if (leadName && leadName.trim()) {
        uniqueParticipants.add(normalize(leadName));
      }
      members.forEach(m => {
        if (m && m.trim()) {
          uniqueParticipants.add(normalize(m));
        }
      });
    }

    return Math.max(1, uniqueParticipants.size);
  };

  const calculateTotal = () => {
    const combo = COMBOS.find(c => c.id === selectedCombo);
    if (!combo) return 0;
    // Fixed price logic now, regardless of members (based on user request "1.2 Tech +3 Non tech... - 299")
    // Price calculation logic: Fixed price per participant based on selected combo.
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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-amber-200 text-xs font-orbitron tracking-widest font-bold">REGISTRATION CLOSES ON FEB 26</span>
                </div>
                <p className="text-slate-400 font-light max-w-2xl mx-auto">Select the combo that suits you best. Prices are per member.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COMBOS.map((combo) => ( // Rendering combos from data source
                  <div
                    key={combo.id}
                    onClick={() => handleCom(combo.id)}
                    className={`
                                relative p-6 rounded-3xl border cursor-pointer transition-all duration-500 group overflow-hidden
                                ${selectedCombo === combo.id
                        ? 'bg-white/10 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-[1.02]'
                        : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5 hover:scale-[1.01]'}
                            `}
                  >


                    {/* Flagship Badge */}
                    {(combo.id === 'PREMIUM' || combo.id === 'ELITE') && (
                      <div className="absolute top-0 right-0 bg-gradient-to-bl from-red-600 to-red-900 text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl z-10 font-orbitron tracking-wider shadow-md">
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
                  ref={nextButtonRef}
                  type="button"
                  onClick={() => {
                    if (step === 1 && selectedCombo) {
                      const combo = COMBOS.find(c => c.id === selectedCombo);
                      // Auto-select Stranger Things for Flagship combos if not already selected
                      if (combo && combo.id !== 'BASIC') {
                        setFormData(prev => {
                          if (!prev.events.includes('stranger-things')) {
                            return { ...prev, events: [...prev.events, 'stranger-things'] };
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
            <div className="bg-black/40 md:bg-black/40 md:backdrop-blur-xl rounded-3xl border border-white/20 p-5 md:p-12">
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
            <div className="bg-black/40 md:bg-black/40 md:backdrop-blur-xl rounded-3xl border border-white/20 p-5 md:p-12">
              <h2 className="font-orbitron text-3xl font-bold text-white mb-8 text-center">PARTICIPANT DETAILS</h2>

              {/* Personal Info Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <InputGroup
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="ENTER NAME"
                  required
                  error={errors.fullName}
                />
                <InputGroup
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="EMAIL ID"
                  type="email"
                  required
                  error={errors.email}
                />
                <InputGroup
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="MOBILE NUMBER"
                  type="tel"
                  required
                  maxLength={10}
                  error={errors.phone || (formData.phone.length > 0 && formData.phone.length < 10 ? "Must be 10 digits" : null)}
                />

                <div className="space-y-2">
                  <CustomSelect
                    label="Gender"
                    required
                    value={formData.gender}
                    onChange={(val) => setFormData(prev => ({ ...prev, gender: val }))}
                    options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]}
                    placeholder="SELECT GENDER"
                    error={errors.gender}
                  />
                </div>

                {/* Case Sensitivity Warning */}
                <div className="md:col-span-2 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-500 font-bold text-sm mb-1 font-orbitron">IMPORTANT NOTICE</h4>
                    <p className="text-yellow-200/80 text-xs leading-relaxed">
                      Participant names are <strong>CASE SENSITIVE</strong>. Ensure you enter names exactly the same way (e.g., "Galaxy") across all entries to accurately calculate the participant count and avoid duplicate charges.
                    </p>
                  </div>
                </div>

                <InputGroup
                  label="College"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="COLLEGE NAME"
                  required
                  error={errors.college}
                />
                <InputGroup
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="DEPARTMENT"
                  required
                  error={errors.department}
                />

                <div className="space-y-2">
                  <CustomSelect
                    label="Year"
                    required
                    value={formData.year}
                    onChange={(val) => setFormData(prev => ({ ...prev, year: val }))}
                    options={[{ value: '1', label: '1st Year' }, { value: '2', label: '2nd Year' }, { value: '3', label: '3rd Year' }, { value: '4', label: '4th Year' }]}
                    placeholder="SELECT YEAR"
                    error={errors.year}
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
                    error={errors.food}
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
                    error={errors.accommodation}
                  />
                </div>
              </div>

              {/* SHARED TEAM DETAILS SECTION */}
              {formData.events.some(eventId => {
                const ev = eventData[eventId];
                return ev && ev.maxMembers > 1;
              }) && (
                  <div className="space-y-8 pt-10 border-t border-white/10">
                    <div className="relative overflow-hidden rounded-2xl p-[1px] group">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-slate-400/40 to-white/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
                      <div className="relative bg-black/80 backdrop-blur-xl p-6 rounded-2xl flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-slate-400 flex items-center justify-center shadow-lg shadow-white/10">
                          <UsersIcon size={24} className="text-black" />
                        </div>
                        <div>
                          <h3 className="font-orbitron text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 tracking-wider mb-1">TEAM DETAILS</h3>
                          <p className="text-sm text-slate-400 font-light tracking-wide">Enter team members <span className="text-white font-bold">once</span> for all selected team events.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.05)]">

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="md:col-span-2 flex items-center gap-2 mb-2 p-3 bg-white/5 rounded-lg border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                          onClick={handleApplyParticipantToLead}
                        >
                          <div className={`w-5 h-5 rounded border border-white/30 flex items-center justify-center transition-colors ${(formData.commonTeamDetails.leadName === formData.fullName && formData.commonTeamDetails.leadName !== '')
                            ? 'bg-white border-white'
                            : 'bg-transparent'
                            }`}>
                            {(formData.commonTeamDetails.leadName === formData.fullName && formData.commonTeamDetails.leadName !== '') && <Check size={14} className="text-black" />}
                          </div>
                          <span className="text-sm text-slate-300 select-none">Same as Participant Details</span>
                        </div>

                        <InputGroup
                          label="Team Lead Name"
                          value={formData.commonTeamDetails.leadName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCommonTeamChange('leadName', e.target.value)}
                          placeholder="LEAD NAME"
                          error={errors[`team-leadName`]}
                        />
                        <InputGroup
                          label="Team Lead Phone"
                          value={formData.commonTeamDetails.leadPhone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCommonTeamChange('leadPhone', e.target.value)}
                          placeholder="LEAD PHONE"
                          type="tel"
                          maxLength={10}
                          error={errors[`team-leadPhone`] || (formData.commonTeamDetails.leadPhone && formData.commonTeamDetails.leadPhone.length > 0 && formData.commonTeamDetails.leadPhone.length < 10 ? "Must be 10 digits" : null)}
                        />
                      </div>

                      <div className="flex items-center gap-3 mb-4 mt-6 pt-4 border-t border-white/5">
                        <h4 className="font-orbitron font-bold text-white/80 text-sm tracking-wider">TEAM MEMBERS (OPTIONAL)</h4>
                      </div>

                      <div className="space-y-3">
                        {formData.commonTeamDetails.members.map((member, idx) => (
                          <InputGroup
                            key={idx}
                            label={`Member ${idx + 2} Name`}
                            value={member}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCommonTeamChange('member', e.target.value, idx)}
                            placeholder={`MEMBER ${idx + 2} NAME`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              {/* EVENT SPECIFIC FIELDS */}
              {formData.events.map(eventId => {
                if (eventId === 'project-war') {
                  return (
                    <div key={eventId} className="mt-6 pt-6 border-t border-white/10">
                      <h3 className="font-orbitron text-lg text-white mb-4">PROJECT WAR DETAILS</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-white/5 rounded-lg border border-white/5">
                        <InputGroup
                          label="Project Title (Optional)"
                          value={formData.eventSpecificDetails[eventId]?.projectTitle || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificDetailChange(eventId, 'projectTitle', e.target.value)}
                          placeholder="YOUR PROJECT TITLE"
                        />
                        <div className="space-y-2">
                          <CustomSelect
                            label="Project Domain (Optional)"
                            value={formData.eventSpecificDetails[eventId]?.projectDomain || ''}
                            onChange={(val) => handleSpecificDetailChange(eventId, 'projectDomain', val)}
                            options={[{ value: 'Hardware', label: 'Hardware' }, { value: 'Software', label: 'Software' }]}
                            placeholder="SELECT DOMAIN"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
                if (eventId === 'paper-presentation') {
                  return (
                    <div key={eventId} className="mt-6 pt-6 border-t border-white/10">
                      <h3 className="font-orbitron text-lg text-white mb-4">PAPER PRESENTATION DETAILS</h3>
                      <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/5">
                        <InputGroup
                          label="Paper Title (Optional)"
                          value={formData.eventSpecificDetails[eventId]?.paperTitle || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSpecificDetailChange(eventId, 'paperTitle', e.target.value)}
                          placeholder="YOUR PAPER TITLE"
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}

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
                      error={formData.transactionId.length > 0 && formData.transactionId.length < 12 ? "Must be exactly 12 digits" : null}
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
function InputGroup({ label, error, ...props }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-xs text-white/60 uppercase tracking-widest font-bold ml-1 group-focus-within:text-white transition-colors">{label}</label>
      <input
        className={`w-full bg-white/10 border rounded-xl p-4 text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none focus:ring-1 transition-all font-orbitron tracking-wide text-sm backdrop-blur-sm
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-white/10 focus:border-white/50 focus:ring-white/20'}
        `}
        {...props}
      />
      {error && <p className="text-red-400 text-xs ml-1 font-bold tracking-wide flex items-center gap-1"><AlertCircle size={10} /> {error}</p>}
    </div>
  );
}

// Simple Icon component to avoid import error if Users is not imported
function UsersIcon({ size = 24, className = "" }: { size?: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )
}
