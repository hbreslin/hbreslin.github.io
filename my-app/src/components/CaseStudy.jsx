import { useEffect, useContext, useRef } from "react";
import { AppContext } from "../AppContext";
import projects from "../Jsons/projects.json";
import "../styling/Project.css";
import "../styling/caseStudy.css";
import { AnimatePresence, motion } from "framer-motion";

export default function CaseStudy() {
  const { projectPage, siteView, setSiteView } = useContext(AppContext);

  const scrollRef = useRef(null);
  const currentProject = projects[projectPage];

  // Reset scroll on load
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [projectPage]);

  // Function to scroll to a section
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (siteView !== 3) return; // case study view

    function handleWheel(e) {
      const el = scrollRef.current;
      if (!el) return;

      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        return;
      }

      el.scrollBy({
        top: e.deltaY,
      });
    }

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [siteView]);

  return (
    <div className="CaseStudyPage">
      <div className="case-study-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={projectPage}
            className="project-content"
            ref={scrollRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="project-title">{currentProject.projectName}</h1>

            <h3
              className="project-subtitle"
              onClick={() => setSiteView(1)}
              style={{ cursor: "pointer" }}
            >
              ← Back to Projects
            </h3>

            <h2 className="project-subtitle" id="concept">
              Concept
            </h2>

            {currentProject.concept?.map((item, i) => {
              if (typeof item === "string") {
                return (
                  <div key={i} className="case-study-paragraph">
                    <p>{item}</p>
                  </div>
                );
              }

              if (typeof item === "object") {
                return (
                  <div key={i} className="case-study-paragraph">
                    {item.text && <p>{item.text}</p>}
                    {item.image && (
                      <img
                        src={item.image.src}
                        alt={item.image.caption || "project visual"}
                      />
                    )}
                  </div>
                );
              }

              return null;
            })}

            {currentProject.process && (
              <>
                <h2 className="project-subtitle" id="process">
                  Process
                </h2>

                {currentProject.process.map((item, i) => {
                  if (typeof item === "string") {
                    return (
                      <div key={i} className="case-study-paragraph">
                        <p>{item}</p>
                      </div>
                    );
                  }

                  if (typeof item === "object") {
                    return (
                      <div key={i} className="case-study-paragraph">
                        {item.text && <p>{item.text}</p>}
                        {item.image && (
                          <img
                            src={item.image.src}
                            alt={item.image.caption || "project visual"}
                          />
                        )}
                      </div>
                    );
                  }

                  return null;
                })}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="case-study-media">
        <AnimatePresence mode="wait">
          <motion.img
            key={projectPage}
            src={currentProject.image || null}
            alt="project visual"
            className="case-study-image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="case-study-caption">
          {currentProject.caption || "Optional caption / description"}
        </div>

        <div className="case-study-outline">
          <h3 style={{ cursor: "pointer" }} onClick={() => scrollTo("concept")}>
            Concept
          </h3>
          <h3 style={{ cursor: "pointer" }} onClick={() => scrollTo("process")}>
            Process
          </h3>
        </div>
      </div>
    </div>
  );
}
