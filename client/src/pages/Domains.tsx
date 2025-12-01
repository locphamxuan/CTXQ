import DomainCard from '../components/DomainCard';
import SectionHeading from '../components/SectionHeading';
import { useDomains } from '../hooks/useContent';

export default function DomainsPage() {
  const domains = useDomains();

  return (
    <div className="domains">
      <SectionHeading
        eyebrow="Danh mục kinh doanh"
        title="Khai phá 3 trụ cột chiến lược"
        description="Từ sản phẩm tiêu dùng cao cấp đến dịch vụ tài chính chuyên sâu."
        align="center"
      />
      {domains.map((domain) => (
        <DomainCard key={domain.id} domain={domain} />
      ))}
    </div>
  );
}

