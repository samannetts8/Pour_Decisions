import React, { useState, useRef, useContext } from "react";
import { analysisResultContext } from "../pages/ImageUpload";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ResultsTable from "./ResultsTable";
import FieldButtons from "../components/RadioButton"

const UploadArea = ({ wineData }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useContext(analysisResultContext);
  const [displayedWineCount, setDisplayedWineCount] = useState(null)
  const [searchField, setSearchField] = useState('')
  
  const fileInputRef = useRef(null);

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchField(event.target.value);
    };
  

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setImage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
      setAnalysisResult(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

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

  const handleSubmit = async (searchField) => {
    if (!image) {
      setAnalysisResult({ error: "No image selected" });
      console.log(analysisResult);
      return;
    }
    if (!searchField) {
      setAnalysisResult({ error: "No search field selected" });
      console.log(analysisResult);
      return;
    }
    setIsLoading(true);

    try {
      // Create form data to send the image
      const formData = new FormData();
      formData.append("image", image);
      formData.append("field", searchField);
      console.log(formData);
      console.log(searchField);
      console.log("prefetch");
      // Replace with your actual backend API endpoint
      const response = await fetch("http://127.0.0.1:5000/image", {
        method: "POST",
        body: formData,
      });
      console.log("Response received:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        throw new Error("Fetch request failed");
      }
      const result = await response.json();
      const flattened_result = result.flat()
      console.log(flattened_result)
      setAnalysisResult(flattened_result);
      setDisplayedWineCount(flattened_result.length)
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysisResult({
        error: "Failed to analyze image. Please try again.",
      });
    } finally {
      console.log(analysisResult);
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (event) => {
    // Stop propagation to prevent the click from triggering the file input
    event.stopPropagation();

    // Clean up the object URL to avoid memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Reset state
    setImage(null);
    setPreviewUrl(null);
    setAnalysisResult(null);

    // Also reset the file input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };


  
  return (
    <div className="max-w-xl mx-auto">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer mb-6 ${
          isDragging
            ? "border-wine bg-wine/5"
            : "border-gold/30 hover:border-wine/60"
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
            <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-xl" />
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
        <FieldButtons handleFieldChange={handleFieldChange} searchField={searchField} />
      </div>
  
      {/* Submit Button */}
      <button
        onClick={() => handleSubmit(searchField)}
        disabled={!image || isLoading}
        className={`w-full py-3 px-6 rounded-xl font-cinzel text-lg transition-colors ${
          !image || isLoading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-wine text-cream hover:bg-wine/90"
        }`}
      >
        {isLoading ? "Analyzing..." : "Show matches"}
      </button>
  
      {/* Results Section */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
        >
          <h3 className="font-cinzel text-xl text-wine mb-4 text-center">
            {displayedWineCount === 1 
              ? `Found ${displayedWineCount} potential match`
              : `Found ${displayedWineCount} potential matches`}
          </h3>
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
        </motion.div>
      )}
    </div>
  );
};

export default UploadArea;
