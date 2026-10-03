/**
 * ============================================================================
 * VIDA ÓPTIMA — Motor de Decisiones Clínicas y Nutricionales (cerebro_engine.js)
 * ============================================================================
 * @author      Terry Edicson Romero Loreto (Founder & CEO)
 * @copyright   © 2025 - 2026 Terry Edicson Romero Loreto. Todos los derechos reservados.
 * @version     1.2.0 [PRODUCTION-READY]
 * @description Orquestador central inteligente que integra el perfil biológico, 
 *              patologías, salud mental, jugos preventivos y exámenes clínicos.
 * ============================================================================
 */

const HumanCore = require('./human_core.js');
const MedicalExamsCore = require('./medical_exams_core.js');

const CerebroEngine = {
  // ── INFRACESTRUCTURA MAESTRA DE JUGOS Y ELIXIRES (Matriz de Selección) ──
  jugos_db: {
    energia: {
      nombre: "Energía Total",
      ingredientes: "1 Taza de Piña + 2 Ramas de Apio + 1 trocito de Jengibre",
      beneficio: "Aumenta la tasa metabólica y optimiza la digestión.",
      preparacion: "Licuar con 1 vaso de agua. Consumir sin colar para preservar la fibra estructural.",
      sustitutos: { ingrediente: "Jengibre", alternativa: "1 pizca de Canela en polvo", razon: "Evita la interacción con medicamentos anticoagulantes manteniendo el estímulo insulínico." }
    },
    intelecto: {
      nombre: "Cerebro Brillante (Enfoque Dopaminérgico)",
      ingredientes: "1 Plátano (Cambur) + 1 Cucharada de Avena tradicional + 1 Cucharadita de Cacao puro 100%",
      beneficio: "Aumenta la disponibilidad de flavonoides y precursores de dopamina para el enfoque cerebral.",
      preparacion: "Licuar con 1 vaso de agua hasta lograr consistencia homogénea.",
      sustitutos: { ingrediente: "Cacao", alternativa: "1 pizca de Canela en polvo", razon: "Optimiza la sensibilidad a la insulina cerebral si el cacao genera acidez." }
    },
    salud: {
      nombre: "Escudo Protector",
      ingredientes: "1 Limón entero (sin semillas) + 2 Ramas de Apio + 1/2 Pepino con piel",
      beneficio: "Altamente alcalinizante, promueve la síntesis de Óxido Nítrico endotelial.",
      preparacion: "Licuar con 1 vaso y medio de agua y consumir fresco.",
      sustitutos: { ingrediente: "Limón", alternativa: "120g de Papaya/Lechosa fresca", razon: "Evita la irritación de la mucosa en presencia de gastritis aguda o úlceras active." }
    },
    longevidad: {
      nombre: "Poción de Juventud y Autofagia",
      ingredientes: "1/2 Pepino con piel + 1/2 Manzana verde + 1 Puñado de hojas de Espinaca fresca + Jugo de 1/2 Limón",
      beneficio: "Estímulo de Sirtuinas (SIRT1), reducción del estrés oxidativo y protección de telómeros.",
      preparacion: "Licuar con 1 vaso grande de agua fría.",
      sustitutos: { ingrediente: "Espinaca", alternativa: "100g de Repollo Blanco licuado", razon: "Aporta altas dosis de glutamina curativa sin acumular oxalatos." }
    }
  },

  // 🧠 ALGORITMO INTEGRAL DE ORQUESTACIÓN BIOMÉDICA
  procesarPerfilCompleto(userData) {
    // ── INVARIANTES DE ENTRADA (no negociables) ──────────────────────────────
    // Longevidad: siempre presente como enfoque base del sistema
    if (!userData.enfoques) userData.enfoques = [];
    if (!userData.enfoques.includes('longevidad')) userData.enfoques.push('longevidad');
    // Barrera mínima de supervivencia económica ($15/semana = $30 quincenal)
    if ((userData.presupuesto || 0) < 30) userData.presupuesto = 30;
    if ((userData.ingreso    || 0) < 60) userData.ingreso     = 60;
    // ─────────────────────────────────────────────────────────────────────────

    // 1. Obtener base e indicadores biológicos puros (Etapa, IMC, Agua basal)
    const bio = HumanCore.obtenerParametrosCuerpo(userData);
    
    // 2. Calcular presupuesto calórico preciso (Mifflin-St Jeor + Ajuste de Objetivos)
    let bmr = userData.sexo === 'masculino'
      ? 10 * userData.peso + 6.25 * userData.estatura - 5 * userData.edad + 5
      : 10 * userData.peso + 6.25 * userData.estatura - 5 * userData.edad - 161;
      
    const factoresActividad = { sedentario: 1.2, ligero: 1.375, moderado: 1.55, activo: 1.725, muy_activo: 1.9 };
    let kcalBase = Math.round(bmr * (factoresActividad[userData.actividad] || 1.375));

    // Ajuste por objetivos metabólicos
    const ajustesObjetivo = { 
      aumentar_masa: 1.15, bajar_grasa: 0.80, mantenimiento: 1.0, 
      recuperacion: 0.95, rendimiento: 1.10, longevidad: 0.90 
    };
    
    let factorObjetivo = 1.0;
    if (userData.objetivos && userData.objetivos.length > 0) {
      factorObjetivo = ajustesObjetivo[userData.objetivos[0]] || 1.0;
    }
    
    // ⚠️ PENALIZACIÓN CLÍNICA ADICIONAL: Si hay Diabetes o Resistencia a la Insulina
    if (userData.enfermedades && userData.enfermedades.includes('diabetes')) {
      factorObjetivo = factorObjetivo * 0.95; // Leve restricción calórica adicional para mitigar picos
    }
    
    const kcalFinales = Math.round(kcalBase * factorObjetivo);

    // 3. Distribución de Macronutrientes por Objetivo Coherente
    const ratiosMacros = {
      aumentar_masa:  { p: 0.35, c: 0.45, g: 0.20 },
      bajar_grasa:    { p: 0.45, c: 0.25, g: 0.30 },
      mantenimiento:  { p: 0.25, c: 0.45, g: 0.30 },
      longevidad:     { p: 0.25, c: 0.45, g: 0.30 }
    };
    
    const principalObj = (userData.objetivos && userData.objetivos.length > 0) ? userData.objetivos[0] : 'mantenimiento';
    const r = ratiosMacros[principalObj] || ratiosMacros.mantenimiento;
    
    const macros = {
      proteinas: Math.round((kcalFinales * r.p) / 4),
      carbos:    Math.round((kcalFinales * r.c) / 4),
      grasas:    Math.round((kcalFinales * r.g) / 9)
    };

    // 4. SELECCIÓN INTELIGENTE Y TRADUCCIÓN DE ELIXIRES LÍQUIDOS (JUGOS)
    let jugoAsignado = { ...this.jugos_db.salud }; // Default funcional
    let alertasClinicas = [];

    // Priorización por Diagnóstico Cognitivo o Salud Mental
    if (userData.diagnostico_cognitivo === 'tdah' || userData.diagnostico_cognitivo === 'burnout') {
      jugoAsignado = { ...this.jugos_db.intelecto };
    } else if (userData.enfoques && userData.enfoques.includes('longevidad')) {
      jugoAsignado = { ...this.jugos_db.longevidad };
    } else if (userData.enfoques && userData.enfoques.includes('energia')) {
      jugoAsignado = { ...this.jugos_db.energia };
    }

    // 🛡️ APLICACIÓN DE REGLAS DE COLISIÓN MÉDICA SOBRE JUGOS
    if (userData.estado_gastrico === 'gastritis_cronica' || (userData.enfermedades && userData.enfermedades.includes('gastritis'))) {
      if (jugoAsignado.ingredientes.includes('Limón') || jugoAsignado.ingredientes.includes('Apio')) {
        alertasClinicas.push(`🔥 <strong>Aviso Gástrico:</strong> Se activó la sustitución del ingrediente [${jugoAsignado.sustitutos.ingrediente}] por [${jugoAsignado.sustitutos.alternativa}] debido a tu diagnóstico de mucosa sensible.`);
        jugoAsignado.ingredientes = jugoAsignado.ingredientes.replace('Limón', 'Papaya').replace('Apio', 'Repollo Blanco');
      }
    }

    if (userData.medicamentos === 'si_anticoagulante' && jugoAsignado.ingredientes.includes('Jengibre')) {
      alertasClinicas.push(`⚠️ <strong>Interacción Farmacológica detectada:</strong> Se eliminó el Jengibre crudo concentrado para evitar potenciar el efecto de los medicamentos anticoagulantes. Reemplazado por Canela en polvo.`);
      jugoAsignado.ingredientes = jugoAsignado.ingredientes.replace('Jengibre', 'Canela en polvo');
    }

    // 5. Prescripción de Exámenes Preventivos
    const examenes = MedicalExamsCore.generarRecomendaciones(userData);

    // 6. Segmentación del Tipo de Menú (Presupuesto)
    let menuType = 'default_premium';
    if (userData.presupuesto < 30 || userData.ingreso < 300) menuType = 'default_econ';
    else if (userData.presupuesto < 60 || userData.ingreso < 600) menuType = 'default_q1';

    return {
      success: true,
      diagnostico: {
        etapa: bio.etapa,
        imc: bio.imc,
        clasificacion_imc: bio.clasificacion_imc,
        prioridad_celular: bio.prioridad,
        agua_diaria_ml: bio.agua_diaria_ml
      },
      kcal: kcalFinales,
      macros,
      menuType,
      jugo: jugoAsignado,
      examenesMedicos: examenes,
      alertas: alertasClinicas,
      signature: "VALID_IP_TERRY_ROMERO_2026"
    };
  }
};

module.exports = CerebroEngine;
