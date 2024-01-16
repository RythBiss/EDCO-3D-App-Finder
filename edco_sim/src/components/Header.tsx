import React from 'react'
import Logo from '/edco-logo.svg'

export default function Header() {
  return (
    <nav className="navbar header shadow z-1">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">
                <img src={'https://www.edcoinc.com/wp-content/uploads/2023/06/Logo.png'} alt="Logo" height="38" />
            </a>
        </div>
    </nav>
  )
}