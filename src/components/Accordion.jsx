import { useState } from 'react';
import { motion as Motion } from 'framer-motion';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className="accordion-row" key={item.title}>
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className={`accordion-chevron ${isOpen ? 'accordion-chevron--open' : ''}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </span>
            </button>
            <Motion.div
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p className="accordion-content">{item.content}</p>
            </Motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
