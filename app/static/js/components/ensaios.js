console.log("ENSaios JS OK");


let fotosAtuais = [];
let fotoAtual = 0;


/* =========================================================
   ELEMENTOS
========================================================= */

const modal = document.getElementById("galeriaModal");
const modalImagem = document.getElementById("modalImagem");
const modalContador = document.getElementById("modalContador");

const botaoFechar = document.querySelector(".modal-fechar");
const botaoEsquerda = document.querySelector(".modal-esquerda");
const botaoDireita = document.querySelector(".modal-direita");


/* =========================================================
   ABRIR GALERIA
========================================================= */

function abrirGaleria(card, indice) {

    const dados = card.getAttribute("data-galeria");

    if (!dados) {
        console.error("data-galeria não encontrado.");
        return;
    }

    try {
        fotosAtuais = JSON.parse(dados);
    } catch (erro) {
        console.error("Erro no JSON das fotos:", erro);
        return;
    }

    if (!Array.isArray(fotosAtuais) || fotosAtuais.length === 0) {
        console.error("Nenhuma foto encontrada.");
        return;
    }

    fotoAtual = indice;

    atualizarModal();

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


/* =========================================================
   ATUALIZAR FOTO
========================================================= */

function atualizarModal() {

    if (!fotosAtuais.length) {
        return;
    }


    /* Limita o índice */

    if (fotoAtual < 0) {
        fotoAtual = 0;
    }

    if (fotoAtual >= fotosAtuais.length) {
        fotoAtual = fotosAtuais.length - 1;
    }


    /* Foto */

    modalImagem.src = fotosAtuais[fotoAtual];

    modalImagem.alt =
        "Foto " + (fotoAtual + 1);


    /* Contador */

    modalContador.textContent =
        `${fotoAtual + 1} / ${fotosAtuais.length}`;


    /* =====================================================
       SETA ESQUERDA
    ===================================================== */

    if (fotoAtual > 0) {

        botaoEsquerda.style.visibility = "visible";
        botaoEsquerda.style.pointerEvents = "auto";

    } else {

        botaoEsquerda.style.visibility = "hidden";
        botaoEsquerda.style.pointerEvents = "none";
    }


    /* =====================================================
       SETA DIREITA
    ===================================================== */

    if (fotoAtual < fotosAtuais.length - 1) {

        botaoDireita.style.visibility = "visible";
        botaoDireita.style.pointerEvents = "auto";

    } else {

        botaoDireita.style.visibility = "hidden";
        botaoDireita.style.pointerEvents = "none";
    }
}


/* =========================================================
   FECHAR
========================================================= */

function fecharGaleria() {

    modal.classList.remove("aberto");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    modalImagem.src = "";

    fotosAtuais = [];

    fotoAtual = 0;
}


/* =========================================================
   FOTO ANTERIOR
========================================================= */

function fotoAnterior() {

    console.log("← ESQUERDA");

    if (!fotosAtuais.length) {
        return;
    }

    if (fotoAtual <= 0) {
        return;
    }

    fotoAtual--;

    atualizarModal();
}


/* =========================================================
   PRÓXIMA FOTO
========================================================= */

function proximaFoto() {

    console.log("→ DIREITA");

    if (!fotosAtuais.length) {
        return;
    }

    if (fotoAtual >= fotosAtuais.length - 1) {
        return;
    }

    fotoAtual++;

    atualizarModal();
}


/* =========================================================
   CLIQUE NAS MINIATURAS E + FOTOS
========================================================= */

document.addEventListener("click", function(event) {

    const elemento = event.target.closest(
        ".abrir-foto, .mais-fotos"
    );

    if (!elemento) {
        return;
    }


    const card = elemento.closest(".ensaio-card");

    if (!card) {
        console.error("ensaio-card não encontrado.");
        return;
    }


    let indice = parseInt(
        elemento.getAttribute("data-foto-index"),
        10
    );


    if (Number.isNaN(indice)) {
        indice = 0;
    }


    abrirGaleria(card, indice);
});


/* =========================================================
   BOTÃO FECHAR
========================================================= */

if (botaoFechar) {

    botaoFechar.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            fecharGaleria();
        }
    );
}


/* =========================================================
   BOTÃO ESQUERDA
========================================================= */

if (botaoEsquerda) {

    botaoEsquerda.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            fotoAnterior();
        }
    );
}


/* =========================================================
   BOTÃO DIREITA
========================================================= */

if (botaoDireita) {

    botaoDireita.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            proximaFoto();
        }
    );
}


/* =========================================================
   CLICAR NO FUNDO
========================================================= */

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            fecharGaleria();
        }
    }
);


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (!modal.classList.contains("aberto")) {
            return;
        }


        if (event.key === "Escape") {

            fecharGaleria();
            return;
        }


        if (event.key === "ArrowLeft") {

            fotoAnterior();
            return;
        }


        if (event.key === "ArrowRight") {

            proximaFoto();
            return;
        }
    }
);