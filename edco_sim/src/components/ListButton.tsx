import { getPowerTypeImageIndexGlobal, isNameMachine } from '../functions';

export default function ListButton(props: any) { 

    // const [isInfoPopupOn, setIsInfoPopupOn] = useState<boolean>(false);
    // const infoPopupRef = useRef<HTMLInputElement>(null)

    //execute function given by props
    const handleOnClick = () => {
        props.onClick();
    }

    // //handles information popup states and positions popup next to hover button.
    // const handlePop = () => {
    //     props.mouseAction();
    //     setIsInfoPopupOn(true);

    //     if(infoPopupRef.current !== null){
    //         const popupPositionY = infoPopupRef.current.getBoundingClientRect().y;
            
    //         props.setIsInfoPopupOnupYPos(popupPositionY)
    //     }
    // }

    //sets popup state up the prop chain.
    // useEffect(() => {
    //     if(props.popupOn) props.popupOn(isInfoPopupOn)
    // }, [isInfoPopupOn])

    const linkSVG =
    <>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z" fill="#fff"/>
            <path d="M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z" fill="#fff"/>
            <path d="M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z" fill="#fff"/>
        </svg>
    </>
  

  return (
        <div className='row bottom-gap'>
            <div className={`col-${props.indent}`}/>
            <div className='col tab-bar'>
            {/* btn-wrapper */}
                <button type="button" className={ ` ${props.icon ? 'list-btn-icon' : 'list-btn'} w-100 container`} onClick={handleOnClick}>
                    <div className={`row ` /*${props.icon ? 'justify-content-around' : ''} */}>
                        {props.icon ?
                            <>
                                {/* <div className='col-1 icon-cushion'/> */}
                                <img
                                    src={props.icon}
                                    alt='machine-icon'
                                    width={128}
                                    className='machine-icon-frame col-4'
                                />
                                <div style={{display: "flex"}} className="col">
                                    <div className={`col row btn-icon-spaces ${props.active == true ? 'btn-active' : 'icon-btn-red-space'}`} style={{paddingLeft: 0, paddingRight: 0}}>
                                        <div className="arachnid-background">
                                            <a
                                                data-toggle="tooltip"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={`Go to product page`}
                                                href={props.link}
                                                className='col-12 list-btn-inner history-item-num product-name'
                                                style={{textAlign: "left", pointerEvents: "auto", color: "white"}}
                                                onClick={(e) => e.stopPropagation()}
                                                onMouseEnter={(e) => e.stopPropagation()} 
                                                >{props.displayName}{" "}{linkSVG}</a>
                                            <div style={{width: "94%", height: "1px", backgroundColor: "white", marginBottom: "0.3rem", borderRadius: "2px"}}/>

                                            {isNameMachine(props.lable) == true &&
                                                props.popupInfo[getPowerTypeImageIndexGlobal(props.lable, props.layerObject)].split(",").map((item: string) => <div className='col-12 list-btn-inner history-item-num product-number' style={{textAlign: "left", fontSize: "0.9rem", lineHeight: "0.9rem", color: "white"}}>{item}</div>)
                                            }
                                            {isNameMachine(props.lable) == false &&
                                                props.popupInfo.split(",").map((item: string) => <div className='col-12 list-btn-inner history-item-num product-number' style={{textAlign: "left", fontSize: "0.9rem", lineHeight: "0.9rem", color: "white"}} >{item}</div>)
                                            }

                                        </div>
                                    </div>

                   
                                </div>
                            </>
                            :
                            <>
                            {props.selected != undefined ? 
                                <>
                                    <div className='col text-start list-btn-inner'>{props.lable}</div>
                                    {props.selected ? 
                                        <div className="col-1" style={{color: '#D73648', fontSize: "1.5rem", fontWeight: "700"}}>🗸</div>
                                        :
                                        <div className="col-1" style={{color: '#D73648', fontSize: "1.5rem"}}></div>    
                                    }
                                </>
                                :
                                <>
                                    <div className='col text-start list-btn-inner'>{props.lable}</div>
                                </>

                            }

                            </>
                            }
                    </div>
                </button>
            </div>
        </div>
  )
}

