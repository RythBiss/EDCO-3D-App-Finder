import { useEffect, useRef, useState } from "react";

export default function ListButton(props: any) { 

    const [isInfoPopupOn, setIsInfoPopupOn] = useState<boolean>(false);
    const infoPopupRef = useRef<HTMLInputElement>(null)

    //execute function given by props
    const handleOnClick = () => {
        props.onClick();
    }

    //handles information popup states and positions popup next to hover button.
    const handlePop = () => {
        props.mouseAction();
        setIsInfoPopupOn(true);

        if(infoPopupRef.current !== null){
            const popupPositionY = infoPopupRef.current.getBoundingClientRect().y;
            
            props.setIsInfoPopupOnupYPos(popupPositionY)
        }
    }

    //sets popup state up the prop chain.
    useEffect(() => {
        if(props.popupOn) props.popupOn(isInfoPopupOn)
    }, [isInfoPopupOn])

  return (
        <div className='row bottom-gap'>
            <div className={`col-${props.indent}`}/>
            <div className='col tab-bar'>
                <button type="button" className={`btn-wrapper ${props.icon ? 'list-btn-icon' : 'list-btn'} w-100 container`} onClick={handleOnClick}>
                    <div className={`row ${props.icon ? 'justify-content-around' : ''}`}>
                        {props.icon ?
                            <>
                                <div className='icon-cushion'/>
                                <img
                                    src={props.icon}
                                    alt='machine-icon'
                                    width={128}
                                    className='machine-icon-frame col-4'
                                />
                                <div className={`col btn-icon-spaces ${props.active == true ? 'btn-active' : 'icon-btn-red-space'}`} ></div>
                                <div className={`col-4 btn-icon-spaces ${props.active == true ? 'btn-active' : 'icon-btn-red-space'}`}>
                                    <div>
                                        <div className='col-12 text-end list-btn-inner'>{props.lable}</div>
                                    </div>
                                    {props.showMenu &&
                                        <div ref={infoPopupRef} className="col-4 product-info" onMouseOver={handlePop} onMouseLeave={() => setIsInfoPopupOn(false)}>?</div>
                                    }
                                </div>
                            </>
                            :
                            <>
                                <div className='col text-start list-btn-inner'>{props.lable}</div>
                                {props.selected ? 
                                    <div className="col-1" style={{color: 'white'}}>☑</div>
                                    :
                                    <div className="col-1" style={{color: 'white'}}>☐</div>    
                                }
                            </>
                            }
                    </div>
                </button>
            </div>
        </div>
  )
}
