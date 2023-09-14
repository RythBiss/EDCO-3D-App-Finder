import React, { useEffect } from 'react'

export default function HistoryItem(props:any) {

    useEffect(() => {
        console.log('history item: ', props.layerObject)
    }, [])
    

  return (
    <div className='row'>
        <div className='col tab-bar'>
            <div className="list-btn w-100 container">
                <div className='row justify-content-around align-items-center'>
                    <div className='col'>
                        <ul className='list-btn-bullets'>
                            <li>SURFACE: {props.layerObject.surface}</li>
                            <li>MACHINE: {props.layerObject.machine}</li>
                            <li>TOOLING: {props.layerObject.tooling}</li>
                        </ul>
                    </div>
                    <div className='col history-item-num'>
                        1
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
