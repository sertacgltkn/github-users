import React, { useState, useEffect } from "react";
import "./Loading.css";

export default function Loading({ show }) {
  return (
    <div className={`loading-container top-right rounded-lg ${show ? "show" : "hide"}`}>
      <div className="loading-text font-bold text-3xl ">Loading...</div>
    </div>
  );
}
