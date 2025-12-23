import api from './baseApi';
import {
  heroContent as heroFallback,
  missionContent as missionFallback,
  newsHighlights as newsFallback,
  aboutContent as aboutFallback,
  businessDomains as domainFallback,
  blogPosts as blogFallback
} from '../data/mockContent';
import type {
  AboutContent,
  AuthResponse,
  BlogPost,
  BusinessDomain,
  HeroContent,
  MissionContent,
  NewsItem
} from '../types/content';

type HomeResponse = {
  hero: HeroContent;
  mission: MissionContent;
  news: NewsItem[];
};

export async function fetchHome(): Promise<HomeResponse> {
  try {
    const { data } = await api.get<{ data: HomeResponse }>('/home');
    return data.data;
  } catch (err) {
    return { hero: heroFallback, mission: missionFallback, news: newsFallback };
  }
}

export async function fetchAbout(): Promise<AboutContent> {
  try {
    const { data } = await api.get<{ data: AboutContent }>('/about');
    return data.data;
  } catch (err) {
    return aboutFallback;
  }
}

export async function fetchDomains(): Promise<BusinessDomain[]> {
  try {
    const { data } = await api.get<{ data: BusinessDomain[] }>('/domains');
    return data.data;
  } catch (err) {
    return domainFallback;
  }
}

export async function fetchBlog(category?: string): Promise<BlogPost[]> {
  try {
    const { data } = await api.get<{ data: { posts: BlogPost[] } }>('/blog', {
      params: { category }
    });
    return data.data.posts;
  } catch (err) {
    return blogFallback.filter((post) =>
      category ? post.category === category : true
    );
  }
}

export async function submitContact(payload: {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return api.post('/contact', payload);
}

export async function register(payload: {
  username: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}): Promise<AuthResponse> {
  try {
    const response = await api.post<{ success: boolean; data: AuthResponse }>('/auth/register', payload);
    const { data } = response;
    
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error('Invalid response format');
  } catch (err: any) {
    // Đảm bảo error response được giữ nguyên để component xử lý
    if (err.response) {
      // Server trả về error response (422, 500, etc.)
      throw err;
    }
    // Network error hoặc lỗi khác
    throw err;
  }
}

export async function login(payload: {
  username: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    const response = await api.post<{ success: boolean; data: AuthResponse }>('/auth/login', payload);
    const { data } = response;
    
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error('Invalid response format');
  } catch (err: any) {
    // Đảm bảo error response được giữ nguyên để component xử lý
    if (err.response) {
      // Server trả về error response (401, 422, 500, etc.)
      throw err;
    }
    // Network error hoặc lỗi khác
    throw err;
  }
}

export async function checkout(payload: {
  userId: number;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  paymentMethod?: string;
  transactionCode?: string;
}) {
  try {
    const response = await api.post<{ success: boolean; data: { orderId: number; status: string; qrCode?: string } }>('/orders', payload);
    const { data } = response;
    
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error('Invalid response format');
  } catch (err: any) {
    throw err;
  }
}

export async function confirmPayment(orderId: number, transactionCode: string) {
  try {
    const response = await api.post<{ success: boolean; data: { orderId: number; status: string } }>('/orders/confirm', {
      orderId,
      transactionCode
    });
    const { data } = response;
    
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error('Invalid response format');
  } catch (err: any) {
    throw err;
  }
}

