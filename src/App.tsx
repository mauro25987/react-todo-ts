import Item from "./components/Item"
import { useItems, useSEO } from "./hooks/index"

export type ItemId = `${string}-${string}-${string}-${string}-${string}`

export interface Item {
  id: ItemId
  timestamp: number
  text: string
}

function App() {
  const { addItem, removeItem, editItem, items } = useItems()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { elements } = e.currentTarget
    const input = elements.namedItem("item")
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input === null) return
    addItem(input.value)
    input.value = ""
  }

  const handleRemoveItem = (id: ItemId) => () => {
    removeItem(id)
  }

  const handleEditItem = (id: ItemId) => (text: string) => {
    editItem(id, text)
  }

  useSEO({
    title: `[${items.length}] TodoList con React & TS`,
    description: "Agregar o Eliminar tareas de la lista",
  })

  return (
    <main>
      <aside>
        <h1>Agregar Elemento a la Lista</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="item">
            Agregar
            <input name="item" type="text" id="item" placeholder="Futbol" required />
          </label>
          <button>Agregar</button>
        </form>
      </aside>
      <section>
        <h2>Lista de Elementos</h2>
        {items.length === 0 ? (
          <p>No hay elementos en la lista</p>
        ) : (
          <ul>
            {items.map(item => (
              <Item key={item.id} {...item} handleClick={handleRemoveItem(item.id)} />
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
