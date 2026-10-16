import type { ImageRef } from "@/types";

/** Unsplash photo URL (free licence). next/image resizes it, so request a generous source width. */
export const unsplash = (id: string, alt: string): ImageRef => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`,
  alt,
});

/** Site-wide editorial photography. Replace with self-hosted images when available. */
export const PHOTOS = {
  /** Hero image card: one photo per common concern, each linking to the matching service. */
  concerns: [
    { ...unsplash("1604881990409-b9f246db39da", "Two people holding hands across a table beside two mugs"),
      label: "Marriage counseling", text: "Reconnecting, communicating, growing closer.", href: "/specialties/christian-marriage-counseling/", cta: "Explore marriage counseling" },
    { ...unsplash("1604881991720-f91add269bed", "Two people holding hands across a table in a gesture of comfort"),
      label: "Infidelity & trust repair", text: "Healing after betrayal, at a pace you can both manage.", href: "/specialties/christian-affair-recovery/", cta: "Explore trust repair" },
    { ...unsplash("1594100513700-659fa01ce822", "An open Bible and a notebook with a pen on a wooden table surrounded by houseplants"),
      label: "Faith & spiritual connection", text: "Growing together in faith, even when you see it differently.", href: "/specialties/faith-and-spiritual-connection/", cta: "Explore faith & connection" },
    { ...unsplash("1511632765486-a01980e01a18", "Four people with arms around each other's shoulders, watching a sunset"),
      label: "Seasons of marriage", text: "New baby, blended family, empty nest: changing together.", href: "/specialties/christian-couples-life-transitions/", cta: "Explore seasons of marriage" },
    { ...unsplash("1539541417736-3d44c90da315", "A person resting their head on another person's shoulder for comfort"),
      label: "Separation & reconciliation", text: "Slowing down when divorce feels close.", href: "/specialties/christian-marriage-reconciliation/", cta: "Explore reconciliation" },
  ],
  online: unsplash("1713865469952-ab0c56bbddd7", "A woman sitting on a couch at home, smiling as she joins a video call on her laptop"),
};
