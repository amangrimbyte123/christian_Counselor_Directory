/** Lowercase a topic name for use mid-sentence, keeping proper nouns and acronyms intact. */
export const topicLower = (name: string) =>
  name
    .toLowerCase()
    .replace(/\bchristian\b/g, "Christian")
    .replace(/\blgbtq\+/g, "LGBTQ+")
    .replace(/\b(adhd|ocd|ptsd)\b/g, (m) => m.toUpperCase());
