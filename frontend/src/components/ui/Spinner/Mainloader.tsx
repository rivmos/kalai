import * as React from "react"
const Mainloader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    preserveAspectRatio="xMidYMid"
    style={{
      margin: "auto",
      background: "#fff",
      display: "block",
      shapeRendering: "auto",
    }}
    viewBox="0 0 100 100"
  >
    <path
      fill="none"
      stroke="#6754e9"
      strokeDasharray="42.76482137044271 42.76482137044271"
      strokeLinecap="round"
      strokeWidth={8}
      d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z"
      style={{
        transform: "scale(.8)",
        transformOrigin: "50px 50px",
      }}
    >
      <animate
        attributeName="stroke-dashoffset"
        dur="2.6315789473684212s"
        keyTimes="0;1"
        repeatCount="indefinite"
        values="0;256.58892822265625"
      />
    </path>
  </svg>
)
export default Mainloader
