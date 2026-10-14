/** Lowercase a topic name for use mid-sentence, keeping proper nouns intact. */
export const topicLower = (name: string) => name.toLowerCase().replace(/\bchristian\b/g, "Christian");
