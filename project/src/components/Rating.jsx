import Star from "./Star";

const Rating = ({ rating }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const filledPercentage = Math.max(0, Math.min(100, (rating - i) * 100));
    stars.push(<Star key={i} filledPercentage={filledPercentage} />);
  }

  return <div style={{ display: "flex" }}>{stars}</div>;
};

export default Rating;
