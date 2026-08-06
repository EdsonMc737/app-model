from flask import Flask

from version import APP_NAME, __version__


def create_app():

    app = Flask(__name__)

    app.config["APP_NAME"] = APP_NAME
    app.config["APP_VERSION"] = __version__


    from app.routes.home import home_bp

    app.register_blueprint(home_bp)


    print("ROTAS REGISTRADAS:")
    print(app.url_map)


    return app