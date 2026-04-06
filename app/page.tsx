import {
  ArrowRight,
  BellRing,
  Check,
  Gem,
  Gift,
  ShieldCheck,
  Sparkles,
  Spade,
  Tag,
  Ticket,
  TrendingUp
} from "lucide-react";

import { Container } from "@/components/ui/container";

const navItems = [
  { label: "RESULTS", href: "#results" },
  { label: "PRICING", href: "#pricing" },
  { label: "VIP ACCESS", href: "#vip-access" },
  { label: "REVIEWS", href: "#reviews" }
];

const heroStats = [
  { label: "VIP Members", value: "3,000+" },
  { label: "Avg. Rating", value: "4.93" },
  { label: "Verified Reviews", value: "612" }
];

const resultsRows = [
  ["NBA", "Lakers vs Celtics", "Lakers -3.5", "-110", "WIN", true],
  ["NFL", "Chiefs vs Bills", "Over 48.5", "-105", "WIN", true],
  ["MLB", "Yankees vs Dodgers", "Yankees ML", "+130", "WIN", true],
  ["NBA", "Warriors vs Suns", "Under 224.5", "-110", "LOSS", false],
  ["NFL", "Eagles vs Cowboys", "Eagles -7", "-115", "WIN", true],
  ["UFC", "Jones vs Aspinall", "Jones by Decision", "+175", "WIN", true]
] as const;

const pricingCards = [
  {
    name: "Icon VIP+",
    icon: Spade,
    tone: "text-[#8B5CF6]",
    description:
      "The core Icon Bets membership for DFS plays, sportsbook value, and consistent daily coverage across the books and apps that matter most.",
    bullets: ["DFS + sportsbook value", "Daily main-board access", "Built for steady profit"],
    prices: [
      ["$34.99", "per 14 days"],
      ["$59.99", "per month"]
    ]
  },
  {
    name: "High Roller VIP",
    icon: BellRing,
    tone: "text-[#9B6BFF]",
    description:
      "A sharper tier focused on NoVig plays, market-driven sportsbook bets, and stronger conviction opportunities for more serious action.",
    bullets: ["Sharp-money focus", "High-unit opportunities", "Real line movement insight"],
    prices: [
      ["$59.99", "per 14 days"],
      ["$99.99", "per month"]
    ]
  },
  {
    name: "Icon Platinum",
    icon: Gem,
    tone: "text-[#D4AF37]",
    description:
      "The complete membership. Everything in VIP and High Roller, plus Kalshi angles and the most complete edge we offer inside Icon Bets.",
    bullets: ["Everything unlocked", "Kalshi room included", "Best value for full access"],
    prices: [
      ["$99.99", "per 14 days"],
      ["$149.99", "per month"]
    ],
    featured: true
  }
];

const vipAccessCards = [
  {
    title: "Bankroll Builders",
    text: "Cleaner picks designed to build your bankroll with discipline.",
    icon: TrendingUp
  },
  {
    title: "20+ Sharps",
    text: "Tap into a room shaped by sharp action and real market reads.",
    icon: Tag
  },
  {
    title: "Lotto Parlays",
    text: "High-upside slips and fun extra angles when you want them.",
    icon: Ticket
  },
  {
    title: "Exclusive Giveaways",
    text: "Cash giveaways, merch drops, and private Discord perks.",
    icon: Gift
  }
];

const testimonials = [
  {
    quote:
      "Icon Bets made my process way more disciplined. It feels premium, the picks are sharp, and the whole experience is easy to trust.",
    name: "Marcus R.",
    meta: "VIP Member"
  },
  {
    quote:
      "The Discord is fast, the results are transparent, and the pricing actually makes sense once you see how clean everything is.",
    name: "Jake T.",
    meta: "High Roller Member"
  },
  {
    quote:
      "Platinum is the first betting membership I’ve used that genuinely feels like a product, not just a chat room with picks.",
    name: "Daniel S.",
    meta: "Platinum Member"
  }
];

const footerLinks = ["Terms", "Privacy", "Contact"];

function SectionHeading({
  eyebrow,
  title,
  accent,
  description
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
}) {
  return (
    <div className="space-y-4 text-center">
      <p className="text-[11px] font-semibold tracking-[0.34em] text-[#8C8498]">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
        {title}{" "}
        <span className="bg-[linear-gradient(180deg,#F6E7B3_0%,#D4AF37_55%,#A86E19_100%)] bg-clip-text text-transparent">
          {accent}
        </span>
      </h2>
      {description ? (
        <p className="mx-auto max-w-3xl text-base leading-8 text-[#9F97AB] sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#08070B] text-white">
      <section className="relative overflow-hidden" id="home">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#09080C_0%,#0B0811_38%,#09080C_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(150deg,transparent_0_120px,rgba(124,58,237,0.12)_120px_124px,transparent_124px_250px)]" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(114,52,181,0.22),transparent_60%)] blur-3xl" />
        <div className="absolute right-[12%] top-[18%] h-40 w-40 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute left-[10%] top-[28%] h-44 w-44 rounded-full bg-[#5F26A8]/12 blur-3xl" />

        <Container className="relative">
          <header className="sticky top-0 z-50 py-4">
            <div className="mx-auto flex max-w-6xl items-center justify-between rounded-[24px] border border-white/8 bg-[#0D0B11]/88 px-5 py-4 backdrop-blur-xl">
              <a className="flex items-center gap-3" href="#home">
                <Spade className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-serif text-[1.75rem] tracking-[0.04em] text-[#D4AF37]">ICON BETS</span>
              </a>

              <nav className="hidden items-center gap-2 lg:flex">
                {navItems.map((item) => (
                  <a
                    className="rounded-full px-4 py-2 text-xs font-semibold tracking-[0.24em] text-[#8F879B] transition duration-300 hover:bg-white/[0.04] hover:text-white"
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <a
                className="inline-flex items-center justify-center rounded-2xl border border-[#B88626] bg-[linear-gradient(180deg,#F0CA5A_0%,#D2A12F_55%,#B57B18_100%)] px-5 py-3 text-sm font-semibold tracking-[0.08em] text-[#171103] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_30px_rgba(212,175,55,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_14px_40px_rgba(212,175,55,0.22)]"
                href="#pricing"
              >
                JOIN NOW
              </a>
            </div>
          </header>

          <div className="mx-auto flex max-w-6xl flex-col items-center px-1 pb-24 pt-12 text-center sm:pt-16 lg:pt-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold tracking-[0.24em] text-[#A69EB1]">
              <span className="h-2 w-2 rounded-full bg-[#4ADE80]" />
              LIVE PICKS AVAILABLE NOW
            </div>

            <div className="mt-10 max-w-4xl space-y-6">
              <h1 className="font-serif text-5xl leading-[0.92] text-white sm:text-6xl lg:text-[5.8rem]">
                The Edge You&apos;ve Been
                <span className="block bg-[linear-gradient(180deg,#F7E7B4_0%,#D4AF37_52%,#AA711B_100%)] bg-clip-text pb-1 text-transparent">
                  Looking For
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-[#A59EB0] sm:text-[1.35rem] sm:leading-9">
                Data-driven sports picks. Sharp lines. Real results. Built for bettors who want cleaner information, faster access, and a premium VIP experience.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#B88626] bg-[linear-gradient(180deg,#F0CA5A_0%,#D2A12F_55%,#B57B18_100%)] px-8 py-4 text-sm font-semibold tracking-[0.12em] text-[#171103] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_12px_30px_rgba(212,175,55,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_16px_40px_rgba(212,175,55,0.22)]"
                href="#pricing"
              >
                GET STARTED
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-semibold tracking-[0.12em] text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                href="#results"
              >
                VIEW TRACK RECORD
              </a>
            </div>

            <div className="mt-16 w-full max-w-3xl rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,16,24,0.96),rgba(12,11,16,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-8">
              <div className="grid gap-6 border-b border-white/6 pb-6 sm:grid-cols-3">
                {heroStats.map((stat, index) => (
                  <div
                    className={`space-y-2 ${index < heroStats.length - 1 ? "sm:border-r sm:border-white/6" : ""}`}
                    key={stat.label}
                  >
                    <p className="font-serif text-3xl text-white sm:text-[2.2rem]">{stat.value}</p>
                    <p className="text-xs tracking-[0.2em] text-[#898190]">{stat.label.toUpperCase()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#9A93A5]">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#8B5CF6]" />
                  Verified Results
                </span>
                <span className="inline-flex items-center gap-2">
                  <BellRing className="h-4 w-4 text-[#8B5CF6]" />
                  Instant Alerts
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
                  Sharp Lines
                </span>
              </div>
            </div>

            <div className="relative mt-16 w-full max-w-[360px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_58%)] blur-3xl" />
              <div className="relative rounded-[42px] border border-[#D0A048]/30 bg-[linear-gradient(180deg,#DAB252_0%,#9B6D26_100%)] p-[5px] shadow-[0_0_70px_rgba(212,175,55,0.15)]">
                <div className="rounded-[38px] bg-[#111118] p-4">
                  <div className="rounded-[30px] bg-[linear-gradient(180deg,#171720_0%,#101014_100%)] p-5">
                    <div className="mx-auto h-2.5 w-24 rounded-full bg-white/10" />

                    <div className="mt-6 rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-left">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs tracking-[0.16em] text-[#D4AF37]"># icon-vip</p>
                          <p className="mt-1 text-sm text-[#9A92A8]">Private Discord feed</p>
                        </div>
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                          +11.7u
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 text-left">
                      {[
                        "Sharp-money alert just landed for High Roller members.",
                        "NBA board updated with confidence and line movement.",
                        "Platinum room has a new Kalshi angle available now."
                      ].map((item) => (
                        <div className="rounded-2xl border border-white/8 bg-black/30 p-4 text-sm leading-7 text-[#E5DFF0]" key={item}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="scroll-mt-28 bg-[#09080C] px-6 py-24 lg:px-8" id="results">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            accent="Results"
            description="Full transparency. Every featured pick is tracked, verified, and displayed in a way that is actually easy to read."
            eyebrow="TRACK RECORD"
            title="Proven"
          />

          <div className="mt-14 overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,16,22,0.98),rgba(12,11,16,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="grid grid-cols-[0.75fr_1.8fr_0.7fr_0.8fr] gap-4 border-b border-white/6 px-5 py-5 text-[11px] font-semibold tracking-[0.2em] text-[#7E768A] sm:grid-cols-[0.8fr_2fr_0.9fr_0.9fr] sm:px-7">
              <p>SPORT</p>
              <p>MATCHUP</p>
              <p>ODDS</p>
              <p className="text-right">RESULT</p>
            </div>

            <div className="divide-y divide-white/6">
              {resultsRows.map(([sport, matchup, pick, odds, result, win]) => (
                <div
                  className="grid grid-cols-[0.75fr_1.8fr_0.7fr_0.8fr] gap-4 px-5 py-5 text-sm transition duration-300 hover:bg-white/[0.02] sm:grid-cols-[0.8fr_2fr_0.9fr_0.9fr] sm:px-7"
                  key={`${sport}-${matchup}`}
                >
                  <p className="font-semibold tracking-[0.14em] text-[#D4AF37]">{sport}</p>
                  <div>
                    <p className="font-semibold text-white">{matchup}</p>
                    <p className="text-[#8D8598]">{pick}</p>
                  </div>
                  <p className="text-[#CAC2D4]">{odds}</p>
                  <div className="flex justify-end">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.12em] ${
                        win ? "bg-emerald-400/12 text-emerald-300" : "bg-rose-400/12 text-rose-300"
                      }`}
                    >
                      {result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 bg-[#08070B] px-6 py-24 lg:px-8" id="pricing">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            accent="Tier"
            description="Simple pricing, cleaner presentation, and a plan for every level of bettor."
            eyebrow="MEMBERSHIP"
            title="Choose your"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pricingCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  className={`relative rounded-[30px] border p-7 shadow-[0_24px_80px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 ${
                    card.featured
                      ? "border-[#B9892C]/50 bg-[linear-gradient(180deg,rgba(28,22,15,0.98),rgba(18,14,20,0.98))] shadow-[0_0_40px_rgba(212,175,55,0.08)]"
                      : "border-white/8 bg-[linear-gradient(180deg,rgba(17,15,22,0.98),rgba(11,10,15,0.98))]"
                  }`}
                  key={card.name}
                >
                  {card.featured ? (
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B9892C]/55 bg-[linear-gradient(180deg,#F0CA5A_0%,#D2A12F_55%,#B57B18_100%)] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#1A1204] shadow-[0_0_20px_rgba(212,175,55,0.18)]">
                      MOST POPULAR
                    </span>
                  ) : null}

                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] ${card.tone}`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 font-serif text-[2rem] text-white">{card.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#A39AAA]">{card.description}</p>

                  <div className="mt-6 space-y-3">
                    {card.bullets.map((bullet) => (
                      <div className="flex items-center gap-3 text-sm text-[#D7D0E0]" key={bullet}>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]/12 text-[#D4AF37]">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {bullet}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-3">
                    {card.prices.map(([amount, label], index) => (
                      <div
                        className={`flex items-center justify-between rounded-2xl border px-4 py-4 ${
                          index === 1
                            ? "border-[#B9892C]/45 bg-[#1D170F]"
                            : "border-white/8 bg-white/[0.02]"
                        }`}
                        key={amount + label}
                      >
                        <span className="font-serif text-3xl text-[#D4AF37]">{amount}</span>
                        <span className="text-sm text-[#9C93A8]">{label}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold tracking-[0.08em] transition duration-300 ${
                      card.featured
                        ? "border border-[#B9892C] bg-[linear-gradient(180deg,#F0CA5A_0%,#D2A12F_55%,#B57B18_100%)] text-[#171103] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_12px_30px_rgba(212,175,55,0.16)] hover:-translate-y-0.5"
                        : "border border-white/8 bg-[#201926] text-white hover:bg-[#2A2032]"
                    }`}
                    href="#home"
                  >
                    GET STARTED
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 bg-[#09080C] px-6 py-24 lg:px-8" id="vip-access">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            accent="Community"
            description="A VIP room that feels organized, premium, and genuinely useful instead of chaotic."
            eyebrow="VIP ACCESS"
            title="Inside the"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.9fr_1fr] lg:grid-rows-2">
            {vipAccessCards.slice(0, 1).map((card) => {
              const Icon = card.icon;
              return (
                <div
                  className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,15,21,0.98),rgba(11,10,14,0.98))] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                  key={card.title}
                >
                  <Icon className="h-10 w-10 text-[#D4AF37]" />
                  <h3 className="mt-8 font-serif text-3xl text-white">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#A39AAA]">{card.text}</p>
                </div>
              );
            })}

            <div className="row-span-2 flex items-center justify-center rounded-[34px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_28%),linear-gradient(180deg,rgba(19,16,21,0.98),rgba(11,10,14,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
              <div className="w-full max-w-[285px] rounded-[34px] border border-white/10 bg-[#121217] p-4">
                <div className="rounded-[28px] bg-[linear-gradient(180deg,#1E1E27_0%,#17171E_100%)] p-4">
                  <div className="mx-auto h-2.5 w-24 rounded-full bg-white/10" />
                  <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs tracking-[0.16em] text-[#D4AF37]">VIP CHANNELS</p>
                    <div className="mt-4 space-y-2 text-sm text-[#D7D3DF]">
                      {[
                        "# announcements",
                        "# icon-vip",
                        "# high-roller",
                        "# platinum",
                        "# kalshi-room",
                        "# reviews",
                        "# giveaways"
                      ].map((item) => (
                        <div className="rounded-xl bg-black/25 px-3 py-2" key={item}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {vipAccessCards.slice(1).map((card) => {
              const Icon = card.icon;
              return (
                <div
                  className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,15,21,0.98),rgba(11,10,14,0.98))] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                  key={card.title}
                >
                  <Icon className="h-10 w-10 text-[#D4AF37]" />
                  <h3 className="mt-8 font-serif text-3xl text-white">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#A39AAA]">{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 bg-[#08070B] px-6 py-24 lg:px-8" id="reviews">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            accent="Say"
            eyebrow="REVIEWS"
            title="What Members"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,16,22,0.98),rgba(12,11,16,0.98))] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-white/12"
                key={item.name}
              >
                <div className="text-[#D4AF37]">★★★★★</div>
                <p className="mt-6 text-lg leading-8 text-[#D7D0E0]">“{item.quote}”</p>
                <div className="mt-8">
                  <p className="font-serif text-2xl text-white">{item.name}</p>
                  <p className="text-sm text-[#8F879B]">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/6 bg-[#09080C] px-6 py-10 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Spade className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="font-serif text-[1.8rem] tracking-[0.04em] text-[#D4AF37]">ICON BETS</span>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-sm text-[#8E8699]">
            {footerLinks.map((link) => (
              <a className="transition hover:text-white" href="#home" key={link}>
                {link}
              </a>
            ))}
          </div>

          <p className="text-sm text-[#77707F]">© 2026 Icon Bets. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
