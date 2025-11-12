import AsyncImage from "react-async-image";
import LazyImage from "../common/LazyImage";
import React from "react";
import "./support.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import Footer_product from "../A-LAYOUT/footer";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import HeadingForm from "./threeForm";

export default function Support() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openChatbot = () => {
    if (window.$zoho && window.$zoho.salesiq) {
      window.$zoho.salesiq.floatwindow.visible("show");
    }
  };

  return (
    <>
      <div className="ban-img">
        <h1 className="responsive-text">CONTACT US</h1>
      </div>

      <div className="row img-form container mx-auto">
        <div className="col-lg-6 col-md-12 col-sm-12 mb-5" style={{ marginTop: "7vh" }} >

          <div className="support-heading-nys">
            <h4>GET IN TOUCH !</h4>
            <p>Need something cleared up? Here are our most frequently <br />asked questions.</p>
          </div>

          <div className="support-left-cont-nys">
            <div className="row g-0">
              <div className="col-lg-6 col-md-4 col-sm-4 col-6">
                <div className="support-left-cont-nys-cards">
                  <img src="/IMAGES-VIDEOS/F-IMG-SUPPORT-LAYOUT/Badge (1).png" style={{height:"50px", width:"50px"}} />
                  <div className="">
                    <h3>Email</h3>
                    <p>Our friendly team is here to help.</p>
                    <h6>Nystai@support.com</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-6">
                <div className="support-left-cont-nys-cards">
                  <img src="/IMAGES-VIDEOS/F-IMG-SUPPORT-LAYOUT/Badge (2).png" style={{height:"50px", width:"50px"}} />
                  <div className="">
                    <h3>Phone</h3>
                    <p>Mon-Fri from 8am to 5pm.</p>
                    <h6>+91 81899 77700</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-4 col-6">
                <div className="support-left-cont-nys-cards">
                  <img src="/IMAGES-VIDEOS/F-IMG-SUPPORT-LAYOUT/Badge (3).png" style={{height:"50px", width:"50px"}} />
                  <div className="">
                    <h3>Office</h3>
                    <p>Come say hello at our office HQ.</p>
                    <h6>2/153, Padmalaya Nagar,
                      Narasimhanaickenpalayam,
                      Coimbatore - 641031</h6>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="support-heading-nys mt-3">
            <h4>CHAT WITH US</h4>
            <p>Need something cleared up? Here are our most frequently  <br />asked questions.</p>
          </div>

          <div className="support-left-cont-nys">
            <div className="row g-0">
              <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                <div className="support-left-cont-nys-cards d-flex align-items-center">
                  <img src="/IMAGES-VIDEOS/F-IMG-SUPPORT-LAYOUT/wp-icon.png" />
                  <div className="ms-3">
                    <p>Whatsapp</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                <div className="support-left-cont-nys-cards d-flex align-items-center">
                  <img src="/IMAGES-VIDEOS/F-IMG-SUPPORT-LAYOUT/wp-icon.png" />
                  <div className="ms-3">
                    <p>BWhatsapp</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                <div className="support-left-cont-nys-cards d-flex align-items-center">
                  <img src="/IMAGES-VIDEOS/F-IMG-SUPPORT-LAYOUT/wp-icon.png" />
                  <div className="ms-3">
                    <p>FAQ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div style={{ marginBottom: "50px" }}>
            <div>
              <h6
                className="text-nav-topics-nystai pb-3"
                style={{ fontSize: "30px" }}
              >
                GET IN TOUCH !
              </h6>
              <h1 style={{ marginTop: "30px" }}>
                {" "}
                <FontAwesomeIcon
                  icon={faMobile}
                  style={{ color: "#1d736f" }}
                  className="me-1 "
                />
                +91 81899 77700
              </h1>
            </div>
          </div>
          <div className="col-12" style={{ marginBottom: "50px" }}>
            <h6
              className="text-nav-topics-nystai pb-3"
              style={{ fontSize: "1.75rem" }}
            >
              CHAT WITH US
            </h6>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center parallel-opp-img">
                <a href="https://wa.me/+918189977700" target="_blank">
                  <AsyncImage
                    src={
                      "/IMAGES-VIDEOS/F-IMG-SUPPORT-LAYOUT/subtract-668405adc24fa.webp"
                    }
                    className="whats-icon-support-nystai"
                    style={{
                      height: "10vh",
                      maxHeight: "80px",
                      width: "auto",
                      maxWidth: "100%",
                      cursor: "pointer",
                    }}
                    onClick={openChatbot}
                  />
                </a>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center ">
                <a href="https://wa.me/+918189977700" target="_blank">
                  <AsyncImage
                    src={
                      "/IMAGES-VIDEOS/F-IMG-SUPPORT-LAYOUT/pngwingcom-668405ac87a41.webp"
                    }
                    className="whats-icon-support-nystai"
                    sstyle={{
                      height: "10vh",
                      maxHeight: "80px",
                      width: "auto",
                      maxWidth: "100%",
                      cursor: "pointer",
                    }}
                    onClick={openChatbot}
                  />
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "50px" }}>
            <div>
              <a>
                <Link to="/faqs">
                  <AsyncImage
                    src={
                      "/IMAGES-VIDEOS/F-IMG-SUPPORT-LAYOUT/faq-668405a9687a6.webp"
                    }
                    className="whats-icon-support-nystai"
                    style={{
                      height: "10vh",
                      maxHeight: "80px",
                      width: "auto",
                      maxWidth: "100%",
                      cursor: "pointer",
                    }}
                    alt="nys-pro-image"
                  />
                </Link>
              </a>
            </div>
          </div> */}
        </div>
        <div className=" col-lg-6 col-md-12">
          <div style={{ marginTop: "7vh" }}>
            <div>
              <h6
                className="text-nav-topics-nystai pb-3"
                style={{ fontSize: "30px", color: "#131313" }}
              >
                PROSPEROUS FUTURE!
              </h6>
              <p style={{ color: "#131313", opacity: ".5" }} className="mb-4">We’d love to hear from you. Please fill out this form.</p>
            </div>
          </div>
          <HeadingForm />
        </div>
      </div>

      <Footer_product />
    </>
  );
}
