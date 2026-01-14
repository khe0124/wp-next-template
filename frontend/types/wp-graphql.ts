/**
 * WPGraphQL 타입 정의
 */

export interface MediaItem {
  id: string;
  sourceUrl: string;
  altText?: string;
  mediaDetails?: {
    width?: number;
    height?: number;
  };
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar?: {
    url?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  databaseId: number;
  title: string;
  excerpt?: string;
  content: string;
  date: string;
  modified: string;
  slug: string;
  uri: string;
  featuredImage?: {
    node?: MediaItem;
  };
  author?: {
    node?: Author;
  };
  categories?: {
    nodes?: Category[];
  };
  tags?: {
    nodes?: Tag[];
  };
  seo?: {
    title?: string;
    metaDesc?: string;
    opengraphTitle?: string;
    opengraphDescription?: string;
    opengraphImage?: {
      sourceUrl?: string;
    };
  };
}

export interface PostsQueryResponse {
  posts: {
    nodes: Post[];
    pageInfo?: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
  };
}

export interface PostQueryResponse {
  post: Post | null;
}
