import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/react";
import {
  Code2, BarChart2, Palette, Globe, Music, Camera,
  TrendingUp, PenLine, Dumbbell, Megaphone, Brain, ChefHat,
  ArrowRight, Sparkles, X, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ONBOARDING_KEY = "pathfinder-onboarding-done";

const CATEGORIES = [
  { icon: Code2,      label: "Programming",  skill: "Python Programming",      bg: "bg-blue-500/10",   border: "border-blue-200 dark:border-blue-800",   text: "text-blue-600 dark:text-blue-400",   ring: "ring-blue-500"   },
  { icon: Brain,      label: "AI / ML",       skill: "Machine Learning",         bg: "bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-800", text: "text-indigo-600 dark:text-indigo-400", ring: "ring-indigo-500" },
  { icon: BarChart2,  label: "Data Science",  skill: "Data Science",             bg: "bg-purple-500/10", border: "border-purple-200 dark:border-purple-800", text: "text-purple-600 dark:text-purple-400", ring: "ring-purple-500" },
  { icon: Palette,    label: "Design",        skill: "UI/UX Design",             bg: "bg-pink-500/10",   border: "border-pink-200 dark:border-pink-800",   text: "text-pink-600 dark:text-pink-400",   ring: "ring-pink-500"   },
  { icon: Globe,      label: "Languages",     skill: "Spanish Language",         bg: "bg-green-500/10",  border: "border-green-200 dark:border-green-800",  text: "text-green-600 dark:text-green-400",  ring: "ring-green-500"  },
  { icon: Music,      label: "Music",         skill: "Guitar Playing",           bg: "bg-orange-500/10", border: "border-orange-200 dark:border-orange-800", text: "text-orange-600 dark:text-orange-400", ring: "ring-orange-500" },
  { icon: TrendingUp, label: "Finance",       skill: "Personal Finance",         bg: "bg-emerald-500/10",border: "border-emerald-200 dark:border-emerald-800",text: "text-emerald-600 dark:text-emerald-400",ring: "ring-emerald-500"},
  { icon: PenLine,    label: "Writing",       skill: "Creative Writing",         bg: "bg-amber-500/10",  border: "border-amber-200 dark:border-amber-800",  text: "text-amber-600 dark:text-amber-400",  ring: "ring-amber-500"  },
  { icon: Dumbbell,   label: "Fitness",       skill: "Strength Training",        bg: "bg-cyan-500/10",   border: "border-cyan-200 dark:border-cyan-800",   text: "text-cyan-600 dark:text-cyan-400",   ring: "ring-cyan-500"   },
  { icon: Megaphone,  label: "Marketing",     skill: "Digital Marketing",        bg: "bg-violet-500/10", border: "border-violet-200 dark:border-violet-800", text: "text-violet-600 dark:text-violet-400", ring: "ring-violet-500" },
  { icon: Camera,     label: "Photography",   skill: "Digital Photography",      bg: "bg-red-500/10",    border: "border-red-200 dark:border-red-800",     text: "text-red-600 dark:text-red-400",     ring: "ring-red-500"    },
  { icon: ChefHat,    label: "Cooking",       skill: "Cooking Fundamentals",     bg: "bg-rose-500/10",   border: "border-rose-200 dark:border-rose-800",   text: "text-rose-600 dark:text-rose-400",   ring: "ring-rose-500"   },
];

const LEVELS = [
  { value: "Beginner",     emoji: "🌱", desc: "Just starting out — no experience needed" },
  { value: "Intermediate", emoji: "📈", desc: "Know the basics, ready to level up"        },
  { value: "Advanced",     emoji: "🚀", desc: "Experienced and want to go deeper"         },
];

const DURATIONS = [
  { value: "1 week",   label: "1 Week",    tag: "Sprint"    },
  { value: "2 weeks",  label: "2 Weeks",   tag: "Quick"     },
  { value: "1 month",  label: "1 Month",   tag: "Steady"    },
  { value: "2 months", label: "2 Months",  tag: "Thorough"  },
  { value: "3 months", label: "3 Months",  tag: "Deep Dive" },
];

interface OnboardingFlowProps {
  onComplete: (values: { skillName: string; experienceLevel: string; duration: string }) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { user, isLoaded } = useUser();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<(typeof CATEGORIES)[0] | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!localStorage.getItem(ONBOARDING_KEY)) setVisible(true);
  }, [isLoaded, user]);

  const dismiss = () => {
    localStorage.setItem(ONBOARDING_KEY, "1");
    setVisible(false);
  };

  const handleComplete = () => {
    if (!category || !level || !duration) return;
    localStorage.setItem(ONBOARDING_KEY, "1");
    setVisible(false);
    onComplete({ skillName: category.skill, experienceLevel: level, duration });
  };

  if (!visible) return null;

  const firstName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "there";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="bg-background border border-border rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        >
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10"
            aria-label="Skip onboarding"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 pt-7 pb-1 px-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ width: step >= i ? 32 : 16 }}
                className={`h-1.5 rounded-full transition-colors duration-300 ${step >= i ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="px-6 md:px-10 py-6"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-2xl mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight mb-1">
                    Welcome, {firstName}! 👋
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    What area do you want to master? Pick one to get started.
                  </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const selected = category?.label === cat.label;
                    return (
                      <button
                        key={cat.label}
                        onClick={() => setCategory(cat)}
                        className={`relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all text-center cursor-pointer ${
                          selected
                            ? `${cat.bg} ${cat.border} ${cat.text} ring-2 ${cat.ring} ring-offset-2 ring-offset-background`
                            : `border-border hover:${cat.bg} hover:${cat.border} hover:${cat.text}`
                        }`}
                      >
                        {selected && (
                          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-primary-foreground" />
                          </span>
                        )}
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium leading-tight">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                <Button
                  className="w-full h-12 font-bold gap-2 text-base"
                  disabled={!category}
                  onClick={() => setStep(1)}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="px-6 md:px-10 py-6"
              >
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 ${category?.bg ?? "bg-muted"}`}>
                    {category && <category.icon className={`w-6 h-6 ${category.text}`} />}
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight mb-1">
                    Your {category?.label} level?
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    We'll tailor the roadmap difficulty just for you.
                  </p>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  {LEVELS.map((l) => {
                    const selected = level === l.value;
                    return (
                      <button
                        key={l.value}
                        onClick={() => setLevel(l.value)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                          selected
                            ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        }`}
                      >
                        <span className="text-3xl leading-none">{l.emoji}</span>
                        <div className="flex-1">
                          <div className="font-bold text-foreground">{l.value}</div>
                          <div className="text-sm text-muted-foreground">{l.desc}</div>
                        </div>
                        {selected && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-12" onClick={() => setStep(0)}>Back</Button>
                  <Button className="flex-2 h-12 font-bold gap-2 flex-1" disabled={!level} onClick={() => setStep(2)}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="px-6 md:px-10 py-6"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-2xl mb-3">
                    <span className="text-2xl">⏱️</span>
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight mb-1">
                    How much time do you have?
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Pick the duration that fits your schedule.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {DURATIONS.map((d) => {
                    const selected = duration === d.value;
                    return (
                      <button
                        key={d.value}
                        onClick={() => setDuration(d.value)}
                        className={`flex flex-col items-center gap-1 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          selected
                            ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        }`}
                      >
                        <span className="text-lg font-extrabold text-foreground">{d.label}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>{d.tag}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-muted/50 border border-border rounded-2xl p-4 mb-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${category?.bg ?? "bg-muted"}`}>
                    {category && <category.icon className={`w-5 h-5 ${category.text}`} />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{category?.skill}</div>
                    <div className="text-xs text-muted-foreground">
                      {level} · {duration ?? "—"}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-12" onClick={() => setStep(1)}>Back</Button>
                  <Button
                    className="flex-1 h-12 font-bold gap-2"
                    disabled={!duration}
                    onClick={handleComplete}
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate My Roadmap!
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-3">
                  You can always change these settings in the generator.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
