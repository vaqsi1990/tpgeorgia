"""Generate data/tours/adjara-5n-must-see.ts from extracted docx JSON."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "scripts" / "adjara-5n-must-see.json"
OUTPUT = ROOT / "data" / "tours" / "adjara-5n-must-see.ts"

DAY_EN = re.compile(r"^Day \d+ \|")
DAY_KA = re.compile(r"^დღე \d+ \|")
META_EN = re.compile(
    r"^(Duration|Starting Price|Minimum Group Size|Accommodation|Price Includes|Meals:)"
)
META_KA = re.compile(
    r"^(ხანგრძლივობა|ტურის ღირებულება|მინიმალური|განთავსება|ტურის ღირებულებაში|კვება:)"
)


def decode(text: str) -> str:
    return text.replace("&amp;", "&").replace("\u2013", "–").replace("\u2014", "—")


def split_locale(lines: list[str]) -> tuple[list[str], list[str]]:
    ka_start = next(i for i, line in enumerate(lines) if line.startswith("ეს "))
    return lines[:ka_start], lines[ka_start:]


def parse_days(lines: list[str], day_pattern: re.Pattern[str]) -> list[dict[str, str]]:
    day_starts = [i for i, line in enumerate(lines) if day_pattern.match(line)]
    days: list[dict[str, str]] = []

    for idx, start in enumerate(day_starts):
        end = day_starts[idx + 1] if idx + 1 < len(day_starts) else len(lines)
        chunk = lines[start:end]
        label = decode(chunk[0])
        body_lines: list[str] = []
        for line in chunk[1:]:
            if line.startswith("Overnight") or line.startswith("Meals:"):
                body_lines.append(decode(line))
            elif line.startswith("ღამ"):
                body_lines.append(decode(line))
            elif line.startswith("კვება:"):
                body_lines.append(decode(line))
            elif META_EN.match(line) or META_KA.match(line):
                break
            else:
                body_lines.append(decode(line))
        days.append({"label": label, "description": "\n\n".join(body_lines).strip()})

    return days


def intro_outline(lines: list[str], day_pattern: re.Pattern[str]) -> tuple[str, str, list[str]]:
    first_day = next(i for i, line in enumerate(lines) if day_pattern.match(line))
    title = decode(lines[0])
    subtitle = decode(lines[2]) if len(lines) > 2 else ""
    outline = [decode(line) for line in lines[3:first_day] if line.strip()]
    return title, subtitle, outline


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def render_days(days: list[dict[str, str]], indent: str = "        ") -> str:
    parts = []
    for day in days:
        parts.append(
            f"{indent}{{\n"
            f'{indent}  label: {ts_string(day["label"])},\n'
            f'{indent}  description: {ts_string(day["description"])},\n'
            f"{indent}}},"
        )
    return "\n".join(parts)


INCLUDES = [
    "Accommodation with breakfast",
    "Professional certified guide",
    "Comfortable transportation throughout the tour",
    "Entrance tickets according to the itinerary",
    "Meals as specified in the programme",
]

INCLUDES_KA = [
    "სასტუმროში განთავსება საუზმით",
    "სერტიფიცირებული პროფესიონალი გიდის მომსახურება",
    "კომფორტული ტრანსპორტირება მთელი ტურის განმავლობაში",
    "პროგრამით გათვალისწინებული შესასვლელი ბილეთები",
    "პროგრამით განსაზღვრული კვება",
]


def render_includes(items: list[str], indent: str = "      ") -> str:
    return "\n".join(f"{indent}{ts_string(item)}," for item in items)


def main() -> None:
    raw = json.loads(SOURCE.read_text(encoding="utf-8"))
    en_lines, ka_lines = split_locale(raw)

    en_title, en_subtitle, en_outline = intro_outline(en_lines, DAY_EN)
    ka_title = decode(ka_lines[0])
    ka_subtitle = decode(ka_lines[2])
    ka_first_day = next(i for i, line in enumerate(ka_lines) if DAY_KA.match(line))
    ka_outline = [decode(line) for line in ka_lines[3:ka_first_day] if line.strip()]

    en_days = parse_days(en_lines, DAY_EN)
    ka_days = parse_days(ka_lines, DAY_KA)

    content = f'''import type {{ TourContent }} from "@/data/tour-content";
import type {{ AppLocale }} from "@/i18n/routing";
import type {{ StoredTourInput }} from "@/lib/admin-types";
import {{ adjaraMustSee5nRu, adjaraMustSee5nZh }} from "./adjara-5n-must-see-i18n";

export const ADJARA_MUST_SEE_5N_ID = "adjara-must-see-5n";

function buildAdjaraMustSee5nEn(): TourContent {{
  return {{
    title: {ts_string(en_title)},
    routeLabel: "Batumi · Adjara · 6 days / 5 nights",
    subtitle: {ts_string(en_subtitle)},
    outline: {json.dumps(en_outline, ensure_ascii=False)},
    highlights: [],
    includes: [
{render_includes(INCLUDES)}
    ],
    sections: [
      {{
        title: "Itinerary",
        days: [
{render_days(en_days)}
        ],
      }},
    ],
  }};
}}

function buildAdjaraMustSee5nKa(): TourContent {{
  return {{
    title: {ts_string(ka_title)},
    routeLabel: "ბათუმი · აჭარა · 6 დღე / 5 ღამე",
    subtitle: {ts_string(ka_subtitle)},
    outline: {json.dumps(ka_outline, ensure_ascii=False)},
    highlights: [],
    includes: [
{render_includes(INCLUDES_KA)}
    ],
    sections: [
      {{
        title: "პროგრამა",
        days: [
{render_days(ka_days)}
        ],
      }},
    ],
  }};
}}

function buildAdjaraMustSee5nRu(): TourContent {{
  return adjaraMustSee5nRu;
}}

function buildAdjaraMustSee5nZh(): TourContent {{
  return adjaraMustSee5nZh;
}}

export function buildAdjaraMustSee5nTourInput(): StoredTourInput & {{ id: string }} {{
  const locales: AppLocale[] = ["ka", "en", "ru", "zh"];
  const builders = {{
    ka: buildAdjaraMustSee5nKa,
    en: buildAdjaraMustSee5nEn,
    ru: buildAdjaraMustSee5nRu,
    zh: buildAdjaraMustSee5nZh,
  }};

  return {{
    id: ADJARA_MUST_SEE_5N_ID,
    destinations: ["batumi"],
    meta: {{
      durationKey: "5nights6days",
      priceFrom: 1150,
      minPeople: 3,
      startTime: "10:00",
      popular: false,
      exclusive: false,
    }},
    images: ["/dest/adjara/adjara.jpg"],
    content: Object.fromEntries(
      locales.map((locale) => [locale, builders[locale]()]),
    ) as Record<AppLocale, TourContent>,
  }};
}}
'''

    OUTPUT.write_text(content, encoding="utf-8")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
