window.addEventListener("scroll", () => 
{

    const header = document.querySelector(".header");
    if(window.scrollY > 100){
        header.classList.add("ativo");
    }else{
        header.classList.remove("ativo");
    }
});

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
