import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Eye,
  HelpCircle,
  MapPinned,
  PackageCheck,
  Search,
  ShieldCheck,
  Truck,
  WalletCards,
} from "lucide-react";
import { ROUTES } from "../../constants";

const workflows = {
  farmers: [
    { title: "Produce Listing", description: "List maize, coffee, beans, or other commodities with quality grades, available quantities, and a fair price.", icon: ClipboardList },
    { title: "Buyer Order & Escrow", description: "A verified buyer places an order and deposits the full amount into AgriTrust's secure escrow vault.", icon: WalletCards },
    { title: "Verification & Logistics", description: "Your produce is inspected, confirmed, and dispatched through regional routes such as Kampala, Jinja, Mbale, and Mbarara.", icon: Truck },
    { title: "Automatic Payout", description: "Once delivery and quality are confirmed, funds are released instantly to your MTN MoMo or Airtel Money wallet.", icon: Banknote },
  ],
  buyers: [
    { title: "Browse & Order", description: "Compare verified farmers, local commodities, quality grades, and prices before placing an order that fits your needs.", icon: Search },
    { title: "Mobile Money Deposit", description: "Deposit funds safely into AgriTrust's escrow vault using MTN MoMo or Airtel Money. Your money stays protected.", icon: WalletCards },
    { title: "Verification & Logistics", description: "We coordinate inspection and dispatch across Kampala, Jinja, Mbale, Mbarara, and other regional routes.", icon: Eye },
    { title: "Confirm & Complete", description: "Confirm that your produce meets the agreed quality standard, then escrow releases payment to the farmer automatically.", icon: PackageCheck },
  ],
};

const faqs = [
  { question: "Which Mobile Money providers are supported?", answer: "AgriTrust supports MTN MoMo and Airtel Money for escrow deposits and farmer payouts. Both parties receive confirmation as funds move through the protected transaction." },
  { question: "What happens if the produce does not meet the agreed quality?", answer: "Raise a quality concern from the order record before confirming delivery. Our verification and dispute process reviews the evidence, keeps funds protected, and helps both parties reach a fair resolution." },
  { question: "Who pays inspection and verification fees?", answer: "Any inspection fee is shown clearly before an order is confirmed. The amount depends on the commodity, volume, and route, so there are no surprise deductions from a farmer's payout." },
  { question: "Where can produce be picked up or delivered?", answer: "AgriTrust coordinates routes through key hubs including Kampala, Jinja, Mbale, and Mbarara, with additional pickup and delivery locations agreed in the order details." },
];

const HowItWorks = () => {
  const [audience, setAudience] = useState("farmers");
  const [openFaq, setOpenFaq] = useState(0);
  const activeWorkflow = workflows[audience];

  return (
    <main className="overflow-hidden bg-white">
      <section className="relative bg-slate-50 py-16 md:py-24">
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="container relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary shadow-sm"><ShieldCheck className="h-4 w-4" /> Trade with confidence</div>
            <h1 className="text-5xl font-black leading-[1.04] tracking-[-0.04em] text-slate-950 md:text-7xl">Simple, Transparent <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">&amp; Secure</span> Agricultural Trade</h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600">From the first listing to the final payout, AgriTrust keeps every step visible. Buyers fund escrow, produce is verified and delivered, and farmers are paid when the order is confirmed.</p>
            <div className="mx-auto mt-9 inline-flex rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm" role="tablist" aria-label="Choose your workflow">
              {[{ key: "farmers", label: "For Farmers" }, { key: "buyers", label: "For Buyers" }].map((option) => (
                <button key={option.key} type="button" role="tab" aria-selected={audience === option.key} onClick={() => setAudience(option.key)} className={`rounded-xl px-6 py-3 text-sm font-bold transition-all ${audience === option.key ? "bg-primary text-white shadow-md" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>{option.label}</button>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-3xl bg-emerald-950 p-7 text-white shadow-2xl shadow-emerald-950/15"><div className="flex items-center gap-3"><div className="rounded-xl bg-white/10 p-3"><MapPinned className="h-6 w-6 text-lime-300" /></div><div><p className="font-bold">Connected across Uganda</p><p className="text-sm text-emerald-200">Mbale to Mbarara and beyond</p></div></div><div className="mt-8 flex flex-wrap gap-2">{["Kampala", "Jinja", "Mbale", "Mbarara"].map((location) => <span key={location} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-emerald-100">{location}</span>)}</div></div>
            <ArrowRight className="mx-auto hidden h-7 w-7 text-emerald-500 md:block" />
            <div className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-xl shadow-slate-200/60"><div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-50 p-3 text-emerald-700"><BadgeCheck className="h-6 w-6" /></div><div><p className="font-bold text-slate-900">Protected by escrow</p><p className="text-sm text-slate-500">Payment only moves when trade is verified</p></div></div><div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400" /></div></div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Your journey, made clear</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">How AgriTrust Works</h2><p className="mt-4 leading-7 text-slate-600">A secure end-to-end workflow for every agricultural trade.</p></div>
          <div className="relative grid gap-5 md:grid-cols-4 md:gap-4">
            <div className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-emerald-100 md:block" />
            {activeWorkflow.map(({ title, description, icon: Icon }, index) => (
              <article key={`${audience}-${title}`} className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative mb-7 flex items-center justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/20"><Icon className="h-5 w-5" /></div><span className="text-sm font-black text-emerald-700">0{index + 1}</span></div>
                <h3 className="text-lg font-bold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                {index < activeWorkflow.length - 1 && <ArrowDown className="absolute -bottom-8 left-1/2 z-10 h-5 w-5 -translate-x-1/2 text-emerald-500 md:hidden" />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Trust built into every order</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Why Escrow Protects Both Parties</h2></div><div className="grid gap-6 md:grid-cols-2"><article className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-950 to-green-800 p-8 text-white shadow-xl shadow-emerald-950/10"><div className="flex items-center gap-4"><div className="rounded-2xl bg-white/10 p-3"><WalletCards className="h-7 w-7 text-lime-300" /></div><h3 className="text-2xl font-bold">Protection for Farmers</h3></div><ul className="mt-8 space-y-5">{["Guaranteed payment after confirmed delivery", "Zero buyer default risk while funds sit in escrow", "Fast payout to MTN MoMo or Airtel Money"].map((item) => <li key={item} className="flex gap-3 text-emerald-50"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-300" />{item}</li>)}</ul></article><article className="rounded-3xl border border-emerald-200 bg-white p-8 shadow-xl shadow-slate-200/70"><div className="flex items-center gap-4"><div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700"><ShieldCheck className="h-7 w-7" /></div><h3 className="text-2xl font-bold text-slate-950">Protection for Buyers</h3></div><ul className="mt-8 space-y-5">{["Money held safely until delivery is confirmed", "Quality standards agreed before the order starts", "A clear dispute path if something goes wrong"].map((item) => <li key={item} className="flex gap-3 text-slate-600"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{item}</li>)}</ul></article></div></div>
      </section>

      <section className="py-20"><div className="container mx-auto max-w-3xl px-4 lg:px-8"><div className="mb-10 text-center"><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Questions, answered</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Frequently Asked Questions</h2></div><div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">{faqs.map(({ question, answer }, index) => { const isOpen = openFaq === index; return <div key={question} className="px-6"><button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold text-slate-900"><span>{question}</span><ChevronDown className={`h-5 w-5 shrink-0 text-emerald-600 transition-transform ${isOpen ? "rotate-180" : ""}`} /></button>{isOpen && <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-slate-600">{answer}</p>}</div>; })}</div></div></section>

      <section className="pb-20"><div className="container mx-auto px-4 lg:px-8"><div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-green-800 to-emerald-700 px-6 py-12 text-center text-white shadow-2xl shadow-emerald-900/20 md:px-12"><div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" /><div className="relative"><HelpCircle className="mx-auto h-8 w-8 text-lime-300" /><h2 className="mt-4 text-3xl font-black md:text-4xl">Start Trading Today</h2><p className="mx-auto mt-3 max-w-xl text-emerald-100">Join a trusted agricultural marketplace built around fair prices, verified produce, and protected payments.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link to={ROUTES.MARKETPLACE} className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-300 px-6 py-3.5 font-bold text-emerald-950 transition-all hover:-translate-y-1 hover:bg-lime-200">Browse Marketplace <ArrowRight className="h-4 w-4" /></Link><Link to={ROUTES.REGISTER} className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 font-bold text-white transition-all hover:-translate-y-1 hover:bg-white/10">Register as a Farmer</Link></div></div></div></div></section>
    </main>
  );
};

export default HowItWorks;
