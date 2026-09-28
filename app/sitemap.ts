import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { getScholarships } from "@/lib/scholarships";
import { getCategories } from "@/lib/scholarships/categories";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path}`;
  return [
    { url: url("/") },
    { url: url("/scholarships") },
    ...getScholarships().map((s) => ({ url: url(`/scholarships/${s.slug}`), lastModified: s.updatedAt })),
    { url: url("/categories") },
    ...getCategories().map((c) => ({ url: url(`/categories/${c.slug}`) })),
    { url: url("/guides") },
    ...guides.map((g) => ({ url: url(`/guides/${g.slug}`), lastModified: g.updatedAt })),
    { url: url("/about") },
  ];
}
