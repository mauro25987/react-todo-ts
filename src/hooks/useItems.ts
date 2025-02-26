import { useState } from "react"
import { Item, ItemId } from "../App"

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([])

  function addItem(text: string) {
    const newItem: Item = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text,
    }
    setItems([...items, newItem])
  }

  function removeItem(id: ItemId) {
    setItems(items.filter(item => item.id !== id))
  }

  function editItem(id: ItemId, text: string) {
    setItems(items.map(item => (item.id === id ? { ...item, text } : item)))
  }

  function clearItems() {
    setItems([])
  }

  return { items, addItem, removeItem, editItem, clearItems }
}
