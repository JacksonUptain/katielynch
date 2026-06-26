import React, { useState } from "react";
import { Container, Row, Col, Offcanvas, Nav } from "react-bootstrap";
import {  List } from "react-bootstrap-icons"; // hamburger icon

import { Link } from 'react-router-dom';

const HeaderHero = ({ image, title, description, currentPageName }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
      {currentPageName !== "Home" && (
        <>

      <head><title>{currentPageName}</title></head>

      <div className="header-hero">
        
        <Container fluid className="p-0">
          <Row className="g-0 align-items-center">

            {/* LEFT IMAGE */}
            <Col md={3} className="image-col">
              <img src={image} alt={title} className="hero-image" onClick={() => window.location.href = '/'} />
            </Col>

            {/* CENTER TEXT */}
            <Col md={8} className="text-col d-flex flex-column justify-content-center">
              <div className="text-content">
                <h1 className="hero-title">{title}</h1>
                <p className="hero-description">{description}</p>
              </div>
            </Col>

            {/* RIGHT HAMBURGER */}
            <Col md={1} className="menu-col d-flex justify-content-center align-items-center">
              <List size={40} className="menu-icon" onClick={handleShow} />
            </Col>

          </Row>

        </Container>
        
        
      </div>
      </>)}


          {currentPageName === "Home" && (
            <>
            <head><title>Katie Lynch | Capturing Literacy </title></head>
  <div className="header-hero-home p-0 d-flex justify-content-center align-items-center text-center">
    <Container fluid className="p-0 margin-top">
      <Row className="g-0 h-100">
        {/* IMAGE LEFT */}
        <Col md={4} className="p-0 h-100 d-flex justify-content-center align-items-center text-center">
          <img src={image} alt={title} className="object-fit-cover"/>
        </Col>

        {/* TEXT CENTERED */}
        <Col
          md={8}
          
          className="d-flex justify-content-left align-items-center text-center"
        >
          <div className="home-hero-textbox ">
            <h1 className="home-hero-title">
              Transforming students
              <br />
              into <span style={{ color: "#188ee2" }}>capable</span> and <span style={{ color: "#188ee2" }}>confident</span>
              <br />
              readers and writers
            </h1>
          </div>
        </Col>
      </Row>

      {/* HAMBURGER */}
      <div className="home-hero-hamburger  d-flex justify-content-center align-items-center text-center">
        <List size={40} className="menu-icon text-dark" onClick={handleShow} />
      </div>
    </Container>
  </div>
  </>
)}
        

      {/* OFFCANVAS MENU */}
     <Offcanvas show={show} onHide={handleClose} placement="end" id="offcanvasMenu">
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>
      {/* Use a div to group titles cleanly */}
      <div className="d-flex flex-column">
        <h4 className="mb-0">Navigation Menu</h4>
        <h5 className="text-muted mt-1">{currentPageName}</h5>
      </div>
    </Offcanvas.Title>
  </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column" >
            <Link to="/" onClick={handleClose}>Home</Link>
            
            <Link to="/" state={{ scrollTo: "bio" }} onClick={handleClose}>
                About
            </Link>
            
            <Link to="/services" onClick={handleClose}>Services</Link>
            <Link to="/blog" onClick={handleClose}>Blog</Link>
            <Link to="/essay" onClick={handleClose}>Essay of the Month</Link>
            <Link to="/contact" onClick={handleClose}>Contact</Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>


      
    </>
  );
};

export default HeaderHero;