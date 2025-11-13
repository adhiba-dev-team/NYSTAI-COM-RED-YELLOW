import AsyncImage from "react-async-image";
import LazyImage from "../common/LazyImage";
import React, { useEffect, useState } from "react";
import "./edusolution.css";
import Footerproduct from "../A-LAYOUT/footer";
import { products } from "../C-PRODUCT LAYOUT/datass.js";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBuildingColumns,
  faCarBurst,
  faCircleInfo,
  faHandshake,
  faHome,
  faHouse,
  faHouseSignal,
  faIndustry,
  faPlaceOfWorship,
  faSchool,
  faThunderstorm,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

import Drawer from "@mui/material/Drawer";

gsap.registerPlugin(ScrollTrigger);

export default function Industrial() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    [2].includes(product.category)
  );

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [activeSection, setActiveSection] = useState("Overview");

  useEffect(() => {
    const sections = document.querySelectorAll(".page-section");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('.sub-nav-edu-solu')?.offsetHeight || 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
      setOpen(false);
    }
  };

  const [activeTab, setActiveTab] = useState(1);
  const [fade, setFade] = useState(true);

  const handleTabClick = (tabNumber) => {
    setFade(false);
    setTimeout(() => {
      setActiveTab(tabNumber);
      setFade(true);
    }, 300);
  };

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  return (
    <>
      <header className="placeholder-section">
        <div class=" card ">
          <AsyncImage
            className="card-img"
            src={"/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/industrialsolution.webp"}
            alt="Card image"
          />
        </div>
      </header>

      <Navbar collapseOnSelect expand="lg" className="sub-nav-edu-solu">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="m-0"
            onClick={toggleDrawer(true)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* DESKTOP ROUTING */}
            <Nav className="m-auto sub-nav-desktop-nys">
              <Nav.Link>
                <a
                  className={`menu-item-link ${activeSection === "Overview" ? "active" : ""}`}
                  onClick={() => handleScrollToSection("Overview")}
                >
                  Overview
                </a>
              </Nav.Link>
              <Nav.Link>
                <a
                  className={`menu-item-link ${activeSection === "What we offer" ? "active" : ""}`}
                  onClick={() => handleScrollToSection("What we offer")}
                >
                  What we offer
                </a>
              </Nav.Link>
              <Nav.Link>
                <a
                  className={`menu-item-link ${activeSection === "Features" ? "active" : ""}`}
                  onClick={() => handleScrollToSection("Features")}
                >
                  Features
                </a>
              </Nav.Link>
              <Nav.Link>
                <a
                  className={`menu-item-link ${activeSection === "Product display" ? "active" : ""}`}
                  onClick={() => handleScrollToSection("Product display")}
                >
                  Product display
                </a>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MOBILE DRAWER */}
      <Container className="sub-nav-mob-drawer-nys">
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div className="mt-3" style={{ paddingLeft: "7px" }}>
            <a onClick={() => handleScrollToSection("Overview")}>
              <p style={{ color: "#ffB000", cursor: "pointer" }}>
                <FontAwesomeIcon
                  style={{ color: "#8c8c8c" }}
                  icon={faHome}
                  className="me-3"
                />
                Overview
              </p>
            </a>
            <a onClick={() => handleScrollToSection("What we offer")}>
              <p style={{ color: "#ffB000", cursor: "pointer" }}>
                <FontAwesomeIcon
                  style={{ color: "#8c8c8c" }}
                  icon={faHandshake}
                  className="me-3"
                />
                What we offer
              </p>
            </a>
            <a onClick={() => handleScrollToSection("Features")}>
              <p style={{ color: "#ffB000", cursor: "pointer" }}>
                <FontAwesomeIcon
                  style={{ color: "#8c8c8c" }}
                  icon={faCircleInfo}
                  className="me-3"
                />
                Features
              </p>
            </a>
            <a onClick={() => handleScrollToSection("Product display")}>
              <p style={{ color: "#ffB000", cursor: "pointer" }}>
                <FontAwesomeIcon
                  style={{ color: "#8c8c8c" }}
                  icon={faWarehouse}
                  className="me-3"
                />
                Product display
              </p>
            </a>
          </div>
        </Drawer>
      </Container>

      <section id="main-content" className="page-sections">
        <section className="container page-section mt-5 mb-5" id="Overview">
          <div className="mini-block-statement w-clearfix">
            <h3 className="heading-34"> NYSTAI'S INDUSTRY SOLUTIONS</h3>
            <p className="text-block-60">
              In industries, automation, security, and energy efficiency are
              critical for smooth operations and safeguarding assets. NYSTAI's
              industrial solutions integrate CCTV cameras, alarms, and
              automation systems into a wired setup, ensuring reliable
              performance in large-scale environments. Coupled with
              solar-powered options, our solutions not only enhance security but
              also improve energy efficiency and sustainability. With real-time
              monitoring and proactive systems, businesses can maintain control,
              prevent issues, and optimize their operations, all from a central
              platform.
            </p>
          </div>

          <div className="card-wrapper card-deck-custom row mt-5">

            <div className="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div className="card">
                <center>
                  <AsyncImage
                    className="card-img-top"
                    src={
                      "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/Industrial-images/indus-four-cards-1.png"
                    }
                    alt="Card image cap"
                  />
                </center>
                <div className="card-body">
                  <h4 className="card-title">Resilience</h4>
                  <p className="card-text">
                    Reliable security for industrial operations
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div className="card">
                <center>
                  <AsyncImage
                    className="card-img-top"
                    src={
                      "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/Industrial-images/indus-four-cards-2.png"
                    }
                    alt="Card image cap"
                  />
                </center>
                <div className="card-body">
                  <h4 className="card-title">Efficiency</h4>
                  <p className="card-text">
                    Centralized control for efficient management
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div className="card">
                <center>
                  <AsyncImage
                    className="card-img-top"
                    src={
                      "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/Industrial-images/indus-four-cards-3.png"
                    }
                    alt="Card image cap"
                  />
                </center>
                <div className="card-body">
                  <h4 className="card-title">Eco-friendly</h4>
                  <p className="card-text">
                    Smart innovations boost performance
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div className="card">
                <center>
                  <AsyncImage
                    className="card-img-top"
                    src={
                      "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/Industrial-images/indus-four-cards-4.png"
                    }
                    alt="Card image cap"
                  />
                </center>
                <div className="card-body">
                  <h4 className="card-title">Innovation</h4>
                  <p className="card-text">
                    Solar-powered for sustainable performance
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="page-section Whatweoffer  mb-5" id="What we offer">
          <section className="tab-indut-solu">
            <section className="bg-tabs-nys">
              <div className="text-center pt-3 mb-lg-3">
                <h3 class="rrmc-article-desc-title">What we offer</h3>
              </div>
              <div className="tab-heading-nys">
                <div className="tabs-nys">
                  <input
                    type="radio"
                    id="radio-1"
                    name="tabs"
                    checked={activeTab === 1}
                    onChange={() => handleTabClick(1)}
                  />
                  <label className="tab-3heading-nys" htmlFor="radio-1">
                    CHALLENGES
                  </label>
                  <input
                    type="radio"
                    id="radio-2"
                    name="tabs"
                    checked={activeTab === 2}
                    onChange={() => handleTabClick(2)}
                  />
                  <label className="tab-3heading-nys" htmlFor="radio-2">
                    SOLUTION
                  </label>
                  <input
                    type="radio"
                    id="radio-3"
                    name="tabs"
                    checked={activeTab === 3}
                    onChange={() => handleTabClick(3)}
                  />
                  <label className="tab-3heading-nys" htmlFor="radio-3">
                    OUR SOLUTION
                  </label>
                  <span className="glider"></span>
                </div>
              </div>
              <div
                className={`content-container container ${fade ? "fade-in" : "fade-out"}`}
              >
                {activeTab === 1 && (
                  <div className="">
                    <div className="row">
                      <div className="col-lg-6">
                        <AsyncImage
                          src={
                            "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/industry (3).webp"
                          }
                          style={{ borderRadius: "10px" }}
                          alt="tab-nys-1"
                          className="img-fluid what-we-offer-3image"
                        />
                      </div>
                      <div className="col-lg-6 tab-contents-nys">
                        <h1>
                          Challenges Without CCTV, Alarms, and Automation in
                          Industries
                        </h1>

                        <div className="">
                          <p>
                            <span>
                              <FontAwesomeIcon
                                icon={faHouse}
                                style={{ color: "#000" }}
                                className="me-4"
                              />
                            </span>
                            Industries without advanced CCTV, alarms, and
                            automation face security and operational
                            inefficiencies.
                          </p>
                          <hr />
                          <p>
                            <span>
                              <FontAwesomeIcon
                                icon={faWarehouse}
                                style={{ color: "#000" }}
                                className="me-4"
                              />
                            </span>
                            Outdated systems lead to monitoring gaps, delayed
                            responses, and vulnerabilities in safeguarding
                            equipment.
                          </p>
                          <hr />
                          <p>
                            <span>
                              <FontAwesomeIcon
                                icon={faThunderstorm}
                                style={{ color: "#000" }}
                                className="me-4"
                              />
                            </span>{" "}
                            Without real-time alerts and centralized control,
                            businesses react to problems <br /> instead of
                            preventing them, resulting in downtime, safety
                            hazards,
                            <br /> and reduced productivity.
                          </p>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="">
                    <div className="row">
                      <div className="col-lg-6">
                        <AsyncImage
                          src={
                            "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/industry (1).webp"
                          }
                          style={{ borderRadius: "10px" }}
                          alt="tab-nys-2"
                          className="img-fluid what-we-offer-3image"
                        />
                      </div>
                      <div className="col-lg-6 tab-contents-nys">
                        <h1>
                          How These Solutions Provide Benefits for Industries
                        </h1>

                        <div className="">
                          <p>
                            <span>
                              <FontAwesomeIcon
                                icon={faHouse}
                                style={{ color: "#000" }}
                                className="me-4"
                              />
                            </span>
                            Industrial CCTV cameras, wired alarms, and
                            automation ensure consistent monitoring and control.
                          </p>
                          <hr />
                          <p>
                            <span>
                              <FontAwesomeIcon
                                icon={faIndustry}
                                style={{ color: "#000" }}
                                className="me-4"
                              />
                            </span>
                            Solar-powered systems cut energy costs, offering
                            sustainable power.
                          </p>
                          <hr />
                          <p>
                            <span>
                              <FontAwesomeIcon
                                icon={faWarehouse}
                                style={{ color: "#000" }}
                                className="me-4"
                              />
                            </span>{" "}
                            With real-time notifications and live video feeds,
                            industries can quickly address emergencies, optimize
                            resource management, and enhance operational
                            efficiency through reliable, integrated systems.
                          </p>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="">
                    <div className="row">
                      <div className="col-lg-6">
                        <AsyncImage
                          src={
                            "../IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/industry (2).webp"
                          }
                          style={{ borderRadius: "10px" }}
                          alt="tab-nys-3"
                          className="img-fluid what-we-offer-3image"
                        />
                      </div>
                      <div className="col-lg-6 tab-contents-nys">
                        <h1>
                          How NYSTAI Products Resolve These Issues for
                          Industries
                        </h1>
                        <div className="">
                          <p>
                            <span>
                              <FontAwesomeIcon
                                icon={faHouse}
                                style={{ color: "#000" }}
                                className="me-4"
                              />
                            </span>
                            NYSTAI's wired CCTV and alarm systems ensure
                            reliability in large-scale operations.
                          </p>
                          <hr />
                          <p>
                            <span>
                              <FontAwesomeIcon
                                icon={faIndustry}
                                style={{ color: "#000" }}
                                className="me-4"
                              />
                            </span>{" "}
                            Our centralized control simplifies management, while
                            solar-powered options reduce energy costs.
                          </p>
                          <hr />
                          <p>
                            <span>
                              <FontAwesomeIcon
                                icon={faWarehouse}
                                style={{ color: "#000" }}
                                className="me-4"
                              />
                            </span>{" "}
                            With real-time notifications, live feeds, and
                            automation, NYSTAI products help prevent issues,
                            ensuring continuous, efficient, and secure
                            operations across industrial environments.
                          </p>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </section>
        </section>

        <section
          className="page-section mt-5 mb-5 Features-education"
          id="Features"
        >
          <section class="creative-cards style-one">
            <center className="page-section mt-5 mb-5">
              <video
                src={"/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/indu-video-1.mp4"}
                loop
                muted
                autoPlay
                className="img-fluid"
              />
            </center>
          </section>
        </section>

        <main
          className="container page-section Product-display mb-5"
          id="Product display"
        >
          <div className="text-center">
            <h3 class="rrmc-article-desc-title mb-5">PRODUCT DISPLAY</h3>
          </div>
          <div className="prod-row-card-nys">
            {filteredProducts.map((product) => (
              <div className="prod-column-card-nys mb-2" key={product.id}>
                <div
                  className="card pro_card-des"
                  onClick={() => handleCardClick(product)}
                >
                  <div className="image-container">
                    <AsyncImage
                      alt="Product"
                      src={product.image}
                      className="img-fluid rounded thumbnail-image"
                    />
                  </div>
                  <div className="card-body product-detail-container">
                    <h6>{product.title}</h6>
                    <p>{product.Cardsingleword}</p>
                    <p className="dress-name">{product.Cardthreeword}</p>
                    <div className="d-flex justify-content-between align-items-end btn-modaln">
                      <h5 className="dress-name1">{product.ModelNumber}</h5>
                      <div className="product-detail">
                        <button className="btn pulse">MORE INFO</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {modalOpen && selectedProduct && (
            <div className="modal-overlay" onClick={handleCloseModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <section className="modal-pro">
                  <div class="card-wrapper ">
                    <div class="card">
                      {/* Close Button */}
                      <button
                        onClick={handleCloseModal}
                        className="close-button"
                        aria-label="Close Modal"
                      >
                        &times;
                      </button>
                      <div class="product-imgs">
                        <div class="img-display">
                          <div class="img-showcase">
                            <AsyncImage
                              src={selectedProduct.modalimage1}
                              alt="shoe image /"
                            />
                          </div>
                        </div>
                        <div class="img-select">
                          <div class="img-item">
                            <a data-id="1">
                              <AsyncImage
                                src={selectedProduct.modalimage1}
                                alt="shoe image /"
                              />
                            </a>
                          </div>
                          <div class="img-item">
                            <a data-id="2">
                              <AsyncImage
                                src={selectedProduct.modalimage1}
                                alt="shoe image /"
                              />
                            </a>
                          </div>
                          <div class="img-item">
                            <a data-id="3">
                              <AsyncImage
                                src={selectedProduct.modalimage1}
                                alt="shoe image /"
                              />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div class="product-content">
                        <h2 class="product-title">{selectedProduct.title}</h2>
                        <h5 className="mb-3 smart-features-head">
                          Smart Features:
                        </h5>
                        <div className="social-links">
                          <div>
                            <a>
                              <AsyncImage
                                src="/IMAGES-VIDEOS/B-IMG-PRODUCT-LAYOUT/icons/cloud-storage.webp"
                                className="img-fluid"
                              />
                            </a>
                            <p>Cloud</p>
                          </div>
                          <div>
                            <a>
                              <AsyncImage
                                src="/IMAGES-VIDEOS/B-IMG-PRODUCT-LAYOUT/icons/peri-zoning.webp"
                                className="img-fluid"
                              />
                            </a>
                            <p>AI</p>
                          </div>
                          <div>
                            <a>
                              <AsyncImage
                                src="/IMAGES-VIDEOS/B-IMG-PRODUCT-LAYOUT/icons/hd_subscription.webp"
                                className="img-fluid"
                              />
                            </a>
                            <p>Video</p>
                          </div>
                          <div>
                            <a>
                              <AsyncImage
                                src="/IMAGES-VIDEOS/B-IMG-PRODUCT-LAYOUT/icons/motion_senstivity_control.webp"
                                className="img-fluid"
                              />
                            </a>
                            <p>Wi-fi</p>
                          </div>
                          <div>
                            <a>
                              <AsyncImage
                                src="/IMAGES-VIDEOS/B-IMG-PRODUCT-LAYOUT/icons/person_detection.webp"
                                className="img-fluid"
                              />
                            </a>
                            <p>Sensor</p>
                          </div>
                        </div>
                        <div className="product-detail">
                          <p>{selectedProduct.modalDescriptionp}</p>
                          <div className="product-detail-keypoints">
                            <h5>Key Features:</h5>
                            <ul>
                              <li>{selectedProduct.Mkeyone}</li>
                              <li>{selectedProduct.Mkeytwo}</li>
                              <li>{selectedProduct.MkeyTHREE}</li>
                              <li>{selectedProduct.MkeyFOUR}</li>
                            </ul>
                          </div>
                        </div>
                        <div class="purchase-info ">
                          <Link to="/indudet">
                            <button type="button" class="btn">
                              Know More<i class="fas fa-shopping-cart"></i>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}
        </main>
      </section>

      <Footerproduct />
    </>
  );
}