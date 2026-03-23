import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import Background from "./components/Background";
import Introduction from "./components/Introduction";
import Project from "./components/Project";
import { AppContext } from "./AppContext";
import projects from "./Jsons/projects.json";
import Resume from "./components/Resume";
import CaseStudy from "./components/CaseStudy";
import AboutMe from "./components/AboutMe";

function App() {
  const [projectPage, setProjectPage] = useState(0);
  const [numProjects, setNumProjects] = useState(projects.length);
  const [siteView, setSiteView] = useState(0);

  return (
    <AppContext.Provider
      value={{
        projectPage,
        setProjectPage,
        numProjects,
        setNumProjects,
        siteView,
        setSiteView,
      }}
    >
      <>
        <Background />

        <AnimatePresence mode="wait">
          {siteView === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Introduction />
            </motion.div>
          )}
          {siteView === 1 && (
            <motion.div
              key="project"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Project />
            </motion.div>
          )}
          {siteView === 2 && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Resume />
            </motion.div>
          )}
          {siteView == 3 && (
            <motion.div
              key="caseStudy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CaseStudy />
            </motion.div>
          )}
          {siteView == 4 && (
            <motion.div
              key="caseStudy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AboutMe />
            </motion.div>
          )}{" "}
        </AnimatePresence>
      </>
    </AppContext.Provider>
  );
}

export default App;
