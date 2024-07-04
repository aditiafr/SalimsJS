import React from "react";

const HeaderTitle = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-3xl font-bold text-indigo-800">{title}</h3>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
};

export default HeaderTitle;
