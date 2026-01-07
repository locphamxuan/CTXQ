import { useEffect, useState } from 'react';
import {
  fetchBlog,
  fetchDomains
} from '../services/api';
import type {
  BlogPost,
  BusinessDomain
} from '../types/content';
import {
  blogPosts as blogFallback,
  businessDomains as domainFallback
} from '../data/mockContent';

export function useDomains() {
  const [domains, setDomains] = useState<BusinessDomain[]>(domainFallback);

  useEffect(() => {
    fetchDomains().then(setDomains);
  }, []);

  return domains;
}

export function useBlog(category?: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlog(category)
      .then(setPosts)
      .catch((err) => {
        console.error('Error fetching blog:', err);
        setPosts(blogFallback.filter((post) =>
          category ? post.category === category : true
        ));
      });
  }, [category]);

  return posts;
}

