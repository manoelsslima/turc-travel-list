export default function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* we must use () => onDeleteItems() because without () =>, React
            will call the function directly and we need the function to be called
            only when the user clicks in the button */}
      <button onClick={() => onDeleteItems(item.id)}>✖️</button>
    </li>
  );
}
