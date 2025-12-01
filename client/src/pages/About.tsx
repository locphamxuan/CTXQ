import SectionHeading from '../components/SectionHeading';
import { useAboutContent } from '../hooks/useContent';

export default function AboutPage() {
  const about = useAboutContent();

  return (
    <div className="about">
      <SectionHeading
        eyebrow="Câu chuyện thương hiệu"
        title="Hành trình hơn một thập kỷ"
        description={about.story}
        align="center"
      />
      <section className="about__timeline">
        {about.timeline.map((item) => (
          <article key={item.year}>
            <h4>{item.year}</h4>
            <p>{item.event}</p>
          </article>
        ))}
      </section>
      <section className="about__vision">
        <div>
          <h3>Tầm nhìn</h3>
          <p>{about.vision}</p>
        </div>
        <div>
          <h3>Sứ mệnh</h3>
          <p>{about.mission}</p>
        </div>
      </section>
      <section className="about__values">
        {about.values.map((value) => (
          <article key={value.id}>
            <h4>{value.title}</h4>
            <p>{value.detail}</p>
          </article>
        ))}
      </section>
      <section className="about__team">
        <h3>Đội ngũ sáng lập</h3>
        <div className="about__team-grid">
          {about.founders.map((founder) => (
            <div key={founder.id}>
              <h4>{founder.name}</h4>
              <p>{founder.role}</p>
              <small>{founder.expertise}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

