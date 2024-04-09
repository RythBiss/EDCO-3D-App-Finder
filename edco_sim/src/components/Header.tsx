
export default function Header(props: any) {
  return (
    <nav className="navbar header shadow z-1">
        <div className="container-fluid">
          <button className='mobile-button' onClick={() => props.setLeft((prev: boolean) => !prev)} >JOBSITE</button>
            <a className="navbar-brand" href="#">
              <img src={'https://www.edcoinc.com/wp-content/uploads/2023/06/Logo.png'} alt="Logo" height="38" />
            </a>
          <button className='mobile-button' onClick={() => props.setRight((prev: boolean) => !prev)} >SOLUTION</button>
        </div>
    </nav>
  )
}