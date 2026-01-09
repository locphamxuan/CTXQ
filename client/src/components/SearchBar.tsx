import { useState, useMemo, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ginsengProducts, type GinsengProduct } from '../data/ginsengProducts';
import { cosmeticsProducts, type CosmeticsProduct } from '../data/cosmeticsProducts';

type SearchSuggestion = {
  id: string;
  name: string;
  type: 'ginseng' | 'cosmetics';
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Tìm kiếm real-time
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      return [];
    }

    const searchTerm = searchQuery.toLowerCase().trim();
    const results: SearchSuggestion[] = [];

    // Tìm trong sản phẩm sâm
    ginsengProducts.forEach((product: GinsengProduct) => {
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description.toLowerCase().includes(searchTerm);
      const matchesCategory = product.category.toLowerCase().includes(searchTerm);

      if (matchesName || matchesDescription || matchesCategory) {
        results.push({
          id: product.id,
          name: product.name,
          type: 'ginseng'
        });
      }
    });

    // Tìm trong sản phẩm mỹ phẩm
    cosmeticsProducts.forEach((product: CosmeticsProduct) => {
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description.toLowerCase().includes(searchTerm);
      const matchesCategory = product.category.toLowerCase().includes(searchTerm);

      if (matchesName || matchesDescription || matchesCategory) {
        results.push({
          id: product.id,
          name: product.name,
          type: 'cosmetics'
        });
      }
    });

    // Giới hạn 8 kết quả đầu tiên
    return results.slice(0, 8);
  }, [searchQuery]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsDropdownOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(e.target.value.trim().length >= 2);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'ginseng') {
      navigate(`/san-pham/nhan-sam-han-quoc/${suggestion.id}`);
    } else {
      navigate(`/san-pham/my-pham-kbeauty/${suggestion.id}`);
    }
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsDropdownOpen(false);
    }
  };

  // Hàm highlight phần text trùng khớp
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) {
      return text;
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => {
          if (part.toLowerCase() === query.toLowerCase()) {
            return (
              <mark key={index} className="nav__search-highlight">
                {part}
              </mark>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <div className="nav__search-wrapper" ref={searchRef}>
      <form onSubmit={handleSubmit} className="nav__search">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchQuery.trim().length >= 2) {
              setIsDropdownOpen(true);
            }
          }}
          className="nav__search-input"
        />
        <button type="submit" className="nav__search-btn" aria-label="Tìm kiếm">
          🔍
        </button>
      </form>
      {isDropdownOpen && suggestions.length > 0 && (
        <div className="nav__search-dropdown">
          <ul className="nav__search-suggestions">
            {suggestions.map((suggestion) => (
              <li
                key={`${suggestion.type}-${suggestion.id}`}
                className="nav__search-suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="nav__search-suggestion-name">
                  {highlightText(suggestion.name, searchQuery)}
                </span>
                <span className="nav__search-suggestion-badge">
                  {suggestion.type === 'ginseng' ? 'Nhân sâm' : 'Mỹ phẩm'}
                </span>
              </li>
            ))}
          </ul>
          <button
            className="nav__search-view-all"
            onClick={handleViewAllResults}
          >
            Xem tất cả kết quả cho "{searchQuery}" →
          </button>
        </div>
      )}
    </div>
  );
}

