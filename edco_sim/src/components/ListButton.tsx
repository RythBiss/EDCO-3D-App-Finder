import React from 'react';

export default function ListButton() { 

  return (
    <div className='row'>
        <div className='col tab-bar'>
            <button type="button" className="list-btn w-100 container">
                <div className='row justify-content-around'>
                <img
                    src='https://portal.edcoinc.com/storage/product-slider/8-walk-behind-scari-lite-crete-planer-r/CPL-8-Gas-Machine-Slider.jpg'
                    alt='machine-icon'
                    width={128}
                    className='machine-icon-frame col-4'
                    />
                <div className='col-1' />
                <ul className='col list-btn-bullets'>
                    <li>CPM8</li>
                    <li>Planer</li>
                    <li>Concrete</li>
                    <li>CPS 3-6</li>
                </ul>
                </div>
            </button>
        </div>
    </div>
  )
}
