
export default function ClusterButton(props: any) { 

    //execute function given by props
    const handleOnClick = () => {
        props.onClick();
    }

  return (

        <button type="button" className={`btn-wrapper ${props.active && 'cluster-btn-active'}`} onClick={handleOnClick}>
            <div className='col list-btn-inner'>{props.lable}</div>
        </button>
    )
}
