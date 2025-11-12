import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Upload } from "@mui/icons-material";

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    // Get category ID from URL or state to navigate back properly
    const [categoryId, setCategoryId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form states
    const [productData, setProductData] = useState({
        name: "",
        subName: "",
        categoryId: "",
        code: "",
        keyFeatures: ["", "", "", ""],
        coverDesc: "",
        mainDesc: "",
    });

    // Main images (4 fixed slots)
    const [images, setImages] = useState([null, null, null, null]);

    // Icon images
    const [uploadedImages, setUploadedImages] = useState({});
    const [iconTexts, setIconTexts] = useState({});

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(
                    `https://nystai-com-dashboarad.onrender.com/api/products/get/${productId}`
                );
                const responseText = await res.text();
                console.log("Raw response:", responseText);

                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (err) {
                    console.error("Response is not valid JSON:", err);
                    throw new Error(`Server did not return JSON: ${responseText.substring(0, 100)}...`);
                }
                console.log("Updated product:", data);

                // Populate text fields
                setProductData({
                    name: data.name || "",
                    subName: data.subName || "",
                    categoryId: data.categoryId || "",
                    code: data.code || "",
                    keyFeatures: data.keyFeatures || ["", "", "", ""],
                    coverDesc: data.coverDesc || "",
                    mainDesc: data.mainDesc || "",
                });

                // Set category ID for navigation
                setCategoryId(data.categoryId);

                // Main images
                const galleryImages =
                    data.images
                        ?.filter(
                            (img) =>
                                img.type === "cover" || img.type === "gallery"
                        )
                        .map((img) => img.imageUrl) || [];

                const mainImages = [null, null, null, null];
                galleryImages.forEach((url, idx) => {
                    if (idx < 4) mainImages[idx] = url;
                });
                setImages(mainImages);

                // Icon images
                const smartIcons =
                    data.images?.filter((img) => img.type === "smartIcon") || [];

                const iconImgs = {};
                const iconLabels = {};
                smartIcons.forEach((icon, idx) => {
                    iconImgs[idx] = { url: icon.imageUrl };
                    iconLabels[idx] = icon.text || "";
                });

                setUploadedImages(iconImgs);
                setIconTexts(iconLabels);
            } catch (err) {
                console.error("Failed to fetch product", err);
                alert("Failed to fetch product data");
            }
        };

        fetchProduct();
    }, [productId]);

    // Handle gateway upload (fills the next empty slots only)
    const handleGatewayUpload = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setImages((prev) => {
            const newImages = [...prev];
            let fileIndex = 0;

            // Loop through slots and fill empty ones
            for (let i = 0; i < newImages.length && fileIndex < files.length; i++) {
                if (!newImages[i]) {
                    newImages[i] = URL.createObjectURL(files[fileIndex]);
                    fileIndex++;
                }
            }
            return newImages;
        });
    };

    // Delete specific slot
    const handleDelete = (index) => {
        setImages((prev) => {
            const newImages = [...prev];
            newImages[index] = null; // clear that slot only
            return newImages;
        });
    };

    const handleImageUpload = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImages((prev) => ({
                    ...prev,
                    [index]: { file: file, url: e.target.result },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index) => {
        setUploadedImages((prev) => {
            const newImages = { ...prev };
            delete newImages[index];
            return newImages;
        });
        setIconTexts((prev) => {
            const newTexts = { ...prev };
            delete newTexts[index];
            return newTexts;
        });
    };

    const handleIconTextChange = (index, value) => {
        setIconTexts((prev) => ({ ...prev, [index]: value }));
    };

    const handleKeyFeatureChange = (index, value) => {
        const newFeatures = [...productData.keyFeatures];
        newFeatures[index] = value;
        setProductData((prev) => ({ ...prev, keyFeatures: newFeatures }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            // Add text fields
            formData.append("categoryId", productData.categoryId);
            formData.append("name", productData.name);
            formData.append("subName", productData.subName);
            formData.append("coverDesc", productData.coverDesc);
            formData.append("mainDesc", productData.mainDesc);
            formData.append("code", productData.code);

            // Key Features (as JSON string so backend can JSON.parse)
            formData.append("keyFeatures", JSON.stringify(productData.keyFeatures.filter(f => f.trim() !== "")));

            // Smart icons text (also stringify)
            formData.append("smartIconsText", JSON.stringify(
                Object.values(iconTexts).filter(t => t.trim() !== "")
            ));

            // Cover + Gallery images
            images.forEach((img, idx) => {
                if (img && img instanceof File) {
                    if (idx === 0) {
                        formData.append("cover", img);
                    } else {
                        formData.append("gallery", img);
                    }
                }
            });

            // Smart icon images
            Object.keys(uploadedImages).forEach((idx) => {
                const fileObj = uploadedImages[idx];
                if (fileObj.file) {
                    formData.append("smartIcons", fileObj.file);
                }
            });

            const res = await fetch(
                `https://nystai-com-dashboarad.onrender.com/api/products/update/${productId}`,
                {
                    method: "PUT",
                    body: formData, // ⬅️ no headers, browser sets multipart/form-data automatically
                }
            );

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Server error: ${text}`);
            }

            const data = await res.json();
            console.log("Updated product:", data);

            alert("Product updated successfully!");

            // Navigate back to the product list with the category ID
            if (categoryId) {
                navigate(`/admin/add-category/Productlistdash/${categoryId}`);
            } else {
                navigate("/admin/add-category/Productlistdash");
            }

        } catch (err) {
            console.error("Update failed", err);
            alert(`Failed to update product: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card-container pt-0">
            <div className="student-course-header">
                <Link
                    to={categoryId ? `/admin/add-category/Productlistdash/${categoryId}` : "/admin/add-category/Productlistdash"}
                    className="back-link"
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            style={{
                                padding: "3px",
                                background: "#ff8d91",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                marginRight: "15px",
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                style={{ color: "#fff", fontSize: "15px" }}
                            />
                        </button>
                        <h3 className="pt-2">EDIT PRODUCT PAGE</h3>
                    </div>
                </Link>
            </div>



            <form onSubmit={handleSubmit} className="">
                <div className="row g-2">
                    <div className="col-lg-6">
                        <div className="card bg-form-addprod" style={{ border: "none", outline: "none" }}>
                            <div className="row p-0">

                                {/* Product Name */}
                                <div className="col-lg-4 add-prod-inputs">
                                    <label>Product Name</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control custom-placeholder"
                                            placeholder="Product Name"
                                            value={productData.name}
                                            onChange={(e) =>
                                                setProductData((prev) => ({
                                                    ...prev,
                                                    name: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Sub Name */}
                                <div className="col-lg-4 add-prod-inputs">
                                    <label>Sub Name</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control custom-placeholder"
                                            placeholder="Sub Name"
                                            value={productData.subName}
                                            onChange={(e) =>
                                                setProductData((prev) => ({
                                                    ...prev,
                                                    subName: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Product Code */}
                                <div className="col-lg-4 add-prod-inputs">
                                    <label>Product Code</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control custom-placeholder"
                                            placeholder="Product Code"
                                            value={productData.code}
                                            onChange={(e) =>
                                                setProductData((prev) => ({
                                                    ...prev,
                                                    code: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Key Features */}
                                {productData.keyFeatures.map((feature, index) => (
                                    <div className="col-lg-6 add-prod-inputs" key={index}>
                                        <label>{index + 1}. Key Features</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control custom-placeholder"
                                                placeholder={`AI Fish Eye Camera 3MP+IR`}
                                                value={feature}
                                                onChange={(e) =>
                                                    handleKeyFeatureChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* Small Description */}
                                <div className="col-lg-6 add-prod-inputs">
                                    <label>Small Description</label>
                                    <div className="input-group">
                                        <textarea
                                            className="form-control custom-placeholder"
                                            aria-label="With textarea"
                                            placeholder="AI Fish Eye Camera 3MP+IR"
                                            style={{ height: "100px" }}
                                            value={productData.coverDesc}
                                            onChange={(e) =>
                                                setProductData((prev) => ({
                                                    ...prev,
                                                    coverDesc: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="col-lg-6 add-prod-inputs">
                                    <label>Description</label>
                                    <div className="input-group">
                                        <textarea
                                            className="form-control custom-placeholder"
                                            aria-label="With textarea"
                                            placeholder="AI Fish Eye Camera 3MP+IR"
                                            style={{ height: "100px" }}
                                            value={productData.mainDesc}
                                            onChange={(e) =>
                                                setProductData((prev) => ({
                                                    ...prev,
                                                    mainDesc: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card bg-form-addprod" style={{ border: "none", outline: "none" }}>
                            {/* Main Images - 4 Fixed Slots */}
                            <div className="row">
                                {images.map((img, index) => (
                                    <div className="col-lg-3" key={index}>
                                        <label className="form-label" style={{ fontSize: "15px", fontWeight: "bold", color: "#616161" }}>
                                            Product Image {index + 1}
                                        </label>
                                        <div
                                            style={{
                                                border: "1px dashed #ffebab",
                                                borderRadius: "50px",
                                                height: "60px",
                                                width: "60px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                position: "relative",
                                                background: "#ffebab",
                                            }}
                                        >
                                            {img ? (
                                                <>
                                                    <img
                                                        src={img}
                                                        alt={`Preview ${index + 1}`}
                                                        style={{
                                                            maxWidth: "100%",
                                                            maxHeight: "100%",
                                                            borderRadius: "6px",
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(index)}
                                                        style={{
                                                            position: "absolute",
                                                            top: "-5px",
                                                            right: "-5px",
                                                            background: "#ff8d91",
                                                            border: "none",
                                                            height: "25px",
                                                            width: "25px",
                                                            borderRadius: "50%",
                                                            color: "white",
                                                            cursor: "pointer",
                                                            fontSize: "10px"
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faXmark} />
                                                    </button>
                                                </>
                                            ) : (
                                                <span style={{ color: "#4A4A4A99", fontSize: "10px" }}>Empty</span>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Gateway Upload Input */}
                                <div className="mt-3">
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleGatewayUpload}
                                            style={{
                                                position: 'absolute',
                                                inset: '0',
                                                width: '100%',
                                                height: '100%',
                                                opacity: '0',
                                                cursor: 'pointer',
                                                zIndex: '10'
                                            }}
                                            accept="image/*"
                                        />
                                        <div style={{
                                            border: '1px dashed #cda10e',
                                            borderRadius: '8px',
                                            padding: '60px 20px',
                                            textAlign: 'center',
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            minHeight: '200px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#f0f0f0';
                                                e.target.style.borderColor = '#ccc';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.borderColor = '#cda10e';
                                            }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <div style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Upload style={{ width: '40px', height: '40px', color: '#f5d547' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Icon Images & Texts */}
                            <div className="mt-0">
                                <div style={{ display: "flex", gap: "0px", flexWrap: "wrap", justifyContent: "space-between" }} >
                                    {[0, 1, 2, 3, 4].map((index) => {
                                        const hasImage = uploadedImages[index];
                                        return (
                                            <div key={index} className="mb-3" style={{ flex: "1", margin: "0 10px", }}>
                                                {/* Text */}
                                                <div className="col-lg-4 add-prod-inputs" style={{ marginBottom: '7px', width: '102px' }}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Icon Text"
                                                        value={iconTexts[index] || ""}
                                                        onChange={(e) =>
                                                            handleIconTextChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        style={{
                                                            width: "100%", height: "30px", borderRadius: "4px", fontSize: "15px", color: "#4A4A4A99"
                                                        }}
                                                    />
                                                </div>

                                                {/* Image */}
                                                <div style={{ position: "relative" }}>
                                                    {!hasImage && (
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                handleImageUpload(
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            style={{ position: "absolute", inset: "0", width: "100%", height: "100%", opacity: "0", cursor: "pointer", zIndex: "10" }}
                                                        />
                                                    )}
                                                    <div
                                                        style={{
                                                            border: hasImage
                                                                ? "1px solid #ddd"
                                                                : "1px dashed #cfa209",
                                                            borderRadius: "8px",
                                                            textAlign: "center",
                                                            backgroundColor:
                                                                "transparent",
                                                            cursor: "pointer",
                                                            transition:
                                                                "all 0.2s ease",
                                                            height: "66px",
                                                            width: "102px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            position: "relative",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        {hasImage ? (
                                                            <>
                                                                <img
                                                                    src={
                                                                        hasImage.url
                                                                    }
                                                                    alt="Uploaded preview"
                                                                    style={{ width: "100%", height: "50px", objectFit: "contain", borderRadius: "7px" }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeImage(
                                                                            index
                                                                        )
                                                                    }
                                                                    style={{
                                                                        position: "absolute", top: "5px", right: "5px", background: "#ff8d91", border: "none", height: "25px", width: "25px", borderRadius: "50%", color: "white", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                                                                    }}
                                                                >
                                                                    ×
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    alignItems:
                                                                        "center",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{ width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
                                                                >
                                                                    <Upload
                                                                        style={{
                                                                            width: "25px",
                                                                            height:
                                                                                "25px",
                                                                            color: "#f5d547",
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className="auth-submit-btn mt-0 col-sm-12 col-md-6 col-lg-3 col-8"
                                    disabled={loading}
                                >
                                    {loading ? "Updating..." : "Update Product"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


        </div>
    );
};

export default EditProduct;