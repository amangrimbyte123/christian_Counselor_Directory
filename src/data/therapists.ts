import type { Profession, SessionFormat, Therapist } from "@/types";
import { cities } from "./locations";
import { approaches } from "./approaches";
import { specialties } from "./specialties";

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

const specialtyName = (slug: string) => specialties.find((s) => s.slug === slug)?.name.toLowerCase() ?? slug;
const approachName = (slug: string) =>
  approaches.find((a) => a.slug === slug)?.name.replace(/\s*\(.*\)/, "") ?? slug;
const join = (xs: string[]) =>
  xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

const SEEDS: Seed[] = [
  // Los Angeles
  { n: "Maya Okafor", cr: "PhD, Licensed Psychologist", p: "psychologist", t: "Clinical Psychologist", c: "los-angeles", f: "b", s: ["anxiety-therapy", "stress-and-burnout-therapy"], a: ["cbt", "act", "mindfulness"], fee: [180, 220], y: 12, ages: ["Adults"], st: "Practical, evidence-based help for anxious minds that never switch off.", feat: true, free: true, near: ["san-diego"] },
  { n: "Daniel Reyes", cr: "LMFT", p: "marriage-family-therapist", t: "Licensed Marriage & Family Therapist", c: "los-angeles", f: "b", s: ["relationship-counseling", "family-therapy"], a: ["gottman", "emotionally-focused"], l: ["english", "spanish"], fee: [140, 170], y: 9, ages: ["Adults", "Couples", "Families"], st: "Helping couples argue better, reconnect and rebuild trust.", slide: true },
  { n: "Priya Raman", cr: "LCSW", p: "social-worker", t: "Licensed Clinical Social Worker", c: "los-angeles", f: "o", s: ["trauma-therapy", "depression-therapy"], a: ["emdr", "ifs"], l: ["english", "hindi"], fee: [120, 150], y: 7, ages: ["Adults"], st: "Gentle, trauma-informed care that moves at your pace.", slide: true },
  { n: "Marcus Bell", cr: "PsyD", p: "psychologist", t: "Licensed Psychologist", c: "los-angeles", f: "i", s: ["adhd-therapy", "teen-therapy"], a: ["cbt", "person-centered"], fee: [160, 200], y: 15, ages: ["Teens", "Adults"], st: "Skills, structure and self-compassion for ADHD brains.", full: true },
  { n: "Hana Kim", cr: "LPCC", p: "counselor", t: "Licensed Professional Clinical Counselor", c: "los-angeles", f: "b", s: ["lgbtq-affirming-therapy", "anxiety-therapy"], a: ["act", "person-centered"], l: ["english", "korean"], fee: [110, 140], y: 5, ages: ["Teens", "Adults"], st: "An affirming space to explore who you are without explanation." },
  { n: "Elena Vasquez", cr: "LCSW", p: "social-worker", t: "Clinical Social Worker", c: "los-angeles", f: "o", s: ["grief-counseling", "depression-therapy"], a: ["psychodynamic", "mindfulness"], l: ["english", "spanish"], fee: [100, 130], y: 11, ages: ["Adults", "Seniors"], st: "Room to grieve, at your own speed, without being told to move on.", slide: true },
  // New York
  { n: "Jonathan Weiss", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "new-york", f: "b", s: ["ocd-therapy", "anxiety-therapy"], a: ["erp", "cbt"], fee: [220, 275], y: 18, ages: ["Adults", "Teens"], st: "Specialist ERP treatment for OCD and anxiety disorders.", feat: true, free: true },
  { n: "Aisha Rahman", cr: "LMHC", p: "counselor", t: "Licensed Mental Health Counselor", c: "new-york", f: "o", s: ["stress-and-burnout-therapy", "relationship-counseling", "life-transitions-therapy"], a: ["cbt", "mindfulness"], l: ["english", "arabic"], fee: [130, 160], y: 8, ages: ["Adults"], st: "For high-achievers who are tired of being tired.", slide: true },
  { n: "Samuel Greene", cr: "LCSW-R", p: "social-worker", t: "Psychotherapist", c: "new-york", f: "i", s: ["depression-therapy", "grief-counseling"], a: ["psychodynamic", "person-centered"], fee: [170, 210], y: 20, ages: ["Adults", "Seniors"], st: "Thoughtful long-term therapy for depth and lasting change." },
  { n: "Lucia Moretti", cr: "PsyD", p: "psychologist", t: "Clinical Psychologist", c: "new-york", f: "b", s: ["eating-disorder-therapy", "anxiety-therapy"], a: ["dbt", "cbt"], l: ["english", "french"], fee: [200, 250], y: 13, ages: ["Teens", "Adults"], st: "Recovery-focused care for eating disorders and body image.", full: true },
  { n: "Wei Zhang", cr: "LMFT", p: "marriage-family-therapist", t: "Family Therapist", c: "new-york", f: "b", s: ["family-therapy", "teen-therapy"], a: ["emotionally-focused", "play-therapy"], l: ["english", "mandarin"], fee: [150, 190], y: 10, ages: ["Children", "Teens", "Families"], st: "Bridging the gap between generations, and between cultures.", slide: true },
  // Brooklyn
  { n: "Naomi Feldman", cr: "LCSW", p: "social-worker", t: "Therapist", c: "brooklyn", f: "b", s: ["trauma-therapy", "lgbtq-affirming-therapy"], a: ["emdr", "ifs"], fee: [140, 170], y: 9, ages: ["Adults"], st: "Trauma work that honours your resilience.", slide: true },
  { n: "Andre Thompson", cr: "LMHC", p: "counselor", t: "Counselor", c: "brooklyn", f: "o", s: ["depression-therapy", "stress-and-burnout-therapy", "life-transitions-therapy"], a: ["cbt", "act"], fee: [110, 135], y: 6, ages: ["Adults"], st: "Straightforward, supportive counseling for tough seasons." },
  // Chicago
  { n: "Rebecca Lindqvist", cr: "PhD", p: "psychologist", t: "Licensed Clinical Psychologist", c: "chicago", f: "b", s: ["adhd-therapy", "anxiety-therapy"], a: ["cbt", "act"], fee: [170, 210], y: 14, ages: ["Adults", "Teens"], st: "Building systems that actually work for ADHD adults.", feat: true },
  { n: "Omar Haddad", cr: "LCPC", p: "counselor", t: "Professional Counselor", c: "chicago", f: "o", s: ["relationship-counseling", "stress-and-burnout-therapy"], a: ["gottman", "mindfulness"], l: ["english", "arabic"], fee: [100, 130], y: 7, ages: ["Adults", "Couples"], st: "Calm, honest conversations for couples under pressure.", slide: true },
  { n: "Tessa Brandt", cr: "LCSW", p: "social-worker", t: "Clinical Social Worker", c: "chicago", f: "i", s: ["grief-counseling", "family-therapy"], a: ["person-centered", "play-therapy"], fee: [90, 125], y: 16, ages: ["Children", "Families"], st: "Supporting families through loss and big transitions.", slide: true },
  { n: "Gabriel Santos", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "chicago", f: "b", s: ["trauma-therapy", "depression-therapy"], a: ["emdr", "psychodynamic"], l: ["english", "spanish"], fee: [160, 195], y: 12, ages: ["Adults"], st: "Bilingual trauma treatment with warmth and structure." },
  // Austin
  { n: "Claire Donnelly", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "austin", f: "b", s: ["anxiety-therapy", "teen-therapy"], a: ["cbt", "mindfulness"], fee: [95, 125], y: 6, ages: ["Teens", "Adults"], st: "Helping teens and young adults feel steadier.", slide: true, free: true },
  { n: "Rafael Ortiz", cr: "LMFT", p: "marriage-family-therapist", t: "Couples & Family Therapist", c: "austin", f: "b", s: ["relationship-counseling", "family-therapy"], a: ["emotionally-focused", "gottman"], l: ["english", "spanish"], fee: [130, 165], y: 11, ages: ["Couples", "Families"], st: "Reconnecting couples, one honest conversation at a time.", feat: true },
  { n: "Sofia Lindgren", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "austin", f: "o", s: ["ocd-therapy", "adhd-therapy"], a: ["erp", "act"], fee: [150, 185], y: 9, ages: ["Adults", "Teens"], st: "Online ERP and ADHD coaching grounded in research." },
  { n: "Terrence Mills", cr: "LCSW", p: "social-worker", t: "Therapist", c: "austin", f: "i", s: ["trauma-therapy", "grief-counseling"], a: ["emdr", "person-centered"], fee: [100, 130], y: 8, ages: ["Adults", "Seniors"], st: "A steady presence when life has been heavy.", slide: true },
  // Seattle
  { n: "Ingrid Solberg", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "seattle", f: "b", s: ["stress-and-burnout-therapy", "depression-therapy", "life-transitions-therapy"], a: ["act", "mindfulness"], fee: [165, 200], y: 10, ages: ["Adults"], st: "Rebuilding energy and meaning after burnout.", near: ["denver"] },
  { n: "Kenji Watanabe", cr: "LMHC", p: "counselor", t: "Counselor", c: "seattle", f: "o", s: ["anxiety-therapy", "lgbtq-affirming-therapy"], a: ["cbt", "act"], l: ["english"], fee: [105, 135], y: 5, ages: ["Teens", "Adults"], st: "Warm, queer-affirming support for anxious overthinkers.", slide: true },
  { n: "Danielle Foster", cr: "LICSW", p: "social-worker", t: "Clinical Social Worker", c: "seattle", f: "i", s: ["family-therapy", "teen-therapy"], a: ["play-therapy", "emotionally-focused"], fee: [120, 150], y: 13, ages: ["Children", "Teens", "Families"], st: "Family therapy that makes room for every voice.", full: true },
  // San Francisco
  { n: "Julian Park", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "san-francisco", f: "b", s: ["anxiety-therapy", "ocd-therapy"], a: ["erp", "cbt"], l: ["english", "korean"], fee: [210, 260], y: 17, ages: ["Adults", "Teens"], st: "Focused treatment for anxiety, OCD and panic.", feat: true, near: ["san-diego"] },
  { n: "Mira Patel", cr: "LMFT", p: "marriage-family-therapist", t: "Marriage & Family Therapist", c: "san-francisco", f: "b", s: ["relationship-counseling", "lgbtq-affirming-therapy"], a: ["emotionally-focused", "ifs"], l: ["english", "hindi"], fee: [150, 190], y: 8, ages: ["Adults", "Couples"], st: "Inclusive relationship therapy for every kind of partnership.", slide: true },
  { n: "Theo Anders", cr: "LCSW", p: "social-worker", t: "Therapist", c: "san-francisco", f: "o", s: ["depression-therapy", "stress-and-burnout-therapy", "life-transitions-therapy"], a: ["cbt", "mindfulness"], fee: [130, 160], y: 6, ages: ["Adults"], st: "Tech-worker friendly therapy, evenings and weekends." },
  // San Diego
  { n: "Carmen Delgado", cr: "LPCC", p: "counselor", t: "Counselor", c: "san-diego", f: "b", s: ["trauma-therapy", "family-therapy"], a: ["emdr", "play-therapy"], l: ["english", "spanish"], fee: [90, 120], y: 10, ages: ["Children", "Teens", "Adults"], st: "Bilingual care for families healing together.", slide: true },
  { n: "Nathan Cho", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "san-diego", f: "o", s: ["adhd-therapy", "teen-therapy"], a: ["cbt", "person-centered"], l: ["english", "korean"], fee: [150, 180], y: 7, ages: ["Teens", "Adults"], st: "Helping teens and parents get unstuck." },
  // Denver
  { n: "Hannah Brooks", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "denver", f: "b", s: ["anxiety-therapy", "depression-therapy", "life-transitions-therapy"], a: ["act", "mindfulness"], fee: [100, 130], y: 8, ages: ["Adults"], st: "Mindful, down-to-earth counseling for everyday struggles.", slide: true, free: true },
  { n: "Isaac Rivera", cr: "LMFT", p: "marriage-family-therapist", t: "Family Therapist", c: "denver", f: "i", s: ["family-therapy", "grief-counseling"], a: ["emotionally-focused", "person-centered"], l: ["english", "spanish"], fee: [115, 145], y: 12, ages: ["Families", "Teens"], st: "Strengthening families through hard times." },
  { n: "Olivia Hartman", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "denver", f: "o", s: ["eating-disorder-therapy", "trauma-therapy"], a: ["dbt", "emdr"], fee: [175, 215], y: 14, ages: ["Teens", "Adults"], st: "Compassionate, skills-based eating disorder recovery." },
  // Miami
  { n: "Alejandro Cruz", cr: "LMHC", p: "counselor", t: "Counselor", c: "miami", f: "b", s: ["relationship-counseling", "anxiety-therapy"], a: ["cbt", "gottman"], l: ["english", "spanish"], fee: [100, 135], y: 9, ages: ["Adults", "Couples"], st: "Bilingual counseling for relationships and anxiety.", slide: true },
  { n: "Natalie Brennan", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "miami", f: "o", s: ["depression-therapy", "stress-and-burnout-therapy"], a: ["act", "cbt"], l: ["english", "french"], fee: [155, 190], y: 11, ages: ["Adults"], st: "Online therapy that fits around a busy life." },
  { n: "Yasmin El-Amin", cr: "LCSW", p: "social-worker", t: "Therapist", c: "miami", f: "i", s: ["trauma-therapy", "lgbtq-affirming-therapy"], a: ["ifs", "emdr"], l: ["english", "arabic"], fee: [110, 140], y: 7, ages: ["Adults"], st: "Culturally attuned trauma and identity work." },
  // Atlanta
  { n: "Darius Coleman", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "atlanta", f: "b", s: ["depression-therapy", "stress-and-burnout-therapy"], a: ["cbt", "person-centered"], fee: [90, 120], y: 10, ages: ["Adults", "Teens"], st: "Culturally responsive counseling for Black men and families.", slide: true },
  { n: "Whitney Hayes", cr: "LMFT", p: "marriage-family-therapist", t: "Couples Therapist", c: "atlanta", f: "b", s: ["relationship-counseling", "family-therapy"], a: ["gottman", "emotionally-focused"], fee: [120, 150], y: 8, ages: ["Couples", "Adults"], st: "Practical tools for lasting connection.", free: true },
  { n: "Priscilla Nguyen", cr: "PsyD", p: "psychologist", t: "Psychologist", c: "atlanta", f: "o", s: ["anxiety-therapy", "adhd-therapy"], a: ["cbt", "act"], l: ["english"], fee: [140, 175], y: 6, ages: ["Teens", "Adults"], st: "Clear, kind guidance for anxiety and ADHD.", full: true },
  // Boston
  { n: "Edward Callahan", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "boston", f: "b", s: ["trauma-therapy", "depression-therapy"], a: ["psychodynamic", "emdr"], fee: [200, 250], y: 22, ages: ["Adults"], st: "Experienced, reflective therapy for complex histories.", feat: true },
  { n: "Grace Liu", cr: "LMHC", p: "counselor", t: "Counselor", c: "boston", f: "o", s: ["anxiety-therapy", "teen-therapy", "life-transitions-therapy"], a: ["cbt", "mindfulness"], l: ["english", "mandarin"], fee: [110, 140], y: 5, ages: ["Teens", "Adults"], st: "Supportive counseling for students and young professionals.", slide: true },
  { n: "Patrick Nolan", cr: "LICSW", p: "social-worker", t: "Clinical Social Worker", c: "boston", f: "i", s: ["grief-counseling", "family-therapy"], a: ["person-centered", "psychodynamic"], fee: [125, 160], y: 15, ages: ["Adults", "Families"], st: "Steady support through loss and family change." },
  // Houston
  { n: "Monica Salazar", cr: "LPC", p: "counselor", t: "Licensed Professional Counselor", c: "houston", f: "b", s: ["family-therapy", "teen-therapy"], a: ["play-therapy", "cbt"], l: ["english", "spanish"], fee: [85, 115], y: 9, ages: ["Children", "Teens", "Families"], st: "Playful, practical help for kids and parents.", slide: true },
  { n: "Victor Adeyemi", cr: "PhD", p: "psychologist", t: "Clinical Psychologist", c: "houston", f: "o", s: ["ocd-therapy", "anxiety-therapy"], a: ["erp", "act"], fee: [160, 195], y: 13, ages: ["Adults", "Teens"], st: "Evidence-based online treatment for OCD." },
  // Minneapolis
  { n: "Karin Johansson", cr: "LMFT", p: "marriage-family-therapist", t: "Marriage & Family Therapist", c: "minneapolis", f: "b", s: ["relationship-counseling", "grief-counseling", "life-transitions-therapy"], a: ["emotionally-focused", "mindfulness"], fee: [110, 140], y: 12, ages: ["Couples", "Adults"], st: "Gentle, steady help through relationship turning points.", slide: true },
  { n: "Malik Washington", cr: "LICSW", p: "social-worker", t: "Therapist", c: "minneapolis", f: "o", s: ["depression-therapy", "trauma-therapy"], a: ["cbt", "emdr"], fee: [100, 130], y: 8, ages: ["Adults"], st: "Accessible online therapy with sliding-scale options.", slide: true },
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
      `${seed.st} ${first} sees clients ${where}, with a focus on ${specialtyName(lead)}${rest.length ? ` as well as ${join(rest.map(specialtyName))}` : ""}.`,
      `${first} draws on ${approachList}, adapting the pace and techniques to what fits you rather than following a one-size-fits-all plan. With ${seed.y} years of experience, ${first} works with ${join((seed.ages ?? ["Adults"]).map((a) => a.toLowerCase()))}.`,
      `Sessions begin with a conversation about what you want to change and what has or has not helped before. This is a fictional sample profile created for demonstration.`,
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
    ages: seed.ages ?? ["Adults"],
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
