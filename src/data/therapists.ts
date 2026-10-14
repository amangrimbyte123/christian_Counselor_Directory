import type { Profession, SessionFormat, Therapist } from "@/types";
import { cities } from "./locations";
import { approaches } from "./approaches";
import { specialties } from "./specialties";
import { topicLower } from "@/lib/text";

/**
 * ALL PEOPLE BELOW ARE FICTIONAL SAMPLE DATA for demonstration.
 * Names, credentials, fees and biographies are invented and are never verified.
 * A real data source must set `verified` only after checking a licensing board.
 */

type Fmt = "b" | "o" | "i";
const FORMATS: Record<Fmt, SessionFormat[]> = { b: ["in-person", "online"], o: ["online"], i: ["in-person"] };

interface Seed {
  n: string; cr: string; p: Profession; t: string; c: string; f: Fmt;
  s: string[]; a: string[]; l?: string[]; fee: [number, number]; y: number;
  ages?: string[]; st: string; feat?: boolean; slide?: boolean; free?: boolean; full?: boolean; near?: string[];
}

const slugify = (v: string) =>
  v.toLowerCase().replace(/^dr\.?\s+/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Service slugs, kept short so the seed rows stay readable
const MC = "christian-marriage-counseling";
const PRE = "christian-premarital-counseling";
const COM = "christian-couples-communication";
const AFF = "christian-affair-recovery";
const INT = "christian-intimacy-counseling";
const REC = "christian-marriage-reconciliation";
const SEA = "christian-couples-life-transitions";
const FAI = "faith-and-spiritual-connection";

const specialtyName = (slug: string) => topicLower(specialties.find((s) => s.slug === slug)?.name ?? slug);
const approachName = (slug: string) =>
  approaches.find((a) => a.slug === slug)?.name.replace(/\s*\(.*\)/, "") ?? slug;
const join = (xs: string[]) =>
  xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

const SEEDS: Seed[] = [
  // Los Angeles
  { n: "Maya Okafor", cr: "PhD, Licensed Psychologist", p: "psychologist", t: "Couples Psychologist", c: "los-angeles", f: "b", s: [MC, COM, INT], a: ["gottman", "cbt", "mindfulness"], fee: [180, 220], y: 12, ages: ["Couples", "Newlyweds"], st: "Practical, faith-friendly help for couples who want to stop fighting and start connecting.", feat: true, free: true, near: ["san-diego"] },
  { n: "Daniel Reyes", cr: "LMFT", p: "marriage-family-therapist", t: "Licensed Marriage & Family Therapist", c: "los-angeles", f: "b", s: [MC, AFF, COM], a: ["gottman", "emotionally-focused"], l: ["english", "spanish"], fee: [140, 170], y: 9, ages: ["Couples", "Blended families"], st: "Helping Christian couples argue better, reconnect and rebuild trust.", feat: true, slide: true },
  { n: "Priya Raman", cr: "LCSW", p: "social-worker", t: "Licensed Clinical Social Worker", c: "los-angeles", f: "o", s: [AFF, REC], a: ["emotionally-focused", "ifs"], l: ["english", "hindi"], fee: [120, 150], y: 7, ages: ["Couples"], st: "Gentle, steady support for couples healing from betrayal.", slide: true },
  { n: "Marcus Bell", cr: "PsyD", p: "psychologist", t: "Licensed Psychologist", c: "los-angeles", f: "i", s: [SEA, COM], a: ["cbt", "person-centered"], fee: [160, 200], y: 15, ages: ["Couples", "Blended families"], st: "Keeping your marriage strong through parenting, blended families and busy seasons.", full: true },
  { n: "Hana Kim", cr: "LPCC", p: "counselor", t: "Licensed Professional Clinical Counselor", c: "los-angeles", f: "b", s: [PRE, FAI], a: ["prepare-enrich", "person-centered"], l: ["english", "korean"], fee: [110, 140], y: 5, ages: ["Engaged couples", "Newlyweds"], st: "Premarital counseling that helps you start married life on the same page." },
  { n: "Elena Vasquez", cr: "LCSW", p: "social-worker", t: "Clinical Social Worker", c: "los-angeles", f: "o", s: [SEA, INT], a: ["emotionally-focused", "mindfulness"], l: ["english", "spanish"], fee: [100, 130], y: 11, ages: ["Couples"], st: "Walking with couples through grief, illness and life's hardest seasons.", slide: true },
  // New York
  { n: "Jonathan Weiss", cr: "PhD", p: "psychologist", t: "Couples Psychologist", c: "new-york", f: "b", s: [REC, MC], a: ["gottman", "cbt"], fee: [220, 275], y: 18, ages: ["Couples"], st: "Clear-headed help for marriages at a crossroads.", free: true },
  { n: "Aisha Rahman", cr: "LMHC", p: "counselor", t: "Licensed Mental Health Counselor", c: "new-york", f: "o", s: [COM, SEA, INT], a: ["cbt", "mindfulness"], l: ["english", "arabic"], fee: [130, 160], y: 8, ages: ["Couples", "Newlyweds"], st: "For busy couples who have drifted into living parallel lives.", slide: true },
  { n: "Samuel Greene", cr: "LCSW-R", p: "social-worker", t: "Marriage Counselor", c: "new-york", f: "i", s: [MC, FAI], a: ["person-centered", "ifs"], fee: [170, 210], y: 20, ages: ["Couples"], st: "Thoughtful, long-term marriage counseling for depth and lasting change." },
  { n: "Lucia Moretti", cr: "PsyD", p: "psychologist", t: "Clinical Psychologist", c: "new-york", f: "b", s: [INT, AFF], a: ["emotionally-focused", "cbt"], l: ["english", "french"], fee: [200, 250], y: 13, ages: ["Couples"], st: "Restoring closeness and trust with compassion and respect for your values.", full: true },
  { n: "Wei Zhang", cr: "LMFT", p: "marriage-family-therapist", t: "Marriage & Family Therapist", c: "new-york", f: "b", s: [SEA, FAI], a: ["emotionally-focused", "prepare-enrich"], l: ["english", "mandarin"], fee: [150, 190], y: 10, ages: ["Couples", "Blended families"], st: "Bridging the gap between generations, cultures and traditions in your marriage.", slide: true },
  // Brooklyn
  { n: "Naomi Feldman", cr: "LCSW", p: "social-worker", t: "Couples Therapist", c: "brooklyn", f: "b", s: [AFF, COM], a: ["emotionally-focused", "ifs"], fee: [140, 170], y: 9, ages: ["Couples"], st: "Trust repair that honours both partners' pain and hope.", slide: true },
  { n: "Andre Thompson", cr: "LMHC", p: "counselor", t: "Counselor", c: "brooklyn", f: "o", s: [MC, PRE, COM], a: ["prepare-enrich", "gottman"], fee: [110, 135], y: 6, ages: ["Engaged couples", "Newlyweds"], st: "Straightforward, encouraging counseling for couples building a faith-filled home." },
  // Chicago
  { n: "Rebecca Lindqvist", cr: "PhD", p: "psychologist", t: "Licensed Clinical Psychologist", c: "chicago", f: "b", s: [COM, MC], a: ["cbt", "gottman"], fee: [170, 210], y: 14, ages: ["Couples"], st: "Building communication habits that actually work for real-life couples." },
  { n: "Omar Haddad", cr: "LCPC", p: "counselor", t: "Professional Counselor", c: "chicago", f: "o", s: [COM, SEA], a: ["gottman", "mindfulness"], l: ["english", "arabic"], fee: [100, 130], y: 7, ages: ["Couples"], st: "Calm, honest conversations for couples under pressure.", slide: true },
  { n: "Tessa Brandt", cr: "LCSW", p: "social-worker", t: "Clinical Social Worker", c: "chicago", f: "i", s: [SEA, REC], a: ["person-centered", "emotionally-focused"], fee: [90, 125], y: 16, ages: ["Couples", "Blended families"], st: "Supporting couples through loss, separation and big transitions.", slide: true },
  { n: "Gabriel Santos", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "chicago", f: "b", s: [AFF, INT], a: ["emotionally-focused", "ifs"], l: ["english", "spanish"], fee: [160, 195], y: 12, ages: ["Couples"], st: "Bilingual affair recovery counseling with warmth and structure." },
  // Austin
  { n: "Claire Donnelly", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "austin", f: "b", s: [PRE, MC], a: ["prepare-enrich", "cbt"], fee: [95, 125], y: 6, ages: ["Engaged couples", "Newlyweds"], st: "Helping engaged couples and newlyweds build a steady foundation.", slide: true, free: true },
  { n: "Rafael Ortiz", cr: "LMFT", p: "marriage-family-therapist", t: "Christian Couples Therapist", c: "austin", f: "b", s: [MC, AFF, REC], a: ["emotionally-focused", "gottman"], l: ["english", "spanish"], fee: [130, 165], y: 11, ages: ["Couples", "Blended families"], st: "Reconnecting couples, one honest conversation at a time.", feat: true },
  { n: "Sofia Lindgren", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "austin", f: "o", s: [INT, COM], a: ["imago", "cbt"], fee: [150, 185], y: 9, ages: ["Couples"], st: "Online counseling for couples who want to feel close again." },
  { n: "Terrence Mills", cr: "LCSW", p: "social-worker", t: "Marriage Counselor", c: "austin", f: "i", s: [SEA, FAI], a: ["person-centered", "emotionally-focused"], fee: [100, 130], y: 8, ages: ["Couples"], st: "A steady presence for marriages when life has been heavy.", slide: true },
  // Seattle
  { n: "Ingrid Solberg", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "seattle", f: "b", s: [SEA, INT, MC], a: ["mindfulness", "emotionally-focused"], fee: [165, 200], y: 10, ages: ["Couples"], st: "Rebuilding energy and closeness after years of running on empty.", near: ["denver"] },
  { n: "Kenji Watanabe", cr: "LMHC", p: "counselor", t: "Counselor", c: "seattle", f: "o", s: [PRE, COM], a: ["prepare-enrich", "imago"], l: ["english"], fee: [105, 135], y: 5, ages: ["Engaged couples", "Newlyweds"], st: "Warm, practical premarital and newlywed counseling online.", slide: true },
  { n: "Danielle Foster", cr: "LICSW", p: "social-worker", t: "Clinical Social Worker", c: "seattle", f: "i", s: [SEA, COM], a: ["emotionally-focused", "gottman"], fee: [120, 150], y: 13, ages: ["Couples", "Blended families"], st: "Helping blended families start with a strong marriage at the center.", full: true },
  // San Francisco
  { n: "Julian Park", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "san-francisco", f: "b", s: [REC, AFF], a: ["gottman", "cbt"], l: ["english", "korean"], fee: [210, 260], y: 17, ages: ["Couples"], st: "Focused help for couples deciding whether and how to rebuild.", near: ["san-diego"] },
  { n: "Mira Patel", cr: "LMFT", p: "marriage-family-therapist", t: "Marriage & Family Therapist", c: "san-francisco", f: "b", s: [FAI, MC], a: ["emotionally-focused", "ifs"], l: ["english", "hindi"], fee: [150, 190], y: 8, ages: ["Couples"], st: "Helping couples honour each other's faith and grow closer through differences.", slide: true },
  { n: "Theo Anders", cr: "LCSW", p: "social-worker", t: "Couples Therapist", c: "san-francisco", f: "o", s: [COM, INT, SEA], a: ["cbt", "mindfulness"], fee: [130, 160], y: 6, ages: ["Couples", "Newlyweds"], st: "Evening and weekend couples counseling for busy households." },
  // San Diego
  { n: "Carmen Delgado", cr: "LPCC", p: "counselor", t: "Counselor", c: "san-diego", f: "b", s: [SEA, MC], a: ["emotionally-focused", "person-centered"], l: ["english", "spanish"], fee: [90, 120], y: 10, ages: ["Couples", "Blended families"], st: "Bilingual care for couples and blended families growing together.", slide: true },
  { n: "Nathan Cho", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "san-diego", f: "o", s: [COM, PRE], a: ["cbt", "prepare-enrich"], l: ["english", "korean"], fee: [150, 180], y: 7, ages: ["Engaged couples", "Couples"], st: "Helping couples get unstuck and talk with grace." },
  // Denver
  { n: "Hannah Brooks", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "denver", f: "b", s: [MC, COM, FAI], a: ["imago", "mindfulness"], fee: [100, 130], y: 8, ages: ["Couples"], st: "Down-to-earth, faith-friendly counseling for everyday marriage struggles.", slide: true, free: true },
  { n: "Isaac Rivera", cr: "LMFT", p: "marriage-family-therapist", t: "Marriage & Family Therapist", c: "denver", f: "i", s: [SEA, REC], a: ["emotionally-focused", "person-centered"], l: ["english", "spanish"], fee: [115, 145], y: 12, ages: ["Couples", "Blended families"], st: "Strengthening marriages through hard times." },
  { n: "Olivia Hartman", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "denver", f: "o", s: [INT, AFF], a: ["emotionally-focused", "cbt"], fee: [175, 215], y: 14, ages: ["Couples"], st: "Compassionate, values-respecting intimacy counseling for couples." },
  // Miami
  { n: "Alejandro Cruz", cr: "LMHC", p: "counselor", t: "Counselor", c: "miami", f: "b", s: [MC, COM], a: ["cbt", "gottman"], l: ["english", "spanish"], fee: [100, 135], y: 9, ages: ["Couples", "Newlyweds"], st: "Bilingual Christian counseling for marriages that want to thrive.", slide: true },
  { n: "Natalie Brennan", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "miami", f: "o", s: [REC, COM], a: ["gottman", "cbt"], l: ["english", "french"], fee: [155, 190], y: 11, ages: ["Couples"], st: "Online couples counseling that fits around a busy life." },
  { n: "Yasmin El-Amin", cr: "LCSW", p: "social-worker", t: "Couples Therapist", c: "miami", f: "i", s: [AFF, FAI], a: ["ifs", "emotionally-focused"], l: ["english", "arabic"], fee: [110, 140], y: 7, ages: ["Couples"], st: "Culturally attuned trust repair and faith conversations for couples." },
  // Atlanta
  { n: "Darius Coleman", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "atlanta", f: "b", s: [MC, PRE], a: ["prepare-enrich", "person-centered"], fee: [90, 120], y: 10, ages: ["Couples", "Engaged couples"], st: "Culturally responsive marriage and premarital counseling.", slide: true },
  { n: "Whitney Hayes", cr: "LMFT", p: "marriage-family-therapist", t: "Christian Couples Therapist", c: "atlanta", f: "b", s: [MC, INT, COM], a: ["gottman", "emotionally-focused"], fee: [120, 150], y: 8, ages: ["Couples", "Newlyweds"], st: "Practical tools for a lasting, Christ-centered connection.", feat: true, free: true },
  { n: "Priscilla Nguyen", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "atlanta", f: "o", s: [COM, SEA], a: ["cbt", "mindfulness"], l: ["english"], fee: [140, 175], y: 6, ages: ["Couples"], st: "Clear, kind guidance for couples in a demanding season.", full: true },
  // Boston
  { n: "Edward Callahan", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "boston", f: "b", s: [AFF, REC], a: ["emotionally-focused", "ifs"], fee: [200, 250], y: 22, ages: ["Couples"], st: "Experienced, reflective counseling for marriages with complex histories." },
  { n: "Grace Liu", cr: "LMHC", p: "counselor", t: "Counselor", c: "boston", f: "o", s: [PRE, SEA, FAI], a: ["prepare-enrich", "mindfulness"], l: ["english", "mandarin"], fee: [110, 140], y: 5, ages: ["Engaged couples", "Newlyweds"], st: "Supportive counseling for young couples starting out together.", slide: true },
  { n: "Patrick Nolan", cr: "LICSW", p: "social-worker", t: "Clinical Social Worker", c: "boston", f: "i", s: [SEA, MC], a: ["person-centered", "emotionally-focused"], fee: [125, 160], y: 15, ages: ["Couples", "Blended families"], st: "Steady support for marriages through loss and family change." },
  // Houston
  { n: "Monica Salazar", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "houston", f: "b", s: [SEA, COM], a: ["gottman", "cbt"], l: ["english", "spanish"], fee: [85, 115], y: 9, ages: ["Couples", "Blended families"], st: "Practical help for couples parenting together.", slide: true },
  { n: "Victor Adeyemi", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "houston", f: "o", s: [REC, AFF], a: ["gottman", "cbt"], fee: [160, 195], y: 13, ages: ["Couples"], st: "Evidence-based online counseling for marriages in crisis." },
  // Minneapolis
  { n: "Karin Johansson", cr: "LMFT", p: "marriage-family-therapist", t: "Marriage & Family Therapist", c: "minneapolis", f: "b", s: [MC, SEA, REC], a: ["emotionally-focused", "mindfulness"], fee: [110, 140], y: 12, ages: ["Couples"], st: "Gentle, steady help through marriage turning points.", feat: true, slide: true },
  // Faith integration specialists (faith integrated at the couple's request)
  { n: "Rachel Whitaker", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "austin", f: "b", s: [FAI, PRE], a: ["prepare-enrich", "person-centered"], fee: [90, 120], y: 9, ages: ["Engaged couples", "Couples"], st: "Faith-integrated counseling that welcomes your Christian beliefs into the room, at your invitation.", slide: true, free: true },
  { n: "Jamal Pierce", cr: "LMFT", p: "marriage-family-therapist", t: "Marriage & Family Therapist", c: "atlanta", f: "b", s: [MC, AFF], a: ["gottman", "emotionally-focused"], fee: [110, 145], y: 12, ages: ["Couples"], st: "Christian couples counseling grounded in research and shared values.", feat: true, free: true },
  { n: "Deborah Okonkwo", cr: "PsyD", p: "psychologist", t: "Clinical Psychologist", c: "houston", f: "o", s: [FAI, INT], a: ["cbt", "imago"], fee: [140, 175], y: 14, ages: ["Couples"], st: "Evidence-based couples care, with room for faith, doubt and hope." },
  { n: "Michael Lindberg", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "denver", f: "i", s: [SEA, FAI], a: ["person-centered", "mindfulness"], fee: [95, 125], y: 18, ages: ["Couples"], st: "Walking alongside couples through grief and change, with space for prayer if you want it.", slide: true },
  { n: "Sarah Kowalski", cr: "LCPC", p: "counselor", t: "Professional Counselor", c: "chicago", f: "b", s: [PRE, SEA], a: ["prepare-enrich", "cbt"], fee: [100, 130], y: 8, ages: ["Engaged couples", "Blended families"], st: "Faith-friendly preparation for marriage and blended-family life." },
  { n: "Luis Mendoza", cr: "LMHC", p: "counselor", t: "Licensed Mental Health Counselor", c: "miami", f: "b", s: [MC, COM], a: ["cbt", "mindfulness"], l: ["english", "spanish"], fee: [95, 125], y: 7, ages: ["Couples"], st: "Bilingual Christian marriage counseling for stress, conflict and life's pressures.", slide: true },
  { n: "Esther Nakamura", cr: "LMFT", p: "marriage-family-therapist", t: "Marriage & Family Therapist", c: "minneapolis", f: "o", s: [FAI, SEA], a: ["emotionally-focused", "imago"], fee: [105, 135], y: 10, ages: ["Couples"], st: "Online, faith-integrated support for couples through life's big transitions." },
  { n: "Malik Washington", cr: "LICSW", p: "social-worker", t: "Couples Therapist", c: "minneapolis", f: "o", s: [REC, COM], a: ["gottman", "cbt"], fee: [100, 130], y: 8, ages: ["Couples"], st: "Accessible online marriage counseling with sliding-scale options.", slide: true },
];

const FAQ_FEES = (t: { feeMin: number; feeMax: number; slidingScale: boolean; freeConsult: boolean }) => ({
  q: "What are your fees?",
  a: `Sample fee range: $${t.feeMin}–$${t.feeMax} per session.${t.slidingScale ? " A sliding scale is listed as available." : ""}${t.freeConsult ? " A free 15-minute consultation is listed." : ""} These are demo figures, not real prices.`,
});

function build(seed: Seed, i: number): Therapist {
  const city = cities.find((c) => c.slug === seed.c)!;
  const formats = FORMATS[seed.f];
  const [lead, ...rest] = seed.s;
  const first = seed.n.split(" ")[0];
  const fee = { feeMin: seed.fee[0], feeMax: seed.fee[1], slidingScale: !!seed.slide, freeConsult: !!seed.free };
  const where = formats.length === 2 ? `in ${city.name} and online` : formats[0] === "online" ? "online" : `in ${city.name}`;
  const approachList = join(seed.a.map(approachName));

  return {
    id: `t_${String(i + 1).padStart(3, "0")}`,
    slug: slugify(seed.n),
    name: seed.n,
    credentials: seed.cr,
    profession: seed.p,
    title: seed.t,
    statement: seed.st,
    bio: [
      `${seed.st} ${first} sees couples ${where}, with a focus on ${specialtyName(lead)}${rest.length ? ` as well as ${join(rest.map(specialtyName))}` : ""}.`,
      `${first} draws on ${approachList}, adapting the pace and techniques to what fits your marriage rather than following a one-size-fits-all plan. With ${seed.y} years of experience, ${first} works with ${join((seed.ages ?? ["Couples"]).map((a) => a.toLowerCase()))}, and integrates Christian faith as much or as little as each couple chooses.`,
      `Sessions begin with a conversation about what you both want to change and what has or has not helped before. This is a fictional sample profile created for demonstration.`,
    ],
    city: city.slug,
    state: city.stateSlug,
    serviceAreas: seed.near ?? [],
    formats,
    specialties: seed.s,
    approaches: seed.a,
    languages: seed.l ?? ["english"],
    ...fee,
    acceptingClients: !seed.full,
    yearsExperience: seed.y,
    ages: seed.ages ?? ["Couples"],
    featured: !!seed.feat,
    avatarHue: (i * 47) % 360,
    faqs: [
      { q: `Is ${first} accepting new clients?`, a: seed.full ? "This sample profile is marked as currently full. Use the waitlist option to be contacted when space opens." : "This sample profile is marked as accepting new clients." },
      FAQ_FEES(fee),
      { q: "Do you offer online sessions?", a: formats.includes("online") ? "Yes. Sessions are offered by secure video in this sample profile." : "No. This sample profile lists in-person sessions only." },
    ],
    verified: false,
  };
}

export const therapists: Therapist[] = SEEDS.map(build);

/** Old slug → current slug. Add an entry here whenever a profile slug changes. */
export const slugRedirects: Record<string, string> = {
  "dr-maya-okafor": "maya-okafor",
};
