import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email })
    alert("Revisa tu correo.")
  }

  return (
    <section style={{ textAlign: "center" }}>
      <h2>ADMIN ACCESS</h2>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "12px",
          marginTop: "20px",
          width: "300px",
          background: "#111",
          color: "white",
          border: "1px solid #333"
        }}
      />

      <br />

      <button
        onClick={handleLogin}
        className="primary-btn"
      >
        ENTRAR
      </button>
    </section>
  )
}