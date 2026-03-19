export default function Error({ message, onRetry }) {
  return (
    <div className="error-message vstack">
      <div role="alert" data-variant="error">
        <strong>Error!</strong> <p>{message}</p>
      </div>
      <button className="outline" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
