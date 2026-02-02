import { motion } from 'framer-motion';
import { ArrowLeft, Chrome, Mail, Sparkles, Rocket } from 'lucide-react';

interface RegisterProps {
  onBack: () => void;
  onLogin: () => void;
}

export default function Register({ onBack, onLogin }: RegisterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-md"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to Home</span>
      </button>

      {/* Register Card */}
      <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-white/10">
        {/* Glow Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gray-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-slate-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-zinc-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-600 via-slate-500 to-zinc-500 flex items-center justify-center shadow-lg shadow-white/10"
            >
              <Rocket className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="font-orbitron text-2xl font-bold text-white mb-2">JOIN GALAXY 2K26</h2>
            <p className="text-white/60 text-sm">Create your account to get started</p>
          </div>

          {/* Registration Options */}
          <div className="space-y-4">
            {/* Google Sign Up */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl glass flex items-center justify-center gap-3 text-white hover:bg-white/10 transition-all group border border-white/10 hover:border-white/30"
            >
              <Chrome className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-orbitron tracking-wider">CONTINUE WITH GOOGLE</span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/40 text-xs">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email Sign Up */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white font-orbitron tracking-wider font-bold hover:shadow-lg hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5" />
              REGISTER WITH EMAIL
            </motion.button>
          </div>

          {/* Benefits */}
          <div className="mt-8 p-4 glass rounded-xl border border-white/5">
            <p className="text-white/60 text-xs text-center mb-3">BENEFITS OF REGISTERING</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Sparkles className="w-3 h-3 text-gray-400" />
                <span>Access to all events and workshops</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Sparkles className="w-3 h-3 text-slate-400" />
                <span>Exclusive event notifications</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Sparkles className="w-3 h-3 text-zinc-400" />
                <span>Certificate of participation</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Sparkles className="w-3 h-3 text-stone-400" />
                <span>Chance to win exciting prizes</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-white/60 text-sm">
              Already have an account?{' '}
              <button
                onClick={onLogin}
                className="text-gray-400 hover:text-white transition-colors font-orbitron"
              >
                LOGIN
              </button>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
