import { useApp } from '../../context/AppContext';

interface ProgramDef {
  num: string;
  titleKey: string;
  textKey: string;
  tags: string[];
}

const programs: ProgramDef[] = [
  {
    num: '01',
    titleKey: 'prog1.title',
    textKey: 'prog1.text',
    tags: ['Projects', 'Code', 'Practice'],
  },
  {
    num: '02',
    titleKey: 'prog2.title',
    textKey: 'prog2.text',
    tags: ['Review', 'Feedback', 'Mentor'],
  },
  {
    num: '03',
    titleKey: 'prog3.title',
    textKey: 'prog3.text',
    tags: ['Git', 'Agile', 'Team'],
  },
  {
    num: '04',
    titleKey: 'prog4.title',
    textKey: 'prog4.text',
    tags: ['CV', 'Interview', 'Career'],
  },
];

export default function Programs() {
  const { t } = useApp();

  return (
    <section className="section" id="programs">
      <div className="container">
        <div className="section-header">
          <span className="section-header__tag">{t('programs.tag')}</span>
          <h2 className="section-header__title" dangerouslySetInnerHTML={{ __html: t('programs.title') }} />
          <p className="section-header__subtitle">{t('programs.subtitle')}</p>
        </div>

        <div className="programs__grid">
          {programs.map((prog) => (
            <div className="program-item" key={prog.num} data-animate>
              <span className="program-item__num">{prog.num}</span>
              <div className="program-item__content">
                <h4>{t(prog.titleKey)}</h4>
                <p>{t(prog.textKey)}</p>
                <div className="program-item__tags">
                  {prog.tags.map((tag) => (
                    <span className="program-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
