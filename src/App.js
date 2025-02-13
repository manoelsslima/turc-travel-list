import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form() {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // that cannot be done because we cannot mutate State
    // setItems((items) => items.push(item));

    // creating a new array with the new item. This way, we are not mutating State
    setItems((items) => [...items, item]);
  }

  // receive an event from form (onSubmit)
  function handleSubmit(e) {
    // avoid the submission
    e.preventDefault();

    // avoid submit withou description
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    handleAddItems(newItem);

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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>✖️</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items on your list, and you alread packed X (X%)</em>
    </footer>
  );
}
