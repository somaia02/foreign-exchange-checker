import "./EmptyChart.css";
export default function EmptyChart({ content = "Loading..." }) {
  return (
    <div className="loading-chart">
      <p>{content}</p>
    </div>
  );
}
