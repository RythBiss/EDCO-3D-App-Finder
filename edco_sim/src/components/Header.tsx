
export default function Header(props: any) {

  const refreshPage = () => {
    location.reload();
  }
  const learnMoreSVG = 
    <>
      {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
      <svg width="22" height="22" viewBox="0 -0.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    
          <title>book [#1207]</title>
          <desc>Created with Sketch.</desc>
          <defs>

      </defs>
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-260.000000, -2759.000000)" fill="#FFFFFF">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path d="M222,2612.40709 C222,2612.84565 221.729,2613.23594 221.324,2613.3787 L215,2615.60539 L215,2603.71501 L215,2603.53322 L220.676,2601.53454 C221.325,2601.3055 222,2601.80055 222,2602.50615 L222,2612.40709 Z M213,2603.71501 L213,2615.60539 L206.676,2613.3787 C206.271,2613.23594 206,2612.84565 206,2612.40709 L206,2602.50615 C206,2601.80055 206.675,2601.3055 207.324,2601.53454 L213,2603.53322 L213,2603.71501 Z M221.337,2599.11785 L214.331,2601.64444 C214.117,2601.72147 213.883,2601.72147 213.669,2601.64444 L206.663,2599.11785 C205.362,2598.64847 204,2599.6396 204,2601.05592 L204,2613.11577 C204,2613.997 204.547,2614.78065 205.36,2615.06207 L213.68,2617.94608 C213.888,2618.01797 214.112,2618.01797 214.32,2617.94608 L222.64,2615.06207 C223.453,2614.78065 224,2613.997 224,2613.11577 L224,2601.05592 C224,2599.6396 222.638,2598.64847 221.337,2599.11785 L221.337,2599.11785 Z" id="book-[#1207]">

      </path>
                  </g>
              </g>
          </g>
      </svg>
    </>

  const buyNowSVG = 
  <svg fill="#FFFFFF" width="26" height="26" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
    <path d="M891 308H340q-6 0-10.5-4t-5.5-10l-32-164q-2-14-12-22.5T256 99H110q-15 0-25.5 10.5T74 135v5q0 15 10.5 26t25.5 11h102q4 0 7 2.5t4 6.5l102 544q3 19 20 28 8 5 18 5h17q-22 25-21 58.5t25 56.5 57.5 23 58-23 25.5-56.5-22-58.5h186q-23 25-21.5 58.5T693 878t57.5 23 57.5-23 25-56.5-21-58.5h17q15 0 25.5-10.5T865 727v-8q0-15-11-25.5T828 683H409q-6 0-10.5-4t-5.5-9l-10-54q-1-8 4-14t12-5h460q13 0 22.5-8t11.5-21l33-219q3-16-7.5-28.5T891 308z"/>
  </svg>

  const openSVG = 
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="#FFFFFF"
  >
    <path d="M3 6h18M3 12h18M3 18h18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

  const closeSVG =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="#FFFFFF"
  >
    <path d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.12 5.71a1 1 0 00-1.42 1.42L10.59 12l-4.89 4.88a1 1 0 001.42 1.42L12 13.41l4.88 4.89a1 1 0 001.42-1.42L13.41 12l4.89-4.88a1 1 0 000-1.42z" />
  </svg>

  return (
    <nav className="navbar header shadow z-1">
        <div className="container-fluid">
          {/* mobile button to show/hide jobsite questions */}
          <button className='mobile-button' onClick={() => props.setLeft((prev: boolean) => !prev)} >JOBSITE</button>
            {/* <a className="navbar-brand" href="#" onClick={refreshPage}>
              <img src={'https://www.edcoinc.com/wp-content/uploads/2023/06/Logo.png'} alt="Logo" height="38" />
            </a> */}
          {/* mobile button to show/hide solutions pop out */}
          <div style={{display: "flex"}}>
            <button className='mobile-button' onClick={() => props.setRight((prev: boolean) => !prev)} >SOLUTION</button>
            <button className='menu-button' onClick={() => props.setMenu((prev: boolean) => !prev)} >{props.mobileMenu ? closeSVG : openSVG}</button>
            <a className='redirect-links' href="https://www.edcoinc.com/" target="_blank">{learnMoreSVG}</a>
            <a className='redirect-links' href="https://edcostore.com/" target="_blank" >{buyNowSVG}</a>
          </div>
        </div>
    </nav>
  )
}