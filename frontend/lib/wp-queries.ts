/**
 * WPGraphQL 쿼리 정의
 */

import { fetchGraphQL } from "./graphql";
import type { Post, PostsQueryResponse, PostQueryResponse } from "@/types/wp-graphql";

/**
 * 포스트 목록 조회 쿼리
 */
const POSTS_QUERY = `
  query GetPosts($first: Int, $after: String) {
    posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        title
        excerpt
        slug
        uri
        date
        modified
        featuredImage {
          node {
            id
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            id
            name
            slug
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/**
 * 단일 포스트 조회 쿼리
 */
const POST_QUERY = `
  query GetPost($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      id
      databaseId
      title
      excerpt
      content
      slug
      uri
      date
      modified
      featuredImage {
        node {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      author {
        node {
          id
          name
          slug
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

/**
 * 모든 포스트 ID 조회 쿼리 (generateStaticParams용)
 */
const ALL_POST_IDS_QUERY = `
  query GetAllPostIds {
    posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        databaseId
      }
    }
  }
`;

/**
 * 포스트 목록 가져오기
 */
export async function getPosts(first = 10, after?: string): Promise<Post[]> {
  const result = await fetchGraphQL<PostsQueryResponse>(POSTS_QUERY, {
    first,
    after,
  });

  if (result.errors || !result.data?.posts?.nodes) {
    return [];
  }

  return result.data.posts.nodes;
}

/**
 * 단일 포스트 가져오기
 */
export async function getPost(
  id: string,
  idType: "DATABASE_ID" | "SLUG" | "URI" = "DATABASE_ID"
): Promise<Post | null> {
  const result = await fetchGraphQL<PostQueryResponse>(POST_QUERY, {
    id,
    idType,
  });

  if (result.errors || !result.data?.post) {
    return null;
  }

  return result.data.post;
}

/**
 * 모든 포스트 ID 가져오기 (generateStaticParams용)
 */
export async function getAllPostIds(): Promise<number[]> {
  const result = await fetchGraphQL<{ posts: { nodes: { databaseId: number }[] } }>(
    ALL_POST_IDS_QUERY
  );

  if (result.errors || !result.data?.posts?.nodes) {
    return [];
  }

  return result.data.posts.nodes.map((post) => post.databaseId);
}
