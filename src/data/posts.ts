import type { Post } from "@/types";
import { unsplash } from "@/lib/images";

const AUTHOR = "Christian Couples Directory Editorial Team";

/** General-information articles for Christian couples, written for the demo. Not medical advice. */
export const posts: Post[] = [
  {
    slug: "what-is-christian-couples-counseling", image: unsplash("1594100513700-659fa01ce822", "An open Bible and a notebook with a pen on a wooden table surrounded by houseplants"),
    title: "How Faith Fits Into Couples Counseling", category: "Faith & marriage", readMinutes: 6,
    excerpt: "What faith-centered counseling for couples involves, who provides it, and the questions to ask so you find someone qualified who respects your faith.", publishedOn: "2026-10-02", author: AUTHOR,
    relatedSpecialties: ["christian-marriage-counseling", "faith-and-spiritual-connection"],
    body: [
      { p: "Faith-centered couples counseling is relationship therapy that brings your Christian faith into the conversation alongside established couples counseling methods. It is for couples who want their beliefs to be part of how they understand and work through what they are facing together." },
      { h: "Who provides it", p: "Some counselors are licensed clinicians, such as marriage and family therapists, professional counselors, social workers or psychologists, who integrate faith when a couple asks for it. Others are pastoral or biblical counselors working through churches, who may not hold a state licence. Both can be supportive, but only licensed clinicians are regulated by a state board." },
      { h: "What sessions can look like", p: "Faith-integrated couples therapy still draws on research-based approaches such as emotionally focused therapy or the Gottman Method. Depending on what you both want, it might also include prayer, scripture, or exploring how your shared beliefs shape your marriage. A good counselor follows your lead about how much faith to include and never pressures either partner." },
      { h: "Questions to ask before you start", p: "Are you licensed, and in which state? What training do you have in couples therapy specifically? How do you integrate faith, and can we choose how much? How do you work with couples who see faith differently? You can verify any licence on your state licensing board's website." },
      { h: "You don't have to choose a Christian counselor", p: "Professional ethics codes ask licensed therapists to respect clients' religious and spiritual beliefs, so you can bring your faith into couples therapy with any licensed therapist. If it matters to you, ask in your first call how they would approach it." },
      { h: "If you are struggling right now", p: "In the US you can call or text 988, the Suicide & Crisis Lifeline, at any time. If you are in immediate danger, call 911." },
    ],
  },
  {
    slug: "how-to-find-a-christian-marriage-counselor", image: unsplash("1517971129774-8a2b38fa128e", "A woman writing in a notebook at a table beside a window"), title: "How to Find the Right Marriage Counselor: A Step-by-Step Guide", category: "Getting started", readMinutes: 6,
    excerpt: "From agreeing what you want help with to booking a first call, a calm walk-through of finding the right counselor for your marriage.", publishedOn: "2026-09-12", author: AUTHOR,
    relatedSpecialties: ["christian-marriage-counseling", "christian-couples-communication"],
    body: [
      { p: "Looking for a marriage counselor can feel like a big step, especially when things at home are tense. Breaking it into small steps makes it manageable." },
      { h: "1. Talk about what you each want help with", p: "You don't need to agree on everything. Each write a few lines about what feels hard, how long it has been going on, and what you would like to be different." },
      { h: "2. Decide how much faith you want in the room", p: "Some couples want prayer and scripture in sessions; others simply want a counselor who understands and respects their values. Knowing this helps you ask the right questions." },
      { h: "3. Decide on format and budget", p: "Online sessions widen your options and can be easier to schedule around work and children. Check fees, whether a sliding scale is offered, and whether your insurance covers couples counseling." },
      { h: "4. Shortlist two or three counselors", p: "Look for specific training in couples therapy, not just general counseling. Read profiles for tone as well as qualifications, and verify any licence with your state licensing board." },
      { h: "5. Book a short consultation together", p: "Many counselors offer a brief first call. Ask how they work with couples, how they integrate faith, and how you will know if it is helping. Fit matters, and it's fine to try someone else." },
    ],
  },
  {
    slug: "licensed-therapist-vs-pastoral-counselor", image: unsplash("1714976694810-85add1a29c96", "A counselor with glasses listening to a client in a calm office"), title: "Licensed Therapist, Pastoral Counselor or Pastor: Who Should Counsel Your Marriage?", category: "Getting started", readMinutes: 5,
    excerpt: "Training, licensing and scope differ. Here is what each usually offers Christian couples.", publishedOn: "2026-08-30", author: AUTHOR,
    relatedSpecialties: ["christian-marriage-counseling", "faith-and-spiritual-connection"],
    body: [
      { p: "Christian couples have several places to turn for help. Each has strengths, and titles and licence rules vary by state." },
      { h: "Licensed marriage and family therapists and counselors", p: "Licensed marriage and family therapists, professional counselors and clinical social workers usually hold master's degrees, complete supervised clinical hours and are regulated by a state board. Many have specific training in couples therapy, and some integrate Christian faith at a couple's request." },
      { h: "Pastoral and biblical counselors", p: "Pastoral counselors often work through churches or ministries and bring deep spiritual care. Some also hold a state licence; many do not. If they are not licensed, they are not regulated by a state board, so ask about their training and how they handle situations beyond their scope." },
      { h: "Your pastor", p: "A pastor can offer prayer, spiritual guidance and community support, and many are a natural first call. Pastors often refer couples to a licensed counselor for ongoing or more complex marriage concerns." },
      { h: "Which is right for us?", p: "Many couples use more than one: a licensed counselor for the relationship work and their church community for spiritual support. Whoever you choose, check their training in couples work and verify any licence with your state board." },
    ],
  },
  {
    slug: "what-to-expect-in-your-first-couples-counseling-session", image: unsplash("1637245048732-adf1a547835e", "Two armchairs facing each other with a plant between them in a softly lit room"), title: "What to Expect in Your First Couples Counseling Session", category: "Getting started", readMinutes: 5,
    excerpt: "Nervous about session one? Here is what usually happens, and what you can ask together.", publishedOn: "2026-08-14", author: AUTHOR,
    relatedSpecialties: ["christian-marriage-counseling", "christian-couples-communication"],
    body: [
      { p: "It's normal for one or both partners to feel nervous before a first couples session. Knowing what to expect can make it easier." },
      { h: "Getting to know you both", p: "The counselor will usually ask what brings you in, how you met, what is going well, and what you would each like to change. Each partner gets a chance to speak." },
      { h: "Ground rules and safety", p: "Many counselors explain how sessions work, how they handle confidentiality between partners, and what happens if conversations get heated. Some meet with each partner individually once early on." },
      { h: "Talking about faith", p: "If you have chosen a Christian counselor, they may ask how important faith is to each of you and whether you'd like prayer or scripture included. You can both say what you are comfortable with." },
      { h: "Questions you can ask", p: "How do you usually work with couples? How long might this take? What will you expect from us between sessions? How do you stay fair to both of us?" },
      { h: "If you ever feel unsafe at home", p: "Joint couples counseling is not usually recommended where there is abuse. Contact the National Domestic Violence Hotline at 1-800-799-7233, or call 911 in an emergency." },
    ],
  },
  {
    slug: "online-vs-in-person-christian-couples-counseling", image: unsplash("1758874384555-de68b8035c24", "A young woman talking to her laptop camera in a colorful room at home"), title: "Online or In-Person Counseling: Which Is Right for You Two?", category: "Online counseling", readMinutes: 5,
    excerpt: "Online couples counseling can work well for many couples. A look at the trade-offs.", publishedOn: "2026-07-28", author: AUTHOR,
    relatedSpecialties: ["christian-marriage-counseling", "christian-couples-life-transitions"],
    body: [
      { p: "Both formats can work well for couples. The best choice depends on your schedules, your home, and how you each feel most comfortable talking." },
      { h: "Why couples choose online", p: "No commute, easier childcare, and a wider choice of Christian counselors beyond your own town. Some couples also find it easier to open up from home. Counselors generally need to be licensed in the state where you live." },
      { h: "Why couples choose in person", p: "A neutral room away from home can help when conversations are tense, and some couples simply connect better face to face. It also avoids the challenge of finding a private space at home." },
      { h: "Practical tips for online sessions", p: "Sit side by side with one camera, use headphones with a splitter if needed, and find a time when children won't overhear. Agree on what to do if a session leaves you both raw, such as taking a short walk before talking further." },
    ],
  },
  {
    slug: "gottman-eft-or-imago-couples-therapy-approaches", image: unsplash("1637689113621-73951984fcc1", "A cup of coffee, a notebook and a pen on a wooden table in afternoon light"), title: "Gottman, EFT or Imago? A Plain-Language Guide to Couples Therapy Approaches", category: "Counseling approaches", readMinutes: 6,
    excerpt: "Three widely used couples approaches, explained without jargon.", publishedOn: "2026-07-05", author: AUTHOR,
    relatedSpecialties: ["christian-couples-communication", "christian-intimacy-counseling"],
    body: [
      { p: "Most counselors draw on one or more established approaches and adapt them to your faith and values. Here are three you will often see on profiles." },
      { h: "The Gottman Method", p: "Based on decades of research with couples, it focuses on building friendship, managing conflict well and creating shared meaning. Couples often learn practical tools for softer starts to hard conversations and for repairing after a fight." },
      { h: "Emotionally Focused Therapy (EFT)", p: "EFT helps couples recognise the negative cycle they get stuck in, such as one partner pursuing and the other withdrawing, and reach for each other in new ways. It is one of the most researched couples therapies." },
      { h: "Imago Relationship Therapy", p: "Imago uses a structured dialogue where partners take turns mirroring and validating each other. Many couples find it helps them truly hear one another." },
      { h: "Which is best?", p: "The relationship you build with your counselor matters as much as the method. Ask how they would work with your particular concerns, and how they bring faith into their approach." },
    ],
  },
  {
    slug: "christian-premarital-counseling-guide", image: unsplash("1604881990409-b9f246db39da", "Two people holding hands across a table beside two mugs"), title: "Premarital Counseling: What It Covers and Why It Helps", category: "Premarital", readMinutes: 5,
    excerpt: "What engaged couples talk about in premarital counseling, and how to choose a counselor.", publishedOn: "2026-06-18", author: AUTHOR,
    relatedSpecialties: ["christian-premarital-counseling", "faith-and-spiritual-connection"],
    body: [
      { p: "Many churches recommend premarital counseling, and many engaged couples find it one of the most useful parts of preparing for marriage." },
      { h: "What it usually covers", p: "Communication and conflict, money and debt, family of origin and in-laws, expectations about roles, children, intimacy, and how you will grow in faith together." },
      { h: "Structured assessments", p: "Many counselors use an assessment such as PREPARE/ENRICH. Each partner answers separately, then you review your strengths and growth areas together with a trained facilitator." },
      { h: "How many sessions?", p: "Often 5 to 8 sessions over a couple of months. Starting a few months before the wedding leaves room to put what you learn into practice." },
      { h: "It's not just for couples with problems", p: "Premarital counseling is preventive. Couples who attend are usually happy and simply want a strong foundation." },
    ],
  },
  {
    slug: "rebuilding-trust-after-an-affair", image: unsplash("1604881991720-f91add269bed", "Two people holding hands across a table in a gesture of comfort"), title: "Rebuilding Trust After an Affair: A Christian Perspective", category: "Healing & trust", readMinutes: 6,
    excerpt: "What affair recovery usually involves, and how faith and forgiveness fit in without rushing the process.", publishedOn: "2026-05-22", author: AUTHOR,
    relatedSpecialties: ["christian-affair-recovery", "christian-marriage-reconciliation"],
    body: [
      { p: "Discovering an affair, an emotional affair or long-running secrecy is one of the most painful experiences a marriage can face. Many couples do recover, but it takes time and support." },
      { h: "The early weeks", p: "Shock, anger and grief are normal. A counselor can help you both slow down, avoid big decisions in the first days, and create some stability." },
      { h: "Understanding what happened", p: "With support, couples explore how the affair happened and what was going on in the marriage, without excusing it. The partner who was unfaithful is usually asked to answer questions honestly and take responsibility." },
      { h: "Forgiveness without pretending", p: "For many Christian couples, forgiveness matters deeply. Forgiveness is not the same as forgetting or as trust being restored overnight. A good counselor will not pressure the hurt partner to forgive on a timetable." },
      { h: "Rebuilding", p: "Trust grows through consistent transparency and new patterns over months. Couples often find their marriage becomes more honest than before." },
      { h: "If you are in crisis", p: "If either of you feels unsafe or is thinking about suicide, call or text 988, or call 911 in an emergency." },
    ],
  },
  {
    slug: "signs-your-marriage-needs-counseling", image: unsplash("1539541417736-3d44c90da315", "A person resting their head on another person's shoulder for comfort"), title: "Signs Your Marriage Could Benefit From Counseling", category: "Marriage health", readMinutes: 5,
    excerpt: "You don't need to be in crisis. Common signs it may be time to talk to a counselor together.", publishedOn: "2026-04-09", author: AUTHOR,
    relatedSpecialties: ["christian-marriage-counseling", "christian-intimacy-counseling"],
    body: [
      { p: "Every marriage goes through hard seasons. Counseling often helps most when couples reach out early, before patterns become entrenched." },
      { h: "Common signs", p: "The same arguments keep coming back. You feel more like roommates than partners. Important topics are avoided. Trust has been damaged. One of you has mentioned separation. A big change, such as a new baby or a loss, has left you disconnected." },
      { h: "When you're not in crisis", p: "Many couples come to counseling simply to strengthen a good marriage, prepare for a new season, or grow closer spiritually." },
      { h: "If only one of you is ready", p: "You can start on your own. Changes in how one partner responds can shift the whole relationship, and the other may join later." },
      { h: "Getting help now", p: "If you ever feel unsafe at home, contact the National Domestic Violence Hotline at 1-800-799-7233. In an emergency, call 911." },
    ],
  },
  {
    slug: "sex-therapy-for-christian-couples", image: unsplash("1539541417736-3d44c90da315", "A person resting their head on another person's shoulder for comfort"),
    title: "Sex Therapy for Christian Married Couples: What It Is and How It Helps", category: "Intimacy", readMinutes: 6,
    seoTitle: "Sex Therapy for Christian Couples: A Faith-Respecting Guide",
    keywords: ["sex therapy for christian couples", "sex therapy for christian married couples", "christian sex therapist"],
    excerpt: "Sex therapy is talk therapy, never anything physical. Here is what it involves for Christian couples, who provides it, and how to find someone who respects your faith.", publishedOn: "2026-09-24", author: AUTHOR,
    relatedSpecialties: ["christian-intimacy-counseling", "christian-marriage-counseling"],
    body: [
      { p: "Many Christian couples struggle with physical intimacy and feel unsure where to turn. Some worry that a therapist will dismiss their beliefs; others feel embarrassed raising the subject at all. Sex therapy for Christian married couples can be a safe, respectful place to talk about it." },
      { h: "What sex therapy actually is", p: "Sex therapy is a form of talk therapy. Sessions are conversations, and there is never any physical contact or undressing. A therapist helps you understand what is getting in the way, then suggests gentle exercises for you to try privately at home, at a pace you both agree to." },
      { h: "Common reasons couples go", p: "Mismatched desire, pain during sex, difficulty with arousal or orgasm, anxiety or shame carried from purity teaching, the effects of pornography, past trauma, or simply years of distance. Many couples come because they want sex to feel connected again, not because something is wrong." },
      { h: "How faith fits in", p: "A faith-respecting therapist will ask what your beliefs mean for you as a couple and work within them. For many Christians, sex is a gift within marriage, and therapy can help you enjoy it without guilt. You choose how much prayer or scripture you want in the room." },
      { h: "Who provides it", p: "Look for a licensed clinician, such as a marriage and family therapist or psychologist, with specific training in sexual issues. Some are certified by AASECT, the main US certifying body for sex therapists. Ask how they work with religious couples before you book." },
      { h: "When to see a doctor too", p: "Pain, erectile difficulties and sudden changes in desire can have medical causes, including hormones and medication. A good therapist will suggest a check-up alongside therapy rather than instead of it." },
      { h: "Getting started", p: "Many couples begin with general intimacy counseling and add specialist help if needed. You can browse counselors who focus on intimacy and emotional connection, in person or online, and ask in a first call how they approach faith and sexuality." },
    ],
  },
  {
    slug: "christian-couples-therapy-retreats-and-intensives", image: unsplash("1511632765486-a01980e01a18", "Four people with arms around each other's shoulders, watching a sunset"),
    title: "Christian Couples Therapy Retreats and Intensives: Are They Right for You?", category: "Counseling approaches", readMinutes: 5,
    seoTitle: "Christian Couples Therapy Retreats & Intensives: What to Expect",
    keywords: ["christian couples therapy retreat", "christian marriage intensive", "christian couples retreat"],
    excerpt: "Retreats and marriage intensives pack many hours of couples therapy into a few days. What they involve, how they compare with weekly sessions, and questions to ask first.", publishedOn: "2026-09-06", author: AUTHOR,
    relatedSpecialties: ["christian-marriage-counseling", "christian-marriage-reconciliation"],
    body: [
      { p: "Weekly sessions are not the only way to do couples therapy. Some couples choose a retreat or marriage intensive: several days of focused work away from the pressures of home. Here is what to know before booking one." },
      { h: "Retreat or intensive: what's the difference?", p: "A Christian marriage retreat is usually a group event run by a church or ministry, with talks, worship and couple exercises. It can be refreshing but is not therapy. A couples therapy intensive is private: one couple works with a licensed therapist for 10 to 20 hours over two to four days." },
      { h: "Who intensives can help", p: "Intensives are often chosen after an affair, when divorce is on the table, or when weekly sessions have stalled. They can also suit couples who live far from a counselor or whose schedules make weekly appointments hard." },
      { h: "Things to weigh", p: "Intensives cost more up front, often several thousand dollars, and are rarely covered by insurance. They can be emotionally draining, so plan rest afterwards. Most good programs include follow-up sessions, because lasting change needs practice at home." },
      { h: "Questions to ask a provider", p: "Who leads the sessions, and are they licensed? Which approach do they use, such as the Gottman Method or emotionally focused therapy? How is faith included? What happens if one partner wants to stop? Is there support after the intensive ends?" },
      { h: "When an intensive isn't the right fit", p: "If there is violence, threats or fear in your relationship, couples therapy of any kind may not be safe. Contact the National Domestic Violence Hotline at 1-800-799-7233 for confidential advice." },
    ],
  },
  {
    slug: "christian-couples-therapy-books", image: unsplash("1594100513700-659fa01ce822", "An open Bible and a notebook with a pen on a wooden table surrounded by houseplants"),
    title: "Books Christian Couples Often Read Alongside Therapy", category: "Faith & marriage", readMinutes: 5,
    seoTitle: "Christian Couples Therapy Books: A Reading List for Your Marriage",
    keywords: ["christian couples therapy books", "christian marriage books", "books for christian couples"],
    excerpt: "A short, honest reading list for Christian couples: faith-based marriage books and research-based couples therapy books, and how to use them well.", publishedOn: "2026-08-22", author: AUTHOR,
    relatedSpecialties: ["christian-marriage-counseling", "christian-couples-communication"],
    body: [
      { p: "Books will not replace couples therapy, but reading together can give you shared language and something to talk about between sessions. These are widely read titles; we have no affiliation with any author or publisher." },
      { h: "Faith-centered books on marriage", p: "The Meaning of Marriage by Timothy and Kathy Keller explores marriage through a Christian lens. Sacred Marriage by Gary Thomas asks how marriage can shape your faith. Boundaries in Marriage by Henry Cloud and John Townsend looks at responsibility and respect between spouses." },
      { h: "Books based on couples therapy research", p: "Created for Connection by Sue Johnson and Kenneth Sanderfer brings emotionally focused therapy to Christian couples. The Seven Principles for Making Marriage Work by John Gottman and Nan Silver draws on decades of research with couples. Hold Me Tight by Sue Johnson explains attachment in everyday language." },
      { h: "On communication and love", p: "The 5 Love Languages by Gary Chapman remains popular for talking about how each of you gives and receives love. Use it as a starting point for conversation rather than a label." },
      { h: "Using books well", p: "Read a chapter each and talk about one idea, rather than using books to prove a point. If a book stirs up strong feelings or disagreement, bring it to your counselor. Be cautious with any book that excuses control or harm in the name of faith." },
      { h: "When reading isn't enough", p: "If the same arguments keep coming back, or one of you feels hopeless, it is a good time to talk with a counselor. You can find Christian couples therapy near you or online through this directory." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
