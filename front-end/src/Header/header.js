






import React, { useEffect, useState } from 'react';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import cookie from 'js-cookie'
import { useSelector } from 'react-redux';

const Header =()=>{
  const handle3 = ()=>{
    cookie.remove('token')
    window.location = '/';
  }
  const [x,setx]=useState(cookie.get('token'));
  const attribute1 = useSelector(state => state.x2);
  const attribute2 = useSelector(state => state.x3);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="Header">
    <Navbar expand="lg">
      <Container>
      <button  className='btn btn-dark btn3100' onClick={handleShow}>
        <FontAwesomeIcon icon={faBars}/>
      </button>
        <Navbar.Brand className='header-brand' style={{color : 'white'}} href="/">PixelPoint</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <div className='header-search-div' style={{visibility : 'hidden'}}>
          <input type="search" className="search_query" placeholder="Enter your search term" />
          </div>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <div className='header-icons-div'>
            <div className='header-icons-div1' style={{display :  x!=null ? 'none' : ''}}>
            <NavLink className='header-icon' style={{color : 'white'}} href='/register'>Sign up</NavLink>
            <NavLink className='header-icon' style={{color : 'white'}} href='/login'>Sign in</NavLink>
            </div>
            <div className='header-icons-div2' style={{display :  x==null ? 'none' : ''}}>
            <div className='header-div-icons-circle' style={{display : attribute1.length > 0 && attribute2.length > 0 ? 'block' : 'none'}}>{attribute1.length < attribute2.length ? attribute1.length : attribute2.length}</div>   
            <NavLink className='header-cart-icon' href='/cart'><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><path fill="currentColor" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607l1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4a2 2 0 0 0 0-4h7a2 2 0 1 0 0 4a2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0a1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/></svg></NavLink>
            <NavLink className='header-favo-icon' href='/favorites'><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M18.494 3.801c2.095 1.221 3.569 3.7 3.504 6.592c-.081 3.61-2.89 6.794-7.679 9.638c-.71.422-1.458.969-2.319.969c-.845 0-1.625-.557-2.32-.97c-4.787-2.843-7.597-6.028-7.678-9.637c-.065-2.892 1.409-5.37 3.504-6.592C7.466 2.66 9.928 2.653 12 4.338c2.072-1.685 4.534-1.679 6.494-.537M17.487 5.53c-1.394-.812-3.136-.783-4.644.743a1.188 1.188 0 0 1-1.686 0c-1.508-1.526-3.25-1.555-4.644-.743c-1.444.842-2.56 2.628-2.511 4.82c.056 2.511 2.04 5.194 6.7 7.962c.408.243.834.554 1.298.683c.464-.129.89-.44 1.298-.683c4.66-2.768 6.644-5.45 6.7-7.963c.05-2.19-1.067-3.977-2.511-4.819"/></g></svg></NavLink>
            <NavLink onClick={handle3} className='header-log-icon' style={{fontWeight : 'bold',fontSize : '20px' , position : 'relative' , bottom : '8px' , left : '40px' }}>Logout</NavLink>
            </div>
          </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <div>
      <Offcanvas className='offcan' style={{width:'10%'}}  show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Brands</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavLink href='/dell'><svg style={{width:'70px'}} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M17.963 14.6V9.324h1.222v4.204h2.14v1.07h-3.362zm-9.784-3.288l2.98-2.292c.281.228.56.458.841.687l-2.827 2.14.611.535 2.827-2.216c.281.228.56.458.841.688a295.83 295.83 0 0 1-2.827 2.216l.61.536 2.83-2.295-.001-1.986h1.223v4.204h2.216v1.07h-3.362v-1.987c-.995.763-1.987 1.529-2.981 2.292l-2.981-2.292c-.144.729-.653 1.36-1.312 1.694-.285.147-.597.24-.915.276-.183.022-.367.017-.551.017H3.516V9.325H5.69a2.544 2.544 0 0 1 1.563.557c.454.36.778.872.927 1.43m-3.516-.917v3.21l.953-.001a1.377 1.377 0 0 0 1.036-.523 1.74 1.74 0 0 0 .182-1.889 1.494 1.494 0 0 0-.976-.766c-.166-.04-.338-.03-.507-.032h-.688zM11.82 0h.337a11.94 11.94 0 0 1 5.405 1.373 12.101 12.101 0 0 1 4.126 3.557A11.93 11.93 0 0 1 24 11.82v.36a11.963 11.963 0 0 1-3.236 8.033A11.967 11.967 0 0 1 12.182 24h-.361a11.993 11.993 0 0 1-4.145-.806 12.04 12.04 0 0 1-4.274-2.836A12.057 12.057 0 0 1 .576 15.67 12.006 12.006 0 0 1 0 12.181v-.361a11.924 11.924 0 0 1 1.992-6.396 12.211 12.211 0 0 1 4.71-4.172A11.875 11.875 0 0 1 11.82 0m-.153 1.23a10.724 10.724 0 0 0-6.43 2.375 10.78 10.78 0 0 0-3.319 4.573 10.858 10.858 0 0 0 .193 8.12 10.788 10.788 0 0 0 3.546 4.421 10.698 10.698 0 0 0 4.786 1.946c1.456.209 2.955.124 4.376-.26a10.756 10.756 0 0 0 5.075-3.062 10.742 10.742 0 0 0 2.686-5.28 10.915 10.915 0 0 0-.122-4.682 10.77 10.77 0 0 0-7.098-7.626 10.78 10.78 0 0 0-3.693-.525z"/></svg></NavLink>
          <NavLink></NavLink>
          <NavLink></NavLink>
          <NavLink></NavLink>
          <NavLink></NavLink>
        </Offcanvas.Body>
      </Offcanvas>
      </div>
    </div>
  );
}
export default React.memo(Header);


