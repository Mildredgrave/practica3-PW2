import { useState } from "react";

function TodoApp() {
  const [tareas, setTareas] = useState([]);
  const [entrada, setEntrada] = useState("");
  const [filtro, setFiltro] = useState("todas"); 

  const agregarTarea = () => {
    if (entrada.trim() === "") return;
    setTareas([
      ...tareas,
      { id: Date.now(), texto: entrada, completada: false }
    ]);
    setEntrada("");
  };

  const alternarTarea = (id) => {
    setTareas(tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    ));
  };

  
  const eliminarTarea = (id) => {
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
        ) : ( /*si la condición es falsa, ejecuta esto que está después de los dos puntos :*/
          <ul className="lista-tareas">
            {tareasFiltradas.map(t => (
              <li key={t.id}>
                <span
                  className={t.completada ? "completada" : ""}
                  onClick={() => alternarTarea(t.id)}
                >
                  {t.texto}
                </span>
                <button onClick={() => eliminarTarea(t.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
