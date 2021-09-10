import React from "react";
import IconFont from "../IconFont";
import "./index.less";

const prefixCls = "music-affix";

const AffixMusic = () => {
  return (
    <div className={`${prefixCls}`}>
      <IconFont style={{ fontSize: "32px", zIndex: 1 }} type="icon-musicicon" />
    </div>
  );
};

export default AffixMusic;
