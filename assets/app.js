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
// Micro-lecciones (M2-S10) - VERSION PERSONALIZADA
// =====================
const LESSONS = [
  {
    tag: "M2-S10 · Fundamentos",
    title: "Capacidad vs Proceso: No son lo mismo",
    text: "La capacidad es el potencial (lo que podemos hacer), mientras que el proceso es la ejecución real para entregar valor[cite: 3].",
    examples: {
      itsm: ["Capacidad: Soporte Técnico", "Proceso: Gestión de incidencias", "Procedimiento: Reset de password"],
      hr:   ["Capacidad: People Ops", "Proceso: Gestión de permisos", "Procedimiento: Firma de baja"],
      proc: ["Capacidad: Compras", "Proceso: Alta de proveedor", "Procedimiento: Validación de CIF"],
    },
    check: "Escribe un ejemplo de tu área: 1 capacidad y 1 proceso L1[cite: 82].",
  },
  {
    tag: "M2-S10 · Límites",
    title: "El Trigger y el Output",
    text: "Un proceso sin un disparador (trigger) claro nunca empieza, y sin un resultado (output) no sirve para nada[cite: 7].",
    examples: {
      itsm: ["Trigger: Ticket creado", "Output: Incidencia cerrada"],
      hr:   ["Trigger: Solicitud de vacaciones", "Output: Permiso aprobado en calendario"],
      proc: ["Trigger: Proveedor envía docs", "Output: Proveedor validado en ERP"],
    },
    check: "Define el trigger y el output de tu proceso ganador[cite: 82].",
  },
  {
    tag: "M2-S10 · Arquitectura",
    title: "Niveles L0 a L2: No bajes demasiado",
    text: "Mantén el diseño en el catálogo (L1) y variantes (L2). No te pierdas en el 'click a click' de L3 todavía[cite: 123].",
    examples: {
      itsm: ["L0: Operaciones", "L1: Gestión de incidencias", "L2: Incidencias de Software"],
      hr:   ["L0: RRHH", "L1: Solicitudes", "L2: Solicitud de nómina"],
      proc: ["L0: Suministros", "L1: Compras", "L2: Compras de hardware"],
    },
    check: "Identifica un proceso L1 y propón dos variantes L2[cite: 82].",
  },
  {
    tag: "M2-S10 · Inventario",
    title: "Catálogo L1: Verbo + Objeto",
    text: "Un proceso debe ser medible y repetible. Usa siempre la fórmula de acción: Verbo + Objeto[cite: 114].",
    examples: {
      itsm: ["Gestionar incidencias", "Configurar VPN", "Actualizar servidores"],
      hr:   ["Contratar empleados", "Pagar nóminas", "Gestionar bajas"],
      proc: ["Validar proveedores", "Aprobar facturas", "Auditar compras"],
    },
    check: "Lista 10 procesos L1 siguiendo la regla Verbo + Objeto[cite: 97, 121].",
  },
  {
    tag: "M2-S10 · Medición",
    title: "Baseline: Sin datos no hay mejora",
    text: "Antes de rediseñar con IA, mide cuánto tardas hoy. Necesitas métricas de valor, coste y riesgo[cite: 116].",
    examples: {
      itsm: ["Valor: % SLA", "Coste: AHT de triaje", "Riesgo: % P1 mal clasificados"],
      hr:   ["Valor: NPS empleado", "Coste: € por caso", "Riesgo: incidentes PII"],
      proc: ["Valor: Lead time", "Coste: Minutos por doc", "Riesgo: Errores en contratos"],
    },
    check: "Propón 3 métricas para tu baseline[cite: 82].",
  },
  {
    tag: "M2-S10 · Dolor",
    title: "Identificando cuellos de botella",
    text: "Busca procesos con mucho retrabajo, esperas infinitas o errores recurrentes[cite: 116].",
    examples: {
      itsm: ["Mucho rebote de tickets", "KB desactualizada", "Exceso de escalados"],
      hr:   ["Búsqueda manual de leyes", "Docs incompletos", "Dudas repetitivas"],
      proc: ["Aprobaciones lentas", "Falta de trazabilidad", "Errores en ERP"],
    },
    check: "Señala 2 dolores críticos y aporta una evidencia[cite: 82].",
  },
  {
    tag: "M2-S10 · Riesgo",
    title: "Gobernanza y PII",
    text: "No todo es velocidad. Si hay datos personales (PII) o auditoría, el diseño debe ser más robusto[cite: 118].",
    examples: {
      itsm: ["Riesgo: Datos de acceso", "Control: Logs"],
      hr:   ["Riesgo: Datos salud/bancos", "Control: RBAC estricto"],
      proc: ["Riesgo: Fraude fiscal", "Control: Segregación funciones"],
    },
    check: "Asigna un nivel de riesgo (1-5) a tu proceso[cite: 115].",
  },
  {
    tag: "M2-S10 · Selección",
    title: "Matriz de Priorización",
    text: "Usa el score: Impacto vs Esfuerzo vs Riesgo. No elijas el proceso que más 'ruido' hace, sino el que más aporta[cite: 98, 122].",
    examples: {
      itsm: ["Impacto alto por volumen", "Esfuerzo bajo por IA"],
      hr:   ["Riesgo alto por PII", "Esfuerzo medio"],
      proc: ["Impacto medio", "Riesgo alto por auditoría"],
    },
    check: "Calcula el score de tus 5 procesos finalistas[cite: 115].",
  },
  {
    tag: "M2-S10 · Contrato",
    title: "SIPOC: El contrato del diseño",
    text: "Define las fronteras antes de modelar: proveedores, entradas, proceso, salidas y clientes[cite: 117, 123].",
    examples: {
      itsm: ["Suppliers: Usuarios", "Customers: Negocio"],
      hr:   ["Suppliers: Empleados", "Customers: RRHH"],
      proc: ["Suppliers: Compras", "Customers: Proveedores"],
    },
    check: "Completa el SIPOC con 4-6 pasos en el proceso[cite: 99, 117].",
  },
  {
    tag: "M2-S10 · Frontera",
    title: "No-alcance: Protege tu MVP",
    text: "Define qué NO vas a hacer. Es la única forma de entregar resultados rápidos y evitar el scope creep.",
    examples: {
      itsm: ["No-alcance: Cambios de hardware"],
      hr:   ["No-alcance: Asesoría legal"],
      proc: ["No-alcance: Negociación global"],
    },
    check: "Escribe 2 puntos que queden fuera de tu proyecto.",
  },
  {
    tag: "M2-S10 · Preparación IA",
    title: "Dónde ayuda realmente la IA",
    text: "La IA brilla clasificando, resumiendo o buscando información (RAG), no tomando decisiones críticas sola[cite: 6].",
    examples: {
      itsm: ["Clasificación de tickets", "RAG sobre base de conocimientos"],
      hr:   ["Resumen de CVs", "Detección de datos PII en chats"],
      proc: ["Extracción de datos en facturas", "Validación de cumplimiento"],
    },
    check: "Propón una palanca de IA para tu proceso ganador[cite: 82].",
  },
  {
    tag: "Puente a M2-S11",
    title: "Preparando el AS-IS",
    text: "Hoy terminas con el 'qué' y el 'quién'. Mañana en el S11 dibujarás el 'cómo' paso a paso[cite: 106].",
    examples: {
      itsm: ["Salida: SIPOC Triage"],
      hr:   ["Salida: SIPOC Nómina"],
      proc: ["Salida: SIPOC Compras"],
    },
    check: "Prepara tu entregable .md con el resumen de hoy[cite: 101, 112].",
  },
  // --- TARJETAS EXTRAS ---
  {
    tag: "M2-S10 · Extensión 1",
    title: "Trade-offs: El arte de elegir",
    text: "Diseñar procesos es elegir qué sacrificar. ¿Prefieres velocidad o precisión total? ¿IA autónoma o control humano?[cite: 144].",
    examples: {
      itsm: ["Velocidad de respuesta vs Precisión de triaje"],
      hr:   ["Autonomía del empleado vs Control de datos PII"],
      proc: ["Lead time corto vs Auditoría exhaustiva"],
    },
    check: "Define el trade-off principal de tu rediseño.",
  },
  {
    tag: "M2-S10 · Extensión 2",
    title: "Escalabilidad y Volumen",
    text: "Un proceso que funciona para 10 casos puede romperse si llegan 1000. La IA permite escalar sin aumentar el equipo[cite: 116].",
    examples: {
      itsm: ["Automatizar el 80% de tickets comunes"],
      hr:   ["Auto-servicio para solicitudes frecuentes"],
      proc: ["Validación masiva de facturas"],
    },
    check: "¿Cuántos casos/mes soporta tu proceso actual?",
  }
];


// =====================
// Pistas (caso guiado) - PERSONALIZADAS Y CON EXTRA 
// =====================
const PISTA_STEPS = {
  itsm: [
    { t:"Objetivo ITSM", b:"Reducir el rebote de tickets (ping-pong) entre equipos técnicos[cite: 12].", q:"¿Quién es tu cliente final?"},
    { t:"Arquitectura", b:"Define si es una incidencia de Hardware o Software (L2)[cite: 111].", q:"Escribe una variante operativa."},
    { t:"Priorización", b:"Impacto alto si afecta a toda la oficina; Riesgo alto si hay PII[cite: 122].", q:"Pon nota de 1 a 5."},
    { t:"SIPOC", b:"Mapea desde el usuario quejoso hasta la resolución[cite: 117].", q:"Escribe los 5 pasos del proceso."},
    { t:"No-alcance (Extra)", b:"Cosas que no tocaremos para poder terminar el MVP.", q:"Escribe 2 exclusiones claras."},
  ],
  hr: [
    { t:"Objetivo HR", b:"Gestionar peticiones de empleados con privacidad total[cite: 13].", q:"¿Qué solicitudes entran?"},
    { t:"Seguridad", b:"El riesgo aquí es legal: cuidado con los datos de salud o bancos[cite: 118].", q:"¿Qué dato PII es más crítico?"},
    { t:"Priorización", b:"Penaliza el esfuerzo si requiere integración con bancos[cite: 115].", q:"Justifica tu elección con un dato."},
    { t:"SIPOC", b:"Entradas: solicitudes. Salidas: registros oficiales[cite: 123].", q:"Mapea el flujo de información."},
    { t:"No-alcance (Extra)", b:"Límites del proyecto para no morir en el intento.", q:"Escribe 2 exclusiones claras."},
  ],
  proc: [
    { t:"Objetivo Compras", b:"Asegurar que los proveedores son fiables y rápidos[cite: 14].", q:"¿Qué define un 'alta exitosa'?"},
    { t:"Compliance", b:"El riesgo es la auditoría y el posible fraude fiscal[cite: 116].", q:"¿Qué control de seguridad pondrías?"},
    { t:"Priorización", b:"Impacto en el Lead Time total de la empresa[cite: 124].", q:"Dime por qué este proceso es el ganador."},
    { t:"SIPOC", b:"Desde la oferta hasta el alta en el ERP[cite: 99].", q:"¿Cuáles son los pasos clave?"},
    { t:"No-alcance (Extra)", b:"Lo que el consultor decide no arreglar hoy.", q:"Escribe 2 exclusiones claras."},
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
