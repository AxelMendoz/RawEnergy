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
      (_event: any, session: any) => {
        setSession(session)
      }
    )

    return () => {
      window.removeEventListener("popstate", handlePop)
      listener.subscription.unsubscribe()
    }
  }, [])

  if (route === "/admin") {
    if (!session) return <Login />
    return <Admin />
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>
            RAW <span>ENERGY</span>
          </h1>

          <p>
            No capturamos deporte.
            <br />
            Capturamos el instante donde el límite se rompe.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              document
                .getElementById("gallery")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            DESCUBRIR
          </button>
        </div>
      </section>

      <Gallery />

      {/* MENTALIDAD */}
      <section className="mentalidad">
        <h2>MENTALIDAD</h2>
        <p>
          Disciplina. Pasión. Intensidad.
          <br />
          La energía no se explica.
          <br />
          Se siente.
        </p>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>EL MOMENTO ES AHORA</h2>
        <button>RESERVA TU SESIÓN</button>
      </section>
    </>
  )
}

export default App