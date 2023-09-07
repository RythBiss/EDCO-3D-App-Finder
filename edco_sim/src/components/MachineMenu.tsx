import {useEffect, useState } from 'react'
import ListButton from './ListButton';


export default function EditLayer(props: any) {

const machinesByApplication: any = {
  ALR: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet']
  },
  TS8: {
    apps: ['vinyl', 'linoleum', 'ceramic', 'carpet']
  },
  SEC: {
    apps: ['adhesives', 'glues', 'thinsets', 'industrial buildup', 'residual adhesive', 'sealers', 'thin mil coatings', 'paint', 'leveling', 'CSP 1-9']
  },
  TG10: {
    apps: ['residual adhesive', 'sealers', 'thin mil coatings', 'paint','leveling', 'CSP 1-9']
  },
  CPM8: {
    apps: ['leveling', 'CSP 1-9']
  },
  CD5: {
    apps: ['leveling', 'CSP 1-9']
  }
}



const [openedMenu, setOpenedMenu] = useState(0);
const [selectedSurface, setSelectedSurface] = useState('vinyl');



const handleMenuState = (newState: number) => {
    if(newState == openedMenu){
        setOpenedMenu(0)
    }else{
        setOpenedMenu(newState)
    }
}

const setSurface = (newLayer: string, ) => {
    props.layerObject.setSurface(newLayer);
    setSelectedSurface(newLayer);
}



useEffect(() => {
    console.log(selectedSurface)
}, [selectedSurface])

useEffect(() => {
    Object.keys(machinesByApplication).forEach((key) => {
      console.log(machinesByApplication[key].apps)
    })
}, [])



  return (
    <div className='edit-menu'>
        {/* {surfacesFirstLayer.map((layer, i) => 
            <ListButton key={i} lable={layer} indent={1} active={selectedSurface == layer ? true : false} onClick={() => setSurface(layer)} />
        )} */}
    </div>
  )
}