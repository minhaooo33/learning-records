import {  EXAMPLES } from "../data";
import { useState } from "react";
import Section from "./Section";
import TabBtn from "./TabBtn";
import Tab from "./Tab";

function Menu (){
    const [selectTopic, setSelectTopic] = useState("");

  function onSelect(selectBtn) {
    setSelectTopic(selectBtn);
  }

  let tabContent =  <p>請選擇一個主題</p>;
  if (selectTopic){
     tabContent = <div id="tab-content">
     <h3>{EXAMPLES[selectTopic].topic}</h3>
     <p>{EXAMPLES[selectTopic].description}</p>
     <pre>
       <code>{EXAMPLES[selectTopic].code}</code>
     </pre>
   </div>
  }
    return(
        <Section title="Examples" id="examples">
         <Tab  
         button={
                      <>
                      <TabBtn choose={selectTopic==="Components"} onSelect={onSelect.bind(null, "Components")}>Components</TabBtn>
                      <TabBtn choose={selectTopic==="JSX"} onSelect={onSelect.bind(null, "JSX")}>JSX</TabBtn>
                      <TabBtn choose={selectTopic==="Props"} onSelect={onSelect.bind(null, "Props")}>Props</TabBtn>
                      <TabBtn choose={selectTopic==="State"} onSelect={onSelect.bind(null, "State")}>State</TabBtn>
                    </>
         }>
         {tabContent}
         </Tab>
         
         
        </Section>
    )
}

export default Menu