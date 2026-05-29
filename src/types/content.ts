import type { ReactNode } from "react";

export type Navigate = (to: string) => void;

export type CategoryColor = "sage" | "mint" | "sky" | "peach" | "rose" | "butter";

export type GuideType = "guide" | "event" | "npc" | "tutorial" | "dlc" | "gardening" | "news" | "trivia";

export interface Category {
  id: string;
  number: string;
  icon: string;
  shortName: string;
  title: string;
  description: string;
  color: CategoryColor;
  tags: string[];
  sourceUrl: string;
}

export interface ArticleImage {
  src: string;
  alt: string;
  caption?: string;
}

export type ArticleContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "image";
      image: ArticleImage;
      size?: "normal" | "wide";
    }
  | {
      type: "gallery";
      images: ArticleImage[];
    }
  | {
      type: "note";
      title?: string;
      text: string;
    }
  | {
      type: "checklist";
      title?: string;
      items: string[];
    };

export interface ArticleSection {
  title: string;
  paragraphs?: string[];
  blocks?: ArticleContentBlock[];
}

export interface ArticleContentData {
  label: string;
  lead: string[];
  coverImage?: ArticleImage;
  body?: ArticleContentBlock[];
  alert?: {
    title: string;
    text: string;
  };
  sections: ArticleSection[];
  checklist?: {
    title: string;
    items: string[];
  };
  closing?: string;
}

export interface Guide {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  type: GuideType;
  tags: string[];
  updatedAt: string;
  sourceUrl: string;
  month?: string;
  featuredForNewPlayer?: boolean;
  isThisMonth?: boolean;
  articleContent?: ArticleContentData;
  note?: string;
  relatedIds: string[];
  status?: "core" | "reference" | "archive" | "exclude";
  priority?: 1 | 2 | 3 | 4 | 5;
  audience?: string[];
  imageCount?: number;
  postAuthor?: string;
  postedDate?: string;
  sourceExcerpt?: string;
  assetSummary?: string;
  subLinks?: GuideSubLink[];
}

export interface GuideSubLink {
  label: string;
  description?: string;
  url: string;
  sourceUrl?: string;
  kind?: "month" | "part" | "related";
}

export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
}

export interface NavigableProps {
  navigate: Navigate;
}

export interface ChildrenProps {
  children: ReactNode;
}
