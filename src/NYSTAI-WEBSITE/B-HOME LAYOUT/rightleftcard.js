import React, { useRef, useEffect } from "react";
import AsyncImage from "react-async-image";
import gsap from "gsap";
import { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faArrowRight,
  faCheck,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./nystai-home.css";
import leftimg from './img.jpg'
 
gsap.registerPlugin(ScrollTrigger);
 
export default function Rightleft() {
  const itemsRef = useRef([]);
 
  // Clear refs when component re-renders
  itemsRef.current = [];
 
  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };
 
  useEffect(() => {
    // Animate each image when it scrolls into view
    itemsRef.current.forEach((item) => {
      gsap.fromTo(
        item,
        {
          autoAlpha: 0,
          scale: 1.1,
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: Power2.easeOut,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scrollTrigger: {
            trigger: item,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
 
    // Cleanup ScrollTriggers when unmounted
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
 
  return (
    <section className="testi-moni-nystai mt-5">
      {/* -------- FIRST ROW -------- */}
      <div className="row g-0">
        {/* Left Image */}
        <div className="col-md-6">
          <div className="App test02">
            <div className="image-container22">
              <AsyncImage
                src={leftimg}
                alt="Unified Platform"
                className="image"
                ref={addToRefs}
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
 
        {/* Right Text */}
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div className="left-right-cards-nystai">
            <div className="card-body m-5">
              <p className="card-title1">Unified Platform</p>
              <h5 className="card-title2">
                Integrated Video{" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mx-1 text-gray-400"
                  style={{ fontSize: "13px" }}
                />
                Alarm{" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mx-1 text-gray-400"
                  style={{ fontSize: "13px" }}
                />
                Access Control
              </h5>
              <p className="card-text">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{
                    color: "#ffB000",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  className="me-3 ms-2"
                />
                NYSTAI-IoT offers a seamless solution by unifying video
                surveillance, alarms, and access control for streamlined, secure
                management.
              </p>
            </div>
          </div>
        </div>
      </div>
 
      {/* -------- SECOND ROW -------- */}
      <div className="row g-0">
        {/* Left Text */}
        <div
          className="col-md-6 d-flex align-items-center justify-content-center order-2 order-lg-1"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div className="left-right-cards-nystai">
            <div className="card-body imtext-card-ist-ser m-5">
              <p className="card-title1">Smart Security</p>
              <h5 className="card-title2">
                Video{" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mx-1 text-gray-400"
                  style={{ fontSize: "13px" }}
                />
                Alarm{" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mx-1 text-gray-400"
                  style={{ fontSize: "13px" }}
                />
                Access Integration
              </h5>
              <p className="card-text">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{
                    color: "#ffB000",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  className="me-3 ms-2"
                />
                NYSTAI-IoT simplifies your security setup by integrating alarms,
                video monitoring, and access control into one efficient, unified
                platform.
              </p>
            </div>
          </div>
        </div>
 
        {/* Right Image */}
        <div className="col-md-6 order-1 order-lg-2">
          <div className="App test02">
            <div className="image-container22">
              <AsyncImage
                src="/IMAGES-VIDEOS/A-IMG-HOME-LAYOUT/common/2-Smart-Security.jpg"
                alt="Smart Security"
                className="image"
                ref={addToRefs}
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}