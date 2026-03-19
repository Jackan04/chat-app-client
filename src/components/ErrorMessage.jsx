import { useNavigate } from "react-router-dom";

export default function Error({ message }) {
  const navigate = useNavigate();
  return (
    <div className="error-message vstack">
      <div role="alert" data-variant="error">
        <strong>Error!</strong> <p>{message}</p>
      </div>
      <button className="outline" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}
