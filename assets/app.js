// =====================
// Process Studio · Tracks
// =====================
const TRACKS = [
  { id: "itsm", name: "ITSM Triage" },
  { id: "hr",   name: "HR Operations" },
  { id: "proc", name: "Procurement & Supply" },
];

function getTrackFromURL() {
  const u = new URL(window.location.href);
  const t = u.searchParams.get("track");
  return TRACKS.some(x => x.id === t) ? t : null;
}
function getTrack() {
  return getTrackFromURL() || localStorage.getItem("track") || "itsm";
}
function setTrack(t) {
  localStorage.setItem("track", t);
  const u = new URL(window.location.href);
  if (!u.searchParams.get("track")) location.reload();
}

// =====================
// Micro-lecciones (M2-S10)
// Extensiones: Añadidas 3 tarjetas extra para nota Pro 
// =====================
const LESSONS = [
  {
    tag: "Fundamentos",
    title: "Proceso ≠ Procedimiento",
    text: "El proceso transforma; el procedimiento detalla el 'cómo'. No confundas la capacidad (qué sabemos hacer) con el flujo operativo.",
    examples: {
      itsm: ["Capacidad: Soporte Técnico", "Proceso: Gestionar incidencias", "Procedimiento: Reset de contraseña en AD"],
      hr:   ["Capacidad: People Care", "Proceso: Gestionar bajas", "Procedimiento: Check-list de devolución de equipo"],
      proc: ["Capacidad: Abastecimiento", "Proceso: Alta de proveedor", "Procedimiento: Verificación de IBAN bancario"],
    },
    check: "Escribe 1 capacidad y el proceso L1 que la materializa.",
  },
  {
    tag: "Límites",
    title: "Trigger & Output",
    text: "Un proceso sin disparador es una intención. Un proceso sin salida es un agujero negro. Define fronteras claras.",
    examples: {
      itsm: ["Trigger: Alerta de monitoreo (P1)", "Output: Incidencia resuelta + Post-mortem"],
      hr:   ["Trigger: Solicitud de certificado", "Output: Documento firmado en portal"],
      proc: ["Trigger: Requisición de compra", "Output: Orden de compra (PO) emitida"],
    },
    check: "Identifica el trigger exacto de tu proceso candidato.",
  },
  {
    tag: "Jerarquía",
    title: "Nivel L1: El mapa del tesoro",
    text: "L1 es el catálogo de servicios. Ni tan genérico como el departamento, ni tan detalle como el paso a paso.",
    examples: {
      itsm: ["L0: Soporte TI", "L1: Gestionar incidencias", "L2: Triage de hardware"],
      hr:   ["L0: RRHH", "L1: Gestionar nóminas", "L2: Incidencias de pago"],
      proc: ["L0: Finanzas", "L1: Homologar proveedores", "L2: Proveedores internacionales"],
    },
    check: "Nombra 3 procesos L1 de tu área.",
  },
  {
    tag: "Calidad",
    title: "La Regla de Oro: Verbo + Objeto",
    text: "Si no empieza por verbo, no es un proceso. Los nombres de departamentos (ej: 'Ventas') no son procesos.",
    examples: {
      itsm: ["✅ Resolver ticket", "❌ Departamento de Soporte"],
      hr:   ["✅ Tramitar permiso", "❌ Gestión de Vacaciones"],
      proc: ["✅ Validar factura", "❌ Contabilidad"],
    },
    check: "Revisa tu inventario: ¿todos empiezan con verbo infinitivo?",
  },
  {
    tag: "Priorización",
    title: "Impacto vs Esfuerzo vs Riesgo",
    text: "No automatices lo que no aporta. Busca procesos de alto volumen, alto error o alta sensibilidad (PII).",
    examples: {
      itsm: ["Volumen: 500 tickets/día", "Riesgo: Caída de servicios críticos", "Esfuerzo: Bajo (reglas de negocio)"],
      hr:   ["Volumen: 50 bajas/mes", "Riesgo: Multas GDPR (PII)", "Esfuerzo: Medio (integración ERP)"],
      proc: ["Volumen: 200 facturas/semana", "Riesgo: Fraude en pagos", "Esfuerzo: Alto (OCR + Firma)"],
    },
    check: "Calcula el score: (Impacto * 2) - Esfuerzo.",
  },
  // --- TARJETAS EXTRA PARA NOTA (Extensiones 11.1) ---
  {
    tag: "Gobernanza",
    title: "Restricción Dominante",
    text: "Todo proceso tiene un 'jefe invisible': PII (Privacidad), Auditoría, o Latencia. Identifícalo antes de diseñar.",
    examples: {
      itsm: ["Restricción: Latencia (SLA < 2h)", "Control: Alertas automáticas"],
      hr:   ["Restricción: PII Sensible", "Control: Encriptación y acceso RBAC"],
      proc: ["Restricción: Auditoría fiscal", "Control: Log inmutable de aprobaciones"],
    },
    check: "Define la restricción dominante de tu proceso ganador.",
  },
  {
    tag: "Estrategia",
    title: "El concepto de No-Alcance (MVP)",
    text: "Para que un proyecto nazca, debe tener límites. ¿Qué NO vas a resolver en esta fase? [cite: 143]",
    examples: {
      itsm: ["No-alcance: Reparaciones físicas de hardware"],
      hr:   ["No-alcance: Cálculo de impuestos internacionales"],
      proc: ["No-alcance: Negociación de contratos marco"],
    },
    check: "Escribe 2 puntos de no-alcance para tu MVP.",
  },
  {
    tag: "Arquitectura",
    title: "SIPOC: El contrato de diseño",
    text: "Define Proveedores, Entradas, Procesos, Salidas y Clientes. Es la brújula contra el 'scope creep'.",
    examples: {
      itsm: ["S: Usuario | I: Ticket | P: 5 pasos | O: Cierre | C: Empleado"],
      hr:   ["S: Manager | I: Solicitud | P: 4 pasos | O: Contrato | C: Nuevo empleado"],
      proc: ["S: Proveedor | I: Factura | P: 6 pasos | O: Pago | C: Finanzas"],
    },
    check: "Asegúrate de tener entre 4 y 6 pasos en tu SIPOC.",
  }
];

// =====================
// Pistas (caso guiado)
// =====================
const PISTA_STEPS = {
  itsm: [
    { t:"Objetivo Triage", b:"Optimizar la clasificación inicial para evitar rebotes entre equipos.", q:"¿Cuál es la métrica de éxito (KPI) principal?"},
    { t:"Variantes (L2)", b:"No es lo mismo un ticket de software que uno de acceso VIP.", q:"Propón una variante L2 para casos de alta prioridad."},
    { t:"Evidencia de Dolor", b:"Buscamos datos: % de tickets mal asignados o tiempo de espera.", q:"Aporta un dato supuesto de retrabajo (ej: 30%)."},
    { t:"Justificación", b:"¿Por qué este y no otro? Usa Impacto y Riesgo.", q:"Escribe la frase: 'Priorizo esto porque...'"},
    { t:"Contrato SIPOC", b:"Define quién entrega la información y quién la recibe.", q:"Lista 5 pasos del proceso empezando por verbos."},
  ],
  hr: [
    { t:"Foco en Personas", b:"Centralizar solicitudes manteniendo la privacidad de los datos.", q:"¿Quién es el cliente final del proceso?"},
    { t:"Riesgo GDPR", b:"Manejamos datos sensibles (nóminas, salud).", q:"¿Qué medida de control aplicarás a la PII?"},
    { t:"Automatización", b:"Identifica tareas repetitivas de poco valor.", q:"¿Qué paso del proceso es candidato a IA?"},
    { t:"Priorización", b:"Impacto en la experiencia del empleado vs Esfuerzo técnico.", q:"Puntúa de 1 a 5 el Esfuerzo necesario."},
    { t:"SIPOC", b:"Asegura que el Output sea un registro auditable.", q:"Describe el Output final y dónde se guarda."},
  ],
  proc: [
    { t:"Eficiencia Compras", b:"Reducir el tiempo desde la solicitud hasta la orden de compra.", q:"¿Qué dispara el inicio del proceso?"},
    { t:"Compliance", b:"El proceso debe cumplir con auditoría financiera obligatoria.", q:"¿Quién debe aprobar la excepción en el L2?"},
    { t:"Dolores", b:"Falta de documentos, firmas perdidas o ERP lento.", q:"Identifica el 'cuello de botella' principal."},
    { t:"Criterio", b:"Justifica la inversión basándote en el volumen anual.", q:"Dato: ¿Cuántas facturas/altas se procesan al mes?"},
    { t:"SIPOC", b:"Proveedores externos y clientes internos.", q:"Lista los 4 proveedores (Suppliers) de información."},
  ],
};

// =====================
// Helpers DOM
// =====================
function $(sel, root=document){ return root.querySelector(sel); }
function el(tag, cls){ const n=document.createElement(tag); if(cls) n.className=cls; return n; }

function ensureTrackSelector() {
  const sel = $("#trackSel");
  if (!sel) return;
  const t = getTrack();
  sel.value = t;
  sel.addEventListener("change", (e) => {
    setTrack(e.target.value);
  });
}

function pill(label, key, href){
  const a = el(href ? "a" : "span", "pill");
  a.innerHTML = `<strong>${key}</strong> <span>${label}</span>`;
  if(href){ a.href = href; }
  return a;
}

function toggleMark(idx, btn){
  const marks = JSON.parse(localStorage.getItem("marks")||"{}");
  const t = getTrack();
  const key = `${t}:${idx}`;
  marks[key] = !marks[key];
  localStorage.setItem("marks", JSON.stringify(marks));
  btn.textContent = marks[key] ? "Marcado" : "Marcar";
  btn.classList.toggle("primary", !!marks[key]);
}

function renderFeed(){
  const wrap = $("#feedWrap");
  if(!wrap) return;
  const t = getTrack();
  wrap.innerHTML = ""; 

  LESSONS.forEach((L, idx) => {
    const snap = el("section","cardSnap");
    const card = el("article","lessonCard");
    const main = el("div","lessonMain");
    const side = el("aside","lessonSide");
    const top = el("div","titleRow");
    const badge = el("span","badge");
    badge.textContent = L.tag;

    const markerBtn = el("button","btn");
    markerBtn.type="button";
    markerBtn.textContent = "Marcar";
    markerBtn.onclick = () => toggleMark(idx, markerBtn);

    top.appendChild(badge);
    top.appendChild(markerBtn);

    const h2 = el("h2"); h2.textContent = L.title;
    const p = el("p"); p.textContent = L.text;

    const call = el("div","callout");
    const cb = el("b"); cb.textContent = "Micro-entregable (30–90s)";
    const cs = el("span"); cs.textContent = L.check;
    call.appendChild(cb); call.appendChild(cs);

    main.appendChild(top);
    main.appendChild(h2);
    main.appendChild(p);
    main.appendChild(call);

    const ex = el("div","sideBlock");
    const exH = el("h4"); exH.textContent = `Caso · ${TRACKS.find(x=>x.id===t).name}`;
    const ul = el("ul");
    (L.examples[t] || []).forEach(txt => {
      const li = el("li"); li.textContent = txt;
      ul.appendChild(li);
    });
    ex.appendChild(exH); ex.appendChild(ul);

    const act = el("div","sideBlock");
    const actH = el("h4"); actH.textContent = "Navegación";
    const actions = el("div","actions");
    actions.appendChild(pill("Ir al Lab", "→", "lab.html"));
    actions.appendChild(pill("Ver Pistas", "⇢", "pista.htm")); // Corregido a .htm
    act.appendChild(actH); act.appendChild(actions);

    side.appendChild(ex);
    side.appendChild(act);
    card.appendChild(main);
    card.appendChild(side);
    snap.appendChild(card);
    wrap.appendChild(snap);
  });
}

function setupPista(){
  const wrap = $("#pistaWrap");
  if(!wrap) return;
  const t = getTrack();
  const steps = PISTA_STEPS[t] || [];
  wrap.innerHTML = "";

  steps.forEach((s,i)=>{
    const sec = el("section","pista");
    const card = el("div","pistaCard");
    card.innerHTML = `
      <div class="badge">Pista ${i+1}/${steps.length} · ${TRACKS.find(x=>x.id===t).name}</div>
      <h2 style="margin:10px 0 6px 0">${s.t}</h2>
      <p style="margin:0;color:var(--muted);line-height:1.45">${s.b}</p>
      <hr class="sep"/>
      <b style="display:block;font-size:13px">Check de Arquitectura</b>
      <p style="margin:6px 0 10px 0;color:var(--muted)">${s.q}</p>
      <textarea placeholder="Escribe tu respuesta técnica aquí..."></textarea>
      <div class="footerHint">Tip: Sé específico con el dato.</div>
    `;
    sec.appendChild(card);
    wrap.appendChild(sec);
  });

  const prog = $("#prog");
  if(!prog) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const idx = [...wrap.children].indexOf(e.target);
        const pct = ((idx+1)/wrap.children.length)*100;
        prog.style.width = pct.toFixed(0)+"%";
      }
    });
  }, { root: wrap, threshold: .6 });
  [...wrap.children].forEach(ch=>io.observe(ch));
}

// =====================
// Lab export (Mejorado con trade-off y no-alcance) 
// =====================
function exportLabToMarkdown(){
  const out = $("#mdOut");
  const inv = $("#inv")?.value.trim() || "";
  const pr  = $("#prio")?.value.trim() || "";
  const sip = $("#sipoc")?.value.trim() || "";

  const t = getTrack();
  const tName = TRACKS.find(x=>x.id===t)?.name || t;

  const md = [
    `# Process Studio · Reporte M2-S10`,
    `**Track seleccionado:** ${tName}`,
    "",
    "## 1. Inventario de Procesos L1",
    inv ? inv : "_(Pendiente: completar 10-15 procesos)_",
    "",
    "## 2. Matriz de Priorización",
    "| Proceso | Impacto | Esfuerzo | Riesgo | Justificación con Dato |",
    "| :--- | :---: | :---: | :---: | :--- |",
    pr ? pr : "_(Pendiente: completar Top 5)_",
    "",
    "## 3. Diagrama SIPOC (Proceso Ganador)",
    sip ? sip : "_(Pendiente: completar contrato SIPOC)_",
    "",
    "## 4. Decisiones Estratégicas (Trade-off) ",
    "> **Restricción Dominante:** (Ej: PII / Auditoría / Latencia)",
    "> **No-Alcance del MVP:** (2 cosas que no harás en esta fase)",
    "> **Trade-off principal:** (Ej: Calidad de datos vs Velocidad de respuesta)"
  ].join("\n");

  out.value = md;
}

function downloadText(filename, text){
  const blob = new Blob([text], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// =====================
// Boot
// =====================
document.addEventListener("DOMContentLoaded", ()=>{
  ensureTrackSelector();
  if($("#feedWrap")) renderFeed();
  setupPista();
  const exp = $("#btnExport");
  if(exp) exp.addEventListener("click", exportLabToMarkdown);
  const dl = $("#btnDownload");
  if(dl) dl.addEventListener("click", ()=>{
    const text = $("#mdOut").value || "";
    const t = getTrack();
    downloadText(`process_studio_m2s10_${t}.md`, text);
  });
});
