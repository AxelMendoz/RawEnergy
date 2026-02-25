import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const categories = ["FUTBOL", "BALONCESTO", "BOXEO", "ATLETISMO"]

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("fotos")
        .select("id, title, image_url")
        .order("id", { ascending: false })

      if (!error) setPhotos(data || [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="gallery" className="campaign-section">
      {categories.map((cat) => {
        const categoryPhotos = photos.filter((p) => p.title === cat)
        if (categoryPhotos.length === 0) return null

        return (
          <div
            key={cat}
            className="campaign-block"
            style={{
              backgroundImage: `url(${categoryPhotos[0].image_url})`,
            }}
            onClick={() => setActiveCategory(cat)}
          >
            <div className="campaign-overlay" />
            <div className="campaign-content">
              <h2>{cat}</h2>
              <p>Explora la intensidad.</p>
            </div>
          </div>
        )
      })}

      {/* OVERLAY FULLSCREEN CATEGORIA */}
      {activeCategory && (
        <div className="gallery-overlay">
          <button
            className="close-btn"
            onClick={() => setActiveCategory(null)}
          >
            ✕
          </button>

          <h2 className="overlay-title">{activeCategory}</h2>

          <div className="overlay-grid">
            {photos
              .filter((p) => p.title === activeCategory)
              .map((foto) => (
                <div key={foto.id} className="overlay-card">
                  <img
                    src={foto.image_url}
                    alt={foto.title}
                    onClick={() => setSelectedImage(foto.image_url)}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* LIGHTBOX IMAGEN INDIVIDUAL */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <span className="close-lightbox">✕</span>
          <img
            src={selectedImage}
            alt="preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}