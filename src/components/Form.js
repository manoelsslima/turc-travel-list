import { useState } from "react";

export default function Form({ onAddItems }) {
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
