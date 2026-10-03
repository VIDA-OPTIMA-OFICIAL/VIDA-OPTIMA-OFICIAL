/**
 * ============================================================
 * VIDA ÓPTIMA — Renderizado de Módulos UI (modules.js)
 * ============================================================
 * @author      Terry Edicson Romero Loreto
 * @id          20.264.887
 * @copyright   © 2025 Terry Edicson Romero Loreto. Todos los derechos reservados.
 * @license     Propiedad Intelectual Protegida — Prohibida su 
 *              reproducción, copia o uso sin autorización.
 * ------------------------------------------------------------
 * Este archivo gestiona la lógica de interfaz y visualización,
 * propiedad exclusiva del autor.
 * ============================================================
 */

// ═══════════════════════════════════════════
// VIDA ÓPTIMA — Renderizado de Módulos
// ═══════════════════════════════════════════

const Modules = {

  showPrivacyPolicy() {
    alert(`POLÍTICA DE PRIVACIDAD INTERNACIONAL - VIDA ÓPTIMA\n\n` +
      `1. DATOS QUE RECOPILAMOS: Información biométrica (peso, edad, sexo) y de estilo de vida para personalizar su plan.\n\n` +
      `2. FINALIDAD: Mejora del bienestar y educación nutricional.\n\n` +
      `3. SUS DERECHOS (GDPR/CCPA):\n` +
      `   - Derecho al Acceso: Puede ver sus datos en el perfil.\n` +
      `   - Derecho al Olvido: Puede eliminar su cuenta permanentemente desde el perfil.\n` +
      `   - Portabilidad: Sus datos están sincronizados en Google Cloud.\n\n` +
      `4. SEGURIDAD: Usamos Firebase (Google Cloud) con cifrado SSL de extremo a extremo.\n\n` +
      `5. COOKIES: Usamos almacenamiento local para mantener su sesión activa.`);
  },

  renderAuth() {
    return `
      <div class="module" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; text-align: center;">
        <div style="margin-bottom: 30px;">
          <img src="icon.png" style="width: 80px; height: 80px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,243,255,0.2);">
          <h1 style="font-size: 28px; margin-top: 15px;">Bienvenido a <span style="color: var(--primary);">Vida Óptima</span></h1>
          <p style="color: var(--text2);">Inicia sesión para sincronizar tu progreso biológico en la nube.</p>
        </div>

        <div class="card" style="width: 100%; max-width: 400px; padding: 30px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 20px;">
          <div class="form-group" style="margin-bottom: 20px;">
            <label style="display: block; text-align: left; margin-bottom: 8px; font-size: 11px; color: var(--text3); letter-spacing: 1px;">CORREO ELECTRÓNICO</label>
            <input type="email" id="auth-email" placeholder="tu@email.com" style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text); padding: 12px; border-radius: 8px;">
          </div>
          <div class="form-group" style="margin-bottom: 25px;">
            <label style="display: block; text-align: left; margin-bottom: 8px; font-size: 11px; color: var(--text3); letter-spacing: 1px;">CONTRASEÑA</label>
            <input type="password" id="auth-pass" placeholder="••••••••" style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text); padding: 12px; border-radius: 8px;">
          </div>
          
          <button class="btn-primary" style="width: 100%; margin-bottom: 12px; padding: 15px;" onclick="handleAuth('login')">ENTRAR AL SISTEMA</button>
          
          <button class="btn-secondary" style="width: 100%; padding: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 10px; background: white; color: #000; border: none;" onclick="handleAuth('google')">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width: 18px;"> Continuar con Google
          </button>

          <button style="width: 100%; padding: 10px; background: transparent; border: none; color: var(--text3); font-size: 12px; cursor: pointer; text-decoration: underline;" onclick="handleAuth('signup')">Crear cuenta con correo</button>
          
          <div id="auth-error" style="color: var(--red); font-size: 13px; margin-top: 15px; display: none; background: rgba(255,0,0,0.1); padding: 10px; border-radius: 5px;"></div>
        </div>
        
        <p style="margin-top: 30px; font-size: 12px; color: var(--text3);">🔒 Datos cifrados con Google Cloud Security.</p>
      </div>
    `;
  },
  
  // ── 1. Perfil ─────────────────────────────
  renderPerfil(u) {
    const imc = Engine.calcIMC(u.peso, u.estatura);
    const clasIMC = Engine.clasificarIMC(imc);
    
    // Priorizar datos del servidor si están sincronizados
    const kcal = u.isSynced ? u.kcal : Engine.ajustarCalorias(Engine.calcCalorias(u.peso, u.estatura, u.edad, u.sexo, u.actividad), u.objetivos);
    const macros = u.isSynced ? u.macros : Engine.calcMacros(kcal, u.objetivos);
    const perfilNombre = (u.isSynced && u.perfil ? u.perfil : Engine.detectarPerfil(u.edad, u.sexo)).replace('_',' ').toUpperCase();

    // Calcular días de prueba restantes
    const trialDaysUsed = Math.floor((new Date() - new Date(u.trialStartDate)) / (1000 * 60 * 60 * 24));
    const trialRemaining = Math.max(0, 30 - trialDaysUsed);
    const trialBadge = !u.isPremium ? `
      <div style="background: rgba(255, 152, 0, 0.1); border: 1px solid #FF9800; color: #FF9800; padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; margin-bottom: 15px;">
        ⏳ PRUEBA GRATIS: ${trialRemaining} DÍAS RESTANTES
      </div>
    ` : `
      <div style="background: rgba(46, 204, 113, 0.1); border: 1px solid #2ECC71; color: #2ECC71; padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; margin-bottom: 15px;">
        💎 MIEMBRO PREMIUM (${u.subscriptionType === 'annual' ? 'ANUAL' : 'MENSUAL'})
      </div>
    `;

    const certifiedBadge = u.isSynced ? `
      <div style="background: rgba(50, 150, 255, 0.1); border: 1px solid #3296FF; color: #3296FF; padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; margin-bottom: 15px;">
        ✅ DATOS CERTIFICADOS POR VIDA ÓPTIMA
      </div>
    ` : '';

    return `
      <div class="module">
        <div class="module-header">
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            ${certifiedBadge}
            ${trialBadge}
          </div>
          <h1>Tu Biometría, ${u.nombre}</h1>
          <p class="desc">Este es el análisis base de tu estado actual según los datos proporcionados.</p>
        </div>

        <div class="profile-stats">
          <div class="stat-box" style="background: linear-gradient(135deg, #FF9800, #F44336); color: white; border: none;">
            <div class="stat-value">🔥 ${u.streak || 1}</div>
            <div class="stat-label">Racha (Días)</div>
          </div>
          <div class="stat-box" style="background: linear-gradient(135deg, #FFD700, #FFA000); color: white; border: none;">
            <div class="stat-value">💎 ${u.coins || 0}</div>
            <div class="stat-label">Optimal Coins</div>
          </div>
          <div class="stat-box" onclick="openInfoModal('Edad Biológica', 'edad')" style="cursor:pointer;"><div class="stat-value">${u.edad}</div><div class="stat-label">Años ℹ️</div></div>
          <div class="stat-box" onclick="openInfoModal('Peso Corporal', 'peso')" style="cursor:pointer;"><div class="stat-value">${u.peso}</div><div class="stat-label">Kg ℹ️</div></div>
          <div class="stat-box" onclick="openInfoModal('Índice de Masa Corporal', 'imc')" style="cursor:pointer;"><div class="stat-value">${imc}</div><div class="stat-label">IMC (${clasIMC.label}) ℹ️</div></div>
          <div class="stat-box" onclick="openInfoModal('Calorías Diarias', 'kcal')" style="cursor:pointer;"><div class="stat-value">${kcal}</div><div class="stat-label">Kcal Diarias ℹ️</div></div>
          <div class="stat-box" onclick="openInfoModal('Perfil Metabólico', 'perfil')" style="cursor:pointer;"><div class="stat-value">${perfilNombre}</div><div class="stat-label">Perfil Metabólico ℹ️</div></div>
        </div>

        <div class="section-title">Distribución de Macronutrientes Diarios</div>
        <div class="card-grid">
          <div class="card" onclick="openInfoModal('Proteínas', 'proteinas')" style="cursor:pointer;">
            <div class="card-icon">🥩</div>
            <h3>Proteínas (${macros.proteinas}g) ℹ️</h3>
            <p>Esenciales para la reparación muscular y el sistema inmunológico.</p>
          </div>
          <div class="card" onclick="openInfoModal('Carbohidratos', 'carbos')" style="cursor:pointer;">
            <div class="card-icon">🍚</div>
            <h3>Carbohidratos (${macros.carbos}g) ℹ️</h3>
            <p>Energía principal para el cerebro y la actividad física.</p>
          </div>
          <div class="card" onclick="openInfoModal('Grasas Saludables', 'grasas')" style="cursor:pointer;">
            <div class="card-icon">🥑</div>
            <h3>Grasas Saludables (${macros.grasas}g) ℹ️</h3>
            <p>Regulación hormonal y absorción de vitaminas.</p>
          </div>
        </div>

        <!-- ═══ HIDRATACIÓN DINÁMICA DEL CEREBRO ENGINE ═══ -->
        ${u.diagnostico && u.diagnostico.agua_diaria_ml ? `
        <div style="margin-bottom: 20px; background: linear-gradient(135deg, rgba(0,150,255,0.1), rgba(0,243,255,0.05)); border: 1px solid rgba(0,150,255,0.4); border-radius: 14px; padding: 20px; display:flex; align-items:center; gap:16px;">
          <div style="font-size:40px; flex-shrink:0;">💧</div>
          <div>
            <div style="font-size:12px; color:var(--text3); text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">Requerimiento Hídrico Diario (35ml × ${u.peso || '?'} kg)</div>
            <div style="font-size:28px; font-weight:900; color:var(--primary);">${u.diagnostico.agua_diaria_ml.toLocaleString()} <span style="font-size:16px;">ml</span></div>
            <div style="font-size:13px; color:var(--text2); margin-top:4px;">≈ ${Math.round(u.diagnostico.agua_diaria_ml / 250)} vasos de 250ml &bull; Distribuidos cada 2 horas</div>
          </div>
        </div>` : ''}

        <!-- ═══ ALERTAS CLÍNICAS DEL CEREBRO ENGINE ═══ -->
        ${u.alertas && u.alertas.length > 0 ? u.alertas.map(a => `
        <div class="alert-box ${a.includes('⚠️') ? 'warning' : 'danger'}" style="margin-bottom: 12px; border-left: 4px solid ${a.includes('⚠️') ? '#FF9800' : a.includes('🔥') ? '#f55' : '#a855f7'}; font-size: 14px; line-height: 1.6;">
          ${a}
        </div>`).join('') : ''}

        <!-- ═══ EXÁMENES MÉDICOS RECOMENDADOS ═══ -->
        ${u.examenesMedicos && u.examenesMedicos.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <div class="section-title" style="margin-bottom: 16px;">🩺 Exámenes Médicos Recomendados para Ti</div>
          <p style="font-size: 13px; color: var(--text2); margin-bottom: 14px;">Basados en tu edad, sexo, etnicidad y condiciones detectadas. Muéstraselos a tu médico en tu próxima consulta.</p>
          <div style="overflow-x: auto;">
            <table style="width:100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="background: rgba(var(--primary-rgb), 0.1); text-align:left;">
                  <th style="padding: 10px 14px; color: var(--text3); font-weight:700; text-transform:uppercase; font-size:11px; letter-spacing:0.8px; border-bottom: 1px solid var(--border);">🔬 Examen</th>
                  <th style="padding: 10px 14px; color: var(--text3); font-weight:700; text-transform:uppercase; font-size:11px; letter-spacing:0.8px; border-bottom: 1px solid var(--border);">📅 Frecuencia</th>
                  <th style="padding: 10px 14px; color: var(--text3); font-weight:700; text-transform:uppercase; font-size:11px; letter-spacing:0.8px; border-bottom: 1px solid var(--border);">🎯 Propósito Clínico</th>
                </tr>
              </thead>
              <tbody>
                ${u.examenesMedicos.map((ex, idx) => `
                <tr style="background: ${idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)'}; border-bottom: 1px solid var(--border);">
                  <td style="padding: 10px 14px; font-weight:600; color: var(--text);">${ex.nombre}</td>
                  <td style="padding: 10px 14px; color: var(--primary); font-weight:500; white-space:nowrap;">${ex.frecuencia}</td>
                  <td style="padding: 10px 14px; color: var(--text2); line-height:1.5;">${ex.proposito}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>` : ''}

        <div class="alert-box warning">
          <h4>⚠️ Nota de Seguridad y Responsabilidad</h4>
          <p>Hemos adaptado tu plan considerando: <strong>${u.enfermedades && u.enfermedades.length > 0 ? u.enfermedades.join(', ') : 'Salud General'}</strong>. La precisión de este plan depende de la veracidad de tus datos. El esfuerzo físico y los cambios dietéticos deben ser supervisados por un profesional si sientes molestias. <strong>Margen de error estimado en cálculos: +/- 10%.</strong></p>
        </div>

        <div class="section-title" style="margin-top: 40px;">Editar Datos Dinámicos</div>
        <p class="desc" style="margin-bottom: 20px;">Si tu situación financiera o de tiempo cambia, actualízalo aquí y tu menú y rutinas se adaptarán automáticamente.</p>
        
        <div class="form-grid" style="background: var(--surface); padding: 20px; border-radius: 12px; border: 1px solid var(--border);">
          <div class="form-group full">
            <label>Ingreso mensual (USD)</label>
            <input type="number" id="editIngreso" value="${Math.max(u.ingreso||0,60)}" min="60" oninput="if(+this.value<60&&this.value!='')this.value=60" />
          </div>
          <div class="form-group full">
            <label>Presupuesto quincenal alimentación (USD)</label>
            <input type="number" id="editPresupuesto" value="${Math.max(u.presupuesto||0,30)}" min="30" oninput="if(+this.value<30&&this.value!='')this.value=30" />
          </div>
          <div class="form-group full">
            <label>Nivel de actividad física</label>
            <select id="editActividad">
              <option value="sedentario" ${u.actividad === 'sedentario' ? 'selected' : ''}>Sedentario (poco o nada de ejercicio)</option>
              <option value="ligero" ${u.actividad === 'ligero' ? 'selected' : ''}>Ligero (camino o me muevo algo)</option>
              <option value="moderado" ${u.actividad === 'moderado' ? 'selected' : ''}>Moderado (ejercicio 2-3 veces/semana)</option>
              <option value="activo" ${u.actividad === 'activo' ? 'selected' : ''}>Activo (ejercicio 4-5 veces/semana)</option>
              <option value="muy_activo" ${u.actividad === 'muy_activo' ? 'selected' : ''}>Muy activo (deportista / trabajo físico)</option>
            </select>
          </div>
          <div class="form-group full">
            <label>Tiempo diario para ejercicio (minutos)</label>
            <select id="editTiempo">
              <option value="15" ${u.tiempoEjercicio == '15' ? 'selected' : ''}>Solo 15 minutos</option>
              <option value="30" ${u.tiempoEjercicio == '30' ? 'selected' : ''}>30 minutos</option>
              <option value="45" ${u.tiempoEjercicio == '45' ? 'selected' : ''}>45 minutos</option>
              <option value="60" ${u.tiempoEjercicio == '60' ? 'selected' : ''}>1 hora</option>
              <option value="90" ${u.tiempoEjercicio == '90' ? 'selected' : ''}>Más de 1 hora</option>
            </select>
          </div>
          <div class="form-group full" style="margin-top: 10px;">
            <button class="btn-primary" onclick="updateProfile()">Guardar Cambios</button>
            <span id="saveStatus" style="margin-left: 15px; color: var(--primary); font-weight: 500; display: none;">¡Actualizado! ✔️</span>
            
            <div id="saveInstructions" style="margin-top: 20px; padding: 15px; background: rgba(var(--primary-rgb), 0.1); border-radius: 8px; border-left: 4px solid var(--primary); display: flex; align-items: center; gap: 12px; animation: fadeIn 0.5s ease;">
              <div style="font-size: 24px;">💡</div>
              <p style="margin: 0; font-size: 14px; color: var(--text); line-height: 1.4;">
                <strong>¡Datos guardados!</strong> Ahora, abre el <strong>panel lateral</strong> (en las 3 rayas horizontales ☰ arriba a la derecha si estás en móvil) para revisar tu menú y tus instrucciones para vivir 100 años.
              </p>
            </div>

            <!-- GANCHO DE NEGOCIO: Sincronización Biológica -->
            <div class="alert-box" style="background: rgba(var(--primary-rgb), 0.05); border: 1px dashed var(--primary); margin-top: 30px; padding: 20px;">
              <h4 style="color: var(--primary); font-size: 15px; margin-bottom: 8px; display:flex; align-items:center; gap:8px;">🧬 Sincronización Biológica Activa</h4>
              <p style="font-size: 13px; color: var(--text2); line-height: 1.5; margin:0;">
                Tu plan se adapta a ti en tiempo real. Mantener tus datos actualizados cada lunes garantiza que el algoritmo de <strong>Vida Óptima</strong> recalibre tus porciones y rutinas con precisión milimétrica. No te conformes con resultados lentos; mantén tu perfil sincronizado.
              </p>
            </div>

            <!-- Sección de Membresía Regional (PPP) -->
            <div style="margin-top: 30px; border-top: 1px solid var(--border); padding-top: 25px;">
              <h3 style="font-size: 16px; margin-bottom: 15px;">💎 Membresía Vida Óptima Premium</h3>
              <div style="background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(168,85,247,0.1)); border: 1px solid var(--border); border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-size: 12px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px;">Precio Local (${Engine.getPrecioRegional(Engine.detectarRegion(u.ubicacion)).tier})</div>
                  <div style="font-size: 28px; font-weight: 900; color: var(--primary);">${Engine.getPrecioRegional(Engine.detectarRegion(u.ubicacion)).monto} <span style="font-size: 16px;">${Engine.getPrecioRegional(Engine.detectarRegion(u.ubicacion)).moneda}/mes</span></div>
                  <p style="font-size: 11px; color: var(--text2); margin-top: 5px;">* Primer mes gratis. Cancela cuando quieras.</p>
                </div>
                <button class="btn-primary" style="background: var(--text); color: var(--bg); font-size: 12px; padding: 10px 15px;" onclick="openCryptoPayment()">Activar Premium →</button>
              </div>
            </div>
          </div>
          <!-- Opciones de Cuenta -->
          <div style="margin-top: 40px; text-align: center; border-top: 1px solid var(--border); padding-top: 20px; display: flex; flex-direction: column; gap: 12px; align-items: center;">
            <button style="font-size: 11px; opacity: 0.5; border: none; background: transparent; color: var(--text3); cursor: pointer;" onclick="logout()">
              🚪 CERRAR SESIÓN SEGURA
            </button>
            <button style="font-size: 10px; opacity: 0.3; border: none; background: transparent; color: var(--text3); cursor: pointer; text-decoration: underline;" onclick="Modules.showPrivacyPolicy()">
              Ver Política de Privacidad Internacional
            </button>
            <button style="font-size: 10px; opacity: 0.3; border: none; background: transparent; color: var(--red); cursor: pointer; text-decoration: underline;" onclick="deleteAccount()">
              Eliminar mi cuenta y mis datos permanentemente
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // ── 2. Menú (Lógica de 7 Días Estática) ────
  renderMenu(u) {
    const pres = parseFloat(u.presupuesto) || 0;
    const menuType = window.currentMenuType || (pres > 80 ? 'default_premium' : (pres > 40 ? 'default_q1' : 'default_econ'));
    window.currentMenuType = menuType;

    const menuBase = Engine.getMenuSemana(menuType, window.menuWeekOffset || 0, u);
    const { menu, alertas } = Engine.adaptarMenuPorCondiciones(menuBase, u);
    
    // Lógica de Semanas (Lunes a Domingo Estático)
    window.menuWeekOffset = window.menuWeekOffset || 0; 
    
    const today = new Date();
    const currentDayIdx = today.getDay(); 
    const diffToMonday = currentDayIdx === 0 ? -6 : 1 - currentDayIdx;
    
    const mondayOfCurrentWeek = new Date(today);
    mondayOfCurrentWeek.setDate(today.getDate() + diffToMonday);
    mondayOfCurrentWeek.setHours(0,0,0,0);

    const targetWeekMonday = new Date(mondayOfCurrentWeek);
    targetWeekMonday.setDate(mondayOfCurrentWeek.getDate() + (window.menuWeekOffset * 7));

    const dayKeys = ['L','M','X','J','V','S','D'];
    const dayNames = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

    let alertsHtml = alertas.map(a => `<div class="alert-box success" style="margin-bottom: 10px; background: rgba(50, 150, 255, 0.05); border-left: 3px solid #3296FF; font-size: 13px;">✅ ${a}</div>`).join('');

    return `
      <div class="module">
        <div class="module-header">
          <span class="module-badge badge-green">Nutrición de Longevidad</span>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <h1>Tu Manual de Alimentación</h1>
            <button onclick="window.print()" class="btn-primary" style="padding: 8px 15px; font-size:12px;">📥 Descargar PDF</button>
          </div>
          <p class="desc">Planificación de 7 días diseñada para optimizar tu química interna y longevidad.</p>
        </div>

        ${alertsHtml}

        <!-- GANCHO DE NEGOCIO: Recalibración Semanal -->
        <div class="alert-box info" style="margin-bottom: 25px; background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(0,0,0,0) 100%); border-left: 4px solid var(--primary); padding: 20px; position:relative; overflow:hidden;">
          <div style="position:absolute; right:-10px; top:-10px; font-size:60px; opacity:0.05; transform: rotate(15deg);">⚖️</div>
          <h4 style="color: var(--primary); margin-bottom: 8px; display:flex; align-items:center; gap:8px;">
            🚀 Optimización de Resultados en Marcha
          </h4>
          <p style="font-size: 14px; color: var(--text); line-height: 1.5; margin:0; max-width: 85%;">
            Tu cuerpo cambia cada 7 días. Para que tu <strong>química nutricional</strong> siga siendo 100% precisa y no pierdas ni un gramo de progreso, recuerda <strong>actualizar tu peso y presupuesto cada lunes</strong> en tu perfil. 
            <br><span style="color: var(--primary); font-weight: 700; cursor:pointer;" onclick="showModule('perfil')">Actualizar mi biometría ahora →</span>
          </p>
        </div>

        <div class="toggle-row" style="margin-bottom: 25px;">
          <button class="toggle-btn ${window.menuWeekOffset === 0 ? 'active' : ''}" onclick="window.menuWeekOffset=0; showModule('menu')">ESTA SEMANA</button>
          <button class="toggle-btn ${window.menuWeekOffset === 1 ? 'active' : ''}" onclick="window.menuWeekOffset=1; showModule('menu')">PRÓXIMA SEMANA 📅</button>
        </div>

        <div class="week-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
          ${dayKeys.map((key, i) => {
            const date = new Date(targetWeekMonday);
            date.setDate(targetWeekMonday.getDate() + i);
            const isToday = date.toDateString() === today.toDateString();
            const dateStr = date.toISOString().split('T')[0];
            
            const meals = [
              { id: 'desayuno', name: 'Desayuno', content: menu[key][0], icon: '🍳' },
              { id: 'almuerzo', name: 'Almuerzo', content: menu[key][1], icon: '🍗' },
              { id: 'merienda', name: 'Merienda', content: menu[key][2], icon: '🍎' },
              { id: 'cena', name: 'Cena', content: menu[key][3], icon: '🌙' }
            ];

            return `
              <div class="day-col ${isToday ? 'today-active' : ''}" style="${isToday ? 'border: 2px solid var(--primary); box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.3);' : ''} background: rgba(255,255,255,0.02); padding: 15px; border-radius: 12px;">
                <div style="display:flex; justify-content:space-between; margin-bottom: 15px; border-bottom: 1px solid var(--border); padding-bottom: 8px;">
                  <span style="font-weight: 800; color: ${isToday ? 'var(--primary)' : 'var(--text)'};">${dayNames[i].toUpperCase()}</span>
                  <span style="font-size: 12px; color: var(--text3);">${date.getDate()}/${date.getMonth()+1}</span>
                </div>
                
                ${meals.map(m => {
                  const sub = Engine.obtenerSustituto(m.content, u);
                  const displayContent = sub ? sub.nuevo : m.content;
                  const keyId = `${dateStr}_${m.id}`;
                  const isDone = u.historial && u.historial[keyId] === true;

                  return `
                    <div class="meal-item" style="margin-bottom: 15px; position:relative; padding-left: 35px;">
                      <div class="task-check ${isDone ? 'checked' : ''}" onclick="toggleTaskStatus('${dateStr}', '${m.id}', this)" style="position:absolute; left:0; top:4px;">${isDone ? '✓' : '○'}</div>
                      <div style="font-size: 11px; color: var(--text3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">${m.icon} ${m.name}</div>
                      <div style="font-size: 15px; color: var(--text); line-height: 1.5; cursor:pointer; font-weight: 500;" onclick="openMealModal('${displayContent}')">
                        ${displayContent}
                        ${sub ? `<br><span style="font-size: 12px; color: var(--yellow); font-weight: 400;">🔄 Sustitución: ${sub.razon}</span>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `;
          }).join('')}
        </div>

        <div class="alert-box info" style="margin-top: 30px; background: rgba(255,255,255,0.02);">
          <h4>⚖️ Descargo de Responsabilidad Logística</h4>
          <p style="font-size: 12px; color: var(--text2);">Vida Óptima actúa como un canal de inteligencia nutricional. No tenemos control sobre la frescura o calidad de los alimentos que adquieras en mercados externos. Nuestra misión es guiarte, pero la ejecución y selección de insumos es responsabilidad del usuario.</p>
        </div>
      </div>
    `;
  },

  // ── 2.5 Progreso / Estadísticas ─────────
  renderProgreso(u) {
    let html = `
      <div class="module" style="background: #0a0e17; border-color: #1a253a;">
        <div class="module-header" style="border-bottom: 1px solid rgba(0, 243, 255, 0.2);">
          <span class="module-badge" style="background: rgba(0, 243, 255, 0.1); color: #00f3ff; border: 1px solid #00f3ff;">BIOMETRÍA Y DIAGNÓSTICO</span>
          <h1 style="color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.3);">Escaneo de Progreso Metabólico</h1>
          <p class="desc" style="color: #8fa3c0;">Monitor en tiempo real. Análisis probabilístico de longevidad y prevención de patologías basado en adherencia nutricional.</p>
        </div>
    `;

    if (!u.historial || Object.keys(u.historial).length === 0) {
      return html + `
        <div style="text-align:center; padding: 60px 20px; border: 1px dashed #00f3ff; margin-top: 20px; background: rgba(0, 243, 255, 0.02);">
          <div style="font-size: 40px; margin-bottom: 15px; color: #00f3ff; text-shadow: 0 0 15px #00f3ff;">⚡</div>
          <h3 style="color: #fff;">Calibración Pendiente</h3>
          <p style="color: #8fa3c0;">El escáner requiere datos. Ve a tu <strong>Menú</strong> o <strong>Rutina</strong> y marca (✓) las acciones completadas para iniciar la simulación biológica.</p>
        </div>
      </div>`;
    }

    let totalTasks = 0;
    let completed = 0;
    let failed = 0;

    Object.values(u.historial).forEach(val => {
      totalTasks++;
      if (val === true) completed++;
      if (val === false) failed++;
    });

    const successRate = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
    const failRate = totalTasks > 0 ? Math.round((failed / totalTasks) * 100) : 0;

    const isMale = (u.sexo || 'masculino').toLowerCase() === 'masculino';
    const uiColor = isMale ? '#00f3ff' : '#ff007f'; 
    const dangerColor = '#ff3333';
    
    // Cálculos ficticios pero lógicos de salud basados en adherencia
    const cardioHealth = Math.min(100, 40 + (successRate * 0.6));
    const inflamation = Math.max(0, 100 - (successRate)); // A menos éxito, más inflamación
    const longevityProb = successRate;
    
    // Alertas médicas predictivas
    let riskText = '';
    let bodyGlow = '';
    let statusText = '';

    if (successRate >= 80) {
      riskText = `<span style="color:#00ff88">BAJO</span>. Sistema inmunológico optimizado. Regeneración celular activa (Autofagia). Probabilidades de enfermedades crónicas severamente reducidas.`;
      bodyGlow = `drop-shadow(0 0 15px ${uiColor})`;
      statusText = `<span style="color:#00ff88; font-weight:bold;">SISTEMAS ÓPTIMOS</span>`;
    } else if (successRate >= 50) {
      riskText = `<span style="color:#ffcc00">MODERADO</span>. Fluctuaciones metabólicas. El cuerpo no está logrando entrar en fase de sanación profunda. Riesgo latente de fatiga crónica y resistencia a la insulina.`;
      bodyGlow = `drop-shadow(0 0 10px #ffcc00)`;
      statusText = `<span style="color:#ffcc00; font-weight:bold;">SISTEMAS COMPROMETIDOS</span>`;
    } else {
      riskText = `<span style="color:#ff3333">CRÍTICO</span>. Inflamación celular en aumento. Alto riesgo de desarrollo de hígado graso, desórdenes hormonales y deterioro metabólico acelerado. Urge corrección de hábitos.`;
      bodyGlow = `drop-shadow(0 0 20px #ff3333)`;
      statusText = `<span style="color:#ff3333; font-weight:bold;">ALERTA DE AUTO-SABOTAJE</span>`;
    }

    // Silueta Holográfica generada por IA (Renderizado realista en 3D)
    const silhouetteSVG = isMale ? 
      `<img src="male_hologram.png" style="height: 300px; width: auto; object-fit: contain; mix-blend-mode: screen; filter: ${bodyGlow}; transition: all 0.5s ease;" />` : 
      `<img src="female_hologram.png" style="height: 300px; width: auto; object-fit: contain; mix-blend-mode: screen; filter: ${bodyGlow}; transition: all 0.5s ease;" />`;

    html += `
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px; margin-top: 30px; align-items: center;">
          
          <!-- LADO IZQUIERDO: BARRAS -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
              <div style="font-size: 11px; color: #8fa3c0; margin-bottom: 5px; text-transform:uppercase;">Función Cardiovascular</div>
              <div style="height: 8px; background: #1a253a; border-radius: 4px; overflow: hidden;">
                <div style="width: ${cardioHealth}%; height: 100%; background: ${uiColor}; box-shadow: 0 0 10px ${uiColor};"></div>
              </div>
              <div style="font-size: 10px; text-align: right; margin-top: 4px; color: ${uiColor};">${cardioHealth.toFixed(1)}% Optimizado</div>
            </div>

            <div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
              <div style="font-size: 11px; color: #8fa3c0; margin-bottom: 5px; text-transform:uppercase;">Nivel de Inflamación</div>
              <div style="height: 8px; background: #1a253a; border-radius: 4px; overflow: hidden;">
                <div style="width: ${inflamation}%; height: 100%; background: ${dangerColor}; box-shadow: 0 0 10px ${dangerColor};"></div>
              </div>
              <div style="font-size: 10px; text-align: right; margin-top: 4px; color: ${dangerColor};">${inflamation.toFixed(1)}% Peligro</div>
            </div>
          </div>

          <!-- CENTRO: SILUETA -->
          <div style="text-align: center; position: relative;">
             ${silhouetteSVG}
             <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); border: 1px solid ${uiColor}; padding: 4px 10px; border-radius: 20px; font-size: 10px; color: ${uiColor}; letter-spacing: 1px;">
               ${u.nombre.toUpperCase()} - ${u.edad} AÑOS
             </div>
          </div>

          <!-- LADO DERECHO: DONAS -->
          <div style="display:flex; flex-direction:column; gap:20px; align-items:center;">
             <div style="position: relative; width: 90px; height: 90px; border-radius: 50%; background: conic-gradient(${uiColor} ${successRate}%, #1a253a ${successRate}%); display:flex; align-items:center; justify-content:center; box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);">
                <div style="width: 70px; height: 70px; border-radius: 50%; background: #0a0e17; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                   <span style="font-size: 18px; font-weight: bold; color: ${uiColor};">${successRate}%</span>
                </div>
             </div>
             <div style="font-size: 11px; color: #8fa3c0; text-transform:uppercase; text-align:center;">Índice de<br>Éxito</div>

             <div style="position: relative; width: 90px; height: 90px; border-radius: 50%; background: conic-gradient(#00ff88 ${longevityProb}%, #1a253a ${longevityProb}%); display:flex; align-items:center; justify-content:center; margin-top:10px;">
                <div style="width: 70px; height: 70px; border-radius: 50%; background: #0a0e17; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                   <span style="font-size: 18px; font-weight: bold; color: #00ff88;">${longevityProb}%</span>
                </div>
             </div>
             <div style="font-size: 11px; color: #8fa3c0; text-transform:uppercase; text-align:center;">Prob. de<br>Longevidad</div>
          </div>
        </div>

        <!-- DIAGNÓSTICO TEXTUAL -->
        <div style="margin-top: 30px; background: rgba(255,255,255,0.02); border-left: 4px solid ${uiColor}; padding: 20px;">
          <h3 style="color: #fff; margin-top:0; margin-bottom: 15px; font-size:16px;">🔬 Reporte Clínico Simulado</h3>
          <p style="font-size: 14px; color: #bac9e0; line-height: 1.6; margin-bottom: 10px;">
            <strong>ESTADO ACTUAL:</strong> ${statusText}<br>
            Basado en tus ${totalTasks} registros, tu disciplina nutricional está alterando tu química corporal.
          </p>
          <p style="font-size: 14px; color: #bac9e0; line-height: 1.6; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 4px;">
            <strong>PREDICCIÓN DE RIESGOS:</strong> ${riskText}
          </p>
        </div>

      </div>
    `;

    return html;
  },

  // ── 3. Jugos ──────────────────────────────
  renderJugos(u) {
    // ── Priorizar jugo terapéutico del CerebroEngine (backend) si disponible ──
    let j1, j2;
    if (u.jugo && u.jugo.nombre) {
      // Jugo personalizado recibido del servidor
      const aguaLabel = u.diagnostico && u.diagnostico.agua_diaria_ml
        ? `${u.diagnostico.agua_diaria_ml.toLocaleString()} ml diarios (${Math.round(u.diagnostico.agua_diaria_ml / 250)} vasos de 250ml)`
        : 'Al menos 8 vasos de agua pura diarios';
      j1 = {
        nombre:       u.jugo.nombre,
        ingredientes: u.jugo.ingredientes,
        beneficio:    u.jugo.beneficio,
        preparacion:  u.jugo.preparacion,
        agua_extra:   aguaLabel,
        alternativas: u.jugo.sustitutos ? [{
          sin:    u.jugo.sustitutos.ingrediente,
          usa:    u.jugo.sustitutos.alternativa,
          porque: u.jugo.sustitutos.razon
        }] : []
      };
      // Segundo jugo: complementario de longevidad (siempre disponible)
      j2 = Engine.jugos['longevidad_bajo'] || Engine.jugos['longevidad'] || Engine.jugos['salud'];
      if (!j2) j2 = {
        nombre: 'Hidratación Verde', ingredientes: '1/2 Pepino + Espinaca + Agua',
        beneficio: 'Alcalinizante y antioxidante. Estimula Sirtuinas (SIRT1).', preparacion: 'Licuar con agua fría.',
        agua_extra: 'Hidratante máximo celular.', alternativas: []
      };
    } else {
      // Fallback: lógica local cuando el backend no está disponible
      const isLowBudget = u.presupuesto <= 80;
      let jugosSeleccionados = [];
      const enfoques = (u.enfoques && u.enfoques.length > 0) ? u.enfoques : ['salud', 'energia'];
      enfoques.forEach(e => {
        let key = isLowBudget ? `${e}_bajo` : `${e}_alto`;
        if (Engine.jugos[key]) jugosSeleccionados.push(Engine.jugos[key]);
        else if (Engine.jugos[e]) jugosSeleccionados.push(Engine.jugos[e]);
      });
      jugosSeleccionados = [...new Set(jugosSeleccionados)].slice(0, 2);
      if (jugosSeleccionados.length === 1) jugosSeleccionados.push(Engine.jugos['salud']);
      j1 = jugosSeleccionados[0];
      j2 = jugosSeleccionados[1];
    }

    let html = `
      <div class="module">
        <div class="module-header">
          <span class="module-badge badge-orange">Elixir Natural</span>
          <h1>Tu Cronograma de Jugos</h1>
          <p class="desc">Para que no te compliques, solo tomarás 2 tipos de jugo en la semana. Al alternarlos, crean una <strong>sinergia poderosa</strong> en tu cuerpo: uno ataca un objetivo y el otro complementa, manteniendo tu cuerpo limpio, fuerte y sin gastar dinero de más.</p>
        </div>

        <!-- ═══ SECCIÓN DE LONGEVIDAD ═══ -->
        <div style="background: linear-gradient(135deg, rgba(61,255,160,0.05) 0%, rgba(96,165,250,0.05) 100%); border: 1px solid rgba(61,255,160,0.2); border-radius: 16px; padding: 28px; margin-bottom: 32px;">
          <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 20px;">
            <span style="font-size: 32px;">🧬</span>
            <div>
              <h2 style="font-size: 20px; font-weight: 800; color: var(--green); margin:0;">¿Por Qué Esta Rutina de Jugos Alarga tu Vida?</h2>
              <p style="font-size: 13px; color: var(--text2); margin:4px 0 0;">Respaldado por investigaciones en nutrición celular, neurociencia y longevidad</p>
            </div>
          </div>

          <p style="font-size: 15px; color: var(--text); line-height: 1.8; margin-bottom: 20px;">
            Los estudios de las "Zonas Azules" —las 5 regiones del mundo donde la gente regularmente vive más de 100 años en perfectas condiciones— tienen un denominador común: <strong>una ingesta diaria alta de fitonutrientes, antioxidantes y agua de calidad provenientes de frutas y vegetales frescos.</strong> Esta rutina de jugos está diseñada para replicar ese patrón directamente en tu vida cotidiana, sin importar tu presupuesto ni tu país.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">

            <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 18px; border-left: 3px solid var(--green);">
              <div style="font-size: 22px; margin-bottom: 8px;">🛡️</div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--green); margin-bottom: 6px;">Blindaje Celular</h4>
              <p style="font-size: 13px; color: var(--text2); line-height: 1.6; margin:0;">Los antioxidantes (vitamina C, flavonoides, betacarotenos) neutralizan los radicales libres que dañan el ADN celular. Menos daño celular = envejecimiento más lento. Es literalmente tu armadura molecular diaria.</p>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 18px; border-left: 3px solid var(--blue);">
              <div style="font-size: 22px; margin-bottom: 8px;">🧠</div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--blue); margin-bottom: 6px;">Cerebro de Alto Rendimiento</h4>
              <p style="font-size: 13px; color: var(--text2); line-height: 1.6; margin:0;">Los polifenoles de frutas como arándanos y remolacha aumentan el flujo sanguíneo cerebral y estimulan la producción de BDNF (Factor Neurotrófico Derivado del Cerebro), una proteína que literalmente hace crecer neuronas nuevas y mejora memoria y enfoque.</p>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 18px; border-left: 3px solid var(--orange);">
              <div style="font-size: 22px; margin-bottom: 8px;">🔥</div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--orange); margin-bottom: 6px;">Inflamación Cero</h4>
              <p style="font-size: 13px; color: var(--text2); line-height: 1.6; margin:0;">La inflamación crónica es la causa raíz de enfermedades como diabetes tipo 2, alzheimer, enfermedades cardíacas y cáncer. Ingredientes como jengibre, cúrcuma, limón y apio son antiinflamatorios naturales que mantienen tus arterias y órganos jóvenes.</p>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 18px; border-left: 3px solid var(--purple);">
              <div style="font-size: 22px; margin-bottom: 8px;">💪</div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--purple); margin-bottom: 6px;">Músculo y Recuperación</h4>
              <p style="font-size: 13px; color: var(--text2); line-height: 1.6; margin:0;">Los nitratos de la remolacha aumentan la eficiencia del oxígeno en los músculos hasta un 16% (estudios Universidad de Exeter). El potasio del plátano previene calambres. Los electrolitos naturales de la sandía aceleran la recuperación post-ejercicio.</p>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 18px; border-left: 3px solid var(--yellow);">
              <div style="font-size: 22px; margin-bottom: 8px;">🌙</div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--yellow); margin-bottom: 6px;">Sueño Profundo y Reparador</h4>
              <p style="font-size: 13px; color: var(--text2); line-height: 1.6; margin:0;">La avena y la manzana contienen triptófano y magnesio, precursores de la melatonina (hormona del sueño). Dormir bien es el acto antienvejecimiento más poderoso que existe: es cuando el cerebro se limpia de toxinas (sistema glinfático) y el cuerpo repara tejidos.</p>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 18px; border-left: 3px solid var(--red);">
              <div style="font-size: 22px; margin-bottom: 8px;">🫀</div>
              <h4 style="font-size: 14px; font-weight: 700; color: var(--red); margin-bottom: 6px;">Corazón Fuerte para Siempre</h4>
              <p style="font-size: 13px; color: var(--text2); line-height: 1.6; margin:0;">La citrulina de la sandía relaja los vasos sanguíneos mejorando la circulación. La vitamina C del limón mantiene las arterias elásticas. El apio reduce la presión arterial de forma natural. Un corazón sano es el motor que garantiza que el resto de tu cuerpo funcione décadas más.</p>
            </div>

          </div>

          <div style="background: rgba(61,255,160,0.08); border: 1px solid rgba(61,255,160,0.25); border-radius: 10px; padding: 16px; display:flex; align-items:flex-start; gap:12px;">
            <span style="font-size: 24px; flex-shrink:0;">⚗️</span>
            <div>
              <p style="font-size: 14px; color: var(--text); font-weight: 700; margin: 0 0 6px;">La Regla del Día Libre (Domingo sin Jugo)</p>
              <p style="font-size: 13px; color: var(--text2); line-height: 1.6; margin:0;">Así como los músculos necesitan descanso para crecer, tu sistema digestivo necesita un día sin procesar para repararse (proceso llamado <strong>autofagia</strong>). Los intestinos regeneran su mucosa, el hígado descansa, y el cuerpo completo hace un "reseteo" que científicamente se asocia con menor riesgo de cáncer de colon y mayor longevidad.</p>
            </div>
          </div>
        </div>
        <!-- ═══ FIN SECCIÓN DE LONGEVIDAD ═══ -->

        <div class="card-grid">
          <!-- Jugo 1 -->
          <div class="card" style="border-top: 4px solid var(--green);">
            <div class="card-icon" style="font-size: 14px; background: rgba(30,215,96,0.1); color: var(--green); padding: 4px 8px; border-radius: 4px; display:inline-block; margin-bottom: 12px;">🗓️ Lunes, Miércoles y Viernes</div>
            <h3>🥤 ${j1.nombre}</h3>
            <p style="margin: 8px 0; font-weight:600; color:var(--text);">${j1.ingredientes}</p>
            <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; margin: 12px 0;">
              <p style="font-size: 13px; color: var(--text); margin-bottom: 8px;"><strong>¿Cómo se hace? (Paso a paso)</strong><br>${j1.preparacion}</p>
            </div>
            <p style="font-size: 13px; color: var(--blue); margin-bottom: 8px;"><strong>💧 Agua:</strong> ${j1.agua_extra}</p>
            <p style="font-size: 13px; color: var(--text2); margin-bottom: 12px;"><strong>Superpoder:</strong> ${j1.beneficio}</p>
            ${j1.alternativas && j1.alternativas.length ? `
            <button onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'; this.textContent=this.textContent.includes('Ver')?'🔼 Ocultar alternativas':'🔄 ¿No tienes algún ingrediente?'" style="width:100%;background:rgba(30,215,96,0.1);border:1px solid var(--green);border-radius:8px;padding:10px;cursor:pointer;color:var(--green);font-size:13px;font-weight:600;text-align:center;">🔄 ¿No tienes algún ingrediente?</button>
            <div style="display:none;margin-top:12px;background:rgba(0,0,0,0.2);border-radius:10px;padding:14px;">
              <p style="font-size:12px;color:var(--text2);margin-bottom:10px;font-style:italic;">Usa cualquiera de estas alternativas con el mismo beneficio:</p>
              ${j1.alternativas.map(function(a){ return '<div style="margin-bottom:10px;padding:10px;background:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid var(--green);">' +
                '<p style="font-size:13px;font-weight:700;color:var(--text);margin:0 0 4px;">Si no tienes <span style="color:var(--orange);">' + a.sin + '</span></p>' +
                '<p style="font-size:13px;color:var(--green);margin:0 0 4px;">→ Usa: <strong>' + a.usa + '</strong></p>' +
                '<p style="font-size:12px;color:var(--text2);margin:0;">💡 ' + a.porque + '</p>' +
                '</div>';}).join('')}
            </div>` : ''}
          </div>

          <!-- Jugo 2 -->
          <div class="card" style="border-top: 4px solid var(--blue);">
            <div class="card-icon" style="font-size: 14px; background: rgba(45,136,255,0.1); color: var(--blue); padding: 4px 8px; border-radius: 4px; display:inline-block; margin-bottom: 12px;">🗓️ Martes, Jueves y Sábado</div>
            <h3>🥤 ${j2.nombre}</h3>
            <p style="margin: 8px 0; font-weight:600; color:var(--text);">${j2.ingredientes}</p>
            <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; margin: 12px 0;">
              <p style="font-size: 13px; color: var(--text); margin-bottom: 8px;"><strong>¿Cómo se hace? (Paso a paso)</strong><br>${j2.preparacion}</p>
            </div>
            <p style="font-size: 13px; color: var(--blue); margin-bottom: 8px;"><strong>💧 Agua:</strong> ${j2.agua_extra}</p>
            <p style="font-size: 13px; color: var(--text2); margin-bottom: 12px;"><strong>Superpoder:</strong> ${j2.beneficio}</p>
            ${j2.alternativas && j2.alternativas.length ? `
            <button onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'; this.textContent=this.textContent.includes('Ver')?'🔼 Ocultar alternativas':'🔄 ¿No tienes algún ingrediente?'" style="width:100%;background:rgba(45,136,255,0.1);border:1px solid var(--blue);border-radius:8px;padding:10px;cursor:pointer;color:var(--blue);font-size:13px;font-weight:600;text-align:center;">🔄 ¿No tienes algún ingrediente?</button>
            <div style="display:none;margin-top:12px;background:rgba(0,0,0,0.2);border-radius:10px;padding:14px;">
              <p style="font-size:12px;color:var(--text2);margin-bottom:10px;font-style:italic;">Usa cualquiera de estas alternativas con el mismo beneficio:</p>
              ${j2.alternativas.map(function(a){ return '<div style="margin-bottom:10px;padding:10px;background:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid var(--blue);">' +
                '<p style="font-size:13px;font-weight:700;color:var(--text);margin:0 0 4px;">Si no tienes <span style="color:var(--orange);">' + a.sin + '</span></p>' +
                '<p style="font-size:13px;color:var(--blue);margin:0 0 4px;">→ Usa: <strong>' + a.usa + '</strong></p>' +
                '<p style="font-size:12px;color:var(--text2);margin:0;">💡 ' + a.porque + '</p>' +
                '</div>';}).join('')}
            </div>` : ''}
          </div>

          <!-- Domingo -->
          <div class="card" style="border-top: 4px solid var(--purple); background: linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(187,134,252,0.05) 100%);">
            <div class="card-icon" style="font-size: 14px; background: rgba(187,134,252,0.1); color: var(--purple); padding: 4px 8px; border-radius: 4px; display:inline-block; margin-bottom: 12px;">🗓️ Domingo: Día Libre</div>
            <h3>🧘‍♂️ Reseteo Corporal y Mental</h3>
            <p style="margin: 8px 0; font-size: 14px; color:var(--text2); line-height: 1.5;">
              Hoy <strong>NO hay jugos</strong>. Tu estómago y tus intestinos necesitan descansar de procesar alimentos para poder curarse a sí mismos. Bebe solo agua pura o tés de hierbas sin azúcar.
            </p>
            <p style="margin: 8px 0; font-size: 14px; color:var(--text); line-height: 1.5;">
              <strong>Actividad recomendada:</strong> Sal de la casa. Respira aire puro. Ve a un parque, a la playa, al río, o sube una pequeña montaña. Si prefieres estar en casa, pon música que te haga feliz y limpia tu espacio, lee algo que te divierta o simplemente acuéstate a ver películas y relajar tu mente. ¡Te lo has ganado!
            </p>
          </div>
        </div>
      </div>
    `;
    return html;
  },

  renderEjercicio(u) {
    const exType = window.currentExerciseType || 'casa';
    const planEspecial = Engine.detectarPlanEjercicio(u);
    const obj0 = (u.objetivos && u.objetivos[0]) || u.objetivo || 'mantenimiento';
    const catKey = planEspecial || (Engine.ejercicios[obj0] ? obj0 : 'mantenimiento');
    const plan = Engine.ejercicios[catKey];
    const rutinasBase = plan[exType] || plan['casa'];

    const dayNames = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    
    // Banner de Actualización Semanal
    const updateBanner = `
      <div class="alert-box info" style="margin-bottom: 25px; border: 1px solid var(--primary); background: rgba(var(--primary-rgb), 0.05); display: flex; align-items: center; gap: 15px;">
        <div style="font-size: 24px;">📅</div>
        <div>
          <h4 style="margin:0; color: var(--primary);">Recalibración Semanal Obligatoria</h4>
          <p style="margin: 5px 0 0; font-size: 13px;">Para garantizar que tu nutrición y entrenamiento sigan siendo precisos, <strong>actualiza tu peso, estatura y presupuesto cada lunes</strong> en la pestaña "Mi Perfil".</p>
        </div>
      </div>
    `;

    // Bloque Educativo / Legal
    const educationBlock = `
      <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
        <h3 style="font-size: 16px; color: var(--primary); margin-bottom: 10px;">🧪 El Propósito Biológico de tu Rutina</h3>
        <p style="font-size: 14px; color: var(--text2); line-height: 1.6; margin-bottom: 15px;">
          Estas rutinas no son solo esfuerzo físico; son el <strong>catalizador metabólico</strong>. Los nutrientes que te proporcionamos en tu menú necesitan una señal biológica para depositarse donde deben (músculos, huesos) y no como reserva de grasa. El ejercicio es la "llave" que abre tus células para que la química de tu alimentación funcione correctamente hacia tu meta de <strong>${obj0.replace('_',' ')}</strong>.
        </p>
        <div style="font-size: 12px; color: var(--text3); border-top: 1px solid var(--border); padding-top: 15px; font-style: italic;">
          ⚠️ <strong>Nota de Seguridad:</strong> Este plan es una guía inteligente basada en tu perfil. Sin embargo, para resultados máximos y prevención de lesiones, recomendamos encarecidamente la supervisión de un profesional del ejercicio físico. Si sientes dolor agudo o mareos, detente de inmediato.
        </div>
      </div>
    `;

    // Lógica de racha (Sugerencia de escalado)
    let scalingSuggestion = '';
    if (u.streak >= 90) {
      scalingSuggestion = `
        <div class="alert-box success" style="margin-bottom: 20px; border-color: var(--yellow);">
          <h4>🚀 ¡Felicidades por tus 3 meses de racha!</h4>
          <p>Has alcanzado una madurez metabólica importante. Es momento de <strong>aumentar la intensidad</strong>. Si entrenas en casa, considera añadir peso (mochila) o pasar a la pestaña de "Gimnasio" para desafiar tus fibras musculares.</p>
        </div>
      `;
    }

    return `
      <div class="module">
        <div class="module-header">
          <span class="module-badge badge-yellow">Activación Metabólica</span>
          <h1>Tu Plan de Entrenamiento Semanal</h1>
          <p class="desc">Programación de 7 días sincronizada con tu química nutricional.</p>
        </div>

        ${updateBanner}
        ${scalingSuggestion}
        ${educationBlock}

        <div class="alert-box success" style="margin-bottom: 24px; font-size: 14px;">
          ${plan.trainer}
        </div>

        <div class="toggle-row" style="margin-bottom: 25px;">
          <button class="toggle-btn ${exType === 'casa' ? 'active' : ''}" onclick="window.currentExerciseType='casa'; showModule('ejercicio')">🏠 EN CASA</button>
          <button class="toggle-btn ${exType === 'gym' ? 'active' : ''}" onclick="window.currentExerciseType='gym'; showModule('ejercicio')">🏋️ GIMNASIO</button>
          <button class="toggle-btn ${exType === 'funcional' ? 'active' : ''}" onclick="window.currentExerciseType='funcional'; showModule('ejercicio')">🔥 FUNCIONAL</button>
        </div>

        <div class="week-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
          ${dayNames.map((day, idx) => {
            const r = rutinasBase[idx] || { 
              dia: day, 
              calentamiento: 'Movilidad articular suave (3 min).', 
              rutina: ['<strong>Descanso Activo:</strong> Hoy tu cuerpo se recupera. Camina 20 min o simplemente descansa para asimilar el trabajo de la semana.'] 
            };
            
            return `
              <div class="day-col" style="background: rgba(255,255,255,0.02); padding: 20px; border-radius: 15px; border: 1px solid var(--border);">
                <div style="font-weight: 800; color: var(--primary); margin-bottom: 15px; border-bottom: 1px solid var(--border); padding-bottom: 10px; font-size: 16px;">
                  ${day.toUpperCase()}
                </div>
                <div style="font-size: 11px; color: var(--text3); text-transform: uppercase; margin-bottom: 5px;">🔥 Calentamiento</div>
                <p style="font-size: 13px; color: var(--text2); margin-bottom: 15px;">${r.calentamiento}</p>
                
                <div style="font-size: 11px; color: var(--text3); text-transform: uppercase; margin-bottom: 8px;">💪 Tarea del Día</div>
                <ul style="list-style: none; padding:0;">
                  ${r.rutina.map(step => `
                    <li style="font-size: 14px; color: var(--text); margin-bottom: 12px; line-height: 1.5; padding-left: 20px; position:relative;">
                      <span style="position:absolute; left:0; color: var(--primary);">•</span> ${step}
                    </li>
                  `).join('')}
                </ul>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // ── 5. Compras y Finanzas ─────────────────
  renderCompras(u) {
    const ing15 = (parseFloat(u.ingreso) / 2) || 0;
    const food15 = parseFloat(u.presupuesto) || 0;
    let restante = ing15 - food15;
    if (restante < 0) restante = 0;

    let fijos = 0, higiene = 0, extras = 0, ahorro = 0;
    let isCritical = false;

    if (restante <= 40) {
      isCritical = true;
      fijos = restante * 0.8;
      higiene = restante * 0.2;
      extras = 0;
      ahorro = 0;
    } else {
      fijos = restante * 0.50;
      higiene = restante * 0.15;
      extras = restante * 0.15;
      ahorro = restante * 0.20;
    }

    const fmt = (num) => '$' + num.toFixed(2);

    // Lógica de Fechas y Semanas (Compras Dinámicas)
    window.comprasWeeks = window.comprasWeeks || 1;
    const w1Class = window.comprasWeeks === 1 ? 'active' : '';
    const w2Class = window.comprasWeeks === 2 ? 'active' : '';
    const w3Class = window.comprasWeeks === 3 ? 'active' : '';

    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday
    const startDiff = currentDay === 0 ? 1 : -(currentDay - 1);
    
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + startDiff);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (7 * window.comprasWeeks) - 1);

    const fDate = (d) => `${d.getDate()}/${d.getMonth()+1}`;
    const dateStr = `${fDate(startDate)} al ${fDate(endDate)}`;

    // Identificar Menú y Jugos
    const pres = parseFloat(u.presupuesto) || 0;
    const menuType = window.currentMenuType || (pres > 80 ? 'default_premium' : (pres > 40 ? 'default_q1' : 'default_econ'));
    
    // Lógica de Semana Seleccionada (Sincronizada con Menú)
    const weekOffset = window.menuWeekOffset || 0;
    const mult = window.comprasWeeks || 1;
    
    // Obtener ingredientes rotados según la semana
    const baseItemsRaw = Engine.getIngredientesSemana(menuType, weekOffset, mult);
    // getIngredientesSemana devuelve un array de items directamente
    const baseItems = { items: baseItemsRaw, costoRef: Engine.ingredientesBase[menuType].costoRef };
    
    const isLowBudget = pres <= 80;
    let jugosSeleccionados = [];
    const enfoques = (u.enfoques && u.enfoques.length > 0) ? u.enfoques : ['salud', 'energia'];
    enfoques.forEach(e => {
      let key = isLowBudget ? `${e}_bajo` : `${e}_alto`;
      if (Engine.jugos[key]) jugosSeleccionados.push(Engine.jugos[key]);
      else if (Engine.jugos[e] && (!isLowBudget || Engine.jugos[e].costo === 'bajo')) jugosSeleccionados.push(Engine.jugos[e]);
      else if (Engine.jugos[e]) jugosSeleccionados.push(Engine.jugos[e]);
    });
    jugosSeleccionados = [...new Set(jugosSeleccionados)].slice(0, 2);
    if (jugosSeleccionados.length === 1) jugosSeleccionados.push(Engine.jugos['salud']);

    // Build items list using safe string concatenation to avoid nested backtick issues
    const categorias = {};
    baseItems.items.forEach(function(item) {
      const cat = item.c;
      const name = item.i; // always a plain string
      if (!categorias[cat]) categorias[cat] = [];
    categorias[cat].push('<li style="margin-bottom:8px;padding:8px 12px;border-left:2px solid var(--border);color:var(--text);font-size:14px;">' + name + ' <span style="color:var(--green);font-weight:bold;">(x' + mult + ')</span></li>');
    });

    const jugCat = '\uD83C\uDF4F Frutas para Jugos';
    categorias[jugCat] = jugosSeleccionados.map(function(j) {
      var txt = j.compras || j.nombre;
      return '<li style="margin-bottom:8px;padding:8px 12px;border-left:2px solid var(--green);color:var(--text);font-size:14px;">' + txt + ' <span style="color:var(--green);font-weight:bold;">(x' + mult + ')</span></li>';
    });

    let listaComida = '';
    for (const cat in categorias) {
      listaComida += '<h4 style="margin-top:18px;margin-bottom:8px;color:var(--green);text-transform:uppercase;font-size:13px;letter-spacing:1px;">' + cat + '</h4>';
      listaComida += '<ul style="list-style:none;padding:0;margin:0;">' + categorias[cat].join('') + '</ul>';
    }

    const estimatedCost = baseItems.costoRef * mult;

    // Score tips by relevance to what's actually in this user's shopping list
    const allItemNames = baseItems.items.map(function(i){ return i.i.toLowerCase(); }).join(' ');
    const allTips = Engine.tipsCompras.slice();
    const scored = allTips.map(function(t) {
      var kws = t.keywords || [];
      var score = kws.filter(function(w){ return allItemNames.indexOf(w) !== -1; }).length;
      return { tip: t, score: score };
    });
    scored.sort(function(a,b){ return b.score - a.score; });
    // Serialize only the fields needed by the rotator (avoid circular issues)
    var tipsForRotator = scored.map(function(s){
      return { icon: s.tip.icon, titulo: s.tip.titulo, texto: s.tip.texto };
    });
    var tipsJson = JSON.stringify(tipsForRotator);
    // Store tips globally so app.js can init the rotator after innerHTML is set
    window._comprasTips = tipsForRotator;

    let listaHigiene = '';
    if (isCritical) {
      listaHigiene = `
        <li><strong>Jabón de Baño (Multiuso):</strong> 2 uds</li>
        <li><strong>Crema Dental (Pequeña):</strong> 1 ud</li>
        <li><strong>Desodorante Básico:</strong> 1 ud</li>
        <li><strong>Papel Higiénico (4 rollos)</strong></li>
        <li><em>* Solo lo estrictamente necesario para la dignidad personal.</em></li>
      `;
    } else {
      listaHigiene = `
        <li><strong>Jabón y Shampoo</strong></li>
        <li><strong>Cuidado Bucal (Crema, Hilo, Enjuague)</strong></li>
        <li><strong>Desodorante y Cuidado Corporal</strong></li>
        <li><strong>Hogar (Detergente, Papel, Desinfectante)</strong></li>
      `;
    }

    return `
      <div class="module">
        <div class="module-header" style="position:relative;">
          <span class="module-badge badge-yellow">Asistente de Finanzas</span>
          <button onclick="window.print()" title="Descargar en PDF" style="position:absolute; top:0; right:0; background:var(--primary); border:none; border-radius:8px; padding: 8px 12px; cursor:pointer; color:var(--bg); font-weight: bold; font-size: 14px; display:flex; align-items:center; gap: 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">📥 <span class="hide-mobile">Descargar PDF</span></button>
          <h1>📋 Lista de Compras Semanal</h1>
          <p class="desc">Ingredientes exactos de tu menú personalizado más las frutas para tus jugos funcionales. Actualización automática cada domingo a medianoche.</p>
        </div>

        <div class="alert-box success" style="margin-bottom: 24px;">
          <h4>📅 Actualización Inteligente</h4>
          <p>Esta lista se actualiza automáticamente todos los domingos a la medianoche calculando los requerimientos de la próxima semana para que puedas administrarte con antelación.</p>
        </div>

        <div class="toggle-row" style="margin-bottom: 24px;">
          <button class="toggle-btn ${window.menuWeekOffset === 0 ? 'active' : ''}" onclick="window.menuWeekOffset=0; showModule('compras')">ESTA SEMANA</button>
          <button class="toggle-btn ${window.menuWeekOffset === 1 ? 'active' : ''}" onclick="window.menuWeekOffset=1; showModule('compras')">PRÓXIMA SEMANA 📅</button>
        </div>

        <div style="font-size: 11px; color: var(--text3); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Multiplicador de Cantidad:</div>
        <div class="toggle-row" style="margin-bottom: 24px;">
          <button class="toggle-btn ${w1Class}" onclick="window.comprasWeeks=1; showModule('compras')">x1 Sem</button>
          <button class="toggle-btn ${w2Class}" onclick="window.comprasWeeks=2; showModule('compras')">x2 Quincena</button>
          <button class="toggle-btn ${w3Class}" onclick="window.comprasWeeks=3; showModule('compras')">x3 Sem</button>
        </div>

        <!-- Dashboard Financiero -->
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px;">
          <div style="flex: 1; min-width: 140px; background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px; border-left: 4px solid var(--green);">
            <div style="font-size: 12px; color: var(--text2);">Comida Estimada (${mult} Semanas)</div>
            <div style="font-size: 20px; font-weight: 800; color: var(--text);">${fmt(estimatedCost)}</div>
          </div>
          <div style="flex: 1; min-width: 140px; background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px; border-left: 4px solid var(--blue);">
            <div style="font-size: 12px; color: var(--text2);">Fijos/Transporte (Quincenal)</div>
            <div style="font-size: 20px; font-weight: 800; color: var(--text);">${fmt(fijos)}</div>
          </div>
          <div style="flex: 1; min-width: 140px; background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px; border-left: 4px solid var(--orange);">
            <div style="font-size: 12px; color: var(--text2);">Higiene (Quincenal)</div>
            <div style="font-size: 20px; font-weight: 800; color: var(--text);">${fmt(higiene)}</div>
          </div>
          <div style="flex: 1; min-width: 140px; background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px; border-left: 4px solid var(--purple);">
            <div style="font-size: 12px; color: var(--text2);">Extras/Ahorro</div>
            <div style="font-size: 20px; font-weight: 800; color: var(--text);">${fmt(extras + ahorro)}</div>
          </div>
        </div>

        ${isCritical ? `
        <div class="alert-box warning" style="margin-bottom: 24px;">
          <h4>⚠️ Modo de Supervivencia Táctica Activado</h4>
          <p>Tus márgenes están muy ajustados. He asignado <strong>$0 a la categoría de Extras</strong> (Ropa, salidas). Tu misión es comer y mantenerte bajo techo. Este régimen estricto es el sacrificio temporal que necesitas para tener salud y fuerza.</p>
        </div>
        ` : ''}

        <!-- Listas Detalladas -->
        <div class="section-title">🛒 1. Alimentos (Válido del ${dateStr})</div>
        <div class="alert-box warning" style="margin-bottom: 16px; padding: 10px; border-left-color: var(--yellow); background: rgba(251,191,36,0.05);">
          <p style="font-size: 12px; margin:0;"><strong>💡 Nota de fluctuación:</strong> El monto referencial (${fmt(estimatedCost)}) es una estimación que varía según tu país, inflación y moneda local. Puedes <strong>ahorrar mucho dinero</strong> comprando frutas de temporada, buscando ofertas en mercados locales o comprando vegetales al mayor.</p>
        </div>

        <!-- ID shopping-list-printable: contiene SOLO los ingredientes que se imprimen en PDF -->
        <div id="shopping-list-printable" style="background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          ${listaComida}
        </div>

        <div class="section-title">🧴 2. Higiene y Hogar (Válido Quincenal)</div>
        <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <ul style="list-style-type: disc; margin-left: 20px; color: var(--text); line-height: 1.8; font-size: 14px;">
            ${listaHigiene}
          </ul>
        </div>

        <div class="section-title">🏠 3. Fijos, Transporte y Ahorro</div>
        <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="font-size: 14px; color: var(--text); line-height: 1.6;">
            Debes apartar <strong>${fmt(fijos)}</strong> inmediatamente apenas cobres para transporte y servicios. El fondo de emergencia (${fmt(ahorro)}) escóndelo; este dinero no existe, es tu escudo contra la inflación y crisis médicas.
          </p>
        </div>

        <div class="section-title">🍓 4. Alimentos Regionales Sugeridos</div>
        <div style="background: rgba(var(--primary-rgb),0.05); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 32px;">
          <p style="font-size: 14px; color: var(--text); line-height: 1.6; margin-bottom: 10px;">
            Para maximizar tu nutrición al menor costo en <strong>${u.ubicacion || 'tu región'}</strong>, prioriza estos alimentos autóctonos:
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${Engine.alimentosRegion[Engine.detectarRegion(u.ubicacion)].map(f => `<span style="background:rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 20px; font-size: 12px; border: 1px solid var(--border);">${f}</span>`).join('')}
          </div>
        </div>

        <!-- 🚀 INFRAESTRUCTURA DE INTEGRACIÓN COMERCIAL (Habilitar con display:block para socios) -->
        <div id="delivery-integration-hub" style="display:none; margin-bottom: 32px; border: 1px dashed var(--blue); border-radius: 12px; padding: 20px; background: rgba(96,165,250,0.05);">
          <h3 style="color: var(--blue); margin-bottom: 10px;">📦 Opciones de Entrega a Domicilio</h3>
          <p style="font-size: 13px; color: var(--text2); margin-bottom: 15px;">Detectando supermercados aliados cerca de tu ubicación para envío automático de tu lista...</p>
          
          <div id="delivery-partner-selector" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px;">
            <!-- Rendered by Engine.partners.supermarkets -->
          </div>

          <div id="smart-cart-preview" style="margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--border);">
             <button class="btn-primary" style="width: 100%; background: var(--blue); font-size: 14px;">Solicitar Pedido Automático (Mapear a Carrito)</button>
             <p style="font-size: 10px; color: var(--text3); text-align: center; margin-top: 8px;">* Se aplica una comisión de gestión por orden de $0.10 USD.</p>
          </div>
        </div>

        <div class="section-title">💡 Consejo del Mercado</div>
        <div id="tipsRotatorBox" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
          <div id="tipCard0" class="card" style="border-top:3px solid var(--yellow);transition:opacity 0.5s;">
            <div class="card-icon" style="font-size:28px;margin-bottom:8px;"></div>
            <h3 style="font-size:15px;margin-bottom:8px;"></h3>
            <p style="font-size:13px;line-height:1.6;color:var(--text2);"></p>
          </div>
          <div id="tipCard1" class="card" style="border-top:3px solid var(--yellow);transition:opacity 0.5s;">
            <div class="card-icon" style="font-size:28px;margin-bottom:8px;"></div>
            <h3 style="font-size:15px;margin-bottom:8px;"></h3>
            <p style="font-size:13px;line-height:1.6;color:var(--text2);"></p>
          </div>
        </div>


      </div>
    `;
  },


  // ── 6. Recomendaciones ────────────────────
  renderRecomendaciones(u) {
    let libros = [...Engine.recomendaciones.libros];
    let documentales = [...Engine.recomendaciones.documentales];
    let podcasts = [...Engine.recomendaciones.podcasts];

    // Adaptación por nivel de estrés y sueño
    if (u.estres === 'alto' || u.sueno === 'malo') {
      // Priorizar libros de trauma/estrés y podcast de sueño
      libros.sort((a,b) => (a.tema.includes('Trauma') || a.tema.includes('estrés')) ? -1 : 1);
    } else if (u.objetivos.includes('aumentar_masa') || u.objetivos.includes('rendimiento')) {
      documentales.sort((a,b) => a.tema.includes('atletas') ? -1 : 1);
    }

    if (!u.recsIdx) u.recsIdx = { libros: 0, documentales: 0, podcasts: 0 };

    // Seleccionar el item actual basado en el índice cíclico
    const libroActual = libros[u.recsIdx.libros % libros.length];
    const docActual = documentales[u.recsIdx.documentales % documentales.length];
    const podActual = podcasts[u.recsIdx.podcasts % podcasts.length];

    // Si está en crisis financiera (Desempleado / Presupuesto Crítico)
    let crisisHtml = '';
    if (u.ingreso < 200 || u.presupuesto < 30) {
      crisisHtml = `
        <div class="alert-box warning" style="margin-bottom: 20px;">
          <h4>💪 Resiliencia Financiera y Oportunidades</h4>
          <p>Notamos que tu presupuesto es ajustado en este momento. Queremos recordarte que el ser humano es más fuerte en la adversidad. No necesitas gimnasios caros ni súper alimentos para ser un espécimen óptimo; la calistenia en el parque y los granos enteros son suficientes. <strong>Recomendación especial:</strong> Lee "Piense y Hágase Rico" y aprovecha la crisis para reinventar tus habilidades remotas.</p>
        </div>
      `;
    }

    return `
      <div class="module">
        <div class="module-header">
          <span class="module-badge badge-purple">Cultura y Desarrollo</span>
          <h1>Alimento para la Mente</h1>
          <p class="desc">La salud óptima no es solo física. Estas recomendaciones están filtradas específicamente para tu perfil actual. Si ya lo leíste o no te interesa, pide otra opción.</p>
        </div>
        
        ${crisisHtml}

        <div class="section-title">Libro Estratégico para ti</div>
        <div class="card-grid">
          <div class="card" style="position:relative; padding-bottom: 50px;">
            <div class="card-icon">${libroActual.emoji || '📖'}</div>
            <h3>${libroActual.titulo}</h3>
            <p>Por ${libroActual.autor}<br><strong>Tema:</strong> ${libroActual.tema}</p>
            <button onclick="nextRecomendacion('libros')" style="position:absolute; bottom:15px; left:20px; background:var(--surface); border:1px solid var(--border); color:var(--text); padding:5px 10px; border-radius:6px; cursor:pointer; font-size:12px;">🔄 Muéstrame otra recomendación</button>
          </div>
        </div>

        <div class="section-title">Documental Sugerido</div>
        <div class="card-grid">
          <div class="card" style="position:relative; padding-bottom: 50px;">
            <div class="card-icon">🎬</div>
            <h3>${docActual.titulo} (${docActual.plataforma})</h3>
            <p><strong>Tema:</strong> ${docActual.tema}</p>
            <button onclick="nextRecomendacion('documentales')" style="position:absolute; bottom:15px; left:20px; background:var(--surface); border:1px solid var(--border); color:var(--text); padding:5px 10px; border-radius:6px; cursor:pointer; font-size:12px;">🔄 Muéstrame otra recomendación</button>
          </div>
        </div>

        <div class="section-title">Podcast de Ciencia</div>
        <div class="card-grid">
          <div class="card" style="position:relative; padding-bottom: 50px;">
            <div class="card-icon">🎧</div>
            <h3>${podActual.titulo}</h3>
            <p>${podActual.descripcion}</p>
            <button onclick="nextRecomendacion('podcasts')" style="position:absolute; bottom:15px; left:20px; background:var(--surface); border:1px solid var(--border); color:var(--text); padding:5px 10px; border-radius:6px; cursor:pointer; font-size:12px;">🔄 Muéstrame otra recomendación</button>
          </div>
        </div>
      </div>
    `;
  },

  // ── 7. Salud Sexual ───────────────────────
  renderSexual(u) {
    // Si no es adulto o joven, mostrar un mensaje genérico, si no, el específico
    const edadValida = u.edad >= 16;
    if(!edadValida) {
      return `
        <div class="module">
          <div class="module-header">
            <span class="module-badge badge-green">Crecimiento</span>
            <h1>Desarrollo y Cambios en tu Cuerpo</h1>
            <p class="desc">Estás en una etapa donde tu cuerpo y mente cambiarán mucho. Entender estos cambios te ayudará a crecer sano y fuerte.</p>
          </div>
          
          <div class="section-title">¿Qué está pasando contigo?</div>
          <div class="card-grid" style="margin-bottom:24px;">
            ${Engine.desarrolloJuvenil.cambios.map(c => `
              <div class="card">
                <div class="card-icon">${c.icono}</div>
                <h3>${c.titulo}</h3>
                <p>${c.desc}</p>
              </div>
            `).join('')}
          </div>

          <div class="section-title">El Superpoder de la Comunicación</div>
          <div class="list-items" style="margin-bottom:24px;">
            ${Engine.desarrolloJuvenil.comunicacion.map(c => `
              <div class="list-item">
                <div class="li-icon">${c.icono}</div>
                <div class="li-text"><strong>${c.titulo}:</strong> ${c.desc}</div>
              </div>
            `).join('')}
          </div>

          <div class="alert-box info" style="margin-top: 20px;">
            <h4>👨‍⚕️ Guía Profesional</h4>
            <p>Si sientes dolores extraños, mucha tristeza o tienes dudas sobre tu cuerpo, pide a tus padres que te lleven al médico. Los doctores y psicólogos son como mecánicos para nuestro cuerpo y mente, están ahí para explicarte todo sin juzgarte.</p>
          </div>
        </div>
      `;
    }

    const data = Engine.saludSexual[u.sexo] || Engine.saludSexual.masculino;

    return `
      <div class="module">
        <div class="module-header">
          <span class="module-badge badge-red">Vitalidad</span>
          <h1>Salud Sexual y Hormonal</h1>
          <p class="desc">La función sexual es un indicador directo de la salud cardiovascular y hormonal general.</p>
        </div>

        <div class="section-title">Alimentos Potenciadores</div>
        <div class="list-items" style="margin-bottom:24px;">
          ${data.alimentos.map(a => `<div class="list-item"><div class="li-icon">🔥</div><div class="li-text">${a}</div></div>`).join('')}
        </div>

        <div class="section-title">Hábitos Clave</div>
        <div class="list-items" style="margin-bottom:24px;">
          ${data.habitos.map(h => `<div class="list-item"><div class="li-icon">⚡</div><div class="li-text">${h}</div></div>`).join('')}
        </div>
        
        ${u.sexo === 'masculino' ? `
        <div class="section-title">Calidad Seminal</div>
        <div class="list-items">
          ${data.semen.map(s => `<div class="list-item"><div class="li-icon">🧬</div><div class="li-text">${s}</div></div>`).join('')}
        </div>
        ` : ''}

        <!-- ── ZONA DE CONVENIOS MÉDICOS — SALUD HORMONAL Y SEXUAL ── -->
        <div style="margin-top:32px;background:var(--surface);border:1px dashed rgba(255,68,68,0.3);border-radius:14px;padding:22px;">
          <div style="font-size:13px;font-weight:700;color:#ff6b6b;letter-spacing:0.05em;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
            🩺 Clínicas de Especialidades Médicas y Salud Hormonal
          </div>
          <div style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.07);">
            <div style="width:18px;height:18px;border:2px solid rgba(255,68,68,0.5);border-top-color:transparent;border-radius:50%;animation:vo-pulse 1.2s linear infinite;flex-shrink:0;"></div>
            <span style="font-size:13px;color:rgba(255,255,255,0.5);font-style:italic;">
              ${u.sexo === 'femenino'
                ? `Buscando Consultorios Ginecológicos Aliados en ${u.ubicacion || 'tu zona'}...`
                : `Buscando Consultorios de Urología y Andrología Aliados en ${u.ubicacion || 'tu zona'}...`}
            </span>
          </div>
          <div style="margin-top:10px;font-size:10px;color:rgba(255,255,255,0.22);text-align:right;">Zona reservada para convenios corporativos — próximamente activa</div>
        </div>
      </div>
    `;
  },

  // ── 8. Salud Mental ───────────────────────
  renderMental(u) {
    let tituloExt = '';
    let alertaEspecial = '';

    if (u.estres === 'alto') {
      tituloExt = ' (Enfoque en Reducción de Ansiedad)';
      alertaEspecial = `
        <div class="alert-box danger" style="margin-bottom: 20px;">
          <h4>🚨 Alerta de Cortisol Alto</h4>
          <p>Has indicado altos niveles de estrés/ansiedad diarios. El cortisol constante bloquea la pérdida de grasa, destruye la masa muscular y apaga el sistema inmune. <strong>Tu prioridad absoluta es aplicar la respiración 4-7-8 antes de cualquier comida para no tragar con el sistema nervioso en alerta.</strong></p>
        </div>
      `;
    } else if (u.sueno === 'malo') {
      tituloExt = ' (Enfoque en Reparación del Sueño)';
      alertaEspecial = `
        <div class="alert-box warning" style="margin-bottom: 20px;">
          <h4>💤 Emergencia de Sueño</h4>
          <p>Tu calidad de sueño es deficiente. Sin sueño profundo no hay recuperación celular ni estabilidad hormonal. <strong>Protocolo de Choque:</strong> Cero pantallas 1 hora antes de dormir (la luz azul bloquea la melatonina) y consume suplemento de Magnesio Glicinato en la cena.</p>
        </div>
      `;
    }

    return `
      <div class="module">
        <div class="module-header">
          <span class="module-badge badge-blue">Psicología</span>
          <h1>Equilibrio Mental${tituloExt}</h1>
          <p class="desc">Tácticas basadas en neurociencia adaptadas a tus niveles de estrés y descanso.</p>
        </div>
        
        ${alertaEspecial}

        <div class="section-title">Protocolos Anti-Ansiedad</div>
        <div class="card-grid">
          ${Engine.saludMental.ansiedad.map(a => `
            <div class="card">
              <h3>${a.titulo}</h3>
              <p>${a.descripcion}</p>
              <p style="margin-top:8px; font-size:12px; opacity:0.7;">⏰ ${a.frecuencia}</p>
            </div>
          `).join('')}
        </div>

        <div class="section-title">Prevención de Depresión</div>
        <div class="card-grid">
          ${Engine.saludMental.depresion.map(d => `
            <div class="card">
              <h3>${d.titulo}</h3>
              <p>${d.descripcion}</p>
            </div>
          `).join('')}
        </div>

        <div class="section-title">Estimulación Cognitiva (Antienvejecimiento)</div>
        <div class="list-items">
          ${Engine.saludMental.cognitivo.map(c => `
            <div class="list-item"><div class="li-icon">🧠</div><div class="li-text">${c}</div></div>
          `).join('')}
        </div>

        <!-- ── ZONA DE CONVENIOS MÉDICOS — SALUD MENTAL ── -->
        <div style="margin-top:32px;background:var(--surface);border:1px dashed rgba(0,212,255,0.3);border-radius:14px;padding:22px;">
          <div style="font-size:13px;font-weight:700;color:#00d4ff;letter-spacing:0.05em;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
            🩺 Directorio de Especialistas en Salud Mental Aliados
          </div>
          <div style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.07);">
            <div style="width:18px;height:18px;border:2px solid rgba(0,212,255,0.5);border-top-color:transparent;border-radius:50%;animation:vo-pulse 1.2s linear infinite;flex-shrink:0;"></div>
            <span style="font-size:13px;color:rgba(255,255,255,0.5);font-style:italic;">Buscando consultorios psicológicos locales con descuentos exclusivos para Vida Óptima en tu zona...</span>
          </div>
          <div style="margin-top:10px;font-size:10px;color:rgba(255,255,255,0.22);text-align:right;">Zona reservada para convenios corporativos — próximamente activa</div>
        </div>
      </div>
    `;
  },

  // ── 9. Seguridad ──────────────────────────
  renderSeguridad(u) {
    let examenes = [];
    if(u.edad < 18) examenes = examenes.concat(Engine.seguridad.examenes.ninos_adolescentes);
    if(u.edad >= 18 && u.edad <= 45) examenes = examenes.concat(Engine.seguridad.examenes.adulto_joven);
    if(u.sexo === 'femenino' && u.edad >= 18) examenes = examenes.concat(Engine.seguridad.examenes.mujer);
    if(u.edad > 45) examenes = examenes.concat(Engine.seguridad.examenes.adulto_mayor);

    // ── Motor de alertas clínicas dinámicas ──────────────────────────────────
    const alertasDinamicas = [];
    if (u.enfermedades && u.enfermedades.length > 0) {
      alertasDinamicas.push(`<div class="alert-box danger" style="margin-bottom:16px;">
        <h4>🏥 Condiciones Médicas Registradas</h4>
        <p>Tienes <strong>${u.enfermedades.length} condición(es) médica(s) activa(s)</strong> en tu perfil (${u.enfermedades.join(', ')}). Ninguna recomendación nutricional o de suplementación de esta plataforma reemplaza el criterio de un <strong>médico tratante calificado</strong>. Agenda una revisión periódica obligatoria con tu especialista.</p>
      </div>`);
    }
    if (u.medicamentos && u.medicamentos !== 'no') {
      alertasDinamicas.push(`<div class="alert-box warning" style="margin-bottom:16px;">
        <h4>💊 Medicación Activa Detectada</h4>
        <p>Estás bajo tratamiento farmacológico (<strong>${u.medicamentos}</strong>). Toda modificación en tu dieta, suplementación o rutina de ejercicio debe ser <strong>consultada y autorizada por tu médico prescriptor</strong> antes de implementarse. Interacciones alimentarias pueden alterar la absorción y efecto de tu medicamento.</p>
      </div>`);
    }
    if (u.estres === 'alto' || u.estres === 'muy_alto') {
      alertasDinamicas.push(`<div class="alert-box warning" style="margin-bottom:16px;">
        <h4>⚠️ Nivel de Estrés Elevado Registrado</h4>
        <p>El cortisol crónico elevado produce daño sistémico acumulativo. Si el estrés interfiere con tu vida diaria durante más de 2 semanas consecutivas, es imperativo que consultes a un <strong>médico o psicólogo clínico certificado</strong>. No suprimas síntomas con automedicación.</p>
      </div>`);
    }
    if (u.sueno === 'malo' || u.sueno === 'insomio') {
      alertasDinamicas.push(`<div class="alert-box warning" style="margin-bottom:16px;">
        <h4>😴 Calidad de Sueño Comprometida</h4>
        <p>El insomnio crónico está asociado a hipertensión, diabetes tipo 2 y deterioro cognitivo. Si llevas más de 3 semanas con sueño deficiente, consulta a un <strong>médico o especialista en medicina del sueño</strong> antes de iniciar cualquier suplemento o protocolo.</p>
      </div>`);
    }
    // ─────────────────────────────────────────────────────────────────────────

    return `
      <div class="module">
        <div class="module-header">
          <span class="module-badge badge-orange">Prevención</span>
          <h1>Seguridad y Hábitos de Riesgo</h1>
          <p class="desc">La verdadera longevidad consiste en evitar las causas predecibles de mortalidad prematura.</p>
        </div>

        <!-- ── BANNER PERMANENTE ── -->
        <div style="background:linear-gradient(135deg,#1a0a0a,#2a0a0a);border:2px solid #ff4444;border-radius:14px;padding:18px 22px;margin-bottom:24px;display:flex;align-items:center;gap:16px;">
          <span style="font-size:32px;flex-shrink:0;">❌</span>
          <div>
            <div style="font-family:Inter,sans-serif;font-size:18px;font-weight:800;color:#ff6666;letter-spacing:0.04em;text-transform:uppercase;">NO TE AUTOMEDIQUES</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-top:4px;line-height:1.5;">Toda prescripción, diagnóstico o ajuste de medicación es competencia exclusiva de un médico habilitado. Esta plataforma es de carácter educativo y de bienestar, nunca sustitutiva del juicio clínico profesional.</div>
          </div>
        </div>

        ${alertasDinamicas.join('')}
        ${u.fuma === 'si' ? `
        <div class="alert-box danger">
          <h4>🚭 Alerta: Tabaquismo</h4>
          <p>${Engine.seguridad.habitos_nocivos.fumar.impacto}</p>
          <ul style="margin-top:8px; margin-left:20px; font-size:13px; color:var(--text2);">
            ${Engine.seguridad.habitos_nocivos.fumar.estrategia.map(e => `<li>${e}</li>`).join('')}
          </ul>
        </div>` : ''}

        ${u.alcohol === 'frecuente' ? `
        <div class="alert-box warning">
          <h4>🍷 Alerta: Consumo Frecuente de Alcohol</h4>
          <p>${Engine.seguridad.habitos_nocivos.alcohol.impacto}</p>
          <ul style="margin-top:8px; margin-left:20px; font-size:13px; color:var(--text2);">
            ${Engine.seguridad.habitos_nocivos.alcohol.estrategia.map(e => `<li>${e}</li>`).join('')}
          </ul>
        </div>` : ''}

        <div class="section-title">Higiene y Prevención Diaria</div>
        <div class="card-grid">
          ${Engine.seguridad.higiene_preventiva.map(h => `
            <div class="card">
              <div class="card-icon">${h.icono}</div>
              <h3>${h.accion}</h3>
              <p>${h.detalle}</p>
            </div>
          `).join('')}
        </div>

        <div class="section-title">Exámenes Médicos Recomendados para ti</div>
        <table class="shop-table">
          <thead>
            <tr>
              <th>Examen</th>
              <th>Frecuencia</th>
              <th>Propósito</th>
            </tr>
          </thead>
          <tbody>
            ${examenes.map(e => `
              <tr>
                <td><strong>${e.nombre}</strong></td>
                <td>${e.frecuencia}</td>
                <td>${e.descripcion}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // ── 10. Suplementos ───────────────────────
  renderSuplementos() {
    return `
      <div class="module">
        <div class="module-header">
          <span class="module-badge badge-purple">Optimización</span>
          <h1>Suplementos Estratégicos</h1>
          <p class="desc">Espacio reservado para integración de suplementos específicos. Recuerda: los suplementos no reemplazan una mala dieta, solo optimizan una buena.</p>
        </div>
        
        <div class="card-grid">
          <div class="card">
            <div class="card-icon">💊</div>
            <h3>Magnesio (Glicinato o Citrato)</h3>
            <p>Esencial para el 80% de la población. Mejora el sueño, relaja músculos y reduce ansiedad.</p>
          </div>
          <div class="card">
            <div class="card-icon">☀️</div>
            <h3>Vitamina D3 + K2</h3>
            <p>Fundamental si trabajas en interiores. Modula el sistema inmune y hormonas.</p>
          </div>
          <div class="card">
            <div class="card-icon">🐟</div>
            <h3>Omega 3 (EPA/DHA)</h3>
            <p>Anti-inflamatorio sistémico y esencial para la salud cerebral y cardiovascular.</p>
          </div>
        </div>
        
        <div class="alert-box">
          <p><em>Próximamente: Tienda integrada con recomendaciones precisas de marcas de alta biodisponibilidad según tu ubicación.</em></p>
        </div>
      </div>
    `;
  },

  // ── 11. BioHacks y Curiosidades ─────────────
  renderBioHacks(u) {
    const bh = Engine.bioHacks;
    
    // 1. Filtrar Hacks Vitales según perfil
    let hacksVitales = [];
    
    // Hacks Hormonales basados en el Sexo
    const hormonaSexo = bh.hormonas.find(h => h.targetSexo === u.sexo);
    if (hormonaSexo) {
      hacksVitales.push(hormonaSexo);
    }

    const hormonaSerotonina = bh.hormonas.find(h => h.targetSexo === 'ambos');

    if (u.estres === 'alto' || u.sueno === 'malo') {
      if (hormonaSerotonina) hacksVitales.push(hormonaSerotonina);
      hacksVitales.push(bh.habitos_fisicos[0]); // Morderse las uñas / Cortisol
    }
    
    // Hacks estéticos y digestivos
    if (u.digestion === 'gases' || u.digestion === 'estreñimiento' || u.digestion === 'acidez') {
      hacksVitales.push(bh.habitos_fisicos[2]); // Sarro y digestión (Oil pulling)
      hacksVitales.push(bh.olor_corporal[0]); // Olor (relacionado con digestión)
    } else {
      hacksVitales.push(bh.olor_corporal[1]); // Piedra de alumbre
    }

    if (u.sexo === 'masculino' && u.edad >= 25) {
      hacksVitales.push(bh.habitos_fisicos[1]); // Calvicie
    }

    // Prevención por edad y sexo
    if (u.sexo === 'femenino') {
      const senoHack = bh.prevencion.find(h => h.titulo.includes('Senos'));
      if(senoHack) hacksVitales.push(senoHack);
    }

    if (u.edad <= 25) {
      hacksVitales.push(bh.piel_estetica[3]); // Acné
      hacksVitales.push(bh.prevencion[1]); // Embarazo Precoz
    } else {
      hacksVitales.push(bh.prevencion[2]); // Automedicación
    }

    // Estética general (Rotación aleatoria simple para que vean variedad)
    if (u.edad > 20) {
      hacksVitales.push(bh.piel_estetica[2]); // Cremas corporales
      hacksVitales.push(bh.piel_estetica[1]); // Afeitado
    }

    // Si tiene enfermedades o sobrepeso (acantosis)
    if (u.enfermedades.length > 0 || u.objetivos.includes('bajar_grasa')) {
      hacksVitales.push(bh.piel_estetica[0]); // Aclarar zonas oscuras (Insulina)
    }

    // Eliminar valores undefined (por si alguna matriz no está cargada)
    hacksVitales = hacksVitales.filter(h => h !== undefined);

    // Asegurar al menos 2 hacks si el perfil es muy "limpio"
    if (hacksVitales.length === 0) {
      if (hormonaSexo) hacksVitales.push(hormonaSexo);
      else if (hormonaSerotonina) hacksVitales.push(hormonaSerotonina);
      hacksVitales.push(bh.olor_corporal[1]);
    }

    // Eliminar duplicados (por si acaso)
    const hacksFinales = [...new Set(hacksVitales)];

    // 2. Seleccionar 2 Curiosidades Aleatorias
    const curAleatorias = [...Engine.curiosidades_aleatorias].sort(() => 0.5 - Math.random()).slice(0, 2);

    const buildCards = (array) => {
      return array.map(item => `
        <div class="card" style="margin-bottom: 15px; border-left: 4px solid var(--primary);">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <div class="card-icon" style="margin:0;">${item.icono}</div>
            <h3 style="margin:0;">${item.titulo}</h3>
          </div>
          <p style="line-height: 1.6;">${item.contenido}</p>
        </div>
      `).join('');
    };

    return `
      <div class="module">
        <div class="module-header">
          <span class="module-badge" style="background:var(--purple); color:#fff;">BioHacking</span>
          <h1>Ingeniería Humana</h1>
          <p class="desc">Hemos filtrado estos trucos biológicos específicamente para tu perfil actual. Conoce cómo manipular tu química interna.</p>
        </div>
        
        <div class="section-title">⚡ Hacks Vitales para Ti</div>
        <div class="card-grid" style="grid-template-columns: 1fr;">
          ${buildCards(hacksVitales)}
        </div>

        <div class="section-title">🎲 Datos Mente (Aleatorios)</div>
        <div class="card-grid" style="grid-template-columns: 1fr;">
          ${buildCards(curAleatorias)}
        </div>
      </div>
    `;
  },

  // ── 12. Modal de Pago Binance Pay (Planes Mensual y Anual) ──
  renderPaymentModal(u) {
    const regional = Engine.getPrecioRegional(u.ubicacion || 'Estados Unidos');
    let precioAnual = regional.monto;
    let precioMensual = 2.50; 
    
    if (u.discountUnlocked) {
      precioAnual = (regional.monto / 2).toFixed(2);
    }

    return `
      <div id="cryptoPaymentModal" class="modal" style="display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.9); z-index:2000;">
        <div class="modal-content" style="max-width:450px; text-align:center; position:relative; border: 1px solid var(--border); padding:30px;">
          <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
          
          <div style="margin-bottom:20px;">
            <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" width="45" style="margin-bottom:10px;">
            <h2 style="margin-bottom:5px;">Activar Vida Óptima Premium</h2>
            <p style="font-size:12px; color:var(--text3);">Pago Seguro vía Binance Pay (USDT/BNB)</p>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:25px;">
            <div class="plan-card" onclick="document.querySelectorAll('.plan-card').forEach(c=>c.classList.remove('active')); this.classList.add('active'); window._selectedPlan='monthly';" style="padding:15px; border:1px solid var(--border); border-radius:12px; cursor:pointer; background:rgba(255,255,255,0.02);">
              <div style="font-size:11px; color:var(--text3);">MENSUAL</div>
              <div style="font-size:22px; font-weight:800; color:var(--text); margin:5px 0;">$${precioMensual}</div>
              <div style="font-size:10px; color:var(--text3);">Sin descuentos</div>
            </div>
            
            <div class="plan-card active" onclick="document.querySelectorAll('.plan-card').forEach(c=>c.classList.remove('active')); this.classList.add('active'); window._selectedPlan='annual';" style="padding:15px; border:1px solid var(--primary); border-radius:12px; cursor:pointer; background:rgba(var(--primary-rgb), 0.05); position:relative;">
              ${u.discountUnlocked ? '<div style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:var(--green); color:var(--bg); font-size:9px; padding:2px 6px; border-radius:4px; font-weight:900;">BECA ACTIVA</div>' : ''}
              <div style="font-size:11px; color:var(--primary);">ANUAL</div>
              <div style="font-size:22px; font-weight:800; color:var(--primary); margin:5px 0;">$${precioAnual}</div>
              <div style="font-size:10px; color:var(--text3);">${u.discountUnlocked ? '<span style="text-decoration:line-through;">$'+regional.monto+'</span>' : 'Ahorra 25%'}</div>
            </div>
          </div>

          <div id="paymentArea" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px; margin-bottom:20px;">
            <div style="background:#fff; padding:10px; border-radius:8px; display:inline-block; margin-bottom:15px;">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=binance_pay_vida_optima_${u.nombre}" width="130" height="130">
            </div>
            <div id="paymentStatus" style="font-size:12px; color:var(--yellow); animation: pulse 1.5s infinite;">⌛ Esperando pago en red Binance...</div>
          </div>

          <button class="btn-primary" style="width:100%; padding:15px; background:var(--green); color:var(--bg); font-weight:800;" onclick="simulatePaymentSuccess(window._selectedPlan || 'annual')">VERIFICAR PAGO ✅</button>
          
          <p style="font-size:11px; color:var(--text3); margin-top:15px; line-height:1.4;">
            * El plan anual consume tus Optimal Coins acumulados como parte del beneficio de la Beca de Salud.
          </p>
        </div>
      </div>
    `;
  },

  // ── 13. Módulo Beca de Salud (Centro de Tareas) ──
  renderRewards(u) {
    const progress = Math.min(100, ((u.totalVideosWatched || 0) / 15) * 100);
    const todayCount = u.videosToday || 0;
    
    return `
      <div class="module">
        <div class="module-header">
          <span class="module-badge badge-green">Centro de Recompensas</span>
          <h1>🎁 Beca de Salud Vida Óptima</h1>
          <p class="desc">Aprende sobre biohacking y desbloquea descuentos reales. Tu disciplina es tu moneda.</p>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:30px;">
          <div class="stat-box" style="background:var(--bg2); border:1px solid var(--primary);">
            <div class="stat-value" style="color:var(--primary);">💎 ${u.coins || 0}</div>
            <div class="stat-label">Optimal Coins</div>
          </div>
          <div class="stat-box" style="background:var(--bg2); border:1px solid var(--green);">
            <div class="stat-value" style="color:var(--green);">${u.totalVideosWatched || 0}/15</div>
            <div class="stat-label">Cápsulas Vistas</div>
          </div>
        </div>

        <div class="card" style="padding:25px; background:rgba(var(--primary-rgb), 0.05); border:1px solid var(--border);">
          <h3 style="margin-bottom:10px;">📺 Tarea Diaria: Cápsulas de Biología</h3>
          <p style="font-size:13px; color:var(--text2); margin-bottom:20px;">
            Mira 3 videos educativos al día durante 5 días para desbloquear el <strong>50% de descuento</strong> en tu suscripción anual.
          </p>

          <div style="margin-bottom:25px;">
            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:8px; color:var(--text3);">
              <span>PROGRESO HACIA EL DESCUENTO</span>
              <span>${u.totalVideosWatched || 0} de 15</span>
            </div>
            <div style="height:10px; background:rgba(255,255,255,0.1); border-radius:10px; overflow:hidden;">
              <div style="width:${progress}%; height:100%; background:linear-gradient(90deg, var(--primary), var(--green)); transition:width 1s ease;"></div>
            </div>
          </div>

          <div style="display:flex; gap:10px; justify-content:center; margin-bottom:25px;">
            <div style="width:30px; height:30px; border-radius:50%; background:${todayCount >= 1 ? 'var(--green)' : 'rgba(255,255,255,0.1)'}; display:flex; align-items:center; justify-content:center; font-size:12px;">${todayCount >= 1 ? '✅' : '1'}</div>
            <div style="width:30px; height:30px; border-radius:50%; background:${todayCount >= 2 ? 'var(--green)' : 'rgba(255,255,255,0.1)'}; display:flex; align-items:center; justify-content:center; font-size:12px;">${todayCount >= 2 ? '✅' : '2'}</div>
            <div style="width:30px; height:30px; border-radius:50%; background:${todayCount >= 3 ? 'var(--green)' : 'rgba(255,255,255,0.1)'}; display:flex; align-items:center; justify-content:center; font-size:12px;">${todayCount >= 3 ? '✅' : '3'}</div>
          </div>

          <button class="btn-primary" style="width:100%; padding:15px;" onclick="watchVideo()">
            ${todayCount >= 3 ? '🎯 Tareas de hoy completadas' : '▶️ Ver Cápsula de Salud (+10 Coins)'}
          </button>
        </div>

        <div class="alert-box warning" style="margin-top:30px; border-left-color: var(--primary);">
          <h4>📜 El Valor de tus Optimal Coins</h4>
          <p style="font-size:12px; line-height:1.5;">
            Tus monedas son <strong>Activos Biológicos</strong> acumulables. En las próximas fases de Vida Óptima, podrás canjearlas por:
            <br>• Descuentos en envíos de comida saludable (Delivery).
            <br>• Cupones para compras de supermercado seleccionadas.
            <br>• Descuentos en laboratorios clínicos y exámenes médicos.
            <br>• Compra de libros digitales y suplementos certificados.
            <br>• Consultas con expertos y entrenadores élite.
            <br><br>
            <em>Si decides usar el descuento del 50% en tu suscripción anual, tus monedas se deducirán para activar el beneficio.</em>
          </p>
        </div>
      </div>
    `;
  }
};
