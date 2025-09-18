function FiltroHorario({ onChange }) {
  const horas = Array.from({ length: 16 }, (_, i) => 7 + i); // 7 a 22

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Filtrar por horario:</label>
      <select
        onChange={(e) => onChange(Number(e.target.value))}
        className="p-2 border rounded"
      >
        <option value="">Todos</option>
        {horas.map((h) => (
          <option key={h} value={h}>
            {h}:00
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroHorario;