RA-Control — Patrón de Seguridad en Ediciones Críticas (RA y CE)
Seguridad en Ediciones Críticas – Patrón `EditarAsignaturaFlow`

¿Por qué hemos creado este patrón?

Editar los **Resultados de Aprendizaje (RA)** y los **Criterios de Evaluación (CE)** puede tener un impacto importante en la estructura de evaluación. Para evitar errores accidentales, se implementa un **flujo en 3 pasos** antes de permitir su edición.

---

### 🧩 Estructura del flujo

```tsx
<DialogEditarAsignaturaFlow asignatura={asig} />
```

Internamente se compone de:

1. ✅ `DialogAdvertencia`  
   Un modal de advertencia que informa al usuario de los riesgos de modificar RA y CE.

2. ✅ `DialogConfirmacionTexto`  
   Requiere que el usuario escriba la palabra **EDITAR** antes de continuar.

3. ✅ `DialogEditarAsignatura`  
   Modal final para editar RA y CE, controlado solo si se han superado los pasos anteriores.

---

### 🧠 Ventajas del patrón

- Protección ante ediciones accidentales
- Reutilizable en otros contextos críticos (eliminar, resetear, recalcular, etc.)
- Mejora la confianza y responsabilidad del usuario
- Encapsulado en un solo componente (`DialogEditarAsignaturaFlow`)

---

### 📦 Componentes implicados

- `DialogAdvertencia.tsx`
- `DialogConfirmacionTexto.tsx`
- `DialogEditarAsignatura.tsx`
- `DialogEditarAsignaturaFlow.tsx`

---

### ✨ Ejemplo de uso

```tsx
// Dentro del listado de asignaturas
<DialogEditarAsignaturaFlow asignatura={asig} />
```