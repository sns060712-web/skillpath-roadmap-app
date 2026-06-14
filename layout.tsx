import React, { useEffect, useRef, useState } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Saved from "@/pages/saved";
import Stats from "@/pages/stats";
import Share from "@/pages/share";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Trending from "@/pages/trending";

const queryClient = new QueryClient();

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
    socialButtonsPlacement: "top" as const,
    socialButtonsVariant: "blockButton" as const,
  },
  variables: {
    colorPrimary: "#2563eb",
    colorForeground: "#0f172a",
    colorMutedForeground: "#64748b",
    colorDanger: "#ef4444",
    colorBackground: "#ffffff",
    colorInput: "#f8fafc",
    colorInputForeground: "#0f172a",
    colorNeutral: "#cbd5e1",
    fontFamily: "Inter, system-ui, sans-serif",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-white rounded-2xl shadow-2xl w-[440px] max-w-full overflow-hidden border border-slate-200",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-slate-900 font-bold text-2xl",
    headerSubtitle: "text-slate-500 text-sm",
    socialButtonsBlockButtonText: "text-slate-700 font-medium",
    formFieldLabel: "text-slate-700 font-medium text-sm",
    footerActionLink: "text-blue-600 font-semibold hover:text-blue-700",
    footerActionText: "text-slate-500",
    dividerText: "text-slate-400 text-xs",
    identityPreviewEditButton: "text-blue-600",
    formFieldSuccessText: "text-green-600",
    alertText: "text-slate-700",
    logoBox: "mb-1",
    logoImage: "h-10 w-10",
    socialButtonsBlockButton: "border border-slate-200 hover:bg-slate-50 rounded-lg",
    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg",
    formFieldInput: "border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500",
    footerAction: "bg-slate-50 border-t border-slate-100",
    dividerLine: "bg-slate-200",
    alert: "rounded-lg border border-red-100 bg-red-50",
    otpCodeFieldInput: "border border-slate-200 rounded-lg",
    formFieldRow: "gap-3",
    main: "px-2",
  },
};

function SignInPage() {
  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 50%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 font-bold text-xl text-slate-800 mb-1">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            Pathfinder
          </div>
          <p className="text-slate-500 text-sm">Your personal AI learning companion</p>
        </div>
        <SignIn
          routing="path"
          path={`${basePath}/sign-in`}
          signUpUrl={`${basePath}/sign-up`}
          appearance={clerkAppearance}
        />
      </div>
    </div>
  );
}

function SignUpPage() {
  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 50%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 font-bold text-xl text-slate-800 mb-1">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            Pathfinder
          </div>
          <p className="text-slate-500 text-sm">Start your learning journey today</p>
        </div>
        <SignUp
          routing="path"
          path={`${basePath}/sign-up`}
          signInUrl={`${basePath}/sign-in`}
          appearance={clerkAppearance}
        />
      </div>
    </div>
  );
}

function usePageTracking() {
  const [location] = useLocation();
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: location,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
}

function PageTracker() {
  usePageTracking();
  return null;
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

const Footer = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const closeModal = () => setActiveModal(null);

  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-6 px-4 mt-12 border-t border-slate-800 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <div>
          <span className="text-white font-bold tracking-wide text-sm">Skill Path AI</span> © 2026. All rights reserved.
        </div>
        <div className="flex gap-6 font-medium">
          <button onClick={() => setActiveModal('about')} className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">About & Contact</button>
          <button onClick={() => setActiveModal('privacy')} className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">Privacy Policy</button>
          <button onClick={() => setActiveModal('terms')} className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">Terms of Service</button>
        </div>
      </div>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 text-slate-200 p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer">✕</button>
            {activeModal === 'about' && (
              <div className="space-y-3">
                <h3 className="text-white text-lg font-semibold border-b border-slate-700 pb-2">💡 About & Contact</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong>Skill Path AI</strong> (Pathfinder) is an AI-powered learning roadmap generator that helps students, developers, and career-switchers build structured, day-by-day plans for mastering any skill — from Python and Full-Stack Web Development to Cyber Security, Data Science, UI/UX Design, and beyond.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our platform uses Google Gemini AI to generate personalized roadmaps tailored to your current experience level and available time. Each roadmap is broken into daily tasks with curated resources so you always know exactly what to study next.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Skill Path AI is independently developed and maintained. We are committed to providing free, high-quality educational guidance to learners worldwide.
                </p>
                <div className="mt-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">For questions, partnership inquiries, or support:</p>
                  <a href="mailto:jatinsingh192127@gmail.com" className="text-blue-400 font-medium hover:underline text-sm break-all">jatinsingh192127@gmail.com</a>
                </div>
              </div>
            )}
            {activeModal === 'privacy' && (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                <h3 className="text-white text-lg font-semibold border-b border-slate-700 pb-2 sticky top-0 bg-slate-800">🛡️ Privacy Policy</h3>
                <p className="text-xs text-slate-500">Last updated: May 2026</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  At <strong>Skill Path AI</strong> ("we", "us", or "our"), we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">1. Information We Collect</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We collect information you provide directly to us when you create an account (via Clerk authentication), including your name, email address, and profile picture if provided via Google OAuth. We also collect usage data such as roadmaps you generate and save, tasks you complete, and ratings you submit. This information is stored securely in our PostgreSQL database.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">2. How We Use Your Information</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We use the information we collect to: (a) provide, maintain and improve our services; (b) personalise your learning experience; (c) track your roadmap progress; (d) send you service-related communications if necessary; and (e) analyse aggregate usage patterns to improve our AI roadmap generation.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">3. Data Sharing & Third Parties</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We do not sell, trade, or rent your personal information to any third parties. We use Clerk (clerk.com) for authentication, Google Gemini API for AI roadmap generation, and Google Analytics for anonymous usage tracking. Each of these services operates under their own privacy policies and GDPR-compliant data processing agreements.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">4. Cookies & Analytics</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We use Google Analytics (GA4) to collect anonymised data about how visitors interact with our website. This includes pages visited, time spent, and general geographic location. No personally identifiable information is transmitted to Google Analytics. You may opt out by using browser extensions such as the Google Analytics Opt-out Add-on.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">5. Data Retention & Deletion</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We retain your data for as long as your account is active. You may request deletion of your account and all associated data at any time by contacting us at jatinsingh192127@gmail.com. We will process deletion requests within 30 days in compliance with GDPR and CCPA requirements.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">6. Security</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We implement industry-standard security measures including HTTPS encryption, hashed passwords via Clerk's managed infrastructure, and restricted database access. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">7. Contact</h4>
                <p className="text-sm text-slate-300">
                  For privacy-related inquiries: <a href="mailto:jatinsingh192127@gmail.com" className="text-blue-400 hover:underline">jatinsingh192127@gmail.com</a>
                </p>
              </div>
            )}
            {activeModal === 'terms' && (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                <h3 className="text-white text-lg font-semibold border-b border-slate-700 pb-2 sticky top-0 bg-slate-800">📄 Terms of Service</h3>
                <p className="text-xs text-slate-500">Last updated: May 2026</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Please read these Terms of Service ("Terms") carefully before using <strong>Skill Path AI</strong> ("the Service") operated by Skill Path AI ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">1. Acceptance of Terms</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  By accessing or using Skill Path AI, you agree to be bound by these Terms. If you disagree with any part of the Terms, you do not have permission to access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">2. Use of the Service</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Skill Path AI provides AI-generated learning roadmaps for educational and personal development purposes only. You agree to use the Service solely for lawful purposes. You must not use the Service to generate content that is harmful, misleading, or violates any applicable laws. You are responsible for maintaining the security of your account credentials.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">3. AI-Generated Content Disclaimer</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The roadmaps and learning plans generated by Skill Path AI are produced by artificial intelligence and are intended as educational guidance only. We do not guarantee the accuracy, completeness, or fitness of AI-generated content for any specific purpose. Users should exercise their own judgement and consult professional advisors where appropriate.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">4. Intellectual Property</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Service, its original content (excluding user-generated roadmaps), features, and functionality are and will remain the exclusive property of Skill Path AI. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">5. User Content</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  You retain ownership of any roadmaps you save to your account. By saving content, you grant us a limited, non-exclusive licence to store and display that content in connection with providing the Service to you. You may delete your content and account at any time.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">6. Limitation of Liability</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  In no event shall Skill Path AI, its directors, employees, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or goodwill, arising out of or in connection with your use of the Service.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">7. Changes to Terms</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. We will notify users of material changes by updating the "Last updated" date. Continued use of the Service after changes constitutes acceptance of the new Terms.
                </p>
                <h4 className="text-white font-semibold text-sm mt-3">8. Contact</h4>
                <p className="text-sm text-slate-300">
                  Questions about these Terms: <a href="mailto:jatinsingh192127@gmail.com" className="text-blue-400 hover:underline">jatinsingh192127@gmail.com</a>
                </p>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button onClick={closeModal} className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-1.5 px-4 rounded-lg text-sm transition-all cursor-pointer">Got it!</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <>
      <Show when="signed-in">
        <Component />
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}

function Router() {
  return (
    <Layout>
      <PageTracker />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/saved">{() => <ProtectedRoute component={Saved} />}</Route>
        <Route path="/stats">{() => <ProtectedRoute component={Stats} />}</Route>
        <Route path="/share/:token" component={Share} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/blog" component={Blog} />
        <Route path="/trending" component={Trending} />
        <Route path="/sign-in/*?" component={SignInPage} />
        <Route path="/sign-up/*?" component={SignUpPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Layout>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      signInFallbackRedirectUrl={`${basePath || "/"}`}
      signUpFallbackRedirectUrl={`${basePath || "/"}`}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pathfinder-theme">
      <WouterRouter base={basePath}>
        <ClerkProviderWithRoutes />
      </WouterRouter>
    </ThemeProvider>
  );
}

export default App;