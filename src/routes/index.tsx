import { createFileRoute } from "@tanstack/react-router";
import { MenuPage } from "@/components/menu-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "برجر مشوي | قائمة الطعام" },
      { name: "description", content: "اطلب أفضل البرجر المشوي، الوجبات، التورتيلا والمقبلات الطازجة من برجر مشوي." },
      { property: "og:title", content: "برجر مشوي | قائمة الطعام" },
      { property: "og:description", content: "برجر مشوي على أصوله، محضر طازجاً عند الطلب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});
