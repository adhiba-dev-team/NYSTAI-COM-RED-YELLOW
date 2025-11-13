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

export default function WORSHIP() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    [4].includes(product.category)
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
            src={"/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/worship.webp"}
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
            <h3 className="heading-34">Nystai's Worship Solution</h3>
            <p className="text-block-60">
              NYSTAI transforms places of worship into modern, secure, and
              efficient spaces. With advanced surveillance systems, energy
              optimization tools, and digital management platforms, we address
              security concerns, reduce energy inefficiencies, and simplify
              operations. Our cutting-edge solutions ensure safety, streamline
              processes, and enhance community engagement, delivering a seamless
              and connected worship experience for all.
            </p>
          </div>

          <div className="card-wrapper card-deck-custom row mt-5">
            <div className="col-lg-3 col-md-6 col-sm-6 mb-2">
              <div className="card">
                <center>
                  <AsyncImage
                    className="card-img-top"
                    src={
                      "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/worshipicon1 (2).webp"
                    }
                    alt="Card image cap"
                  />
                </center>
                <div className="card-body">
                  <h4 className="card-title">Safety</h4>
                  <p className="card-text">
                    Advanced surveillance and access control systems
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
                      "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT//worshipicon1 (1).webp"
                    }
                    alt="Card image cap"
                  />
                </center>
                <div className="card-body">
                  <h4 className="card-title">Efficiency</h4>
                  <p className="card-text">
                    Smart energy and crowd management solutions.
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
                      "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT//worshipicon1 (3).webp"
                    }
                    alt="Card image cap"
                  />
                </center>
                <div className="card-body">
                  <h4 className="card-title">Connectivity</h4>
                  <p className="card-text">
                    Smart energy and crowd management solutions.
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
                      "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT//worshipicon1 (1).webp"
                    }
                    alt="Card image cap"
                  />
                </center>
                <div className="card-body">
                  <h4 className="card-title">Sanctity</h4>
                  <p className="card-text">
                    Designed to preserve
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container page-section " id="What we offer">
          <div className="text-center mb-5">
            <h3 class="rrmc-article-desc-title">What we offer</h3>
          </div>

          <div
            class="row mt-2"
            style={{ alignItems: "center", textAlign: "justify" }}
          >
            <div class="col-md-6">
              <div class="card" style={{ border: "none", outline: "none" }}>
                <img
                  src={
                    "/IMAGES-VIDEOS/A-IMG-HOME-LAYOUT/worship-card (1).jpg"
                  }
                  className=""
                  style={{ borderRadius: "10px", height: "500px", objectFit: "cover" }}
                  alt="..."
                />
                <div class="card-body mb-5" style={{ padding: "0" }}>
                  <h2
                    class="card-title mt-3"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bolder",
                      color: "#FFB000",
                    }}
                  >
                    Challenges
                  </h2>
                  <p class="card-text" style={{ color: "#8c8c8c" }}>
                    Temples, churches, and mosques encounter challenges like
                    managing large crowds, ensuring safety, and handling energy
                    wastage. Additionally, administrative burdens, such as
                    organizing donations, volunteer scheduling, and event
                    planning, complicate operations. Without efficient
                    solutions, these issues can hinder the smooth functioning of
                    these sacred spaces, impacting both worshippers and
                    administrators alike.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card" style={{ border: "none", outline: "none" }}>
                <img
                  src={
                    "/IMAGES-VIDEOS/A-IMG-HOME-LAYOUT/worship-card (2).jpg"
                  }
                  className=""
                  style={{ borderRadius: "10px", height: "500px", objectFit: "cover" }}
                  alt="..."
                />
                <div class="card-body mb-5" style={{ padding: "0" }}>
                  <h2
                    class="card-title mt-3"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bolder",
                      color: "#FFB000",
                    }}
                  >
                    Solution
                  </h2>
                  <p class="card-text" style={{ color: "#8c8c8c" }}>
                    Temples, churches, and mosques encounter challenges like
                    managing large crowds, ensuring safety, and handling energy
                    wastage. Additionally, administrative burdens, such as
                    organizing donations, volunteer scheduling, and event
                    planning, complicate operations. Without efficient
                    solutions, these issues can hinder the smooth functioning of
                    these sacred spaces, impacting both worshippers and
                    administrators alike.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="card  mt-5 mb-5"
            style={{ border: "none", outline: "none" }}
          >
            <div
              class="row g-0"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "justify",
              }}
            >
              <div class="col-md-6">
                <img
                  src={
                    "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/Worship images/3.webp"
                  }
                  style={{ borderRadius: "10px" }}
                  className="img-fluid mb-4"
                  alt="..."
                />
              </div>
              <div class="col-md-6">
                <div class="card-body p-0 p-md-4" style={{ padding: "0" }}>
                  <h2
                    class="card-title"
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bolder",
                      color: "#FFB000",
                    }}
                  >
                    How NYSTAI Solves These Problems
                  </h2>
                  <p class="card-text" style={{ color: "#8c8c8c" }}>
                    NYSTAI transforms places of worship with advanced,
                    all-encompassing solutions designed to tackle security,
                    energy, and operational challenges. By integrating our smart
                    technologies, temples, churches, and mosques can modernize
                    their operations, ensuring safety, efficiency, and stronger
                    connections with their communities. Let NYSTAI help you
                    create a secure, efficient, and welcoming environment for
                    all worshippers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="page-section container Features-education mt-5 mb-5"
          id="Features"
        >
          <div className="text-center mb-3">
            <h3 class="rrmc-article-desc-title">Features</h3>
            <p class="rrmc-article-desc-intro">
              Features provided by our Worship solution{" "}
            </p>
          </div>

          <div class="cards-worship-nys">
            <section class="services ">
              <div class="row pt-5">
                <div class="col-lg-4 mb-md-5">
                  <div class="card shadow p-5 d-flex flex-column justify-content-center align-items-center">
                    <div class="anim-layer"></div>
                    <i class="fa-solid fa-users display-5 mb-3">
                      {" "}
                      <AsyncImage
                        src={
                          "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/worshipcardicon1 (2).webp"
                        }
                      />
                    </i>
                    <h4>Advanced Surveillance</h4>
                    <p class="text-center mb-0">
                      Ensure safety with real-time monitoring, intelligent CCTV,
                      and access control systems.
                    </p>
                  </div>
                </div>
                <div class="col-lg-4 mb-md-5">
                  <div class="card shadow p-5 d-flex flex-column justify-content-center align-items-center">
                    <div class="anim-layer"></div>
                    <i class="fa-solid fa-users display-5 mb-3">
                      {" "}
                      <AsyncImage
                        src={
                          "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/worshipcardicon1 (3).webp"
                        }
                      />
                    </i>
                    <h4>Energy Efficiency</h4>
                    <p class="text-center mb-0">
                      Reduce costs using smart lighting and automated climate
                      control technologies.
                    </p>
                  </div>
                </div>
                <div class="col-lg-4 mb-md-5">
                  <div class="card shadow p-5 d-flex flex-column justify-content-center align-items-center">
                    <div class="anim-layer"></div>
                    <i class="fa-solid fa-users display-5 mb-3">
                      {" "}
                      <AsyncImage
                        src={
                          "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/worshipcardicon1 (3).webp"
                        }
                      />
                    </i>
                    <h4>Digital Donation Management</h4>
                    <p class="text-center mb-0">
                      Track and manage contributions seamlessly with secure,
                      user-friendly digital platforms
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="row mt-lg-5"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div class="col-lg-4  mb-md-5">
                  <div class="card shadow p-5 d-flex flex-column justify-content-center align-items-center">
                    <div class="anim-layer"></div>
                    <i class="fa-solid fa-users display-5 mb-3">
                      {" "}
                      <AsyncImage
                        src={
                          "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/worshipcardicon1 (5).webp"
                        }
                      />
                    </i>
                    <h4>Smart Crowd Control</h4>
                    <p class="text-center mb-0">
                      {" "}
                      Monitor and manage large gatherings effectively with
                      innovative crowd management tools.
                    </p>
                  </div>
                </div>
                <div class="col-lg-4  mb-md-5">
                  <div class="card shadow p-5 d-flex flex-column justify-content-center align-items-center">
                    <div class="anim-layer"></div>
                    <i class="fa-solid fa-users display-5 mb-3">
                      {" "}
                      <AsyncImage
                        src={
                          "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/worshipcardicon1 (1).webp"
                        }
                      />
                    </i>
                    <h4>Streamlined Administration</h4>
                    <p class="text-center mb-0">
                      Simplify volunteer scheduling, event planning, and
                      reporting with comprehensive digital management .
                    </p>
                  </div>
                </div>
                <div class="col-lg-4  mb-md-5">
                  <div class="card shadow p-5 d-flex flex-column justify-content-center align-items-center">
                    <div class="anim-layer"></div>
                    <i class="fa-solid fa-users display-5 mb-3">
                      {" "}
                      <AsyncImage
                        src={
                          "/IMAGES-VIDEOS/C-IMG-SOLUTION-LAYOUT/worshipcardicon1 (1).webp"
                        }
                      />
                    </i>
                    <h4>Streamlined Administration</h4>
                    <p class="text-center mb-0">
                      Simplify volunteer scheduling, event planning, and
                      reporting with comprehensive digital management .
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
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
                          <Link to="/Camerdet">
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