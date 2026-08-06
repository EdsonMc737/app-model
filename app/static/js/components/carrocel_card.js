document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".carousel-track");
    const cards = document.querySelectorAll(".card-projetor");

    const next = document.querySelector(".direita");
    const prev = document.querySelector(".esquerda");

    if (!track || !next || !prev || cards.length === 0) {
        return;
    }

    let index = 0;

    function mover() {

        const larguraCard = cards[0].offsetWidth + 20; // 20 = gap

        track.style.transform = `translateX(-${index * larguraCard}px)`;

    }

    next.addEventListener("click", () => {

        if (index < cards.length - 1) {

            index++;
            mover();

        }

    });

    prev.addEventListener("click", () => {

        if (index > 0) {

            index--;
            mover();

        }

    });

    window.addEventListener("resize", mover);

});