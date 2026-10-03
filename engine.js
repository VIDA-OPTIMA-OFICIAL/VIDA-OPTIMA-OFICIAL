/**
 * ============================================================
 * VIDA ÓPTIMA — Motor de Personalización Biológica (engine.js)
 * ============================================================
 * @author      Terry Edicson Romero Loreto (Founder & CEO)
 * @id          20.264.887
 * @copyright   © 2025 Terry Edicson Romero Loreto. Todos los derechos reservados.
 * @license     Propiedad Intelectual Protegida — Prohibida su 
 *              reproducción, copia o uso sin autorización.
 * ------------------------------------------------------------
 * Este motor contiene algoritmos de cálculo metabólico, 
 * presupuesto dinámico y lógica de longevidad, los cuales 
 * constituyen secreto comercial del Fundador.
 * ============================================================
 */

const Engine = {
  // Metadatos de propiedad (Digital Signature - Blindaje Legal)
  _signature: "54-45-52-52-59-5f-52-4f-4d-45-52-4f-5f-4c-4f-52-45-54-4f", // Hex for 'Terry Romero Loreto'
  _version: "2.1.0-STABLE",
  _owner: "Terry Edicson Romero Loreto",
  _id: "20.264.887",
  _legalStatus: "Propiedad Privada - Derechos de Autor Protegidos",

  // Infraestructura de Socios Comerciales (Ready for Integration)
  partners: {
    supermarkets: [], // { id, name, region, api_endpoint, commission_per_order }
    supplements: [],  // { id, name, product_link, affiliate_id, commission_pct }
    professionals: [] // { id, name, type, geo_location, certification_status }
  },

  // Canales de Expansión Técnica
  externalAPIs: {
    nutrition: "FatSecret Premier Free (Ready)",
    tracking: "HealthKit / Google Fit (Future)",
    payments: "Binance Pay / Stripe (Integrated)"
  },


  // 🛡️ GUARDA DE INTEGRIDAD (Protección contra robo de código)
  // Si alguien altera los metadatos de autoría, el motor se bloquea.
  _integrityCheck() {
    const validOwner = "Terry Edicson Romero Loreto";
    const validID = "20.264.887";
    if (this._owner !== validOwner || this._id !== validID) {
      console.error("⛔ ERROR DE INTEGRIDAD: Licencia no válida o manipulación de autoría detectada.");
      return false;
    }
    return true;
  },

  // ── Calcular IMC ──────────────────────────
  calcIMC(peso, estatura) {
    if (!this._integrityCheck()) return "0.0 (Unauthorized)";
    const h = estatura / 100;
    return (peso / (h * h)).toFixed(1);
  },

  clasificarIMC(imc) {
    if (imc < 18.5) return { label: 'Bajo peso', color: 'blue' };
    if (imc < 25)   return { label: 'Peso normal', color: 'green' };
    if (imc < 30)   return { label: 'Sobrepeso', color: 'yellow' };
    return { label: 'Obesidad', color: 'red' };
  },

  // ── Calorías base (Mifflin-St Jeor) ───────
  calcCalorias(peso, estatura, edad, sexo, actividad) {
    if (!this._integrityCheck()) return 2000; // Valor genérico si hay robo
    let bmr = sexo === 'masculino'
      ? 10*peso + 6.25*estatura - 5*edad + 5
      : 10*peso + 6.25*estatura - 5*edad - 161;
    const factores = { sedentario:1.2, ligero:1.375, moderado:1.55, activo:1.725, muy_activo:1.9 };
    return Math.round(bmr * (factores[actividad] || 1.375));
  },

  // ── Detectar perfil de los 10 tipos ───────
  detectarPerfil(edad, sexo) {
    if (!this._integrityCheck()) return 'nino';
    if (edad <= 11) return 'nino';
    if (edad <= 17) return sexo === 'masculino' ? 'adolescente_m' : 'adolescente_f';
    if (edad <= 30) return sexo === 'masculino' ? 'joven_m' : 'joven_f';
    if (edad <= 45) return sexo === 'masculino' ? 'adulto_m' : 'adulto_f';
    if (edad <= 60) return sexo === 'masculino' ? 'mayor_m' : 'mayor_f';
    return 'senior';
  },

  // ── Ajustar calorías por objetivo (Escalado Inteligente) ─────────
  ajustarCalorias(calorias, objetivos) {
    if (!this._integrityCheck()) return calorias;
    // Ajustes porcentuales para mayor precisión metabólica
    const adj = { 
      aumentar_masa: 1.15, // +15% superávit para construcción
      bajar_grasa: 0.80,   // -20% déficit para oxidación de grasa
      mantenimiento: 1.0,
      recuperacion: 0.95,
      rendimiento: 1.10,
      longevidad: 0.90     // Restricción calórica leve (probado científicamente para longevidad)
    };
    if (!objetivos || objetivos.length === 0) return calorias;
    
    let factor = 0;
    objetivos.forEach(obj => factor += (adj[obj] || 1.0));
    return Math.round(calorias * (factor / objetivos.length));
  },

  // ── Macros en gramos (Optimización por Objetivo) ────────────────
  calcMacros(kcal, objetivos) {
    if (!this._integrityCheck()) return { proteinas: 0, carbos: 0, grasas: 0 };
    const ratios = {
      // Priorizar proteína para construcción
      aumentar_masa:  { p:0.35, c:0.45, g:0.20 },
      // Alta proteína para preservar músculo en déficit
      bajar_grasa:    { p:0.45, c:0.25, g:0.30 },
      mantenimiento:  { p:0.25, c:0.45, g:0.30 },
      recuperacion:   { p:0.30, c:0.40, g:0.30 },
      rendimiento:    { p:0.25, c:0.55, g:0.20 },
      longevidad:     { p:0.25, c:0.45, g:0.30 },
    };
    const obj = (objetivos && objetivos.length > 0) ? objetivos[0] : 'mantenimiento';
    const r = ratios[obj] || ratios.mantenimiento;
    return {
      proteinas: Math.round(kcal * r.p / 4),
      carbos:    Math.round(kcal * r.c / 4),
      grasas:    Math.round(kcal * r.g / 9),
    };
  },

  // ── Motor de Sustitución Inteligente ─────────────────────────────
  obtenerSustituto(alimento, usuario) {
    const a = alimento.toLowerCase();
    const e = (usuario.alergias || '').toLowerCase();
    
    // Diccionario de sustituciones por equivalencia metabólica
    const sustitutos = [
      { trigger: ['maiz', 'maíz', 'arepa'], reemplazo: 'Harina de Avena o Yuca sancochada', razon: 'Mismo aporte de carbohidratos con menor índice glucémico.' },
      { trigger: ['pan', 'trigo', 'gluten'], reemplazo: 'Casabe (yuca) o Galletas de Arroz', razon: 'Alternativa libre de gluten para evitar inflamación intestinal.' },
      { trigger: ['leche', 'lacteos', 'lácteos'], reemplazo: 'Leche de Coco o Almendras (sin azúcar)', razon: 'Evita la lactosa manteniendo la textura en preparaciones.' },
      { trigger: ['pollo'], reemplazo: 'Atún al natural o Huevos revueltos', razon: 'Proteína de alto valor biológico a menor costo.' },
      { trigger: ['carne', 'res'], reemplazo: 'Lentejas o Frijoles negros', razon: 'Proteína vegetal de alta densidad con hierro.' }
    ];

    const match = sustitutos.find(s => s.trigger.some(t => a.includes(t)));
    if (match && e.includes(match.trigger[0])) {
      return { nuevo: match.reemplazo, razon: match.razon };
    }
    return null;
  },

  // ── Motor de Regiones Maestro ────────────────
  detectarRegion(uStr) {
    if (!this._integrityCheck()) return 'latam';
    const u = (uStr || '').toLowerCase();
    if (/venezuel|caracas|maracaibo|valencia|barquisimeto/.test(u)) return 'venezuela';
    if (/colombia|bogot|medell|cali/.test(u)) return 'colombia';
    if (/mexico|méx|guadal|monterr/.test(u)) return 'mexico';
    if (/peru|lima|cusco/.test(u)) return 'peru';
    if (/argentin|buenos|córdoba/.test(u)) return 'argentina';
    if (/chile|santiago/.test(u)) return 'chile';
    if (/ecuador|quito|guayaquil/.test(u)) return 'ecuador';
    if (/brasil|brazil|são paulo|rio/.test(u)) return 'brasil';
    if (/cuba/.test(u)) return 'cuba';
    if (/dominicana/.test(u)) return 'dominicana';
    if (/puerto rico/.test(u)) return 'puertorico';
    if (/costa rica|panama|honduras|guatemala|salvador|nicaragua/.test(u)) return 'centroamerica';
    return 'latam';
  },

  // ── Alimentos típicos por región ──────────
  alimentosRegion: {
    venezuela:  ['Caraotas negras','Plátano','Yuca','Arepas','Aguacate','Ají','Papelón','Sardinas','Queso blanco','Pabellón'],
    colombia:   ['Frijoles','Plátano','Yuca','Arroz','Aguacate','Ajiaco','Mazorca','Trucha'],
    mexico:     ['Frijoles negros','Maíz','Aguacate','Chile','Nopal','Calabaza','Pepita'],
    peru:       ['Quinoa','Kiwicha','Frejoles','Maca','Camu-camu','Lúcuma','Ají amarillo'],
    argentina:  ['Lentejas','Zapallo','Remolacha','Acelga','Manzana','Pera','Nueces'],
    chile:      ['Porotos','Choclo','Zapallo','Manzana','Frambuesa','Nueces','Merluza'],
    ecuador:    ['Frijoles','Plátano','Yuca','Quinoa','Mortiño','Naranjilla','Tilapia'],
    brasil:     ['Feijão','Arroz','Mandioca','Açaí','Caju','Maracujá','Peixe'],
    latam:      ['Legumbres','Arroz integral','Plátano','Aguacate','Limón','Vegetales de hoja','Huevos'],
  },

  // ── Menú base por perfil y objetivo ───────
  menus: {
    default_premium: {
      _disclaimer: "Vida Óptima es un canal de optimización biológica. No nos hacemos responsables por la calidad de los insumos externos (frutas, carnes, etc.) adquiridos por el usuario. Este plan es una guía de precisión probabilística basada en datos nutricionales estándar.",
      L: ['Tortilla de 3 huevos orgánicos + aguacate + arándanos', 'Salmón salvaje/Pescado graso + quinoa + espárragos', 'Puñado de nueces + 1 manzana verde', 'Crema de calabaza + pechuga de pavo + nueces'],
      M: ['Bowl de yogur griego + chía + frutos rojos', 'Pechuga de pollo de corral + batata asada + brócoli con aceite de oliva', '1 Taza de té verde + almendras', 'Ensalada de espinaca, atún al natural, tomates cherry y almendras'],
      X: ['Smoothie verde (Espinaca, manzana verde, apio, espirulina)', 'Corte de res magro (ej. Lomito) + arroz salvaje + ensalada mixta', '1 Yogur griego pequeño', 'Filete de pescado al horno + vegetales asados'],
      J: ['Pancakes de avena y proteína + fresas + crema de cacahuate', 'Pechuga de pollo + ensalada de aguacate, tomate y pepino', '1 Fruta de estación (Pera o Manzana)', 'Sopa de vegetales densa + trozos de pollo'],
      V: ['Tostadas de pan de masa madre + salmón ahumado + huevo pochado', 'Lomo de cerdo magro + puré de papa + zanahorias baby', 'Puñado de marañón/anacardos', 'Ensalada capresa (Mozzarella, tomate, albahaca) + pollo a la plancha'],
      S: ['Avena horneada con manzana, canela y almendras', 'Bowl de quinoa, caraotas negras, aguacate y carne molida', '1 Batido de proteína o 1 huevo duro', 'Sándwich de pan integral con pavo, queso fresco y vegetales'],
      D: ['Omelette de claras con espinaca y champiñones + té matcha', 'Pasta integral o de lentejas con salsa boloñesa (res magra)', 'Palitos de zanahoria con hummus', 'Sopa ligera + porción de pescado blanco'],
    },
    default_q1: {
      L: ['Huevos revueltos + aguacate + fruta', 'Arroz integral + pollo a la plancha + ensalada', '1 Fruta + 5 nueces', 'Sopa de vegetales + pan integral'],
      M: ['Avena con fruta + nueces', 'Lentejas guisadas + arroz + tajadas', '1 Yogur natural', 'Ensalada de atún con vegetales'],
      X: ['Smoothie verde + tostadas integrales', 'Pollo al horno + yuca cocida + ensalada', '1 Manzana o Cambur', 'Caraotas negras + plátano + queso'],
      J: ['Yogur natural + granola + fruta', 'Pescado al vapor + arroz + brócoli', 'Puñado de maní sin sal', 'Crema de verduras + huevo duro'],
      V: ['Arepa integral + queso blanco + aguacate', 'Res magra + papas al horno + vegetales', '1 Huevo duro', 'Ensalada completa + atún'],
      S: ['Pancakes de avena + frutas', 'Pollo guisado + caraotas + arroz', 'Batido de avena ligero', 'Sandwich integral + sopa'],
      D: ['Frutas mixtas + nueces + té verde', 'Pasta integral + vegetales salteados', 'Tostada con aguacate', 'Sopa ligera + pan'],
    },
    default_econ: {
      L: ['Jugo Funcional del Día + 2 Huevos Duros', 'Lentejas guisadas + arroz blanco', '1 Cambur/Fruta', 'Arepa asada + queso blanco'],
      M: ['Avena hervida con agua + 1 fruta', 'Arroz + sardinas + tomate', 'Tostada sola', 'Plátano sancochado + 1 huevo'],
      X: ['Jugo Funcional del Día + 1 Pan', 'Caraotas negras + yuca sancochada', '1 Taza de avena ligera', 'Ensalada de repollo + 2 huevos'],
      J: ['Avena hervida + canela', 'Pasta + sardinas en salsa', '1 Fruta económica', 'Sopa o caldo de verduras'],
      V: ['Jugo Funcional del Día + 2 Huevos Duros', 'Lentejas guisadas + tajadas', 'Puñado de maní', 'Arepa asada + mantequilla/queso'],
      S: ['Pan + tortilla de 1 huevo', 'Arroz + vegetales salteados + 1 huevo', '1 Huevo duro', 'Caraotas negras + pan'],
      D: ['Avena con agua + fruta', 'Sopa de vegetales densa', '1 Cambur/Plátano dulce', 'Plátano sancochado + queso'],
    }
  },

  getMenuSemana(menuType, offset, usuario) {
      const base = JSON.parse(JSON.stringify(this.menus[menuType]));
      if (offset > 0) {
          const keys = Object.keys(base).filter(k => k !== '_disclaimer');
          keys.forEach(day => {
              base[day] = base[day].map(item => item + " (Versión B)");
          });
      }
      return base;
  },

  getIngredientesSemana(menuType, offset, multiplier) {
      const ingredientes = this.ingredientesBase[menuType];
      return ingredientes.items.map(item => ({
          ...item,
          i: item.i.replace(/\d+(\.\d+)?\s*(kg|g|uds)/g, match => {
              const num = parseFloat(match);
              return (num * multiplier).toString() + match.replace(/\d+(\.\d+)?/g, '');
          })
      }));
  },

  // ── Ingredientes exactos para 7 días por Menú ──
  ingredientesBase: {
    default_premium: {
      costoRef: 75,
      items: [
        { c: 'Proteínas', i: 'Huevos orgánicos o de pastoreo (2 cartones de 12 uds)' },
        { c: 'Proteínas', i: 'Pechuga de pavo / Pollo de corral (1.5 kg)' },
        { c: 'Proteínas', i: 'Salmón salvaje o Pescado graso (1 kg)' },
        { c: 'Proteínas', i: 'Lomo de cerdo magro (500g) y Corte de res magro (500g)' },
        { c: 'Proteínas', i: 'Yogur griego sin azúcar (1 litro grande)' },
        { c: 'Carbohidratos', i: 'Avena integral (500g)' },
        { c: 'Carbohidratos', i: 'Pan de masa madre o integral (1 hogaza/paquete)' },
        { c: 'Carbohidratos', i: 'Quinoa y Arroz salvaje (500g c/u)' },
        { c: 'Carbohidratos', i: 'Batata / Papa (1 kg) y Lentejas/Caraotas negras (500g c/u)' },
        { c: 'Grasas Buenas', i: 'Aceite de oliva extra virgen (1 botella)' },
        { c: 'Grasas Buenas', i: 'Aguacate (4-5 medianos)' },
        { c: 'Grasas Buenas', i: 'Nueces y Almendras (200g c/u) y Crema de cacahuate natural (1 frasco)' },
        { c: 'Vegetales/Frutas', i: 'Espinaca/Hojas verdes (2 paquetes grandes)' },
        { c: 'Vegetales/Frutas', i: 'Arándanos, Fresas y Manzanas (1 kg total)' },
        { c: 'Vegetales/Frutas', i: 'Brócoli, Tomate, Pepino, Champiñones, Zanahorias baby, Espárragos, Calabaza (Variado 2.5 kg)' }
      ]
    },
    default_q1: {
      costoRef: 45,
      items: [
        { c: 'Proteínas', i: 'Huevos grandes (2 cartones de 12 uds)' },
        { c: 'Proteínas', i: 'Pechuga o Muslos de Pollo (2 kg)' },
        { c: 'Proteínas', i: 'Carne magra de res (500g) y Atún enlatado (4 latas)' },
        { c: 'Proteínas', i: 'Pescado blanco para vapor/horno (1 kg)' },
        { c: 'Carbohidratos', i: 'Avena tradicional (1 kg) y Arroz integral (1 kg)' },
        { c: 'Carbohidratos', i: 'Caraotas negras y Lentejas (500g c/u)' },
        { c: 'Carbohidratos', i: 'Plátano macho (4-5 uds) y Yuca/Papas (1 kg)' },
        { c: 'Carbohidratos', i: 'Pan integral o Harina de maíz (1 paquete)' },
        { c: 'Grasas Buenas', i: 'Aguacate (3 medianos) y Nueces o Maní sin sal (250g)' },
        { c: 'Vegetales/Frutas', i: 'Fruta de estación mixta (Manzana, Cambur/Plátano dulce) (1.5 kg)' },
        { c: 'Vegetales/Frutas', i: 'Vegetales surtidos (Brócoli, Tomate, Cebolla, Zanahoria, Hojas para ensalada) (2 kg)' }
      ]
    },
    default_econ: {
      costoRef: 20,
      items: [
        { c: 'Proteínas', i: 'Huevos medianos o grandes (1 cartón de 30 uds)' },
        { c: 'Proteínas', i: 'Sardinas o Atún enlatado (4-5 latas)' },
        { c: 'Proteínas', i: 'Queso blanco duro o semiduro (500g)' },
        { c: 'Carbohidratos', i: 'Arroz blanco (2 kg) y Pasta (1 kg)' },
        { c: 'Carbohidratos', i: 'Lentejas (1 kg) y Caraotas negras (1 kg) (Abundantes para guisar)' },
        { c: 'Carbohidratos', i: 'Plátano macho (6-8 uds para sancochar o freír)' },
        { c: 'Carbohidratos', i: 'Harina de maíz o Pan básico (2 paquetes)' },
        { c: 'Carbohidratos', i: 'Yuca y Papa (1.5 kg total)' },
        { c: 'Carbohidratos', i: 'Avena en hojuelas (500g)' },
        { c: 'Vegetales/Frutas', i: 'Tomate, Cebolla, Repollo, Zanahoria (Base para ensaladas y guisos) (1.5 kg)' },
        { c: 'Vegetales/Frutas', i: 'Fruta económica de estación (ej. Cambur/Plátano dulce, Guayaba) (1 kg)' }
      ]
    }
  },

  // ── Tips Inteligentes de Compras ──
  tipsCompras: [
    { icon: '\uD83E\uDD51', titulo: 'Elegir el Aguacate Ideal', keywords: ['aguacate','palta'], texto: 'Presiona suavemente cerca del tallo. Si cede ligeramente est\u00e1 listo. Si est\u00e1 duro, d\u00e9jalo 2-3 d\u00edas en la mesa. Evita los que suenan huecos o tienen burbujas bajo la piel.' },
    { icon: '\uD83C\uDF4C', titulo: 'Pl\u00e1tanos: Cu\u00e1ndo Comprarlos', keywords: ['pl\u00e1tano','cambur','banana','platano'], texto: 'Compra un racimo con distintos tonos: verde para los \u00faltimos d\u00edas, amarillo para hoy. Los puntos negros indican mayor dulzor (ideal para batidos). Nunca los refrigeres.' },
    { icon: '\uD83E\uDD5A', titulo: 'Huevos: C\u00f3mo Elegirlos', keywords: ['huevo'], texto: 'El color de la c\u00e1scara no afecta el valor nutricional. Busca "Gallinas Libres" o "Pastoreo" si puedes. Prueba de frescura: pon el huevo en agua fría, si flota, deséchalo.' },
    { icon: '\uD83E\uDD54', titulo: 'Papas Sin Brotes Ni Verde', keywords: ['papa','patata'], texto: 'Evita papas con brotes o tonos verdes (contienen solanina t\u00f3xica). Deben sentirse firmes y pesadas. Gu\u00e1rdalas lejos de las cebollas, se aceleran mutuamente.' },
    { icon: '\uD83C\uDF45', titulo: 'Tomates: Nunca en la Nevera', keywords: ['tomate'], texto: 'Un buen tomate huele a tomate en el tallo y es pesado para su tama\u00f1o. NUNCA los refrigeres: el fr\u00edo destruye el sabor. Gu\u00e1rdalos con el tallo hacia arriba a temperatura ambiente.' },
    { icon: '\uD83E\uDD6B', titulo: 'Leer Etiquetas de Empaquetados', keywords: ['at\u00fan','sardina','avena','pasta','arroz','harina','enlatado'], texto: 'Lee los ingredientes, NO las calor\u00edas. Si el az\u00facar aparece entre los primeros 3 ingredientes, evítalo. Menos ingredientes = m\u00e1s saludable.' },
    { icon: '\uD83D\uDC14', titulo: 'Pollo Fresco: Señales Clave', keywords: ['pollo','pechuga'], texto: 'El pollo fresco debe ser rosado p\u00e1lido, no gris\u00e1ceo, y sin olor fuerte. Truco econ\u00f3mico: compra el pollo entero y pide que lo corten. Cuesta hasta 40% menos que las pechugas empaquetadas.' },
    { icon: '\uD83D\uDC1F', titulo: 'Pescado: C\u00f3mo Saber si Est\u00e1 Fresco', keywords: ['pescado','salm\u00f3n','at\u00fan','sardina'], texto: 'El pescado fresco NO huele a pescado, huele a mar. Ojos transparentes y agallas rojas. Para at\u00fan enlatado, elige "en agua" no "en aceite" para mejor calidad nutricional.' },
    { icon: '\uD83C\uDF3F', titulo: 'Hierbas y Espinaca: Conservaci\u00f3n', keywords: ['apio','espinaca','hierbas'], texto: 'No laves las hierbas hasta el momento de usarlas. Envuélvelas en papel de cocina h\u00famedo dentro de una bolsa cerrada en la nevera. La espinaca debe ser verde brillante sin manchas amarillas.' },
    { icon: '\uD83E\uDDC2', titulo: 'Queso Blanco: Calidad y Duraci\u00f3n', keywords: ['queso'], texto: 'El queso blanco fresco tiene olor l\u00e1cteo suave y textura firme. Si huele agrio o tiene manchas de color, deséchalo. Para que dure m\u00e1s: guárdalo en recipiente con agua salada en la nevera.' },
    { icon: '\uD83C\uDF4A', titulo: 'C\u00edtricos Jugosos: C\u00f3mo Elegirlos', keywords: ['lim\u00f3n','naranja','limon'], texto: 'Un cítrico jugoso es pesado para su tama\u00f1o y con piel fina. Si puedes doblarlo ligeramente sin que cruja, tiene mucho jugo. A temperatura ambiente si los usas pronto, en nevera si durar\u00e1n m\u00e1s.' },
    { icon: '\uD83E\uDED8', titulo: 'Jengibre: Compra y Conservaci\u00f3n', keywords: ['jengibre'], texto: 'Elige ra\u00edces firmes y con piel tensa sin arrugas. Para conservar: mete el jengibre sin pelar en bolsa zip en el congelador. Se r\u00e1lla directamente congelado y dura meses.' },
    { icon: '\uD83C\uDF4D', titulo: 'Pi\u00f1a Madura: El Truco del Tallo', keywords: ['pi\u00f1a'], texto: 'Jala una hoja del centro: si sale f\u00e1cilmente, est\u00e1 madura. Huele la base; debe oler dulce. Evita las que huelen a vinagre, ya fermentaron.' },
    { icon: '\uD83C\uDF52', titulo: 'Frutos Rojos y Ar\u00e1ndanos', keywords: ['ar\u00e1ndano','fresa','arandano'], texto: 'No los laves hasta el momento de comer, el agua acelera su deterioro. Los congelados tienen el mismo valor nutricional y son m\u00e1s econ\u00f3micos. Perfectos para batidos y jugos.' },
    { icon: '\uD83E\uDD69', titulo: 'Carne Roja: Gu\u00eda de Calidad', keywords: ['carne','res','lomo'], texto: 'La carne fresca debe ser rojo brillante, no marr\u00f3n. El color marr\u00f3n indica oxidaci\u00f3n superficial (puede ser normal), pero si huele mal, deséchala. Congela lo que no uses en 48 horas.' },
    { icon: '\uD83E\uDED9', titulo: 'Legumbres: Compra al Mayor', keywords: ['lentejas','caraotas','frijol','grano'], texto: 'Son la proteína m\u00e1s econ\u00f3mica. Compra en sacos de 2kg en mercados populares: hasta 60% m\u00e1s barato que en supermercados. Cocina en grandes cantidades y congela en porciones.' },
    { icon: '\uD83C\uDF3D', titulo: 'Avena: Elige la Correcta', keywords: ['avena'], texto: 'Elige avena en hojuelas tradicional (no instant\u00e1nea ni saborizada). La instant\u00e1nea suele tener az\u00facares. La hojuela tradicional es m\u00e1s saciante y hasta 50% m\u00e1s econ\u00f3mica por gramo.' },
    { icon: '\uD83E\uDEDA', titulo: 'Yuca y Ra\u00edces Tropicales', keywords: ['yuca','batata','ñame'], texto: 'La yuca buena tiene piel oscura y firme. Por dentro debe ser blanca sin venas negras. Pela, corta y congela lo que no uses en 3 d\u00edas para evitar que se eche a perder.' },
    { icon: '\uD83E\uDEB4', titulo: 'Nueces y Man\u00ed: C\u00f3mo Conservarlos', keywords: ['nueces','man\u00ed','almendras','maní'], texto: 'Las nueces se enrancian con el calor. Gu\u00e1rdalas en frasco de vidrio en la nevera o congelador. Man\u00ed tostado sin sal en bolsa es 3 veces m\u00e1s econ\u00f3mico que las presentaciones individuales.' },
    { icon: '\uD83E\uDD6A', titulo: 'Pan Integral vs. Pan Blanco', keywords: ['pan','masa madre','integral'], texto: 'El pan de masa madre o 100% integral tiene fibra real. Leer la etiqueta: si dice "harina enriquecida" o "harina refinada" como primer ingrediente, es pan blanco disfrazado de integral.' }
  ],



  jugos: {
    energia: { costo: 'bajo', nombre:'Energ\u00eda Total', compras: '1 Pi\u00f1a, 1 Manojo de Apio Espa\u00f1a, 1 Ra\u00edz de Jengibre fresco',
      ingredientes:'1 Taza de Pi\u00f1a + 2 Ramas de Apio + 1 trocito de Jengibre',
      beneficio:'Te dar\u00e1 mucha energ\u00eda para jugar y trabajar, y ayuda a que no te duela la barriga.',
      preparacion:'1. Corta la pi\u00f1a en cuadros peque\u00f1os y el apio en trozos.<br>2. Pon todo en la licuadora.<br>3. Agr\u00e9gale 1 vaso de agua.<br>4. Lic\u00faa muy bien y b\u00e9belo todo sin colar, \u00a1la pulpita es buena!',
      agua_extra:'Toma 1 vaso de agua normal antes de hacer el jugo.',
      alternativas: [
        { sin: 'Pi\u00f1a', usa: 'Mango maduro o Naranja (1 grande)', porque: 'Tienen vitamina C y enzimas digestivas similares. El mango da energ\u00eda r\u00e1pida y el naranja activa el sistema nervioso.' },
        { sin: 'Apio', usa: 'Pepino (1/2) o Espinaca (un pu\u00f1ado)', porque: 'El pepino hidrata igual y el limpia por dentro. La espinaca aporta clorofila que oxigena la sangre.' },
        { sin: 'Jengibre', usa: 'Canela en polvo (1 pizca) o Lim\u00f3n (1/4)', porque: 'La canela tiene efecto antiinflamatorio y activa la circulaci\u00f3n. El lim\u00f3n tiene efectos alcalinizantes similares.' }
      ]
    },
    intelecto_alto: { costo: 'alto', nombre:'Cerebro Brillante (Premium)', compras: '1 Caja de Ar\u00e1ndanos frescos o congelados, 2 Remolachas, 1 Paquete de Nueces',
      ingredientes:'1/2 Taza de Ar\u00e1ndanos + 1/2 Remolacha + 5 Nueces',
      beneficio:'Hace que tu cerebro piense m\u00e1s r\u00e1pido y te ayuda a recordar todo.',
      preparacion:'1. Pela la remolacha y c\u00f3rtala chiquita.<br>2. Ponla en la licuadora con los ar\u00e1ndanos y las nueces.<br>3. Agrega 1 vaso grande de agua y lic\u00faa.<br>4. T\u00f3malo despacio, masticando un poquito.',
      agua_extra:'Bebe 2 vasos de agua durante la ma\u00f1ana.',
      alternativas: [
        { sin: 'Ar\u00e1ndanos', usa: 'Uvas moradas (1 pu\u00f1ado) o Fresas (5-6 uds)', porque: 'Contienen antocianinas (los pigmentos morados/rojos) que protegen el cerebro igual que los ar\u00e1ndanos. Mucho m\u00e1s f\u00e1ciles de conseguir.' },
        { sin: 'Remolacha', usa: 'Zanahoria (1 mediana) o Espinaca (pu\u00f1ado) + 1 pizca de C\u00farcuma', porque: 'La zanahoria tiene betacarotenos que el cerebro convierte en vitamina A neuroprotectora. La espinaca + c\u00farcuma tiene efecto antiinflamatorio cerebral muy potente.' },
        { sin: 'Nueces', usa: 'Man\u00ed sin sal (1 cucharada) o Semillas de girasol (1 cucharada)', porque: 'El man\u00ed tiene vitamina E y grasas saludables que protegen las membranas de las neuronas. Es 5 veces m\u00e1s barato que las nueces.' }
      ]
    },
    intelecto_bajo: { costo: 'bajo', nombre:'Cerebro Brillante (Econ\u00f3mico)', compras: '3 Cambures/Pl\u00e1tanos dulces, Avena en hojuelas, 1 Paquete peque\u00f1o de Cacao en polvo',
      ingredientes:'1 Pl\u00e1tano (Cambur) + 1 Cucharada de Avena + 1 Pizca de Cacao/Chocolate',
      beneficio:'Le da gasolina a tu cerebro para que no te canses pensando.',
      preparacion:'1. Pela el pl\u00e1tano y p\u00e1rtelo a la mitad.<br>2. Ponlo en la licuadora con la avena y el polvito de chocolate.<br>3. Agrega 1 vaso de agua.<br>4. Lic\u00faa hasta que quede suavecito y b\u00e9belo.',
      agua_extra:'Bebe 2 vasos de agua durante la ma\u00f1ana.',
      alternativas: [
        { sin: 'Pl\u00e1tano/Cambur', usa: 'Mango (1/2) o Papa cocida fr\u00eda (1 peque\u00f1a)', porque: 'El mango tiene az\u00facares naturales de liberaci\u00f3n media para el cerebro. La papa cocida y enfriada genera almidon resistente que alimenta las bacterias buenas del intestino, que a su vez producen serotonina (tu hormona del \u00e1nimo).' },
        { sin: 'Cacao', usa: 'Canela en polvo (1 pizca) o Caf\u00e9 negro (1 cucharadita)', porque: 'La canela mejora la sensibilidad a la insulina (el cerebro es muy dependiente del az\u00facar). El caf\u00e9 contiene antioxidantes neuroprotectores y aumenta el enfoque a corto plazo.' }
      ]
    },
    fuerza: { costo: 'bajo', nombre:'Fuerza de Superh\u00e9roe', compras: '3 Remolachas peque\u00f1as, 2 Zanahorias, 1 Frasco peque\u00f1o de Miel pura',
      ingredientes:'1 Remolacha peque\u00f1a + 1/2 Zanahoria + 1 Cucharada de Miel',
      beneficio:'Hace que tus m\u00fasculos se llenen de aire y sangre buena para que tengas m\u00e1s fuerza.',
      preparacion:'1. Pela la remolacha y la zanahoria.<br>2. C\u00f3rtalas como si fueran dados de jugar.<br>3. Lic\u00faalas con 1 vaso de agua.<br>4. Al final, \u00e9chale la miel, revuelve con una cuchara y t\u00f3malo.',
      agua_extra:'Toma mucho agua antes de hacer ejercicio.',
      alternativas: [
        { sin: 'Remolacha', usa: 'Zanahoria extra (1 m\u00e1s) + Espinaca (pu\u00f1ado)', porque: 'La zanahoria y espinaca juntas aportan nitratos naturales similares a la remolacha que mejoran el flujo de sangre a los m\u00fasculos durante el ejercicio.' },
        { sin: 'Miel', usa: 'Pl\u00e1tano maduro (1/2) o Papel\u00f3n/Panela (1 pizca disuelta)', porque: 'El pl\u00e1tano maduro tiene az\u00facar de frutas de absorci\u00f3n m\u00e1s lenta que da energ\u00eda sostenida. El papel\u00f3n es az\u00facar sin refinar con minerales extra.' }
      ]
    },
    rendimiento: { costo: 'bajo', nombre:'Bater\u00eda Infinita', compras: '1 Malla de Naranjas para jugo, 2 Zanahorias, 1 Frasco de C\u00farcuma en polvo',
      ingredientes:'El jugo de 1 Naranja + 1/2 Zanahoria + Un polvito amarillo (C\u00farcuma)',
      beneficio:'Hace que tu cuerpo no se oxide y te recuperes s\u00faper r\u00e1pido.',
      preparacion:'1. Exprime la naranja en un vaso (sin semillas).<br>2. Echa ese jugo en la licuadora con la zanahoria picada y una puntita del polvito de c\u00farcuma.<br>3. Lic\u00faa todo y t\u00f3matelo fresquito.',
      agua_extra:'Recuerda tomar al menos 8 vasos de agua en todo el d\u00eda.',
      alternativas: [
        { sin: 'Naranja', usa: 'Lim\u00f3n (2 uds) + 1 cucharadita de az\u00facar o miel', porque: 'El lim\u00f3n tiene vitamina C a\u00fan mayor que la naranja y activa las enzimas digestivas que aceleran la recuperaci\u00f3n muscular.' },
        { sin: 'Zanahoria', usa: 'Pl\u00e1tano (1/2) o Batata/Camote cocida (2 cucharadas)', porque: 'Tienen betacarotenos similares y aportan carbohidratos complejos que recargan el gl\u00f3geno muscular despu\u00e9s del ejercicio.' },
        { sin: 'C\u00farcuma', usa: 'Jengibre fresco (trocito) o Pimienta negra molida (1 pizca)', porque: 'El jengibre tiene curcuminoides similares con efecto antiinflamatorio. La pimienta negra activa los antioxidantes del cuerpo y de paso mejora la absorci\u00f3n de cualquier nutriente que tomes.' }
      ]
    },
    salud: { costo: 'bajo', nombre:'Escudo Protector', compras: '4 Limones, 1 Manojo de Apio Espa\u00f1a, 2 Pepinos',
      ingredientes:'1 Lim\u00f3n entero (sin pepitas) + 2 Ramas de Apio + 1/2 Pepino',
      beneficio:'Limpia todo tu cuerpo por dentro y crea un escudo para que no te enfermes.',
      preparacion:'1. Pela el lim\u00f3n quit\u00e1ndole las semillas verdes.<br>2. Corta el pepino con todo y su piel verde.<br>3. Pon el lim\u00f3n, pepino y apio en la licuadora con 1 vaso y medio de agua.<br>4. Lic\u00faa y b\u00e9belo como agua fresca.',
      agua_extra:'Apenas te despiertes, toma medio vasito de agua.',
      alternativas: [
        { sin: 'Lim\u00f3n', usa: 'Naranja (1/2) o Mandarina (1)', porque: 'Cualquier c\u00edtrico aporta vitamina C que activa el sistema inmune. La naranja tiene flavonoides que mejoran la absorci\u00f3n del hierro de los vegetales.' },
        { sin: 'Apio', usa: 'Perejil (un pu\u00f1ado) o Cilantro (un pu\u00f1ado)', porque: 'El perejil y el cilantro son igualmente depurativos, ricos en clorofila y con efectos antiinflamatorios. El cilantro incluso ayuda a eliminar metales pesados del cuerpo.' },
        { sin: 'Pepino', usa: 'Calabac\u00edn/Zucchini (1/4) o Lechuga (2-3 hojas)', porque: 'Tienen el mismo efecto hidratante y alcalinizante que el pepino. Son perfectos para limpiar el h\u00edgado y los ri\u00f1ones.' }
      ]
    },
    sueno: { costo: 'bajo', nombre:'Dulces Sue\u00f1os', compras: '3 Manzanas verdes, Avena en hojuelas, Canela en polvo',
      ingredientes:'1 Manzana verde + 2 Cucharadas de Avena + Un polvito de Canela',
      beneficio:'Apaga tu cuerpo suavemente por dentro para que duermas profundo y descanses de verdad.',
      preparacion:'1. Pon la avena en agua unos 10 minutos para que se ponga blandita.<br>2. Corta la manzana (qu\u00edtale el centro de las semillas).<br>3. Lic\u00faa la avena, la manzana y 1 vaso de agua.<br>4. \u00c9chale el polvito de canela arriba.',
      agua_extra:'No tomes mucha agua antes de dormir para que no vayas al ba\u00f1o en la noche.',
      alternativas: [
        { sin: 'Manzana verde', usa: 'Pl\u00e1tano maduro (1) o Pera (1)', porque: 'El pl\u00e1tano maduro tiene triptofano y potasio que relajan el sistema nervioso y producen melatonina (la hormona del sue\u00f1o) de forma natural.' },
        { sin: 'Avena', usa: 'Leche tibia (1/2 vaso) o Camomila/Manzanilla en t\u00e9 (1 taza)', porque: 'La leche tiene triptofano y calcio que relajanlos m\u00fasculos. La manzanilla tiene apigenina, un sedante natural que reduce la ansiedad sin efecto resaca.' }
      ]
    },
    libido: { costo: 'bajo', nombre:'Coraz\u00f3n y Sangre Fuerte', compras: '1 Patilla/Sand\u00eda grande, 4 Limones',
      ingredientes:'1 Pedazo grande de Patilla (Sand\u00eda) + Jugo de 1 Lim\u00f3n',
      beneficio:'Hace que la sangre viaje por todo tu cuerpo s\u00faper r\u00e1pido, cuidando tus vasos sangu\u00edneos.',
      preparacion:'1. Corta la patilla roja en trozos (\u00a1d\u00e9jale las semillas blancas o negras!).<br>2. Ponla en la licuadora y expr\u00edmele el lim\u00f3n encima.<br>3. No le eches agua, la patilla ya tiene mucha.<br>4. Lic\u00faa y disfruta.',
      agua_extra:'Mantente tomando sorbitos de agua todo el d\u00eda.',
      alternativas: [
        { sin: 'Patilla/Sand\u00eda', usa: 'Remolacha (1/2) + agua (1 vaso)', porque: 'La remolacha tiene nitratos que relajan los vasos sangu\u00edneos igual que la citrulina de la patilla. Mejora la circulaci\u00f3n y reduce la presi\u00f3n arterial.' },
        { sin: 'Lim\u00f3n', usa: 'Naranja (1/2) o vinagre de manzana (1 cucharadita en agua)', porque: 'El \u00e1cido c\u00edtrico de la naranja mejora la absorci\u00f3n de los nutrientes del jugo. El vinagre de manzana tiene propiedades cardiovasculares probadas cient\u00edficamente.' }
      ]
    },
    longevidad: { costo: 'bajo', nombre:'Poci\u00f3n de Juventud', compras: '2 Pepinos, 2 Manzanas verdes, 1 Paquete de Espinaca fresca, Limones',
      ingredientes:'1/2 Pepino + 1/2 Manzana verde + 1 Pu\u00f1ito de hojas de Espinaca + Lim\u00f3n',
      beneficio:'Pinta tu cuerpo de verde por dentro, manteni\u00e9ndote joven y reparando tus c\u00e9lulas.',
      preparacion:'1. Lava muy muy bien las hojas de espinaca.<br>2. Corta el pepino y la manzana.<br>3. Mete todo a la licuadora con el jugo de medio lim\u00f3n y 1 vaso grande de agua fr\u00eda.<br>4. Lic\u00faa y b\u00e9belo despacito.',
      agua_extra:'Toma este jugo en la ma\u00f1ana y durante el d\u00eda bebe mucha agua.',
      alternativas: [
        { sin: 'Espinaca', usa: 'Repollo/Col verde (2 hojas) o Acelga (2 hojas) o Cilantro (pu\u00f1ado)', porque: 'Cualquier hoja verde oscura tiene clorofila que oxigena la sangre y elimina toxinas. El repollo adem\u00e1s tiene compuestos anticancer\u00edgenos (sulforafano) \u00fanicos.' },
        { sin: 'Pepino', usa: 'Apio (2 ramas) o Calabac\u00edn (1/4)', porque: 'El apio tiene los mismos minerales alcalinizantes y propiedades depurativas. Tambi\u00e9n tiene fthalidas que reducen la presi\u00f3n arterial.' },
        { sin: 'Manzana verde', usa: 'Pera (1/2) o Guayaba (1)', porque: 'La guayaba tiene m\u00e1s vitamina C que la naranja y tiene licopeno antioxidante. La pera tiene fibra soluble que alimenta el microbioma intestinal.' }
      ]
    },
  },


  // ── Detector de Plan por Edad y Condición ─────────────────────────────────
  detectarPlanEjercicio(u) {
    const edad = parseInt(u.edad) || 25;
    const imc = u.imc || 0;
    const sobrepeso = imc >= 30 || (u.peso && u.talla && (u.peso / ((u.talla/100)**2)) >= 30);
    const enfermedades = u.enfermedades || [];
    const tieneCondicion = enfermedades.some(e => ['artritis','osteoporosis','cardiaco','diabetes'].includes(e));

    if (edad <= 12)  return 'nino';
    if (edad <= 17)  return 'adolescente';
    if (edad >= 60 && (sobrepeso || tieneCondicion)) return 'adulto_mayor_fragil';
    if (edad >= 60)  return 'adulto_mayor';
    if (sobrepeso && tieneCondicion) return 'sobrepeso_condicion';
    return null; // use objective-based plan
  },

  // ── Ejercicio Experto por Objetivo y Modalidad ─
  ejercicios: {

    // ─── NIÑOS (≤ 12 años) ────────────────────────────────────────────────────
    nino: {
      trainer: '🌟 <strong>Movimiento Libre y Divertido:</strong> A tu edad, el mejor ejercicio es aquel que no parece ejercicio. Jugar, correr, saltar y explorar son las actividades que hacen que tus huesos crezcan fuertes, tu corazón lata sano y tu cerebro se desarrolle al máximo. ¡El objetivo es que te diviertas!',
      casa: [
        {
          dia: 'Día 1: ¡A Saltar y Moverse! 🎉',
          calentamiento: 'Baila 5 minutos con tu música favorita. ¡Sin parar!',
          rutina: [
            '1. <strong>Saltar la cuerda:</strong> 3 tandas de 2 minutos. Descansa 1 minuto entre cada tanda. Si no tienes cuerda, salta en el mismo lugar.',
            '2. <strong>Carrera de estrella:</strong> Toca 4 paredes de tu cuarto o jardín lo más rápido que puedas, 5 veces seguidas.',
            '3. <strong>Lagartijas en la pared:</strong> Apoya las manos en la pared y empuja 15 veces. ¡Fácil y divertido!',
            '4. <strong>Sentadillas de rana:</strong> Pon las manos en la cabeza y baja como una ranita, 15 veces. ¡Riii-bbit!'
          ]
        },
        {
          dia: 'Día 2: Juegos de Equilibrio y Habilidad 🧗',
          calentamiento: 'Camina en puntitas de pie por toda la casa durante 2 minutos.',
          rutina: [
            '1. <strong>El flamenco:</strong> Para en un pie por 30 segundos, cambia de pie. Repite 3 veces. ¡Reta a un familiar!',
            '2. <strong>El túnel:</strong> Pasa por debajo de una silla de lado a lado, 10 veces seguidas.',
            '3. <strong>Abdominales de bicicleta:</strong> Acostado, pedalea en el aire por 2 minutos. Imagina que vas a la escuela en bicicleta.',
            '4. <strong>El puente:</strong> Acuéstate boca arriba, dobla las rodillas y levanta las nalgas todo lo que puedas. Sostén 10 segundos, baja. 10 veces.'
          ]
        },
        {
          dia: 'Día 3: Descanso Activo 🌳',
          calentamiento: 'Estira los brazos y las piernas suavemente.',
          rutina: [
            '¡Hoy es día de juego libre! Ve al parque o al patio. Juega pelota, escondite, o cualquier juego que te guste. El objetivo es estar activo por al menos 30 minutos sin sentarte.',
            '💧 No olvides tomar agua cada vez que tengas sed.'
          ]
        }
      ],
      gym: [
        {
          dia: 'Nota Importante para Niños',
          calentamiento: 'Siempre con un adulto supervisando.',
          rutina: [
            '⚠️ <strong>Los niños menores de 13 años NO deben usar pesas ni máquinas de gimnasio.</strong> El entrenamiento de fuerza con cargas puede afectar el desarrollo de los huesos que todavía están creciendo.',
            'Lo mejor para tu edad son las actividades al aire libre: natación, artes marciales, fútbol, basket, baile, o gimnasia. Habla con un entrenador certificado en deportes infantiles si quieres hacer deporte de competencia.'
          ]
        }
      ],
      funcional: [
        {
          dia: 'Circuito Divertido (Todos los días) ⚡',
          calentamiento: '10 saltos de estrella (Jumping Jacks).',
          rutina: [
            '1. <strong>Carrera de relevos imaginaria:</strong> Corre de un extremo al otro de la sala 10 veces.',
            '2. <strong>Animal walk:</strong> Camina como oso (en cuatro patas, con rodillas rectas) por 2 minutos. Luego como cangrejo (boca arriba) por 1 minuto.',
            '3. <strong>Burpee de niño:</strong> Párate, toca el suelo con las manos, da un saltito pequeño, y vuelve a pararte. 10 veces.',
            '4. <strong>Saltos de rana:</strong> En cuclillas, salta hacia adelante lo más lejos posible. 8 saltos.'
          ]
        }
      ]
    },

    // ─── ADOLESCENTES (13–17 años) ────────────────────────────────────────────
    adolescente: {
      trainer: '🔥 <strong>Tu Cuerpo Está en su Momento de Mayor Potencial:</strong> Entre los 13 y 17 años, tu cuerpo crece y se forma. No necesitas pesas pesadas — tu propio peso corporal es la herramienta más poderosa que existe. Estos ejercicios desarrollarán tu coordinación, fuerza base, resistencia cardíaca y postura, que son los fundamentos de cualquier atleta de élite.',
      casa: [
        {
          dia: 'Día 1: Fuerza Superior + Core 💪',
          calentamiento: '2 min de saltar en el lugar + rotaciones de hombros.',
          rutina: [
            '1. <strong>Flexiones progresivas:</strong> 3 series de 10-15 reps. Si es fácil, eleva los pies en una silla. Si es difícil, hazlas con rodillas en el suelo.',
            '2. <strong>Remos con mochila:</strong> Carga una mochila con libros, inclínate 45° y jálala hacia tu pecho. 3 series × 12 reps por brazo.',
            '3. <strong>Plancha:</strong> 3 series de 30-45 segundos. Cuerpo recto como tabla, no dejes caer las caderas.',
            '4. <strong>Abdominales cruzados:</strong> 3 series × 15 reps. Codo derecho al rodilla izquierda y viceversa.'
          ]
        },
        {
          dia: 'Día 2: Piernas, Saltos y Cardio 🏃',
          calentamiento: '5 minutos de trote suave en el lugar.',
          rutina: [
            '1. <strong>Sentadillas clásicas:</strong> 4 series × 15 reps. Rodillas hacia afuera, espalda recta, como sentarte en una silla invisible.',
            '2. <strong>Zancadas alternas (Lunges):</strong> 3 series × 10 reps por pierna. Paso largo hacia adelante, rodilla trasera casi toca el suelo.',
            '3. <strong>Saltos explosivos:</strong> 3 series × 12 saltos. Salta lo más alto que puedas y aterriza suavemente.',
            '4. <strong>Puente de glúteos:</strong> 3 series × 20 reps. Aumenta la dificultad levantando una pierna en el aire.'
          ]
        },
        {
          dia: 'Día 3: Movilidad y Postura 🧘',
          calentamiento: 'Respiración profunda: 5 inhalaciones lentas.',
          rutina: [
            '1. <strong>Estiramiento de pecho:</strong> Abre los brazos como cruz, sostén 30 seg. Esto corrige la postura de quienes usan mucho el celular.',
            '2. <strong>Yoga del gato-vaca:</strong> En cuatro patas, arquea y redondea la espalda lentamente × 15 veces.',
            '3. <strong>Estiramiento de isquiotibiales:</strong> Sentado en el suelo, piernas rectas, toca las puntas de los pies. Sostén 30 seg.',
            '4. <strong>Cuello y cervicales:</strong> Baja la barbilla al pecho, gira suave a derecha e izquierda × 5 veces. SIN girar bruscamente.'
          ]
        }
      ],
      gym: [
        {
          dia: 'Principios para Adolescentes en Gimnasio',
          calentamiento: '10 min en caminadora o bicicleta estática a ritmo moderado.',
          rutina: [
            '⚠️ <strong>Regla de oro:</strong> Antes de los 18, prioriza la técnica perfecta sobre el peso. Pesa liviano, muévete correctamente.',
            '1. <strong>Prensa de piernas (Leg Press):</strong> 3 series × 15 reps, peso moderado. Mejor que la sentadilla con barra para espalda en desarrollo.',
            '2. <strong>Jalón al pecho (Lat Pulldown):</strong> 3 × 12 reps. Construye la espalda en V sin comprimir vértebras.',
            '3. <strong>Pecho en máquina (Chest Press):</strong> 3 × 12 reps. Más seguro que press de banca con barra libre.',
            '4. <strong>Abdominales en polea:</strong> 3 × 15 reps. Siempre termina con core.'
          ]
        }
      ],
      funcional: [
        {
          dia: 'HIIT Adolescente (20 minutos) ⚡',
          calentamiento: '2 min de saltar cuerda o en el lugar.',
          rutina: [
            '🔁 Circuito de 4 rondas × 30 seg trabajo / 15 seg descanso:',
            '1. <strong>Burpees:</strong> El ejercicio completo — cuerpo abajo, plancha, empuje, salto. Rey de los ejercicios funcionales.',
            '2. <strong>Mountain Climbers:</strong> En posición de plancha, lleva rodillas al pecho alternando rápido.',
            '3. <strong>Sentadillas con salto:</strong> Baja en sentadilla y salta al subir. Aterriza suave.',
            '4. <strong>Plancha lateral:</strong> 15 segundos cada lado. Cuerpo recto de cabeza a pies.'
          ]
        }
      ]
    },

    // ─── ADULTOS MAYORES (60+) ────────────────────────────────────────────────
    adulto_mayor: {
      trainer: '🌿 <strong>Movimiento Inteligente para la Longevidad:</strong> A partir de los 60, el ejercicio no es para verte mejor — es para vivir mejor más tiempo. Los estudios demuestran que mantenerse activo reduce el riesgo de Alzheimer un 35%, previene caídas, mantiene los huesos densos y el corazón eficiente. Lo que necesitas es: movimiento suave, constante y con buen descanso.',
      casa: [
        {
          dia: 'Día 1: Fortaleza y Equilibrio 🦿',
          calentamiento: 'Sentado en una silla: rotar tobillos, muñecas, hombros × 30 seg cada uno.',
          rutina: [
            '1. <strong>Sentadillas con silla (Chair Squats):</strong> Párate y siéntate de una silla 10 veces LENTO. No uses las manos. Fortalece cuádriceps y previene caídas.',
            '2. <strong>Elevación de talones (de pie):</strong> Apóyate en una pared y sube en puntitas 15 veces. Fortalece pantorrillas y mejora circulación.',
            '3. <strong>Extensión de rodilla sentado:</strong> Sentado, estira una pierna y sostén 5 segundos. 10 veces cada pierna.',
            '4. <strong>El flamenco seguro:</strong> Apoyado en una silla, párense en un pie por 15 segundos. Cambia. 3 veces cada pie.'
          ]
        },
        {
          dia: 'Día 2: Cardio Suave y Respiración 🚶',
          calentamiento: 'Respiraciones profundas lentas × 5 veces.',
          rutina: [
            '1. <strong>Caminata activa:</strong> 20-30 minutos a paso moderado (puedes hablar pero te falta un poco el aire). Lo más beneficioso que existe para tu edad.',
            '2. <strong>Marcha en el lugar:</strong> Levanta rodillas alternando durante 3 minutos. Agarra el respaldar de una silla si necesitas apoyo.',
            '3. <strong>Movimiento de brazos:</strong> De pie o sentado, mueve los brazos en círculos grandes × 20 veces hacia adelante y atrás.',
            '4. <strong>Estiramientos de cuello:</strong> Inclina suavemente la cabeza hacia cada hombro, sostén 15 segundos. SIN forzar.'
          ]
        },
        {
          dia: 'Día 3: Flexibilidad y Relajación 🧘',
          calentamiento: 'Toma un vaso de agua tibia.',
          rutina: [
            '1. <strong>Yoga de silla:</strong> Sentado al borde, inclínate hacia adelante con la espalda recta hasta sentir el estiramiento en la parte trasera de las piernas. Sostén 30 seg.',
            '2. <strong>Rotación de columna:</strong> Sentado, gira el torso hacia la derecha suavemente, sostén 15 seg. Luego izquierda.',
            '3. <strong>Estiramiento de hombros:</strong> Lleva un brazo cruzado al pecho, usa el otro para presionar suavemente. 20 seg por lado.',
            '4. <strong>Respiración de cierre:</strong> 5 respiraciones profundas — inhala 4 segundos, sostén 2, exhala 6. Reduce el cortisol y mejora el sueño.'
          ]
        }
      ],
      gym: [
        {
          dia: 'Rutina Segura en Gimnasio (60+)',
          calentamiento: '10 min en bicicleta estática a ritmo conversacional (nivel 2-3).',
          rutina: [
            '⚠️ <strong>Siempre avisa a un instructor antes de comenzar y monitorea tu frecuencia cardíaca.</strong>',
            '1. <strong>Leg Press (Prensa):</strong> 3 series × 12 reps, peso liviano. Mucho más seguro que la sentadilla libre a esta edad.',
            '2. <strong>Remo en máquina (Cable Row):</strong> 3 × 12 reps. Fortalece la espalda superior que tiende a encorvarse.',
            '3. <strong>Extensión de pierna:</strong> 2 × 15 reps por pierna. Fortalece rodillas sin impacto.',
            '4. <strong>Estiramiento final:</strong> 10 minutos de stretching guiado. Es tan importante como el ejercicio mismo.'
          ]
        }
      ],
      funcional: [
        {
          dia: 'Tai Chi y Actividad Suave Diaria 🌅',
          calentamiento: 'Masaje suave de manos y pies × 2 minutos.',
          rutina: [
            '1. <strong>Tai Chi básico:</strong> Movimientos lentos y fluidos de brazos. Busca "Tai Chi para principiantes" en YouTube. 15 minutos. Mejora equilibrio, reduce caídas y es meditativo.',
            '2. <strong>Natación o hidrogimnasia:</strong> Si tienes acceso a piscina, el agua elimina el impacto en articulaciones. 30 minutos, 3 veces por semana es ideal.',
            '3. <strong>Jardinería activa:</strong> Agacharte, cargar macetas y caminar activan más músculos de los que crees. ¡Cuenta como ejercicio funcional real!',
            '4. <strong>Baile lento:</strong> Salsa, vals o cualquier ritmo que te guste. El baile mejora el equilibrio, la memoria y el estado de ánimo simultáneamente.'
          ]
        }
      ]
    },

    // ─── ADULTOS MAYORES FRÁGILES / CON CONDICIÓN (60+ sobrepeso/enf.) ────────
    adulto_mayor_fragil: {
      trainer: '🫶 <strong>Movimiento Terapéutico y Seguro:</strong> Tu cuerpo merece movimiento adaptado a su condición actual. No hay que forzar nada — el objetivo es activar la circulación, mantener la movilidad articular y fortalecer los músculos que te permiten vivir de forma independiente. Consulta siempre a tu médico antes de comenzar.',
      casa: [
        {
          dia: 'Día 1: Ejercicios Sentado (Sin Impacto) 🪑',
          calentamiento: 'Masaje suave de rodillas con las manos × 1 minuto cada una.',
          rutina: [
            '1. <strong>Marcha sentada:</strong> Sentado en una silla firme, levanta una rodilla y luego la otra como si marcharas. 3 minutos continuo.',
            '2. <strong>Extensiones de pierna (sentado):</strong> Estira una pierna y baja lento. 10 reps por pierna. Fortalece cuádriceps sin impacto.',
            '3. <strong>Apretar almohada entre rodillas:</strong> Sentado, pon una almohada entre las rodillas y aprieta 5 segundos. Suelta. 10 reps. Activa músculos internos del muslo.',
            '4. <strong>Apertura de brazos:</strong> Sentado, abre los brazos en cruz y llévalos al frente. 15 veces. Activa circulación del tren superior.'
          ]
        },
        {
          dia: 'Día 2: Caminata Terapéutica 🌳',
          calentamiento: 'Toma agua y estira suavemente tobillos.',
          rutina: [
            '1. <strong>Caminata de 15-20 minutos:</strong> A paso cómodo, sin apresurarse. Si hay posibilidad, hazlo en superficies planas. Usa calzado con soporte.',
            '2. <strong>Paradas de equilibrio:</strong> Cada 5 minutos de caminata, detente y párate en un pie apoyado en una pared × 10 segundos. Previene caídas.',
            '3. <strong>Respiración consciente al caminar:</strong> Inhala durante 3 pasos, exhala durante 3 pasos. Mantiene el ritmo cardíaco estable.',
            '⚠️ Si sientes mareo, dolor en el pecho o dificultad para respirar, DETENTE y descansa. Consulta a tu médico.'
          ]
        },
        {
          dia: 'Día 3: Movilidad Articular 🔄',
          calentamiento: 'Acostado boca arriba, respira profundo 3 veces.',
          rutina: [
            '1. <strong>Rotación de tobillos:</strong> Acostado, rota cada tobillo × 10 veces en cada dirección. Previene el riesgo de trombosis.',
            '2. <strong>Rodillas al pecho (suave):</strong> Acostado, jala suavemente una rodilla hacia el pecho, sostén 15 seg. Alivia la tensión lumbar.',
            '3. <strong>Estiramiento de caderas:</strong> Sentado, cruza un tobillo sobre la rodilla contraria. Inclínate suavemente hacia adelante. 20 seg por lado.',
            '4. <strong>Relajación progresiva:</strong> Tensa cada músculo del cuerpo por 3 segundos y suéltalo, de pies a cabeza. Reduce la tensión y mejora el sueño.'
          ]
        }
      ],
      gym: [
        {
          dia: 'Recomendaciones para Adultos Mayores con Condición',
          calentamiento: 'Consultar siempre con el médico antes.',
          rutina: [
            '⚠️ <strong>Con condiciones como artritis, osteoporosis, problemas cardíacos o sobrepeso significativo, el gimnasio solo es recomendable con supervisión médica o de un fisioterapeuta.</strong>',
            '✅ Opciones seguras: Hidroterapia (ejercicio en agua caliente), bicicleta estática reclinada (no vertical), bandas elásticas de resistencia mínima.',
            'Evita: máquinas de impacto, pesas libres sin supervisión, ejercicios que requieran equilibrio sin apoyo.'
          ]
        }
      ],
      funcional: [
        {
          dia: 'Rutina Funcional Adaptada (Diaria)',
          calentamiento: 'Un vaso de agua tibia al despertar.',
          rutina: [
            '1. <strong>Levantarse de la cama correctamente:</strong> Gira al costado primero, luego baja los pies y empuja con los brazos. Esto en sí fortalece el cuerpo y protege la espalda cada día.',
            '2. <strong>Actividades de la vida diaria como ejercicio:</strong> Doblar ropa, preparar comida de pie, regar plantas. Toda actividad física cuenta.',
            '3. <strong>Estiramientos de mañana (5 min):</strong> Sentado al borde de la cama, estira cada parte del cuerpo antes de pararte. Previene mareos y lesiones.',
            '4. <strong>Contacto social activo:</strong> Pasear con un familiar o amigo. La combinación de movimiento + conexión social tiene beneficios neurológicos comprobados contra la demencia.'
          ]
        }
      ]
    },

    // ─── ADULTOS CON SOBREPESO Y CONDICIÓN MÉDICA ─────────────────────────────
    sobrepeso_condicion: {
      trainer: '💚 <strong>Empezar con Inteligencia:</strong> Si tienes sobrepeso y una condición médica, el ejercicio es la medicina más poderosa que existe — pero debe adaptarse a ti, no al revés. El objetivo inicial no es perder peso rápido sino activar el metabolismo de forma segura, fortalecer las articulaciones que sostienen el peso extra y crear un hábito sostenible.',
      casa: [
        {
          dia: 'Día 1: Cardio de Bajo Impacto 💧',
          calentamiento: 'Caminar por la habitación 3 minutos, lento.',
          rutina: [
            '1. <strong>Marcha en el lugar:</strong> Levanta rodillas alternando durante 5 minutos sin parar. No corras, no saltes. Solo marcha continua.',
            '2. <strong>Sentadillas con silla:</strong> Párate desde una silla y siéntate de nuevo × 10 reps. Descansa 1 minuto. 3 series. El apoyo de la silla protege las rodillas.',
            '3. <strong>Flexiones de pared:</strong> Párate a 60 cm de una pared, apoya las manos y empuja. 15 reps × 3 series. Sin impacto en muñecas ni hombros.',
            '4. <strong>Elevación de talones sentado:</strong> Sentado, sube y baja los talones × 20 reps. Activa la circulación en piernas sin impacto.'
          ]
        },
        {
          dia: 'Día 2: Descanso o Caminata Suave 🚶',
          calentamiento: 'Respiraciones lentas.',
          rutina: [
            '1. <strong>Caminata plana de 15-20 minutos:</strong> Ritmo cómodo, en terreno plano. Usa calzado con amortiguación.',
            '2. <strong>Hidratación activa:</strong> Toma un vaso de agua cada 30 minutos durante el día. La deshidratación aumenta la fatiga y los antojos.',
            '3. <strong>Estiramiento de piernas sentado:</strong> Sentado, estira una pierna y flexiona el pie. Sostén 15 seg por lado.',
            '⚠️ Con diabetes: revisa tu glucosa antes y después del ejercicio. Con hipertensión: evita sostener la respiración durante esfuerzos.'
          ]
        },
        {
          dia: 'Día 3: Fortalecimiento Suave 💪',
          calentamiento: 'Rotar hombros y muñecas.',
          rutina: [
            '1. <strong>Puente de glúteos:</strong> Acostado boca arriba, dobla rodillas y levanta las caderas. 3 × 12 reps. Fortalece espalda baja y glúteos sin estrés articular.',
            '2. <strong>Presión de brazos con almohada:</strong> Sentado, sujeta una almohada con ambas manos y presiona contra ti mismo × 15 reps. Activa el pecho sin pesos.',
            '3. <strong>Rotación de cintura (sentado):</strong> Siéntate al borde de la silla y gira suavemente el torso de lado a lado × 20 reps. Activa la zona media.',
            '4. <strong>Respiración abdominal:</strong> 5 respiraciones profundas con el diafragma. Reduce el cortisol que acumula grasa abdominal.'
          ]
        }
      ],
      gym: [
        {
          dia: 'Opciones Seguras en Gimnasio con Condición',
          calentamiento: '10 min en bicicleta estática reclinada, nivel bajo.',
          rutina: [
            '✅ <strong>Equipos recomendados:</strong> Bicicleta reclinada (no de pie), elíptica (sin impacto), remo (si no hay problemas de espalda), piscina si está disponible.',
            '1. <strong>Prensa de piernas (Leg Press):</strong> 3 × 12 reps, peso muy liviano. Fortalece piernas sin cargar la columna.',
            '2. <strong>Jalón con polea (Lat Pulldown):</strong> 3 × 12 reps. Fortalece espalda superior y mejora postura.',
            '⚠️ Evitar: Pesas libres pesadas, saltos, máquinas de impacto, ejercicios que requieran soportar el peso corporal completo en posiciones inestables.'
          ]
        }
      ],
      funcional: [
        {
          dia: 'Circuito Adaptado (Sin Impacto) ♻️',
          calentamiento: 'Marcha en el lugar 2 minutos.',
          rutina: [
            '🔁 3 rondas × 40 seg trabajo / 20 seg descanso:',
            '1. <strong>Marcha en el lugar:</strong> Rodillas al frente, brazos activos.',
            '2. <strong>Sentadillas con silla:</strong> Tócala antes de volver a subir.',
            '3. <strong>Flexiones de pared:</strong> Manos a la altura del pecho.',
            '4. <strong>Estiramiento de caderas en silla:</strong> Descansa y estira entre rondas. Tu recuperación es tan importante como el esfuerzo.'
          ]
        }
      ]
    },

    // ─── PLANES POR OBJETIVO (ADULTOS 18-59 SIN CONDICIÓN) ───────────────────
    aumentar_masa: {
      trainer: "💪 <strong>Mentalidad de Culturista Natural:</strong> Para construir músculo real (hipertrofia), la clave NO es sudar, es la <em>Tensión Mecánica</em> y la <em>Sobrecarga Progresiva</em>. Debes acercarte al 'fallo muscular' en cada serie. Descansa 90-120 segundos entre series pesadas. El músculo se rompe entrenando, pero crece durmiendo y comiendo proteína.",
      casa: [
        {
          dia: 'Día 1: Tren Superior (Fuerza de Empuje y Tirón)',
          calentamiento: 'Rotaciones de hombros (1 min) y 30 Jumping Jacks.',
          rutina: [
            '1. <strong>Flexiones Clásicas (Pecho/Hombro):</strong> 4 series al fallo (hasta no poder subir). *Si eres novato, hazlas apoyando rodillas o manos en la pared.',
            '2. <strong>Remos Invertidos (Espalda):</strong> 4 series de 10-12 reps. *Atrapa una sábana en lo alto de una puerta cerrada, inclínate hacia atrás y tira de tu cuerpo.',
            '3. <strong>Fondos en Silla (Tríceps):</strong> 3 series de 10 a 15 reps. Baja lento (3 segundos) y sube explosivo.',
            '4. <strong>Elevaciones Laterales (Hombro):</strong> 3 series de 15 reps. *Usa dos botellas de agua o garrafones.'
          ]
        },
        {
          dia: 'Día 2: Tren Inferior (Piernas y Glúteos)',
          calentamiento: 'Rotaciones de cadera y 20 sentadillas sin peso.',
          rutina: [
            '1. <strong>Sentadillas Búlgaras:</strong> 4 series de 10-12 reps por pierna. *Apoya un pie atrás en una silla. Usa una mochila con libros para añadir peso.',
            '2. <strong>Sentadillas con Salto:</strong> 3 series de 15 reps. Explosividad pura para hipertrofiar fibras rápidas.',
            '3. <strong>Puente de Glúteo a 1 Pierna:</strong> 3 series de 15 reps por pierna.',
            '4. <strong>Elevación de Gemelos:</strong> 4 series al fallo. *Párate en el borde de un escalón.'
          ]
        },
        {
          dia: 'Día 3: Descanso Activo',
          calentamiento: 'Respiración diafragmática.',
          rutina: [
            'Hoy NO se entrena fuerza. Sal a caminar 30 minutos al sol o haz 15 minutos de estiramientos. Deja que las fibras musculares rotas se reconstruyan más grandes y fuertes.'
          ]
        },
        {
          dia: 'Día 4: Cuerpo Completo (Bombeo Metábolico)',
          calentamiento: 'Trote estático ligero por 2 minutos.',
          rutina: [
            '1. <strong>Burpees Completos:</strong> 3 series de 10 a 15 reps.',
            '2. <strong>Zancadas Caminando (Lunges):</strong> 3 series de 20 pasos totales (con mochila pesada).',
            '3. <strong>Flexiones Declinadas:</strong> 3 series al fallo. *Pies subidos en una silla, manos en el piso.',
            '4. <strong>Planchas Abdominales (Core):</strong> 3 series de 45 a 60 segundos.'
          ]
        },
        {
          dia: 'Día 5: Descanso Total',
          calentamiento: 'Recuperación.',
          rutina: ['Día libre de impacto para el sistema nervioso central.']
        }
      ],
      gym: [
        {
          dia: 'Día 1: Push (Pecho, Hombros, Tríceps)',
          calentamiento: 'Movilidad de manguito rotador en polea baja y aproximaciones ligeras.',
          rutina: [
            '1. <strong>Press de Banca (Barra o Mancuernas):</strong> 4 series de 6 a 8 reps (Pesado).',
            '2. <strong>Press Militar Sentado (Hombros):</strong> 3 series de 8 a 10 reps.',
            '3. <strong>Aperturas en Máquina (Pec-Deck) o Poleas:</strong> 3 series de 12 reps. *Aprieta el pecho 1 segundo al juntar las manos.',
            '4. <strong>Extensiones de Tríceps en Polea:</strong> 3 series de 12 a 15 reps.'
          ]
        },
        {
          dia: 'Día 2: Pull (Espalda y Bíceps)',
          calentamiento: 'Colgarse de la barra 30 segundos y 2 series ligeras de jalón al pecho.',
          rutina: [
            '1. <strong>Peso Muerto (Barra) o Remo con Barra:</strong> 4 series de 6 a 8 reps. *Mantén la espalda recta, la fuerza sale de las piernas y cadera.',
            '2. <strong>Jalón al Pecho (Polea Alta):</strong> 3 series de 10 reps. *No tires de los brazos, tira llevando los codos hacia tus costillas.',
            '3. <strong>Remo Gironda (Polea Baja):</strong> 3 series de 12 reps.',
            '4. <strong>Curl de Bíceps Alterno (Mancuernas):</strong> 3 series de 12 reps por brazo.'
          ]
        },
        {
          dia: 'Día 3: Descanso Activo',
          calentamiento: 'Recuperación.',
          rutina: ['Caminata inclinada suave en la cinta (Zona 2) por 30 minutos o estiramiento pasivo.']
        },
        {
          dia: 'Día 4: Piernas (Fuerza y Volumen)',
          calentamiento: 'Bici estática 5 min y movilidad de cadera.',
          rutina: [
            '1. <strong>Sentadilla Libre (Barra) o Prensa de Piernas:</strong> 4 series de 8 a 10 reps.',
            '2. <strong>Hip Thrust (Empuje de Cadera con Barra):</strong> 3 series de 10 a 12 reps.',
            '3. <strong>Extensiones de Cuádriceps en Máquina:</strong> 3 series de 15 reps (Bombeo final).',
            '4. <strong>Curl Femoral Acostado:</strong> 3 series de 12 reps.'
          ]
        },
        {
          dia: 'Día 5: Descanso Total',
          calentamiento: 'Recuperación.',
          rutina: ['Tu sistema nervioso necesita este día para asimilar las cargas pesadas de la semana.']
        }
      ],
      funcional: [
        {
          dia: 'Día 1: Hipertrofia Funcional A',
          calentamiento: 'Estiramientos dinámicos y saltos de cuerda simulada.',
          rutina: [
            '1. <strong>Kettlebell Swings (o con mancuerna pesada):</strong> 4 series de 15 reps. Explosividad de cadera.',
            '2. <strong>Thrusters (Sentadilla profunda + Press de hombro fluido):</strong> 4 series de 12 reps.',
            '3. <strong>Remo en Anillas o TRX:</strong> 3 series al fallo.',
            '4. <strong>Farmer Walks (Paseo de granjero):</strong> Camina 1 minuto cargando tus mancuernas más pesadas, 3 series.'
          ]
        },
        {
          dia: 'Día 2: Descanso Activo',
          calentamiento: 'Movilidad.',
          rutina: ['Yoga suave de 20 minutos.']
        },
        {
          dia: 'Día 3: Hipertrofia Funcional B',
          calentamiento: 'Trote suave 3 min.',
          rutina: [
            '1. <strong>Peso Muerto con Kettlebells o Hex Bar:</strong> 4 series de 10 reps.',
            '2. <strong>Flexiones pliométricas (dando una palmada si es posible):</strong> 3 series de 8 reps.',
            '3. <strong>Desplantes Caminando (Zancadas con peso):</strong> 3 series de 20 pasos.',
            '4. <strong>Golpes con Cuerdas de Batalla (Battle Ropes):</strong> 4 series de 30 segundos intensidad máxima.'
          ]
        }
      ]
    },

    bajar_grasa: {
      trainer: "🔥 <strong>La Ciencia de la Oxidación:</strong> Si quieres verte delgado, el sudor NO es sinónimo de perder grasa. La grasa se oxida y se exhala por los pulmones. Tu cuerpo necesita entrenamiento de FUERZA para no perder masa muscular mientras pierdes peso, y cardio en 'Zona 2' para enseñar al cuerpo a usar grasa como energía.",
      casa: [
        {
          dia: 'Día 1: Circuito HIIT (Cuerpo Completo)',
          calentamiento: 'Movilidad articular y trote estático suave por 3 minutos.',
          rutina: [
            '<em>Realiza cada ejercicio por 40 segundos, descansa 20 segundos. Haz 4 rondas totales.</em>',
            '1. <strong>Jumping Jacks:</strong> (Eleva la frecuencia cardíaca).',
            '2. <strong>Sentadillas de prisionero (Manos en la nuca):</strong> (Gasto calórico alto).',
            '3. <strong>Mountain Climbers (Escaladores en el suelo):</strong> (Ataque al abdomen y cardio).',
            '4. <strong>Burpees sin flexión (Sprawls):</strong> (Máxima quema).'
          ]
        },
        {
          dia: 'Día 2: Tensión Mecánica Casera (Evitar Flacidez)',
          calentamiento: '10 flexiones de rodillas y 15 sentadillas suaves.',
          rutina: [
            '1. <strong>Flexiones (o rodillas al piso):</strong> 4 series al fallo. Construye densidad pectoral.',
            '2. <strong>Sentadillas Búlgaras (Pies en silla):</strong> 3 series de 12 por pierna.',
            '3. <strong>Elevaciones de Pelvis (Suelo):</strong> 4 series de 15 reps, apretando glúteos arriba.',
            '4. <strong>Plancha Abdominal:</strong> 3 series de 1 minuto.'
          ]
        },
        {
          dia: 'Día 3: Zona 2 (Quema Grasa Pura)',
          calentamiento: 'Preparación mental.',
          rutina: [
            'Sal a caminar rápido o haz trote muy suave al aire libre durante 45-60 minutos. <strong>Regla:</strong> Debes poder mantener una conversación sin ahogarte. Aquí es donde el cuerpo extrae triglicéridos de la barriga y piernas como energía.'
          ]
        },
        {
          dia: 'Día 4: Core y Cardio Final',
          calentamiento: 'Saltos de tijera.',
          rutina: [
            '1. <strong>Crunches Abdominales cortos:</strong> 3 series de 20.',
            '2. <strong>Elevaciones de Piernas Acostado:</strong> 3 series de 15.',
            '3. <strong>Cierre Metabólico:</strong> Sube y baja escaleras en tu edificio o casa lo más rápido que puedas durante 10 minutos seguidos.'
          ]
        },
        {
          dia: 'Día 5: Descanso',
          calentamiento: 'Relajación.',
          rutina: ['Reparación celular total.']
        }
      ],
      gym: [
        {
          dia: 'Día 1: Pesas Ligeras Circuito Metabólico',
          calentamiento: 'Elíptica 5 minutos.',
          rutina: [
            '<em>Haz estos ejercicios seguidos, descansando solo 60s al finalizar la ronda. Haz 4 Rondas.</em>',
            '1. <strong>Sentadilla Goblet con 1 Mancuerna:</strong> 15 reps.',
            '2. <strong>Jalón al pecho en Polea:</strong> 15 reps.',
            '3. <strong>Press Militar con mancuernas de pie:</strong> 15 reps.',
            '4. <strong>Kettlebell Swings:</strong> 20 reps.'
          ]
        },
        {
          dia: 'Día 2: Cardio Constante + Core',
          calentamiento: 'Movilidad de cadera.',
          rutina: [
            '1. <strong>Cinta Inclinada (Cardio Zona 2):</strong> Inclinación al 12%, velocidad moderada (5 km/h). Camina 40 minutos sin agarrarte de los bordes. Quema grasa garantizada.',
            '2. <strong>Máquina de Abdominales o Crunches declinados:</strong> 4 series de 20 reps.',
            '3. <strong>Plancha Lateral:</strong> 3 series de 45s por lado.'
          ]
        },
        {
          dia: 'Día 3: Descanso Activo',
          calentamiento: 'Recuperación.',
          rutina: ['Caminata ligera o bicicleta a ritmo muy bajo por 20 minutos.']
        },
        {
          dia: 'Día 4: Tren Inferior y Sprint Final',
          calentamiento: 'Bicicleta 5 min.',
          rutina: [
            '1. <strong>Prensa de Piernas:</strong> 4 series de 15 reps. Rango completo.',
            '2. <strong>Peso Muerto Rumano (Mancuernas):</strong> 3 series de 12 reps.',
            '3. <strong>Cierre HIIT (Bicicleta de aire o Remadora):</strong> 10 rondas de: 20 segundos pedaleando a MUERTE / 40 segundos muy suave.'
          ]
        },
        {
          dia: 'Día 5: Descanso',
          calentamiento: 'Día Libre.',
          rutina: ['Recuperación articular muscular.']
        }
      ],
      funcional: [
        {
          dia: 'Día 1: HIIT Extremo',
          calentamiento: 'Activación articular total.',
          rutina: [
            '1. <strong>Saltos al cajón (Box Jumps):</strong> 4 series de 10 saltos explosivos.',
            '2. <strong>Lanzamiento de Balón Medicinal al Suelo (Slams):</strong> 4 series de 15 reps. Furia total.',
            '3. <strong>Sprints (Carreras de velocidad):</strong> Corre 50 metros a máxima velocidad, camina de regreso. Repite 8 veces.'
          ]
        },
        {
          dia: 'Día 2: Descanso o Yoga',
          calentamiento: 'Movilidad.',
          rutina: ['Sesión de flexibilidad y movilidad pélvica de 30 mins.']
        },
        {
          dia: 'Día 3: Resistencia de Larga Duración',
          calentamiento: 'Trote suave.',
          rutina: [
            'Sesión continua de 45 minutos (EMOM o AMRAP largo). Ejemplo: Cada minuto realiza 5 Burpees y 10 Sentadillas, descansa el resto del minuto, repite por 20 minutos.'
          ]
        }
      ]
    },

    mantenimiento: {
      trainer: "⚖️ <strong>Vitalidad y Longevidad:</strong> Has logrado un equilibrio maravilloso. Ahora el enfoque es mantener la agilidad de tus articulaciones, prevenir la pérdida de masa ósea y asegurar un sistema cardiovascular de titanio. Enfócate en la conexión mente-músculo y disfruta el movimiento.",
      casa: [
        {
          dia: 'Día 1: Mantenimiento Full Body',
          calentamiento: 'Yoga ligero al despertar (Saludo al sol).',
          rutina: [
            '1. <strong>Flexiones (Push-ups):</strong> 3 series al fallo técnico.',
            '2. <strong>Sentadillas Clásicas controladas:</strong> 3 series de 20 reps.',
            '3. <strong>Elevaciones Laterales (botellas):</strong> 3 series de 15 reps.',
            '4. <strong>Planchas isométricas:</strong> 3 series de 1 minuto.'
          ]
        },
        {
          dia: 'Día 2: Actividad Recreativa Cardiovascular',
          calentamiento: 'Ninguno específico.',
          rutina: ['Dedica de 45 a 60 minutos a bailar en casa, andar en bicicleta, jugar algún deporte (fútbol/basket) o hacer una caminata vigorosa en un bosque/parque.']
        },
        {
          dia: 'Día 3: Flexibilidad y Core',
          calentamiento: 'Estiramientos dinámicos.',
          rutina: [
            '1. <strong>Puente de Glúteo (Suelo):</strong> 3 series de 15.',
            '2. <strong>Bird-Dog (Postura de perro de caza):</strong> 3 series de 12 por lado. (Equilibrio).',
            '3. <strong>Estiramiento Estático de Isquios, Cuádriceps y Pectoral:</strong> Sostén cada postura 2 minutos para elongar fascias.'
          ]
        }
      ],
      gym: [
        {
          dia: 'Día 1: Rutina de Fuerzas Básicas',
          calentamiento: 'Cinta 5 min y rotaciones.',
          rutina: [
            '1. <strong>Press de Máquina de Pecho:</strong> 3 series de 12 reps.',
            '2. <strong>Remo en Máquina:</strong> 3 series de 12 reps.',
            '3. <strong>Prensa de Piernas:</strong> 3 series de 15 reps.',
            '4. <strong>Elevación de Talones (Gemelos):</strong> 3 series de 20 reps.'
          ]
        },
        {
          dia: 'Día 2: Salud Cardiovascular',
          calentamiento: 'Estiramiento ligero.',
          rutina: ['Usa la Elíptica o la Escaladora durante 30 a 45 minutos a ritmo conversacional (Zona 2). Protege tu corazón sin generar desgaste articular severo.']
        },
        {
          dia: 'Día 3: Fortalecimiento de Core y Brazos',
          calentamiento: 'Bicicleta 5 min.',
          rutina: [
            '1. <strong>Curl de Bíceps con Polea:</strong> 3 series de 15.',
            '2. <strong>Tríceps con Cuerda:</strong> 3 series de 15.',
            '3. <strong>Máquina de Abdominales:</strong> 3 series de 20.',
            '4. <strong>Extensiones Lumbares (Silla Romana):</strong> 3 series de 15. Protege la columna baja.'
          ]
        }
      ],
      funcional: [
        {
          dia: 'Día 1: Agilidad y Coordinación',
          calentamiento: 'Rotaciones de tobillo, rodilla y cadera.',
          rutina: [
            '1. <strong>Escalera de agilidad (o marcas en el suelo):</strong> Trabajo de pies rápidos por 10 minutos.',
            '2. <strong>Kettlebell Swings ligeros:</strong> 3 series de 20.',
            '3. <strong>Wall Balls (Balón a la pared):</strong> 3 series de 15.'
          ]
        },
        {
          dia: 'Día 2: Estabilidad y Fuerza Unilateral',
          calentamiento: 'Trote estático.',
          rutina: [
            '1. <strong>Sentadilla Búlgara con Kettlebell:</strong> 3 series de 12 por lado.',
            '2. <strong>Remo a un brazo apoyado:</strong> 3 series de 12 por lado.',
            '3. <strong>Farmer Walks (Unilateral, peso en 1 mano):</strong> Caminar para forzar el core a enderezarse.'
          ]
        }
      ]
    }
  },

  // ── Recomendaciones culturales ─────────────
  recomendaciones: {
    libros: [
      { titulo:'El Poder del Hábito', autor:'Charles Duhigg', tema:'Hábitos y psicología del cambio', emoji:'📖' },
      { titulo:'Cerebro de Pan', autor:'David Perlmutter', tema:'Neurología y alimentación', emoji:'🧠' },
      { titulo:'Come Real', autor:'Alejandro Junger', tema:'Nutrición y desintoxicación', emoji:'🥗' },
      { titulo:'El Cuerpo Lleva la Cuenta', autor:'Bessel van der Kolk', tema:'Trauma y salud física', emoji:'❤️' },
      { titulo:'Outlive: La Ciencia de Vivir Más', autor:'Peter Attia', tema:'Longevidad científica', emoji:'⏳' },
      { titulo:'Piense y Hágase Rico', autor:'Napoleon Hill', tema:'Mentalidad de éxito', emoji:'💡' },
      { titulo:'El Monje que Vendió su Ferrari', autor:'Robin Sharma', tema:'Propósito de vida', emoji:'🌿' },
      { titulo:'Indistractable', autor:'Nir Eyal', tema:'Foco y productividad', emoji:'🎯' },
      { titulo:'Hábitos Atómicos', autor:'James Clear', tema:'Mejora continua al 1%', emoji:'📈' },
      { titulo:'Meditaciones', autor:'Marco Aurelio', tema:'Estoicismo y resiliencia', emoji:'🏛️' },
      { titulo:'El Hombre en Busca de Sentido', autor:'Viktor Frankl', tema:'Propósito y supervivencia', emoji:'🕊️' },
      { titulo:'Dormir', autor:'Nick Littlehales', tema:'Optimización del sueño', emoji:'😴' },
      { titulo:'Por qué Dormimos', autor:'Matthew Walker', tema:'Ciencia del descanso', emoji:'🌙' },
      { titulo:'Sapiens', autor:'Yuval Noah Harari', tema:'Evolución humana', emoji:'🌍' },
      { titulo:'Pensar Rápido, Pensar Despacio', autor:'Daniel Kahneman', tema:'Sesgos cognitivos', emoji:'🤔' },
      { titulo:'La Revolución de la Glucosa', autor:'Jessie Inchauspé', tema:'Control de azúcar en sangre', emoji:'🩸' },
      { titulo:'El Sutil Arte de que te Importe un C*rajo', autor:'Mark Manson', tema:'Prioridades y valores', emoji:'🤘' },
      { titulo:'Flujo (Flow)', autor:'Mihaly Csikszentmihalyi', tema:'Estado de máxima concentración', emoji:'🌊' },
      { titulo:'Padre Rico, Padre Pobre', autor:'Robert Kiyosaki', tema:'Inteligencia financiera', emoji:'💰' },
      { titulo:'La Vaca', autor:'Camilo Cruz', tema:'Eliminar excusas limitantes', emoji:'🐄' },
      { titulo:'El Club de las 5 de la Mañana', autor:'Robin Sharma', tema:'Rutinas matutinas de éxito', emoji:'🌅' },
      { titulo:'Deep Work', autor:'Cal Newport', tema:'Trabajo profundo sin distracciones', emoji:'💻' },
      { titulo:'El Código de la Obesidad', autor:'Dr. Jason Fung', tema:'Ayuno y metabolismo', emoji:'⚖️' },
      { titulo:'Mindset', autor:'Carol Dweck', tema:'Mentalidad de crecimiento', emoji:'🌱' },
      { titulo:'Las 48 Leyes del Poder', autor:'Robert Greene', tema:'Estrategia y naturaleza humana', emoji:'👑' },
      { titulo:'Inmune', autor:'Philipp Dettmer', tema:'Sistema inmunológico explicado', emoji:'🛡️' },
      { titulo:'Respirar', autor:'James Nestor', tema:'La ciencia de la respiración', emoji:'😮‍💨' },
      { titulo:'El Ego es el Enemigo', autor:'Ryan Holiday', tema:'Humildad y estoicismo', emoji:'🧱' },
      { titulo:'El Efecto Compuesto', autor:'Darren Hardy', tema:'Pequeñas acciones, grandes resultados', emoji:'📊' },
      { titulo:'Lifespan', autor:'David Sinclair', tema:'Revertir el envejecimiento', emoji:'🧬' },
      { titulo:'Invencible', autor:'Tony Robbins', tema:'Libertad financiera', emoji:'🦅' },
      { titulo:'La Magia del Orden', autor:'Marie Kondo', tema:'Minimalismo y paz mental', emoji:'✨' },
      { titulo:'El Fin de la Ansiedad', autor:'Gio Zararri', tema:'Gestión del pánico', emoji:'🧘' },
      { titulo:'Cómo Ganar Amigos e Influir sobre las Personas', autor:'Dale Carnegie', tema:'Habilidades sociales', emoji:'🤝' },
      { titulo:'Los Cuatro Acuerdos', autor:'Don Miguel Ruiz', tema:'Sabiduría Tolteca', emoji:'📜' },
      { titulo:'Can\'t Hurt Me', autor:'David Goggins', tema:'Endurecimiento mental', emoji:'🔥' },
      { titulo:'Alimenta tu Cerebro', autor:'David Perlmutter', tema:'Microbioma y salud mental', emoji:'🦠' },
      { titulo:'El Almanaque de Naval Ravikant', autor:'Eric Jorgenson', tema:'Riqueza y felicidad', emoji:'💎' },
      { titulo:'Céntrate (Essentialism)', autor:'Greg McKeown', tema:'Hacer menos pero mejor', emoji:'🎯' },
      { titulo:'El Hombre Más Rico de Babilonia', autor:'George S. Clason', tema:'Principios financieros clásicos', emoji:'🏺' },
      { titulo:'El Psicoanalista', autor:'John Katzenbach', tema:'Thriller psicológico (descanso mental)', emoji:'🕵️' },
      { titulo:'1984', autor:'George Orwell', tema:'Ficción distópica y pensamiento crítico', emoji:'👁️' },
      { titulo:'La Paradoja del Chimpancé', autor:'Prof. Steve Peters', tema:'Gestión emocional', emoji:'🐵' },
      { titulo:'Los 7 Hábitos de la Gente Altamente Efectiva', autor:'Stephen Covey', tema:'Liderazgo personal', emoji:'🚀' },
      { titulo:'Ikigai', autor:'Héctor García', tema:'El secreto japonés para una vida larga y feliz', emoji:'🌸' },
      { titulo:'La Regla de los 5 Segundos', autor:'Mel Robbins', tema:'Vencer la procrastinación', emoji:'⏱️' },
      { titulo:'Limites', autor:'Dr. Henry Cloud', tema:'Cuándo decir sí y cómo decir no', emoji:'🛑' },
      { titulo:'Grit: El Poder de la Pasión', autor:'Angela Duckworth', tema:'Perseverancia', emoji:'💪' },
      { titulo:'El Kybalión', autor:'Tres Iniciados', tema:'Filosofía hermética', emoji:'👁️‍🗨️' },
      { titulo:'Inteligencia Emocional', autor:'Daniel Goleman', tema:'El verdadero éxito', emoji:'🧠' }
    ],
    documentales: [
      { titulo:'What the Health', plataforma:'Netflix', tema:'Alimentación y enfermedades crónicas' },
      { titulo:'The Game Changers', plataforma:'Netflix', tema:'Proteína vegetal y atletas élite' },
      { titulo:'Fantastic Fungi', plataforma:'Netflix', tema:'Fungi, naturaleza y cerebro' },
      { titulo:'Icarus', plataforma:'Netflix', tema:'Dopaje y cuerpo humano' },
      { titulo:'Live to 100: Secrets of the Blue Zones', plataforma:'Netflix', tema:'Zonas de longevidad' },
      { titulo:'The Mind Explained', plataforma:'Netflix', tema:'Cerebro, sueño, ansiedad' },
      { titulo:'The Social Dilemma', plataforma:'Netflix', tema:'Adicción a las redes sociales' },
      { titulo:'Cowspiracy', plataforma:'Netflix', tema:'Impacto ambiental de la dieta' },
      { titulo:'Heal', plataforma:'Netflix / Prime', tema:'Poder curativo de la mente' },
      { titulo:'My Octopus Teacher', plataforma:'Netflix', tema:'Conexión con la naturaleza' },
      { titulo:'14 Peaks', plataforma:'Netflix', tema:'Límites humanos y alpinismo' },
      { titulo:'Limitless with Chris Hemsworth', plataforma:'Disney+', tema:'Biohacking y antienvejecimiento' },
      { titulo:'Minimalism', plataforma:'Netflix', tema:'Vivir con menos cosas' },
      { titulo:'Forks Over Knives', plataforma:'Prime Video', tema:'Medicina preventiva vegetal' },
      { titulo:'The Magic Pill', plataforma:'Prime Video', tema:'Dieta cetogénica y salud' },
      { titulo:'Free Solo', plataforma:'Disney+', tema:'Concentración absoluta y miedo' },
      { titulo:'Our Planet', plataforma:'Netflix', tema:'Biodiversidad y perspectiva global' },
      { titulo:'Take Your Pills', plataforma:'Netflix', tema:'Uso de estimulantes cognitivos' },
      { titulo:'Stutz', plataforma:'Netflix', tema:'Herramientas de psiquiatría práctica' },
      { titulo:'Breathe (El poder de la respiración)', plataforma:'YouTube', tema:'Técnicas de Wim Hof' },
      { titulo:'Rotten', plataforma:'Netflix', tema:'La verdad de la industria alimentaria' },
      { titulo:'A Plastic Ocean', plataforma:'Netflix', tema:'Salud planetaria' },
      { titulo:'Supersize Me', plataforma:'YouTube', tema:'Efectos de la comida rápida' },
      { titulo:'Fat, Sick & Nearly Dead', plataforma:'Prime Video', tema:'Reinicio metabólico con jugos' },
      { titulo:'The Great Hack', plataforma:'Netflix', tema:'Privacidad y manipulación de datos' },
      { titulo:'Bikram', plataforma:'Netflix', tema:'Gurús tóxicos y salud' },
      { titulo:'Gaga: Five Foot Two', plataforma:'Netflix', tema:'Dolor crónico y fibromialgia' },
      { titulo:'The Bleeding Edge', plataforma:'Netflix', tema:'Industria de implantes médicos' },
      { titulo:'Unrest', plataforma:'Netflix', tema:'Fatiga crónica' },
      { titulo:'Expedition Happiness', plataforma:'Netflix', tema:'Minimalismo y salud mental' },
      { titulo:'Jiro Dreams of Sushi', plataforma:'Prime Video', tema:'Maestría y disciplina' },
      { titulo:'Crip Camp', plataforma:'Netflix', tema:'Derechos de la discapacidad' },
      { titulo:'Period. End of Sentence.', plataforma:'Netflix', tema:'Salud femenina y tabúes' },
      { titulo:'The Last Dance', plataforma:'Netflix', tema:'Psicología ganadora (Michael Jordan)' },
      { titulo:'Tinder Swindler', plataforma:'Netflix', tema:'Psicopatía y manipulación social' },
      { titulo:'Night on Earth', plataforma:'Netflix', tema:'Ciclos circadianos en la naturaleza' },
      { titulo:'I Am Not Your Guru', plataforma:'Netflix', tema:'Inmersión con Tony Robbins' },
      { titulo:'Jim & Andy', plataforma:'Netflix', tema:'Pérdida de identidad y ego' },
      { titulo:'The Push', plataforma:'Netflix', tema:'Manipulación psicológica extrema' },
      { titulo:'Century of the Self', plataforma:'YouTube', tema:'Psicoanálisis y consumismo' },
      { titulo:'Fed Up', plataforma:'Prime Video', tema:'La epidemia oculta del azúcar' },
      { titulo:'Pumping Iron', plataforma:'Prime Video', tema:'Culturismo clásico (Arnold)' },
      { titulo:'Generation Iron', plataforma:'Prime Video', tema:'Culturismo moderno' },
      { titulo:'The Cove', plataforma:'Prime Video', tema:'Conservación marina' },
      { titulo:'Blackfish', plataforma:'Netflix', tema:'Psicología del cautiverio' },
      { titulo:'Virunga', plataforma:'Netflix', tema:'Protección ecológica' },
      { titulo:'Kiss the Ground', plataforma:'Netflix', tema:'Regeneración de suelos y nutrición' },
      { titulo:'The Wisdom of Trauma', plataforma:'YouTube', tema:'Trauma con el Dr. Gabor Maté' },
      { titulo:'Hack Your Health: The Secrets of Your Gut', plataforma:'Netflix', tema:'Microbioma intestinal' },
      { titulo:'You Are What You Eat: A Twin Experiment', plataforma:'Netflix', tema:'Genética vs Dieta' }
    ],
    podcasts: [
      { titulo:'Huberman Lab', descripcion:'Neurociencia aplicada a la salud diaria. Episodios en inglés con subtítulos.' },
      { titulo:'FoundMyFitness (Rhonda Patrick)', descripcion:'Ciencia de nutrición y envejecimiento.' },
      { titulo:'Doctor en el Tiempo', descripcion:'Salud en español, fácil de entender.' },
      { titulo:'El Podcast de Marcos Vázquez (Fitness Revolucionario)', descripcion:'Salud, nutrición y estoicismo en español.' },
      { titulo:'The Peter Attia Drive', descripcion:'Profundidad clínica sobre longevidad y medicina.' },
      { titulo:'Entiende Tu Mente', descripcion:'Psicología práctica en episodios de 20 minutos.' },
      { titulo:'Lifespan with Dr. David Sinclair', descripcion:'La ciencia para revertir el envejecimiento.' },
      { titulo:'The Tim Ferriss Show', descripcion:'Hábitos y rutinas de personas de clase mundial.' },
      { titulo:'La Cruda (Migue Granados)', descripcion:'Entrevistas profundas sobre condiciones de vida extremas y oficios.' },
      { titulo:'Dementes', descripcion:'Conversaciones con creadores y emprendedores.' },
      { titulo:'Rich Roll Podcast', descripcion:'Bienestar, recuperación de adicciones y ultra-resistencia.' },
      { titulo:'The Joe Rogan Experience (Salud)', descripcion:'Episodios seleccionados con científicos (Rhonda Patrick, Matthew Walker).' },
      { titulo:'Lex Fridman Podcast', descripcion:'Entrevistas extensas sobre IA, naturaleza humana y ciencia.' },
      { titulo:'Se Regalan Dudas', descripcion:'Cuestionamiento de creencias sociales y tabúes.' },
      { titulo:'Impact Theory (Tom Bilyeu)', descripcion:'Mentalidad de negocio y optimización humana.' },
      { titulo:'On Purpose with Jay Shetty', descripcion:'Propósito, mindfulness y relaciones.' },
      { titulo:'The Diary of a CEO (Steven Bartlett)', descripcion:'Negocios, psicología y vulnerabilidad.' },
      { titulo:'TED Radio Hour', descripcion:'Las mejores charlas TED agrupadas por temas (en inglés).' },
      { titulo:'TED en Español', descripcion:'Ideas transformadoras de oradores hispanohablantes.' },
      { titulo:'Salud Mental (Dr. Carlos Arroyo)', descripcion:'Psiquiatría y bienestar psicológico explicados fácil.' },
      { titulo:'The Daily Stoic', descripcion:'Píldoras diarias de sabiduría estoica por Ryan Holiday.' },
      { titulo:'Aprender de Grandes (Gerry Garbulsky)', descripcion:'Cómo la gente extraordinaria hace lo que hace.' },
      { titulo:'El Podcast de Cristina Mitre', descripcion:'Belleza, nutrición y salud femenina basada en ciencia.' },
      { titulo:'Radio Ambulante', descripcion:'Crónicas latinoamericanas que te conectan con la realidad regional.' },
      { titulo:'Hidden Brain', descripcion:'Cómo nuestro inconsciente dirige nuestras decisiones.' },
      { titulo:'Kwik Brain (Jim Kwik)', descripcion:'Técnicas de memoria, lectura rápida y salud cerebral.' },
      { titulo:'The School of Greatness (Lewis Howes)', descripcion:'Inspiración, negocios y superación personal.' },
      { titulo:'SmartLess', descripcion:'Comedia e improvisación para desestresarse (Bateman, Arnett, Hayes).' },
      { titulo:'Akers Podcast', descripcion:'Emprendimiento y mentalidad desde la perspectiva joven.' },
      { titulo:'El Estoico', descripcion:'Aplicación práctica de filosofía antigua a problemas modernos.' },
      { titulo:'Science Vs', descripcion:'Desmintiendo mitos de moda con datos científicos reales.' },
      { titulo:'El Podcast de Boticaria García', descripcion:'Consejos de farmacia y salud preventiva sin engaños.' },
      { titulo:'DuoLingo Spanish/English Podcast', descripcion:'Para estimular tu plasticidad cerebral aprendiendo idiomas.' },
      { titulo:'Naval Podcast', descripcion:'Reflexiones atemporales sobre riqueza y felicidad.' },
      { titulo:'The Minimalists Podcast', descripcion:'Vivir una vida significativa con menos cosas.' },
      { titulo:'Freakonomics Radio', descripcion:'La economía oculta detrás de las decisiones cotidianas.' },
      { titulo:'Borrón y Cuenta Nueva', descripcion:'Manejo de finanzas personales y salir de deudas.' },
      { titulo:'The Knowledge Project', descripcion:'Modelos mentales para tomar mejores decisiones.' },
      { titulo:'Waking Up (Sam Harris)', descripcion:'Meditación guiada y filosofía de la mente.' },
      { titulo:'NPR Life Kit', descripcion:'Consejos prácticos para todo, desde dormir hasta finanzas.' },
      { titulo:'Unlocking Us (Brené Brown)', descripcion:'Vulnerabilidad, coraje y empatía.' },
      { titulo:'My First Million', descripcion:'Análisis de negocios y cómo generar dinero.' },
      { titulo:'The Doctor\'s Farmacy (Mark Hyman)', descripcion:'Medicina funcional y comida como medicina.' },
      { titulo:'The Model Health Show', descripcion:'Nutrición, fitness y hacks de estilo de vida.' },
      { titulo:'Revisionist History (Malcolm Gladwell)', descripcion:'Reexaminando cosas ignoradas o incomprendidas.' },
      { titulo:'How I Built This', descripcion:'Historias detrás de las empresas más grandes del mundo.' },
      { titulo:'Optimal Living Daily', descripcion:'Narración de los mejores blogs de desarrollo personal.' },
      { titulo:'The Aubrey Marcus Podcast', descripcion:'Optimización humana integral (mente, cuerpo, espíritu).' },
      { titulo:'Ologies with Alie Ward', descripcion:'Entrevistas humorísticas con expertos en ciencias raras.' },
      { titulo:'Mind Pump', descripcion:'Mitos del fitness destruidos por entrenadores expertos.' }
    ],
  },

  // ── Salud sexual por perfil ─────────────────
  saludSexual: {
    masculino: {
      alimentos: ['Sandía (citrulina → vasodilatación)','Granada (antioxidante testosterona)','Ostras/Sardinas (zinc → esperma)','Ajo (circulación pélvica)','Espinaca (magnesio → testosterona)','Nueces (arginina → ereccion)','Chocolate negro +70% (serotonina + circulación)','Aguacate (grasa buena → hormonas)'],
      habitos: ['Entrenamiento de fuerza → eleva testosterona natural','Dormir 7-8h → pico de testosterona en sueño profundo','Reducir alcohol → el alcohol disminuye la testosterona','Reducir pornografía → restaura sensibilidad dopaminérgica','Exposición solar 20 min/día → vitamina D → testosterona','Baños de contraste (frío-caliente) → circulación y producción espermática'],
      semen: ['Zinc (sardinas, ostras) aumenta volumen','Selenio (nueces de Brasil) mejora motilidad espermática','Vitamina C (cítricos) protege ADN del espermatozoide','Licopeno (tomate cocinado) mejora morfología','Ácido fólico (espinaca, lentejas) aumenta cantidad de espermatozoides'],
    },
    femenino: {
      alimentos: ['Semillas de lino (fitoestrógenos)','Salmón/Sardinas (omega-3 → lubricación natural)','Espárragos (ácido fólico → libido)','Fresas (vitamina C → flujo sanguíneo)','Chocolate negro (serotonina + estrógenos)','Aguacate (vitamina B6 → equilibrio hormonal)','Jengibre (circulación pélvica y sensibilidad)'],
      habitos: ['Kegel diarios → fortalece suelo pélvico','Yoga → conexión mente-cuerpo','Reducir estrés → el cortisol bloquea el estrógeno','Dormir bien → equilibrio hormonal','Comunicación con la pareja → intimidad emocional'],
    },
  },

  // ── Desarrollo Juvenil (Menores de 16) ─────────────
  desarrolloJuvenil: {
    cambios: [
      { icono: '🧬', titulo: 'Hormonas en Acción', desc: 'Tu cuerpo está produciendo nuevas hormonas. Esto puede causar cambios de humor repentinos, acné y que crezcas de golpe. ¡Es totalmente normal!' },
      { icono: '🚿', titulo: 'Olor Corporal y Sudor', desc: 'Tus glándulas sudoríparas están más activas. Báñate a diario, usa desodorante (como piedra de alumbre) y cambia tu ropa interior todos los días para sentirte fresco.' },
      { icono: '🧠', titulo: 'Cerebro en Remodelación', desc: 'Tu cerebro está podando conexiones viejas y creando nuevas. Por eso puedes sentirte confundido o querer más independencia. Necesitas dormir 9 horas para que esto ocurra bien.' },
      { icono: '🥦', titulo: 'Combustible para Crecer', desc: 'Comer mucha chatarra ahora (azúcar, refrescos) puede dañar tu metabolismo para siempre. Necesitas proteínas (huevo, pollo) y vegetales para desarrollar huesos y músculos fuertes.' }
    ],
    comunicacion: [
      { icono: '🗣️', titulo: 'Hablar Cura', desc: 'Si sientes tristeza profunda, miedo, o alguien te hace sentir incómodo, el silencio es tu peor enemigo. Habla con tus padres o un adulto de confianza. No hay vergüenza en pedir ayuda.' },
      { icono: '🚫', titulo: 'Peligros Reales', desc: 'El alcohol, cigarrillos y los vapeadores no te hacen adulto, solo destruyen tus neuronas (que aún se están formando) y detienen tu crecimiento físico.' },
      { icono: '🤝', titulo: 'Supervisión en Línea', desc: 'Las redes sociales pueden crear ansiedad o exponerte a extraños. Tener la supervisión de tus padres en tu teléfono no es un castigo, es un escudo para protegerte.' }
    ]
  },

  // ── Prevención y seguridad ─────────────────
  seguridad: {
    examenes: {
      ninos_adolescentes: [
        { nombre:'Control de Pediatría / Medicina General', frecuencia:'Cada 12 meses', descripcion:'Monitoreo de curvas de crecimiento (peso, altura) y desarrollo puberal.' },
        { nombre:'Calendario de Vacunación', frecuencia:'Según esquema nacional', descripcion:'Refuerzos de Tétanos, Difteria, VPH (a partir de los 11 años), y Meningococo.' },
        { nombre:'Chequeo Oftalmológico', frecuencia:'Cada 12-24 meses', descripcion:'Detectar miopía temprana o astigmatismo que puede causar bajo rendimiento escolar.' },
        { nombre:'Examen Odontológico', frecuencia:'Cada 6 meses', descripcion:'Prevención de caries, gingivitis y evaluación de ortodoncia.' },
        { nombre:'Evaluación Psicológica Preventiva', frecuencia:'Opcional/Recomendada', descripcion:'Chequeo de salud mental para prevención de bullying, ansiedad escolar o depresión juvenil.' }
      ],
      adulto_joven: [
        { nombre:'Hemograma completo', frecuencia:'Cada 12 meses', descripcion:'Detecta anemia, infecciones y problemas del sistema inmune' },
        { nombre:'Glucosa en sangre', frecuencia:'Cada 12 meses', descripcion:'Prevención de diabetes tipo 2' },
        { nombre:'Perfil lipídico (colesterol)', frecuencia:'Cada 12 meses', descripcion:'Salud cardiovascular' },
        { nombre:'Presión arterial', frecuencia:'Cada 6 meses', descripcion:'Hipertensión silenciosa' },
        { nombre:'Pruebas de ETS (VIH, sífilis, gonorrea)', frecuencia:'Cada 6-12 meses (vida sexual activa)', descripcion:'Detección temprana = curación completa' },
        { nombre:'Vitamina D', frecuencia:'Cada 12 meses', descripcion:'Déficit afecta humor, inmunidad y huesos' },
        { nombre:'TSH (Tiroides)', frecuencia:'Cada 12-24 meses', descripcion:'El hipotiroidismo afecta peso, energía y humor' },
      ],
      mujer: [
        { nombre:'Papanicolau (Citología)', frecuencia:'Cada 12-24 meses', descripcion:'Detección temprana de cáncer de cérvix' },
        { nombre:'Mamografía', frecuencia:'Desde los 40, cada 12 meses', descripcion:'Detección de cáncer de mama' },
        { nombre:'Hierro sérico y ferritina', frecuencia:'Cada 12 meses', descripcion:'Mujeres con menstruación pierden hierro mensualmente' },
      ],
      adulto_mayor: [
        { nombre:'Densitometría ósea', frecuencia:'Cada 2-3 años desde los 50', descripcion:'Osteoporosis silenciosa' },
        { nombre:'Colonoscopía', frecuencia:'Cada 5-10 años desde los 50', descripcion:'Detección de cáncer de colon' },
        { nombre:'Electrocardiograma', frecuencia:'Cada 12 meses desde los 50', descripcion:'Salud del corazón' },
      ],
    },
    habitos_nocivos: {
      fumar: {
        impacto: 'El cigarro reduce la esperanza de vida en promedio 10 años. Destruye los alvéolos pulmonares (irreversible), aumenta riesgo de 15 tipos de cáncer y deteriora la piel aceleradamente.',
        estrategia: ['Fijar una fecha de dejar definitiva (no "intentar")','Reemplazar el cigarrillo con chicle de nicotina o parche los primeros 21 días','Identificar los 3 disparadores principales (estrés, café, alcohol) y evitarlos al inicio','Aplicación gratuita: Smoke Free (cuenta los días, el dinero ahorrado y la mejora pulmonar)','En 72h sin fumar el gusto y olfato mejoran. En 2 semanas el pulmón inicia regeneración.'],
      },
      alcohol: {
        impacto: 'El alcohol en exceso destruye el hígado, deteriora el sueño REM, reduce la testosterona en hombres y aumenta el riesgo de depresión.',
        estrategia: ['Establecer 2 días sin alcohol mínimo por semana (días "secos")','Reemplazar el ritual social con bebidas sin alcohol (agua con gas + limón + menta es disfrutable)','Nunca beber con el estómago vacío','El "borracho de fin de semana" tiene el mismo riesgo hepático que el bebedor diario moderado'],
      },
    },
    higiene_preventiva: [
      { accion:'Lavado de manos', detalle:'20 segundos con jabón, especialmente antes de comer, después del baño y al llegar a casa', icono:'🧼' },
      { accion:'Gel antibacterial', detalle:'Usar cuando no hay agua disponible, no sustituye el lavado con agua y jabón', icono:'🧴' },
      { accion:'Uso de condón', detalle:'100% de las relaciones sexuales con parejas nuevas o no estables. Protege de VIH, VPH, sífilis, gonorrea y el embarazo no planificado.', icono:'🛡️' },
      { accion:'No compartir artículos personales', detalle:'Cepillo de dientes, afeitadora, aretes. Vía de transmisión de hepatitis B y C.', icono:'🚫' },
      { accion:'Protector solar', detalle:'Aplicar SPF30+ diariamente en cara y manos, incluso en días nublados. Previene envejecimiento y cáncer de piel.', icono:'☀️' },
      { accion:'Agua segura', detalle:'En países con agua potable irregular, hervir o usar filtro. El agua contaminada causa el 80% de las enfermedades gastrointestinales.', icono:'💧' },
    ],
  },

  // ── Salud mental ───────────────────────────
  saludMental: {
    ansiedad: [
      { titulo:'Respiración 4-7-8', descripcion:'Inhala 4s → Aguanta 7s → Exhala 8s. Activa el nervio vago y calma el sistema nervioso en menos de 2 minutos.', frecuencia:'Cuando sientas ansiedad o antes de dormir' },
      { titulo:'Diario de preocupaciones', descripcion:'Escribe en papel todas las preocupaciones del día. Al exteriorizarlas, el cerebro deja de procesarlas en loop.', frecuencia:'5 minutos por la noche' },
      { titulo:'Regla del 5-4-3-2-1', descripcion:'Nombra 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles, 1 que saboreas. Anclaje sensorial para el ataque de pánico.', frecuencia:'En momentos de crisis' },
      { titulo:'Ejercicio físico', descripcion:'30 minutos de caminata reducen el cortisol un 15-20%. El ejercicio es tan efectivo como el antidepresivo más prescrito para ansiedad leve-moderada.', frecuencia:'Diario' },
    ],
    depresion: [
      { titulo:'Exposición solar matutina', descripcion:'20 minutos de sol antes de las 10am activan la serotonina y regulan el ritmo circadiano. Gratuito y poderoso.', frecuencia:'Diario' },
      { titulo:'Activación conductual', descripcion:'Hacer UNA acción pequeña aunque no tengas ganas. La motivación no precede a la acción, la sigue. Empieza con 5 minutos.', frecuencia:'Diario' },
      { titulo:'Conexión social real', descripcion:'Llamar a una persona querida (no chatear) al menos 3 veces por semana. La voz humana libera oxitocina.', frecuencia:'3 veces/semana' },
      { titulo:'Limitar redes sociales', descripcion:'Máximo 30 minutos al día de redes. Los estudios muestran correlación directa entre uso excesivo de Instagram/TikTok y depresión.', frecuencia:'Límite diario' },
    ],
    cognitivo: [
      'Aprender algo nuevo cada semana (instrumento, idioma, habilidad) — crea nuevas sinapsis',
      'Leer 20 minutos antes de dormir — reduce el estrés un 68% más que otras actividades',
      'Meditar 10 minutos al día — Usa nuestra guía de respiración rítmica',
      'Ayuno digital 1 hora al despertar y 1 hora antes de dormir',
      'Juegos de lógica: ajedrez, sudoku, crucigramas — mantienen la plasticidad cerebral',
      'Escribir 3 cosas por las que estás agradecido cada mañana — reentrena el filtro de negatividad del cerebro',
    ],
  },

  // ── BioHacks y Curiosidades Biológicas ──────
  bioHacks: {
    hormonas: [
      {
        titulo: 'Aumentar Testosterona y Masculinidad',
        icono: '⚡',
        targetSexo: 'masculino',
        contenido: 'La testosterona define el desarrollo muscular, la energía competitiva y la densidad ósea en el hombre. <strong>Alimentos clave:</strong> Huevos enteros (el colesterol es la materia prima de la testosterona), Nueces de Brasil (altas en Selenio) y Ostras/Semillas de calabaza (altas en Zinc). <strong>El Hacker:</strong> Evita guardar tu comida caliente en recipientes de plástico (los ftalatos imitan al estrógeno y reducen tu testosterona libre). Levantar pesas pesadas y dormir de 7 a 8 horas seguidas son innegociables para mantener los niveles altos de forma natural.'
      },
      {
        titulo: 'Balance Femenino: Estrógeno y Progesterona',
        icono: '🌸',
        targetSexo: 'femenino',
        contenido: 'El equilibrio hormonal femenino dicta el estado de ánimo, la retención de líquidos y la vitalidad de la piel. <strong>Alimentos clave:</strong> Semillas de lino y chía (contienen fitoestrógenos naturales que regulan los picos hormonales), Aguacate y Salmón (las grasas saludables son vitales para sintetizar hormonas). <strong>El Hacker:</strong> El exceso de estrés (cortisol) "roba" los recursos que tu cuerpo usaría para producir progesterona, causando dominancia estrogénica (síndromes premenstruales fuertes). Prioriza magnesio y sueño profundo para bajar el estrés.'
      },
      {
        titulo: 'Disparar Serotonina y Dopamina',
        icono: '🧠',
        targetSexo: 'ambos',
        contenido: 'La serotonina te da paz y la dopamina te da motivación. <strong>Alimentos clave:</strong> Consumir Triptófano (Pavo, plátano, avena, chocolate oscuro) combinado con un carbohidrato sano (ayuda a cruzar la barrera cerebral). <strong>El Hacker:</strong> Exponte a la luz del sol directamente en los ojos (sin gafas) durante los primeros 30 minutos al despertar. Esto le dice al cerebro que produzca serotonina de día, la cual se convertirá en melatonina de noche.'
      }
    ],
    olor_corporal: [
      {
        titulo: 'El Desodorante Interno',
        icono: '🌿',
        contenido: 'El mal olor no viene del sudor, sino de las bacterias comiendo los residuos en tu piel. <strong>Estrategia:</strong> Beber clorofila líquida o el "Jugo Escudo Protector" (Limón, apio, pepino) actúa como un desodorante interno que oxigena la sangre. <strong>A evitar:</strong> Exceso de ajo, cebolla cruda, especias fuertes y carnes rojas procesadas aumentan el azufre en el sudor. <strong>Tópico:</strong> Usa leche de magnesia en las axilas como desodorante natural; alcaliniza la zona y las bacterias del mal olor no pueden sobrevivir ahí.'
      },
      {
        titulo: 'La Magia de la Piedra de Alumbre',
        icono: '💎',
        contenido: 'Los desodorantes comerciales bloquean tus poros con aluminio tóxico. La <strong>Piedra de Alumbre</strong> es un mineral natural hipoalergénico. No camufla el olor con perfume, sino que crea una película transparente antibacteriana donde las bacterias del mal olor no pueden proliferar. Solo debes humedecerla y frotarla en axilas limpias. Un solo cristal puede durar hasta un año.'
      }
    ],
    piel_estetica: [
      {
        titulo: 'Aclarar Axilas, Cuello y Zonas Íntimas',
        icono: '✨',
        contenido: '<strong>⚠️ EL SECRETO QUE NO TE DICEN:</strong> Si tienes el cuello, axilas o ingles oscuras y con textura aterciopelada, NO es suciedad ni fricción. Se llama <strong>Acantosis Nigricans</strong> y es el principal síntoma visual de la <strong>Resistencia a la Insulina</strong>. Ninguna crema aclaradora funcionará permanentemente hasta que reduzcas el consumo de azúcar y harinas refinadas.<br><br><strong>Para manchas por fricción o afeitado:</strong><br>- <em>Hombres y Mujeres:</em> Eviten afeitarse en seco. Usen exfoliación química suave (ej. Ácido Glicólico al 7% en tónico) 2 veces por semana en axilas para eliminar células muertas sin frotar.<br>- <em>Zonas Íntimas:</em> Evitar ropa interior muy ajustada de materiales sintéticos. Usa algodón para permitir la transpiración y reducir el roce.'
      },
      {
        titulo: 'El Afeitado Corporal Perfecto',
        icono: '🪒',
        contenido: 'Afeitar el cuerpo (piernas, pecho, zonas íntimas) incorrectamente causa foliculitis (granitos rojos dolorosos). <strong>El Método Clínico:</strong> 1. Exfolia la piel 24 horas antes, no el mismo día. 2. Aféitate SIEMPRE al final de la ducha, cuando el vapor haya ablandado el vello. 3. Desliza la cuchilla en la dirección del crecimiento del vello, nunca a contrapelo. 4. Al salir, aplica aloe vera puro o aceite de jojoba para calmar, nunca alcohol o perfumes.'
      },
      {
        titulo: 'Cremas Corporales y Tóxicos',
        icono: '🧴',
        contenido: 'Tu piel es el órgano más grande de tu cuerpo y "se come" lo que le pongas encima, llevándolo directo al torrente sanguíneo en 26 segundos. <strong>Evita a toda costa:</strong> Cremas que contengan "Parabenos" (disruptores hormonales), "Ftalatos" y "Fragancias sintéticas". <strong>Recomendación:</strong> Usa aceites puros (Coco, Almendras, Jojoba) o cremas dermatológicas a base de ceramidas y ácido hialurónico para sellar la humedad después de la ducha.'
      },
      {
        titulo: 'Entendiendo y Previniendo el Acné',
        icono: '🧖',
        contenido: 'El acné no se cura lavándose más la cara. Existen dos tipos principales: <strong>1. Acné Hormonal:</strong> Suele aparecer en la línea de la mandíbula y cuello (relacionado con picos de andrógenos, ovarios poliquísticos o resistencia a la insulina). Se previene regulando el azúcar en sangre. <strong>2. Acné Bacteriano/Poros Obstruidos:</strong> Aparece en frente y mejillas. <strong>Prevención:</strong> Cambia la funda de tu almohada cada 3 días, lava tu rostro solo 2 veces al día (más veces destruye tu barrera lipídica y produce más sebo) y usa ácido salicílico al 2%.'
      }
    ],
    habitos_fisicos: [
      {
        titulo: 'Dejar de Morderse las Uñas (Onicofagia)',
        icono: '💅',
        contenido: 'No es un problema de las uñas, es tu cerebro buscando descargar picos de cortisol (estrés). <strong>Solución Hacker:</strong> Necesitas un "reemplazo sensorial". Lleva siempre un palillo de dientes, chicle sin azúcar o un anillo giratorio. Físicamente: Pinta tus uñas con esmalte de sabor amargo (incluso si eres hombre, existen transparentes mate). Cada vez que la mano vaya a la boca, el cerebro recibirá un choque negativo que reprogramará el hábito en 21 días.'
      },
      {
        titulo: 'Prevención de la Calvicie (Alopecia DHT)',
        icono: '💇',
        contenido: 'La calvicie común es causada por una enzima que convierte la testosterona en DHT, estrangulando el folículo capilar. <strong>Defensa alimenticia:</strong> El Té Verde, las Semillas de Calabaza y el Romero (en infusión o aceite aplicado) son bloqueadores naturales leves de DHT. <strong>Mecánica:</strong> Masajea tu cuero cabelludo 5 minutos diarios con las yemas de los dedos firmemente (para despegar la piel del cráneo). Esto aumenta el flujo sanguíneo y retrasa la miniaturización.'
      },
      {
        titulo: 'Cero Sarro y Salud Dental',
        icono: '🦷',
        contenido: 'El sarro es una biopelícula bacteriana calcificada. <strong>El Hacker:</strong> Consume alimentos "detergentes" como manzanas enteras, apio o zanahoria cruda al final de las comidas; su fricción barre la placa recién formada. <strong>Técnica:</strong> "Oil Pulling". Enjuaga tu boca con 1 cucharada de aceite de coco virgen por 10 minutos en ayunas (luego escúpelo a la basura, no al lavabo). El aceite "atrapa" las bacterias liposolubles antes de que se endurezcan como sarro.'
      }
    ],
    prevencion: [
      {
        titulo: 'Autoexamen de Senos: La Regla de Oro',
        icono: '🤲',
        targetSexo: 'femenino',
        contenido: 'El cáncer de mama detectado a tiempo tiene un 99% de supervivencia. <strong>Técnica:</strong> Una vez al mes, 5 días después de tu periodo (cuando los senos están menos inflamados). De pie frente al espejo y luego acostada, usa las yemas de tres dedos (índice, medio, anular) y realiza movimientos circulares desde la axila hasta el pezón. <strong>Atención a:</strong> Bultos duros que no se mueven (como un guisante seco), hundimientos en la piel (piel de naranja) o secreciones inesperadas del pezón. El autoconocimiento es tu mejor escudo.'
      },
      {
        titulo: 'Nutrición y Prevención del Embarazo Complicado',
        icono: '🤰',
        contenido: 'Los embarazos precoces o no planificados, especialmente en cuerpos jóvenes sin reservas nutricionales, corren altísimos riesgos de anemia, preeclampsia o partos prematuros. <strong>El Embarazo Ectópico</strong> (el óvulo se implanta fuera del útero) está fuertemente ligado a inflamación pélvica previa (a menudo por ETS no tratadas). <strong>Importancia Nutricional:</strong> Si una mujer queda embarazada teniendo deficiencia severa de Ácido Fólico (vitamina B9 presente en vegetales verdes), el bebé corre un riesgo monumental de desarrollar <em>Espina Bífida</em> en las primeras semanas de gestación. Una buena nutrición previa es literalmente el pilar de la genética de tus futuros hijos.'
      },
      {
        titulo: 'El Peligro Letal de la Automedicación',
        icono: '💊',
        contenido: 'En LATAM existe la cultura de tomar antibióticos o analgésicos fuertes ante cualquier molestia. <strong>Realidad Biológica:</strong> Abusar de antibióticos destruye tu flora intestinal (el 80% de tu sistema inmune) y crea "Superbacterias" resistentes a todo. El uso excesivo de analgésicos (como el ibuprofeno o paracetamol) es la principal causa de fallas hepáticas y úlceras estomacales silenciosas. <strong>Solución:</strong> Utiliza la nutrición (ajo, jengibre, cúrcuma, buena hidratación) como medicina preventiva de primera línea, y reserva los fármacos solo para prescripciones médicas estrictas.'
      }
    ]
  },

  // ── Curiosidades Aleatorias (Datos Mente) ──
  curiosidades_aleatorias: [
    {
      titulo: '¿Qué es la Xenofobia y por qué es un error evolutivo?',
      icono: '🌍',
      contenido: 'La xenofobia es el rechazo al extranjero. En la prehistoria, tener miedo a tribus desconocidas nos protegía de enfermedades, pero hoy es un error de nuestro "cerebro reptiliano". Genéticamente, TODOS los humanos compartimos el 99.9% de nuestro ADN. Ser empáticos y diversos nos hace más fuertes y creativos como especie.'
    },
    {
      titulo: 'La Depresión no es "estar triste"',
      icono: '🧠',
      contenido: 'La depresión clínica es una condición biológica, no debilidad de carácter. Ocurre cuando hay un desequilibrio de neurotransmisores (como serotonina y dopamina) y neuroinflamación. <strong>Prevención:</strong> Comer alimentos reales, exponerse al sol matutino, sudar haciendo ejercicio y hablar en familia. Si sospechas tenerla, ir a un psicólogo es como ir al dentista: una necesidad médica.'
    },
    {
      titulo: 'El Superpoder de la Familia',
      icono: '👨‍👩‍👧‍👦',
      contenido: 'Científicamente, cenar en familia sin pantallas reduce en un 50% las probabilidades de que los adolescentes caigan en vicios como drogas o alcohol. Hablar sobre tu día libera <em>Oxitocina</em> (la hormona del vínculo), reduciendo el estrés tanto en niños como en padres.'
    },
    {
      titulo: 'El Veneno de los Vapeadores',
      icono: '💨',
      contenido: 'La industria tabacalera diseñó los cigarrillos electrónicos (vapes) con sabores dulces para engañar a los adolescentes. La realidad es que contienen metales pesados (plomo) y dosis masivas de nicotina que alteran permanentemente el desarrollo del córtex prefrontal del cerebro joven, reduciendo la capacidad de concentración y memoria.'
    },
    {
      titulo: 'La Filosofía de la "Vida Óptima"',
      icono: '🌱',
      contenido: 'Vivimos en un mundo diseñado para hacernos adictos al azúcar, las pantallas y la inactividad. Decidir buscar el bienestar al 100% es un acto de rebeldía. Seguir nuestros patrones biológicos (comer natural, moverse, dormir bien) no es una "dieta", es regresar a la fábrica para funcionar como la máquina perfecta que eres.'
    },
    {
      titulo: 'Alergias: El Sistema Inmune Confundido',
      icono: '🤧',
      contenido: 'Una alergia es simplemente tu sistema inmunológico exagerando. En lugar de atacar a un virus, decide que el polvo o el maní son "enemigos mortales" y dispara una inflamación masiva (histamina). <strong>Señales rápidas de alerta:</strong> Dificultad para respirar repentina, ronchas gigantes o hinchazón de labios requiere ir inmediatamente a urgencias.'
    },
    {
      titulo: 'El Color de tu Piel y el Sol',
      icono: '🌍',
      contenido: 'El color de la piel humana es un mapa de la migración de nuestros ancestros. La melanina (el pigmento oscuro) es un protector solar biológico. Los humanos cerca del ecuador desarrollaron piel oscura para evitar que el exceso de sol destruyera el Ácido Fólico (vital para el embarazo). Los humanos que migraron al norte (donde hay poco sol) perdieron la melanina para poder absorber suficiente luz y producir Vitamina D.'
    },
    {
      titulo: '¿Por qué existen los ojos azules?',
      icono: '👁️',
      contenido: 'Originalmente, todos los humanos tenían ojos marrones. Hace unos 10.000 años, un solo individuo cerca del Mar Negro sufrió una mutación genética que "apagó" la capacidad de producir melanina en el iris. Si tienes ojos azules, compartes un único ancestro común con todas las personas de ojos azules del mundo.'
    },
    {
      titulo: 'Los Beneficios de la Estatura',
      icono: '📏',
      contenido: 'Biológicamente, ser alto tiene la ventaja de mejorar el alcance físico y la termorregulación en climas cálidos. Sin embargo, estudios de longevidad muestran que las personas más bajas suelen vivir más años; al tener menos células, existe matemáticamente menor probabilidad de mutaciones celulares (cáncer) a lo largo del tiempo.'
    },
    {
      titulo: 'Tu Cabello es un Registro Fósil',
      icono: '🧬',
      contenido: 'El cabello guarda un historial exacto de lo que comes y bebes. El tipo de cabello (liso, rizado) se debe a la forma del folículo: si es redondo, el pelo sale liso; si es ovalado o asimétrico, el pelo se riza. Las poblaciones africanas desarrollaron pelo extremadamente rizado porque el espacio de aire entre los rizos actúa como un aire acondicionado natural contra el sol ardiente.'
    },
    {
      titulo: 'El Accidente del Queso',
      icono: '🧀',
      contenido: 'El queso no fue inventado, fue descubierto por accidente hace unos 8.000 años. Un nómada en el Medio Oriente guardó leche en una bolsa hecha del estómago de una oveja. Las enzimas naturales (cuajo) que aún quedaban en el estómago animal, sumadas al calor del desierto, cuajaron la leche, separando el suero del queso sólido. ¡Un error delicioso!'
    },
    {
      titulo: 'El Descubrimiento del Vino',
      icono: '🍷',
      contenido: 'La leyenda más antigua sobre el vino (Persia, actual Irán) cuenta que un rey guardó uvas en frascos, pero algunas se "echaron a perder" (fermentaron). Una mujer de la corte, sufriendo migrañas, bebió el jugo podrido para intentar suicidarse. En lugar de morir, se emborrachó, durmió profundamente y despertó curada. Así nació la vinicultura.'
    },
    {
      titulo: 'Nixtamalización: Sabiduría Indígena',
      icono: '🌽',
      contenido: 'Hace miles de años, las tribus mesoamericanas (como los Aztecas) descubrieron que si cocinaban el maíz con cenizas o cal (Nixtamalización), se volvía mucho más nutritivo. Hoy la ciencia sabe que este proceso libera la Vitamina B3 (Niacina) del maíz. Cuando los europeos se llevaron el maíz sin este secreto indígena, sufrieron epidemias de Pelagra (enfermedad por desnutrición).'
    },
    {
      titulo: 'La Sal como Moneda (Salario)',
      icono: '🧂',
      contenido: 'En la antigüedad, antes de la refrigeración, la sal era la única forma de conservar la carne, haciéndola más valiosa que el oro. Los soldados romanos a menudo recibían su pago en raciones de sal, llamado "salarium", de donde proviene nuestra palabra moderna "salario".'
    },
    {
      titulo: 'El fuego y el tamaño del cerebro',
      icono: '🔥',
      contenido: 'Nuestros ancestros tenían cerebros pequeños porque pasaban 8 horas al día masticando plantas y carne cruda para obtener calorías. Al descubrir el fuego y empezar a cocinar la comida, la digestión se hizo instantánea. Esa energía sobrante hizo que nuestro intestino se redujera y el cerebro humano duplicara su tamaño.'
    },
    {
      titulo: 'Tu estómago tiene "cerebro"',
      icono: '🦠',
      contenido: 'El intestino humano tiene más de 100 millones de neuronas (el sistema nervioso entérico). Por eso cuando te pones nervioso sientes "mariposas". Cuidar tu flora intestinal cura la ansiedad.'
    },
    {
      titulo: 'El sudor no huele',
      icono: '💧',
      contenido: 'El sudor fresco es completamente inodoro. El "mal olor" es creado cuando las bacterias de tu piel se alimentan de los lípidos y proteínas que sudas. Lo que comes determina a qué hueles.'
    },
    {
      titulo: 'Músculo = Longevidad',
      icono: '💪',
      contenido: 'La masa muscular es el tejido más activo metabólicamente. Actúa como un "sumidero" de glucosa. A mayor masa muscular, menor probabilidad de sufrir resistencia a la insulina o diabetes tipo 2.'
    },
    {
      titulo: 'Luz para dormir',
      icono: '☀️',
      contenido: 'El reloj biológico humano (ritmo circadiano) se resetea por los ojos. Ver el sol directo durante los primeros 20 min al despertar le indica a tu cerebro cuándo producir melatonina para dormir 14 horas después.'
    },
    {
      titulo: 'Hambre fantasma',
      icono: '👻',
      contenido: 'A menudo el cuerpo confunde la sed con el hambre. Si sientes un antojo repentino, bebe un vaso grande de agua con una pizca de sal y espera 15 minutos. El 80% de las veces, el "hambre" desaparecerá.'
    },
    {
      titulo: 'El Surco Subnasal (Filtrum)',
      icono: '👃',
      contenido: '¿Conoces la hendidura que tienes entre la nariz y el labio superior? Se llama Filtrum. Es el punto donde las partes de la cara se unen durante el desarrollo fetal. Carece de función en humanos, pero en los perros les ayuda a oler mejor.'
    },
    {
      titulo: 'La fresa no es una "fruta"',
      icono: '🍓',
      contenido: 'Botánicamente, la fresa no es una baya, sino un "receptáculo floral engrosado", y sus verdaderos frutos son las pepitas amarillas que la cubren. Irónicamente, el plátano y el aguacate SÍ son bayas.'
    },
    {
      titulo: 'El veneno de la manzana',
      icono: '🍎',
      contenido: 'Las semillas de la manzana (al igual que las de cerezas y duraznos) contienen Amigdalina, que al ser masticada se convierte en cianuro. Sin embargo, necesitarías masticar unas 200 semillas para que fuera letal.'
    },
    {
      titulo: 'Papas Verdes Tóxicas',
      icono: '🥔',
      contenido: 'Si una papa tiene tonos verdes o raíces brotadas, contiene Solanina, un mecanismo de defensa tóxico de la planta. Comerla puede causar severos problemas estomacales. Siempre debes pelar la parte verde.'
    },
    {
      titulo: 'Hígado: El Rey de los Nutrientes',
      icono: '🥩',
      contenido: 'El hígado de res o de pollo es el superalimento más denso del planeta. Contiene muchísimos más nutrientes que cualquier fruta o vegetal, ganándole por goleada a la espinaca.'
    },
    {
      titulo: 'Guayaba > Naranja',
      icono: '🍈',
      contenido: 'Se cree que la naranja es la reina de la Vitamina C, pero la Guayaba tiene hasta 4 veces más cantidad de esta vitamina, fortaleciendo el sistema inmune mucho más rápido y con menos acidez.'
    },
    {
      titulo: 'El truco de los hongos',
      icono: '🍄',
      contenido: 'Identificar un hongo comestible en la naturaleza es extremadamente difícil y requiere ser experto (micólogo). Como regla vital: NUNCA comas un hongo silvestre que tenga láminas blancas debajo del sombrero o un "anillo" en el tallo, pues muchos de estos son mortales.'
    },
    {
      titulo: 'Dientes más fuertes que el acero',
      icono: '🦷',
      contenido: 'El esmalte dental es la sustancia más dura del cuerpo humano, formada principalmente de calcio y fósforo. Increíblemente, es más duro que el acero, pero puede ser disuelto por los ácidos de las bacterias alimentadas por el azúcar.'
    },
    {
      titulo: 'La comida se saborea en el cerebro',
      icono: '👅',
      contenido: 'La lengua solo detecta 5 sabores básicos (dulce, salado, ácido, amargo y umami). El 80% de lo que consideras "sabor" es en realidad el OLOR de la comida subiendo a tu cerebro por la parte trasera de la garganta.'
    },
    {
      titulo: 'Tabaquera Anatómica',
      icono: '✋',
      contenido: 'Si extiendes el pulgar, en la base de la muñeca se forma una pequeña depresión triangular. Se llama "Tabaquera anatómica" porque hace siglos la gente ponía ahí el tabaco para inhalarlo. Por ahí pasa una arteria crucial.'
    },
    {
      titulo: 'Kiwi con todo y piel',
      icono: '🥝',
      contenido: 'La mayoría de las personas pelan el kiwi, pero su piel marrón y peluda es totalmente comestible y contiene 3 veces más fibra y muchísimos más antioxidantes que la pulpa interna. Solo lávalo bien.'
    },
    {
      titulo: 'El tomate es ovarios de flor',
      icono: '🍅',
      contenido: 'Botánicamente, cualquier cosa que contenga semillas y provenga de la flor de una planta es una fruta (ovarios maduros de la flor). Esto convierte al tomate, pepino, calabacín y berenjena en frutas.'
    },
    {
      titulo: 'Agua "cruda" en el desierto',
      icono: '🌵',
      contenido: 'Si te pierdes en el desierto, no debes cortar un cactus y beber su agua. El jugo de la mayoría de los cactus es altamente alcalino y causará vómitos que te deshidratarán más rápido. Solo el cactus de barril es seguro, y su sabor es horrible.'
    },
    {
      titulo: 'Huevos: Fecha de frescura natural',
      icono: '🥚',
      contenido: 'Para saber si un huevo está en buen estado, ponlo en un vaso de agua. Si se hunde horizontalmente, está muy fresco. Si flota en la superficie, está lleno de gas bacteriano y debes tirarlo a la basura de inmediato.'
    },
    {
      titulo: 'El Gasto Metabólico Basal',
      icono: '🔥',
      contenido: 'Tu cuerpo gema el 70% de sus calorías diarias simplemente manteniéndote vivo (respirando, latiendo el corazón, manteniendo el calor). Hacer ejercicio solo quema alrededor del 10 al 15% del total diario.'
    },
    {
      titulo: 'La mentira de las "zanahorias bebé"',
      icono: '🥕',
      contenido: 'Las famosas zanahorias baby no nacen así. Son zanahorias normales, feas o rotas que los agricultores cortan a máquina, pelan y pulen para venderlas más caras por su aspecto bonito.'
    },
    {
      titulo: 'La nuez moscada es alucinógena',
      icono: '🌰',
      contenido: 'En dosis culinarias la nuez moscada es deliciosa, pero consumir más de dos cucharadas enteras puede causar alucinaciones severas y envenenamiento debido a un compuesto llamado miristicina.'
    },
    {
      titulo: 'Miel eterna',
      icono: '🍯',
      contenido: 'La miel pura es el único alimento en el mundo que no caduca. Se han encontrado vasijas de miel en tumbas egipcias de hace más de 3.000 años que aún son perfectamente comestibles.'
    },
    {
      titulo: 'Alergia al Sol (Estornudo Fótico)',
      icono: '🤧',
      contenido: '¿Al salir al sol intenso tienes ganas de estornudar? Le pasa al 30% de la población. Se debe a un "cruce de cables" en el cerebro: el nervio óptico se sobrecarga por la luz y estimula por error al nervio trigémino, que controla los estornudos.'
    },
    {
      titulo: 'La chía te hidrata horas',
      icono: '💧',
      contenido: 'Las semillas de chía pueden absorber hasta 12 veces su peso en agua, creando un gel. Si las bebes antes de hacer ejercicio intenso, retendrán el agua en tu sistema digestivo, manteniéndote hidratado progresivamente.'
    },
    {
      titulo: 'Aguacate: La grasa perfecta',
      icono: '🥑',
      contenido: 'El aguacate (palta) es una de las pocas frutas que no contiene casi azúcar. Es rico en ácido oleico (el mismo del aceite de oliva), el cual apaga la inflamación en el cuerpo y ayuda a absorber las vitaminas del resto de tus vegetales.'
    },
    {
      titulo: 'Piel de serpiente humana',
      icono: '🐍',
      contenido: 'Los humanos "mudan" de piel constantemente. De hecho, gran parte del polvo que se acumula debajo de tu cama son células muertas de tu propia piel que caen mientras duermes.'
    },
    {
      titulo: 'Canela de verdad vs Falsa',
      icono: '🪵',
      contenido: 'La mayoría de la "canela" que compramos barata en el súper se llama "Cassia" y en altas dosis puede ser tóxica para el hígado (cumarina). La canela "Ceylon" (de Sri Lanka) es la única verdadera, curativa y segura a diario.'
    },
    {
      titulo: 'El músculo más fuerte',
      icono: '🥩',
      contenido: 'En relación a su tamaño, el músculo más fuerte del cuerpo humano no está en los brazos ni las piernas. Es el músculo Masetero, ubicado en la mandíbula, y puede cerrar los dientes con una fuerza de hasta 90 kg.'
    },
    {
      titulo: 'No todas las calorías son iguales',
      icono: '📊',
      contenido: 'Tu cuerpo gasta el 30% de las calorías de la Proteína simplemente intentando digerirla (Efecto Termogénico). En cambio, para digerir grasas y carbohidratos gasta menos del 10%. Por eso las dietas altas en proteína ayudan a definir.'
    },
    {
      titulo: 'Dientes de león comestibles',
      icono: '🌼',
      contenido: 'Esa maleza de flor amarilla que crece en las aceras ("Diente de león") es completamente comestible. Sus hojas son súper nutritivas en ensaladas, y sus raíces tostadas se usan para hacer una bebida sin cafeína similar al café.'
    },
    {
      titulo: 'El Apéndice sí sirve',
      icono: '🪱',
      contenido: 'Durante años se creyó que el apéndice era un órgano inútil. Hoy la ciencia sabe que es un "refugio de emergencia". Cuando tienes diarrea severa, el apéndice guarda bacterias buenas a salvo para repoblar tu intestino después.'
    },
    {
      titulo: 'Almendras tóxicas',
      icono: '🥜',
      contenido: 'Las almendras "amargas" silvestres contienen ácido prúsico (cianuro letal). Las almendras "dulces" que compramos han sido mutadas genéticamente hace miles de años por los agricultores para desactivar ese veneno.'
    },
    {
      titulo: 'El peinado de los intestinos',
      icono: '〰️',
      contenido: 'Tus intestinos miden unos 7 metros de largo. Si los extendieras y aplanaras todos los pliegues y vellosidades que tienen para absorber comida, cubrirían la superficie de una cancha de tenis entera.'
    },
    {
      titulo: 'Comer piña te come a ti',
      icono: '🍍',
      contenido: 'La piña fresca contiene Bromelina, una enzima que degrada las proteínas. Cuando comes piña y sientes que te "pica" la lengua, es literalmente la enzima de la piña digiriendo la carne de tu propia boca.'
    },
    {
      titulo: '⚠️ Nota de Seguridad y Responsabilidad',
      icono: '🛡️',
      contenido: 'Hemos adaptado tu plan considerando: <strong>${u.enfermedades.join(", ")}</strong>. La precisión de este plan depende de la veracidad de tus datos. El esfuerzo físico y los cambios dietéticos deben ser supervisados por un profesional si sientes molestias. <strong>Margen de error estimado en cálculos: +/- 10%.</strong>'
    }
  ],

  // ── Motor Médico: Adaptación de Menú ───────
  adaptarMenuPorCondiciones(menuBase, usuario) {
    if (!this._integrityCheck()) return { menu: menuBase, alertas: [] };
    // Clonación profunda para no modificar la base de datos original
    let menuAdaptado = JSON.parse(JSON.stringify(menuBase));
    let alertas = [];

    const dias = ['L','M','X','J','V','S','D'];
    const enf = usuario.enfermedades || [];
    const edad = usuario.edad;
    
    // ── Rotación Inteligente de Tés (7 días, sin repetición) ───────────────
    let snackBase = 'Puñado de nueces/almendras o 1 Fruta de temporada';

    // Banco de tés base por defecto (adulto sano)
    let tesPorDia = {
      L: 'Té Verde antioxidante',
      M: 'Flor de Jamaica (Hibisco — antioxidante)',
      X: 'Té de Manzanilla (digestivo y relajante)',
      J: 'Té Verde antioxidante',
      V: 'Infusión de Menta o Hierbabuena',
      S: 'Flor de Jamaica (Hibisco)',
      D: 'Té de Manzanilla (relajante para el descanso dominical)'
    };

    if (edad <= 12) {
      snackBase = 'Galletas integrales caseras o 1 Cambur/Plátano con crema de maní';
      tesPorDia = {
        L: 'Vaso de leche o bebida vegetal con cacao puro sin azúcar',
        M: 'Té de Manzanilla suave con miel (sin azúcar)',
        X: 'Vaso de leche o bebida vegetal con cacao puro sin azúcar',
        J: 'Infusión de Manzana y Canela (reconfortante)',
        V: 'Vaso de leche o bebida vegetal con cacao puro sin azúcar',
        S: 'Agua de frutas natural (sin azúcar añadida)',
        D: 'Té de Manzanilla suave (relajante)'
      };
      alertas.push("👶 <strong>Perfil Infantil:</strong> Los niños no deben tomar tés concentrados. Sus infusiones son suaves y nutritivas. No hay cafeína en ninguna opción.");
    } else if (edad >= 65) {
      snackBase = 'Compota de manzana casera o gelatina sin azúcar (Aporta colágeno)';
      tesPorDia = {
        L: 'Infusión de Romero (activa circulación cerebral y memoria)',
        M: 'Té de Tilo (calma el sistema nervioso, reduce la tensión arterial)',
        X: 'Infusión de Manzanilla con Miel (digestivo y antiinflamatorio suave)',
        J: 'Infusión de Romero (activa circulación cerebral y memoria)',
        V: 'Té de Cola de Caballo (diurético suave — apoya riñones y presión)',
        S: 'Té de Tilo (relajante, ideal antes del fin de semana de descanso)',
        D: 'Infusión de Manzanilla con Jengibre mínimo (digestivo del domingo)'
      };
      alertas.push("🧓 <strong>Perfil Adulto Mayor:</strong> Los tés rotan cada día para evitar acumulación de compuestos activos y posibles interacciones con medicamentos. Hemos adaptado la merienda para facilitar la digestión y aportar colágeno. Recuerda procesar (licuar o desmechar) las carnes si hay dificultad al masticar.");
    }

    if (enf.includes('gastritis')) {
      tesPorDia = {
        L: 'Infusión de Manzanilla (desinflama la mucosa gástrica)',
        M: 'Infusión de Llantén (protege el revestimiento del estómago)',
        X: 'Infusión de Manzanilla (desinflama la mucosa gástrica)',
        J: 'Agua de Avena fría (recubre y protege el estómago)',
        V: 'Infusión de Llantén (protege el revestimiento del estómago)',
        S: 'Infusión de Manzanilla suave',
        D: 'Agua tibia con jengibre mínimo (solo si no hay acidez activa)'
      };
      alertas.push("🔥 <strong>Gastritis:</strong> Sustituye cualquier cítrico (limón/naranja) del menú por papaya o lechosa. Elimina picantes, café y fritos. Los tés rotan entre manzanilla y llantén que son los más efectivos para curar la mucosa.");
      dias.forEach(d => {
        menuAdaptado[d] = menuAdaptado[d].map(comida => comida.replace(/limón/gi, 'papaya').replace(/naranja/gi, 'papaya'));
      });
    }

    if (enf.includes('anemia')) {
      tesPorDia.L = 'Infusión de Ortiga (rica en hierro biodisponible)';
      tesPorDia.X = 'Infusión de Ortiga (rica en hierro biodisponible)';
      tesPorDia.V = 'Infusión de Ortiga (rica en hierro biodisponible)';
      alertas.push("🩸 <strong>Anemia:</strong> La ortiga 3 días/semana aporta hierro. Agrega unas gotas de limón a todas las carnes y granos del menú. Los otros días alternamos tés seguros que no bloquean la absorción de hierro.");
    }

    if (enf.includes('artritis')) {
      // Jengibre+Cúrcuma SOLO 3 días (máx recomendado), el resto son tés igualmente antiinflamatorios pero más suaves
      tesPorDia.L = 'Té de Jengibre y Cúrcuma (antiinflamatorio — L,X,V)';
      tesPorDia.X = 'Té de Jengibre y Cúrcuma (antiinflamatorio — L,X,V)';
      tesPorDia.V = 'Té de Jengibre y Cúrcuma (antiinflamatorio — L,X,V)';
      tesPorDia.M = 'Infusión de Tilo o Manzanilla (descansa el sistema de los antiinflamatorios)';
      tesPorDia.J = 'Té de Cola de Caballo (diurético suave, reduce retención que empeora articulaciones)';
      tesPorDia.S = 'Agua con Cúrcuma + pizca de Pimienta Negra (sin jengibre — máximo beneficio cúrcuma)';
      tesPorDia.D = 'Infusión de Manzanilla (descanso articular del domingo)';
      alertas.push("🦴 <strong>Artritis:</strong> Jengibre+Cúrcuma máximo 3 días/semana — más días pueden interactuar con medicamentos anticoagulantes. Rotamos con infusiones igualmente antiinflamatorias el resto de días. Reduce al máximo el azúcar y harinas blancas: son el combustible de la inflamación articular.");
    }

    // Corrección especial: Artritis + Hipertensión en adulto mayor
    // El jengibre potencia los antihipertensivos → limitamos a 2 días y bajamos a jengibre mínimo
    if (enf.includes('artritis') && enf.includes('hipertension') && edad >= 60) {
      tesPorDia.L = 'Agua tibia con Cúrcuma + Pimienta Negra (sin jengibre — antiinflamatorio seguro para hipertensos)';
      tesPorDia.X = 'Té de Jengibre MUY SUAVE (solo 1 rodajita) + Cúrcuma (máx. 1-2x/semana con HTA)';
      tesPorDia.M = 'Flor de Jamaica/Hibisco sin azúcar (reduce presión arterial de forma natural — estudios clínicos)';
      tesPorDia.J = 'Infusión de Tilo (relajante, vasodilatador suave — ideal para hipertensión)';
      tesPorDia.V = 'Flor de Jamaica/Hibisco sin azúcar (efecto hipotensor comprobado)';
      tesPorDia.S = 'Agua con Cúrcuma + Pimienta Negra (antiinflamatorio sin efecto sobre presión)';
      tesPorDia.D = 'Infusión de Manzanilla (descanso total — ninguna interacción farmacológica)';
      alertas.push("⚠️ <strong>Artritis + Hipertensión (71 años):</strong> El Té de Jengibre diario fue eliminado del menú. El jengibre en exceso potencia los medicamentos antihipertensivos y puede causar hipotensión en adultos mayores. Reemplazado con: Hibisco (hipotensor natural comprobado), Tilo (relajante vascular), Cúrcuma+Pimienta (antiinflamatorio sin efecto sobre presión), y Jengibre MUY SUAVE solo 1 día/semana.");
    }

    // Insertar merienda con té rotativo en cada día
    dias.forEach(d => {
      const teDelDia = tesPorDia[d] || 'Agua de hierbas naturales';
      menuAdaptado[d].push(`Merienda: ${snackBase} + ${teDelDia}`);
    });

    // ── Aplicar Regionalización LATAM ──
    const regionalData = this.aplicarRegionalizacion(menuAdaptado, usuario.ubicacion);
    if (regionalData.aplicado) {
      alertas.push(regionalData.alerta);
    }

    // ── Refuerzo de Seguridad Nutricional ──
    const alertasRefuerzo = [
      "⚠️ Los resultados pueden variar según tu genética y compromiso personal.",
      "⚠️ Este plan es una guía nutricional, no un tratamiento médico.",
      "⚠️ Verifica siempre los ingredientes si tienes alergias no declaradas."
    ];
    alertas.push(...alertasRefuerzo);

    return { menu: menuAdaptado, alertas };
  },

  aplicarRegionalizacion(menu, ubicacionStr) {
    if (!this._integrityCheck()) return { aplicado: false, alerta: '' };
    const region = this.detectarRegion(ubicacionStr);
    let aplicado = false;
    let alerta = '';

    const reemplazos = {
      mexico: [
        { regex: /pan/gi, nuevo: 'tortillas de maíz / nopal' },
        { regex: /arepa/gi, nuevo: 'tortilla de maíz' },
        { regex: /frijoles/gi, nuevo: 'frijoles negros enteros' },
        { regex: /vegetales/gi, nuevo: 'pico de gallo y aguacate' }
      ],
      colombia: [
        { regex: /pan/gi, nuevo: 'arepa de maíz pelado' },
        { regex: /fruta/gi, nuevo: 'lulo, guayaba o maracuyá' },
        { regex: /té verde/gi, nuevo: 'tinto (café negro)' }
      ],
      'Argentina/Uruguay': [
        { regex: /té verde/gi, nuevo: 'mate' },
        { regex: /flor de jamaica/gi, nuevo: 'mate' },
        { regex: /frijoles/gi, nuevo: 'lentejas' },
        { regex: /caraotas/gi, nuevo: 'lentejas' },
        { regex: /pollo/gi, nuevo: 'corte magro de carne' }
      ],
      'Perú': [
        { regex: /arroz/gi, nuevo: 'quinua' },
        { regex: /papa/gi, nuevo: 'camote' },
        { regex: /batata/gi, nuevo: 'camote' }
      ],
      'Venezuela': [
        { regex: /pan/gi, nuevo: 'arepa asada o casabe' },
        { regex: /frijoles/gi, nuevo: 'caraotas negras' },
        { regex: /papaya/gi, nuevo: 'lechosa' }
      ],
      'Chile': [
        { regex: /aguacate/gi, nuevo: 'palta' },
        { regex: /vegetales/gi, nuevo: 'cochayuyo o ensalada verde' },
        { regex: /fruta/gi, nuevo: 'arándanos o frutos rojos' }
      ],
      'Ecuador': [
        { regex: /pan/gi, nuevo: 'bolón de verde asado o muchín' },
        { regex: /frijoles/gi, nuevo: 'chochos' },
        { regex: /arroz/gi, nuevo: 'quinua' }
      ],
      'Bolivia': [
        { regex: /arroz/gi, nuevo: 'quinua o amaranto' },
        { regex: /papa/gi, nuevo: 'chuño' },
        { regex: /carne/gi, nuevo: 'carne de llama magra o pollo' }
      ],
      'Paraguay': [
        { regex: /yuca/gi, nuevo: 'mandioca' },
        { regex: /té verde/gi, nuevo: 'tereré o mate' },
        { regex: /frijoles/gi, nuevo: 'porotos' }
      ],
      'Brasil': [
        { regex: /fruta/gi, nuevo: 'açaí (sin azúcar) o papaya' },
        { regex: /pan/gi, nuevo: 'tapioca (porción moderada)' },
        { regex: /frijoles/gi, nuevo: 'feijão (frijoles pintos/negros)' },
        { regex: /nueces/gi, nuevo: 'castañas de cajú o de Brasil' }
      ],
      'Cuba': [
        { regex: /frijoles/gi, nuevo: 'frijoles negros' },
        { regex: /papa/gi, nuevo: 'yuca o plátano vianda' },
        { regex: /fruta/gi, nuevo: 'guayaba o mamey' }
      ],
      'Rep. Dominicana': [
        { regex: /pan/gi, nuevo: 'mangú de plátano verde' },
        { regex: /frijoles/gi, nuevo: 'guandules' },
        { regex: /papa/gi, nuevo: 'batata' }
      ],
      'Puerto Rico': [
        { regex: /papa/gi, nuevo: 'viandas (yuca, yautía)' },
        { regex: /frijoles/gi, nuevo: 'gandules' }
      ],
      'Centroamérica': [
        { regex: /pan/gi, nuevo: 'tortillas de maíz o plátano' },
        { regex: /arroz.*frijoles/gi, nuevo: 'gallo pinto / casamiento' },
        { regex: /frijoles/gi, nuevo: 'frijoles volteados (sin manteca)' }
      ]
    };

    if (reemplazos[region]) {
      aplicado = true;
      alerta = `🌎 <strong>Adaptación Regional (${region}):</strong> Hemos detectado tu ubicación y adaptado el menú para promover alimentos autóctonos (ej. sustituyendo genéricos por equivalentes locales altamente nutritivos y accesibles).`;
      
      const dias = ['L','M','X','J','V','S','D'];
      const reglas = reemplazos[region];

      dias.forEach(d => {
        menu[d] = menu[d].map(comida => {
          let nuevaComida = comida;
          reglas.forEach(r => {
            nuevaComida = nuevaComida.replace(r.regex, r.nuevo);
          });
          return nuevaComida;
        });
      });
    }

    return { aplicado, alerta };
  },

  // ── Motor de Precios Dinámicos (PPP) ───────
  getPrecioRegional(region) {
    if (!this._integrityCheck()) return { monto: 35, moneda: 'USD', tier: 'Global' };

    const tiers = {
      venezuela: { monto: 2.50, moneda: 'USD', tier: 'Solidario' },
      cuba: { monto: 2.50, moneda: 'USD', tier: 'Solidario' },
      argentina: { monto: 4.99, moneda: 'USD', tier: 'Ajustado' },
      colombia: { monto: 9.90, moneda: 'USD', tier: 'Regional' },
      peru: { monto: 9.90, moneda: 'USD', tier: 'Regional' },
      mexico: { monto: 12.00, moneda: 'USD', tier: 'Regional Plus' },
      chile: { monto: 12.00, moneda: 'USD', tier: 'Regional Plus' },
      espana: { monto: 29.90, moneda: 'EUR', tier: 'Premium EU' },
      usa: { monto: 34.90, moneda: 'USD', tier: 'Global Premium' }
    };

    return tiers[region] || { monto: 34.90, moneda: 'USD', tier: 'Global' };
  }

};
