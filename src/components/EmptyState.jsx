export default function EmptyState({ title, message }) {
  return (
    <div role="alert">
      <strong>{title}</strong> {message}
    </div>
  );
}
