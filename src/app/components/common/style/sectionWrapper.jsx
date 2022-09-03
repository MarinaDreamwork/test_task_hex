import style from './sectionWrapper.module.css';

const SectionWrapper = ({ children }) => {
  return (
    <section className={style.section_wrapper}>
      {children}
    </section>
  );
};

export default SectionWrapper;