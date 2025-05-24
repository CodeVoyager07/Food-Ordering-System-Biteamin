import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // ✅ Store Preview
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "BURGERS", // Default category
  });
  const [loading, setLoading] = useState(false); // ✅ Loading state for form submission

  // ✅ Handle Input Change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ✅ Handle Image Selection
  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // ✅ Show preview
      setImage(file); // ✅ Store actual file (not Base64)
    }
  };

  // ✅ Handle Form Submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // ✅ Disable submit button while submitting

    if (!data.name || !data.description || !data.price || !image) {
      toast.error("All fields are required!");
      setLoading(false); // ✅ Enable submit button if validation fails
      return;
    }

    try {
      // ✅ Create FormData & Append File
      const formData = new FormData();
      formData.append("file", image); // ✅ Use raw file
      formData.append("upload_preset", "ml_default"); // ✅ Change to your Cloudinary preset

      // ✅ Upload to Cloudinary
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dppdo9ezc/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const imageUrl = cloudinaryResponse.data.secure_url;
      console.log("Uploaded Image URL:", imageUrl);

      // ✅ Send Data to Backend
      const response = await axios.post(`${url}/api/food/add`, {
        name: data.name,
        description: data.description,
        price: Number(data.price), // Ensure price is treated as a number
        category: data.category,
        image: imageUrl, // ✅ Send Cloudinary URL
      });

      console.log("Response:", response.data);

      if (response.data && response.data.success) {
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);
        setImagePreview(null); // ✅ Clear image preview on success
        toast.success("🎉 Food added successfully!");
      } else {
        toast.error("❌ Failed to upload food. Please try again!");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.message || "❌ Something went wrong!");
    } finally {
      setLoading(false); // ✅ Enable submit button after the process
    }
  };

  return (
    <div className="add">
      <form className="flex flex-col" onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={imagePreview || assets.upload_icon} // ✅ Show preview if available
              alt="Upload Preview"
              style={{ width: "96px", height: "96px", objectFit: "cover", borderRadius: "8px" }} // ✅ Set Preview Size
            />
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="image"
            hidden
            accept="image/*"
            required
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        {/* Category & Price */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              <option value="BURGERS">BURGERS</option>
              <option value="WRAP">WRAP</option>
              <option value="MOMOS">MOMOS (10 pcs)</option>
              <option value="SANDWICH">SANDWICH</option>
              <option value="PIZZA">PIZZA</option>
              <option value="FRENCH FRIES">FRENCH FRIES</option>
              <option value="MAGGIE & PASTA">MAGGIE & PASTA</option>
              <option value="SHAKE">SHAKE</option>
              <option value="TEA & COFFEE">TEA & COFFEE</option>
              <option value="MOCKTAILS">MOCKTAILS</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
              required
              min="0" // Allow only positive numbers
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Adding..." : "ADD"} {/* Change button text while loading */}
        </button>
      </form>
    </div>
  );
};

export default Add;
