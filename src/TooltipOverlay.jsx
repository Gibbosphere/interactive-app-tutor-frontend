import React, { useLayoutEffect, useState } from "react";

const TooltipOverlay = ({ targetAreaEl }) => {
  const [targetAreaPos, setTargetAreaPos] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const targetAreaElement = document.querySelector(targetAreaEl);
    if (!targetAreaElement) return;

    // Position the target area highlight
    const updateTargetAreaPosition = () => {
      const rect = targetAreaElement.getBoundingClientRect();
      setTargetAreaPos({
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
      });
      console.log(rect.top);
    };

    updateTargetAreaPosition();
    window.addEventListener("resize", updateTargetAreaPosition);
    window.addEventListener("scroll", updateTargetAreaPosition);

    return () => {
      window.removeEventListener("resize", updateTargetAreaPosition);
      window.removeEventListener("scroll", updateTargetAreaPosition);
    };
  }, [targetAreaEl]);

  const areaOffset = 5;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // ensures elements in inner rectangle are clickable
      }}
    >
      {/* Outer rectangles on the top, left, right, and bottom that blocks pointer events */}
      <rect
        id="topRect"
        x="0"
        y="0"
        width="100%"
        height={Math.max(targetAreaPos.top - areaOffset, 0)}
        fill="black"
        fillOpacity={0.2}
        style={{ pointerEvents: "all" }} // elements behind overlay not clickable
      />

      <rect
        id="leftRect"
        x="0"
        y={targetAreaPos.top - areaOffset}
        width={Math.max(targetAreaPos.left - areaOffset, 0)}
        height={Math.max(targetAreaPos.height + 2 * areaOffset, 0)}
        fill="black"
        fillOpacity={0.2}
        style={{ pointerEvents: "all" }}
      />

      <rect
        id="rightRect"
        x={targetAreaPos.left + targetAreaPos.width + areaOffset}
        y={targetAreaPos.top - areaOffset}
        width={Math.max(
          document.documentElement.clientWidth -
            (targetAreaPos.left + targetAreaPos.width + areaOffset),
          0
        )}
        height={Math.max(targetAreaPos.height + 2 * areaOffset, 0)}
        fill="black"
        fillOpacity={0.2}
        style={{ pointerEvents: "all" }}
      />

      <rect
        id="bottomRect"
        x="0"
        y={targetAreaPos.top + targetAreaPos.height + areaOffset}
        width="100%"
        height={Math.max(
          document.documentElement.clientHeight -
            (targetAreaPos.top + targetAreaPos.height + areaOffset),
          0
        )}
        fill="black"
        fillOpacity={0.2}
        style={{ pointerEvents: "all" }}
      />
    </svg>
  );
};

export default TooltipOverlay;
