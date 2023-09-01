import React from 'react'
import Logo from '/edco-logo.svg'

export default function Header() {
  return (
    <nav className="navbar header shadow z-1">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">
                <img src={Logo} alt="Logo" height="38" />
            </a>
        </div>
    </nav>
  )
}
