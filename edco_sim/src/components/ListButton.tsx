import { useEffect, useState } from "react";

export default function ListButton(props: any) { 

    const handleOnClick = () => {
        props.onClick();
    }

    const handlePop = () => {
        props.mouseAction()
        setPop(true);
    }

    const [infoPop, setPop] = useState<boolean>(false);

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
                                        <div className="col-4 product-info" onMouseOver={handlePop} onMouseLeave={() => setPop(false)}>?</div>
                                    }
                                </div>
                            </>
                            :
                            <>
                                <div className='col text-start list-btn-inner'>{props.lable}</div>
                            </>
                            }
                    </div>
                </button>
            </div>
        </div>
  )
}
