import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Admin() {
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState("FUTBOL")

  const uploadPhoto = async () => {
    if (!file) return alert("Selecciona una imagen")

    const fileName = `${Date.now()}-${file.name}`

    // 1️⃣ Subir a Storage
    const { error: uploadError } = await supabase.storage
      .from("fotos")
      .upload(fileName, file)

    if (uploadError) {
      console.error(uploadError)
      return alert("Error subiendo imagen")
    }

    // 2️⃣ Obtener URL pública
    const { data } = supabase.storage
      .from("fotos")
      .getPublicUrl(fileName)

    const publicUrl = data.publicUrl

    // 3️⃣ Guardar en base de datos
    const { error: dbError } = await supabase
      .from("fotos")
      .insert([{ image_url: publicUrl, title: category }])

    if (dbError) {
      console.error(dbError)
      return alert("Error guardando en base de datos")
    }

    alert("Imagen subida correctamente 🔥")
  }

  return (
    <section>
      <h2>PANEL DE CONTROL</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ marginTop: "20px" }}
      />

      <br /><br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: "10px" }}
      >
        <option value="FUTBOL">FUTBOL</option>
        <option value="BALONCESTO">BALONCESTO</option>
        <option value="BOXEO">BOXEO</option>
        <option value="ATLETISMO">ATLETISMO</option>
      </select>

      <br /><br />

      <button
        onClick={uploadPhoto}
        className="primary-btn"
      >
        SUBIR FOTO
      </button>
    </section>
  )
}