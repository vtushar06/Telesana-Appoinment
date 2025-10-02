import React from "react";
import TelesanaLogo from "./telesana-logo";

export default function TelesanaFullLogo({ 
  className = "", 
  logoSize = "h-12 w-12",
  showTagline = true 
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <TelesanaLogo className={logoSize} />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          Telesana
        </h1>
        {showTagline && (
          <p className="text-xs text-muted-foreground tracking-wider">
            HEALTHCARE REDEFINED
          </p>
        )}
      </div>
    </div>
  );
}
