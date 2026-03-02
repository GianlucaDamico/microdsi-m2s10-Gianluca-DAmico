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
    text: "La capacidad es el potencial (lo que podemos hacer), mientras que el proceso es la ejecución real para entregar valor.",
    examples: {
      itsm: ["Capacidad: Soporte Técnico", "Proceso: Gestión de incidencias", "Procedimiento: Reset de password"],
      hr:   ["Capacidad: People Ops", "Proceso: Gestión de permisos", "Procedimiento: Firma de baja"],
      proc: ["Capacidad: Compras", "Proceso: Alta de proveedor", "Procedimiento: Validación de CIF"],
    },
    check: "Escribe un ejemplo de tu área: 1 capacidad y 1 proceso L1.",
  },
  {
    tag: "M2-S10 · Límites",
    title: "El Trigger y el Output",
    text: "Un proceso sin un disparador (trigger) claro nunca empieza, y sin un resultado (output) no sirve para nada.",
    examples: {
      itsm: ["Trigger: Ticket creado", "Output: Incidencia cerrada"],
      hr:   ["Trigger: Solicitud de vacaciones", "Output: Permiso aprobado en calendario"],
      proc: ["Trigger: Proveedor envía docs", "Output: Proveedor validado en ERP"],
    },
    check: "Define el trigger y el output de tu proceso ganador.",
  },
  {
    tag: "M2-S10 · Arquitectura",
    title: "Niveles L0 a L2: No bajes demasiado",
    text: "Mantén el diseño en el catálogo (L1) y variantes (L2). No te pierdas en el 'click a click' de L3 todavía.",
    examples: {
      itsm: ["L0: Operaciones", "L1: Gestión de incidencias", "L2: Incidencias de Software"],
      hr:   ["L0: RRHH", "L1: Solicitudes", "L2: Solicitud de nómina"],
      proc: ["L0: Suministros", "L1: Compras", "L2: Compras de hardware"],
    },
    check: "Identifica un proceso L1 y propón dos variantes L2.",
  },
  {
    tag: "M2-S10 · Inventario",
    title: "Catálogo L1: Verbo + Objeto",
    text: "Un proceso debe ser medible y repetible. Usa siempre la fórmula de acción: Verbo + Objeto.",
    examples: {
      itsm: ["Gestionar incidencias", "Configurar VPN", "Actualizar servidores"],
      hr:   ["Contratar empleados", "Pagar nóminas", "Gestionar bajas"],
      proc: ["Validar proveedores", "Aprobar facturas", "Auditar compras"],
    },
    check: "Lista 10 procesos L1 siguiendo la regla Verbo + Objeto.",
  },
  {
    tag: "M2-S10 · Medición",
    title: "Baseline: Sin datos no hay mejora",
    text: "Antes de rediseñar con IA, mide cuánto tardas hoy. Necesitas métricas de valor, coste y riesgo.",
    examples: {
      itsm: ["Valor: % SLA", "Coste: AHT de triaje", "Riesgo: % P1 mal clasificados"],
      hr:   ["Valor: NPS empleado", "Coste: € por caso", "Riesgo: incidentes PII"],
      proc: ["Valor: Lead time", "Coste: Minutos por doc", "Riesgo: Errores en contratos"],
    },
    check: "Propón 3 métricas para tu baseline.",
  },
  {
    tag: "M2-S10 · Dolor",
    title: "Identificando cuellos de botella",
    text: "Busca procesos con mucho retrabajo, esperas infinitas o errores recurrentes.",
    examples: {
      itsm: ["Mucho rebote de tickets", "KB desactualizada", "Exceso de escalados"],
      hr:   ["Búsqueda manual de leyes", "Docs incompletos", "Dudas repetitivas"],
      proc: ["Aprobaciones lentas", "Falta de trazabilidad", "Errores en ERP"],
    },
    check: "Señala 2 dolores críticos y aporta una evidencia.",
  },
  {
    tag: "M2-S10 · Riesgo",
    title: "Gobernanza y PII",
    text: "No todo es velocidad. Si hay datos personales (PII) o auditoría, el diseño debe ser más robusto.",
    examples: {
      itsm: ["Riesgo: Datos de acceso", "Control: Logs"],
      hr:   ["Riesgo: Datos salud/bancos", "Control: RBAC estricto"],
      proc: ["Riesgo: Fraude fiscal", "Control: Segregación funciones"],
    },
    check: "Asigna un nivel de riesgo (1-5) a tu proceso.",
  },
  {
    tag: "M2-S10 · Selección",
    title: "Matriz de Priorización",
    text: "Usa el score: Impacto vs Esfuerzo vs Riesgo. No elijas el proceso que más 'ruido' hace, sino el que más aporta.",
    examples: {
      itsm: ["Impacto alto por volumen", "Esfuerzo bajo por IA"],
      hr:   ["Riesgo alto por PII", "Esfuerzo medio"],
      proc: ["Impacto medio", "Riesgo alto por auditoría"],
    },
    check: "Calcula el score de tus 5 procesos finalistas.",
  },
  {
    tag: "M2-S10 · Contrato",
    title: "SIPOC: El contrato del diseño",
    text: "Define las fronteras antes de modelar: proveedores, entradas, proceso, salidas y clientes.",
    examples: {
      itsm: ["Suppliers: Usuarios", "Customers: Negocio"],
      hr:   ["Suppliers: Empleados", "Customers: RRHH"],
      proc: ["Suppliers: Compras", "Customers: Proveedores"],
    },
    check: "Completa el SIPOC con 4-6 pasos en el proceso.",
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
    text: "La IA brilla clasificando, resumiendo o buscando información (RAG), no tomando decisiones críticas sola.",
    examples: {
      itsm: ["Clasificación de tickets", "RAG sobre base de conocimientos"],
      hr:   ["Resumen de CVs", "Detección de datos PII en chats"],
      proc: ["Extracción de datos en facturas", "Validación de cumplimiento"],
    },
    check: "Propón una palanca de IA para tu proceso ganador.",
  },
  {
    tag: "Puente a M2-S11",
    title: "Preparando el AS-IS",
    text: "Hoy terminas con el 'qué' y el 'quién'. Mañana en el S11 dibujarás el 'cómo' paso a paso.",
    examples: {
      itsm: ["Salida: SIPOC Triage"],
      hr:   ["Salida: SIPOC Nómina"],
      proc: ["Salida: SIPOC Compras"],
    },
    check: "Prepara tu entregable .md con el resumen de hoy.",
  },
  // --- TARJETAS EXTRAS ---
  {
    tag: "M2-S10 · Extensión 1",
    title: "Trade-offs: El arte de elegir",
    text: "Diseñar procesos es elegir qué sacrificar. ¿Prefieres velocidad o precisión total? ¿IA autónoma o control humano?.",
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
    text: "Un proceso que funciona para 10 casos puede romperse si llegan 1000. La IA permite escalar sin aumentar el equipo.",
    examples: {
      itsm: ["Automatizar el 80% de tickets comunes"],
      hr:   ["Auto-servicio para solicitudes frecuentes"],
      proc: ["Validación masiva de facturas"],
    },
    check: "¿Cuántos casos/mes soporta tu proceso actual?",
  }
];


// =====================
// Pistas (caso guiado) - ESTRUCTURA DE 6 PASOS PARA NOTA MÁXIMA
// =====================
const PISTA_STEPS = {
  itsm: [
    { t:"1. Objetivo ITSM", b:"Optimizar el triaje para evitar que los tickets reboten entre equipos.", q:"¿Quién es el cliente principal que recibe la solución?"},
    { t:"2. Arquitectura L1/L2", b:"Define el proceso (L1) y una variante operativa (L2) como 'Incidencias VIP'.", q:"Escribe el nombre de tu variante L2."},
    { t:"3. Dolores del Proceso", b:"Identifica cuellos de botella como la falta de base de conocimientos (KB).", q:"¿Cuál es la evidencia de este dolor (ej: % de re-aperturas)?"},
    { t:"4. Priorización Coherente", b:"Usa el impacto y el riesgo (PII/Criticidad) para decidir qué arreglar.", q:"Puntúa el Riesgo de 1 a 5 y justifica por qué."},
    { t:"5. Contrato SIPOC", b:"Define los límites: qué entra y qué sale exactamente del sistema.", q:"Enumera los 5 pasos lógicos del proceso (Verbos)."},
    { t:"6. No-alcance (EXTRA)", b:"Define los límites del MVP para no perder el foco del proyecto.", q:"¿Qué 2 cosas NO vas a automatizar en esta fase?"},
  ],
  hr: [
    { t:"1. Objetivo HR", b:"Gestionar solicitudes garantizando la privacidad de los datos (PII).", q:"¿Qué tipo de solicitudes son las más frecuentes?"},
    { t:"2. Clasificación L2", b:"Diferencia entre solicitudes generales y aquellas que manejan datos sensibles.", q:"Define un ejemplo de proceso L2 sensible."},
    { t:"3. Puntos de Fricción", b:"Busca donde hay más 'ida y vuelta' de correos por falta de info.", q:"¿Qué dato falta siempre en la entrada del proceso?"},
    { t:"4. Matriz de Decisión", b:"El riesgo legal aquí es clave por la normativa de protección de datos.", q:"Puntúa el Impacto de 1 a 5 según la criticidad legal."},
    { t:"5. Mapa SIPOC", b:"Desde que el empleado pide algo hasta que queda registrado en el sistema.", q:"Escribe la secuencia de 4 a 6 pasos."},
    { t:"6. No-alcance (EXTRA)", b:"Evita que el proyecto crezca demasiado (Scope Creep).", q:"Nombra 2 servicios de HR que se quedan fuera del MVP."},
  ],
  proc: [
    { t:"1. Objetivo Compras", b:"Reducir el tiempo (Lead Time) desde la oferta hasta el alta en el ERP.", q:"¿Cuál es el indicador de éxito de este proceso?"},
    { t:"2. Variantes L2", b:"No es lo mismo dar de alta a un proveedor nacional que uno internacional.", q:"Escribe una variante L2 que genere más trabajo."},
    { t:"3. Dolores de Gestión", b:"Identifica retrasos por firmas manuales o falta de validación fiscal.", q:"¿Dónde se detiene el proceso más tiempo?"},
    { t:"4. Scoring de Valor", b:"Prioriza según el ahorro de tiempo y el cumplimiento (Compliance).", q:"¿Qué proceso tiene el score de impacto más alto?"},
    { t:"5. Estructura SIPOC", b:"Asegura que el flujo de documentos entre departamentos es claro.", q:"Define los pasos del proceso usando Verbo + Objeto."},
    { t:"6. No-alcance (EXTRA)", b:"Define qué partes de la negociación no vas a tocar todavía.", q:"Escribe 2 límites claros para tu proyecto."},
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
