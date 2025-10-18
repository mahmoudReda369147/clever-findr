import axios from 'axios';
import { getUserData } from './auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const MAIN_URL = import.meta.env.VITE_MAIN_URL || process.env.MAIN_URL || 'http://localhost:5000/api';

/**
 * Generic API call function using axios
 * @param method - HTTP method (get, post, put, delete, etc.)
 * @param endpoint - API endpoint to call (without the base URL)
 * @param data - Optional data to send with the request
 * @param params - Optional URL parameters
 * @param headers - Optional additional headers
 * @returns Promise with the API response
 */
export const callApi = async (
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  endpoint: string,
  data?: any,
  params?: any,
  headers?: any
) => {
  const url = `${MAIN_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(errorMessage);
    }
    // Handle other errors
    throw error;
  }
};

/**
 * Call API with authentication token
 * @param method - HTTP method
 * @param endpoint - API endpoint
 * @param data - Optional data
 * @param params - Optional params
 * @returns Promise with API response
 */
export const callAuthApi = async (
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  endpoint: string,
  data?: any,
  params?: any
) => {
  const userData = getUserData();
  if (!userData || !userData.token) {
    throw new Error('Authentication required');
  }

  return callApi(
    method,
    endpoint,
    data,
    params,
    { Authorization: `Bearer ${userData.token}` }
  );
};

/**
 * Fetch user chats from the API
 * @returns Promise with chats data
 */
export const fetchChats = async () => {
  return callAuthApi('get', '/chats');
};

/**
 * Fetch messages for a specific chat
 * @param chatId - ID of the chat to fetch messages for
 * @returns Promise with messages data
 */
export const fetchMessages = async (chatId: string) => {
  return callAuthApi('get', `/messages/${chatId}`);
};

/**
 * Send a message to the API
 * @param content - Message content
 * @param chatId - Optional chat ID (if not provided, creates a new chat)
 * @param title - Optional title for new chat
 * @returns Promise with the API response
 */
export const sendMessage = async (content: string, chatId?: string, title?: string) => {
  const payload = {
    content,
    isNewChat: !chatId,
    ...(chatId && { chatId }),
    ...(title && { title })
  };
  
  return callAuthApi('post', '/messages/create', payload);
};

/**
 * React Query hook for fetching chats
 */
export const useChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: fetchChats,
  });
};

/**
 * React Query hook for fetching messages for a specific chat
 */
export const useMessages = (chatId: string | undefined) => {
  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => chatId ? fetchMessages(chatId) : Promise.resolve({ success: true, data: [] }),
    enabled: !!chatId,
  });
};

/**
 * React Query hook for sending messages
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ content, chatId, title }: { content: string; chatId?: string; title?: string }) => 
      sendMessage(content, chatId, title),
    onSuccess: (data, variables) => {
      // If we have a chatId, invalidate that specific chat's messages
      if (variables.chatId) {
        queryClient.invalidateQueries({ queryKey: ['messages', variables.chatId] });
      }
      
      // If this was a new chat (response contains a chatId), invalidate the chats list
      if (data.success && data.data && data.data.chatId) {
        queryClient.invalidateQueries({ queryKey: ['chats'] });
      }
    },
  });
};