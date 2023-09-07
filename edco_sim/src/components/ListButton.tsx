import { useState } from 'react';

export default function ListButton(props: any) { 

    const handleOnClick = () => {
        props.onClick();
    }

  return (
    <div className='row'>
        <div className={`col-${props.indent}`}/>
        <div className='col tab-bar'>
            <button type="button" className={`btn-wrapper list-btn w-100 container ${props.active == true ? 'btn-active' : ''}`} onClick={handleOnClick}>
                <div className={`row ${props.icon ? 'justify-content-around' : ''}`}>
                    {props.icon &&
                        <img
                            src={props.icon}
                            alt='machine-icon'
                            width={128}
                            className='machine-icon-frame col-4'
                        />}
                    <div className={props.icon ? 'col-1' : ''} />
                    {props.lable}
                </div>
            </button>
        </div>
    </div>
  )
}
