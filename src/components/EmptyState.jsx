export default function EmptyState({ title, message }) {
  return (
    <div>
      <div role="alert">
        <strong>{title}</strong> {message}
      </div>
    </div>
  );
}
