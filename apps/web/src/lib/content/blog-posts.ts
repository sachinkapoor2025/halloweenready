export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  sections: { heading?: string; paragraphs: string[] }[];
  relatedCategory?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "halloween-costume-guide-2026",
    title: "Halloween Costume Guide 2026 — Adult & Kids Ideas",
    description:
      "Top Halloween costume trends for 2026. Adult, teen, and kids costume ideas with fast USA delivery from HalloweenReady.",
    excerpt: "Planning your Halloween look? Here are the best costume ideas for the whole family.",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-15",
    image: "/banners/bannerpage1.png",
    relatedCategory: "costumesandaccessories",
    sections: [
      {
        paragraphs: [
          "Halloween 2026 is October 31 — and costume shopping starts early when you want the best selection. HalloweenReady ships premium adult, teen, and kids costumes across all 50 US states with 2–5 day domestic delivery.",
          "Classic horror never goes out of style: vampires, witches, skeletons, and zombies remain top picks. Pop culture costumes — trending characters from movies and games — sell out fast, so order by mid-October.",
        ],
      },
      {
        heading: "Popular costume categories",
        paragraphs: [
          "Adult costumes — full sets with accessories for parties and haunted events.",
          "Kids costumes — comfortable, safe designs for trick-or-treat night.",
          "Couple & group costumes — coordinate with friends for maximum impact.",
        ],
      },
    ],
  },
  {
    slug: "haunt-your-yard-halloween-decor",
    title: "How to Haunt Your Yard — Halloween Decor Ideas",
    description:
      "Transform your front yard with inflatables, LED pumpkins, fog machines, and skeleton props. Shop decor at HalloweenReady.",
    excerpt: "Create a spooky display neighbors will remember — indoor and outdoor decor tips.",
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    image: "/banners/bannerpage2.png",
    relatedCategory: "home-decoration",
    sections: [
      {
        paragraphs: [
          "A great Halloween display starts with a focal point — an inflatable ghost, graveyard arch, or giant spider. Add LED string lights and pathway markers for evening impact.",
          "Fog machines and strobe lights elevate the atmosphere. Keep electrical cords weather-safe and follow local guidelines for yard displays.",
        ],
      },
    ],
  },
  {
    slug: "trick-or-treat-candy-guide",
    title: "Trick-or-Treat Candy Guide — Bulk Buying Tips",
    description:
      "How much candy to buy, best bulk assortments, and treat bag ideas for Halloween night. Fast USA shipping from HalloweenReady.",
    excerpt: "Stock up on candy before October 31 with our bulk buying guide.",
    publishedAt: "2026-09-12",
    updatedAt: "2026-09-12",
    image: "/banners/bannerpage1.png",
    relatedCategory: "partysupplier",
    sections: [
      {
        paragraphs: [
          "Plan for 2–3 pieces per trick-or-treater. A busy neighborhood may need 300–500 pieces — bulk assortments save money and time.",
          "Mix chocolate bars, gummies, and nut-free options for allergy-conscious families. Order by October 25 for guaranteed pre-Halloween delivery.",
        ],
      },
    ],
  },
  {
    slug: "halloween-party-planning-checklist",
    title: "Halloween Party Planning Checklist 2026",
    description:
      "Complete checklist for hosting a Halloween party — costumes, decor, candy, plates, and accessories. Shop everything at HalloweenReady.",
    excerpt: "Host the ultimate Halloween bash with our party planning checklist.",
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-18",
    image: "/banners/bannerpage2.png",
    relatedCategory: "partysupplier",
    sections: [
      {
        paragraphs: [
          "Set the date, send invites, and pick a theme — classic horror, masquerade, or family-friendly fun.",
          "Stock party supplies: orange and black plates, cups, banners, and balloons. Add a costume contest and themed playlist for extra fun.",
        ],
      },
    ],
  },
  {
    slug: "last-minute-halloween-costume-ideas",
    title: "Last-Minute Halloween Costume Ideas — Fast USA Delivery",
    description:
      "Need a costume fast? Last-minute Halloween costume ideas with express shipping to major US cities from HalloweenReady.",
    excerpt: "Running out of time? These quick costume ideas ship fast across the USA.",
    publishedAt: "2026-10-01",
    updatedAt: "2026-10-01",
    image: "/banners/bannerpage1.png",
    relatedCategory: "costumesandaccessories",
    sections: [
      {
        paragraphs: [
          "Accessories can transform everyday clothes — add a witch hat, cape, or makeup kit to create a complete look in minutes.",
          "Order by October 25 for guaranteed delivery before Halloween. Express shipping reaches major metros in 2–3 business days.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function listAllBlogPosts() { return blogPosts; }
