import { useState } from "react";

interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

type Filtro = "todas" | "completadas" | "pendientes";

function TodoApp() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [entrada, setEntrada] = useState<string>("");
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const agregarTarea = () => {
    if (entrada.trim() === "") return;
    setTareas([
      ...tareas,
      { id: Date.now(), texto: entrada, completada: false },
    ]);
    setEntrada("");
  };

  const alternarTarea = (id: number) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === "completadas") return tarea.completada;
    if (filtro === "pendientes") return !tarea.completada;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>TODO APP</h1>

      <div className="entrada-boton">
        <input
          type="text"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <div className="filtros">
        <button
          className={filtro === "todas" ? "active" : ""}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          className={filtro === "completadas" ? "active" : ""}
          onClick={() => setFiltro("completadas")}
        >
          Completadas
        </button>
        <button
          className={filtro === "pendientes" ? "active" : ""}
          onClick={() => setFiltro("pendientes")}
        >
          Pendientes
        </button>
      </div>

      
      <div className="contenedor-tareas">
        {tareasFiltradas.length === 0 ? (
          <p>No hay tareas</p>
        ) : ( /* si la condición es falsa, ejecuta esto que está después de los dos puntos :*/
          <ul className="lista-tareas">
            {tareasFiltradas.map((tarea) => (
              <li key={tarea.id}>
                <span
                  className={tarea.completada ? "completada" : ""}
                  onClick={() => alternarTarea(tarea.id)}
                >
                  {tarea.texto}
                </span>
                <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
