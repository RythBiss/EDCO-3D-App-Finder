import { useState } from 'react'

export default function HistoryItem(props:any) {
    const [thick, setThick] = useState<string>('1/32');
    const [value, setValue] = useState<number>(0);

    //assigns layer thickness given slider event result.
    const handleSetThick = (value: string) => {

        props.layerObject.setMaterialThickness(value)
        
        switch(value){
            case '0':
                setThick('1/32')
                setValue(0)
                break;
            case '1':
                setThick('1/16')
                setValue(1)
                break;
            case '2':
                setThick('1/8')
                setValue(2)
                break;
            case '3':
                setThick('1/4')
                setValue(3)
                break;
            default:
                setThick('1/32')
                setValue(0)
        }
    }

    //execute function given by props
    const handleOnClick = () => {
        props.onClick();
    }

  return (
    <div className='row bottom-gap' onClick={handleOnClick}>
        <div className='col-12 tab-bar'>
            <div className={`list-btn w-100 container  ${props.active == true && 'btn-active'}`}>
                <div className='row justify-content-around align-items-center'>
                    <div className='col'>
                        <ul className='list-btn-bullets'>
                            <li>MATERIAL: {props?.layerObject?.materialRemoved}</li>
                            <li>MACHINE: {props?.layerObject?.machine}</li>
                            <li>TOOLING: {props?.layerObject?.tooling}</li>
                            <li>THICKNESS: {thick}</li>
                        </ul>
                    </div>
                    <div className='col-1 history-item-num'>
                        {props.layerIndex > 0 && props.layerIndex + 1}
                        {props.layerIndex == 0 && 1}
                        {props.layerIndex == 'Active' && 'Active Layer'}
                    </div>
                    {props.active &&
                        <>
                            <label htmlFor="customRange1" className="form-label list-btn-title" style={{marginBottom: '0', marginTop: '0.5rem'}}>LAYER THICKNESS</label>
                            <input id="slider" className='thick-slider' type="range" min="0" max="3" step='1' value={value} onChange={(e) => {handleSetThick(e.target.value)}} ></input>
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
