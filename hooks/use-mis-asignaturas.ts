import { useEffect, useState } from "react"

type Asignatura = {
  id: string
  nombre: string
  creditos?: number
}

export function useMisAsignaturas() {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([])

  useEffect(() => {
    window.electronAPI?.leerAsignaturasLocales?.()
      .then((data: any[]) => {
        console.log("📁 Datos recibidos desde Electron:", data)
        setAsignaturas(data)
      })
      .catch((err) => console.error("❌ Error leyendo asignaturas:", err))
  }, [])

  return asignaturas
}

