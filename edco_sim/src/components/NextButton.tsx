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
            <div className='col tab-bar'>
                <button type="button" className={ /*btn-wrapper */` ${props.icon ? 'list-btn-icon' : 'list-btn'} w-100 container`} onClick={handleOnClick}>
                    <div className={`row ` /*${props.icon ? 'justify-content-around' : ''} */}>
                        <div className='col-12 list-btn-inner'>{props.lable}</div>
                    </div>
                </button>
            </div>
        </motion.div>
  )
}
