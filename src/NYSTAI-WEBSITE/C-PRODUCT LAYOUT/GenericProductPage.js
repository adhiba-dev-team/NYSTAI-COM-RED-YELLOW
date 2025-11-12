import React, { useState, useEffect } from "react";
import AsyncImage from "react-async-image";
import Footerproduct from "../A-LAYOUT/footer.js";
import { Link } from "react-router-dom";

const GenericProductPage = ({ category, products }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setCurrentImage(null); // Reset current image
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
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

  // Set default image when product is selected
  useEffect(() => {
    if (selectedProduct && selectedProduct.images) {
      const coverImage = selectedProduct.images.find(img => img.type === 'cover');
      setCurrentImage(coverImage?.imageUrl || '/placeholder-image.jpg');
    }
  }, [selectedProduct]);

  if (!category) {
    return (
      <div className="text-center p-5">
        <h3>Category not found</h3>
        <p className="text-muted">Please select a valid category.</p>
      </div>
    );
  }

  // Get specific image types from API
  const getCoverImage = (product) => {
    return product.images?.find(img => img.type === 'cover');
  };

  const getGalleryImages = (product) => {
    return product.images?.filter(img => img.type === 'gallery') || [];
  };

  const getSmartIcons = (product) => {
    return product.images?.filter(img => img.type === 'smartIcon') || [];
  };

  return (
    <>
      <section className="">
        {category.bannerUrl && (
          <AsyncImage
            src={category.bannerUrl}
            className="img-fluid w-100"
            alt={category.name}
          />
        )}
      </section>

      <div className="mt-4 mb-5">
        <h3 className="mb-4" style={{ color: "#ED1C24", fontWeight: "bolder" }}>
          {category.name}
        </h3>
        
        {products.length === 0 ? (
          <div className="text-center p-5">
            <h3>No products found in this category</h3>
            <p className="text-muted">Please check back later or select another category.</p>
          </div>
        ) : (
          <div className="prod-row-card-nys">
            {products.map((product, index) => {
              const coverImage = getCoverImage(product);
              const imageUrl = coverImage?.imageUrl || '/placeholder-image.jpg';

              return (
                <div 
                  className="prod-column-card-nys mb-2" 
                  key={product.id}
                //   data-aos="fade-up"
                //   data-aos-anchor-placement="top"
                //   data-aos-duration="1000"
                //   data-aos-delay={100 * index}
                >
                  <div
                    className="card pro_card-des"
                    onClick={() => handleCardClick(product)}
                  >
                    <div className="image-container">
                      <AsyncImage
                        alt={product.name}
                        src={imageUrl}
                        className="img-fluid rounded thumbnail-image"
                      />
                    </div>
                    <div className="card-body product-detail-container">
                      <h6>{product.name}</h6>
                      <p>{product.subName}</p>
                      <p className="dress-name">{product.coverDesc}</p>
                      <div className="d-flex justify-content-between align-items-end btn-modaln">
                        <h5 className="dress-name1">{product.code}</h5>
                        <div className="product-detail">
                          <button className="btn pulse">MORE INFO</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <section className="modal-pro">
              <div className="card-wrapper">
                <div className="card">
                  <button
                    onClick={handleCloseModal}
                    className="close-button"
                    aria-label="Close Modal"
                  >
                    &times;
                  </button>
                  <div className="product-imgs">
                    <div className="img-display">
                      <div className="img-showcase">
                        <AsyncImage 
                          src={currentImage} 
                          alt={selectedProduct.name}
                        />
                      </div>
                    </div>
                    <div className="img-select">
                      {/* Cover Image as first thumbnail */}
                      {getCoverImage(selectedProduct) && (
                        <div className="img-item">
                          <a
                            onClick={() => {
                              const coverImage = getCoverImage(selectedProduct);
                              setCurrentImage(coverImage.imageUrl);
                            }}
                          >
                            <AsyncImage
                              src={getCoverImage(selectedProduct).imageUrl}
                              alt="Cover image"
                            />
                          </a>
                        </div>
                      )}
                      
                      {/* Gallery Images as additional thumbnails */}
                      {getGalleryImages(selectedProduct).map((image, index) => (
                        <div key={image.id} className="img-item">
                          <a
                            onClick={() => setCurrentImage(image.imageUrl)}
                          >
                            <AsyncImage
                              src={image.imageUrl}
                              alt={`Gallery image ${index + 1}`}
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="product-content">
                    <h2 className="product-title">{selectedProduct.name}</h2>
                    <h5 className="mb-3 smart-features-head">
                      Smart Features:
                    </h5>

                    {/* Smart Icons from API - exactly 5 icons with text */}
                    <div className="social-links">
                      {getSmartIcons(selectedProduct).map((icon, index) => (
                        <div key={icon.id}>
                          <a>
                            <AsyncImage
                              src={icon.imageUrl}
                              className="img-fluid"
                              alt={icon.text || 'Smart feature'}
                            />
                          </a>
                          <p>{icon.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="product-detail">
                      <p>{selectedProduct.mainDesc}</p>
                      <div className="product-detail-keypoints">
                        <h5>Key Features:</h5>
                        <ul>
                          {selectedProduct.keyFeatures?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* <div className="purchase-info">
                      Dynamic routing based on product ID
                      <Link to={`/product-details/${selectedProduct.id}`}>
                        <button type="button" className="btn">
                          Know More <i className="fas fa-shopping-cart"></i>
                        </button>
                      </Link>
                    </div> */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      <Footerproduct />
    </>
  );
};

export default GenericProductPage;