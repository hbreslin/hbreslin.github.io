import { useState, useContext, useEffect } from 'react'
import './App.css'
import Background from './components/Background'
import Introduction from './components/Introduction'
import Project from './components/Project'
import { AppContext } from './AppContext'
import projects from "./projectJsons/projects.json"

function App() {
//   const [count, setCount] = useState(0)
    const [projectPage,setProjectPage]=useState(0)
    const [numProjects, setNumProjects]=useState(projects.length)
    const [siteView, setSiteView]=useState(0);

    // useEffect(()=>{
    //     setNumProjects(projects.length)
    //     console.log(numProjects)
    // }, [projects.length])
    // useEffect(()=>{

    function getSiteView(){
        if(siteView===0){
            return(<Introduction></Introduction>)
        } else if(viewPage===1){
            return(<Project></Project>)
        } else{
            return(<Introduction></Introduction>)
        }
    }

  return (
    <AppContext.Provider value={{projectPage,setProjectPage, numProjects, setNumProjects, siteView, setSiteView}}>
        <>
            <Background></Background>
            {getSiteView()}

            {/* <Introduction></Introduction> */}
        {/* <p>This Page is under construction! For now, you can find me on <a href="https://www.linkedin.com/in/haley-breslin-b5471b1b0">LinkedIn</a> </p> */}
        </>
    </AppContext.Provider>
  )
}

export default App
