import { motion } from 'framer-motion';
import { Target, Globe, Rocket } from 'lucide-react';
import ScrollFloat from '../components/ScrollFloat';



const highlights = [
  {
    icon: Rocket,
    title: 'Vision',
    description: 'To build a smarter campus by empowering students to create impactful digital solutions.',
  },
  {
    icon: Target,
    title: 'Eligibility',
    description: 'Open to all engineering students. Participation is allowed in teams of 2-4 members.',
  },
  {
    icon: Globe,
    title: 'Real-Time Impact',
    description: 'Solutions that effectively address the problem statements will be recognized and rewarded.',
  },
];

// ... (existing imports)
import ImageMarquee from '../components/ImageMarquee';

// ...

export default function About() {
  return (
    <section id="about" className="relative pt-8 pb-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="hidden md:block">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="top bottom-=10%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
                containerClassName="font-orbitron text-4xl md:text-5xl font-bold text-white"
                textClassName="text-white"
              >
                About Galaxy 2K26
              </ScrollFloat>
            </div>
            <div className="block md:hidden">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="top bottom-=10%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
                containerClassName="font-orbitron text-4xl font-bold text-white"
                textClassName="text-white"
              >
                About us
              </ScrollFloat>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-6">
              About the ECE Department
            </h3>

            <ul className="space-y-4 mb-8 text-left inline-block">
              <li className="flex items-start gap-3 text-white/80 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 flex-shrink-0 shadow-[0_0_8px_rgba(156,163,175,0.6)]" />
                <span>The <span className="text-white font-medium">Electronics and Communication Engineering</span> Department emphasizes strong fundamentals in electronics, communication systems, and modern technologies.</span>
              </li>
              <li className="flex items-start gap-3 text-white/80 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 flex-shrink-0 shadow-[0_0_8px_rgba(203,213,225,0.6)]" />
                <span>We blend theoretical knowledge with practical application, supported by <span className="text-white font-medium">state-of-the-art laboratories</span> and advanced computing facilities.</span>
              </li>
              <li className="flex items-start gap-3 text-white/80 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2.5 flex-shrink-0 shadow-[0_0_8px_rgba(209,213,219,0.6)]" />
                <span>Students are encouraged to engage in technical activities, research, and industry-oriented workshops to stay current with <span className="text-white font-medium">emerging trends</span>.</span>
              </li>
              <li className="flex items-start gap-3 text-white/80 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 flex-shrink-0 shadow-[0_0_8px_rgba(148,163,184,0.6)]" />
                <span>Through events like the <span className="text-white font-medium">Galaxy Symposium</span>, the department fosters innovation, technical excellence, and collaborative learning among future engineers.</span>
              </li>
            </ul>


          </motion.div>

          {/* Right - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group border border-white/10 hover:border-purple-500/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <highlight.icon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-gray-200 transition-colors">{highlight.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Theme Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 border border-white/20 bg-gradient-to-br from-white/5 to-gray-500/5"
            >
              <h4 className="font-orbitron text-lg font-bold text-white mb-3">
                THEME: SPACE & BEYOND
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Driven by the theme &quot;Space & Beyond,&quot; Galaxy 2K26 aims to inspire students
                to explore cutting-edge advancements and shape the future of technology.
                Join us as we embark on this cosmic journey of innovation and discovery.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Previous Glimpses Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32"
        >
          <div className="text-center mb-8">
            <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-2">
              Glimpses of Galaxy
            </h3>
            <p className="text-white/60 text-sm">
              A look back at our previous tech symposiums
            </p>
          </div>

          <ImageMarquee
            images={[
              '/glimpse-1.jpg',
              '/glimpse-2.jpg',
              '/glimpse-3.jpg',
              '/glimpse-4.jpg',
              '/glimpse-5.jpg'
            ]}
            speed={40}
          />
        </motion.div>
      </div>
    </section >
  );
}
