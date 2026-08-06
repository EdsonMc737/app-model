document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".coverflow-card");

    const next = document.querySelector(".coverflow-btn.direita");
    const prev = document.querySelector(".coverflow-btn.esquerda");


    if (!cards.length) return;


    let index = 0;


    function atualizar(){

        cards.forEach((card, i)=>{

            card.className = "coverflow-card";


            let posicao = (i - index + cards.length) % cards.length;


            if(posicao === 0){

                card.classList.add("center");

            }

            else if(posicao === 1){

                card.classList.add("right");

            }

            else if(posicao === cards.length - 1){

                card.classList.add("left");

            }

            else{

                card.classList.add("hidden");

            }

        });

    }



    next.addEventListener("click", ()=>{

        index++;

        if(index >= cards.length){

            index = 0;

        }

        atualizar();

    });



    prev.addEventListener("click", ()=>{

        index--;

        if(index < 0){

            index = cards.length - 1;

        }

        atualizar();

    });



    atualizar();


});