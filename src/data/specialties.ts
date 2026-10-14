import type { Specialty } from "@/types";

const faq = (topic: string) => [
  {
    q: `How do I know if I need ${topic} therapy?`,
    a: `If ${topic} is affecting your sleep, relationships, work or daily comfort for more than a few weeks, talking with a professional can help. You do not need a crisis to start therapy.`,
  },
  {
    q: "How long does therapy usually take?",
    a: "It varies. Some people feel better after 8–12 sessions of a focused approach; others prefer longer-term support. Your therapist should review progress with you regularly.",
  },
];

export const specialties: Specialty[] = [
  { slug: "anxiety-therapy", name: "Anxiety", icon: "wind", summary: "Worry, panic, social anxiety and constant tension.",
    description: "Anxiety therapy helps you understand what triggers worry and panic, and teaches practical skills to respond differently. Approaches such as CBT and ACT have strong research support.",
    signs: ["Racing thoughts or constant worry", "Panic attacks or a pounding heart", "Avoiding situations that feel overwhelming", "Trouble sleeping or relaxing"], faqs: faq("anxiety") },
  { slug: "depression-therapy", name: "Depression", icon: "cloud", summary: "Low mood, loss of interest and lack of energy.",
    description: "Depression therapy offers a structured space to rebuild motivation, challenge unhelpful thought patterns and reconnect with what matters to you.",
    signs: ["Persistent sadness or emptiness", "Loss of interest in usual activities", "Changes in sleep or appetite", "Feeling worthless or hopeless"], faqs: faq("depression") },
  { slug: "relationship-counseling", name: "Relationships", icon: "heart", summary: "Communication, conflict, intimacy and life transitions.",
    description: "Relationship counseling helps partners and individuals improve communication, repair trust and navigate big changes together.",
    signs: ["Repeating the same arguments", "Feeling distant from your partner", "Trust has been broken", "Deciding whether to stay or separate"], faqs: faq("relationship") },
  { slug: "trauma-therapy", name: "Trauma & PTSD", icon: "shield", summary: "Healing from distressing events, at a pace that feels safe.",
    description: "Trauma-informed therapists use evidence-based methods such as EMDR, CPT and somatic approaches, always prioritising safety and pacing.",
    signs: ["Flashbacks or intrusive memories", "Feeling constantly on guard", "Numbness or emotional shutdown", "Avoiding reminders of past events"], faqs: faq("trauma") },
  { slug: "family-therapy", name: "Family Therapy", icon: "users", summary: "Strengthening family communication and connection.",
    description: "Family therapy involves several family members working together to resolve conflict, support a struggling child or adjust to change.",
    signs: ["Frequent family conflict", "A child or teen is struggling", "Blended-family adjustment", "Major life change or loss"], faqs: faq("family") },
  { slug: "adhd-therapy", name: "ADHD", icon: "bolt", summary: "Focus, organisation and emotional regulation skills.",
    description: "ADHD-informed therapy focuses on practical systems, self-compassion and emotional regulation, for both adults and young people.",
    signs: ["Difficulty starting or finishing tasks", "Time blindness or forgetfulness", "Feeling overwhelmed by everyday admin", "Impulsivity or restlessness"], faqs: faq("ADHD") },
  { slug: "grief-counseling", name: "Grief & Loss", icon: "leaf", summary: "Support through bereavement and major loss.",
    description: "Grief counseling gives you room to mourn, make sense of loss and find ways to carry it forward, without pressure to \"move on\".",
    signs: ["Overwhelming sadness after a loss", "Difficulty accepting what happened", "Withdrawing from others", "Waves of guilt or anger"], faqs: faq("grief") },
  { slug: "ocd-therapy", name: "OCD", icon: "repeat", summary: "Intrusive thoughts and compulsions, treated with ERP.",
    description: "Exposure and response prevention (ERP) is the gold-standard treatment for OCD. Specialists guide you through it gradually and collaboratively.",
    signs: ["Unwanted, distressing thoughts", "Rituals or checking that take up time", "Needing things to feel \"just right\"", "Reassurance seeking"], faqs: faq("OCD") },
  { slug: "eating-disorder-therapy", name: "Eating Disorders", icon: "apple", summary: "Recovery support for disordered eating and body image.",
    description: "Therapists in this area work alongside medical providers and dietitians to support recovery from anorexia, bulimia, binge eating and related struggles.",
    signs: ["Preoccupation with food or weight", "Restricting, bingeing or purging", "Strong distress about body image", "Rigid rules around eating"], faqs: faq("eating disorder") },
  { slug: "lgbtq-affirming-therapy", name: "LGBTQ+ Affirming", icon: "rainbow", summary: "Identity-affirming care for LGBTQ+ people.",
    description: "Affirming therapists support identity exploration, coming out, relationships and minority stress without trying to change who you are.",
    signs: ["Exploring identity or coming out", "Minority stress or discrimination", "Family acceptance concerns", "Navigating transition"], faqs: faq("identity") },
  { slug: "stress-and-burnout-therapy", name: "Stress & Burnout", icon: "flame", summary: "Work stress, overwhelm and life balance.",
    description: "Stress and burnout therapy helps you identify what is draining you, set healthier boundaries and rebuild energy.",
    signs: ["Dreading work", "Constant exhaustion", "Irritability or cynicism", "Difficulty switching off"], faqs: faq("stress") },
  { slug: "teen-therapy", name: "Teens & Adolescents", icon: "sprout", summary: "Support for school, social and emotional challenges.",
    description: "Teen therapists build trust with young people and coordinate appropriately with parents to support mood, school stress and social difficulties.",
    signs: ["Withdrawing from friends or family", "Dropping grades or school refusal", "Mood swings or irritability", "Self-esteem struggles"], faqs: faq("teen mental health") },
  { slug: "life-transitions-therapy", name: "Life Transitions", icon: "compass", summary: "Big changes, personal growth and finding your direction.",
    description: "Therapy for life transitions gives you space to make sense of change, whether chosen or unexpected, such as a move, a new job, a breakup, becoming a parent or retiring, and to grow into what comes next.",
    signs: ["Feeling unsettled after a big change", "Unsure what you want next", "Losing your sense of identity or routine", "Wanting to grow but not knowing where to start"], faqs: faq("life transitions") },
];

export const getSpecialty = (slug: string) => specialties.find((s) => s.slug === slug);
