import { useEffect, useState } from "react";

export default function DropDown(props) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState(props.currentValue);

  //caret SVGs for custom drop downs
  const caretUp = 
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-caret-up" viewBox="0 0 16 16">
      <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
    </svg>

  const caretDw = 
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-caret-down" viewBox="0 0 16 16">
      <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
    </svg>


  //handles active and selected states, update layer's selected type and send up the prop chain.
  const handleActive = (e: React.MouseEvent, item: string) => {
    const text = e.target as HTMLElement;
    setIsSelected(text.textContent);
    setIsActive(!isActive);
    props.onChange(item)
  }

  useEffect(() => {
    setIsSelected(props.currentValue)
  }, [props.currentValue])

  return (
    <>
      <label htmlFor="changeLayer" style={{display: 'none'}}>change layer</label>
      <div className="dropdown" id="changeLayer">
        <div onClick={(e) => {setIsActive(!isActive)}} className="dropdown-btn" >
          {selected}
          <span>
            {isActive? caretUp : caretDw}
          </span>
        </div>
        <div className="dropdown-content" style={{ display: isActive ? "block" : "none" }} > {props.optionsStringArray.map((item, i)=> 
          <div key={i} onClick={(e) => handleActive(e, item)} className="item" >
            {item}
          </div> 
          )}

        </div>
      </div>
    </>
  );
}
