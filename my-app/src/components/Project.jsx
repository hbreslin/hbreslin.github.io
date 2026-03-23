import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faEllipsis,
  faBars,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useContext, useState, useRef } from "react";
import { AppContext } from "../AppContext";
import projects from "../Jsons/projects.json";
import "../styling/Project.css";
import { AnimatePresence, motion } from "framer-motion";

export default function Project() {
  const { projectPage, setProjectPage, numProjects, siteView, setSiteView } =
    useContext(AppContext);

  function onCaseStudy() {
    setSiteView(3);
  }

  const scrollRef = useRef(null);
  const [currentProject, setCurrentProject] = useState({});

  // Update project content
  useEffect(() => {
    setCurrentProject(projects[projectPage]);
  }, [projectPage]);

  // Reset scroll when switching projects
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [projectPage]);

  // Scroll-anywhere behavior (ONLY on project page)
  useEffect(() => {
    if (siteView !== 1) return;

    function handleWheel(e) {
      const el = scrollRef.current;
      if (!el) return;

      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      // prevent useless scrolling past bounds
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

  function goPrev() {
    setProjectPage((prev) => (prev - 1 + numProjects) % numProjects);
  }

  function goNext() {
    setProjectPage((prev) => (prev + 1) % numProjects);
  }

  return (
    <div className="project-page">
      <button className="project-button" onClick={goPrev}>
        <FontAwesomeIcon icon={faAngleLeft} size="4x" className="icon" />
      </button>

      <div className="project-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={projectPage}
            ref={scrollRef}
            className="project-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="project-title">{currentProject["projectName"]}</h1>

            <div className="project-meta">
              <span className="project-role">{currentProject["role"]}</span>
              <span className="divider">|</span>
              <span className="case-study-link" onClick={onCaseStudy}>
                -&gt; Case Study
              </span>
            </div>

            <Section title="Overview">
              <p>{currentProject["description"]}</p>
            </Section>

            <Section title="Subjects">
              <p>{currentProject.subjects?.join(", ")}</p>
            </Section>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.img
          key={projectPage}
          src={currentProject.image || null}
          alt="project visual"
          className="project-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <button className="project-button" onClick={goNext}>
        <FontAwesomeIcon icon={faAngleRight} size="4x" className="icon" />
      </button>
    </div>
  );
}

/* ------------------ Collapsible Section ------------------ */
// import { motion } from "framer-motion";

export function Section({ title, children }) {
  return (
    <div>
      <h2 className="project-subtitle" style={{ cursor: "default" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {title}
        </span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="project-paragraph"
      >
        {children}
      </motion.div>
    </div>
  );
}
