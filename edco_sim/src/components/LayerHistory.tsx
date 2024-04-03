import { useEffect, useRef, useState } from 'react'
import HistoryItem from './HistoryItem'
import jsPDF from 'jspdf';
import "jspdf/dist/polyfills.es.js";
import ListButton from './ListButton';

export default function LayerHistory(props: any) {

  const [selectedLayer, setSelectedLayer] = useState<number>(0);
  const selectedTab = useRef(selectedLayer);

  const activateLayer = (layerIndex: number) =>{

    if(layerIndex == selectedTab.current){
      setSelectedLayer(0)
    }else{
      setSelectedLayer(layerIndex)
    }
  }

  const printPDF = () => {
    console.log("printing...")

    let printString: string = 'Order: \n'
    const pdf = new jsPDF;
    props.current.sublayerObjects.forEach((item) =>{
      printString += `   \nMachine: ${item.machine} \nTooling: ${item.tooling}`
      console.log(printString)
    })

    console.log(printString);
    pdf.text(printString, 10, 10);
    pdf.save('rental ticket.pdf');
  }

  useEffect(() => {
    props.setRenderedLayer(selectedLayer);
  }, [selectedLayer])

  useEffect(() => {
    console.log(props.mobileRight)
  }, [props.mobileRight])

  return (
      <div className={`col-lg-2 col-sm-8 shadow scroll h-100 ${props.mobileRight == false ? 'mobile-togglable' : 'mobile-togglable-i'}`}>
        {props.current !== undefined &&
            props.current.sublayerObjects.map((obj: object, key: number) => 
              <HistoryItem key={key} layerObject={obj} layerIndex={key} active={selectedLayer == key} onClick={() => activateLayer(key)} />
        )}

        <ListButton onClick={printPDF} lable='Print PDF' />
      </div>
  )
}