// Lógica de JavaScript protegida (solo se ejecuta si el elemento existe en móviles)
const btnDescubrir = document.getElementById("btnDescubrir");
const capaPortada = document.getElementById("capaPortada");
const capaInfo = document.getElementById("capaInfo");
const canvas = document.getElementById("canvasEfecto");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function ajustarCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  ajustarCanvas();
  window.addEventListener("resize", ajustarCanvas);

  let particulas = [];
  let animando = false;

  class ParticulaDesintegracion {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = (Math.random() - 0.6) * 8;
      this.radio = Math.random() * 2.5 + 0.8;
      this.opacidad = 1;
      this.gravedad = 0.04;
      this.desvanecer = Math.random() * 0.012 + 0.006;
    }

    actualizar() {
      this.x += this.vx;
      this.y += this.vy + this.gravedad;
      this.opacidad -= this.desvanecer;
    }

    dibujar() {
      ctx.save();
      ctx.globalAlpha = this.opacidad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function crearExplosionParticulas() {
    const coloresMagicos = [
      "#ffffff",
      "#fffde8",
      "#fcedc2",
      "#d4af37",
      "#aa8011",
    ];
    for (let i = 0; i < 400; i++) {
      let x = Math.random() * canvas.width;
      let y = (Math.random() * 0.6 + 0.2) * canvas.height;
      let color =
        coloresMagicos[Math.floor(Math.random() * coloresMagicos.length)];
      particulas.push(new ParticulaDesintegracion(x, y, color));
    }
  }

  function bucleAnimacion() {
    if (!animando) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particulas.length - 1; i >= 0; i--) {
      let p = particulas[i];
      p.actualizar();
      p.dibujar();

      if (p.opacidad <= 0) {
        particulas.splice(i, 1);
      }
    }

    if (particulas.length > 0) {
      requestAnimationFrame(bucleAnimacion);
    } else {
      animando = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  btnDescubrir.addEventListener("click", () => {
    capaPortada.classList.add("portada-oculta");
    animando = true;
    crearExplosionParticulas();
    bucleAnimacion();
    capaInfo.classList.add("info-activa");
  });
}

// efecto nombre  //

const canvas1 = document.getElementById("textCanvas");
const ctx1 = canvas1.getContext("2d");

// CONFIGURACIÓN DEL TEXTO
const textoAAnimar = "Valentina";

function resizeCanvas() {
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Parámetros de control de animación
let progreso = 0;
const velocidadAnimacion = 0.02; // Velocidad del trazo
const particulas = [];

// Clase para las partículas de polvo de estrellas
class Particula {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1.8;
    this.vy = (Math.random() - 0.5) * 1.8 - 0.4;
    this.alpha = 1;
    this.size = Math.random() * 3.5 + 1.5;
    this.decay = Math.random() * 0.004 + 0.003;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw() {
    ctx1.save();
    ctx1.globalAlpha = this.alpha;
    ctx1.beginPath();
    ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx1.fillStyle = "#fffdf0";
    ctx1.shadowBlur = 12;
    ctx1.shadowColor = "#ffe680";
    ctx1.fill();
    ctx1.restore();
  }
}

function drawScene() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

  // CONFIGURACIÓN DE LA FUENTE
  const fontSize = Math.min(canvas1.width, canvas1.height) * 0.22;
  ctx1.font = `${fontSize}px 'Alex Brush', cursive`;
  ctx1.textAlign = "center";
  ctx1.textBaseline = "middle";

  const xCentro = canvas1.width / 2;
  const yCentro = canvas1.height / 2;

  // Calcular dimensiones exactas del texto
  const metricaTexto = ctx1.measureText(textoAAnimar);
  const anchoTexto = metricaTexto.width;

  const xInicio = xCentro - anchoTexto / 2;

  // Posición horizontal de la punta del cometa
  const cometaX = xInicio + anchoTexto * Math.min(progreso, 1);
  // Ondulación sutil para el cabezal
  const cometaY =
    yCentro + Math.sin(progreso * Math.PI * 4) * (fontSize * 0.05);

  // --- REPLICACIÓN DEL ESTILO DORADO METÁLICO (CSS a Canvas) ---
  // Creamos el degradado lineal exacto que especificaste en tu CSS vertical (to bottom)
  const degradadoDorado = ctx1.createLinearGradient(
    xCentro,
    yCentro - fontSize / 2,
    xCentro,
    yCentro + fontSize / 2,
  );
  degradadoDorado.addColorStop(0.0, "#fffdf0");
  degradadoDorado.addColorStop(0.4, "#f3d078");
  degradadoDorado.addColorStop(0.7, "#c59b27");
  degradadoDorado.addColorStop(1.0, "#9a7314");

  // 1. REVELADO MÁGICO CON MÁSCARA DE RECORTE
  if (progreso > 0) {
    ctx1.save();

    // Aplicamos los efectos de sombra (drop-shadow de tu CSS)
    ctx1.filter = `
                    drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.8)) 
                    drop-shadow(0px 0px 10px rgba(212, 175, 55, 0.3))
                `;

    ctx1.beginPath();
    // Si la animación terminó (progreso >= 1), revelamos el 100% permanentemente
    if (progreso >= 1) {
      ctx1.rect(0, 0, canvas1.width, canvas1.height);
    } else {
      ctx1.rect(0, 0, cometaX, canvas1.height);
    }
    ctx1.clip();

    // Asignamos el degradado metálico como color de relleno
    ctx1.fillStyle = degradadoDorado;
    ctx1.fillText(textoAAnimar, xCentro, yCentro);

    ctx1.restore();
  }

  // 2. GENERAR POLVO DE ESTRELLAS (Solo si la escritura sigue activa)
  if (progreso < 1) {
    for (let i = 0; i < 8; i++) {
      const offsetY = (Math.random() - 0.5) * (fontSize * 0.6);
      particulas.push(new Particula(cometaX, yCentro + offsetY));
    }
  }

  // 3. ACTUALIZAR Y RENDERIZAR PARTÍCULAS
  for (let i = particulas.length - 1; i >= 0; i--) {
    particulas[i].update();
    particulas[i].draw();
    if (particulas[i].alpha <= 0) {
      particulas.splice(i, 1);
    }
  }

  // 4. CABEZAL DEL COMETA (Solo se dibuja mientras está escribiendo)
  if (progreso < 1) {
    ctx1.save();
    ctx1.beginPath();
    ctx1.arc(cometaX, cometaY, 7, 0, Math.PI * 2);
    ctx1.fillStyle = "#ffffff";
    ctx1.shadowBlur = 35;
    ctx1.shadowColor = "#ffffff";
    ctx1.fill();
    ctx1.restore();
  }

  // 5. CONTROL DE PARADA PERMANENTE
  if (progreso < 1) {
    progreso += velocidadAnimacion;
  }

  // Sigue ejecutando el bucle de renderizado continuamente para mantener el texto dorado estático en pantalla
  requestAnimationFrame(drawScene);
}

// Esperar a que la fuente de Google Fonts esté lista para iniciar
document.fonts
  .load(`${Math.min(canvas1.width, canvas1.height) * 0.22}px 'Alex Brush'`)
  .then(() => {
    drawScene();
  });

// efecto cascada  //

const canvas3 = document.getElementById("canvasMagico");
const ctx3 = canvas3.getContext("2d");

function ajustarCanvas() {
  canvas3.width = window.innerWidth;
  canvas3.height = window.innerHeight;
}
ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

const particulas1 = [];
// Controla la densidad de la lluvia mágica
const frecuenciaEmision = 3;

// Paleta de colores brillantes (dorados y blancos cálidos como el video)
const colores = ["#fffdf0", "#ffefa0", "#ffd778", "#ffbe50"];

class ParticulaMagica {
  constructor() {
    // Aparecen a lo largo de todo el ancho superior de la pantalla
    this.x = Math.random() * canvas3.width;
    this.y = -10;

    // Tamaños pequeños y variados para dar profundidad de "polvo estelar"
    this.radio = Math.random() * 2.5 + 0.5;
    this.color = colores[Math.floor(Math.random() * colores.length)];

    // Dinámica de movimiento (caída vertical con leve balanceo horizontal)
    this.velocidadY = Math.random() * 2 + 1.5;
    this.velocidadX = Math.random() * 1 - 0.5;

    // Vida útil y opacidad para el efecto de desvanecimiento continuo
    this.opacidad = 1;
    this.desvanecimiento = Math.random() * 0.008 + 0.003;
  }

  actualizar() {
    this.y += this.velocidadY;
    this.x += this.velocidadX;
    // Reduce la opacidad gradualmente mientras cae
    this.opacidad -= this.desvanecimiento;
  }

  dibujar() {
    ctx3.save();
    ctx3.globalAlpha = this.opacidad;
    ctx3.beginPath();
    ctx3.arc(this.x, this.y, this.radio, 0, Math.PI * 2);

    // Simulación del resplandor de luz (Glow effect)
    ctx3.shadowBlur = Math.random() * 8 + 4;
    ctx3.shadowColor = this.color;

    ctx3.fillStyle = this.color;
    ctx3.fill();
    ctx3.restore();
  }
}

function animar() {
  // Limpiamos el lienzo en cada frame
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

  // Generamos nuevas partículas continuamente en la parte superior
  for (let i = 0; i < frecuenciaEmision; i++) {
    particulas1.push(new ParticulaMagica());
  }

  // Actualizamos y dibujamos el conjunto de partículas
  for (let i = particulas1.length - 1; i >= 0; i--) {
    const p = particulas1[i];
    p.actualizar();
    p.dibujar();

    // Optimizamos memoria eliminando las partículas invisibles o fuera de pantalla
    if (p.opacidad <= 0 || p.y > canvas3.height) {
      particulas1.splice(i, 1);
    }
  }

  requestAnimationFrame(animar);
}

// Iniciar la animación mágica
animar();
