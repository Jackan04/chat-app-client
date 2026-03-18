export default function Error({ message }) {
  return (
    <div>
      <div role="alert" data-variant="error">
        <strong>Error!</strong> <p>{message}</p>
      </div>
    </div>
  );
}
