import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Chrome, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  onBack: () => void;
  onRegister: () => void;
}

export default function Login({ onBack, onRegister }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

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

      {/* Login Card */}
      <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-white/10">
        {/* Glow Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="font-orbitron text-2xl font-bold text-white mb-2">WELCOME BACK</h2>
            <p className="text-white/60 text-sm">Login to your Galaxy 2K26 account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white/60 text-xs tracking-wider mb-2">EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/60 text-xs tracking-wider mb-2">PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-purple-400 text-xs hover:text-pink-400 transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white font-orbitron tracking-wider font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              LOGIN
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-xs">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google Login */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl glass flex items-center justify-center gap-3 text-white hover:bg-white/10 transition-all border border-white/10 hover:border-purple-500/30"
          >
            <Chrome className="w-5 h-5" />
            <span className="text-sm">Login with Google</span>
          </motion.button>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-white/60 text-sm">
              Don&apos;t have an account?{' '}
              <button
                onClick={onRegister}
                className="text-purple-400 hover:text-pink-400 transition-colors font-orbitron"
              >
                REGISTER
              </button>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
