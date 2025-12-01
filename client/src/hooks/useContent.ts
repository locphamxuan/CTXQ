import { useEffect, useState } from 'react';
import {
  fetchAbout,
  fetchBlog,
  fetchDomains,
  fetchHome
} from '../services/api';
import type {
  AboutContent,
  BlogPost,
  BusinessDomain,
  HeroContent,
  MissionContent,
  NewsItem
} from '../types/content';
import {
  aboutContent as aboutFallback,
  blogPosts as blogFallback,
  businessDomains as domainFallback,
  heroContent as heroFallback,
  missionContent as missionFallback,
  newsHighlights as newsFallback
} from '../data/mockContent';

export function useHomeContent() {
  const [hero, setHero] = useState<HeroContent>(heroFallback);
  const [mission, setMission] = useState<MissionContent>(missionFallback);
  const [news, setNews] = useState<NewsItem[]>(newsFallback);

  useEffect(() => {
    fetchHome().then(({ hero, mission, news }) => {
      setHero(hero);
      setMission(mission);
      setNews(news);
    });
  }, []);

  return { hero, mission, news };
}

export function useAboutContent() {
  const [about, setAbout] = useState<AboutContent>(aboutFallback);

  useEffect(() => {
    fetchAbout().then(setAbout);
  }, []);

  return about;
}

export function useDomains() {
  const [domains, setDomains] = useState<BusinessDomain[]>(domainFallback);

  useEffect(() => {
    fetchDomains().then(setDomains);
  }, []);

  return domains;
}

export function useBlog(category?: string) {
  const [posts, setPosts] = useState<BlogPost[]>(blogFallback);

  useEffect(() => {
    fetchBlog(category).then(setPosts);
  }, [category]);

  return posts;
}

