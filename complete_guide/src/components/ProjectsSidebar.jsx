import Button from "./Button";
export default function ProjectsSidebar({onStartAddProject,projects,onSelectProject,selectedprojectId}) {
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 uppercase md:text-xl text-stone-200">Your Projects</h2>
            <div>
               <Button onClick={onStartAddProject}>+ Add Project</Button>
            </div>
            <ul className="mt-8">
            {projects.map(project => {
                let cssClass = "w-full text-left px-2 py-1 rounded-sm  hover:text-stone-200 hover:bg-stone-800";
                
                if(project.id === selectedprojectId){
                    cssClass += " bg-stone-400 text-stone-200";
                }else{
                    cssClass += " hover:bg-stone-800";
                }

                return(                
                <li key={project.id}>
                <button 
                    onClick={()=>onSelectProject(project.id)}
                    //<button onClick={onSelectProject}>❌
                    //因為這樣 React 只會傳遞 event（點擊事件）作為參數
                    // //而 app.jsx 中的 handleSelectProject 需要的是 project.id。
                    className={cssClass}>{project.title}</button>
                </li>)
                } )}
            </ul>
        </aside>
    );
} 