import { useQuery } from '@tanstack/react-query';

// Example API function
const fetchData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Example query hook
export function usePostsQuery() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchData,
  });
}

// Example query hook with parameters
export function usePostQuery(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!postId, // Only run the query if postId is provided
  });
}