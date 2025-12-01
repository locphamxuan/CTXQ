import Hero from '../components/Hero';
import MissionHighlights from '../components/MissionHighlights';
import NewsTicker from '../components/NewsTicker';
import DomainCard from '../components/DomainCard';
import SectionHeading from '../components/SectionHeading';
import { useHomeContent, useDomains } from '../hooks/useContent';

export default function HomePage() {
  const { hero, mission, news } = useHomeContent();
  const domains = useDomains();

  return (
    <>
      <Hero content={hero} />
      <MissionHighlights mission={mission} />
      <section className="quick-links">
        <SectionHeading
          eyebrow="3 lĩnh vực lõi"
          title="Chuỗi dịch vụ khép kín"
          description="Kết nối từ sản phẩm tiêu dùng cao cấp đến giải pháp tài chính chuyên sâu."
          align="center"
        />
        <div className="quick-links__grid">
          {domains.map((domain) => (
            <div key={domain.id}>
              <h4>{domain.title}</h4>
              <p>{domain.summary}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="domains">
        <SectionHeading
          eyebrow="Danh mục"
          title="Giải pháp cho từng lĩnh vực"
          description="Mỗi khối kinh doanh có đội ngũ chuyên trách cùng hệ thống tri thức riêng."
          align="center"
        />
        {domains.map((domain) => (
          <DomainCard key={domain.id} domain={domain} />
        ))}
      </section>
      <NewsTicker items={news} />
    </>
  );
}

