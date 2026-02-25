import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import Gallery from "./pages/Gallery"
import Admin from "./pages/Admin"
import Login from "./pages/inicio"

function App() {
  const [session, setSession] = useState<any>(null)
  const [route, setRoute] = useState(window.location.pathname)

  useEffect(() => {
    const handlePop = () => {
      setRoute(window.location.pathname)
    }

    window.addEventListener("popstate", handlePop)

    supabase.auth.getSession().then(({ data }: { data: any }) => {
      setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      window.removeEventListener("popstate", handlePop)
      listener.subscription.unsubscribe()
    }
  }, [])

  // RUTA ADMIN (única privada)
  if (route === "/admin") {
    if (!session) return <Login />
    return <Admin />
  }

  // LANDING PÚBLICA
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>RAW ENERGY</h1>
          <p>Capturando la intensidad real del deporte.</p>

          <button
            className="primary-btn"
            onClick={() =>
              document
                .getElementById("gallery")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            VER EL IMPACTO
          </button>
        </div>
      </section>

      <Gallery />

      <section>
        <h2>MENTALIDAD</h2>
        <p style={{ maxWidth: "600px", marginTop: "20px", color: "#aaa" }}>
          Disciplina. Pasión. Intensidad.
          No capturamos fotos.
          Capturamos el momento donde el límite se rompe.
        </p>
      </section>

      <section className="cta">
        <h2>¿ESTÁS LISTO PARA QUE TE VEAN?</h2>
        <button>CONTACTAR</button>
      </section>
    </>
  )
}

export default App