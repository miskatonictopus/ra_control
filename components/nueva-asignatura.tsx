"use client";


import { PlusCircle } from "lucide-react"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputWithLabel } from "@/components/input-with-label";
import { HelpCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

import { useMisAsignaturas } from "@/hooks/use-mis-asignaturas";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Asignatura {
  codigo: string;
  nombre: string;
  ects: number;
  duracion: string;
  centro_educativo: string;
  empresa: string;
  CE: any[];
  RA: any[];
}

interface NuevaAsignaturaProps {
  codigoParcial?: string;
  onCambiar?: () => void;
  onConfirmar?: (datos: {
    codigo: string;
    nombre: string;
    creditos: string;
    descripcion: string;
  }) => void;
  isLoading?: boolean;
}

export function NuevaAsignatura({
  codigoParcial = "",
  onCambiar,
  onConfirmar,
  isLoading = false,
}: NuevaAsignaturaProps) {
  const [codigo, setCodigo] = useState(codigoParcial);
  const [nombre, setNombre] = useState("");
  const [creditos, setCreditos] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [asignaturas, setAsignaturas] = useState<{ [key: string]: Asignatura }>(
    {}
  );
  const [coincidencias, setCoincidencias] = useState<[string, Asignatura][]>(
    []
  );
  const [mostrarModal, setMostrarModal] = useState(false);

  const jsonURL =
    "https://raw.githubusercontent.com/miskatonictopus/Auswertecontroller/refs/heads/main/asignaturas_FP.json";

  const [mostrarAlertaDuplicada, setMostrarAlertaDuplicada] = useState(false);
  const [mostrarAlertaNoExiste, setMostrarAlertaNoExiste] = useState(false);
  const asignaturasLocales = useMisAsignaturas();

  useEffect(() => {
    fetch(jsonURL)
      .then((res) => res.json())
      .then((data) => setAsignaturas(data))
      .catch((err) => console.error("Error al cargar asignaturas:", err));
  }, []);

  useEffect(() => {
    if (codigo.length >= 2) {
      const nuevas = Object.entries(asignaturas).filter(([cod]) =>
        cod.startsWith(codigo)
      );
      setCoincidencias(nuevas);
    } else {
      setCoincidencias([]);
    }
  }, [codigo, asignaturas]);

  useEffect(() => {
    if (codigo.length === 4) {
      const yaRegistrada = asignaturasLocales.some((a) => a.id === codigo);
      if (yaRegistrada) {
        setMostrarAlertaDuplicada(true);
        return;
      }

      const existeEnRemoto = Object.values(asignaturas).find(
        (a) => a.codigo === codigo
      );

      if (!existeEnRemoto) {
        setMostrarAlertaNoExiste(true);
      }
    }
  }, [codigo, asignaturasLocales]);

  const seleccionarAsignatura = (codigo: string) => {
    const asignatura = asignaturas[codigo];
    if (asignatura) {
      setCodigo(codigo);
      setNombre(asignatura.nombre);
      setCreditos(asignatura.ects.toString());
      setDescripcion(
        `Duración total: ${asignatura.duracion}, Centro: ${asignatura.centro_educativo}, Empresa: ${asignatura.empresa}`
      );
    }
  };

  const guardarAsignaturaLocal = async () => {
    const filename = `${codigo}_${nombre}`.replace(/[^\w\-]/gi, "_") + ".json";

    const datos = {
      id: codigo,
      nombre,
      creditos,
      descripcion,
      CE: asignaturas[codigo]?.CE || [],
      RA: asignaturas[codigo]?.RA || [],
    };

    try {
      console.log("🔄 Enviando datos a Electron...");
      const res = await window.electronAPI.guardarAsignatura(filename, datos);
      console.log("✅ Asignatura guardada correctamente:", filename);
      alert("Asignatura guardada correctamente en la aplicación");
    } catch (error) {
      console.error("❌ Error al guardar asignatura:", error);
      alert("Error al guardar asignatura (ver consola)");
    }
  };

  const handleConfirmar = () => {
    const yaRegistrada = asignaturasLocales.some((a) => a.id === codigo);

    if (yaRegistrada) {
      setMostrarAlertaDuplicada(true);
      return;
    }

    const existeEnRemoto = asignaturas[codigo]; // <– esta es la fuente original
    if (!existeEnRemoto) {
      setMostrarAlertaNoExiste(true);
      return;
    }

    if (onConfirmar) {
      onConfirmar({ codigo, nombre, creditos, descripcion });
    }

    setMostrarModal(true);
  };

  const isFormValid = codigo.trim() && nombre.trim() && creditos.trim();

  return (
      <div className="w-full max-w-2xl space-y-6">
        <Card className="bg-zinc-900 border-zinc-700 relative">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="absolute top-2 right-2 text-white hover:text-emerald-400">
                <HelpCircle className="w-5 h-5" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 text-sm leading-snug">
              <strong>¿Cómo añadir una nueva asignatura?</strong>
              <ul className="list-disc pl-4 mt-2">
                <li>
                  Introduce el <strong>código</strong> oficial (ej: 0612).
                </li>
                <li>
                  Pulsa <em>Seleccionar</em> para ver los RA y CE.
                </li>
                <li>Revisa los datos antes de confirmar.</li>
              </ul>
            </HoverCardContent>
          </HoverCard>
          <CardHeader className="text-left">
            <CardTitle className="text-xl font-bold text-white flex">
            <PlusCircle className="w-6 h-6 text-white mr-2" />  Nueva Asignatura
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Introduce el código de tu nueva asignatura y selecciónala
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-[5rem,1fr] gap-4 items-start">
              <div className="shrink-0">
                <InputWithLabel
                  id="codigo"
                  label="Código"
                  value={codigo}
                  onChange={(v) => {
                    setCodigo(v.toUpperCase());
                    setNombre("");
                    setCreditos("");
                    setDescripcion("");
                  }}
                  placeholder="Ej: 0612"
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                <InputWithLabel
                  id="asignatura"
                  label="Asignatura"
                  value={nombre}
                  onChange={setNombre}
                  placeholder="Nombre asignatura"
                  disabled
                />
                {(coincidencias.length > 1 ||
                  (coincidencias.length === 1 &&
                    coincidencias[0][0] !== codigo)) && (
                  <div className="absolute z-10 w-full mt-1 border border-zinc-700 rounded bg-zinc-800 text-white shadow-md max-h-60 overflow-auto">
                    {coincidencias.map(([codigoCoin, asignatura]) => (
                      <button
                        key={codigoCoin}
                        onClick={() => seleccionarAsignatura(codigoCoin)}
                        className="w-full text-left px-3 py-1 hover:bg-zinc-700"
                      >
                        {codigoCoin} - {asignatura.nombre}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-4 gap-4">
              <Button
                onClick={onCambiar}
                variant="outline"
                size="sm"
                disabled={isLoading}
                className="flex-1 bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
              >
                Cambiar
              </Button>
              <Button
                onClick={handleConfirmar}
                size="sm"
                disabled={!isFormValid || isLoading}
                className="flex-1 bg-white hover:bg-emerald-400 text-black"
              >
                {isLoading ? "Procesando..." : "Seleccionar"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                {nombre}
              </DialogTitle>
              <div className="text-sm text-zinc-400 space-y-1">
                <p>
                  <span className="font-semibold">Duración total:</span>{" "}
                  {asignaturas[codigo]?.duracion} //{" "}
                  <span className="font-semibold">Centro:</span>{" "}
                  {asignaturas[codigo]?.centro_educativo} //{" "}
                  <span className="font-semibold">Empresa:</span>{" "}
                  {asignaturas[codigo]?.empresa}
                </p>
              </div>
            </DialogHeader>

            {asignaturas[codigo]?.RA?.map((ra) => (
              <div key={ra.codigo} className="mb-6">
                <h3 className="text-white font-bold mb-2">
                  {ra.codigo} — {ra.descripcion}
                </h3>
                <div className="bg-zinc-900 rounded-md p-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24 text-white">CE</TableHead>
                        <TableHead className="text-white">
                          Descripción
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ra.CE.map((ce: any) => (
                        <TableRow key={ce.codigo}>
                          <TableCell className="font-mono text-white">
                            {ce.codigo}
                          </TableCell>
                          <TableCell className="text-white">
                            {ce.descripcion}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}

            <Button
              onClick={guardarAsignaturaLocal}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white w-full"
            >
              Guardar asignatura localmente
            </Button>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={mostrarAlertaDuplicada}
          onOpenChange={setMostrarAlertaDuplicada}
        >
          <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Asignatura ya registrada</AlertDialogTitle>
              <AlertDialogDescription>
                El código{" "}
                <span className="font-bold text-green-400">{codigo}</span> ya
                existe en tu sistema. No es necesario volver a registrarla.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* ✅ Aquí debe estar */}
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => setMostrarAlertaDuplicada(false)}
                className="bg-white hover:bg-emerald-400 text-zinc-950 border-none hover:border-none"
              >
                Entendido
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={mostrarAlertaNoExiste}
          onOpenChange={setMostrarAlertaNoExiste}
        >
          <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Asignatura no encontrada</AlertDialogTitle>
              <AlertDialogDescription>
                El código{" "}
                <span className="font-bold text-green-400">{codigo}</span> no
                está registrado o no existe en el archivo de asignaturas. Por
                favor, verifica que lo hayas escrito correctamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => setMostrarAlertaNoExiste(false)}
                className="bg-white hover:bg-emerald-400 text-zinc-950 border-none hover:border-none"
              >
                Cerrar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  );
}
