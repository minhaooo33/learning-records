function TabBtn({children , onSelect ,choose}){
   
    return(
    <li>
        <button className={choose ? "active" :""}  onClick={onSelect}>{children}</button>
        </li>
)
}


export default TabBtn