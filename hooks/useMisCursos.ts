import { useEffect, useState } from "react"

type Curso = {
  acronimo: string
  nombre: string
  nivel: string
  grado: string
}

export function useMisCursos() {
  const [cursos, setCursos] = useState<Curso[]>([])

  useEffect(() => {
    window.electronAPI?.leerCursosLocales?.()
      .then((data) => {
        console.log("📚 Cursos recibidos desde Electron:", data)
        setCursos(data)
      })
      .catch((err) => console.error("❌ Error leyendo cursos:", err))
  }, [])

  return cursos
}
