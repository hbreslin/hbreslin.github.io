import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


import { useEffect, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import projects from "../projectJsons/projects.json";
import '../Project.css';


export default function Project({ data }) {
    function goPrev() {
        setProjectPage((prev) => (prev - 1 + numProjects) % numProjects);
    }

    function goNext() {
        setProjectPage((prev) => (prev + 1) % numProjects);
    }
    const { projectPage , setProjectPage,numProjects } = useContext(AppContext);
    const [currentProject, setCurrentProject] = useState({});
    // const {numProjects} = useContext(AppContext);

    useEffect(() => {
        setCurrentProject(projects[projectPage]);
    }, [projectPage]);

    return (
        <div className="project-page">
            <button className='project-button' onClick={goPrev}>
                <FontAwesomeIcon icon={faAngleLeft} size="4x" className="icon" />
            </button>

            
            {/* <i className='fas fa-angle-right'></i> */}
            {/* <button className="project-button">PREV</button> */}
            <div className="project-text">
                <h1 className="project-title">{currentProject['projectName']}</h1>
                <div>
                    <h2 className="project-subtitle">{currentProject['subtitle']}</h2>
                    <h2 className="project-subtitle">Project Description</h2>
                    <p className="project-paragraph">{currentProject['description']}</p>
                    <h2 className="project-subtitle">Role : {currentProject['role']}</h2>
                    <h2 className="project-subtitle">Subjects :</h2>
                    <p>{currentProject.subjects?.join(', ')}</p>
                </div>
            </div>
            <img src={null} alt="project visual" className="project-image" />
                
            <button className='project-button' onClick={goNext}>
                <FontAwesomeIcon icon={faAngleRight} size="4x" className="icon" />
            </button>
            {/* <FontAwesomeIcon icon={faAngleRight} size="4x" className="icon" /> */}
     
            
            {/* <button className="project-button">NEXT</button> */}
        </div>
    );
}
