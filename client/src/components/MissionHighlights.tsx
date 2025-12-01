import type { MissionContent } from '../types/content';

type Props = {
  mission?: MissionContent;
};

export default function MissionHighlights({ mission }: Props) {
  if (!mission) return null;
  return (
    <section className="mission">
      <h3>Tầm nhìn – Sứ mệnh – Giá trị</h3>
      <p>{mission.mission}</p>
      <div className="mission__values">
        {mission.values.map((value) => (
          <article key={value.id}>
            <h4>{value.title}</h4>
            <p>{value.detail}</p>
          </article>
        ))}
      </div>
      <ul className="mission__diff">
        {mission.differentiators.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

