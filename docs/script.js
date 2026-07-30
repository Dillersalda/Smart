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

// Elementos do DOM
const indicadores = document.querySelectorAll(".indicador");
const tag = document.querySelector("#tag-noticia");
const titulo = document.querySelector("#titulo-noticia");
const descricao = document.querySelector("#descricao-noticia");
const imagem = document.querySelector("#imagem-noticia");

const btnAnterior = document.querySelector(".btn-anterior");
const btnProximo = document.querySelector(".btn-proximo");


// Variáveis
let novidades = [];
let indiceAtual = 0;
let autoplay;

// ============================================
// Carregar Notícias (JSON)
// ============================================

fetch("data/noticias.json")
    .then(resposta => resposta.json())
    .then(dados => {

        novidades = dados;

        atualizarNoticia();

        autoplay = setInterval(proximaNoticia, 5000);

    })
    .catch(erro => {
        console.error("Erro ao carregar as notícias:", erro);
    });

// ============================================
// Atualizar Card
// ============================================

function atualizarNoticia() {

    if (novidades.length === 0) return;

    const noticia = novidades[indiceAtual];

    const elementos = [
        tag,
        titulo,
        descricao,
        imagem
    ];

    elementos.forEach(elemento => {
        elemento.classList.add("trocando");
    });

    setTimeout(() => {

        tag.textContent = noticia.tag;
        titulo.textContent = noticia.titulo;
        descricao.textContent = noticia.descricao;
        imagem.src = noticia.imagem;

        elementos.forEach(elemento => {
            elemento.classList.remove("trocando");
        });

        indicadores.forEach((indicador, indice) => {
            indicador.classList.toggle("ativo", indice === indiceAtual);
        });

    }, 300);

}

// ============================================
// Próxima Notícia
// ============================================

function proximaNoticia() {

    if (novidades.length === 0) return;

    indiceAtual++;

    if (indiceAtual >= novidades.length) {
        indiceAtual = 0;
    }

    atualizarNoticia();

}

// ============================================
// Notícia Anterior
// ============================================

function noticiaAnterior() {

    if (novidades.length === 0) return;

    indiceAtual--;

    if (indiceAtual < 0) {
        indiceAtual = novidades.length - 1;
    }

    atualizarNoticia();

}

// ============================================
// Reiniciar Autoplay
// ============================================

function reiniciarAutoplay() {

    clearInterval(autoplay);

    autoplay = setInterval(proximaNoticia, 5000);

}

// ============================================
// Eventos dos Indicadores
// ============================================

indicadores.forEach((indicador, indice) => {

    indicador.addEventListener("click", () => {

        indiceAtual = indice;

        atualizarNoticia();

        reiniciarAutoplay();

    });

});

// ============================================
// Eventos dos Botões
// ============================================

btnProximo.addEventListener("click", () => {

    proximaNoticia();

    reiniciarAutoplay();

});

btnAnterior.addEventListener("click", () => {

    noticiaAnterior();

    reiniciarAutoplay();

});

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
    card.style.transitionDelay = `${index * 0.15}s`;
    observerProdutos.observe(card);
});

// ============================================
// Localização SmartBlin
// ============================================

const listaLojas = document.querySelector("#lista-lojas");

const nomeLoja = document.querySelector("#nome-loja");
const enderecoLoja = document.querySelector("#endereco-loja");
const telefoneLoja = document.querySelector("#telefone-loja");
const horarioLoja = document.querySelector("#horario-loja");

const mapaLoja = document.querySelector("#mapa-loja");
const videoLoja = document.querySelector("#video-loja");


let lojas = [];
let lojaAtual = 0;

// carregar lojas JSON

fetch("data/lojas.json")
    .then(resposta => resposta.json())
    .then(dados => {

        lojas = dados;
        criarCardsLojas();
    })

    .catch(erro => {
        console.error("Erro ao carregar lojas", erro);
    });

function criarCardsLojas() {
    lojas.forEach((loja, indice) => {
        const card = document.createElement("div");
        card.classList.add("card-loja");

        if(indice === 0){
            card.classList.add("ativo");
        }

        card.innerHTML =
        `<i class="fa-solid fa-location-dot"></i>
        <h4>${loja.regiao}</h4>
        <span>${loja.descricao}</span>`;

        card.addEventListener("click",() => {

            lojaAtual = indice;

            const todosCards = document.querySelectorAll(".card-loja");

            todosCards.forEach(card => {
                card.classList.remove("ativo");
            });


            card.classList.add("ativo");

            atualizarLoja();
        })

        listaLojas.appendChild(card);
    });
}

// Atualizar informações da loja

function atualizarLoja(){

    const loja = lojas[lojaAtual];


    elementosLoja.forEach(elemento => {

        elemento.classList.add("trocando-localizacao");

    });


    setTimeout(() => {


        nomeLoja.textContent = loja.regiao;

        enderecoLoja.textContent = loja.endereco;

        telefoneLoja.textContent = loja.telefone;

        horarioLoja.textContent = loja.horario;


        mapaLoja.src = loja.mapa;

        videoLoja.src = loja.video;
        videoLoja.pause();
        videoLoja.src = loja.video;
        videoLoja.load();


        elementosLoja.forEach(elemento => {

            elemento.classList.remove("trocando-localizacao");

        });


    },300);

}
const elementosLoja = [
    nomeLoja,
    enderecoLoja,
    telefoneLoja,
    horarioLoja,
    mapaLoja,
    videoLoja
];

