import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def extract_docx(path: str) -> list[str]:
    with zipfile.ZipFile(path) as z:
        xml = z.read("word/document.xml").decode("utf-8")
    text = re.sub(r"</w:p>", "\n", xml)
    text = re.sub(r"<[^>]+>", "", text)
    text = (
        text.replace("\u2019", "'")
        .replace("\u2018", "'")
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u00e9", "e")
    )
    return [line.strip() for line in text.split("\n") if line.strip()]


for label, filename in [
    ("option1", "6N From Batumi - 1 Option.docx"),
    ("option2", "6N From Batumi - II Option.docx"),
]:
    path = Path(r"c:\Users\secvercel\Desktop") / filename
    lines = extract_docx(str(path))
    out = ROOT / "scripts" / f"batumi-6n-{label}.json"
    out.write_text(json.dumps(lines, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{label}: {len(lines)} lines -> {out.name}")
    for i, line in enumerate(lines):
        safe = line[:140].encode("ascii", "replace").decode("ascii")
        print(f"{i:3}: {safe}")
