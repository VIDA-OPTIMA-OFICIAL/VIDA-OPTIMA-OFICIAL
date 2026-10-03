/**
 * VIDA OPTIMA - Plataforma de Bienestar Integral
 * Autor: Terry Edicson Romero Loreto | C.I: 20.264.887
 * Versi\u00f3n: 3.0.0 - RESTORED
 */

window.onerror = function(msg, url, line) {
  console.error('Error detectado:', msg, 'en', url, 'l\u00ednea', line);
  return false;
};

// ESTADO GLOBAL
let userData = {
  nombre: '', edad: 30, sexo: 'masculino', peso: 70, estatura: 170,
  etnicidad: 'hispano', estado_gastrico: 'sano', medicamentos: 'no', diagnostico_cognitivo: 'ninguno',
  ubicacion: '', streak: 1, coins: 10,
  lastCheckIn: new Date().toDateString(),
  enfermedades: [], alergias: '', fuma: 'no', alcohol: 'no',
  sueno: 'bueno', estres: 'bajo', digestion: 'normal',
  objetivos: ['mantenimiento'], enfoques: [],
  ingreso: 0, presupuesto: 0, actividad: 'sedentario',
  tiempoEjercicio: '30', fechaRegistro: new Date().toISOString(),
  historial: {}, isSynced: false, isPremium: false
};

window.currentModule = 'perfil';
window.currentMenuType = null;
window.currentExerciseType = 'casa';
window.menuWeekOffset = 0;

// INICIALIZACION
function initApp() {
  const saved = localStorage.getItem('vidaOptima_user');
  if (saved) {
    try { userData = { ...userData, ...JSON.parse(saved) }; }
    catch(e) { console.warn('Cache local no válido'); }
  }
  if (typeof auth !== 'undefined') {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
          if (doc.exists) {
            userData = { ...userData, ...doc.data(), isSynced: true };
            saveLocal();
          }
        });
      }
    });
  }
  checkDailyStreak();
  applyAgeRestrictions();
}

function saveLocal() {
  try { localStorage.setItem('vidaOptima_user', JSON.stringify(userData)); }
  catch(e) {}
}

function checkDailyStreak() {
  const today = new Date().toDateString();
  if (userData.lastCheckIn !== today) {
    const last = new Date(userData.lastCheckIn);
    const diff = Math.round((new Date() - last) / 86400000);
    userData.streak = diff <= 1 ? (userData.streak || 1) + 1 : 1;
    userData.coins = (userData.coins || 0) + 5;
    userData.lastCheckIn = today;
    saveLocal();
  }
}

// ONBOARDING
function startOnboarding() {
  document.getElementById('legalModal').style.display = 'flex';
}

function acceptLegal() {
  document.getElementById('legalModal').style.display = 'none';
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('onboarding').classList.remove('hidden');
  nextStep(1);
}

let currentStep = 1;
function nextStep(step) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('step' + step);
  if (el) {
    el.classList.add('active');
    currentStep = step;
    const total = 6;
    const pct = Math.round(((step - 1) / (total - 1)) * 100);
    const fill = document.getElementById('progressFill');
    const label = document.getElementById('progressLabel');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = 'Paso ' + step + ' de ' + total;
    if (step === 6) renderSummary();
  }
}

function toggleOption(el) { el.classList.toggle('selected'); }
function toggleFocus(el, val) {
  el.classList.toggle('selected');
  // update hidden
  const selected = [...document.querySelectorAll('#focusGrid .focus-item.selected')]
    .map(e => e.getAttribute('data-val') || val);
  const input = document.getElementById('enfoques');
  if (input) input.value = selected.join(',');
}

function applyAgeRestrictions() {
  const isMinor = (userData.edad || 0) < 16;
  const fumaGroup = document.getElementById('fuma')?.closest('.form-group');
  const alcoholGroup = document.getElementById('alcohol')?.closest('.form-group');
  const ingresoGroup = document.getElementById('ingreso')?.closest('.form-group');
  const presupuestoGroup = document.getElementById('presupuesto')?.closest('.form-group');
  const sexualLink = document.querySelector('.dash-link[onclick*="sexual"]');

  if (isMinor) {
    if (fumaGroup) fumaGroup.classList.add('hidden');
    if (alcoholGroup) alcoholGroup.classList.add('hidden');
    if (ingresoGroup) ingresoGroup.classList.add('hidden');
    if (presupuestoGroup) presupuestoGroup.classList.add('hidden');
    if (sexualLink) sexualLink.classList.add('hidden');
  } else {
    if (fumaGroup) fumaGroup.classList.remove('hidden');
    if (alcoholGroup) alcoholGroup.classList.remove('hidden');
    if (ingresoGroup) ingresoGroup.classList.remove('hidden');
    if (presupuestoGroup) presupuestoGroup.classList.remove('hidden');
    if (sexualLink) sexualLink.classList.remove('hidden');
  }
}

function collectData() {
  const getVal = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const getNum = id => parseFloat(getVal(id)) || 0;
  const enfs = [...document.querySelectorAll('input[name="enfermedad"]:checked')].map(e => e.value);
  const objs = [...document.querySelectorAll('#objetivoCards .option-card.selected')].map(e => e.dataset.value);
  const focs = [...document.querySelectorAll('#focusGrid .focus-item.selected')].map(e => {
    const txt = e.textContent.trim().toLowerCase();
    if (txt.includes('energ')) return 'energia';
    if (txt.includes('intelecto')) return 'intelecto';
    if (txt.includes('fuerza')) return 'fuerza';
    if (txt.includes('rendimiento')) return 'rendimiento';
    if (txt.includes('salud')) return 'salud';
    if (txt.includes('sue')) return 'sueno';
    if (txt.includes('libido')) return 'libido';
    if (txt.includes('longevidad')) return 'longevidad';
    return txt;
  });

  userData = {
    ...userData,
    nombre: getVal('nombre') || 'Usuario',
    edad: getNum('edad') || 30,
    sexo: getVal('sexo') || 'masculino',
    peso: getNum('peso') || 70,
    estatura: getNum('estatura') || 170,
    etnicidad: getVal('etnicidad') || 'hispano',
    ubicacion: getVal('ubicacion') || 'Venezuela',
    enfermedades: enfs,
    alergias: getVal('alergias') || 'ninguna',
    sueno: getVal('sueno') || 'bueno',
    estres: getVal('estres') || 'bajo',
    diagnostico_cognitivo: getVal('diagnostico_cognitivo') || 'ninguno',
    digestion: getVal('digestion') || 'normal',
    estado_gastrico: getVal('estado_gastrico') || 'sano',
    medicamentos: getVal('medicamentos') || 'no',
    fuma: getVal('fuma') || 'no',
    alcohol: getVal('alcohol') || 'no',
    objetivos: objs.length ? objs : ['mantenimiento'],
    enfoques: focs,
    ingreso: Math.max(getNum('ingreso') || 300, 60),
    presupuesto: Math.max(getNum('presupuesto') || 50, 30),
    actividad: getVal('actividad') || 'sedentario',
    tiempoEjercicio: getVal('tiempoEjercicio') || '30',
    fechaRegistro: userData.fechaRegistro || new Date().toISOString()
  };

  // ── INVARIANTE: longevidad siempre presente en enfoques ──────────────────
  if (!userData.enfoques.includes('longevidad')) userData.enfoques.push('longevidad');

  applyAgeRestrictions();
  saveLocal();
}

function renderSummary() {
  collectData();
  const imc = (userData.peso / Math.pow(userData.estatura / 100, 2)).toFixed(1);
  const card = document.getElementById('summaryCard');
  if (!card) return;
  card.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:left;">
      <div><span style="color:var(--text3);font-size:11px;">NOMBRE</span><br><strong>${userData.nombre}</strong></div>
      <div><span style="color:var(--text3);font-size:11px;">EDAD</span><br><strong>${userData.edad} a\u00f1os</strong></div>
      <div><span style="color:var(--text3);font-size:11px;">IMC</span><br><strong>${imc}</strong></div>
      <div><span style="color:var(--text3);font-size:11px;">OBJETIVO</span><br><strong>${userData.objetivos.join(', ')}</strong></div>
      <div><span style="color:var(--text3);font-size:11px;">PRESUPUESTO</span><br><strong>$${userData.presupuesto} quincenal</strong></div>
      <div><span style="color:var(--text3);font-size:11px;">ACTIVIDAD</span><br><strong>${userData.actividad}</strong></div>
    </div>`;
}

// URL del backend — cambia a tu dominio de producción en deploy
const API_BASE = 'http://localhost:3000';

async function generatePlan(isNew) {
  if (typeof aplicarCerebroNutricional === 'function') aplicarCerebroNutricional(userData);
  collectData();

  // ── Transición visual inmediata al dashboard ────────────────────────────
  document.getElementById('onboarding').classList.add('hidden');
  const dash = document.getElementById('dashboard');
  dash.classList.remove('hidden');

  const _renderDashUser = () => {
    const dashUser = document.getElementById('dashUser');
    if (!dashUser) return;
    dashUser.innerHTML = `
      <div style="font-size:13px;font-weight:600;">${userData.nombre}</div>
      <div style="font-size:11px;color:var(--text3);">${userData.sexo} &bull; ${userData.edad} años</div>
      <div style="font-size:11px;color:var(--primary);margin-top:4px;">&#x1f525; Racha: ${userData.streak} días</div>`;
  };

  // ── Petición al backend para cálculos biológicos ────────────────────────
  try {
    const res = await fetch(`${API_BASE}/api/calculate-plan`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ userData })
    });

    if (res.status === 429) {
      alert('⏳ Has excedido el límite de consultas al servidor.\nPor favor, espera 15 minutos antes de intentarlo de nuevo.');
    } else if (res.status === 422) {
      alert('⚠️ Datos biométricos inválidos.\nVerifica que tu peso, estatura y edad sean números válidos mayores a cero.');
    } else if (res.ok) {
      const data = await res.json();
      if (data.success) {
        // Enriquece userData con los valores calculados en el backend (CerebroEngine v2)
        userData.kcal           = data.kcal;
        userData.macros         = data.macros;
        userData.perfil         = data.perfil;
        userData.region         = data.region;
        userData.menuType       = data.menuType;
        // ── Nuevos campos del CerebroEngine ─────────────────────────────────
        userData.diagnostico    = data.diagnostico;    // { etapa, imc, agua_diaria_ml, ... }
        userData.jugo           = data.jugo;           // Jugo terapéutico personalizado
        userData.alertas        = data.alertas || [];  // Alertas clínicas farmacológicas/gástricas
        userData.examenesMedicos = data.examenesMedicos || []; // Array de exámenes preventivos
        userData.isSynced       = true;
      }
    }
  } catch (netErr) {
    console.warn('[VidaOptima] Backend offline — activando CerebroEngineLocal v2:', netErr.message);
    // ── FALLBACK LOCAL: inferencia biométrica completa sin backend ───────────
    const localResult = CerebroEngineLocal.procesarPerfil(userData);
    userData.kcal            = localResult.kcal;
    userData.macros          = localResult.macros;
    userData.diagnostico     = localResult.diagnostico;
    userData.menuType        = localResult.menuType;
    userData.jugo            = localResult.jugo;
    userData.alertas         = localResult.alertas;
    userData.examenesMedicos = localResult.examenesMedicos;
    userData.region          = localResult.region;
  }

  // ── Persistencia y renderizado (siempre se ejecuta, con o sin backend) ──
  saveLocal();
  _renderDashUser();
  showModule('perfil');

  if (isNew) {
    const wm = document.getElementById('welcomeModal');
    if (wm) { wm.classList.remove('hidden'); wm.style.display = 'flex'; }
  }

  if (userData.isSynced && typeof db !== 'undefined') {
    auth.currentUser && db.collection('users').doc(auth.currentUser.uid).set(userData, { merge: true });
  }
}

// NAVEGACION DE MODULOS
function showModule(modName) {
  window.currentModule = modName;
  document.querySelectorAll('.dash-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.dash-link[onclick*="'${modName}'"]`);
  if (activeLink) activeLink.classList.add('active');

  const content = document.getElementById('dashContent');
  if (!content) return;

  // Cerrar menu mobile si abierto
  const sidebar = document.getElementById('dashSidebar');
  if (sidebar && sidebar.classList.contains('open')) toggleMobileMenu();

  try {
    switch(modName) {
      case 'auth':          content.innerHTML = Modules.renderAuth(); break;
      case 'perfil':        content.innerHTML = Modules.renderPerfil(userData); break;
      case 'progreso':      content.innerHTML = Modules.renderProgreso(userData); break;
      case 'menu':          content.innerHTML = Modules.renderMenu(userData); break;
      case 'jugos':         content.innerHTML = Modules.renderJugos(userData); break;
      case 'ejercicio':     content.innerHTML = Modules.renderEjercicio(userData); break;
      case 'compras':       content.innerHTML = Modules.renderCompras(userData); break;
      case 'recomendaciones': content.innerHTML = Modules.renderRecomendaciones(userData); break;
      case 'sexual':        content.innerHTML = Modules.renderSexual(userData); break;
      case 'mental':        content.innerHTML = Modules.renderMental(userData); break;
      case 'seguridad':     content.innerHTML = Modules.renderSeguridad(userData); break;
      case 'suplementos':   content.innerHTML = Modules.renderSuplementos(userData); break;
      case 'biohacks':      content.innerHTML = Modules.renderBioHacks(userData); break;
      case 'rewards':       content.innerHTML = Modules.renderRewards(userData); break;
      default:              content.innerHTML = `<div class="module"><p>M\u00f3dulo en construcci\u00f3n.</p></div>`;
    }
  } catch(e) {
    console.error('Error en m\u00f3dulo', modName, e);
    content.innerHTML = `<div class="module"><div class="alert-box" style="border-color:#f55;">
      <h3>&#9888; Error temporal</h3><p>${e.message}</p>
      <button class="btn-primary" onclick="showModule('perfil')">Volver al perfil</button>
    </div></div>`;
  }
  window.scrollTo(0, 0);
}

// MODALES
function closeModal() {
  document.querySelectorAll('.modal').forEach(m => {
    m.classList.add('hidden'); m.style.display = '';
  });
}
function closeInfoModal() { closeModal(); }
function closeWelcomeModal() {
  const wm = document.getElementById('welcomeModal');
  if (wm) { wm.classList.add('hidden'); wm.style.display = ''; }
  showModule('menu');
}

// MENU
function toggleMenuType(type) {
  window.currentMenuType = type;
  showModule('menu');
}

// EJERCICIO
function toggleExerciseType(type) {
  window.currentExerciseType = type;
  showModule('ejercicio');
}

// COMPRAS - SEMANA
function toggleMenuWeek(offset) {
  window.menuWeekOffset = offset;
  showModule('menu');
}

// COMIDA MODAL
function openMealModal(mealName) {
  const modal = document.getElementById('mealModal');
  if (!modal) return;
  const titleEl = document.getElementById('modalMealName');
  if (titleEl) titleEl.textContent = mealName;
  const details = getMealDetails(mealName);
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.innerHTML = val; };
  set('modalPortion', details.portion);
  set('modalPrep', details.prep);
  set('modalVits', details.vits);
  set('modalWater', details.water);
  set('modalAlt', details.alt);
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

function getMealDetails(name) {
  const n = (name || '').toLowerCase();
  let portion = '1 porci\u00f3n moderada seg\u00fan tu IMC.';
  let prep = 'Preparaci\u00f3n simple: cocina con m\u00ednimo aceite.';
  let vits = 'Consulta el perfil de tu alimento para vitaminas espec\u00edficas.';
  let water = 'Acompa\u00f1a con 1-2 vasos de agua (300-500ml).';
  let alt = 'Si no consigues este alimento, busca un equivalente proteico o calórico similar.';

  if (n.includes('huevo') || n.includes('tortilla')) {
    portion = '2-3 huevos medianos (aprox. 150-200g)';
    prep = '1. Rompe los huevos en un bowl.<br>2. Bate con sal y pimienta al gusto.<br>3. Cocina en sart\u00e9n con 1 cucharadita de aceite de oliva a fuego medio.<br>4. Revuelve suavemente hasta cuajar.';
    vits = 'Vitamina B12, D, A. Prote\u00edna completa (6g por huevo). Colina para el cerebro.';
    water = '1 vaso de agua (250ml) antes de comer.';
    alt = 'Sin huevos: 100g de at\u00fan en agua + aguacate. Mismo perfil proteico.';
  } else if (n.includes('arroz')) {
    portion = '1 taza de arroz cocido (180-200g)';
    prep = '1. Lava el arroz 2-3 veces hasta agua clara.<br>2. Proporci\u00f3n: 1 taza arroz + 2 tazas agua.<br>3. Hierve, baja el fuego y tapa por 18 minutos.<br>4. Reposa 5 minutos antes de servir.';
    vits = 'Carbohidratos complejos, vitaminas del grupo B, algo de magnesio.';
    water = '2 vasos de agua (500ml) con la comida.';
    alt = 'Sin arroz: yuca, pl\u00e1tano verde hervido o papa. Mismo aporte calórico.';
  } else if (n.includes('pollo') || n.includes('pechuga')) {
    portion = '150-200g de pollo (tama\u00f1o de la palma de tu mano)';
    prep = '1. Marina con ajo, lim\u00f3n y especias 30min.<br>2. Cocina a la plancha a fuego medio-alto 6-7 min por lado.<br>3. El interior debe llegar a 74\u00b0C. Si no tienes term\u00f3metro, corta al centro: sin rosado.';
    vits = 'Prote\u00edna de alta calidad (31g/100g), B3, B6, zinc, f\u00f3sforo.';
    water = '2 vasos de agua. El pollo es bajo en grasa si es a la plancha.';
    alt = 'Sin pollo: at\u00fan, sardinas, huevos (3 huevos = 100g pollo en prote\u00edna).';
  } else if (n.includes('avena')) {
    portion = '\u00bd taza de avena seca (45g) = 1 taza cocida';
    prep = '1. Hierve 1 taza de agua o leche.<br>2. Agrega \u00bd taza de avena.<br>3. Cocina 3-5 min revolviendo.<br>4. Agrega canela, pl\u00e1tano maduro o una cucharadita de miel.';
    vits = 'Beta-glucanos (reduce colesterol), fibra soluble, hierro, magnesio, B1.';
    water = '1 vaso de agua (250ml).';
    alt = 'Sin avena: ar\u00e9pa de ma\u00edz, pan integral, yuca. Mismo nivel de saciedad.';
  } else if (n.includes('lentejas') || n.includes('caraotas') || n.includes('frijoles')) {
    portion = '\u00bd taza seca (100g) = 1 taza cocida (200g)';
    prep = '1. Remoja las legumbres 6-8h o toda la noche en agua con \u00bd cucharadita de bicarbonato.<br>2. Desecha el agua del remojo. Enjuaga.<br>3. Hierve en agua nueva con ajo y cebolla por 30-45 min.<br>4. Sofr\u00ede con tomate, ajo y cilantro al gusto.';
    vits = 'Hierro no-hemo (absorci\u00f3n con vitamina C), fibra, folato, prote\u00edna vegetal.';
    water = '2-3 vasos de agua. Las legumbres necesitan buena hidrataci\u00f3n.';
    alt = 'Sin lentejas: caraotas, garbanzos, granos verdes. Mismo perfil nutricional.';
  } else if (n.includes('salm\u00f3n') || n.includes('salmon') || n.includes('pescado')) {
    portion = '150-180g (filete mediano)';
    prep = '1. Seca el filete con papel absorbente.<br>2. Sazona con sal, limón y eneldo.<br>3. Cocina en sart\u00e9n con un poco de aceite de oliva, 4-5 min por lado a fuego medio.<br>4. Listo cuando la carne se desintegre f\u00e1cilmente con un tenedor.';
    vits = 'Omega-3 EPA/DHA (antiinflamatorio), vitamina D, B12, prote\u00edna de alta calidad.';
    water = '2 vasos de agua.';
    alt = 'Sin salm\u00f3n: sardinas en agua (m\u00e1s económicas, mismo Omega-3), at\u00fan, merluza.';
  }

  return { portion, prep, vits, water, alt };
}

// RECOMENDACIONES ROTACION
function nextRecomendacion(tipo) {
  if (!userData.recsIdx) userData.recsIdx = { libros: 0, documentales: 0, podcasts: 0 };
  userData.recsIdx[tipo] = (userData.recsIdx[tipo] || 0) + 1;
  saveLocal();
  showModule('recomendaciones');
}

// MOBILE MENU
function toggleMobileMenu() {
  const sidebar = document.getElementById('dashSidebar');
  const overlay = document.getElementById('mobileOverlay');
  if (!sidebar) return;
  sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('active');
}

// IMPRESION
function printShoppingList() { window.print(); }

// REINICIO
function restartApp() {
  if (!confirm('¿Crear un nuevo perfil? Se borrarán los datos actuales.')) return;
  localStorage.removeItem('vidaOptima_user');
  userData = { nombre:'',edad:30,sexo:'masculino',peso:70,estatura:170,ubicacion:'',
    streak:1,coins:10,lastCheckIn:new Date().toDateString(),enfermedades:[],alergias:'',
    fuma:'no',alcohol:'no',sueno:'bueno',estres:'bajo',digestion:'normal',
    objetivos:['mantenimiento'],enfoques:[],ingreso:0,presupuesto:0,
    actividad:'sedentario',tiempoEjercicio:'30',fechaRegistro:new Date().toISOString(),
    historial:{},isSynced:false,isPremium:false };
  location.reload();
}

// PROGRESO / HISTORIAL
function toggleTaskStatus(dateStr, taskId, checkEl) {
  if (!userData.historial) userData.historial = {};

  // Clave plana idéntica a la usada en modules.js al renderizar:
  // keyId = `${dateStr}_${m.id}`
  const key  = `${dateStr}_${taskId}`;
  const done = userData.historial[key] === true;
  userData.historial[key] = !done;

  // ── Actualización inmediata del DOM ──────────────────────────────────────
  if (checkEl) {
    // 1. Clase visual .checked (controla color/estilo vía CSS)
    checkEl.classList.toggle('checked', !done);
    // 2. Símbolo del checkmark
    checkEl.textContent = !done ? '✓' : '○';
    // 3. Opacidad del .meal-item padre para indicar "completado"
    const mealItem = checkEl.closest('.meal-item');
    if (mealItem) mealItem.style.opacity = !done ? '0.55' : '1';
  }
  // ─────────────────────────────────────────────────────────────────────────

  userData.coins = (userData.coins || 0) + (!done ? 2 : -2);
  saveLocal();
}

// PAGOS / REWARDS
function openCryptoPayment() {
  alert('Funcionalidad de pago en integraci\u00f3n. Contáctanos en: vidaoptima.oficial@gmail.com');
}
function simulatePaymentSuccess(planType) {
  userData.isPremium = true;
  userData.premiumPlan = planType;
  saveLocal();
  alert('¡Bienvenido a Premium! Tu plan ' + planType + ' está activo.');
  showModule('perfil');
}
function payWithCoins() {
  if ((userData.coins || 0) < 50) { alert('Necesitas m\u00e1s de 50 Optimal Coins.'); return; }
  userData.coins -= 50;
  userData.isPremium = true;
  saveLocal();
  alert('¡Premium activado con tus Optimal Coins!');
  showModule('perfil');
}
function watchVideo() {
  userData.coins = (userData.coins || 0) + 10;
  saveLocal();
  alert('+10 Optimal Coins ganados. \u00a1Sigue as\u00ed!');
}

// AUTH FIREBASE
function handleAuth(type) {
  const email = document.getElementById('auth-email');
  const pass = document.getElementById('auth-pass');
  if (!email || !pass) return;
  if (!email.value || !pass.value) { alert('Completa email y contrase\u00f1a.'); return; }
  if (typeof auth === 'undefined') { alert('Firebase no disponible.'); return; }
  if (type === 'login') {
    auth.signInWithEmailAndPassword(email.value, pass.value)
      .then(() => showModule('perfil'))
      .catch(e => alert('Error: ' + e.message));
  } else {
    auth.createUserWithEmailAndPassword(email.value, pass.value)
      .then(cred => {
        userData.isSynced = true;
        db.collection('users').doc(cred.user.uid).set(userData);
        showModule('perfil');
      })
      .catch(e => alert('Error: ' + e.message));
  }
}

function logout() {
  if (typeof auth !== 'undefined') auth.signOut();
  userData.isSynced = false;
  saveLocal();
  showModule('auth');
}

// SERVICE WORKER
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('SW registrado'))
      .catch(e => console.warn('SW no disponible:', e));
  });
}

// ARRANQUE
document.addEventListener('DOMContentLoaded', initApp);


// ═══════════════════════════════════════════════════════════════════════════
// CEREBRO ENGINE LOCAL v2  —  Fallback Biométrico Offline (Browser-Safe)
// Consolida: human_core.js · cerebro_engine.js · medical_exams_core.js · formula.js
// Aditivo · No altera estado global · No usa require()
// ═══════════════════════════════════════════════════════════════════════════
const CerebroEngineLocal = (() => {

  // ── 1. CRONOLOGÍA BIOLÓGICA (human_core.js) ────────────────────────────
  const CRONOLOGIA = {
    infancia:      { min: 0,  max: 11, prot_g_kg: 1.5, restricciones: { cafeina: true, estimulantes: true } },
    adolescencia:  { min: 12, max: 17, prot_g_kg: 1.8, restricciones: {} },
    adulto_joven:  { min: 18, max: 30, prot_g_kg: 1.6, restricciones: {} },
    adulto_maduro: { min: 31, max: 45, prot_g_kg: 1.8, restricciones: {} },
    adulto_mayor:  { min: 46, max: 64, prot_g_kg: 2.0, restricciones: {} },
    senior_longevo:{ min: 65, max: 110,prot_g_kg: 1.4, restricciones: {} }
  };

  function _bio(u) {
    const edad = parseInt(u.edad) || 25;
    const peso = parseFloat(u.peso) || 70;
    const hm   = (parseFloat(u.estatura) || 170) / 100;
    const imc  = parseFloat((peso / (hm * hm)).toFixed(1));
    const etapa = Object.keys(CRONOLOGIA).find(k => edad >= CRONOLOGIA[k].min && edad <= CRONOLOGIA[k].max) || 'adulto_joven';
    const cfg   = CRONOLOGIA[etapa];
    return {
      etapa, imc,
      clasificacion_imc: imc < 18.5 ? 'Bajo peso' : imc < 25 ? 'Normal' : imc < 30 ? 'Sobrepeso' : 'Obesidad',
      agua_diaria_ml: Math.round(peso * 35),
      prioridad_celular: etapa,
      prot_g_kg: cfg.prot_g_kg,
      restricciones: cfg.restricciones
    };
  }

  // ── 2. BASE DE JUGOS TERAPÉUTICOS (cerebro_engine.js → jugos_db) ────────
  const JUGOS = {
    energia:    { nombre:'Energía Total',       ingredientes:'1 Taza de Piña + 2 Ramas de Apio + 1 trocito de Jengibre',                         beneficio:'Aumenta la tasa metabólica y optimiza la digestión.',                                                            preparacion:'Licuar con 1 vaso de agua. Consumir sin colar para preservar la fibra.', sustitutos:{ ingrediente:'Jengibre', alternativa:'1 pizca de Canela en polvo', razon:'Evita interacción con anticoagulantes.' } },
    intelecto:  { nombre:'Cerebro Brillante',   ingredientes:'1 Plátano + 1 Cda de Avena + 1 Cdita de Cacao 100%',                              beneficio:'Precursores de dopamina y flavonoides para el enfoque cerebral.',                                                preparacion:'Licuar con 1 vaso de agua.',                                             sustitutos:{ ingrediente:'Cacao',    alternativa:'1 pizca de Canela en polvo', razon:'Optimiza insulina cerebral si el cacao genera acidez.' } },
    salud:      { nombre:'Escudo Protector',     ingredientes:'1 Limón (sin semillas) + 2 Ramas de Apio + ½ Pepino con piel',                    beneficio:'Alcalinizante, promueve síntesis de Óxido Nítrico endotelial.',                                                   preparacion:'Licuar con 1½ vaso de agua y consumir fresco.',                          sustitutos:{ ingrediente:'Limón',    alternativa:'120g de Papaya fresca',      razon:'Evita irritación de mucosa en gastritis.' } },
    longevidad: { nombre:'Poción de Autofagia',  ingredientes:'½ Pepino + ½ Manzana verde + 1 Puñado de Espinaca + Jugo de ½ Limón',            beneficio:'Estimula Sirtuinas (SIRT1), reduce estrés oxidativo y protege telómeros.',                                        preparacion:'Licuar con 1 vaso grande de agua fría.',                                 sustitutos:{ ingrediente:'Espinaca', alternativa:'100g de Repollo Blanco',      razon:'Glutamina curativa sin acumular oxalatos.' } },
    fuerza:     { nombre:'Bomba Anabólica',      ingredientes:'1 Plátano maduro + 1 Cda de Mantequilla de Maní + 1 Cdita de Cacao + 1 Cdita de Miel', beneficio:'Insulina controlada, aminoácidos de liberación rápida para recuperación muscular post-esfuerzo.', preparacion:'Licuar con 200ml de leche o agua.',                                      sustitutos:{ ingrediente:'Maní',     alternativa:'1 Cda de Avena integral',    razon:'Perfil de aminoácidos similar con menor costo.' } },
    libido:     { nombre:'Elixir de Vitalidad',  ingredientes:'½ Remolacha cruda + 1 Zanahoria + 1 Cda de Maca andina en polvo + Jugo de ½ Naranja', beneficio:'Aumenta producción de NO endotelial y niveles de testosterona/estrógenos de forma natural.', preparacion:'Licuar y colar. Consumir en ayunas.',                                   sustitutos:{ ingrediente:'Maca',     alternativa:'1 Cdita de Polen de abeja',  razon:'Similar perfil adaptogénico sin maca disponible.' } }
  };

  // ── 3. INFRAESTRUCTURA REGIONAL (formula.js) ───────────────────────────
  const REGIONES = {
    venezuela: { alimentos: ['Caraotas negras','Sardinas','Plátano macho','Aguacate'],     estrategia: 'Tubérculos de ferias libres + leguminosas como base calórica.' },
    colombia:  { alimentos: ['Frijol cargamanto','Arepa de maíz','Yuca','Trucha'],         estrategia: 'Leguminosas andinas + frutas ácidas para control de glucosa.' },
    mexico:    { alimentos: ['Maíz nixtamalizado','Nopal','Frijol pinto','Pepitas'],       estrategia: 'Nixtamalización para biodisponibilidad de B3.' },
    peru:      { alimentos: ['Quinoa','Camote','Maca','Bonito/Jurel'],                     estrategia: 'Pseudocereales andinos de alta carga proteica.' },
    argentina: { alimentos: ['Cortes magros de res','Zapallo','Lentejas','Espinaca'],      estrategia: 'Proteína vacuna magra + legumbres.' },
    chile:     { alimentos: ['Palta','Cochayuyo','Merluza','Porotos','Arándanos'],         estrategia: 'Algas locales para minerales traza sin suplementación.' },
    latam:     { alimentos: ['Plátano verde','Huevos de granja','Limón','Granos enteros'], estrategia: 'Legumbres + cereales integrales como core calórico.' }
  };

  function _region(u) {
    const loc = (u.ubicacion || '').toLowerCase();
    const key = Object.keys(REGIONES).find(k => loc.includes(k)) || 'latam';
    return { key, ...REGIONES[key] };
  }

  // ── 4. MOTOR CALÓRICO Y MACROS (cerebro_engine.js → procesarPerfilCompleto) ──
  const ACT_FACTOR = { sedentario:1.2, ligero:1.375, moderado:1.55, activo:1.725, muy_activo:1.9 };
  const OBJ_FACTOR = { aumentar_masa:1.15, bajar_grasa:0.80, mantenimiento:1.0, recuperacion:0.95, rendimiento:1.10, longevidad:0.90 };

  // Ratios base; se ajustarán dinámicamente por enfoques
  const MACROS_BASE = {
    aumentar_masa:  { p:0.35, c:0.45, g:0.20 },
    bajar_grasa:    { p:0.45, c:0.25, g:0.30 },
    mantenimiento:  { p:0.25, c:0.45, g:0.30 },
    rendimiento:    { p:0.35, c:0.45, g:0.20 },
    recuperacion:   { p:0.30, c:0.40, g:0.30 },
    longevidad:     { p:0.25, c:0.45, g:0.30 }
  };

  function _kcalMacros(u, bio) {
    const bmr = u.sexo === 'femenino'
      ? 10 * u.peso + 6.25 * u.estatura - 5 * u.edad - 161
      : 10 * u.peso + 6.25 * u.estatura - 5 * u.edad + 5;

    const objetivo  = (u.objetivos && u.objetivos[0]) || 'mantenimiento';
    let factorObj   = OBJ_FACTOR[objetivo] || 1.0;
    if ((u.enfermedades || []).includes('diabetes')) factorObj *= 0.95;

    const kcal = Math.round(bmr * (ACT_FACTOR[u.actividad] || 1.375) * factorObj);

    // ── Ajuste dinámico de macros por enfoques ──────────────────────────
    let r = { ...(MACROS_BASE[objetivo] || MACROS_BASE.mantenimiento) };
    const enf = u.enfoques || [];

    if (enf.includes('fuerza') || enf.includes('rendimiento')) {
      // Alta demanda proteica + carbos complejos de soporte
      r = { p: Math.min(r.p + 0.08, 0.50), c: r.c, g: Math.max(r.g - 0.08, 0.15) };
    }
    if (enf.includes('bajar_grasa') || objetivo === 'bajar_grasa') {
      r = { p: Math.min(r.p + 0.05, 0.50), c: Math.max(r.c - 0.05, 0.20), g: r.g };
    }
    if (enf.includes('longevidad') || enf.includes('salud')) {
      // Leve restricción calórica, más grasas saludables (autofagia)
      r = { p: r.p, c: Math.max(r.c - 0.05, 0.30), g: Math.min(r.g + 0.05, 0.40) };
    }

    // Normalizar a 100 %
    const sum = r.p + r.c + r.g;
    r = { p: r.p / sum, c: r.c / sum, g: r.g / sum };

    // Ajuste adicional por etapa biológica (factor proteico g/kg)
    const protReq = Math.round(u.peso * bio.prot_g_kg);    // g de proteína reales
    const protKcal = protReq * 4;
    const restKcal  = kcal - protKcal;
    const macros = {
      proteinas: protReq,
      carbos:    Math.round((restKcal * (r.c / (r.c + r.g))) / 4),
      grasas:    Math.round((restKcal * (r.g / (r.c + r.g))) / 9)
    };

    // Priorizar bajo presupuesto → fuentes de alta biodisponibilidad y bajo costo
    const menúType = u.presupuesto < 30 || u.ingreso < 300 ? 'default_econ'
                   : u.presupuesto < 60 || u.ingreso < 600 ? 'default_q1'
                   : 'default_premium';

    return { kcal, macros, menúType };
  }

  // ── 5. SELECCIÓN DE JUGO CON COLISIÓN MÉDICA ───────────────────────────
  function _jugo(u) {
    const enf  = u.enfoques || [];
    const cog  = u.diagnostico_cognitivo || 'ninguno';
    const enfs = u.enfermedades || [];
    const meds = u.medicamentos || 'no';

    // Prioridad 1: diagnóstico cognitivo
    let key = cog === 'tdah' || cog === 'burnout' ? 'intelecto'
            : enf.includes('longevidad')           ? 'longevidad'
            : enf.includes('energia')              ? 'energia'
            : enf.includes('fuerza')               ? 'fuerza'
            : enf.includes('libido')               ? 'libido'
            : 'salud';

    const jugo = { ...JUGOS[key] };

    // Colisión gástrica
    if (u.estado_gastrico !== 'sano' || enfs.includes('gastritis')) {
      if (jugo.ingredientes.includes('Limón')) {
        jugo.ingredientes = jugo.ingredientes.replace('Limón', 'Papaya');
      }
      if (jugo.ingredientes.includes('Apio')) {
        jugo.ingredientes = jugo.ingredientes.replace('Apio', 'Repollo Blanco');
      }
    }
    // Colisión farmacológica — anticoagulantes
    if (meds.includes('anticoagulante') && jugo.ingredientes.includes('Jengibre')) {
      jugo.ingredientes = jugo.ingredientes.replace('Jengibre', 'Canela en polvo');
    }

    return jugo;
  }

  // ── 6. MOTOR MÉDICO PREVENTIVO (medical_exams_core.js) ─────────────────
  const EXAMS_DB = {
    hemograma:          { nombre:'Hemograma completo',                   frecuencia:'Cada 12 meses',     proposito:'Detecta anemia, infecciones latentes y problemas del sistema inmune.' },
    glucosa:            { nombre:'Glucosa en sangre',                    frecuencia:'Cada 12 meses',     proposito:'Prevención de diabetes tipo 2 y resistencia a la insulina.' },
    lipidos:            { nombre:'Perfil lipídico',                      frecuencia:'Cada 12 meses',     proposito:'Riesgo cardiovascular (HDL, LDL, Triglicéridos).' },
    presion:            { nombre:'Presión arterial',                     frecuencia:'Cada 6 meses',      proposito:'Detección de hipertensión silenciosa.' },
    vitamina_d:         { nombre:'Vitamina D (25-OH)',                   frecuencia:'Cada 12 meses',     proposito:'El déficit afecta el humor, inmunidad y densidad ósea.' },
    tsh:                { nombre:'TSH (Tiroides)',                       frecuencia:'Cada 12-24 meses',  proposito:'Hipotiroidismo subclínico: peso, energía y estado de ánimo.' },
    citologia:          { nombre:'Papanicolau',                          frecuencia:'Cada 12-24 meses',  proposito:'Tamizaje preventivo de lesiones cervicales ligadas al VPH.' },
    mamografia:         { nombre:'Mamografía digital',                   frecuencia:'Cada 12 meses',     proposito:'Detección precoz de microcalcificaciones o neoplasias de mama.' },
    psa:                { nombre:'Antígeno Prostático (PSA)',            frecuencia:'Cada 12 meses',     proposito:'Tamizaje de hiperplasia u oncología de próstata.' },
    densitometria:      { nombre:'Densitometría ósea',                   frecuencia:'Cada 2-3 años',     proposito:'Prevención de osteoporosis silenciosa.' },
    colonoscopia:       { nombre:'Colonoscopía',                         frecuencia:'Cada 5-10 años',    proposito:'Remoción oportuna de pólipos precursores de cáncer de colon.' },
    ecg:                { nombre:'Electrocardiograma (ECG)',             frecuencia:'Cada 12 meses',     proposito:'Arritmias y evaluación del miocardio.' },
    espirometria:       { nombre:'Espirometría',                         frecuencia:'Cada 12 meses',     proposito:'Capacidad pulmonar y detección de EPOC.' },
    perfil_hormonal:    { nombre:'Perfil Hormonal completo',             frecuencia:'Cada 12 meses',     proposito:'Testosterona/estrógenos, cortisol, DHEA: ejes neuroendocrinos.' },
    perfil_cognitivo:   { nombre:'Evaluación cognitiva (MoCA/MMSE)',     frecuencia:'Cada 12-24 meses',  proposito:'Cribado temprano de deterioro cognitivo leve.' },
    funcion_hepatica:   { nombre:'Perfil Hepático (TGO/TGP/GGT)',       frecuencia:'Cada 12 meses',     proposito:'Función hepática y detección de esteatosis o hepatotoxicidad.' }
  };

  function _examenes(u) {
    const edad = parseInt(u.edad) || 25;
    const sexo = (u.sexo || '').toLowerCase();
    const enfs = u.enfermedades || [];
    const fuma = (u.fuma || 'no').toLowerCase();
    const etnic= (u.etnicidad || '').toLowerCase();
    const cog  = u.diagnostico_cognitivo || 'ninguno';

    const rec = new Set();
    const add = k => rec.add(k);

    // Universales ≥18
    if (edad >= 18) ['hemograma','glucosa','lipidos','presion','vitamina_d'].forEach(add);
    if (edad >= 30) add('tsh');
    if (edad >= 40 && sexo === 'femenino') add('mamografia');
    if (edad >= 45 && sexo === 'masculino') add('psa');
    if (edad >= 50) { add('colonoscopia'); add('ecg'); }
    if (edad >= 55) add('densitometria');
    if (sexo === 'femenino' && edad >= 21) add('citologia');
    if (fuma === 'si' || fuma === 'exfumador') add('espirometria');

    // Por etnicidad / patología cardiovascular
    if (enfs.includes('hipertension') || etnic.includes('afro')) {
      EXAMS_DB.ecg.frecuencia = 'Cada 6 meses (Control Prioritario)';
      add('ecg');
    }

    // Intensificación por patologías crónicas
    if (enfs.includes('diabetes') || enfs.includes('colesterol')) {
      EXAMS_DB.glucosa.frecuencia = 'Cada 3 meses (Monitoreo Clínico)';
      EXAMS_DB.lipidos.frecuencia = 'Cada 6 meses (Monitoreo Clínico)';
    }

    // Diagnóstico cognitivo → perfil cognitivo + hormonal
    if (cog !== 'ninguno' && cog !== '') { add('perfil_cognitivo'); add('perfil_hormonal'); }

    // Medicamentos activos → hígado bajo vigilancia
    if ((u.medicamentos || 'no') !== 'no') add('funcion_hepatica');

    return [...rec].map(k => EXAMS_DB[k]);
  }

  // ── 7. ALERTAS CLÍNICAS ────────────────────────────────────────────────
  function _alertas(u, jugo) {
    const alertas = [];
    const enfs = u.enfermedades || [];
    const meds = u.medicamentos || 'no';
    const est  = u.estado_gastrico || 'sano';
    const edad = parseInt(u.edad) || 25;

    // Restricción por edad
    if (edad < 16) {
      alertas.push('⛔ <strong>Restricción Pediátrica:</strong> Usuarios menores de 16 años no deben realizar ayunos intermitentes ni consumir estimulantes. Plan ajustado a demandas de crecimiento.');
    }

    // Estado gástrico
    if (est !== 'sano' || enfs.includes('gastritis')) {
      alertas.push('🔥 <strong>Aviso Gástrico:</strong> Evita cítricos concentrados, ayunos mayores de 14h y picantes. El jugo asignado fue adaptado para proteger tu mucosa gástrica.');
    }

    // Medicamentos activos
    if (meds !== 'no') {
      alertas.push(`⚠️ <strong>Interacción Farmacológica:</strong> Tienes medicación activa (${meds}). Consulta con tu médico antes de iniciar suplementos o cambios calóricos bruscos. Jengibre y Toronja pueden potenciar anticoagulantes.`);
    }

    // Hipertensión
    if (enfs.includes('hipertension')) {
      alertas.push('🩺 <strong>Hipertensión Detectada:</strong> Restricción de sodio < 1.5g/día. Prioriza potasio (plátano, aguacate). Evita carnes procesadas y embutidos.');
    }

    // Diabetes
    if (enfs.includes('diabetes')) {
      alertas.push('🩸 <strong>Diabetes Activa:</strong> Se aplicó restricción calórica del 5% adicional. Evita azúcares simples y frutas de alto índice glucémico (sandía, uvas). Prioriza fibra soluble.');
    }

    // Colisión detectada en jugo
    if (jugo.ingredientes.includes('Canela')) {
      alertas.push(`💊 <strong>Sustitución Activa en Jugo:</strong> El Jengibre fue reemplazado por Canela en polvo para eliminar la interacción con tu medicación anticoagulante.`);
    }
    if (jugo.ingredientes.includes('Papaya') || jugo.ingredientes.includes('Repollo')) {
      alertas.push(`🌿 <strong>Sustitución Gástrica Activa:</strong> Se reemplazaron ingredientes irritantes (Limón/Apio) por alternativas suaves (Papaya/Repollo Blanco) para proteger tu mucosa.`);
    }

    return alertas;
  }

  // ── 8. FUNCIÓN PÚBLICA PRINCIPAL ──────────────────────────────────────
  return {
    procesarPerfil(u) {
      const bio            = _bio(u);
      const { kcal, macros, menúType } = _kcalMacros(u, bio);
      const jugo           = _jugo(u);
      const examenesMedicos= _examenes(u);
      const alertas        = _alertas(u, jugo);
      const region         = _region(u);

      return {
        kcal,
        macros,
        menuType: menúType,
        diagnostico: {
          etapa:            bio.etapa,
          imc:              bio.imc,
          clasificacion_imc:bio.clasificacion_imc,
          agua_diaria_ml:   bio.agua_diaria_ml,
          prioridad_celular:bio.prioridad_celular,
          prot_g_kg:        bio.prot_g_kg
        },
        jugo,
        examenesMedicos,
        alertas,
        region,
        signature: 'CEREBRO_LOCAL_V2_OFFLINE'
      };
    }
  };
})();




function handleIntroPlayback() {
  const layer = document.getElementById('vidaoptima-intro-layer');
  const video = document.getElementById('vidaoptima-video');
  const skipBtn = document.getElementById('skip-intro-btn');
  if (!layer || !video) return;

  document.body.style.overflow = 'hidden';

  const activarAudio = () => {
    video.muted = false;
    layer.removeEventListener('click', activarAudio);
    layer.removeEventListener('touchstart', activarAudio);
  };
  layer.addEventListener('click', activarAudio);
  layer.addEventListener('touchstart', activarAudio);

  const cerrarIntro = () => {
    layer.style.opacity = '0';
    layer.style.visibility = 'hidden';
    document.body.style.overflow = '';
    setTimeout(() => { layer.remove(); }, 600);
  };

  video.onended = cerrarIntro;
  if (skipBtn) skipBtn.onclick = (e) => { e.stopPropagation(); video.pause(); cerrarIntro(); };
  setTimeout(cerrarIntro, 6000);
}
document.addEventListener('DOMContentLoaded', handleIntroPlayback);

// ═══════════════════════════════════════════════════════════════════
// MODAL DE INFORMACIÓN BIOMÉTRICA (VIDA ÓPTIMA)
// ═══════════════════════════════════════════════════════════════════
function openInfoModal(titulo, tipo) {
  const infoMap = {
    edad: "Representa el tiempo cronológico de tus sistemas. El objetivo de Vida Óptima es reducir tu edad biológica frente a la cronológica mediante la optimización de telómeros y mitigación del estrés oxidativo.",
    peso: "Masa molecular total de tu organismo. Utilizada como constante biométrica base para el cálculo de tu tasa metabólica y distribución de macronutrientes estructurales.",
    imc: "Índice de Masa Corporal. Relación matemática entre peso y estatura (kg/m²). El rango normopeso es el espectro metabólicamente más seguro contra el desarrollo de patologías cardiovasculares crónicas.",
    kcal: "Gasto Energético Total Diario (GETD) calculado para mantener tus funciones vitales (TMB) más tu nivel de actividad física. Ajustado milimétricamente hacia tu meta biológica de longevidad celular.",
    perfil: "Clasificación termodinámica y endocrina de tu organismo según tu edad y sexo. Determina la velocidad de oxidación de sustratos energéticos y la sensibilidad a la insulina.",
    proteinas: "Ladrillos estructurales del organismo. Esenciales para la síntesis de masa muscular, reparación de tejidos dañados, producción de enzimas y sostenimiento de la inmunoglobulina celular.",
    carbos: "Combustible molecular principal. Glucógeno almacenado en el hígado y músculos para proveer energía celular inmediata al sistema nervioso central y optimizar el rendimiento físico.",
    grasas: "Lípidos e insaturados indispensables para la síntesis de hormonas (testosterona/estrógenos), integridad de la membrana celular, protección del sistema cardiovascular y absorción de vitaminas liposolubles (A, D, E, K)."
  };

  const descripcion = infoMap[tipo] || "";
  const infoModal = document.getElementById('infoModal');

  if (infoModal) {
    const thinking = document.getElementById('infoThinking');
    const result = document.getElementById('infoResult');
    const titleEl = document.getElementById('infoTitle');
    const textEl = document.getElementById('infoText');
    if (thinking) thinking.style.display = 'none';
    if (result) {
      result.classList.remove('hidden');
      result.style.display = 'block';
    }
    if (titleEl) titleEl.textContent = titulo;
    if (textEl) textEl.textContent = descripcion;
    infoModal.classList.remove('hidden');
    infoModal.style.display = 'flex';
    return;
  }

  const mealModal = document.getElementById('mealModal');
  if (mealModal) {
    const modalTitle = document.getElementById('modalMealName');
    const modalBody = mealModal.querySelector('.modal-body');
    if (modalTitle) modalTitle.textContent = titulo;
    if (modalBody) {
      modalBody.innerHTML = `<p style="padding:15px 0; font-size:15px; line-height:1.6; color:var(--text);">${descripcion}</p>`;
    }
    mealModal.classList.remove('hidden');
    mealModal.style.display = 'flex';
  }
}
window.openInfoModal = openInfoModal;