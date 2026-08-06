import os
import json

from flask import Blueprint, render_template, current_app, abort


home_bp = Blueprint("home", __name__)


def carregar_json(nome_arquivo):

    json_path = os.path.join(
        current_app.static_folder,
        "data",
        nome_arquivo
    )

    print("==============================")
    print("CAMINHO DO JSON:")
    print(json_path)
    print("==============================")


    if not os.path.exists(json_path):
        print(f"Arquivo {nome_arquivo} não encontrado.")
        return {}


    try:
        with open(json_path, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)

        print(f"{nome_arquivo} carregado com sucesso.")

        return dados


    except Exception as erro:
        print("Erro ao ler JSON:")
        print(erro)

        return {}



def carregar_dados():

    return carregar_json("modelos.json")



def carregar_ensaios():

    dados = carregar_json("ensaio.json")

    if isinstance(dados, list):
        return dados

    return dados.get("ensaio", [])


def preparar_menu(dados):

    modelos = dados.get("modelos", [])

    return {
        "modelos": modelos,
        "itens": modelos
    }



@home_bp.route("/")
def home_page():

    dados = carregar_dados()

    menu = preparar_menu(dados)


    return render_template(
        "pages/index.html",
        **menu
    )



@home_bp.route("/modelos")
def modelos():

    dados = carregar_dados()

    menu = preparar_menu(dados)


    return render_template(
        "pages/modelos.html",
        **menu
    )



@home_bp.route("/perfil/<id>")
def perfil(id):

    dados = carregar_dados()

    modelos = dados.get("modelos", [])



    modelo = next(
        (
            m for m in modelos
            if str(m.get("id")) == str(id)
        ),
        None
    )



    if modelo is None:
        abort(404)



    # ==========================
    # CARREGA OS ENSAIOS
    # ==========================

    ensaios = carregar_ensaios()



    # Filtra ensaios da modelo

    ensaios_modelo = [
        e for e in ensaios
        if str(e.get("modeloId")) == str(id)
    ]



    print("==============================")
    print("MODELO:", id)
    print("TOTAL ENSAIOS:", len(ensaios_modelo))
    print("==============================")



    menu = preparar_menu(dados)



    return render_template(
        "pages/perfil.html",
        modelo=modelo,
        ensaios=ensaios_modelo,
        **menu
    )