import { Link } from "react-router-dom"

export const NavigationTutor = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <Link className='navbar-brand' to="">
              BookMyTutor
              </Link>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            
            <li>
              {/* <a href='#features' className='page-scroll'>
                Features
              </a> */}
              <Link to={{
    pathname: "/",
    hash: "#features",
  }}>
              Features
              </Link>
            </li>

            <li>
            <Link to={{
    pathname: "/",
    hash: "#about",
  }}>
              About
              </Link>
            </li>
            <li>
            <Link to={{
    pathname: "/",
    hash: "#team",
  }}>
              Team
              </Link>
            </li>
            <li>
            <Link to={{
    pathname: "/",
    hash: "#contact",
  }}>
              Contact Us
              </Link>
            </li>
            <li>
              <Link to="/teacher_form">
              Register as a Tutor
              </Link>
              {/* <a href='/teacher_form.jsx' className='page-scroll'>
                Register as a Tutor
              </a> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
