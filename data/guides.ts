export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: GuideSection[];
  // Category pages this guide should link to.
  categorySlugs: string[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-find-scholarships-in-ghana",
    title: "How to find scholarships as a Ghanaian student",
    description:
      "Where genuine scholarships for Ghanaian students come from, how to check they are real, and how to plan your search around application cycles.",
    updatedAt: "2026-09-28",
    categorySlugs: ["fully-funded", "undergraduate", "postgraduate"],
    sections: [
      {
        heading: "Know the main sources",
        paragraphs: ["Most genuine scholarships open to Ghanaian students come from a few kinds of provider:"],
        list: [
          "Foreign governments (for example the UK, Hungary and other countries that run national scholarship schemes).",
          "Universities, in Ghana and abroad, which fund students directly or with partners.",
          "Foundations and trusts, such as the Mastercard Foundation, the Rhodes Trust and the Gates Cambridge Trust.",
          "International bodies such as the European Union's Erasmus+ programme.",
          "Ghanaian government and public bodies responsible for scholarships and nominations.",
        ],
      },
      {
        heading: "Always go to the official source",
        paragraphs: [
          "Blogs and social media posts are useful for discovering opportunities, but they often repeat old deadlines or get details wrong. Before you spend time on an application, open the provider's own website and confirm the current deadline, eligibility rules and application method.",
          "On this site, every listing links to the provider's official page and shows whether its details have been verified. If a listing is marked unverified, treat the details as a starting point only.",
        ],
      },
      {
        heading: "Watch out for scams",
        list: [
          "Genuine scholarships do not ask you to pay to be considered or to “release” an award.",
          "Be wary of messages saying you have won a scholarship you never applied for.",
          "Check that email addresses and websites belong to the real provider, not a look-alike domain.",
          "Never send passwords, bank PINs or mobile-money PINs to anyone.",
        ],
      },
      {
        heading: "Plan around application cycles",
        paragraphs: [
          "Most major scholarships open once a year and close months before the course starts. Many UK postgraduate awards close between October and January for study starting the following September or October. Start preparing documents, references and personal statements early — some require a university offer or a national nomination with its own earlier deadline.",
        ],
      },
      {
        heading: "Narrow your search",
        paragraphs: [
          "Decide your level of study, where you are willing to study, and whether you need full funding. Then use the filters in the scholarship directory to focus on opportunities that match, and save the ones you want to come back to.",
        ],
      },
    ],
  },
  {
    slug: "how-to-apply",
    title: "How to apply for a scholarship: a step-by-step guide",
    description:
      "A practical step-by-step process for applying to scholarships, from checking eligibility to submitting before the deadline.",
    updatedAt: "2026-09-28",
    categorySlugs: ["postgraduate", "undergraduate", "fully-funded"],
    sections: [
      {
        heading: "1. Confirm you are eligible",
        paragraphs: [
          "Read the official eligibility rules line by line: nationality, level of study, academic results, work experience, age limits and any requirement to return home after your studies. If you do not meet a hard requirement, move on — selection panels rarely make exceptions.",
        ],
      },
      {
        heading: "2. Note every deadline",
        paragraphs: [
          "Write down the scholarship deadline and any related deadlines: university admission, reference submission, and nominating-agency deadlines. Check the time zone. Aim to submit several days early, as portals can be slow near the deadline.",
        ],
      },
      {
        heading: "3. Understand how you apply",
        list: [
          "Directly to the scholarship provider (for example through an online portal).",
          "Through the university, as part of your admission application.",
          "Through a nominating agency in Ghana, which then forwards shortlisted candidates.",
          "A combination — some awards need both a scholarship application and a separate university offer.",
        ],
      },
      {
        heading: "4. Gather your documents",
        paragraphs: [
          "Start collecting transcripts, certificates, a valid passport and references early — these can take weeks. See our guide to scholarship application documents for a checklist.",
        ],
      },
      {
        heading: "5. Write strong essays",
        paragraphs: [
          "Answer the exact question asked, within the word limit. Use specific examples from your studies, work and community involvement, and explain how the scholarship connects to your plans. See our personal statement guide.",
        ],
      },
      {
        heading: "6. Review and submit",
        list: [
          "Check names and dates match your passport and certificates.",
          "Ask someone you trust to proofread your essays.",
          "Save a copy of everything you submit.",
          "Keep the confirmation email or reference number.",
        ],
      },
      {
        heading: "7. Prepare for interviews",
        paragraphs: [
          "Shortlisted candidates are often interviewed. Re-read your application, prepare clear examples of leadership and impact, and be ready to explain your study choice and future plans.",
        ],
      },
    ],
  },
  {
    slug: "scholarship-application-documents",
    title: "Documents you may need for a scholarship application",
    description:
      "A checklist of documents commonly requested by scholarship providers, and tips for preparing them in Ghana.",
    updatedAt: "2026-09-28",
    categorySlugs: ["undergraduate", "postgraduate", "phd"],
    sections: [
      {
        heading: "Check the official list first",
        paragraphs: [
          "Every scholarship sets its own document requirements. The list below covers documents that are commonly requested, but only the provider's official instructions tell you what you actually need.",
        ],
      },
      {
        heading: "Common documents",
        list: [
          "Valid passport (or national ID such as the Ghana Card, where accepted).",
          "Academic certificates and results slips — for example WASSCE results for undergraduate applications.",
          "Official university transcripts and degree certificate for postgraduate applications.",
          "Curriculum vitae (CV) or résumé.",
          "Personal statement, motivation letter or scholarship essays.",
          "Reference or recommendation letters from teachers, lecturers or employers.",
          "Proof of English language ability, where required.",
          "University admission or offer letter, where the scholarship requires it.",
          "Research proposal, for most PhD and some research master's applications.",
          "Evidence of financial need, for need-based scholarships.",
        ],
      },
      {
        heading: "Tips for preparing documents",
        list: [
          "Request transcripts and references early — institutions and referees need time.",
          "Make sure your name is spelled the same way on every document.",
          "Scan documents clearly in colour and name files sensibly (e.g. “Surname_Transcript.pdf”).",
          "Check file size and format limits on the application portal.",
          "If a document is not in English, check whether a certified translation is required.",
        ],
      },
    ],
  },
  {
    slug: "personal-statement",
    title: "How to write a scholarship personal statement",
    description:
      "How to plan and write a focused scholarship personal statement or essay that shows who you are and why you should be selected.",
    updatedAt: "2026-09-28",
    categorySlugs: ["postgraduate", "undergraduate"],
    sections: [
      {
        heading: "Answer the question that was asked",
        paragraphs: [
          "Many scholarships give specific essay prompts, such as leadership, networking, study plans or career goals. Structure your answer around each prompt and respect the word limit. A well-written essay that ignores the question will score poorly.",
        ],
      },
      {
        heading: "Plan before you write",
        list: [
          "List your strongest experiences: academic achievements, leadership roles, work, volunteering, challenges you have overcome.",
          "Pick the few that best match what the scholarship is looking for.",
          "Decide what you want the reader to remember about you.",
        ],
      },
      {
        heading: "Show, don't just tell",
        paragraphs: [
          "Instead of saying “I am a strong leader”, describe a situation you led, what you did, and the result. Specific numbers and outcomes are more convincing than general claims.",
        ],
      },
      {
        heading: "Connect your past, the course and your future",
        paragraphs: [
          "Explain why you chose this course or university, how it builds on what you have done, and what you will do with it afterwards — especially if the scholarship expects you to contribute to Ghana or your community after your studies.",
        ],
      },
      {
        heading: "Edit carefully",
        list: [
          "Use clear, simple sentences.",
          "Remove repetition and anything that does not support your main points.",
          "Ask a teacher, mentor or friend to read it and tell you what they remember.",
          "Write your own statement — copied or AI-generated essays can be detected and may lead to rejection.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
