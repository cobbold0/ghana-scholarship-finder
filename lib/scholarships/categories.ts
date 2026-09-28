import { filterScholarships, filtersSchema, type Filters } from "./filter";
import { getScholarships, type Scholarship } from "./index";

export type Category = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  filters: Partial<Filters>;
  guideSlugs: string[];
};

// Categories with fewer listings than this are not published (no thin pages).
export const MIN_CATEGORY_SIZE = 3;

const CATEGORIES: Category[] = [
  {
    slug: "undergraduate",
    title: "Undergraduate scholarships for Ghanaian students",
    description: "Scholarships for first-degree (bachelor's) study that Ghanaian students can apply for, in Ghana and abroad.",
    intro:
      "These scholarships support bachelor's degree study. Most are aimed at students completing or recently finished with WASSCE or an equivalent qualification. Check each listing for academic, financial-need and nationality requirements.",
    filters: { level: "undergraduate" },
    guideSlugs: ["scholarship-application-documents", "personal-statement"],
  },
  {
    slug: "postgraduate",
    title: "Postgraduate scholarships for Ghanaians",
    description: "Master's and PhD scholarships open to Ghanaian applicants, including UK, European and African programmes.",
    intro:
      "These scholarships fund master's and doctoral study. Many expect a strong first degree, and some also require work experience, a nomination from a national agency, or an admission offer from a university.",
    filters: { level: "postgraduate" },
    guideSlugs: ["how-to-apply", "personal-statement"],
  },
  {
    slug: "phd",
    title: "PhD scholarships for Ghanaians",
    description: "Doctoral scholarships open to Ghanaian applicants.",
    intro:
      "These scholarships include funding for doctoral (PhD) study. Doctoral applications often need a research proposal and early contact with a potential supervisor — read each provider's instructions carefully.",
    filters: { level: "phd" },
    guideSlugs: ["how-to-apply", "scholarship-application-documents"],
  },
  {
    slug: "fully-funded",
    title: "Fully funded scholarships for Ghanaian students",
    description: "Scholarships reported to cover tuition and living costs for Ghanaian students.",
    intro:
      "“Fully funded” usually means tuition plus a living allowance, but what is covered differs by provider. Always check the funding details on the official page — flights, visas and insurance are not always included.",
    filters: { funding: "full" },
    guideSlugs: ["how-to-find-scholarships-in-ghana", "how-to-apply"],
  },
  {
    slug: "study-in-ghana",
    title: "Scholarships to study in Ghana",
    description: "Scholarships for study at universities in Ghana.",
    intro: "These scholarships fund study at universities in Ghana.",
    filters: { location: "ghana" },
    guideSlugs: ["how-to-find-scholarships-in-ghana"],
  },
];

export function getCategoryScholarships(category: Category, list: Scholarship[] = getScholarships()): Scholarship[] {
  return filterScholarships(list, filtersSchema.parse(category.filters));
}

export function getCategories(list: Scholarship[] = getScholarships()): Category[] {
  return CATEGORIES.filter((c) => getCategoryScholarships(c, list).length >= MIN_CATEGORY_SIZE);
}

export function getCategory(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}
