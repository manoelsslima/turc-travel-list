import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  // we will pass the function to Form
  function handleAddItems(item) {
    // that cannot be done because we cannot mutate State
    // setItems((items) => items.push(item));

    // creating a new array with the new item. This way, we are not mutating State
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    // add items with id != from item.id to setItems()
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // update item. Destructure the item, update the property and add to a list
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        // destructuring an item instead the entire array
        // set the property "packed", fliping the value
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      {/* for convention: when passing functions, add de preposition "on" */}
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  // receive an event from form (onSubmit)
  function handleSubmit(e) {
    // avoid the submission
    e.preventDefault();

    // avoid submit withou description
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    // calling with the same name passed as prop
    onAddItems(newItem);

    setQuantity(1);
    setDescription("");
  }
  return (
    // onSubmit={handleSubmit} is the same as onSubmit={(e) => handleSubmit(e)}
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      {/* as it's a number, we need to convert. It can be done adding + before
      setQuantity(+e.target.value) or Number(e.target.value)
      */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* (currentValue, index) */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* binding do valor do form com um State. We also need to change the State using
      the setter method then passes the value of the event (event.target.value). */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItem }) {
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

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You got everything! Ready to go`
          : `👜 You have ${numItems} items on your list, and you alread packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
