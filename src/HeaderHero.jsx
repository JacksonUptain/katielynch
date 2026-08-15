"use client";

import React, { useState } from "react";
import { Container, Row, Col, Offcanvas, Nav } from "react-bootstrap";
import {  List } from "react-bootstrap-icons"; // hamburger icon

import Link from "next/link";
import { pagePaths } from "./routes";

const HeaderHero = ({ image, title, description, currentPageName }) => {
  const [show, setShow] = useState(false);

  const restorePageScroll = () => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    document.documentElement.style.overflow = "";
  };

  const handleClose = () => {
    setShow(false);
    restorePageScroll();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      
      {currentPageName !== "Home" && (
        <>

      <div className="header-hero">
        
        <Container fluid className="p-0">
          <Row className="g-0 align-items-center">

            {/* LEFT IMAGE */}
            <Col md={3} className="image-col">
              <Link href="/" aria-label="Go to home page">
                <img src={image} alt={title} className="hero-image" />
              </Link>
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
              <button
                type="button"
                className="menu-button"
                onClick={handleShow}
                aria-label="Open navigation menu"
                aria-controls="offcanvasMenu"
                aria-expanded={show}
                aria-haspopup="dialog"
              >
                <List size={38} className="menu-icon" aria-hidden="true" />
              </button>
            </Col>

          </Row>

        </Container>
        
        
      </div>
      </>)}


          {currentPageName === "Home" && (
            <>
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
          className="d-flex justify-content-center align-items-center text-center"
        >
          <div className="home-hero-textbox ">
            <h1 className="home-hero-title">
              <span className="home-transforming-word">Transforming</span> students
              <br />
              into <span className="home-hero-emphasis">capable</span> and <span className="home-hero-emphasis">confident</span>
              <br />
              readers and writers
            </h1>
          </div>
        </Col>
      </Row>

      {/* HAMBURGER */}
      <div className="home-hero-hamburger d-flex justify-content-center align-items-center text-center">
        <button
          type="button"
          className="menu-button home-menu-button"
          onClick={handleShow}
          aria-label="Open navigation menu"
          aria-controls="offcanvasMenu"
          aria-expanded={show}
          aria-haspopup="dialog"
        >
          <List size={38} className="menu-icon text-dark" aria-hidden="true" />
        </button>
      </div>
    </Container>
  </div>
  </>
)}
        

      {/* OFFCANVAS MENU */}
     <Offcanvas
      show={show}
      onHide={handleClose}
      onExited={restorePageScroll}
      placement="end"
      id="offcanvasMenu"
      backdrop={true}
      scroll={false}
      enforceFocus
    >
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>
      <div className="d-flex flex-column align-items-center text-center">
        <h4 className="mb-1 offcanvas-menu-title">Menu</h4>
        <p className="mb-0 offcanvas-menu-subtitle">{currentPageName}</p>
      </div>
    </Offcanvas.Title>
  </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column" >
            <Link className="offcanvas-menu-link" href={pagePaths.home} onClick={handleClose}>Home</Link>
            <Link className="offcanvas-menu-link" href={pagePaths.about} onClick={handleClose}>About</Link>
            <Link className="offcanvas-menu-link" href={pagePaths.services} onClick={handleClose}>Educational Services</Link>
            <Link className="offcanvas-menu-link" href={pagePaths.blog} onClick={handleClose}>Resources</Link>
            <Link className="offcanvas-menu-link" href={pagePaths.essay} onClick={handleClose}>Student Showcase</Link>
            <Link className="offcanvas-menu-link" href={pagePaths.contact} onClick={handleClose}>Contact</Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>


      
    </>
  );
};

export default HeaderHero;
