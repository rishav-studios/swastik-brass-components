'use client';

import { loginUser } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserSupabaseClient } from "@swastik/supabase/client";
import { LoginFields, loginSchema } from "@swastik/types";
import { icons } from "@swastik/ui";
import { Button } from "@swastik/ui/components/shadcn/button";
import { Input } from "@swastik/ui/components/shadcn/input";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

// Icon components mapped from UI folder
const MailIcon = icons.mail;
const LockIcon = icons.lock;
const EyeIcon = icons.eye;
const EyeOffIcon = icons.eyeOff;
const LoaderIcon = icons.loader;
const ArrowRightIcon = icons.arrowRight;
const ShieldCheckIcon = icons.shieldCheck;
const FactoryIcon = icons.factory;
const SettingsIcon = icons.settings;


export default function LoginPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // React Hook Form with Zod Resolver
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (data: LoginFields) => {
    setAuthError(null);

    startTransition(async () => {
      // Call the Server Action with the validated data
      const result = await loginUser(data);

      // If the action returns an object, it means it hit our error state
      // (If successful, Next.js interrupts the flow and redirects the user)
      if (result?.error) {
        setAuthError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background font-sans overflow-hidden">

      {/* Left Panel: Hero / Branding (Hidden on mobile) */}
      <div className="relative hidden md:flex flex-col justify-between p-12 bg-[#0A0B0E] text-white overflow-hidden border-r border-[#1B1D25]">

        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-40" />

        {/* Top Branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center">
            <FactoryIcon className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide leading-none">SWASTIK</h1>
            <span className="text-[10px] text-muted-foreground tracking-widest font-semibold">BRASS COMPONENTS</span>
          </div>
        </div>

        {/* Center Welcome Text & Features */}
        <div className="relative z-10 my-auto max-w-md space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/25">
              <ShieldCheckIcon className="size-3.5" />
              Secure Administration
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
              Control Panel & Catalog Management
            </h2>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Manage inventory components, active enquiries, manufacturing grades, system-wide statistics, and SEO-optimized contents seamlessly.
            </p>
          </div>

          {/* Quick Statistics/Features List */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-all">
              <h4 className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Active Products</h4>
              <p className="text-2xl font-bold mt-1 text-white">1,200+</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-all">
              <h4 className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Live Enquiries</h4>
              <p className="text-2xl font-bold mt-1 text-white">48h Active</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-all">
              <h4 className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Data Sync</h4>
              <p className="text-2xl font-bold mt-1 text-white">Realtime</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-all">
              <h4 className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Engineered in</h4>
              <p className="text-2xl font-bold mt-1 text-white">India</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-500">
          <span>Enterprise Portal</span>
          <span className="flex items-center gap-1">
            <SettingsIcon className="size-3 animate-spin" style={{ animationDuration: '4s' }} /> v1.0.0
          </span>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex flex-col justify-between p-8 md:p-12 lg:p-20 bg-background">

        {/* Top bar with sign up option or just empty for alignment */}
        <div className="flex justify-end items-center">
          <span className="text-xs text-muted-foreground">Having trouble? <a href="mailto:support@swastik.com" className="text-primary hover:underline font-medium">Contact support</a></span>
        </div>

        {/* Centered Login Card */}
        <div className="my-auto mx-auto w-full max-w-md space-y-8">

          <div className="space-y-2 text-center md:text-left">
            <div className="md:hidden flex items-center justify-center gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center">
                <FactoryIcon className="size-5 text-primary" />
              </div>
              <span className="font-bold tracking-wide">SWASTIK BRASS</span>
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight">Sign In</h3>
            <p className="text-muted-foreground text-sm">
              Please sign in with your administrator credentials.
            </p>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-lg flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="font-bold">Error:</span>
              <p className="flex-1">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <MailIcon className="size-4" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@swastik.com"
                  disabled={isPending}
                  className="pl-10 h-11 bg-muted/30 focus-visible:bg-transparent"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-destructive font-medium mt-1 animate-in fade-in duration-200">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">
                  Password
                </label>
                <a href="#" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <LockIcon className="size-4" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isPending}
                  className="pl-10 pr-10 h-11 bg-muted/30 focus-visible:bg-transparent"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-destructive font-medium mt-1 animate-in fade-in duration-200">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me & submit */}
            <div className="flex items-center space-x-2 py-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-4 rounded border-input text-primary focus:ring-primary/20 accent-primary"
              />
              <label htmlFor="remember" className="text-xs text-muted-foreground font-medium select-none cursor-pointer">
                Keep me logged in for 30 days
              </label>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <LoaderIcon className="size-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRightIcon className="size-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Swastik Brass Components. All rights reserved.
        </div>
      </div>

    </div>
  );
}
