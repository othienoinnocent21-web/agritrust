import Button from "../common/Button";
import { ROUTES } from "../../constants";
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Sprout, TrendingUp } from "lucide-react";

const Hero = ({
  title = "Fair Prices for Farmers, Fresh Produce for Buyers",
  subtitle = "AgriTrust connects farmers directly with buyers, ensuring fair compensation and quality produce through escrow-based transactions.",
  primaryActionLabel = "Get Started",
  primaryActionPath = ROUTES.REGISTER,
  secondaryActionLabel = "Learn More",
  secondaryActionPath = ROUTES.HOW_IT_WORKS,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 md:py-24">
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="container relative mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Escrow-Protected Marketplace
          </div>
          <h1 aria-label={title} className="max-w-xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 md:text-7xl">
            Trade better. <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">Grow together.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" size="lg" to={primaryActionPath} rightIcon={ArrowRight} className="rounded-xl px-7 shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-1 hover:shadow-xl">
            {primaryActionLabel}
            </Button>
            <Button variant="outline" size="lg" to={secondaryActionPath} className="rounded-xl border-slate-300 bg-white px-7 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg">
            {secondaryActionLabel}
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Verified partners</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Fair pricing</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="absolute -left-8 top-16 h-20 w-20 rounded-2xl bg-amber-300/70 blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur-md md:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-100 p-2.5 text-primary"><Sprout className="h-5 w-5" /></div><div><p className="text-sm font-bold text-slate-900">Fresh harvests</p><p className="text-xs text-slate-500">Live marketplace preview</p></div></div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">● Live</span>
            </div>
            <div className="my-5 rounded-2xl bg-gradient-to-br from-emerald-900 via-green-800 to-lime-700 p-6 text-white">
              <div className="flex items-start justify-between"><div><p className="text-xs font-medium uppercase tracking-widest text-emerald-200">Today&apos;s trade volume</p><p className="mt-2 text-4xl font-black">$48,260</p></div><TrendingUp className="h-7 w-7 text-lime-300" /></div>
              <div className="mt-8 flex h-20 items-end gap-2">{[35, 52, 42, 68, 58, 82, 72, 96, 88, 100].map((height, index) => <span key={index} className="flex-1 rounded-t-md bg-lime-300/80 transition-all hover:bg-white" style={{ height: `${height}%` }} />)}</div>
            </div>
            <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-slate-50 p-4"><Leaf className="h-5 w-5 text-emerald-600" /><p className="mt-3 text-2xl font-bold text-slate-900">1,240</p><p className="text-xs text-slate-500">Active farmers</p></div><div className="rounded-2xl bg-amber-50 p-4"><ShieldCheck className="h-5 w-5 text-amber-600" /><p className="mt-3 text-2xl font-bold text-slate-900">99.8%</p><p className="text-xs text-slate-500">Secure payouts</p></div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
