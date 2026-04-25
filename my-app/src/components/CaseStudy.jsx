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

  // Helper to get YouTube embed URL from various formats
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("watch?v=")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("/embed/")) return url;
    if (url.includes("/shorts/")) {
      const id = url.split("/shorts/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    return null;
  };

  useEffect(() => {
    if (siteView !== 3) return;

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

  // Helper function to render content items (strings or objects with images)
  const renderContent = (content) => {
    if (!content) return null;

    return content.map((item, i) => {
      if (typeof item === "string") {
        return (
          <div key={i} className="case-study-paragraph">
            <p>{item}</p>
          </div>
        );
      }

      if (typeof item === "object" && item.image) {
        return (
          <div key={i} className="case-study-paragraph">
            {item.text && <p>{item.text}</p>}
            <img
              src={item.image.src}
              alt={item.image.caption || "project visual"}
            />
            {item.image.caption && (
              <em className="image-caption">{item.image.caption}</em>
            )}
          </div>
        );
      }

      return null;
    });
  };

  // Render media section
  const renderMediaSection = () => {
    if (!currentProject.media || currentProject.media.length === 0) return null;

    return (
      <div className="case-study-media-section">
        <h2 className="project-subtitle" id="media">
          Media
        </h2>
        <div className="media-grid">
          {currentProject.media.map((item, idx) => {
            if (item.type === "video") {
              const embedUrl = getYouTubeEmbedUrl(item.url);
              return (
                <div key={idx} className="media-item media-video">
                  <div className="video-wrapper">
                    <iframe
                      src={embedUrl}
                      title={`${currentProject.projectName} video ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  {item.caption && (
                    <em className="media-caption">{item.caption}</em>
                  )}
                </div>
              );
            }
            if (item.type === "image") {
              return (
                <div key={idx} className="media-item media-image">
                  <img
                    src={item.src}
                    alt={item.caption || "Additional media"}
                  />
                  {item.caption && (
                    <em className="media-caption">{item.caption}</em>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

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

            {/* Dynamically render all sections from JSON */}
            {currentProject.sections?.map((section, idx) => (
              <div key={idx}>
                <h2 className="project-subtitle" id={section.id}>
                  {section.title}
                </h2>
                {renderContent(section.content)}
              </div>
            ))}

            {/* Media section - appears after all sections */}
            {renderMediaSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="case-study-media">
        {/* Main image */}
        {currentProject.image && (
          <AnimatePresence mode="wait">
            <motion.img
              key={projectPage}
              src={currentProject.image}
              alt="project visual"
              className="case-study-image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        )}

        {currentProject.caption && (
          <div className="case-study-caption">{currentProject.caption}</div>
        )}

        <div className="case-study-outline">
          {currentProject.sections?.map((section, idx) => (
            <h3
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => scrollTo(section.id)}
            >
              {section.title}
            </h3>
          ))}
          {currentProject.media && currentProject.media.length > 0 && (
            <h3 style={{ cursor: "pointer" }} onClick={() => scrollTo("media")}>
              Media
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
