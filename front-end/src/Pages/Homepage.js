







import React from 'react';
import '../App.css';
import { TypeAnimation } from 'react-type-animation';
import { Container } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-bootstrap';
import { useState } from 'react';
import cookie from 'js-cookie'

function Homepage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(cookie.get('token'));
  
  return (
    <div className='homepage1'>
      <Container>
      <h2 style={{position : 'relative' , top:'70px'}}>
      <TypeAnimation
      sequence={[
        'NEW ECOMMERCE EXPERIENCE Summer sale 10% OFF',
        3000,
        '',
        1000,
        'REGISTER AND GET 10% OFF INCLUDES SALE ITEMS',
        3000,
        '',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{fontSize :'1.5em' , color : 'white'}}
      repeat={Infinity}
      />
      </h2>
      </Container>
      <button className='btn btn-light btn6100' onClick={handleShow}>
        Get started
      </button>
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
  );
}
export default React.memo(Homepage);