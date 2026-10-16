import type { Specialty } from "@/types";

/** Christian couple relationship therapy, split into the areas couples most often look for. */
export const specialties: Specialty[] = [
  { slug: "christian-marriage-counseling", name: "Marriage Counseling", icon: "heart", summary: "Faith-integrated counseling to strengthen and heal your marriage.",
    description: "Marriage counseling here combines established, evidence-based couples therapy with a Christian faith perspective, for couples who want their beliefs to be part of the work. How much faith is included, such as prayer, scripture or simply shared values, is always your choice as a couple.",
    signs: ["You feel more like roommates than partners", "The same arguments keep coming back", "You want your faith to be welcome in counseling", "You want to invest in your marriage before problems grow"],
    faqs: [
      { q: "What is Christian marriage counseling?", a: "Couples therapy that integrates Christian faith with established methods such as emotionally focused therapy or the Gottman Method. Sessions can include prayer or scripture if you both want them, but they don't have to." },
      { q: "Are Christian marriage counselors licensed?", a: "Some are licensed clinicians, such as marriage and family therapists or professional counselors, who integrate faith at your request. Some pastoral or biblical counselors are not state-licensed. Ask about licensure and verify it with your state board." },
      { q: "Do we both have to be Christians?", a: "No. Many Christian counselors work with couples at different stages of faith, including when one partner believes and the other doesn't, or when either of you has questions or doubts." },
    ] },
  { slug: "christian-premarital-counseling", name: "Premarital Counseling", icon: "sprout", summary: "Preparing engaged couples for a strong, Christ-centered marriage.",
    description: "Premarital counseling helps engaged and seriously dating couples talk through expectations before the wedding: communication, money, family of origin, intimacy, roles and faith. Many counselors use a structured assessment such as PREPARE/ENRICH to guide the conversation.",
    signs: ["You're engaged or planning to marry", "Your church or pastor recommends premarital counseling", "You want to talk through money, family and roles", "You come from different backgrounds or traditions"],
    faqs: [
      { q: "How many premarital sessions are typical?", a: "Many couples meet for 5–8 sessions over a couple of months. Some counselors also offer a weekend intensive or a single assessment-and-feedback session." },
      { q: "Is premarital counseling only for couples with problems?", a: "No. It's preventive. Most couples who attend are happy and simply want a strong foundation and good habits before marriage." },
      { q: "What is PREPARE/ENRICH?", a: "A widely used online relationship assessment. Each partner answers separately, and a trained facilitator walks you through your strengths and growth areas together." },
    ] },
  { slug: "christian-couples-communication", name: "Communication & Conflict", icon: "users", summary: "Breaking negative cycles and learning to talk and listen well.",
    description: "Counseling for communication and conflict helps couples spot the patterns that turn small disagreements into big fights, calm things down, and speak and listen with grace. It draws on research-based tools from approaches such as the Gottman Method and emotionally focused therapy.",
    signs: ["Repeating the same arguments", "Conversations escalate quickly or shut down", "One of you pursues while the other withdraws", "You avoid hard topics to keep the peace"],
    faqs: [
      { q: "Can counseling really change how we argue?", a: "Often, yes. Couples learn to recognise their cycle, take breaks before things escalate, and repair afterwards. Change usually comes from practising small skills between sessions." },
      { q: "What if only one of us wants to come?", a: "You can start on your own. Changing how one partner responds often shifts the whole pattern, and the other partner may join later." },
      { q: "Is it normal for Christian couples to fight?", a: "Yes. Conflict is part of every close relationship. The goal isn't to never disagree, but to disagree in a way that protects your connection." },
    ] },
  { slug: "christian-affair-recovery", name: "Infidelity & Trust Repair", icon: "shield", summary: "Healing and rebuilding trust after an affair or betrayal.",
    description: "Affair recovery counseling gives both partners a structured, safe place to deal with the shock of betrayal, understand what happened, and decide together whether and how to rebuild. Forgiveness is honoured as part of faith, but never rushed or demanded.",
    signs: ["An affair or emotional affair has come to light", "Pornography or secrecy has damaged trust", "You're unsure whether the marriage can recover", "Forgiveness feels expected but impossible right now"],
    faqs: [
      { q: "Can a marriage survive infidelity?", a: "Many marriages do, especially when both partners commit to the process. Recovery usually takes many months and moves through stages of crisis, understanding and rebuilding." },
      { q: "Does forgiving mean pretending it didn't happen?", a: "No. A good counselor will help you understand forgiveness in a way that is honest about the hurt and doesn't skip the work of rebuilding trust." },
      { q: "Should we tell our church?", a: "That's your decision. A counselor can help you think through who to involve, how much to share, and how to protect your privacy." },
    ] },
  { slug: "christian-intimacy-counseling", name: "Intimacy & Emotional Connection", icon: "flame", summary: "Rekindling closeness, affection and physical intimacy.",
    description: "Intimacy counseling helps couples rebuild emotional closeness and work through differences in desire, past hurts, or beliefs about sexuality, in a setting that respects your faith and values.",
    signs: ["Feeling emotionally distant or lonely in your marriage", "Mismatched desire or long dry spells", "Shame or anxiety around physical intimacy", "Little time or energy left for each other"],
    faqs: [
      { q: "Is it appropriate to discuss sex with a Christian counselor?", a: "Yes. Christian counselors are trained to discuss physical intimacy respectfully and in a way that fits your values. You choose what you're comfortable talking about." },
      { q: "We're not in crisis, just distant. Is counseling for us?", a: "Yes. Many couples come in because the spark has faded under work, children and stress, and they want to reconnect before distance grows." },
      { q: "What if there's a medical cause?", a: "Your counselor may suggest seeing a doctor alongside counseling, since health, medication and hormones can affect intimacy." },
    ] },
  { slug: "christian-marriage-reconciliation", name: "Separation & Reconciliation", icon: "repeat", summary: "Support when divorce is on the table or you're living apart.",
    description: "Reconciliation counseling helps couples who are separated, considering divorce, or where one partner is leaning out. It gives you space to slow down, get clear and decide on next steps prayerfully rather than in crisis.",
    signs: ["One or both of you has mentioned divorce", "You're separated and unsure what comes next", "One partner wants to work on it and the other doesn't", "You feel you've tried everything"],
    faqs: [
      { q: "Is it too late for counseling?", a: "Not necessarily. Some couples reconcile even after separating. Discernment counseling can help you decide whether to try full couples therapy." },
      { q: "What is discernment counseling?", a: "A short process, often 1–5 sessions, for couples where one partner is leaning out. The aim is clarity and confidence about the direction to take, not to force a decision." },
      { q: "What if there is abuse in the relationship?", a: "Safety comes first. Joint couples counseling is usually not recommended where there is abuse. Contact the National Domestic Violence Hotline at 1-800-799-7233, or call 911 in an emergency." },
    ] },
  { slug: "christian-couples-life-transitions", name: "Seasons of Marriage", icon: "compass", summary: "New baby, blended family, empty nest, loss: changing seasons together.",
    description: "Big changes put pressure on even strong marriages. Counseling for life's seasons helps couples adjust together, whether to newlywed life, becoming parents, a blended family, a move, illness, grief or an empty nest.",
    signs: ["A new baby has changed everything", "Blending families has brought tension", "Grief, illness or job loss is straining your marriage", "The kids have left and you feel like strangers"],
    faqs: [
      { q: "Why do life changes cause so much conflict?", a: "Transitions change roles, routines and energy all at once. Couples often need new ways of supporting each other, and counseling helps you find them deliberately." },
      { q: "Do you work with blended families?", a: "Many counselors in this area do. The focus is usually on keeping your marriage strong while you navigate step-parenting and co-parenting together." },
      { q: "Can we come during a crisis like illness or loss?", a: "Yes. Counseling can give you a steady place to grieve and lean on each other instead of pulling apart." },
    ] },
  { slug: "faith-and-spiritual-connection", name: "Faith Differences & Spiritual Connection", icon: "cross", summary: "Growing together spiritually, even when you see faith differently.",
    description: "Some couples share a faith but struggle to grow in it together. Others differ in belief, denomination or commitment. This counseling helps you honour each other's convictions and build shared spiritual practices that fit your marriage.",
    signs: ["One of you has a stronger faith than the other", "Different denominations or traditions cause friction", "You'd like to pray or worship together but it feels awkward", "One partner is going through doubt"],
    faqs: [
      { q: "Can a counselor help if one of us isn't a Christian?", a: "Yes. A good counselor respects both partners equally and helps you find ways to honour each other's beliefs without pressure." },
      { q: "Will the counselor take sides on theology?", a: "They shouldn't. The counselor's role is to help you understand each other and decide together, not to settle doctrinal questions." },
      { q: "How can we build spiritual connection?", a: "Couples often start small, such as praying briefly together, reading a devotional, or talking about what faith means to each of you, and grow from there." },
    ] },
];

export const getSpecialty = (slug: string) => specialties.find((s) => s.slug === slug);
