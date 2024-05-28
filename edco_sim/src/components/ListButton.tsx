import { useEffect, useRef, useState } from "react";

export default function ListButton(props: any) { 

    const [infoPop, setPop] = useState<boolean>(false);

    const helpBtnRef = useRef<HTMLInputElement>(null)

    //execute function given by props
    const handleOnClick = () => {
        props.onClick();
    }

    //handles information popup states
    const handlePop = () => {
        props.mouseAction()
        setPop(true);
        if(helpBtnRef.current !== null){
            props.setPopupYPos(helpBtnRef.current.getBoundingClientRect().y)
        }
    }

    useEffect(() => {
        if(props.popupOn) props.popupOn(infoPop)
    }, [infoPop])

  return (
        <div className='row bottom-gap'>
            <div className={`col-${props.indent}`}/>
            <div className='col tab-bar'>
                <button type="button" className={`btn-wrapper- list-btn w-100 container ${props.active == true ? 'btn-active' : ''}`} onClick={handleOnClick}>
                    <div className={`row ${props.icon ? 'justify-content-around' : ''}`}>
                        {props.icon ?
                            <>
                                <img
                                    src={props.icon}
                                    alt='machine-icon'
                                    width={128}
                                    className='machine-icon-frame col-4'
                                />
                                <div className="col" ></div>
                                <div className="col-4 vert-space-between">
                                    <div>
                                        <div className='col-12 text-end list-btn-inner'>{props.lable}</div>
                                    </div>
                                    {props.showMenu &&
                                        <div ref={helpBtnRef} className="col-4 product-info" onMouseOver={handlePop} onMouseLeave={() => setPop(false)}>?</div>
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
