import { useEffect, useState } from 'react';

export default function ClusterButton(props: any) { 

    const handleOnClick = () => {
        props.onClick();
    }

  return (

        <button type="button" className={`btn-wrapper cluster-btn-active`} style={{backgroundColor: `${props.active == true && '#e75a6b'}`}} onClick={handleOnClick}>
            <div className='col list-btn-inner'>{props.lable}</div>
        </button>
    )
}
