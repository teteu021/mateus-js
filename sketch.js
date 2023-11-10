//variáveis da bolinha
let xBolinha = 350;
let yBolinha = 250;
let Diametro = 30;
let Raio = Diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 200;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 685;
let yRaqueteOponente = 200;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;
function setup() {
  createCanvas(700, 500);
}

//sons do jogo
let ponto

function preload(){ 
ponto = loadSound("ponto.mp3")
}
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaqueteOponente(xRaqueteOponente, yRaqueteOponente);
  //movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
   marcaPonto()
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, Diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + Raio > width || xBolinha - Raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + Raio > height || yBolinha - Raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
}

function mostraRaqueteOponente(x, y) {
  rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura);
}
function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (
    xBolinha - Raio < xRaquete + raqueteComprimento &&
    yBolinha - Raio < yRaquete + raqueteAltura &&
    yBolinha + Raio > yRaquete
  ) {
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    Raio
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente =
    yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar() {
  textAlign(CENTER);
  textSize(18);
  fill(255);
  text(meusPontos, 300, 26);
  text(pontosOponente, 400, 26);
}

function marcaPonto() {
  if (xBolinha > 685) {
    meusPontos += 1;
  }

  if (xBolinha < 10) {
    pontosOponente = +1;
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0))
  rect(450, 10, 40, 20);
  fill(255)
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 685) {
    meusPontos += 1;
    ponto.play();
  }

  if (xBolinha < 10) {
    pontosOponente = +1;
  ponto.play();
  }
}