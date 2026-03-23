import resumeText from "../Jsons/resume.json";
import "../styling/resume.css";
import { useRef, useEffect } from "react";

export default function Resume() {
  const scrollRef = useRef(null);

  useEffect(() => {
    function handleWheel(e) {
      const el = scrollRef.current;
      if (!el) return;

      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) return;

      const scrollAmount = e.deltaY * 0.8; // tweak speed

      el.scrollTop += scrollAmount; // instant, not smooth
      e.preventDefault();
    }

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="container">
      <div className="resume-page">
        <h1 className="resume-header">RESUME</h1>
        <div className="content" ref={scrollRef}>
          {resumeText.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="Section">
              <h2>{section.title}</h2>

              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="Item">
                  {item.heading && <h3>{item.heading}</h3>}
                  {item.subheading && <p>{item.subheading}</p>}
                  {item.date && <p className="Date">{item.date}</p>}

                  {item.details && (
                    <div>
                      {item.details.map((detail, detailIndex) => (
                        <p key={detailIndex}>{detail}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
