import { useEffect, useState } from "react"

type CE = {
  codigo: string
  descripcion: string
}

type RA = {
  codigo: string
  descripcion: string
  CE: CE[]
}

type Descripcion = {
  duracion: string
  centro: string
  empresa: string
}

type Asignatura = {
  id: string
  nombre: string
  creditos?: number
  descripcion?: Descripcion
  RA?: RA[]
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

