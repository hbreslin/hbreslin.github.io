import resumeText from "../Jsons/resume.json";
import "../styling/resume.css";

export default function Resume() {
  return (
    <div className="container">
      <h1 className="resume-header">RESUME</h1>
      <div className="content">
        {resumeText.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="Section">
            {/* Section Title */}
            <h2>{section.title}</h2>

            {/* Items in Section */}
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="Item">
                {/* Headings and Subheadings */}
                {item.heading && <h3>{item.heading}</h3>}
                {item.subheading && <p>{item.subheading}</p>}
                {item.date && <p className="Date">{item.date}</p>}

                {/* Details list */}
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
  );
}
