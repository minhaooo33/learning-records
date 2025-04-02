import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import Selectedproject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    //這個selectedProject屬性是用來儲存當前選中的ID
    //當以後有多個項目可在這裡選擇時，這個屬性就會變得更有用
    //undefined應該作為『什麼都不做』的標記
    projects: [],
    tasks: [],
  });

  function handleAddTask(text){
    setProjectsState((prevState) =>{
      const taskid = Math.random().toString();
      const newTask ={
        text: text,
        projectId:prevState.selectedProjectId,
        id: taskid,
      };
      return{
        ...prevState,
        tasks:[...prevState.tasks, newTask],
      };
    })
  }
  function handleDeleteTask(id){
    setProjectsState((prevState) =>{
      return{
        ...prevState,
        tasks: prevState.tasks.filter((task)=>task.id !== id)
      };
    });
  }
  
  //這個函數會在用戶點擊開始添加項目時被調用
  function handleStartAddProject(){
    setProjectsState(preState =>{
      return{
        ...preState,
        selectedProjectId: null,
        //null應該作為『現在正添加項目』的標記
      }
    });
  }

  function handleCancelAddProject(){
    setProjectsState(preState =>{
      return{
        ...preState,
        selectedProjectId: undefined,
      }
    });
  }

  //這個函數會完成添加項目的操作
  //projectData是一個物件，包含了新項目的title、description和dueDate再加上id
  function handleAddProject(projectData) {
  setProjectsState((prevState) =>{
    const projectid = Math.random().toString();
    const newProject ={
      ...projectData,
      id: projectid,
    };
    return{
      ...prevState,
      selectedProjectId: undefined,
      projects:[...prevState.projects, newProject],
    };
  })
  }
  
  function handleSelectProject(Id){
    setProjectsState((prevState) =>{
      return{
        ...prevState,
        selectedProjectId: Id
    //這個selectedProject屬性是用來儲存當前選中的ID
      };
    });
  }

  function handleDeleteProject(){
    setProjectsState((prevState) =>{
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project)=>project.id !== prevState.selectedProjectId)
      };
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId); 

  let content = <Selectedproject 
                  project={selectedProject} 
                  onDelete={handleDeleteProject}
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                  tasks={projectsState.tasks}/>;

  if (projectsState.selectedProjectId === null) {
     content = <NewProject onAddProject={handleAddProject} onCancelProject={handleCancelAddProject}/>
     //應該從newProject組件內部調用handleSave函數（by props）
  } else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      {}
     <ProjectsSidebar 
     onStartAddProject={handleStartAddProject} 
     onSelectProject={handleSelectProject}
     projects={projectsState.projects}
     selectedprojectId={projectsState.selectedProjectId}/>
     {content}
    </main>
  );
}

export default App;
