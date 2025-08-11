import React from "react";

interface GifProps {
  title?: string;
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export const GifDisplay: React.FC<GifProps> = ({
  title,
  src,
  alt = "GIF",
  width = "100%",
  height = "auto",
}) => {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
        padding: "1rem",
        background: "#111",
        borderRadius: "8px",
      }}
    >
      {title && (
        <h3 style={{ color: "#fff", marginBottom: "0.5rem" }}>{title}</h3>
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          display: "block",
          borderRadius: "6px",
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};
