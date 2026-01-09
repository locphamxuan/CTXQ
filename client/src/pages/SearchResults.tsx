import { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getGinsengProducts, getCosmeticsProducts } from '../utils/productLoader';
import SectionHeading from '../components/SectionHeading';

type SearchResult = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  type: 'ginseng' | 'cosmetics';
};

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const searchResults: SearchResult[] = [];
    const ginsengProducts = getGinsengProducts();
    const cosmeticsProducts = getCosmeticsProducts();

    // Search in ginseng products
    ginsengProducts.forEach((product) => {
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description.toLowerCase().includes(searchTerm);
      const matchesDetailed = product.detailedDescription.toLowerCase().includes(searchTerm);
      const matchesCategory = product.category.toLowerCase().includes(searchTerm);

      if (matchesName || matchesDescription || matchesDetailed || matchesCategory) {
        searchResults.push({
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          category: product.category,
          type: 'ginseng'
        });
      }
    });

    // Search in cosmetics products
    cosmeticsProducts.forEach((product) => {
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description.toLowerCase().includes(searchTerm);
      const matchesDetailed = product.detailedDescription.toLowerCase().includes(searchTerm);
      const matchesCategory = product.category.toLowerCase().includes(searchTerm);

      if (matchesName || matchesDescription || matchesDetailed || matchesCategory) {
        searchResults.push({
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          category: product.category,
          type: 'cosmetics'
        });
      }
    });

    return searchResults;
  }, [query]);

  const handleProductClick = (result: SearchResult) => {
    if (result.type === 'ginseng') {
      navigate(`/san-pham/nhan-sam-han-quoc/${result.id}`);
    } else {
      navigate(`/san-pham/my-pham-kbeauty/${result.id}`);
    }
  };

  return (
    <div className="product-page">
      <SectionHeading
        eyebrow="Tìm kiếm"
        title={query ? `Kết quả tìm kiếm: "${query}"` : 'Tìm kiếm sản phẩm'}
        description={query ? `Tìm thấy ${results.length} sản phẩm` : 'Nhập từ khóa để tìm kiếm sản phẩm'}
        align="center"
      />

      {query && results.length === 0 ? (
        <div className="search__no-results">
          <p>Không tìm thấy sản phẩm nào với từ khóa "{query}"</p>
          <p>Vui lòng thử lại với từ khóa khác.</p>
        </div>
      ) : (
        <div className="product-grid">
          {results.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              className="product-card"
              onClick={() => handleProductClick(result)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-card__image">
                <img
                  src={result.image}
                  alt={result.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="product-card__content">
                <div className="product-card__badge" style={{ position: 'relative', top: 0, right: 0, marginBottom: '0.5rem' }}>
                  {result.type === 'ginseng' ? 'Nhân sâm' : 'Mỹ phẩm'}
                </div>
                <h3 className="product-card__name">{result.name}</h3>
                <p className="product-card__description">{result.description}</p>
                <div className="product-card__footer">
                  <button
                    className="product-card__detail-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(result);
                    }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

