"""Generate data/tours/batumi-6n-tours.ts from extracted docx JSON."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OPTION1 = ROOT / "scripts" / "batumi-6n-option1.json"
OPTION2 = ROOT / "scripts" / "batumi-6n-option2.json"
OUTPUT = ROOT / "data" / "tours" / "batumi-6n-tours.ts"

DAY_EN = re.compile(r"^Day \d+ \|")
DAY_KA = re.compile(r"^დღე \d+ \|")
META_EN = re.compile(
    r"^(Duration|Starting Price|Minimum Group Size|Accommodation|Price Includes|Meals:)"
)
META_KA = re.compile(
    r"^(ხანგრძლივობა|ტურის ღირებულება|მინიმალური|განთავსება|ტურის ღირებულებაში|კვება:|ტურის დეტალები)"
)


def decode(text: str) -> str:
    return text.replace("&amp;", "&").replace("\u2019", "'").replace("\u2013", "–")


def split_locale(lines: list[str]) -> tuple[list[str], list[str]]:
    ka_start = next(
        i
        for i, line in enumerate(lines)
        if line.startswith("დ") or line.startswith("აღმოაჩ")
    )
    return lines[:ka_start], lines[ka_start:]


def find_ka_title(lines: list[str]) -> int:
    for i, line in enumerate(lines):
        if "დღე 1" in line or line.startswith("დასავლეთ") or line.startswith("აღმოაჩ"):
            return i
    return 0


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


def parse_includes(lines: list[str]) -> list[str]:
    marker = "Price Includes"
    if marker not in lines:
        return [
            "Accommodation with breakfast",
            "Professional certified guide",
            "Comfortable transportation throughout the tour",
            "Entrance tickets according to the itinerary",
            "Meals as specified in the programme",
        ]

    start = lines.index(marker) + 1
    items: list[str] = []
    for line in lines[start:]:
        if re.match(r"^[ა-ჰ]", line):
            break
        if line.strip():
            items.append(decode(line))
    return items


def parse_includes_ka(lines: list[str]) -> list[str]:
    marker = "ტურის ღირებულებაში შედის"
    if marker not in lines:
        return [
            "სასტუმროში განთავსება საუზმით",
            "სერტიფიცირებული პროფესიონალი გიდის მომსახურება",
            "კომფორტული ტრანსპორტირება მთელი ტურის განმავლობაში",
            "პროგრამით გათვალისწინებული შესასვლელი ბილეთები",
            "პროგრამით განსაზღვრული კვება",
        ]
    start = lines.index(marker) + 1
    return [decode(line) for line in lines[start:] if line.strip()]


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


def render_includes(items: list[str], indent: str = "      ") -> str:
    return "\n".join(f"{indent}{ts_string(item)}," for item in items)


def tour_const_name(tour_id: str) -> str:
    return tour_id.replace("-", "_").upper()


def tour_builder_name(tour_id: str) -> str:
    return "".join(part.capitalize() for part in tour_id.split("-"))


def build_tour_config(
    tour_id: str,
    option_path: Path,
    route_label: dict[str, str],
    price: int,
    image: str,
) -> str:
    builder = tour_builder_name(tour_id)
    const = tour_const_name(tour_id)
    raw = json.loads(option_path.read_text(encoding="utf-8"))
    en_lines, ka_lines = split_locale(raw)

    en_title, en_subtitle, en_outline = intro_outline(en_lines, DAY_EN)
    ka_title_idx = find_ka_title(ka_lines)
    ka_title = decode(ka_lines[ka_title_idx])
    ka_subtitle = decode(ka_lines[ka_title_idx + 2]) if len(ka_lines) > ka_title_idx + 2 else ""
    ka_first_day = next(i for i, line in enumerate(ka_lines) if DAY_KA.match(line))
    ka_outline = [
        decode(line)
        for line in ka_lines[ka_title_idx + 3 : ka_first_day]
        if line.strip()
    ]

    en_days = parse_days(en_lines, DAY_EN)
    ka_days = parse_days(ka_lines, DAY_KA)
    en_includes = parse_includes(en_lines)
    ka_includes = parse_includes_ka(ka_lines)

    section_title = {
        "en": "Itinerary",
        "ka": "პროგრამა",
        "ru": "Маршрут",
        "zh": "行程安排",
    }

    return f"""
export const {const}_ID = "{tour_id}";

function build{builder}En(): TourContent {{
  return {{
    title: {ts_string(en_title)},
    routeLabel: {ts_string(route_label["en"])},
    subtitle: {ts_string(en_subtitle)},
    outline: {json.dumps(en_outline, ensure_ascii=False)},
    highlights: [],
    includes: [
{render_includes(en_includes)}
    ],
    sections: [
      {{
        title: {ts_string(section_title["en"])},
        days: [
{render_days(en_days)}
        ],
      }},
    ],
  }};
}}

function build{builder}Ka(): TourContent {{
  return {{
    title: {ts_string(ka_title)},
    routeLabel: {ts_string(route_label["ka"])},
    subtitle: {ts_string(ka_subtitle)},
    outline: {json.dumps(ka_outline, ensure_ascii=False)},
    highlights: [],
    includes: [
{render_includes(ka_includes)}
    ],
    sections: [
      {{
        title: {ts_string(section_title["ka"])},
        days: [
{render_days(ka_days)}
        ],
      }},
    ],
  }};
}}

function build{builder}Ru(): TourContent {{
  const en = build{builder}En();
  return {{
    ...en,
    routeLabel: {ts_string(route_label["ru"])},
    sections: [{{ title: {ts_string(section_title["ru"])}, days: en.sections[0].days }}],
  }};
}}

function build{builder}Zh(): TourContent {{
  const en = build{builder}En();
  return {{
    ...en,
    routeLabel: {ts_string(route_label["zh"])},
    sections: [{{ title: {ts_string(section_title["zh"])}, days: en.sections[0].days }}],
  }};
}}

export function build{builder}TourInput(): StoredTourInput & {{ id: string }} {{
  const locales: AppLocale[] = ["ka", "en", "ru", "zh"];
  const builders = {{
    ka: build{builder}Ka,
    en: build{builder}En,
    ru: build{builder}Ru,
    zh: build{builder}Zh,
  }};

  return {{
    id: {const}_ID,
    destinations: ["batumi"],
    meta: {{
      durationKey: "6nights7days",
      priceFrom: {price},
      minPeople: 3,
      startTime: "10:00",
      popular: false,
      exclusive: false,
    }},
    images: [{ts_string(image)}],
    content: Object.fromEntries(
      locales.map((locale) => [locale, builders[locale]()]),
    ) as Record<AppLocale, TourContent>,
  }};
}}
"""


def main() -> None:
    header = '''import type { TourContent } from "@/data/tour-content";
import type { AppLocale } from "@/i18n/routing";
import type { StoredTourInput } from "@/lib/admin-types";

'''

    western = build_tour_config(
        "batumi-western-georgia-6n",
        OPTION1,
        {
            "en": "Batumi · Western Georgia · 7 days / 6 nights",
            "ka": "ბათუმი · დასავლეთ საქართველო · 7 დღე / 6 ღამე",
            "ru": "Батуми · Западная Грузия · 7 дней / 6 ночей",
            "zh": "巴统 · 西格鲁吉亚 · 7天6晚",
        },
        1750,
        "/dest/adjara/batumi.jpg",
    )

    discovery = build_tour_config(
        "batumi-georgia-discovery-6n",
        OPTION2,
        {
            "en": "Batumi · Tbilisi · Georgia · 7 days / 6 nights",
            "ka": "ბათუმი · თბილისი · საქართველო · 7 დღე / 6 ღამე",
            "ru": "Батуми · Тбилиси · Грузия · 7 дней / 6 ночей",
            "zh": "巴统 · 第比利斯 · 格鲁吉亚 · 7天6晚",
        },
        2076,
        "/dest/tbilisi/oldtbilisi.jpg",
    )

    OUTPUT.write_text(header + western + discovery, encoding="utf-8")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
