import { useNavigate } from "react-router-dom";

export default function PageHeader({ title }) {
  const navigate = useNavigate();
  return (
    <div className="hstack gap-4 mb-6 items-center">
      <button className="outline" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h2>{title}</h2>
    </div>
  );
}
