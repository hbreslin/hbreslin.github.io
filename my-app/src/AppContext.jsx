import { createContext } from "react";

export const AppContext = createContext({
  projectPage: 0,
  setProjectPage:()=>{},
  numProjects: 0,
  setNumProjects:()=>{},
  siteView:0,
  setSiteView:()=>{}
});
