import React, { useState, useRef, useContext } from "react";
import { analysisResultContext } from "../pages/ImageUpload";
import { motion, AnimatePresence } from "framer-motion";
import ResultsTable from "./ResultsTable";
import FieldButtons from "../components/RadioButton";
import sample_wine_bottle from "../../../static/assets/sample_wine_bottle.png";
import sample_wine_menu from "../../../static/assets/sample_wine_menu.png";

const UploadArea = ({ wineData }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useContext(analysisResultContext);

  const [searchField, setSearchField] = useState("");

  const fileInputRef = useRef(null);

  // Function to convert a static image path to a File object
  const fetchImageAsFile = async (imagePath, fileName) => {
    try {
      // Fetch the image from the static path
      const response = await fetch(imagePath);
      const blob = await response.blob(); // Convert the response to a Blob
      // Create a File object from the Blob
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  // Handler for Example Wine Bottle button
  const handleExampleWineBottle = async () => {
    const file = await fetchImageAsFile(sample_wine_bottle, "sample_wine_bottle.png");
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Set the preview URL
      setAnalysisResult(null); // Reset analysis result
    }
  };

  // Handler for Example Wine Menu button
  const handleExampleWineMenu = async () => {
    const file = await fetchImageAsFile(sample_wine_menu, "sample_wine_menu.png");
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Set the preview URL
      setAnalysisResult(null); // Reset analysis result
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setImage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
      setAnalysisResult(null);
    }
  };

  // Handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setImage(droppedFile);
      const imageUrl = URL.createObjectURL(droppedFile);
      setPreviewUrl(imageUrl);
      setAnalysisResult(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (searchField) => {
    if (!image) {
      setAnalysisResult({ error: "No image selected" });
      return;
    }
    if (!searchField) {
      setAnalysisResult({ error: "No search field selected" });
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("field", searchField);

      const response = await fetch("http://127.0.0.1:5000/image", {
      // const response = await fetch("http://13.49.80.112:5000/image", {  
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Fetch request failed");
      }
      const result = await response.json();
      const flattened_result = result.flat();
      setAnalysisResult(flattened_result);
      
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysisResult({
        error: "Failed to analyze image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle remove image
  const handleRemoveImage = (event) => {
    event.stopPropagation();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle click on upload area
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle field change for radio buttons
  const handleFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Flex container to hold Upload Area and Right Side Boxes */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Upload Area (Left Side) */}
        <div className="flex-1 max-w-xl mx-auto">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer mb-6 ${
              isDragging
                ? "border-wine bg-wine/5"
                : "border-gold/100 hover:border-wine/60"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {previewUrl ? (
              <div className="mb-4 relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-xl"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-wine text-cream p-1.5 rounded-full hover:bg-wine/90 transition-colors focus:outline-none"
                  title="Remove image"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="py-4">
                <svg
                  className="mx-auto h-12 w-12 text-wine/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="mt-2 font-cinzel text-wine/80">
                  Click to upload or drag and drop an image
                </p>
                <p className="mt-1 text-sm text-wine/60">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>

          {/* Radio Buttons */}
          <div className="mb-6">
            <FieldButtons
              handleFieldChange={handleFieldChange} // Pass handleFieldChange here
              searchField={searchField}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={() => handleSubmit(searchField)}
            disabled={!image || isLoading}
            className={`w-full py-3 px-6 rounded-xl font-cinzel text-lg transition-colors ${
              !image || isLoading
                ? "bg-wine/15 text-wine/60 cursor-not-allowed"
                : "bg-wine text-cream hover:bg-wine/90"
            }`}
          >
            {isLoading ? "Analyzing..." : "Show matches"}
          </button>
        </div>

        {/* Right Side Boxes */}
        <div className="flex-1 max-w-md space-y-6">
          {/* Top Box */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 h-[calc(50%-12px)]">
            <h3 className="font-cinzel text-lg text-wine mb-3">
              <strong>Instructions</strong>
            </h3>
            <p className="text-wine/80 text-sm">
              1. Upload an image of a wine bottle or wine list
              <br />
              2. Select a field to search for
              <br />
              3. Click "Show matches" to generate list of potential matches
              <br />
              <br />
              <span className="italic">
                Note: Results are drawn from a sample database of 800 wines.
              </span>
            </p>
          </div>

          {/* Bottom Example Boxes */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 h-[calc(50%-12px)]">
            <h3 className="font-cinzel text-lg text-wine mb-3">
              <strong>Examples</strong>
            </h3>
            <p className="text-wine/80 text-sm mb-4 ">
              Click on one of the template buttons below to upload a
              demonstration: <br />
            </p>

            {/* Button Container */}
            <div className="grid grid-cols-2 gap-4">
              {/* Button 1 */}
              <button
                className="w-full py-2 px-4 bg-wine text-cream rounded-lg font-cinzel text-sm hover:bg-wine/90 transition-colors focus:outline-none"
                onClick={handleExampleWineBottle}
              >
                Example Wine Bottle
              </button>

              {/* Button 2 */}
              <button
                className="w-full py-2 px-4 bg-wine text-cream rounded-lg font-cinzel text-sm hover:bg-wine/90 transition-colors focus:outline-none"
                onClick={handleExampleWineMenu}
              >
                Example Wine Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <AnimatePresence>
        {analysisResult && (
          <div className="fixed inset-x-0 w-full mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2 }}
              transition={{ duration: 0.5 }}
              className="max-w-[50000px] mx-auto px-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                {analysisResult.error ? (
                  <p className="text-wine/80 text-center font-cinzel">
                    {analysisResult.error}
                  </p>
                ) : (
                  <ResultsTable
                    analysisResult={analysisResult}
                    wineData={wineData}
                    searchField={searchField}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadArea;