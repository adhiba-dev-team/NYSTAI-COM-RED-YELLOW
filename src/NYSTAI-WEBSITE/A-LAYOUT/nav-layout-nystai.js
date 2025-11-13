import AsyncImage from "react-async-image";
import LazyImage from "../common/LazyImage";
import React, { useRef, useEffect } from "react";
import "./navbar-layout.css";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import $ from "jquery";
import {
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBuildingColumns,
  faCarBurst,
  faCircleInfo,
  faHandshake,
  faAngleDown,
  faHouseSignal,
  faIndustry,
  faPlaceOfWorship,
  faSchool,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAngleDoubleUp,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faBlog } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import LogoutButton from "./logoutbutton";


import Drawer from "@mui/material/Drawer";
import { faChevronDown, faChevronUp, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";




const Layout = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  $(document).ready(function () {
    $(".navbar-light .dmenu").hover(
      function () {
        $(this).find(".sm-menu").first().stop(true, true).slideDown(150);
      },
      function () {
        $(this).find(".sm-menu").first().stop(true, true).slideUp(105);
      }
    );
  });

  $(document).ready(function () {
    $(".megamenu").on("click", function (e) {
      e.stopPropagation();
    });
  });

  const [hovered, setHovered] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const openNav = () => {
    setNavOpen(true);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  function scrollTop() {
    if ($(window).scrollTop() > 200) {
      $(".backToTopBtn").addClass("active");
    } else {
      $(".backToTopBtn").removeClass("active");
    }
  }
  $(function () {
    scrollTop();
    $(window).on("scroll", scrollTop);

    $(".backToTopBtn").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1);
      return false;
    });
  });

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    const navbar = document.querySelector("#navbar-solution-nys-secnav ");
    if (navbar) {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        navbar.style.top = "0";
      } else {
        navbar.style.top = "-800px";
      }
    }
  }

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
        closeDropdown1();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isOpen1, setIsOpen1] = useState(false);

  const closeDropdown1 = () => {
    setIsOpen1(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const [isOpen2, setIsOpen2] = useState(false);

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  const closeDropdown2 = () => {
    setIsOpen2(false);
  };

  const [stickyNavVisible, setStickyNavVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setStickyNavVisible(true);
      } else {
        setStickyNavVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSolutionsOpen(false);
  };

  const toggleSolutions = () => {
    setSolutionsOpen(!solutionsOpen);
  };


  return (
    <>
      {/* Desktop Navbar Start */}
      <div className="body-nav">
        <div className=" col-12  mainnav-nystai ">
          <div className="logo-div-nystai col-lg-2 col-md-2">
            <Link to="/">
              {" "}
              <AsyncImage
                src="/IMAGES-VIDEOS/A-IMG-HOME-LAYOUT/common/nystai-main-logo.png"
                className="img-fluid logo-nystai active"
                alt="NYSTAILOGO"
              />
            </Link>
          </div>
          <div className="col-lg-8 col-md-8 navdiv-nystai-main">
            <div className=" navdiv-nystai">
              <div className=" icon-number-div-nystai-main">
                <div className=" icon-number-div-nystai">
                  <div className="social-icon-nav-nystai">
                    <a
                      href="https://www.instagram.com/nystaiiot?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        style={{ color: "#ee890a" }}
                        className="icon-scocial-text-nystai"
                      />
                    </a>
                    <a
                      href="https://wa.me/+918189977700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        style={{ color: "#ee890a" }}
                        className="icon-scocial-text-nystai"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nystai-iot-leading-aiot-security-solutions-a18a07339"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        style={{ color: "#ee890a" }}
                        className="icon-scocial-text-nystai"
                      />
                    </a>
                    <p>
                      <a href="http://www.youtube.com/@NYSTAI" target="-blank">
                        <FontAwesomeIcon
                          icon={faYoutube}
                          style={{ color: "#ee890a" }}
                          className="icon-scocial-text-nystai"
                        />
                      </a>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" nav-topics-nystai-home" ref={dropdownRef}>
                <h6 class="text-nav-topics-nystai">
                  {" "}
                  <Link
                    to="nystai-product"
                    className={`text-nav-topics-nystai ${isActive("/nystai-product")}`}
                  >
                    PRODUCTS{" "}
                  </Link>
                </h6>
                <h6 class="text-nav-topics-nystai">
                  <div className="dropdown">
                    <a className="dropdown-trigger" onClick={toggleDropdown2}>
                      INTEGRATED SOLUTIONS
                      <span className={`arrow ms-2 ${isOpen2 ? "open" : ""}`}>
                        <FontAwesomeIcon icon={faAngleDown} />
                      </span>
                    </a>
                    {isOpen2 && (
                      <>
                        <div
                          className="dropdown-content pt-3 pb-3"
                          onClick={closeDropdown2}
                        >
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faHouseSignal}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-home"
                              className={` ${isActive("/nystai-solution-education")}`}
                            >
                              SMARTHOME
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faIndustry}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-Industrial"
                              className={` ${isActive("/nystai-solution-education")}`}
                            >
                              INDUSTRIAL
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon icon={faSchool} className="me-3" />
                            <Link
                              to="nystai-solution-education"
                              className={` ${isActive("/nystai-solution-education")}`}
                            >
                              EDUCATION
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            {" "}
                            <FontAwesomeIcon
                              icon={faPlaceOfWorship}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-worship"
                              className={` ${isActive("nystai-solution-worship")}`}
                            >
                              WORSHIP
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faCarBurst}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-vms"
                              className={` ${isActive("/nystai-solution-vms")}`}
                            >
                              VMS
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faWarehouse}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-Warehouse"
                              className={` ${isActive("/nystai-solution-education")}`}
                            >
                              WAREHOUSE
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faIndustry}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-Hospital"
                              className={` ${isActive("/nystai-solution-Hospital")}`}
                            >
                              HOSPITAL
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faBuildingColumns}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-banking"
                              className={` ${isActive("/nystai-solution-banking")}`}
                            >
                              BANKING
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            {" "}
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-retail"
                              className={` ${isActive("/nystai-solution-retail")}`}
                            >
                              RETAIL
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faHandshake}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-parking"
                              className={` ${isActive("/nystai-solution-parking")}`}
                            >
                              PARKING IOT SOLUTION
                            </Link>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </h6>
                <h6 className=" text-nav-topics-nystai">
                  <Link
                    to="nystai-PLAN"
                    className={`text-nav-topics-nystai ${isActive("/nystai-PLAN")}`}
                  >
                    PROTECT PLAN
                  </Link>
                </h6>
                <h6 className=" text-nav-topics-nystai">
                  <Link
                    to="nystai-SERVICE"
                    className={`text-nav-topics-nystai ${isActive("/nystai-SERVICE")}`}
                  >
                    SERVICE
                  </Link>
                </h6>
                <h6 className=" text-nav-topics-nystai">
                  <Link
                    to="nystai-support"
                    className={`text-nav-topics-nystai ${isActive("/nystai-support")}`}
                  >
                    SUPPORT
                  </Link>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 right-ssl-icon-nystai ">
            <div className="right-ssl-icon-nystai-number">
              <a
                href="https://wa.me/+918189977700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ color: "#000" }}
                  className="me-2"
                />
              </a>
              <a className="text-number-nystai" href="tel:+91 81899 77700">
                +91 81899 77700
              </a>
            </div>
            <div className="" style={{ display: "flex", justifyContent: "center" }}>
              <LogoutButton />
            </div>

          </div>
          <p>
            <button class="backToTopBtn">
              <FontAwesomeIcon icon={faAngleDoubleUp} className="icon-top" />
            </button>
          </p>
        </div>

        <section
          id="sticky_nav"
          style={{
            position: "fixed",
            top: stickyNavVisible ? "0" : "-150px",
            transition: "top 0.3s",
            padding: " 10px",
          }}
        >
          <div
            id="navbar-solution-nys-secnav"
            style={{ outline: "none", border: "none" }}
          >
            {/* Second Nav bar start*/}
            <nav class="container d-flex Second-Nav-bar-nys ">
              <div className="col-lg-2 Second-Nav-bar-logo-nys">
                <Link to="/">
                  <img
                    src="/IMAGES-VIDEOS/A-IMG-HOME-LAYOUT/full-logo-nys.png"
                    className="img-fluid"
                    alt="NYSLOGO"
                    style={{ height: "35px" }}
                  />
                </Link>
              </div>
              <div
                className="col-lg-8 d-flex Second-Nav-bar-heading-nys"
                style={{ justifyContent: "space-around", alignItems: "center" }}
                ref={dropdownRef}
              >
                {/* <div className="d-flex" style={{ justifyContent: "space-around", alignItems: "center" }} ref={dropdownRef}> */}
                <h6 class="text-nav-topics-nystai">
                  {" "}
                  <Link
                    to="nystai-product"
                    className={`text-nav-topics-nystai ${isActive("/nystai-product")}`}
                  >
                    PRODUCTS{" "}
                  </Link>
                </h6>
                <h6 class="text-nav-topics-nystai">
                  <div className="dropdown">
                    <a className="dropdown-trigger" onClick={toggleDropdown}>
                      INTEGRATED SOLUTIONS
                      <span className={`arrow ms-2 ${isOpen ? "open" : ""}`}>
                        <FontAwesomeIcon icon={faAngleDown} />
                      </span>
                    </a>
                    {isOpen && (
                      <>
                        <div
                          className="dropdown-content pt-3 pb-3"
                          onClick={closeDropdown}
                        >
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faHouseSignal}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-home"
                              className={` ${isActive("/nystai-solution-education")}`}
                            >
                              SMARTHOME
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faIndustry}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-Industrial"
                              className={` ${isActive("/nystai-solution-education")}`}
                            >
                              INDUSTRIAL
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon icon={faSchool} className="me-3" />
                            <Link
                              to="nystai-solution-education"
                              className={` ${isActive("/nystai-solution-education")}`}
                            >
                              EDUCATION
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            {" "}
                            <FontAwesomeIcon
                              icon={faPlaceOfWorship}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-worship"
                              className={` ${isActive("/nystai-solution-education")}`}
                            >
                              WORSHIP
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faCarBurst}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-vms"
                              className={` ${isActive("/nystai-solution-vms")}`}
                            >
                              VMS
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faWarehouse}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-Warehouse"
                              className={` ${isActive("/nystai-solution-education")}`}
                            >
                              WAREHOUSE
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>

                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faIndustry}
                              className="me-3"
                            />{" "}
                            <Link
                              to="nystai-solution-Hospital"
                              className={` ${isActive("/nystai-solution-Hospital")}`}
                            >
                              HOSPITAL
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faBuildingColumns}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-banking"
                              className={` ${isActive("/nystai-solution-banking")}`}
                            >
                              BANKING
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-retail"
                              className={` ${isActive("/nystai-solution-retail")}`}
                            >
                              RETAIL
                            </Link>
                          </a>
                          <div class="dropdown-divider ms-3 me-3"></div>
                          <a className="dropdown-content-a">
                            <FontAwesomeIcon
                              icon={faHandshake}
                              className="me-3"
                            />
                            <Link
                              to="nystai-solution-parking"
                              className={` ${isActive("/nystai-solution-parking")}`}
                            >
                              PARKING IOT SOLUTION
                            </Link>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </h6>
                <h6 className=" text-nav-topics-nystai">
                  {" "}
                  <Link
                    to="nystai-PLAN"
                    className={`text-nav-topics-nystai ${isActive("/nystai-PLAN")}`}
                  >
                    PROTECT PLAN
                  </Link>
                </h6>
                <h6 className=" text-nav-topics-nystai">
                  {" "}
                  <Link
                    to="nystai-SERVICE"
                    className={`text-nav-topics-nystai ${isActive("/nystai-SERVICE")}`}
                  >
                    SERVICE
                  </Link>{" "}
                </h6>
                <h6 className=" text-nav-topics-nystai">
                  <Link
                    to="nystai-support"
                    className={`text-nav-topics-nystai ${isActive("/nystai-support")}`}
                  >
                    SUPPORT
                  </Link>
                </h6>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-3 d-flex justify-content-end align-items-center Second-Nav-bar-icon-nys">
                <FontAwesomeIcon icon={faPhone} className="me-1" />
                <a className="text-number-nystai" href="tel:+91 81899 77700">
                  +91 81899 77700
                </a>
              </div>
            </nav>
          </div>
        </section>
      </div>
      {/* Desktop Navbar end */}

      {/* mobile navbar start */}
      <div className="nav-mobile-nystai sticky-top">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div>
              <Link to="/nystai-home">
                <img
                  src="/IMAGES-VIDEOS/A-IMG-HOME-LAYOUT/common/nystai-main-logo.png"
                  className="img-fluid logo-nystai active"
                  alt="NYSTAILOGO"
                />
              </Link>
            </div>
            <div>
              <span>
                <p onClick={toggleDrawer(true)} className="close-mobileinav-icon mb-0" style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faBars} />
                </p>
              </span>
            </div>
          </div>
        </nav>

        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: '320px',
              backgroundColor: '#fff',
            }
          }}
        >
          <div className="drawer-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Close Button */}
            <div style={{ padding: '20px 0', textAlign: 'right', borderBottom: '1px solid #eee' }}>
              <FontAwesomeIcon
                icon={faTimes}
                onClick={toggleDrawer(false)}
                style={{ fontSize: '24px', cursor: 'pointer', color: '#333' }}
              />
            </div>

            {/* Navigation Links */}
            <div style={{ flex: 1, padding: '10px 0' }}>
              <div className="nav-link" style={{ padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
                <Link to="/nystai-product" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                  PRODUCTS
                </Link>
              </div>

              {/* Integrated Solutions with Dropdown */}
              <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                <div
                  onClick={toggleSolutions}
                  style={{
                    padding: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                    INTEGRATED SOLUTIONS
                  </span>
                  <FontAwesomeIcon
                    icon={solutionsOpen ? faChevronUp : faChevronDown}
                    style={{ color: '#ee890a', fontSize: '14px' }}
                  />
                </div>

                {/* Dropdown Content */}
                {solutionsOpen && (
                  <>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px', marginBottom: "2px" }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-home" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          SMARTHOME
                        </Link>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px', marginBottom: "2px" }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-Industrial" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          INDUSTRIAL
                        </Link>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px', marginBottom: "2px" }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-education" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          EDUCATION
                        </Link>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px', marginBottom: "2px" }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-worship" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          WORSHIP
                        </Link>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px', marginBottom: "2px" }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-vms" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          VMS
                        </Link>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px', marginBottom: "2px" }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-Warehouse" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          WAREHOUSE
                        </Link>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px', marginBottom: "2px" }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-Hospital" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          HOSPITAL
                        </Link>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px', marginBottom: "2px" }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-banking" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          BANKING
                        </Link>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px', marginBottom: "2px" }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-retail" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          RETAIL
                        </Link>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', paddingLeft: '20px' }}>
                      <div style={{ padding: '12px 20px' }}>
                        <Link to="/nystai-solution-parking" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>
                          PARKING IOT SOLUTION
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="nav-link" style={{ padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
                <Link to="/nystai-PLAN" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                  PROTECT PLAN
                </Link>
              </div>

              <div className="nav-link" style={{ padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
                <Link to="/nystai-SERVICE" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                  SERVICE
                </Link>
              </div>

              <div className="nav-link" style={{ padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
                <Link to="/nystai-support" onClick={closeDrawer} style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                  SUPPORT
                </Link>
              </div>
            </div>

            {/* Phone Number at Bottom */}
            <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
              <div className="right-ssl-icon-nystai-number">
                <a
                  href="tel:+918189977700"
                  style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center' }}
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: "#ee890a", fontSize: "20px", marginRight: '10px' }}
                  />
                  +91 81899 77700
                </a>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
      {/* mobile navbar end */}

      <Outlet />
    </>
  );
};

export default Layout;
