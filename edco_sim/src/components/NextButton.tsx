import { motion } from "framer-motion"

export default function ListButton(props: any) { 

    //execute function given by props
    const handleOnClick = () => {
        props.onClick();
    }

  return (
        <motion.div
            className='row bottom-gap'
        >
            <div className={`col tab-bar ${props.clickable ? 'next-btn' : 'next-btn-disabled'}`}>
                <button type="button" className={` w-100 container ${props.clickable ? 'next-btn' : 'next-btn-disabled'}`} onClick={handleOnClick}>
                    <div className={`row ` /*${props.icon ? 'justify-content-around' : ''} */}>
                        <div className={`col-12 ${props.clickable ? 'next-btn-inner' : 'next-btn-disabled'}` }>{props.lable}</div>
                    </div>
                </button>
            </div>
        </motion.div>
  )
}
