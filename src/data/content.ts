import type { IconKey } from "@/components/ui/Icon";

// TODO(client): replace sample stats and testimonials with real figures.
export const stats = [
  { value: "24+", label: "SAP courses" },
  { value: "5,000+", label: "Learners trained" },
  { value: "92%", label: "Placement assistance success" },
  { value: "15+", label: "Years of trainer experience" },
];

export const features: { icon: IconKey; title: string; description: string }[] = [
  {
    icon: "award",
    title: "Certified SAP Trainers",
    description: "Learn from working consultants with 10–15+ years of real implementation experience.",
  },
  {
    icon: "monitor",
    title: "Live S/4HANA Access",
    description: "Practice every configuration on a real SAP server with 24×7 access during your course.",
  },
  {
    icon: "project",
    title: "Real-time Projects",
    description: "Work on end-to-end implementation scenarios that mirror what you'll do on the job.",
  },
  {
    icon: "briefcase",
    title: "Placement Support",
    description: "Resume building, mock interviews and referrals to our hiring partner network.",
  },
  {
    icon: "calendar",
    title: "Flexible Batches",
    description: "Weekday, weekend and fast-track batches, online or in our classroom.",
  },
  {
    icon: "headset",
    title: "Lifetime Support",
    description: "Recorded sessions, study material and doubt clearing even after you finish.",
  },
];

export const journey = [
  { step: "01", title: "Free Counselling", description: "Talk to an SAP mentor and pick the right module for your background and goals." },
  { step: "02", title: "Live Training", description: "Attend instructor-led sessions with hands-on practice on a live SAP system." },
  { step: "03", title: "Project & Certification", description: "Complete a real-time project and prepare for SAP global certification." },
  { step: "04", title: "Get Placed", description: "Mock interviews, resume polish and referrals to land your SAP role." },
];

export const testimonials = [
  {
    name: "Priya Ramesh",
    role: "SAP FICO Consultant",
    course: "SAP FICO",
    quote:
      "Coming from a B.Com background, I was nervous about SAP. The trainers explained every configuration with real business examples. I cleared my interview within a month of finishing.",
  },
  {
    name: "Karthik Subramanian",
    role: "ABAP Developer",
    course: "SAP ABAP",
    quote:
      "The hands-on assignments and live server access made all the difference. The RAP and CDS sessions gave me an edge in S/4HANA project interviews.",
  },
  {
    name: "Divya Narayanan",
    role: "SuccessFactors Consultant",
    course: "SAP SuccessFactors",
    quote:
      "Flexible weekend batches let me upskill while working in HR. The Employee Central project was exactly what my current client uses.",
  },
];

export const faqs = [
  {
    q: "I'm a fresher. Which SAP course should I choose?",
    a: "It depends on your background. Commerce graduates usually do well in FICO, engineering graduates in MM, PP or ABAP, and HR/MBA graduates in HCM or SuccessFactors. Book a free counselling session and we'll recommend the best fit.",
  },
  {
    q: "Do you provide SAP server access?",
    a: "Yes. Every learner gets access to a live SAP S/4HANA system for hands-on practice throughout the course.",
  },
  {
    q: "Are classes online or offline?",
    a: "Both. You can join live online classes from anywhere or attend classroom sessions. All sessions are recorded for revision.",
  },
  {
    q: "Will I get a certificate?",
    a: "You receive an ASAP Academy course completion certificate, and we also prepare you for the official SAP global certification exam.",
  },
  {
    q: "Do you offer placement assistance?",
    a: "Yes. We provide resume preparation, mock interviews, interview question banks and referrals to our network of hiring partners.",
  },
  {
    q: "Can I attend a demo class before enrolling?",
    a: "Absolutely. Fill in the enquiry form or call us to book a free demo session with the trainer.",
  },
];
