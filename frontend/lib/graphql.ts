/**
 * WPGraphQL 클라이언트 설정
 */

const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL || "http://localhost:8000/graphql";

export interface WPGraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

/**
 * WPGraphQL 쿼리 실행 함수
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<WPGraphQLResponse<T>> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }, // ISR: 60초마다 재생성
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
    }

    return result;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    return {
      data: null as T,
      errors: [
        {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      ],
    };
  }
}
