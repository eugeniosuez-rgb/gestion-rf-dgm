const datos = {
  kpis: [
    { titulo: "Cumplimiento general", valor: "78%" },
    { titulo: "RF evaluados", valor: "12" },
    { titulo: "Hallazgos abiertos", valor: "8" },
    { titulo: "Planes vencidos", valor: "3" },
    { titulo: "Empresas revisadas", valor: "24" }
  ],
  riesgos: [
    {
      rf: "RF01 - Interacción con energía",
      control: "Bloqueo, aislación y verificación de energía cero",
      responsable: "Área Operaciones",
      estado: "Cumple",
      evidencia: "Registro de bloqueo, permiso de trabajo, verificación en terreno"
    },
    {
      rf: "RF02 - Trabajo en altura",
      control: "Sistema personal de detención de caídas certificado",
      responsable: "Contratista / APR",
      estado: "Pendiente",
      evidencia: "Check list, inspección de arnés, capacitación vigente"
    },
    {
      rf: "RF03 - Equipos móviles",
      control: "Segregación hombre-máquina y autorización de operación",
      responsable: "Administrador de Contrato",
      estado: "Cumple",
      evidencia: "Licencia interna, preuso, plan de tránsito"
    },
    {
      rf: "RF04 - Sustancias peligrosas",
      control: "Identificación, almacenamiento y HDS disponible",
      responsable: "Bodega / Medio Ambiente",
      estado: "No cumple",
      evidencia: "Inventario, rotulado, HDS, compatibilidad de almacenamiento"
    }
  ],
  auditorias: [
    { titulo: "ADC DGM", detalle: "Auditoría interna de administradores de contrato", estado: "Activo" },
    { titulo: "ADC Contratistas", detalle: "Revisión de cumplimiento documental y terreno", estado: "Pendiente" },
    { titulo: "RESSO V10", detalle: "Seguimiento por categoría y brechas críticas", estado: "Base" },
    { titulo: "Cierre Hallazgos", detalle: "Control de responsables, fechas y evidencias", estado: "Crítico" }
  ]
};

const kpis = document.getElementById("kpis");
datos.kpis.forEach(item => {
  const card = document.createElement("article");
  card.className = "kpi";
  card.innerHTML = `<span>${item.titulo}</span><strong>${item.valor}</strong>`;
  kpis.appendChild(card);
});

const tablaRF = document.getElementById("tablaRF");

function badgeEstado(estado) {
  const clase = estado === "Cumple" ? "ok" : estado === "Pendiente" ? "warn" : "bad";
  return `<span class="badge ${clase}">${estado}</span>`;
}

function renderRiesgos(lista) {
  tablaRF.innerHTML = "";
  lista.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.rf}</strong></td>
      <td>${item.control}</td>
      <td>${item.responsable}</td>
      <td>${badgeEstado(item.estado)}</td>
      <td>${item.evidencia}</td>
    `;
    tablaRF.appendChild(tr);
  });
}

renderRiesgos(datos.riesgos);

document.getElementById("busquedaRF").addEventListener("input", (event) => {
  const texto = event.target.value.toLowerCase();
  const filtrados = datos.riesgos.filter(item =>
    Object.values(item).some(valor => String(valor).toLowerCase().includes(texto))
  );
  renderRiesgos(filtrados);
});

const auditoriaCards = document.getElementById("auditoriaCards");
datos.auditorias.forEach(item => {
  const estado = item.estado === "Activo" ? "ok" : item.estado === "Pendiente" ? "warn" : item.estado === "Crítico" ? "bad" : "neutral";
  const card = document.createElement("article");
  card.className = "audit-card";
  card.innerHTML = `
    <strong>${item.titulo}</strong>
    <p>${item.detalle}</p>
    <span class="badge ${estado}">${item.estado}</span>
  `;
  auditoriaCards.appendChild(card);
});
