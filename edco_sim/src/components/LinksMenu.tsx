import "jspdf/dist/polyfills.es.js";
import { useEffect } from "react";


export default function LinksMenu(props: any) {

  return (
    <div className={`col-lg-6 col-sm-8 shadow scroll h-100 ${props.linksMenu == false ? 'hide-menu' : 'show-menu-right'}`} style={{overflowY: "scroll", padding: "0", zIndex: "10"}}>
      <div style={{display: "flex", flexDirection: "column"}} >
        <a className='tab-btn' href="https://www.edcoinc.com/" target="_blank" style={{color: "black", textDecoration: "none", padding: "1rem"}} >Learn More</a>
        <a className='tab-btn' href="https://edcostore.com/" target="_blank" style={{color: "black", textDecoration: "none", padding: "1rem"}} >Purchase Now</a>
      </div>
    </div>
  )
}