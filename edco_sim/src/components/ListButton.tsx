import React from 'react';

export default function ListButton(props: any) { 

  return (
    <div className='row'>
        <div className={`col-${props.indent}`}/>
        <div className='col tab-bar'>
            <button type="button" className="list-btn w-100 container" onClick={props.onClick}>
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
