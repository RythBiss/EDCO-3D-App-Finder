import React from 'react'

export default function HistoryItem() {
  return (
    <div className='row'>
        <div className='col tab-bar'>
            <div className="list-btn w-100 container">
                <div className='row justify-content-around align-items-center'>
                    <div className='col'>
                        <ul className='list-btn-bullets'>
                            <li>SURFACE:</li>
                            <li>MACHINE:</li>
                            <li>TOOLING:</li>
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
