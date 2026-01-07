import api from './baseApi';
import {
  businessDomains as domainFallback,
  blogPosts as blogFallback
} from '../data/mockContent';
import type {
  BlogPost,
  BusinessDomain
} from '../types/content';

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

export async function fetchBlogPost(id: string): Promise<BlogPost & { content?: string } | null> {
  try {
    const { data } = await api.get<{ data: BlogPost & { content?: string } }>(`/blog/${id}`);
    return data.data;
  } catch (err) {
    console.error('Error fetching blog post:', err);
    return null;
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

// Products API (public)
export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  imageUrl?: string | null;
  inventory: number;
  isFeatured: boolean;
  isPromotion: boolean;
  promotionPrice?: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export async function fetchProducts(params?: {
  category?: string;
  status?: string;
  featured?: boolean;
}): Promise<Product[]> {
  try {
    const { data } = await api.get<{ success: boolean; data: { products: Product[] } }>(
      '/products',
      { params }
    );
    return data.data.products;
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
}

export async function fetchProduct(id: number): Promise<Product | null> {
  try {
    const { data } = await api.get<{ success: boolean; data: Product }>(`/products/${id}`);
      return data.data;
  } catch (err) {
    console.error('Error fetching product:', err);
    return null;
  }
}

