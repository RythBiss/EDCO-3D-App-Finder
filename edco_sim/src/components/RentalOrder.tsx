import { useEffect, useRef, useState } from 'react'
import RentalItem from './RentalItem'
import "jspdf/dist/polyfills.es.js";
import ListButton from './ListButton';
import { AnimatePresence, motion } from 'framer-motion';


export default function RentalOrder(props: any) {

  //selected tab is stored in a ref so it persists on DOM updates
  const [selectedLayer, setSelectedLayer] = useState<number>(0);
  const selectedTab = useRef(selectedLayer);

  //2D array that contains alternitive layer choices for each layer. This makes sure only valid layer types are assigned to each layer.
  const altLayers = [
    ['vinyl', 'linoleum', 'ceramic', 'carpet'],
    ['glue/adhesive', 'mastic', 'thinset'],
    ['sealer', 'residual glue/adhesive', 'paint'],
    ['concrete', 'high spots', 'trip hazard']
  ]

  //updates selected layer state.
  const activateLayer = (layerIndex: number) =>{
    if(layerIndex == selectedTab.current){
      setSelectedLayer(0)
    }else{
      setSelectedLayer(layerIndex)
    }
  }

  //when a layer type is passed, finds other layer types that could also be assigned to that layer.
  const getAltLayers = (change: string) => {
    for(let i = 0; i < 4; i++){
      if(altLayers[i].includes(change)){
        return altLayers[i];
      }
    }
  }

  //updates rendered layer.
  useEffect(() => {
    props.setRenderedLayer(selectedLayer);
  }, [selectedLayer])


  return (
    <div className={`col-lg-3 col-sm-8 shadow scroll h-100 ${props.mobileRight == false ? 'hide-menu' : 'show-menu-right'}`} style={{overflowY: "scroll"}}>
        
        <AnimatePresence>
          {props.current !== undefined && props.current.sublayerObjects.length === 0 ? (
            <motion.p
              key="no-selections"
              className="suggestion bottom-gap montserrat"
              initial={{ x: '150%' }} // Start fully off-screen to the left
              animate={{ x: 0 }} // Move to its normal position
              exit={{ x: '150%', position: "absolute" }} // Move fully off-screen when it disappears
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
            >
              Product selections for each layer of the application will appear here once all <span className="montserrat-red">tabs</span> on the menu on the left is complete.
            </motion.p>
          ) : (
            <>
              <motion.div
                key="preview-text"
                className="row"
                initial={{ x: '150%' }} // Start fully off-screen to the left
              animate={{ x: 0 }} // Move to its normal position
              exit={{ x: '150%', position: "absolute" }} // Move fully off-screen when it disappears
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
              >
                <div className="col-12 tab-bar" style={{ display: "flex", alignItems: "center", height: "106px" }}>
                  <div className="suggestion montserrat">Click on a <span className="montserrat-red">layer</span> to preview.</div>
                </div>
              </motion.div>

              <motion.div
                key="recommendations"
                className="row"
                initial={{ x: '150%' }} // Start fully off-screen to the left
              animate={{ x: 0 }} // Move to its normal position
              exit={{ x: '150%', position: "absolute" }} // Move fully off-screen when it disappears
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
              >
                <div className="col-12 tab-bar">
                  <div className="suggestion montserrat tab-btn-active" style={{ backgroundColor: "#EF3D5E", color: "white" }}>
                    Jobsite Recommendations:
                  </div>
                </div>
              </motion.div>

              {props.current !== undefined &&
                props.current.sublayerObjects.map((obj: object, key: number) => (
                  <motion.div
                    key={key}
                    initial={{ x: '150%' }} // Start fully off-screen to the left
              animate={{ x: 0 }} // Move to its normal position
              exit={{ x: '150%', position: "absolute" }} // Move fully off-screen when it disappears
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} 
                  >
                    <RentalItem
                      layerObject={obj}
                      layerIndex={key}
                      active={selectedLayer === key}
                      onClick={() => activateLayer(key)}
                      getAltLayers={getAltLayers}
                    />
                  </motion.div>
                ))}
            </>
          )}
        </AnimatePresence>
        

      </div>
  )
}