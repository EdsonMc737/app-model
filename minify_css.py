from pathlib import Path
from cssmin import cssmin

css_file = Path("app/static/css/style.css")
min_file = Path("app/static/css/style.min.css")

css = css_file.read_text(encoding="utf-8")
min_file.write_text(cssmin(css), encoding="utf-8")

print("✅ CSS minificado com sucesso!")