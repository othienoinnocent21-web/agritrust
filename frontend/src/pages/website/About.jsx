import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Banknote,
  CheckCircle2,
  Coffee,
  Leaf,
  MapPinned,
  ShieldCheck,
  Sprout,
  Wheat,
} from "lucide-react";
import { ROUTES } from "../../constants";

const impactStats = [
  { value: "UGX 4.8B", label: "UGX Transacted", icon: Banknote },
  { value: "1,240+", label: "Farmers Onboarded across Uganda", icon: Sprout },
  { value: "+18.6%", label: "Fair Price Index Growth", icon: BarChart3 },
  { value: "99.8%", label: "Escrow Success Rate", icon: ShieldCheck },
];

const values = [
  {
    title: "Transparent Fair Pricing",
    description:
      "We help farmers see the true value of their harvest, reducing the information gap and eliminating predatory middlemen in local produce markets.",
    icon: BarChart3,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Escrow Security",
    description:
      "Payments through MTN MoMo and Airtel Money are protected in escrow until produce is delivered and both sides can trade with confidence.",
    icon: ShieldCheck,
    tone: "bg-blue-100 text-blue-700",
  },
  {
    title: "Quality Assurance",
    description:
      "Clear grading standards help buyers source consistent coffee, maize, beans, and matooke while rewarding farmers for quality crops.",
    icon: BadgeCheck,
    tone: "bg-amber-100 text-amber-700",
  },
];

const valueChains = [
  { label: "Arabica & Robusta Coffee", icon: Coffee },
  { label: "Maize", icon: Wheat },
  { label: "Beans", icon: Sprout },
  { label: "Matooke", icon: Leaf },
  { label: "Horticulture", icon: Leaf },
];

const About = () => {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative bg-slate-50 py-16 md:py-24">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="container relative mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary shadow-sm">
              <MapPinned className="h-4 w-4" /> Built for Uganda
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.04] tracking-[-0.04em] text-slate-950 md:text-6xl">
              Empowering Ugandan Agriculture Through <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">Secure Trade</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              AgriTrust connects local smallholder farmers across Uganda, from Mbale to Mbarara, directly with verified buyers, exporters, and processors. Our escrow-powered marketplace makes every transaction clearer, safer, and more rewarding for the people growing our food.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={ROUTES.MARKETPLACE} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl">
                Explore the marketplace <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to={ROUTES.HOW_IT_WORKS} className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:text-primary hover:shadow-lg">
                See how escrow works
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-5 -top-6 h-28 w-28 rounded-full bg-amber-300/60 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-green-800 to-lime-700 p-5 shadow-2xl shadow-emerald-950/20 md:p-7">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
              <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
              <div className="relative flex items-center justify-between border-b border-white/15 pb-5 text-white">
                <div className="flex items-center gap-3"><div className="rounded-xl bg-white/15 p-3"><Sprout className="h-6 w-6 text-lime-200" /></div><div><p className="font-bold">Uganda trade network</p><p className="text-xs text-emerald-100">Connecting every harvest</p></div></div>
                <span className="rounded-full bg-lime-300/20 px-3 py-1 text-xs font-semibold text-lime-200">Growing</span>
              </div>
              <div className="relative mt-7 grid grid-cols-2 gap-3">
                {["Mbale", "Mbarara", "Gulu", "Kampala"].map((hub) => (
                  <div key={hub} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-sm font-medium text-white backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-lime-300" />{hub}</div>
                ))}
              </div>
              <div className="relative mt-5 rounded-2xl bg-white p-5 text-slate-900 shadow-xl">
                <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Protected this month</p><p className="mt-1 text-3xl font-black">UGX 680M</p></div><div className="rounded-full bg-emerald-100 p-3 text-emerald-700"><ShieldCheck className="h-6 w-6" /></div></div>
                <div className="mt-5 flex items-end gap-2">{[35, 48, 42, 64, 58, 77, 72, 92, 84].map((height, index) => <span key={index} className="h-16 flex-1 rounded-t-md bg-gradient-to-t from-emerald-600 to-lime-400" style={{ height: `${height}%` }} />)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100"><Icon className="h-5 w-5" /></div>
                <p className="text-3xl font-black tracking-tight text-slate-950">{value}</p>
                <p className="mt-2 text-sm leading-5 text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">The AgriTrust promise</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Our Core Values</h2><p className="mt-4 leading-7 text-slate-600">The practical principles that make local agricultural trade work better for everyone.</p></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map(({ title, description, icon: Icon, tone }) => (
              <article key={title} className="rounded-2xl bg-slate-50 p-7 ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-7 w-7" /></div>
                <h3 className="text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Designed for trust</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">From farm to future</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Transforming Key Value Chains in Uganda</h2><p className="mt-5 max-w-xl leading-7 text-slate-600">From the coffee slopes of the East to the fertile farms of the West, AgriTrust supports agricultural hubs across Central, Eastern, Western, and Northern Uganda. We help each region take its produce further with dependable buyers and protected payment flows.</p><div className="mt-7 flex items-center gap-3 text-sm font-semibold text-slate-700"><MapPinned className="h-5 w-5 text-emerald-600" /> Four regions. One trusted network.</div></div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {valueChains.map(({ label, icon: Icon }, index) => (
                <div key={label} className={`group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg ${index === valueChains.length - 1 ? "sm:col-span-2" : ""}`}><div className="flex items-center gap-4"><div className="rounded-xl bg-emerald-50 p-3 text-emerald-700 transition-colors group-hover:bg-emerald-100"><Icon className="h-5 w-5" /></div><span className="font-bold text-slate-800">{label}</span></div><ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-emerald-600" /></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
