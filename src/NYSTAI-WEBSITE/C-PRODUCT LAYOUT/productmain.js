import AsyncImage from "react-async-image";
import React, { useState, useEffect } from "react";
import "./shopingcardpro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars
} from "@fortawesome/free-solid-svg-icons";
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
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import GenericProductPage from "./GenericProductPage";

// Base API URL
const API_BASE_URL = "https://nystai-com-dashboarad.onrender.com/api";

const AdminHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isSidebarHidden, setIsSidebarHidden] = useState(
    window.innerWidth < 768
  );
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // New state for API data
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category");
  const initialSubcategory = searchParams.get("subcategory");

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/categories/list`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);

      // Set first category as default if available
      if (data.length > 0 && !selectedCategory) {
        setSelectedCategory(data[0].id);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Fetch products for a specific category

  // Fetch products for a specific category AND related categories
  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);

      // Define category relationships (which categories to show together)
      const categoryRelationships = {
        1: [1, 4, 5],    // HYBRID AIoT NVR: Show NVR + CAMERA + SENSORS
        2: [2],    // INDUSTRIAL AI NVR: Show NVR + CAMERA + SENSORS
        4: [4],          // CAMERA: Show only cameras
        5: [5],          // SENSORS: Show only sensors
        // Add more relationships as needed
        // Default: show only the selected category
      };

      const relatedCategoryIds = categoryRelationships[categoryId] || [categoryId];

      // Fetch products for all related categories
      const allProducts = [];

      for (const catId of relatedCategoryIds) {
        const category = categories.find(cat => cat.id === catId);

        if (category && category.products) {
          // Add category name to each product for display
          const productsWithCategory = category.products.map(product => ({
            ...product,
            categoryName: category.name
          }));
          allProducts.push(...productsWithCategory);
        } else {
          // If category not found in the list, fetch it from API
          try {
            const response = await fetch(`${API_BASE_URL}/categories/get/${catId}`);
            if (response.ok) {
              const data = await response.json();
              const productsWithCategory = (data.products || []).map(product => ({
                ...product,
                categoryName: data.name
              }));
              allProducts.push(...productsWithCategory);
            }
          } catch (err) {
            console.error(`Error fetching category ${catId}:`, err);
          }
        }
      }

      setProducts(allProducts);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(parseInt(initialCategory));
    }
    if (initialSubcategory) {
      setSelectedSubcategory(initialSubcategory);
    }
  }, [initialCategory, initialSubcategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 991) {
        setIsSidebarHidden(true);
      } else {
        setIsSidebarHidden(false);
      }
      if (window.innerWidth > 576) {
        setIsSearchFormVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };



  // Render products for the selected category
  const renderCategoryComponent = () => {
    if (loading) {
      return (
        <div className="text-center p-5">
          <div className="" style={{ color: "#ffB000" }} role="status">
            <span className="sr-only">Loading Categories...</span>
          </div>
          <p className="mt-3">Loading Products...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger m-3" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => fetchProductsByCategory(selectedCategory)}>
            Try Again
          </button>
        </div>
      );
    }

    // Find the selected category
    const category = categories.find(cat => cat.id === selectedCategory);

    // Use GenericProductPage for ALL categories
    return (
      <GenericProductPage
        category={category}
        products={products}
      />
    );
  };

  // Generic product list renderer for categories without custom components
  // const renderGenericProductList = (category) => {
  //   if (products.length === 0) {
  //     return (
  //       <div className="text-center p-5">
  //         <h3>No products found in this category</h3>
  //         <p className="text-muted">Please check back later or select another category.</p>
  //       </div>
  //     );
  //   }

  //   return (
  //     <>
  //       <section className="">
  //         {category.bannerUrl && (
  //           <img
  //             src={category.bannerUrl}
  //             className="img-fluid w-100"
  //             alt={category.name}
  //           />
  //         )}
  //       </section>

  //       <div className="mt-4 mb-5">
  //         <h3 className="mb-4" style={{ color: "#FFB000", fontWeight: "bolder" }}>
  //           {category.name}
  //         </h3>
  //         <div className="prod-row-card-nys">
  //           {products.map((product) => {
  //             const coverImage = product.images?.find(img => img.type === 'cover');
  //             const imageUrl = coverImage?.imageUrl || '/placeholder-image.jpg';

  //             return (
  //               <div className="prod-column-card-nys mb-2" key={product.id}>
  //                 <div className="card pro_card-des">
  //                   <div className="image-container">
  //                     <img
  //                       alt={product.name}
  //                       src={imageUrl}
  //                       className="img-fluid rounded thumbnail-image"
  //                     />
  //                   </div>
  //                   <div className="card-body product-detail-container">
  //                     <h6>{product.name}</h6>
  //                     <p>{product.subName}</p>
  //                     <p className="dress-name">{product.coverDesc}</p>
  //                     <div className="d-flex justify-content-between align-items-end btn-modaln">
  //                       <h5 className="dress-name1">{product.code}</h5>
  //                       <div className="product-detail">
  //                         <button className="btn pulse">MORE INFO</button>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <body className="pro-body">
        <section id="sidebar" className={isSidebarHidden ? "hide" : ""}>
          <Link to="/">
            <a className="brand mb-3 d-flex align-items-center" style={{padding:"17px 0 5px 0"}}>
              <AsyncImage
                src="/IMAGES-VIDEOS/B-IMG-PRODUCT-LAYOUT/Nystai-icons & resize images/trilogoproductdash-1.png"
                alt="Brand Logo"
              />
              <img
                src="/IMAGES-VIDEOS/B-IMG-PRODUCT-LAYOUT/Nystai-icons & resize images/productdashlogo-1.png"
                alt="nys-logo"
                style={{ height: "35px", marginLeft: "17px" }}
              />
            </a>
          </Link>

          <div className="side-menu top big-screen-res">
            <li onClick={toggleSidebar}>
              <a>
                <FontAwesomeIcon icon={faBars} className=" dash-icon" />
                <span
                  className="text"
                  style={{ fontSize: "16px", textTransform: "uppercase", color: "#ffB000" }}
                >
                  Product Category
                </span>
              </a>
            </li>
          </div>

          <div className="side-menu top">
            {categories.map((category) => (
              <li
                key={category.id}
                className={`${parseInt(selectedCategory) === category.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedSubcategory(null);
                }}
              >
                <a>
                  {category.iconUrl ? (
                    <img
                      src={category.iconUrl}
                      alt={category.name}
                      className="dash-icon"
                      style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faBars}
                      className="dash-icon"
                    />
                  )}
                  <span className="text">{category.name}</span>
                </a>
              </li>
            ))}
          </div>
        </section>

        <section id="content">
          <nav className="navbar navbar-expand-lg sticky-top">
            <Drawer open={open} onClose={toggleDrawer(false)}>
              <Link to="/nystai-home">
                <a className="brand mt-3 mb-3 d-flex align-items-center">
                  <AsyncImage
                    src="/IMAGES-VIDEOS/B-IMG-PRODUCT-LAYOUT/Nystai-icons & resize images/trilogoproductdash-1.png"
                    alt="Brand Logo"
                    style={{ width: "40px", height: "35px", objectFit: "contain", marginRight: "8px" }}
                  />
                  <AsyncImage
                    src="/IMAGES-VIDEOS/B-IMG-PRODUCT-LAYOUT/Nystai-icons & resize images/productdashlogo-1.png"
                    alt="nys-logo"
                    style={{ width: "50px", height: "30px", objectFit: "contain" }}
                  />
                </a>
              </Link>

              <div className="side-menu mobil-nav-pro mt-1">
                <li>
                  <a className="nav-link">
                    <Link to="/nystai-product">PRODUCTS</Link>
                  </a>
                </li>
                <li>
                  <a className="nav-link">
                    <Link to="/nystai-solution-home">INTEGRATED SOLUTIONS</Link>
                  </a>
                </li>
                <li>
                  <a className="nav-link">
                    <Link to="/nystai-PLAN">PROTECT PLAN</Link>
                  </a>
                </li>
                <li>
                  <a className="nav-link">
                    <Link to="/nystai-SERVICE">SERVICE</Link>
                  </a>
                </li>
                <li>
                  <a className="nav-link">
                    <Link to="/nystai-support">SUPPORT</Link>
                  </a>
                </li>
              </div>

              <span
                className="text mt-1 mb-1"
                style={{
                  fontWeight: "bolder",
                  fontSize: "17px",
                  textTransform: "uppercase",
                  color: "#ffB000",
                }}
              >
                Product Category
              </span>
              <div className="side-menu mobil-nav-pro">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`${parseInt(selectedCategory) === category.id ? "active" : ""}`}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelectedSubcategory(null);
                    }}
                  >
                    <a>
                      {category.iconUrl ? (
                        <img
                          src={category.iconUrl}
                          alt={category.name}
                          className="dash-icon"
                          style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faBars}
                          className="dash-icon"
                        />
                      )}
                      <span className="text">{category.name}</span>
                    </a>
                  </li>
                ))}
              </div>
            </Drawer>

            <button
              onClick={toggleDrawer(true)}
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link me-3">
                    <Link to="/nystai-product">PRODUCTS</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-3">
                    <div className="dropdown">
                      <a className="dropdown-trigger" onClick={toggleDropdown}>
                        INTEGRATED SOLUTIONS
                        <span className={`arrow ms-1 ${isOpen ? "open" : ""}`}>
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
                              <FontAwesomeIcon icon={faHouseSignal} className="me-3" />
                              <Link to="/nystai-solution-home" className={`${isActive("/nystai-solution-education")}`}> SMARTHOME </Link>
                            </a>
                            <div className="dropdown-divider ms-3 me-3"></div>
                            <a className="dropdown-content-a">
                              <FontAwesomeIcon icon={faIndustry} className="me-3" />
                              <Link to="/nystai-solution-Industrial" className={`${isActive("/nystai-solution-education")}`}> INDUSTRIAL </Link>
                            </a>
                            <div className="dropdown-divider ms-3 me-3"></div>
                            <a className="dropdown-content-a">
                              <FontAwesomeIcon icon={faSchool} className="me-3" />
                              <Link to="/nystai-solution-education" className={`${isActive("/nystai-solution-education")}`}> EDUCATION </Link>
                            </a>
                            <div className="dropdown-divider ms-3 me-3"></div>
                            <a className="dropdown-content-a">
                              <FontAwesomeIcon icon={faPlaceOfWorship} className="me-3" />
                              <Link to="/nystai-solution-worship" className={`${isActive("/nystai-solution-education")}`}> WORSHIP </Link>
                            </a>
                            <div className="dropdown-divider ms-3 me-3"></div>
                            <a className="dropdown-content-a">
                              <FontAwesomeIcon icon={faCarBurst} className="me-3" />
                              <Link to="/nystai-solution-vms" className={`${isActive("/nystai-solution-vms")}`}> VMS </Link>
                            </a>
                            <div className="dropdown-divider ms-3 me-3"></div>
                            <a className="dropdown-content-a">
                              <FontAwesomeIcon icon={faWarehouse} className="me-3" />
                              <Link to="/nystai-solution-Warehouse" className={`${isActive("/nystai-solution-education")}`}> WAREHOUSE </Link>
                            </a>
                            <div className="dropdown-divider ms-3 me-3"></div>
                            <a className="dropdown-content-a">
                              <FontAwesomeIcon icon={faIndustry} className="me-3" />
                              <Link to="nystai-solution-Hospital" className={`${isActive("/nystai-solution-Hospital")}`}> HOSPITAL </Link>
                            </a>
                            <div className="dropdown-divider ms-3 me-3"></div>
                            <a className="dropdown-content-a">
                              <FontAwesomeIcon icon={faBuildingColumns} className="me-3" />
                              <Link to="/nystai-solution-banking" className={`${isActive("/nystai-solution-banking")}`}> BANKING </Link>
                            </a>
                            <div className="dropdown-divider ms-3 me-3"></div>
                            <a className="dropdown-content-a">
                              <FontAwesomeIcon icon={faCircleInfo} className="me-3" />
                              <Link to="/nystai-solution-retail" className={`${isActive("/nystai-solution-retail")}`}> RETAIL </Link>
                            </a>
                            <div className="dropdown-divider ms-3 me-3"></div>
                            <a className="dropdown-content-a">
                              <FontAwesomeIcon icon={faHandshake} className="me-3" />
                              <Link to="/nystai-solution-parking" className={`${isActive("/nystai-solution-parking")}`}> PARKING IOT SOLUTION </Link>
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-3">
                    <Link to="/nystai-PLAN">PROTECT PLAN</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-3">
                    <Link to="/nystai-SERVICE">SERVICE</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-3">
                    <Link to="/nystai-support">SUPPORT</Link>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main>
            <div className="">
              {renderCategoryComponent()}
            </div>
          </main>
        </section>
      </body>
    </>
  );
};

export default AdminHub;