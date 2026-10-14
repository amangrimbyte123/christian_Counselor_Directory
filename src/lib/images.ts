import type { ImageRef } from "@/types";

/** Unsplash photo URL (free licence). next/image resizes it, so request a generous source width. */
export const unsplash = (id: string, alt: string): ImageRef => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`,
  alt,
});

/** Site-wide editorial photography. Replace with self-hosted images when available. */
export const PHOTOS = {
  /** Hero image card: one photo per common concern, each linking to the matching topic. */
  concerns: [
    { ...unsplash("1573495804664-b1c0849525af", "Two women sitting together on a sofa, one listening closely as the other talks"),
      label: "Someone to talk to", text: "A space to say things out loud, without judgement.", href: "/therapists/", cta: "Browse therapists" },
    { ...unsplash("1618616191524-a9721186cbe4", "A woman with her hands on her head, looking overwhelmed, in soft pink light"),
      label: "Anxiety & stress", text: "When your mind won't slow down.", href: "/specialties/anxiety-therapy/", cta: "Explore anxiety support" },
    { ...unsplash("1604881990409-b9f246db39da", "Two people holding hands across a table beside two mugs"),
      label: "Relationships", text: "Reconnecting, communicating, rebuilding trust.", href: "/specialties/relationship-counseling/", cta: "Explore relationship support" },
    { ...unsplash("1511632765486-a01980e01a18", "Four people with arms around each other's shoulders, watching a sunset"),
      label: "Family & connection", text: "Making room for every voice at home.", href: "/specialties/family-therapy/", cta: "Explore family therapy" },
    { ...unsplash("1539541417736-3d44c90da315", "A person resting their head on another person's shoulder for comfort"),
      label: "Grief & loss", text: "Support through loss, at your own pace.", href: "/specialties/grief-counseling/", cta: "Explore grief support" },
  ],
  online: unsplash("1713865469952-ab0c56bbddd7", "A woman sitting on a couch at home, smiling as she joins a video call on her laptop"),
};
