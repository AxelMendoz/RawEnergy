import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>([])
  const [selected, setSelected] = useState("ALL")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      // Usamos los nombres que el error de SQL nos confirmó: id, title, image_url
      const { data, error } = await supabase
        .from("fotos")
        .select("id, title, image_url")
        .order("id", { ascending: false })

      if (error) {
        console.error("Error de Supabase:", error.message)
      } else {
        console.log("¡ÉXITO! Fotos encontradas:", data?.length)
        setPhotos(data || [])
      }
    } finally {
      setLoading(false)
    }
  }

  // El filtro ahora usa la columna 'title'
  const filtered = selected === "ALL" 
    ? photos 
    : photos.filter((p) => p.title === selected)

  return (
    <section id="gallery" style={{ background: "#000", minHeight: "100vh", padding: "60px 20px", color: "#fff" }}>
      <h2 style={{ textAlign: "center", fontSize: "3rem", letterSpacing: "8px", marginBottom: "50px", fontWeight: "900" }}>
        RAW ENERGY
      </h2>

      {/* Filtros Deportivos */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "60px", flexWrap: "wrap" }}>
        {["ALL", "FUTBOL", "BALONCESTO", "BOXEO", "ATLETISMO"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            style={{
              padding: "12px 30px",
              backgroundColor: selected === cat ? "#ff0000" : "transparent",
              color: "#fff",
              border: "3px solid #ff0000",
              cursor: "pointer",
              fontWeight: "900",
              textTransform: "uppercase",
              transition: "0.3s ease",
              fontSize: "0.9rem"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "1.5rem", letterSpacing: "2px" }}>PROCESANDO IMPACTO...</p>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
          gap: "30px",
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          {filtered.map((foto) => (
            <div key={foto.id} className="gallery-card" style={{ position: "relative", backgroundColor: "#0a0a0a", border: "1px solid #222" }}>
              <img 
                src={foto.image_url} // URL confirmada en tu Table Editor
                alt={foto.title} 
                style={{ width: "100%", height: "500px", objectFit: "cover", display: "block", filter: "grayscale(20%) contrast(1.1)" }} 
              />
              <div style={{ 
                position: "absolute", 
                bottom: 0, 
                width: "100%", 
                padding: "25px", 
                background: "linear-gradient(to top, rgba(0,0,0,1), transparent)" 
              }}>
                <span style={{ fontSize: "1.2rem", fontWeight: "bold", textTransform: "uppercase", color: "#ff0000" }}>
                  {foto.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "#444", marginTop: "40px" }}>SIN REGISTROS EN ESTA CATEGORÍA.</p>
      )}
    </section>
  )
}