import axios from 'axios';
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
  BlogPost,
  BusinessDomain,
  HeroContent,
  MissionContent,
  NewsItem
} from '../types/content';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 5000
});

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

