// ======================================
// Header Scroll
// ======================================
window.addEventListener("scroll", () => 
{

    const header = document.querySelector(".header");
    if(window.scrollY > 100){
        header.classList.add("ativo");
    }else{
        header.classList.remove("ativo");
    }
});
// ======================================
// Menu Mobile
// ======================================
const btnMenu = document.querySelector(".menu-mobile");
console.log(btnMenu)
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".menu-overlay");

btnMenu.addEventListener("click",() => {
    const aberto = menu.classList.toggle("ativo");
    overlay.classList.toggle("ativo");

    document.body.classList.toggle("menu-aberto");

    btnMenu.innerHTML = aberto
    ? '<i data-lucide="x" class="icone-menu"></i>'
    : '<i data-lucide="menu" class="icone-menu"></i>';

    lucide.createIcons();
});

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach(link => {
    
    link.addEventListener("click",() => {
        menu.classList.remove("ativo");
        overlay.classList.remove("ativo");

        document.body.classList.remove("menu-aberto");

        btnMenu.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });
});

overlay.addEventListener("click",() => {

    menu.classList.remove("ativo");
    overlay.classList.remove("ativo");

    document.body.classList.remove("menu-aberto");

    btnMenu.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
});

window.addEventListener("resize", () => {

    if(window.innerWidth > 768){
        menu.classList.remove("ativo");
        overlay.classList.remove("ativo");

    document.body.classList.remove("menu-aberto");

    btnMenu.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
        
    }
});

// ============================================
// Carrossel Novidades
// ============================================

const indicadores = document.querySelectorAll(".indicador");
const novidades = [
    {
    tag:"NOVO MODELO",
    titulo: "NOVA SCOOTER G15",
    descricao: "Conheça o mais novo modelo da Scooter eletrica disponível em nossas unidades. Mais autonomia, design renovado e painel totalmente digital.",
    imagem: "assets/Images/scooter.png"
},

{  
    tag:"BOLETO",
    titulo: "SEU APARELHO NOVO EM ATÉ 24X",
    descricao: "Celular no boleto sem consulta SPC ou Serasa em até 18x! Confira nossas opções de boletos e veja a que melhor lhe atende!",
    imagem: "assets/Images/boleto.jpg"
},

{
    tag:"SERVIÇO",
    titulo: "Assistência Tecnica",
    descricao: "Seu aparelho pronto em até 40 minutos em nossa Assistência Tecnica Expecializada!.",
    imagem: "assets/Images/Assistencia.png"
}

    
];

const tag = document.querySelector("#tag-noticia");
const titulo = document.querySelector("#titulo-noticia");
const descricao = document.querySelector("#descricao-noticia");
const imagem = document.querySelector("#imagem-noticia");

let indiceAtual = 0;

function atualizarNoticia(){
   const noticia = novidades[indiceAtual];

   const elementos = [
    tag,
    titulo,
    descricao,
    imagem
   ];

   elementos.forEach(elemento =>{
    elemento.classList.add("trocando");
   });

   setTimeout(() =>{

    tag.textContent = noticia.tag;
    titulo.textContent = noticia.titulo;
    descricao.textContent = noticia.descricao;
    imagem.src = noticia.imagem;

    elementos.forEach(elemento =>{
        elemento.classList.remove("trocando");
    });

    // Atualiza os Indicadores
    indicadores.forEach((indicador,indice) => {
        indicador.classList.toggle("ativo", indice === indiceAtual);
    });

   },300);
}

atualizarNoticia();



indicadores.forEach((indicador, indice) => {

    indicador.addEventListener("click", () => {

        indiceAtual = indice;
        atualizarNoticia();
        reiniciarAutoplay();

    });

});


const btnAnterior = document.querySelector(".btn-anterior");
const btnProximo = document.querySelector(".btn-proximo");

btnProximo.addEventListener("click", () => {
    proximaNoticia();
    reiniciarAutoplay();
});

btnAnterior.addEventListener("click", () => {

    indiceAtual--;

    if (indiceAtual < 0){
        indiceAtual = novidades.length - 1;
    }

    atualizarNoticia();
    reiniciarAutoplay();

});
// Automaziar o Carrossel

function proximaNoticia(){

    indiceAtual++;

    if (indiceAtual >= novidades.length){
        indiceAtual = 0;
    }

    atualizarNoticia();

}

let autoplay = setInterval(proximaNoticia, 5000);

function reiniciarAutoplay(){

    clearInterval(autoplay);

    autoplay = setInterval(proximaNoticia, 5000)
};

// Animação Cards Produtos

const cardsProdutos =
document.querySelectorAll(".card-produto");

const observerProdutos = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("aparecer");
        }
    });
},{
    threshold:0.25
});
cardsProdutos.forEach(card => {
    observerProdutos.observe(card);
});

cardsProdutos.forEach((card, index) => {
    card.style.transitionDelay = '{index * 0.15}s';
    observerProdutos.observe(card);
});

if(entry.isIntersecting){
    entry.target.classList.add("aparecer");
    observerProdutos.unobserve(entry.target);
}