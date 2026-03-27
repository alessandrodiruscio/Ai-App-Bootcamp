// GITHUB EXPORT TEST: If you can see this comment on GitHub, the export is working perfectly! (Added at 11:39 UTC)
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring } from "motion/react";
import { 
  Users, 
  Video, 
  Rocket, 
  DollarSign, 
  Layout, 
  Cpu,
  CheckCircle2, 
  ArrowRight,
  Clock,
  Zap,
  BookOpen,
  Trophy,
  Star,
  ShieldCheck,
  Code2,
  Sparkles,
  Instagram,
  Heart,
  Camera,
  Layers,
  MousePointer2,
  Smartphone,
  Bot,
  Check,
  XCircle,
  ClipboardList,
  FileText,
  Plus,
  Minus,
  ChevronDown,
  Settings,
  LogOut,
  Gift,
  Tablet,
  User
} from "lucide-react";
import { auth, onAuthStateChanged, signOut } from "./firebase";

const AppImageShowcase = ({ src, alt }: { src: string, alt: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [15, -15]), { stiffness: 50, damping: 20 });
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 1], [-10, 10]), { stiffness: 50, damping: 20 });
  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), { stiffness: 50, damping: 20 });

  return (
    <div className="relative mx-auto w-full max-w-[300px] md:max-w-[550px] lg:max-w-[500px] py-10" style={{ perspective: "2000px" }}>
      <motion.div 
        ref={ref}
        style={{ 
          rotateX,
          rotateY,
          y: translateY,
          transformStyle: "preserve-3d"
        }}
        className="relative group"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto drop-shadow-2xl mix-blend-multiply" 
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
};

const BackgroundGlow = React.memo(({ color = 'insta-pink', position = 'top-left' }: { color?: 'insta-pink' | 'insta-purple' | 'insta-orange', position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  const colorMap = {
    'insta-pink': '#fd1d1d',
    'insta-purple': '#833ab4',
    'insta-orange': '#fcb045'
  };

  return (
    <div 
      className={`absolute ${positionClasses[position]} w-[800px] h-[800px] pointer-events-none z-0 opacity-[0.08]`}
      style={{
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
        willChange: 'transform'
      }}
    />
  );
});

const TodoListAnimation = () => {
  const items = [
    "Find Your Million-Dollar App Idea",
    "Unlock Your Free AI Power-Tools",
    "Design Your App Without Drawing",
    "Teach AI to Build Your Features",
    "Launch Your First Working Prototype"
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [checkedIndex, setCheckedIndex] = useState(-1);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const index = Math.floor(latest * (items.length + 1)) - 1;
    setCheckedIndex(index);
  });

  return (
    <div ref={containerRef} className="bg-white rounded-[40px] p-10 shadow-2xl border border-neutral-100 max-w-md w-full mx-auto relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-2 insta-gradient" />
      <div className="flex items-center justify-between mb-10">
        <div>
          <h4 className="text-2xl font-display font-bold text-neutral-900">Week 1 Roadmap</h4>
          <p className="text-sm text-neutral-400 font-medium mt-1">The Foundation</p>
        </div>
        <div className="flex h-10 w-10 rounded-2xl bg-green-50 items-center justify-center">
          <ClipboardList className="w-5 h-5 text-green-600" />
        </div>
      </div>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-5 group/item">
            <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${index <= checkedIndex ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/20' : 'border-neutral-100 bg-neutral-50'}`}>
              <motion.div
                initial={false}
                animate={{ 
                  scale: index <= checkedIndex ? 1 : 0, 
                  opacity: index <= checkedIndex ? 1 : 0,
                  rotate: index <= checkedIndex ? 0 : -45
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-5 h-5 text-white stroke-[3]" />
              </motion.div>
            </div>
            <div className="relative flex-1">
              <span className={`text-lg font-semibold transition-all duration-500 block ${index <= checkedIndex ? 'text-neutral-400' : 'text-neutral-700'}`}>
                {item}
              </span>
              {index <= checkedIndex && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute top-1/2 left-0 h-[2px] bg-neutral-300 -translate-y-1/2"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 pt-8 border-t border-neutral-50 flex items-center justify-between">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-neutral-100 overflow-hidden">
              <img src={`https://picsum.photos/seed/user${i+10}/100/100`} alt="User" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
          Week 1 of 6
        </span>
      </div>
    </div>
  );
};

const CountdownTimer = ({ targetDate, variant = 'large' }: { targetDate: string, variant?: 'large' | 'compact' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (variant === 'compact') {
    return (
      <div className="flex gap-3 items-center">
        {[
          { label: 'd', value: timeLeft.days },
          { label: 'h', value: timeLeft.hours },
          { label: 'm', value: timeLeft.minutes },
          { label: 's', value: timeLeft.seconds }
        ].map((item, i) => (
          <div key={i} className="flex items-baseline gap-0.5">
            <span className="text-sm font-bold tabular-nums">{String(item.value).padStart(2, '0')}</span>
            <span className="text-[10px] font-bold uppercase opacity-50">{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex gap-6 md:gap-10 ${variant === 'large' ? 'justify-center' : ''}`}>
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-display font-bold text-neutral-900 mb-1 tabular-nums">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-400">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const Illustration = ({ type }: { type: 'hero' | 'curriculum' | 'community' | 'build' | 'landing' | 'checkout' | 'marketing' }) => {
  if (type === 'hero') {
    return (
      <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] flex items-center justify-center">
        {/* Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-[120%] aspect-square opacity-30 rounded-full blur-[80px]"
            style={{
              background: 'conic-gradient(from 0deg, #833ab4, #fd1d1d, #fcb045, #fd1d1d, #833ab4)',
              willChange: 'transform'
            }}
          />
        </div>
        
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Main Illustration Image */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full z-10"
          >
            <img 
              src="https://i.postimg.cc/VvFbVmZG/mockup.png" 
              alt="Bootcamp Illustration" 
              className="w-full h-auto drop-shadow-[0_32px_64px_rgba(0,0,0,0.2)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Floating UI: AI Engine Active */}
          <motion.div 
            animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 -left-6 md:top-8 md:left-0 z-40 scale-75 md:scale-100"
          >
            <div className="bg-white/95 p-4 rounded-2xl border border-white shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl insta-gradient flex items-center justify-center shadow-lg shadow-insta-pink/20">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <div className="text-neutral-900 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">AI Engine Active</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <div className="text-neutral-500 text-[9px] font-bold uppercase tracking-wider">Optimizing Funnels</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating UI: Revenue Badge */}
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-4 -right-6 md:bottom-12 md:right-0 z-40 scale-75 md:scale-100"
          >
            <div className="bg-neutral-900/95 p-5 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Total Revenue</div>
              </div>
              <div className="text-2xl font-display font-bold text-white tracking-tight">$15,364.00</div>
              <div className="mt-2 flex items-center gap-2">
                <div className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold">+12.5%</div>
              </div>
            </div>
          </motion.div>

          {/* New Floating UI: User Growth */}
          <motion.div 
            animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 -right-12 z-30 hidden lg:block"
          >
            <div className="bg-white/90 p-4 rounded-2xl border border-white shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 insta-text-gradient" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Growth</span>
              </div>
              <div className="flex items-end gap-1">
                {[40, 70, 50, 90, 60, 100].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: h * 0.3 }}
                    transition={{ delay: 1.5 + (i * 0.1) }}
                    className="w-1.5 insta-gradient rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Decorative Sparkles */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 right-4 z-20"
          >
            <Sparkles className="w-16 h-16 text-insta-purple blur-sm" />
          </motion.div>
          
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [1, 0.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 left-4 z-20"
          >
            <Sparkles className="w-12 h-12 text-insta-orange blur-sm" />
          </motion.div>
        </div>
      </div>
    );
  }
  if (type === 'build') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-[240px] aspect-square">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: i * -12, 
                  scale: 1,
                  rotate: i * 2
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                }}
                className="absolute inset-x-0 -mt-10 bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex flex-col gap-3"
                style={{ zIndex: 10 - i }}
              >
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="h-full insta-gradient" 
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-neutral-200" />
                  <div className="w-full h-2 bg-neutral-50 rounded-full" />
                </div>
                <div className="w-2/3 h-2 bg-neutral-50 rounded-full" />
              </motion.div>
            ))}
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4 text-insta-orange z-20"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
        </div>
      </div>
    );
  }
  if (type === 'landing') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <motion.div 
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-full max-w-[200px] overflow-hidden"
        >
          <div className="h-6 bg-neutral-100/50 border-b border-neutral-200 flex items-center px-2 gap-1 rounded-t-2xl">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          </div>
          <div className="p-3 space-y-3">
            <div className="h-8 w-full insta-gradient opacity-10 rounded-lg" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-neutral-200 rounded-full" />
              <div className="h-1.5 w-5/6 bg-neutral-200 rounded-full" />
              <div className="h-1.5 w-4/6 bg-neutral-200 rounded-full" />
            </div>
            <div className="h-6 w-full bg-neutral-900 rounded-lg" />
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-8 bg-neutral-100 rounded-lg" />
              <div className="h-8 bg-neutral-100 rounded-lg" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  if (type === 'checkout') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-[220px]">
          <motion.div 
            animate={{ rotateY: [0, 10, 0], rotateX: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full aspect-[1.6/1] bg-neutral-900 rounded-2xl shadow-2xl p-4 flex flex-col justify-between text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-insta-gradient opacity-20 blur-3xl" />
            <div className="flex justify-between items-start">
              <div className="w-8 h-6 bg-white/10 rounded-lg" />
              <div className="w-6 h-6 rounded-full bg-white/5" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-white/20 rounded-full" />
              <div className="flex justify-between items-end">
                <div className="h-3 w-20 bg-white/40 rounded-lg" />
                <div className="w-6 h-3 bg-white/20 rounded-lg" />
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-green-500 shadow-lg flex items-center justify-center text-white"
          >
            <Check className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    );
  }
  if (type === 'marketing') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-[200px] aspect-square flex items-end justify-between gap-1.5">
          {[40, 70, 50, 90, 60].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ 
                duration: 1, 
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1
              }}
              className="flex-1 insta-gradient rounded-t-lg opacity-40"
            />
          ))}
          <motion.div 
            animate={{ 
              y: [0, -80],
              x: [0, 15],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-insta-pink"
          >
            <Rocket className="w-10 h-10" />
          </motion.div>
        </div>
      </div>
    );
  }
  if (type === 'curriculum') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <div className="absolute inset-0 insta-gradient opacity-5" />
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="w-20 h-20 rounded-[28px] flex items-center justify-center relative group"
            >
              <div className="absolute inset-0 rounded-[28px] insta-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-insta-purple/10 flex items-center justify-center mb-0.5">
                <Cpu className="w-7 h-7 text-insta-purple" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg border border-neutral-50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-insta-orange" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-neutral-200"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="w-20 h-20 rounded-[28px] flex items-center justify-center relative group"
            >
              <div className="absolute inset-0 rounded-[28px] insta-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-insta-pink/10 flex items-center justify-center mb-0.5">
                <Layout className="w-7 h-7 text-insta-pink" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="text-neutral-200"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.9, type: "spring" }}
              className="w-20 h-20 rounded-[28px] flex items-center justify-center relative group"
            >
              <div className="absolute inset-0 rounded-[28px] insta-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-insta-orange/10 flex items-center justify-center mb-0.5">
                <Rocket className="w-7 h-7 text-insta-orange" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-insta-green text-white shadow-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
          
          <div className="w-full space-y-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + (i * 0.1) }}
                className="h-10 bg-white/80 rounded-xl shadow-sm border border-neutral-100 flex items-center px-4 gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                </div>
                <div className={`h-1.5 bg-neutral-100 rounded-full ${i === 1 ? 'w-3/4' : i === 2 ? 'w-1/2' : 'w-2/3'}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (type === 'community') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <div className="absolute inset-0 insta-gradient opacity-5" />
        <div className="relative z-10 flex -space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-white flex items-center justify-center overflow-hidden"
            >
              <Users className="w-8 h-8 insta-text-gradient opacity-40" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const BuildCard = ({ title, category, description, icon: Icon }: { title: string, category: string, description: string, icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="group relative overflow-hidden rounded-[40px] bg-white border border-neutral-100 shadow-sm p-8 hover:shadow-2xl transition-shadow duration-300"
  >
    <div className="mb-8 h-64">
      <Illustration type="build" />
    </div>
    <span className="text-xs font-bold uppercase tracking-widest insta-text-gradient mb-2 block">{category}</span>
    <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
    <p className="text-neutral-500 leading-relaxed mb-6">{description}</p>
    <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
      <Icon className="w-5 h-5 insta-text-gradient" />
      <span>AI-Powered Module</span>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-8 rounded-[32px] bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group"
  >
    <div className="w-14 h-14 insta-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-white w-7 h-7" />
    </div>
    <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
    <p className="text-neutral-500 leading-relaxed">{description}</p>
  </motion.div>
);

const WeekItem = ({ week, title, details }: { week: number, title: string, details: string[] }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex gap-6 pb-12 border-l-2 border-neutral-100 ml-4 relative last:pb-0"
  >
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full insta-gradient border-2 border-white shadow-sm" />
    <div className="flex-1 pl-8">
      <span className="text-base font-display font-bold insta-text-gradient uppercase tracking-widest">Week {week}</span>
      <h3 className="text-3xl md:text-4xl font-display font-bold mt-1 mb-6 tracking-tight">{title}</h3>
      <ul className="space-y-4">
        {details.map((detail, i) => (
          <li key={i} className="flex items-center gap-3 text-neutral-600 text-lg">
            <CheckCircle2 className="w-6 h-6 insta-text-gradient flex-shrink-0" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const PricingCard = ({ title, price, period, description, features, checkoutUrl, isPopular }: { title: string, price: string, period: string, description: string, features: string[], checkoutUrl: string, isPopular?: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-10 rounded-[40px] border ${isPopular ? 'bg-neutral-950 text-white border-white/10 shadow-2xl scale-105 z-10' : 'bg-white text-neutral-900 border-neutral-100 shadow-sm'} relative flex flex-col transition-colors transition-shadow duration-300`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 insta-gradient text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-display font-bold mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-5xl font-display font-bold">${price}</span>
        <span className={`text-sm font-medium ${isPopular ? 'text-neutral-400' : 'text-neutral-500'}`}>{period}</span>
      </div>
      <p className={`mb-8 leading-relaxed ${isPopular ? 'text-neutral-400' : 'text-neutral-500'}`}>{description}</p>
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((feature, i) => {
          const isNegative = feature.startsWith("No ");
          return (
            <li key={i} className="flex items-center gap-3">
              {isNegative ? (
                <XCircle className={`w-5 h-5 shrink-0 ${isPopular ? 'text-white/20' : 'text-neutral-300'}`} />
              ) : (
                <CheckCircle2 className="w-5 h-5 insta-text-gradient shrink-0" />
              )}
              <span className={`text-sm font-medium ${isPopular ? 'text-neutral-300' : 'text-neutral-700'} ${isNegative ? 'opacity-50' : ''}`}>
                {feature}
              </span>
            </li>
          );
        })}
      </ul>
      
      <a 
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${isPopular ? 'insta-gradient text-white hover:scale-[1.02] active:scale-[0.98]' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}
      >
        Select Plan
        <ArrowRight className="w-5 h-5" />
      </a>
    </motion.div>
  );
};

const FAQItem = ({ faq }: { faq: { q: string, a: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      className="border border-neutral-100 rounded-2xl overflow-hidden"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="font-bold text-lg text-neutral-900">{faq.q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-neutral-900 text-white' : 'bg-neutral-50 text-neutral-400'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 text-neutral-500 leading-relaxed">
          {faq.a}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SequenceSection = ({ progress }: { progress: any }) => {
  const sequenceRef = useRef(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: sequenceRef,
    offset: ["start center", "end center"]
  });

  // Use localProgress to ensure the line starts at the first step
  // and ends at the last step
  const lineHeight = useTransform(localProgress, [0, 0.8], ["0%", "100%"]);
  const lineOpacity = useTransform(localProgress, [0, 0.1], [0, 1]);

  return (
    <section id="sequence" ref={sequenceRef} className="py-10 md:py-16 bg-neutral-50/50 px-6 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-[0.2em] insta-text-gradient mb-4 block"
          >
            The Roadmap to Revenue
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Your 4-Step <span className="insta-text-gradient">Launch Sequence.</span></h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            From idea to revenue in four strategic steps. Each phase builds upon the last to create a self-sustaining digital empire.
          </p>
        </div>

        <div className="relative space-y-12 md:space-y-0">
          {/* Vertical Connecting Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 -translate-x-1/2 hidden md:block" />
          
          {/* Animated Vertical Connecting Line */}
          <motion.div 
            style={{ height: lineHeight, opacity: lineOpacity }}
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-insta-purple via-insta-pink to-insta-orange -translate-x-1/2 hidden md:block z-10 origin-top rounded-full"
          />
          
          {[
            {
              id: "01",
              step: "The Product",
              title: "The Zero-Cost App",
              desc: "Build a fully functional, production-ready application using only free-tier tools and AI. No credit card required, just pure innovation.",
              icon: <Zap className="w-6 h-6" />,
              color: "insta-blue",
              gradient: "from-blue-500 to-cyan-400",
              illustration: "build",
              align: "left"
            },
            {
              id: "02",
              step: "Conversion",
              title: "Landing Page",
              desc: "Design and deploy a stunning, responsive landing page that turns casual visitors into loyal customers.",
              icon: <Layout className="w-6 h-6" />,
              color: "insta-orange",
              gradient: "from-orange-500 to-yellow-400",
              illustration: "landing",
              align: "right"
            },
            {
              id: "03",
              step: "Monetization",
              title: "Checkout Flow",
              desc: "Create a secure, professional checkout page to monetize your creation and handle payments.",
              icon: <DollarSign className="w-6 h-6" />,
              color: "insta-pink",
              gradient: "from-pink-500 to-rose-400",
              illustration: "checkout",
              align: "left"
            },
            {
              id: "04",
              step: "Scaling",
              title: "Marketing Machine",
              desc: "Launch your app with a self-sustaining marketing system. Automate your outreach and lead generation to scale fast.",
              icon: <Rocket className="w-6 h-6" />,
              color: "insta-purple",
              gradient: "from-purple-600 to-indigo-500",
              illustration: "marketing",
              align: "right"
            }
          ].map((item, idx) => (
            <div key={item.id} className="relative py-8 md:py-12">
              {/* Step Marker & Animation Container */}
              <div className="absolute left-0 md:left-1/2 top-8 md:top-1/2 md:-translate-y-1/2 z-20">
                <div className="relative flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 rounded-full bg-white border-4 border-neutral-100 shadow-xl flex items-center justify-center text-xl font-display font-black text-neutral-900 z-30 md:-translate-x-1/2"
                  >
                    {item.id}
                  </motion.div>
                  
                  {/* Animation next to the number - Desktop */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: item.align === 'left' ? 20 : -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`hidden md:block aspect-video absolute top-1/2 -translate-y-1/2 ${
                      item.id === '01' 
                        ? 'w-[400px] lg:w-[600px] left-[-20px] lg:left-[-60px]' 
                        : item.align === 'left' ? 'w-72 lg:w-96 left-8 lg:left-12' : 'w-72 lg:w-96 right-8 lg:right-12'
                    }`}
                  >
                    <Illustration type={item.illustration as any} />
                  </motion.div>
                </div>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 md:gap-8 lg:gap-8 lg:gap-12 items-center`}>
                <motion.div 
                  initial={{ opacity: 0, x: item.align === 'left' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`${item.align === 'right' ? 'md:col-start-2' : 'md:col-start-1'} pl-16 md:pl-0`}
                >
                  <div className={`text-left ${item.align === 'right' ? 'md:text-left' : 'md:text-right'} ${item.align === 'right' ? 'md:pl-8 lg:pl-24' : 'md:pr-8 lg:pr-24'}`}>
                    <span className="text-sm font-bold uppercase tracking-widest insta-text-gradient mb-2 block">Step {item.id}: {item.step}</span>
                    <h3 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight tracking-tight">{item.title}</h3>
                    <p className={`text-lg text-neutral-500 leading-relaxed max-w-md ${item.align === 'left' ? 'md:ml-auto md:mr-0' : ''}`}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
                
                {/* Mobile Animation */}
                <div className="md:hidden pl-16 mt-4">
                  <div className={`w-full aspect-video ${item.id === '01' ? 'max-w-[350px] -ml-8' : 'max-w-[200px]'}`}>
                    <Illustration type={item.illustration as any} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAuthLoading(false);
    });

    // Fallback timeout for auth loading (3 seconds)
    const timeout = setTimeout(() => {
      setIsAuthLoading(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 rounded-full border-2 border-neutral-100 border-t-insta-pink animate-spin" />
      </div>
    );
  }

  return <MainAppContent user={user} />;
}

const MainAppContent = ({ user }: { user: any }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const combinedRef = useRef(null);
  const { scrollYProgress: combinedProgress } = useScroll({
    target: combinedRef,
    offset: ["start center", "end center"]
  });

  const headerColor = useTransform(
    combinedProgress,
    [0.7, 0.9],
    ["#737373", "#171717"] // From neutral-500 to neutral-900
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-insta-pink selection:text-white pt-10">
      {/* Sticky Countdown Bar */}
      <div className="bg-neutral-950 text-white py-3 px-6 fixed top-0 w-full z-[70] shadow-2xl overflow-hidden">
        {/* Animated Background Glow */}
        <motion.div 
          animate={{ x: [-500, 500] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-insta-pink/10 to-transparent pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-2 md:gap-4 relative z-10">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-insta-orange text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-insta-orange/20">
              <Zap className="w-3 h-3 fill-current" />
              Next Bootcamp
            </div>
            <p className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-widest">
              <span className="md:hidden text-insta-orange mr-1">BOOTCAMP</span>
              Starts April 6th
            </p>
          </div>
          
          <div className="flex items-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 hidden lg:block">Closing In:</span>
              <CountdownTimer targetDate="2026-04-06T00:00:00" variant="compact" />
            </div>
            <a 
              href="#pricing" 
              onClick={(e) => scrollToSection(e, 'pricing')}
              className="hidden md:flex items-center gap-2 insta-gradient text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-insta-pink/20"
            >
              Claim Your Spot
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
        
        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] insta-gradient opacity-50" />
      </div>

      {/* Seamless Hero & Roadmap Container */}
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center pt-28 pb-12 md:pt-32 md:pb-20 px-6 relative">
        <BackgroundGlow color="insta-purple" position="top-left" />
        <BackgroundGlow color="insta-orange" position="bottom-right" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white text-neutral-700 text-xs md:text-sm font-bold mb-8 border border-neutral-200 shadow-md"
              >
                <div className="w-2 h-2 rounded-full bg-insta-orange animate-pulse" />
                <Users className="w-3.5 h-3.5 md:w-4 md:h-4 insta-text-gradient" />
                <span className="uppercase tracking-wider">Limited to 10 exclusive spots</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[0.9]"
              >
                The AI App <br />
                <span className="insta-text-gradient">Bootcamp.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-neutral-500 max-w-xl mb-12 leading-relaxed"
              >
                Build and Launch Your First AI-Powered App in 6 Weeks — <span className="font-bold text-neutral-900">No Coding Required.</span>
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <a 
                  href="#pricing" 
                  onClick={(e) => scrollToSection(e, 'pricing')}
                  className="w-full sm:w-auto insta-gradient text-white px-10 py-5 rounded-2xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-insta-pink/20"
                >
                  Join the Bootcamp
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="relative origin-center lg:scale-110 xl:scale-125"
            >
              <Illustration type="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Weekly Roadmap Section */}
      <section className="py-10 md:py-16 px-6 relative">
        <BackgroundGlow color="insta-pink" position="center" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-insta-pink/5 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-insta-purple/5 blur-[100px] rounded-full" />
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <TodoListAnimation />
              </motion.div>
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-bold uppercase tracking-[0.2em] insta-text-gradient mb-4 block">The 6-Week Roadmap</span>
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight leading-[1.1]">
                  From Zero to App. <br />
                  <span className="insta-text-gradient">No Code Required.</span>
                </h2>
                <p className="text-xl text-neutral-500 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                  Stop worrying about technical hurdles. We show you how to use the world's most powerful AI tools to build your dream app for free. Follow our proven roadmap and go from "just an idea" to a live application without writing a single line of code.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                  <div className="flex items-center gap-3 text-neutral-900 font-bold">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <span>Build for $0</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-900 font-bold">
                    <div className="w-10 h-10 rounded-xl bg-insta-orange/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-insta-orange" />
                    </div>
                    <span>100% Beginner Friendly</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Core Features - Dark Section */}
      <section className="py-12 md:py-20 px-6 bg-neutral-950 relative overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 opacity-20 pointer-events-none" 
          style={{ background: 'radial-gradient(circle, #833ab4 0%, transparent 70%)', willChange: 'transform' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 opacity-10 pointer-events-none" 
          style={{ background: 'radial-gradient(circle, #fcb045 0%, transparent 70%)', willChange: 'transform' }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Not just another <span className="insta-text-gradient">online course.</span>
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              This is a live experience where you see me build a real app from scratch using zero-cost AI tools. No pre-recorded fluff—just real-time building, real-time questions, and real-time results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[40px] bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors duration-300 group overflow-hidden relative"
            >
              {/* Background Decorative Icon */}
              <div 
                className="absolute -bottom-12 -right-12 w-64 h-64 opacity-10 group-hover:opacity-20 transition-opacity" 
                style={{ background: 'radial-gradient(circle, #fd1d1d 0%, transparent 70%)', willChange: 'transform' }}
              />
              <Video className="absolute -bottom-8 -right-8 w-48 h-48 text-white/5 -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-700 pointer-events-none" />

              <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 relative z-10 md:w-1/2 md:mx-auto lg:w-full">
                <img 
                  src="https://i.postimg.cc/kgtKRqGZ/new-zoomcall.png" 
                  alt="Weekly Live Calls" 
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                  <Video className="w-6 h-6 insta-text-gradient" />
                  Weekly LIVE Sessions
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Watch me build a functional app in front of you using AI tools with zero infrastructure costs. Ask questions in real time as we solve problems together.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 rounded-[40px] bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors duration-300 group overflow-hidden relative"
            >
              {/* Background Decorative Icon */}
              <div 
                className="absolute -bottom-12 -right-12 w-64 h-64 opacity-10 group-hover:opacity-20 transition-opacity" 
                style={{ background: 'radial-gradient(circle, #833ab4 0%, transparent 70%)', willChange: 'transform' }}
              />
              <Users className="absolute -bottom-8 -right-8 w-48 h-48 text-white/5 -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-700 pointer-events-none" />

              <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 relative z-10 md:w-1/2 md:mx-auto lg:w-full">
                <img 
                  src="https://i.postimg.cc/K8JWvNp0/chat.png" 
                  alt="Community Support" 
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 insta-text-gradient" />
                  Community Support
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Get the support and accountability you need in our private community. Share your progress, get feedback, and stay on track while you build your own app.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 rounded-[40px] bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors duration-300 group overflow-hidden relative"
            >
              {/* Background Decorative Icon */}
              <div 
                className="absolute -bottom-12 -right-12 w-64 h-64 opacity-10 group-hover:opacity-20 transition-opacity" 
                style={{ background: 'radial-gradient(circle, #fcb045 0%, transparent 70%)', willChange: 'transform' }}
              />
              <Zap className="absolute -bottom-8 -right-8 w-48 h-48 text-white/5 -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-700 pointer-events-none" />

              <div className="mb-8 relative z-10 md:w-1/2 md:mx-auto lg:w-full">
                <img 
                  src="https://i.postimg.cc/L5YMG7wP/mockup-laptop-mobile.png" 
                  alt="Zero-Cost Stack" 
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 insta-text-gradient" />
                  Zero-Cost Stack
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Master the exact AI tools that allow you to build and host your application for free. No expensive subscriptions or hidden costs required.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div ref={combinedRef}>
        <SequenceSection progress={combinedProgress} />

        {/* App Types & Monetization Section */}
        <section className="py-10 md:py-16 px-6 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-24">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-[0.2em] insta-text-gradient mb-4 block"
              >
                The Creator Economy 2.0
              </motion.span>
              <motion.h2 
                className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight insta-text-gradient"
              >
                Apps for every niche.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl text-neutral-500 max-w-2xl mx-auto"
              >
              The possibilities are endless. Whether you're in fitness, finance, or food, our AI-powered framework adapts to <motion.span 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="insta-text-gradient font-bold inline-block"
              >any industry</motion.span> you can imagine.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                niche: "Fitness",
                title: "AI Macro & Meal Planner",
                desc: "A custom tool for your followers to get personalized nutrition plans in seconds.",
                icon: <Users className="w-6 h-6" />,
                color: "bg-insta-pink/10 text-insta-pink"
              },
              {
                niche: "Real Estate",
                title: "AI Listing Generator",
                desc: "Help agents turn property details into high-converting, viral listing descriptions.",
                icon: <Layout className="w-6 h-6" />,
                color: "bg-insta-purple/10 text-insta-purple"
              },
              {
                niche: "Marketing",
                title: "Viral Hook & Script Engine",
                desc: "A tool that generates 10 viral hooks and scripts for Reels based on any topic.",
                icon: <Video className="w-6 h-6" />,
                color: "bg-insta-orange/10 text-insta-orange"
              },
              {
                niche: "Personal Finance",
                title: "AI Wealth Tracker",
                desc: "An interactive calculator that helps your audience plan their path to financial freedom.",
                icon: <DollarSign className="w-6 h-6" />,
                color: "bg-blue-50 text-blue-600"
              }
            ].map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {app.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-neutral-900 px-3 py-1.5 rounded-full shadow-sm group-hover:bg-insta-pink transition-colors">
                    {app.niche}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{app.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{app.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-neutral-500 bg-neutral-100 px-6 py-3 rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 insta-text-gradient" />
              <span>Don't see your niche? The 6-week roadmap works for <span className="text-neutral-900 font-bold">any industry.</span></span>
            </motion.div>
          </div>

          <div className="bg-neutral-900 rounded-[48px] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-insta-gradient opacity-10 blur-[120px] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="text-center lg:text-left mb-16">
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  How to <span className="insta-text-gradient">Monetize</span> Your App
                </h3>
                <p className="text-neutral-400 text-lg max-w-2xl">
                  Building the app is just the beginning. Here are the three proven strategies to turn your AI tool into a revenue machine.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Standalone Product</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Sell your app as a premium digital product. Charge a one-time fee ($27-$97) or a monthly subscription for ongoing access to your tool.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">The Order Bump</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Increase your average order value by offering your app as a "one-click" add-on to your existing courses, ebooks, or coaching programs.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Gift className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">The Ultimate Lead Magnet</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    Offer your app for free in exchange for an email address. AI tools convert at 5x-10x the rate of traditional PDFs or webinars.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Apps Showcase Section */}
      <section className="py-12 md:py-20 px-6 bg-white relative overflow-hidden">
        <BackgroundGlow color="insta-pink" position="top-right" />
        <BackgroundGlow color="insta-orange" position="bottom-left" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-[0.2em] insta-text-gradient mb-4 block"
            >
              Real World Results
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-neutral-900 mb-8 tracking-tight"
            >
              A few examples of AI tools & digital products <br className="hidden md:block" />
              <span className="insta-text-gradient">we've made money from so far:</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-neutral-500 max-w-2xl mx-auto"
            >
              I don't just teach this—I live it. These are actual applications built using the same methods you'll learn in the bootcamp.
            </motion.p>
          </div>

          <div className="space-y-12 md:space-y-20 lg:space-y-32">
            {[
              {
                title: "30-Day Content Challenge App",
                desc: "The ultimate tool for IG content creators. It generates 30 days of high-performing reels and carousels, complete with viral hooks, scripts, and CTAs tailored to your niche.",
                image: "https://i.postimg.cc/MTczyhsq/tablet1.png",
                color: "insta-pink",
                features: ["Viral Hook Generator", "Script Writing AI", "30-Day Calendar"]
              },
              {
                title: "ViralThumb AI",
                desc: "Stop guessing what works. This tool analyzes top-performing YouTube thumbnails in your niche and generates custom, high-CTR designs for your videos.",
                image: "https://i.postimg.cc/pT9PDg02/tablet2.png",
                color: "insta-orange",
                features: ["Competitor Analysis", "CTR Optimization", "AI Image Generation"]
              },
              {
                title: "Email FollowUp AI",
                desc: "Never lose a lead again. This intelligent assistant creates and schedules personalized email follow-ups, ensuring your communication stays consistent and effective.",
                image: "https://i.postimg.cc/bJGqQK6Y/tablet3.png",
                color: "insta-purple",
                features: ["Smart Scheduling", "Personalized Templates", "CRM Integration"]
              }
            ].map((app, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 md:gap-8 lg:gap-24`}>
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex-1 text-center lg:text-left"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 text-neutral-600 text-xs font-bold mb-6 border border-neutral-100">
                    <Rocket className="w-3.5 h-3.5 insta-text-gradient" />
                    <span>Live Product</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">{app.title}</h3>
                  <p className="text-xl text-neutral-500 leading-relaxed mb-8">
                    {app.desc}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-100 text-sm font-semibold text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-1 w-full"
                >
                  <AppImageShowcase src={app.image} alt={app.title} />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Meta Proof Note */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 md:mt-32 p-8 md:p-12 rounded-[40px] bg-neutral-50 border border-neutral-100 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 insta-gradient opacity-30" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-neutral-600 text-xs font-bold mb-6 border border-neutral-100 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 insta-text-gradient" />
                <span>Meta Proof</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 tracking-tight">
                By the way, <span className="insta-text-gradient">this entire landing page</span> was generated <br className="hidden md:block" />
                using the exact same AI system you're about to master.
              </h3>
              <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                No manual coding. No expensive designers. Just the power of AI-driven logic and the framework I'll be teaching you in this bootcamp.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum - Split Layout */}
      <section className="py-12 md:py-20 px-6 bg-white relative overflow-hidden">
        <BackgroundGlow color="insta-pink" position="top-right" />
        <BackgroundGlow color="insta-purple" position="bottom-left" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
              <span className="text-sm font-bold uppercase tracking-[0.2em] insta-text-gradient mb-4 block">The Roadmap</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
                Six Weeks to <br />
                <span className="insta-text-gradient">Launch.</span>
              </h2>
              <div className="mb-12">
                <p className="text-xl text-neutral-500 leading-relaxed mb-6">
                  Get the complete step-by-step tutorials on how to use AI to easily make and sell incredible digital products and tools.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-neutral-50 border border-neutral-100 text-neutral-600 text-sm font-medium">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  No coding experience or new monthly subscription necessary
                </div>
              </div>
              
              <div className="hidden lg:block h-80">
                <Illustration type="curriculum" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8 lg:space-y-12">
              <WeekItem 
                week={1}
                title="The $0 to App Blueprint"
                details={[
                  "The exact free tools you need to build your first AI app",
                  "How to find an app idea people actually pay for",
                  "How to talk to AI so it builds exactly what you want",
                  "Go from idea to working prototype in days"
                ]}
              />
              <WeekItem 
                week={2}
                title="The Big Launch Day"
                details={[
                  "Take your app from ready to live on the internet",
                  "Get it running on your own domain — no developer needed",
                  "Add the finishing touches that make it feel premium",
                  "Set up your branding so it looks like a real product"
                ]}
              />
              <WeekItem 
                week={3}
                title="The AI Landing Page That Sells For You"
                details={[
                  "Build a full sales page with AI — no extra tools or platforms",
                  "Let AI write the words that make people click buy",
                  "Fix the #1 reason most landing pages don't convert",
                  "Make it look perfect on mobile, where your buyers are"
                ]}
              />
              <WeekItem 
                week={4}
                title="The Checkout Formula"
                details={[
                  "Connect Stripe and PayPal so your app takes payments in minutes",
                  "Set up recurring revenue so money comes in every month",
                  "Remove every obstacle between your customer and the buy button",
                  "Automate your billing so you never chase an invoice again"
                ]}
              />
              <WeekItem 
                week={5}
                title="The Get Traffic Playbook"
                details={[
                  "Get your first users without spending a dollar on ads",
                  "Set up marketing workflows that run while you sleep",
                  "Create content that spreads your app to new audiences",
                  "Run your entire social media strategy in under an hour a week"
                ]}
              />
              <WeekItem 
                week={6}
                title="Scale Without Burnout"
                details={[
                  "Turn your one app into multiple income streams",
                  "Use AI to handle customer support automatically",
                  "Find partners who promote your app to their audience",
                  "Plan your next product without starting from scratch"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-10 md:py-16 lg:py-0 px-6 bg-neutral-50 relative overflow-hidden">
        <BackgroundGlow color="insta-purple" position="top-left" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:items-stretch">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-[95%] md:w-2/3 lg:w-full mx-auto lg:h-full flex items-end justify-center pt-8 mb-12 lg:pt-0 lg:mb-0"
            >
              <div className="relative group lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-[115%] flex items-end justify-center">
                <img 
                  src="https://i.postimg.cc/VNLdrf22/Me_smiling.png" 
                  alt="Alessandro Di Ruscio" 
                  className="w-full lg:w-auto lg:h-full object-contain object-bottom grayscale hover:grayscale-0 transition-all duration-700 drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -right-2 md:-right-6 lg:bottom-12 lg:-right-4 bg-white p-6 rounded-3xl shadow-2xl border border-neutral-100 max-w-[240px] z-20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-neutral-900">Verified Expert</span>
                </div>
                <p className="text-sm text-neutral-500 font-medium">Built 10+ AI products generating $50k+ in revenue.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:py-24"
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] insta-text-gradient mb-4 block">Meet Your Instructor</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
                I'm <span className="insta-text-gradient">Alessandro.</span>
              </h2>
              <div className="space-y-6 text-xl text-neutral-500 leading-relaxed">
                <p>
                  I'll be honest—at first, I was completely skeptical about building AI apps. Why? Because I have absolutely zero coding skills. The idea of creating software felt like a closed club I didn't have the password for.
                </p>
                <p>
                  But then I gave it a shot, and there was no turning back. I actually became obsessed. The very first app I published—the <strong>30-Day Content Challenge App</strong>—completely exploded and turned into a must-have tool for content creators.
                </p>
                <p>
                  From that moment on, I went down the rabbit hole and learned everything there is to know about building apps with AI. I realized this isn't just a trend; it's the future. You can build standalone products to sell, launch subscription services, or just create killer free tools to explode your email list.
                </p>
                <p className="font-bold text-neutral-900">
                  Don't miss the boat because this is the next big thing, and you don't need to be a programmer to jump in.
                </p>
              </div>
              
              <div className="mt-12 flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-display font-bold text-neutral-900 mb-1">10+</div>
                  <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Apps Built</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-neutral-900 mb-1">$50k+</div>
                  <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Revenue Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-neutral-900 mb-1">100%</div>
                  <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">No-Code Logic</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zero Hidden Costs Section */}
      <section className="py-10 md:py-16 px-6 bg-white relative overflow-hidden">
        <BackgroundGlow color="insta-purple" position="top-right" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-16 rounded-[48px] bg-neutral-900 text-white relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-insta-pink opacity-20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-insta-orange opacity-20 blur-[100px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold mb-6 border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  <span>Transparent Learning</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                  Zero Hidden Costs. <br />
                  <span className="insta-text-gradient">Zero Extra Subscriptions.</span>
                </h2>
                <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                  Forget about expensive monthly subscriptions. I'll show you how to build everything using <strong className="insta-text-gradient">free-tier tools</strong>—so you don't have to spend a single extra dollar on software to make your apps work.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "No expensive software to buy",
                    "No hidden monthly fees",
                    "No 'Pro' tools required",
                    "Free-tier tools focus"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-semibold text-neutral-300">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 w-48 md:w-56 lg:w-64 aspect-square rounded-[40px] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-6 text-center mx-auto lg:mx-0">
                <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-display font-bold mb-2">$0.00</div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-tight">Additional Investment Required</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-10 md:py-16 px-6 bg-neutral-50 relative overflow-hidden">
        <BackgroundGlow color="insta-orange" position="top-left" />
        <BackgroundGlow color="insta-pink" position="bottom-right" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-insta-pink/10 text-insta-pink text-sm font-bold mb-6"
            >
              <Clock className="w-4 h-4" />
              Next Bootcamp: April 6th, 2026
            </motion.div>
            <h2 className="text-5xl font-display font-bold mb-6 tracking-tight">
              Simple, Transparent <br />
              <span className="insta-text-gradient">Pricing.</span>
            </h2>
            <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-8">
              Choose the plan that works best for you. Both options include full access to the bootcamp and all bonuses.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white text-neutral-700 text-xs md:text-sm font-bold border border-neutral-200 shadow-md"
            >
              <div className="w-2 h-2 rounded-full bg-insta-orange animate-pulse" />
              <Users className="w-3.5 h-3.5 md:w-4 md:h-4 insta-text-gradient" />
              <span className="uppercase tracking-wider">Limited to 10 exclusive spots</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Full Payment"
              price="597"
              period="one-time"
              description="Save $144 by paying in full today. Get instant access to the pre-course materials and the 1-on-1 bonus."
              features={[
                "Full 6-Week Bootcamp Access",
                "Weekly Live Zoom Calls (Recorded)",
                "24/7 Private Chat Access",
                "App Launch Checklist Included",
                "Landing Page Copy Templates",
                "Exclusive 1-on-1 Strategy Call"
              ]}
              checkoutUrl="https://escape9to5.mysamcart.com/checkout/the-ai-app-bootcamp#samcart-slide-open-right" // Replace with your SamCart link
              isPopular={true}
            />
            <PricingCard 
              title="Installment Plan"
              price="247"
              period="per month for 3 months"
              description="Spread the cost over three months. Perfect for managing your cash flow."
              features={[
                "Full 6-Week Bootcamp Access",
                "Weekly Live Zoom Calls (Recorded)",
                "24/7 Private Chat Access",
                "App Launch Checklist Included",
                "Landing Page Copy Templates",
                "No 1-on-1 Strategy Call"
              ]}
              checkoutUrl="https://escape9to5.mysamcart.com/checkout/the-ai-app-bootcamp#samcart-slide-open-right" // Replace with your SamCart link
              isPopular={false}
            />
          </div>

          {/* Guarantee Section (Compact & Close to Pricing) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-10 border border-neutral-200 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
          >
            <div className="absolute top-0 left-0 w-full md:w-2 h-2 md:h-full insta-gradient" />
            
            <div className="flex-shrink-0 relative w-20 h-20 md:w-24 md:h-24">
              <div 
                className="absolute inset-0 opacity-20 rounded-full pointer-events-none" 
                style={{ background: 'radial-gradient(circle, #833ab4 0%, #fd1d1d 50%, transparent 70%)', filter: 'blur(20px)' }}
              />
              <img 
                src="https://i.postimg.cc/jj6ZtMty/Guara.png" 
                alt="100% Guarantee" 
                className="w-full h-full object-contain drop-shadow-lg relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-insta-purple uppercase tracking-widest mb-3">
                <Star className="w-4 h-4 fill-insta-purple" />
                <span>Zero Risk. Full Result.</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">You're not risking anything</h3>
              <p className="text-neutral-600 leading-relaxed">
                "If you attend every call and complete the weekly assignments but don't have a live, functioning app by the end of Week 6, <span className="font-bold text-neutral-900 underline decoration-insta-pink/30 underline-offset-4">I will work with you 1-on-1 until you do.</span>"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategy Call Section */}
      <section className="py-10 md:py-16 px-6 bg-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-insta-purple/10 text-insta-purple text-sm font-bold mb-6">
                <Star className="w-4 h-4 fill-insta-purple" />
                Exclusive Pay-in-Full Bonus
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
                Your Private <br />
                <span className="insta-text-gradient">Strategy Call.</span>
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                When you pay in full, you don't just get the bootcamp—you get me. At the end of the 6 weeks, we'll hop on a private 45-minute call to audit your app, refine your marketing strategy, and map out your next 12 months of growth.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Personalized App Audit & Feedback",
                  "Custom Marketing Roadmap",
                  "Direct Q&A for Your Specific Business",
                  "Scaling & Monetization Strategy"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-insta-green/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-insta-green" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full md:w-2/3 lg:w-[110%] lg:max-w-none lg:-ml-4 mx-auto"
            >
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ background: 'radial-gradient(circle, #833ab4 0%, #fd1d1d 50%, transparent 70%)', filter: 'blur(60px)' }}
              />
              <div className="relative z-10">
                <img 
                  src="https://i.postimg.cc/x8RKDxmn/laptopfront.png" 
                  alt="1-on-1 Strategy Call Mockup" 
                  className="w-full h-auto drop-shadow-2xl mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-neutral-900 text-white shadow-2xl max-w-[240px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-insta-purple flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="font-bold">45 Minutes</span>
                  </div>
                  <p className="text-xs text-neutral-400">Dedicated entirely to your project and your success.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bonus Perks Section - Vibrant Gradient */}
      <section className="py-12 md:py-20 px-6 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 insta-gradient opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              Beyond the <br />
              <span className="insta-text-gradient">6 Weeks.</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              I want you to succeed long-term. That's why I've included these exclusive bonuses for our bootcamp members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "AI Prompt Library", desc: "My personal collection of 100+ tested prompts for app building." },
              { icon: ClipboardList, title: "App Launch Checklist", desc: "A step-by-step checklist to go from finished app to live and selling in 24 hours." },
              { icon: FileText, title: "Copy Templates", desc: "Fill-in-the-blank templates for your sales page, so you never stare at a blank screen." },
              { icon: Cpu, title: "Tech Stack Cheatsheet", desc: "A one-page reference of every tool, platform, and integration covered in the Bootcamp." }
            ].map((perk, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:insta-gradient transition-all">
                  <perk.icon className="w-7 h-7 text-white/40 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{perk.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>





      {/* FAQ Section */}
      <section className="py-10 md:py-16 px-6 bg-white relative overflow-hidden">
        <BackgroundGlow color="insta-pink" position="top-left" />
        <BackgroundGlow color="insta-orange" position="bottom-right" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-neutral-500">Everything you need to know about the bootcamp.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do I need any prior coding experience?",
                a: "Absolutely not. This bootcamp is specifically designed for non-technical founders and creators. We use AI as our primary 'coder', focusing on logic, prompting, and no-code tools to build fully functional applications."
              },
              {
                q: "How much time should I commit each week?",
                a: "You should plan for about 5-7 hours per week. This includes our 2-hour live session and roughly 3-5 hours for your weekly assignments and implementation."
              },
              {
                q: "What exactly will I have built by the end?",
                a: "You will have a live, functioning AI-powered web application. This includes a landing page, a user authentication system, a database, and a core AI feature (like a chatbot, content generator, or data analyzer)."
              },
              {
                q: "Are the AI tools we use free?",
                a: "Yes. We prioritize tools with generous free tiers (like Gemini, Vercel, and Supabase) so you can build and launch your MVP without any additional monthly software costs."
              },
              {
                q: "What if I miss a live session?",
                a: "No problem. Every live session is recorded and uploaded to our private member area within 2 hours, along with all the resources and code snippets discussed."
              },
              {
                q: "Is there support between the live calls?",
                a: "Yes! You'll have 24/7 access to our private Discord community where you can ask questions, get feedback, and collaborate with other bootcamp members."
              }
            ].map((faq, i) => (
              <div key={i}>
                <FAQItem faq={faq} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16 px-6 bg-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-neutral-50 text-neutral-600 text-sm font-bold mb-8 border border-neutral-100 shadow-sm">
            <Clock className="w-4 h-4 insta-text-gradient" />
            <span className="mr-2">Registration closes in:</span>
            <CountdownTimer targetDate="2026-04-06T00:00:00" variant="compact" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
            Ready to build <br />
            the future?
          </h2>
          <p className="text-xl text-neutral-500 mb-10 max-w-xl mx-auto">
            The next bootcamp is filling up fast. Secure your spot before the timer hits zero and registration closes for this cycle.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white text-neutral-700 text-xs md:text-sm font-bold mb-10 border border-neutral-200 shadow-md"
          >
            <div className="w-2 h-2 rounded-full bg-insta-orange animate-pulse" />
            <Users className="w-3.5 h-3.5 md:w-4 md:h-4 insta-text-gradient" />
            <span className="uppercase tracking-wider">Limited to 10 exclusive spots</span>
          </motion.div>
          <br />
          <a 
            href="#pricing" 
            onClick={(e) => scrollToSection(e, 'pricing')}
            className="insta-gradient text-white px-12 py-6 rounded-2xl font-bold text-xl hover:opacity-90 transition-all inline-flex items-center gap-3 group shadow-2xl shadow-insta-pink/30"
          >
            Apply for Bootcamp
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-6 border-t border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display font-bold text-2xl tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl insta-gradient flex items-center justify-center shadow-lg shadow-insta-pink/20">
              <Bot className="text-white w-5 h-5" />
            </div>
            <span>
              <span className="insta-text-gradient">AI App</span> <span className="text-neutral-900">Bootcamp</span>
            </span>
          </div>
          <div className="text-sm text-neutral-400 font-medium">
            © {new Date().getFullYear()} AI App Bootcamp. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
