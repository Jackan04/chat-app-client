export default function Error({ message }) {
  return (
    <div className="error-message" role="alert" data-variant="error">
      <strong>Error!</strong> <p>{message}</p>
    </div>
  );
}
