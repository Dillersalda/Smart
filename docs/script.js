window.addEventListener("scroll", () => 
{

    const header = document.querySelector(".header");
    if(window.scrollY > 150){
        header.classList.add("ativo");
    }else{
        header.classList.remove("ativo");
    }
});