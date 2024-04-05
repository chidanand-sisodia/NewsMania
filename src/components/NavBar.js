import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    // Initialize the state for collapse
    this.state = {
      isNavCollapsed: true,
    };
  }

  // Function to toggle the collapse state
  handleNavCollapse = () => {
    this.setState(prevState => ({ isNavCollapsed: !prevState.isNavCollapsed }));
  }
  closeNav = () => {
    this.setState({ isNavCollapsed: true });
  }

  render() {
    const { isNavCollapsed } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand ms-5" to="/">NewsMania</Link>
            <button className="navbar-toggler" type="button" onClick={this.handleNavCollapse}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                <li className="nav-item nav-link-hover"><Link className="nav-link ms-5" aria-current="page" to="/">Home</Link></li>
                <li className="nav-item nav-link-hover"><Link className="nav-link" to="/business">Business</Link></li>
                <li className="nav-item nav-link-hover"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                <li className="nav-item nav-link-hover"><Link className="nav-link" to="/health">Health</Link></li>
                <li className="nav-item nav-link-hover"><Link className="nav-link" to="/science">Science</Link></li>
                <li className="nav-item nav-link-hover"><Link className="nav-link" to="/sports">Sports</Link></li>
                <li className="nav-item nav-link-hover"><Link className="nav-link" to="/technology">Technology</Link></li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;








// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
//   Router,
//   Routes,
// } from "react-router-dom";
// import './NavBar.css';

// export class NavBar extends Component {
//   static propTypes = {

//   }

//   render() {
//     return (
//       <div>
//         <nav className="navbar  navbar-expand-lg navbar-dark bg-dark fixed-top">
//         <div className="container-fluid">
//             <Link className="navbar-brand ms-5" to="/">NewsMania</Link>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
//                 <li className="nav-item nav-link-hover"><Link className="nav-link ms-5" aria-current="page" to="/">Home</Link></li>
//                 <li className="nav-item nav-link-hover"><Link className="nav-link" to="/business">Business</Link></li>
//                 <li className="nav-item nav-link-hover"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
//                 <li className="nav-item nav-link-hover"><Link className="nav-link" to="/">General</Link></li>
//                 <li className="nav-item nav-link-hover"><Link className="nav-link" to="/health">Health</Link></li>
//                 <li className="nav-item nav-link-hover"><Link className="nav-link" to="/science">Science</Link></li>
//                 <li className="nav-item nav-link-hover"><Link className="nav-link" to="/sports">Sports</Link></li>
//                 <li className="nav-item nav-link-hover"><Link className="nav-link" to="/technology">Technology</Link></li>
              
//             </ul>
//             <form className="d-flex" role="search">
//                 <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                 <button className="btn btn-outline-success" type="submit">Search</button>
//             </form>
//             </div>
//         </div>
//         </nav>
//       </div>
//     )
//   }
// }

// export default NavBar
