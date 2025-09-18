import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import projects from "../projectJsons/projects.json";
import '../Project.css';
import { AnimatePresence, motion } from 'framer-motion';

export default function Project() {
  const { projectPage, setProjectPage, numProjects } = useContext(AppContext);
  const [currentProject, setCurrentProject] = useState({});

  useEffect(() => {
    setCurrentProject(projects[projectPage]);
  }, [projectPage]);

  function goPrev() {
    setProjectPage((prev) => (prev - 1 + numProjects) % numProjects);
  }

  function goNext() {
    setProjectPage((prev) => (prev + 1) % numProjects);
  }

  return (
    <div className="project-page">
      <button className='project-button' onClick={goPrev}>
        <FontAwesomeIcon icon={faAngleLeft} size="4x" className="icon" />
      </button>

      <div className="project-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={projectPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="project-title">{currentProject['projectName']}</h1>
            <div>
              <h2 className="project-subtitle">{currentProject['subtitle']}</h2>
              <h2 className="project-subtitle">Project Description</h2>
              <p className="project-paragraph">{currentProject['description']}</p>
              <h2 className="project-subtitle">Role: {currentProject['role']}</h2>
              <h2 className="project-subtitle">Subjects:</h2>
              <p>{currentProject.subjects?.join(', ')}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.img
          key={projectPage}
          src={currentProject.image || null} // replace null with actual image path
          alt="project visual"
          className="project-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <button className='project-button' onClick={goNext}>
        <FontAwesomeIcon icon={faAngleRight} size="4x" className="icon" />
      </button>
    </div>
  );
}
