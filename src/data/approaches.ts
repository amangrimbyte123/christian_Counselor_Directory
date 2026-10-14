import type { Approach } from "@/types";

export const approaches: Approach[] = [
  { slug: "cbt", name: "Cognitive Behavioral Therapy (CBT)", summary: "Identifies and changes unhelpful thinking and behavior patterns." },
  { slug: "act", name: "Acceptance & Commitment Therapy (ACT)", summary: "Builds psychological flexibility and values-based action." },
  { slug: "dbt", name: "Dialectical Behavior Therapy (DBT)", summary: "Skills for emotional regulation, distress tolerance and relationships." },
  { slug: "emdr", name: "EMDR", summary: "Processes distressing memories using guided bilateral stimulation." },
  { slug: "psychodynamic", name: "Psychodynamic", summary: "Explores how past experiences shape present patterns." },
  { slug: "emotionally-focused", name: "Emotionally Focused Therapy (EFT)", summary: "Strengthens emotional bonds in couples and families." },
  { slug: "gottman", name: "Gottman Method", summary: "Research-based couples work on friendship, conflict and trust." },
  { slug: "mindfulness", name: "Mindfulness-Based", summary: "Present-moment awareness to reduce stress and rumination." },
  { slug: "erp", name: "Exposure & Response Prevention (ERP)", summary: "Gradual exposure to reduce compulsions, the standard treatment for OCD." },
  { slug: "person-centered", name: "Person-Centered", summary: "A warm, non-directive approach that trusts your own insight." },
  { slug: "ifs", name: "Internal Family Systems (IFS)", summary: "Works with the different \"parts\" of the self with compassion." },
  { slug: "play-therapy", name: "Play Therapy", summary: "Helps children express feelings through play." },
];
