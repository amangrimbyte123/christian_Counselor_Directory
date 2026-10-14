import type { Post } from "@/types";
import { unsplash } from "@/lib/images";

/** General-information articles written for the demo. Not medical advice. */
export const posts: Post[] = [
  {
    slug: "what-is-christian-counseling", image: unsplash("1594100513700-659fa01ce822", "An open Bible and a notebook with a pen on a wooden table surrounded by houseplants"),
    title: "What Is Christian Counseling? How Faith-Integrated Therapy Works", category: "Faith & therapy", readMinutes: 6,
    excerpt: "What Christian counseling involves, who provides it, and the questions to ask so you find someone qualified who respects your faith.", publishedOn: "2026-10-02", author: "CounselorDirectory Editorial Team",
    relatedSpecialties: ["christian-counseling", "relationship-counseling"],
    body: [
      { p: "Christian counseling is therapy that brings Christian faith into the conversation alongside established counseling methods. It is for people who want their beliefs to be part of how they understand and work through what they are facing." },
      { h: "Who provides it", p: "Some Christian counselors are licensed clinicians, such as professional counselors, marriage and family therapists, social workers or psychologists, who integrate faith when a client asks for it. Others are pastoral or biblical counselors working through churches, who may not hold a state licence. Both can be supportive, but only licensed clinicians are regulated by a state board, and they are usually the ones who can diagnose and work with insurance." },
      { h: "What sessions can look like", p: "Faith-integrated therapy still draws on approaches such as CBT, emotionally focused therapy or person-centered work. Depending on what you want, it might also include prayer, scripture, or exploring how your beliefs relate to what you are going through. A good counselor follows your lead about how much faith to include and never pressures you." },
      { h: "Questions to ask before you start", p: "Are you licensed, and in which state? How do you integrate faith, and can I choose how much? What training do you have in both counseling and faith integration? How do you work with doubt, or with people from different denominations or traditions? You can verify any licence on your state licensing board's website." },
      { h: "You don't have to choose a Christian counselor", p: "Professional ethics codes ask licensed therapists to respect clients' religious and spiritual beliefs, so you can bring your faith into therapy with any licensed therapist. If it matters to you, ask in your first call how they would approach it." },
      { h: "If you are struggling right now", p: "In the US you can call or text 988, the Suicide & Crisis Lifeline, at any time. If you are in immediate danger, call 911." },
    ],
  },
  {
    slug: "how-to-find-a-therapist", image: unsplash("1517971129774-8a2b38fa128e", "A woman writing in a notebook at a table beside a window"), title: "How to Find a Therapist: A Step-by-Step Guide", category: "Getting started", readMinutes: 6,
    excerpt: "From deciding what you need to booking a first call, a calm walk-through of finding the right fit.", publishedOn: "2026-09-12", author: "CounselorDirectory Editorial Team",
    relatedSpecialties: ["anxiety-therapy", "depression-therapy"],
    body: [
      { p: "Finding a therapist can feel like a big task when you are already struggling. Breaking it into small steps makes it manageable." },
      { h: "1. Get clear on what you want help with", p: "You do not need a diagnosis. Write a few lines about what is hard right now, how long it has been going on, and what you would like to be different." },
      { h: "2. Decide on format and budget", p: "Online sessions widen your options and can be easier to schedule. In-person sessions suit some people better. Check fees, whether a sliding scale is offered, and whether your insurance covers out-of-network providers." },
      { h: "3. Shortlist two or three people", p: "Use filters for specialty, language and session type, then read profiles for tone as well as qualifications. Verify any licence with your state licensing board before booking." },
      { h: "4. Book a short consultation", p: "Many therapists offer a brief first call. Ask how they usually work, what a typical session looks like, and how you will know if it is helping." },
      { h: "5. Give it a few sessions, and switch if needed", p: "Fit matters more than any single technique. If it is not working after a few sessions, it is completely fine to try someone else." },
    ],
  },
  {
    slug: "therapist-vs-counselor-vs-psychologist", image: unsplash("1714976694810-85add1a29c96", "A counselor with glasses listening to a client in a calm office"), title: "Therapist, Counselor, Psychologist: What Is the Difference?", category: "Getting started", readMinutes: 5,
    excerpt: "The titles overlap, but training, licensing and scope differ. Here is what each usually means.", publishedOn: "2026-08-30", author: "CounselorDirectory Editorial Team",
    relatedSpecialties: ["depression-therapy", "adhd-therapy"],
    body: [
      { p: "\"Therapist\" is an umbrella term. Titles and licences vary by state, so always check requirements locally." },
      { h: "Counselors and social workers", p: "Licensed professional counselors, mental health counselors and clinical social workers usually hold master's degrees and provide talk therapy for a wide range of concerns." },
      { h: "Marriage and family therapists", p: "These clinicians are trained to work with relationships and family systems, though many also see individuals." },
      { h: "Psychologists", p: "Psychologists hold doctoral degrees (PhD or PsyD). Many provide psychological testing, such as for ADHD or learning differences, in addition to therapy." },
      { h: "Psychiatrists", p: "Psychiatrists are medical doctors who can prescribe medication, and some also provide therapy." },
    ],
  },
  {
    slug: "what-to-expect-in-your-first-therapy-session", image: unsplash("1637245048732-adf1a547835e", "Two armchairs facing each other with a plant between them in a softly lit room"), title: "What to Expect in Your First Therapy Session", category: "Getting started", readMinutes: 4,
    excerpt: "Nervous about session one? Here is what usually happens, and what you can ask.", publishedOn: "2026-08-14", author: "CounselorDirectory Editorial Team",
    relatedSpecialties: ["anxiety-therapy", "stress-and-burnout-therapy"],
    body: [
      { p: "A first session is mostly a conversation. There are no wrong answers, and you can go at your own pace." },
      { h: "Paperwork and privacy", p: "Expect consent forms and an explanation of confidentiality, including the rare limits to it, such as risk of serious harm." },
      { h: "Your story and your goals", p: "Your therapist will ask what brought you in, relevant history and what you hope to achieve." },
      { h: "Questions worth asking", p: "How often will we meet? How will we measure progress? What happens if I need to cancel? Good therapists welcome these questions." },
    ],
  },
  {
    slug: "online-therapy-vs-in-person", image: unsplash("1758874384555-de68b8035c24", "A young woman talking to her laptop camera in a colorful room at home"), title: "Online Therapy vs In-Person: Which Is Right for You?", category: "Online therapy", readMinutes: 5,
    excerpt: "Research shows online therapy can work well for many concerns. A look at the trade-offs.", publishedOn: "2026-07-28", author: "CounselorDirectory Editorial Team",
    relatedSpecialties: ["anxiety-therapy", "depression-therapy"],
    body: [
      { p: "For many common concerns, video therapy performs comparably to in-person care. The right choice depends on you." },
      { h: "When online works well", p: "Busy schedules, limited local options, mobility or transport barriers, and comfort at home are common reasons people choose online." },
      { h: "When in-person may help more", p: "If you do not have a private space at home, or you find screens draining, face-to-face sessions can feel more connected." },
      { h: "Practical tips", p: "Use headphones, choose a private room, and test your connection before the first session. Confirm that your therapist is licensed in the state where you are located during sessions." },
    ],
  },
  {
    slug: "how-to-choose-between-cbt-emdr-and-act", image: unsplash("1637689113621-73951984fcc1", "A cup of coffee, a notebook and a pen on a wooden table in afternoon light"), title: "CBT, EMDR or ACT? A Plain-Language Guide to Common Approaches", category: "Treatment approaches", readMinutes: 7,
    excerpt: "Three widely used approaches, explained without jargon.", publishedOn: "2026-07-05", author: "CounselorDirectory Editorial Team",
    relatedSpecialties: ["trauma-therapy", "anxiety-therapy"],
    body: [
      { p: "Different approaches suit different concerns, but the relationship with your therapist is one of the strongest predictors of progress." },
      { h: "CBT", p: "Cognitive behavioral therapy looks at how thoughts, feelings and behaviours connect, and builds practical skills. It is widely used for anxiety and depression." },
      { h: "EMDR", p: "Eye movement desensitisation and reprocessing is a structured approach to processing traumatic memories." },
      { h: "ACT", p: "Acceptance and commitment therapy teaches you to make room for difficult thoughts while moving toward what matters to you." },
    ],
  },
  {
    slug: "how-to-support-a-friend-in-therapy", image: unsplash("1604881991720-f91add269bed", "Two people holding hands across a table in a gesture of comfort"), title: "How to Support Someone Who Is Starting Therapy", category: "Support", readMinutes: 4,
    excerpt: "Small, practical ways to help without pressuring.", publishedOn: "2026-06-18", author: "CounselorDirectory Editorial Team",
    relatedSpecialties: ["relationship-counseling", "family-therapy"],
    body: [
      { p: "Starting therapy takes courage. Your support can make it easier." },
      { h: "Ask, do not assume", p: "Ask what would be helpful. Some people want practical help, such as a lift or a quiet evening; others want space." },
      { h: "Respect privacy", p: "You do not need to know what is discussed in sessions. Let them share if and when they want to." },
    ],
  },
  {
    slug: "signs-of-burnout-and-what-helps", image: unsplash("1647964366344-bc680baf64e2", "A woman sitting in front of a laptop, looking tired"), title: "Signs of Burnout and What Can Help", category: "Mental wellbeing", readMinutes: 5,
    excerpt: "Exhaustion, cynicism and reduced effectiveness: recognising burnout early.", publishedOn: "2026-05-22", author: "CounselorDirectory Editorial Team",
    relatedSpecialties: ["stress-and-burnout-therapy", "depression-therapy"],
    body: [
      { p: "Burnout is a response to prolonged, unmanaged stress, most often related to work or caregiving." },
      { h: "Common signs", p: "Persistent exhaustion, dreading work, feeling detached or cynical, and a drop in performance." },
      { h: "What can help", p: "Rest and boundaries are the starting point. Therapy can help you examine workload, perfectionism and values, and plan sustainable changes." },
    ],
  },
  {
    slug: "understanding-anxiety-and-panic", image: unsplash("1556833232-52da3e4bd5d8", "A woman walking along a grassy path at sunset"), title: "Understanding Anxiety and Panic: When Worry Becomes a Problem", category: "Mental wellbeing", readMinutes: 6,
    excerpt: "Everyone worries. Here is how to tell when anxiety deserves professional support.", publishedOn: "2026-04-09", author: "CounselorDirectory Editorial Team",
    relatedSpecialties: ["anxiety-therapy", "ocd-therapy"],
    body: [
      { p: "Anxiety is a normal human response. It becomes a problem when it is persistent, disproportionate or limits your life." },
      { h: "Anxiety versus panic", p: "Anxiety tends to build around worry about the future. Panic attacks are sudden surges of intense fear with physical symptoms such as a racing heart." },
      { h: "Getting help", p: "Anxiety is highly treatable. If you ever feel unsafe, contact local emergency services or a crisis line, such as 988 in the United States." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
