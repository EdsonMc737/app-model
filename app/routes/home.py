import os
import json

from flask import Blueprint, render_template, current_app, abort

home_bp = Blueprint("home", __name__)


def carregar_dados():
    json_path = os.path.join(
        current_app.static_folder,
        "data",
        "modelos.json"
    )

    print("==============================")
    print("CAMINHO DO JSON:")
    print(json_path)
    print("==============================")

    if not os.path.exists(json_path):
        print(" Arquivo modelos.json não encontrado.")
        return {"modelos": []}

    try:
        with open(json_path, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)

        print("JSON carregado com sucesso.")
        print("Total de modelos:", len(dados.get("modelos", [])))

        return dados

    except Exception as erro:
        print(" Erro ao ler o JSON:")
        print(erro)
        return {"modelos": []}


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

    menu = preparar_menu(dados)

    return render_template(
        "pages/perfil.html",
        modelo=modelo,
        **menu
    )