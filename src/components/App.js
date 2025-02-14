import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);
  const [sortedItems] = useState([]);

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

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
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
        onSortItems={sortedItems}
        onClearItems={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
