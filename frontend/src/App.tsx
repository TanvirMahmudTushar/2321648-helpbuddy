import { type FormEvent, useState } from "react"

export default function App() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    try {
      const params = new URLSearchParams({ name: name || "World" })
      const res = await fetch(`/api/hello?${params}`)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data: { message: string } = await res.json()
      setMessage(data.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  return (
    <main>
      <h1>Tanvir Mahmud</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button type="submit">Say hello</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p className="error">{error}</p>}
      {/* EXERCISE (part 2): uncomment <UserForm /> and the UserForm function below. */}
      { <UserForm /> }
    </main>
  )
}

function UserForm() {
  const [form, setForm] = useState({ id: "", name: "", email: "" })
  const [reply, setReply] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setReply("")
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: Number(form.id) }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data: { message: string } = await res.json()
      setReply(data.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  return (
    <section>
      <h2>Send your details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          placeholder="ID"
          required
        />
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
        />
        <button type="submit">Send</button>
      </form>
      {reply && <p>{reply}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  )
}
