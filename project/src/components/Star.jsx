const Star = ({ filledPercentage }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        fontSize: "24px",
      }}
    >
      {/* 빈 별 */}
      <span style={{ color: "lightgray" }}>★</span>
      {/* 채워지는 별 */}
      <span
        style={{
          color: "gold",
          position: "absolute",
          top: 0,
          left: 0,
          clipPath: `inset(0 ${100 - filledPercentage}% 0 0)`, // 왼쪽에서부터 가로 기준으로 채움
        }}
      >
        ★
      </span>
    </div>
  );
};

export default Star;
