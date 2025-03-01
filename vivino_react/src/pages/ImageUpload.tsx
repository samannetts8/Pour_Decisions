import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Database, ChevronLeft, ChevronRight } from "lucide-react";
import Logo from "../../../static/assets/pour_decisions_logo_no_background.png";
import UploadArea from "../components/UploadArea"


export default function ImageUpload({wineData}) {    

return (
<div>
<header className="bg-wine shadow-lg">
  <div className="mx-auto px-6  flex items-center justify-between">
    <div className="flex items-center gap-6">
      {/* Top Left Logo */}
      <Link to="/">
        <img
          src={Logo}
          alt="Pour Decisions Logo"
          className="logo"
          width={120}
          height={120}
        />
      </Link>
      {/* Home Button */}
      <nav className="flex gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors font-cinzel"
        >
          <Home size={40} />
          Home
        </Link>
        {/* Image Upload Button */}
        <Link
          to="/database"
          className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors font-cinzel"
        >
            <Database size={40} />
            Database
        </Link>
      </nav>
    </div>
  </div>
</header>

<UploadArea/>

</div >)};