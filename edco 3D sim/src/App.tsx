import './App.css'
import Logo from '/edco-logo.svg'
function App() {

  return (
    <>
      <nav className="navbar header shadow">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={Logo} alt="Logo" height="38" />
          </a>
        </div>
      </nav>
    </>
  )
}

export default App