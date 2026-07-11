import type { TourContent } from "@/data/tour-content";
import type { AppLocale } from "@/i18n/routing";
import type { StoredTourInput } from "@/lib/admin-types";

export const rachaHorsebackTourId = "racha-signature-horseback";

const routeOptions = {
  en: [
    {
      label: "Scenic Village Ride · 2–3 hours · from 150 GEL / person",
      description:
        "A gentle horseback ride through the peaceful landscapes surrounding Kvashkhieti village. Ideal for beginners and travelers looking for a relaxing introduction to horseback riding.",
    },
    {
      label: "Five Villages Trail · 5 hours · from 250 GEL / person",
      description:
        "Ride through authentic mountain villages, visit the historic Joisubani Shrine, and discover the traditions and rural beauty of Racha.",
    },
    {
      label: "Pockhvrebi Mountain Adventure · 5–6 hours · from 350 GEL / person",
      description:
        "An exciting ride across remote mountain trails near Shkmeri with spectacular alpine scenery.",
    },
    {
      label: "Signature Tour – Mravaldzali Panorama Ride · 6 hours · from 350 GEL / person",
      description:
        "Our most scenic horseback experience. Ride through high mountain landscapes to the picturesque village of Mravaldzali, visit its tranquil mountain lake, and admire breathtaking panoramic views of the Greater Caucasus.",
    },
    {
      label: "Shoda Glacier Expedition · 5–6 hours · from 350 GEL / person",
      description:
        "Journey through dramatic mountain terrain toward the magnificent Shoda Glacier and its alpine lake — an unforgettable adventure for nature lovers.",
    },
    {
      label: "Optional Mountain Picnic · 70 GEL / person",
      description:
        "Complete your adventure with a traditional picnic prepared from fresh local ingredients. Enjoy homemade dishes surrounded by the peaceful nature of Racha — during your ride or at the end of your journey.",
    },
  ],
  ka: [
    {
      label: "კვაშხიეთის პანორამული მარშრუტი · 2–3 საათი · 150 ლარიდან / 1 ადამიანი",
      description:
        "მშვიდი და სასიამოვნო გასეირნება კვაშხიეთის ულამაზეს შემოგარენში. იდეალურია დამწყებთათვის და მათთვის, ვისაც სურს რაჭის ბუნების გაცნობა ცხენით, მშვიდ გარემოში.",
    },
    {
      label: "ხუთი სოფლის მარშრუტი · 5 საათი · 250 ლარიდან / 1 ადამიანი",
      description:
        "გაიარეთ კვაშხიეთი, სევა, ფარახეთი, ზუდალი და ჩორდი, ეწვიეთ ჯოისუბნის ისტორიულ სალოცავს და აღმოაჩინეთ რაჭის სოფლების ავთენტური ცხოვრება და ტრადიციები.",
    },
    {
      label: "ფოცხვრებით მთების თავგადასავალი · 5–6 საათი · 350 ლარიდან / 1 ადამიანი",
      description:
        "დაუვიწყარი მარშრუტი შქმერის მიმდებარე მაღალმთიანეთში, სადაც დაგხვდებათ ველური ბუნება, ალპური პეიზაჟები და შთამბეჭდავი ხედები.",
    },
    {
      label: "განსაკუთრებული გამოცდილება – მრავალძალის პანორამული ტური · 6 საათი · 350 ლარიდან / 1 ადამიანი",
      description:
        "ერთ-ერთი ყველაზე შთამბეჭდავი საცხენოსნო მარშრუტი რაჭაში. იმოგზაურეთ მრავალძალის მიმართულებით, მოინახულეთ მთის ტბა და დატკბით კავკასიონის პანორამული ხედებით.",
    },
    {
      label: "შოდას მყინვარის ექსპედიცია · 5–6 საათი · 350 ლარიდან / 1 ადამიანი",
      description:
        "გაემართეთ შოდას მყინვარისა და ალპური ტბისკენ, სადაც დრამატული მთის ლანდშაფტები და ხელუხლებელი ბუნება ერთ-ერთ ყველაზე შთამბეჭდავ გამოცდილებას ქმნის საქართველოში.",
    },
    {
      label: "სურვილისამებრ – რაჭული პიკნიკი · 70 ლარი / 1 ადამიანი",
      description:
        "გაამდიდრეთ თქვენი მოგზაურობა ტრადიციული რაჭული პიკნიკით, რომელიც მზადდება ადგილობრივი, ნატურალური პროდუქტებით. მიირთვით ხელნაკეთი კერძები მთის ბუნების საოცარ გარემოში.",
    },
  ],
  ru: [
    {
      label: "Живописная прогулка по деревне · 2–3 часа · от 150 GEL / человек",
      description:
        "Спокойная верховая прогулка по живописным окрестностям села Квашхиети. Идеально для новичков и тех, кто хочет познакомиться с природой Рачи в комфортном темпе.",
    },
    {
      label: "Маршрут пяти деревень · 5 часов · от 250 GEL / человек",
      description:
        "Проедьте через аутентичные горные сёла, посетите историческое святилище Джоисубани и откройте для себя традиции и сельскую красоту Рачи.",
    },
    {
      label: "Горное приключение Поцхvrebi · 5–6 часов · от 350 GEL / человек",
      description:
        "Захватывающая поездка по удалённым горным тропам недалеко от Шкмери с потрясающими альпийскими пейзажами.",
    },
    {
      label: "Фирменный тур – панорамная прогулка Mravaldzali · 6 часов · от 350 GEL / человек",
      description:
        "Наш самый живописный конный маршрут. Проедьте через высокогорные ландшафты к живописной деревне Mravaldzali, посетите горное озеро и полюбуйтесь панорамными видами на Большой Кавказ.",
    },
    {
      label: "Экспедиция к леднику Shoda · 5–6 часов · от 350 GEL / человек",
      description:
        "Путешествие через драматичный горный рельеф к величественному леднику Shoda и его альпийскому озеру — незабываемое приключение для любителей природы.",
    },
    {
      label: "По желанию – горный пикник · 70 GEL / человек",
      description:
        "Дополните приключение традиционным рачинским пикником из свежих местных продуктов. Домашние блюда на фоне спокойной горной природы — во время поездки или в конце маршрута.",
    },
  ],
  zh: [
    {
      label: "村庄风景骑行 · 2–3 小时 · 每人 150 GEL 起",
      description:
        "在 Kvashkhieti 村周围宁静的风景中轻松骑马。适合初学者和希望以放松方式初识拉查马术的旅行者。",
    },
    {
      label: "五村路线 · 5 小时 · 每人 250 GEL 起",
      description:
        "骑马穿越真实的山村，参观历史悠久的 Joisubani 圣所，感受拉查的传统与乡村之美。",
    },
    {
      label: "Pockhvrebi 山地探险 · 5–6 小时 · 每人 350 GEL 起",
      description:
        "在 Shkmeri 附近偏远山道上激情骑行，欣赏壮丽的高山风光。",
    },
    {
      label: "招牌线路 – Mravaldzali 全景骑行 · 6 小时 · 每人 350 GEL 起",
      description:
        "我们最具风景的马术体验。穿越高山景观前往 Mravaldzali 村，参观山间湖泊，俯瞰高加索山脉的壮丽全景。",
    },
    {
      label: "Shoda 冰川探险 · 5–6 小时 · 每人 350 GEL 起",
      description:
        "穿越壮丽的山地地形前往 Shoda 冰川及其 alpine 湖——自然爱好者的难忘冒险。",
    },
    {
      label: "可选山地野餐 · 每人 70 GEL",
      description:
        "以当地新鲜食材准备的传统野餐为您的旅程画上句号。在拉查宁静的自然中享用 homemade 美食。",
    },
  ],
} as const;

function buildContent(locale: AppLocale): TourContent {
  const sectionTitles: Record<AppLocale, string> = {
    ka: "აირჩიეთ თქვენი თავგადასავალი",
    en: "Which Adventure Will You Choose?",
    ru: "Какое приключение вы выберете?",
    zh: "选择您的冒险路线",
  };

  const contentByLocale: Record<
    AppLocale,
    Omit<TourContent, "sections"> & { sectionTitle: string }
  > = {
    en: {
      title: "Horse Riding Adventures in Hidden Racha",
      routeLabel: "Racha · Kvashkhieti",
      subtitle:
        "Ride through untouched mountain landscapes, ancient villages, alpine meadows and breathtaking Caucasus viewpoints on an authentic horseback adventure led by local guides. Escape the crowds and discover a side of Georgia that few travelers ever experience.",
      outline: [
        "Some places are too beautiful to discover through a car window…",
        "Slow down, breathe the fresh mountain air, and experience Racha the way locals have for generations on horseback.",
      ],
      highlights: [
        "Off-the-Beaten-Path Experience — explore one of Georgia's least-discovered regions",
        "Authentic Horseback Adventure — trails inaccessible by ordinary vehicles",
        "Spectacular Mountain Landscapes — forests, meadows, villages and Caucasus views",
        "Small Private Groups — relaxed pace with personalized attention",
      ],
      includes: [
        "Experienced local guides",
        "Well-trained horses suited to your riding level",
        "Small private groups",
        "Scenic mountain routes in Racha",
      ],
      clothingNote:
        "Comfortable clothing and closed shoes are recommended for horseback riding.",
      sectionTitle: sectionTitles.en,
    },
    ka: {
      title: "რაჭის ფარული ბილიკები — საცხენოსნო თავგადასავლები",
      routeLabel: "რაჭა · კვაშხიეთი",
      subtitle:
        "გაიარეთ ცხენით ხელუხლებელ მთის ბილიკებზე, უძველეს სოფლებში, ალპურ მინდვრებსა და კავკასიონის შთამბეჭდავი ხედების ფონზე. ადგილობრივი გამოცდილი მეგზურების თანხლებით აღმოაჩენთ რაჭას სულ სხვა რაკურსით.",
      outline: [
        "არსებობს ადგილები, რომელთა სილამაზეს მანქანის ფანჯრიდან ვერასოდეს შეიგრძნობთ.",
        "შეანელეთ ტემპი, ჩაისუნთქეთ რაჭის სუფთა მთის ჰაერი და აღმოაჩინეთ ეს უნიკალური მხარე ცხენზე.",
      ],
      highlights: [
        "აღმოაჩინეთ ტურისტებისთვის ჯერ კიდევ უცნობი რაჭა",
        "დაუვიწყარი საცხენოსნო თავგადასავალი ადგილობრივი ბილიკებით",
        "დაუვიწყარი მთის პეიზაჟები — ტყეები, მდელოები, სოფლები და კავკასიონი",
        "მცირე ჯგუფები — კომფორტული და ინდივიდუალური გამოცდილება",
      ],
      includes: [
        "გამოცდილი ადგილობრივი მეგზურები",
        "მომზადებული ცხენები თქვენი დონის მიხედვით",
        "მცირე ჯგუფური გასეირნებები",
        "რაჭის ულამაზესი მთის მარშრუტები",
      ],
      clothingNote:
        "საცხენოსნო გასეირნებისთვის რეკომენდებულია კომფორტული ტანისაცმელი და დახურული ფეხსაცმელი.",
      sectionTitle: sectionTitles.ka,
    },
    ru: {
      title: "Конные приключения в скрытой Раче",
      routeLabel: "Рача · Квашхиети",
      subtitle:
        "Проедьте по нетронутым горным тропам, древним сёлам, альпийским лугам и захватывающим видам на Кавказ с опытными местными гидами. Откройте Грузию, которую мало кто из путешественников когда-либо видит.",
      outline: [
        "Есть места, слишком прекрасные, чтобы увидеть их из окна автомобиля…",
        "Замедлите темп, вдохните свежий горный воздух Рачи и познайте этот край верхом, как местные жители делают это поколениями.",
      ],
      highlights: [
        "Маршрут вне массового туризма — один из наименее известных регионов Грузии",
        "Аутентичное конное приключение по тропам, недоступным для обычных машин",
        "Потрясающие горные пейзажи — леса, луга, сёла и виды на Кавказ",
        "Небольшие частные группы — комфортный и персональный темп",
      ],
      includes: [
        "Опытные местные гиды",
        "Подготовленные лошади с учётом вашего уровня",
        "Небольшие группы",
        "Живописные горные маршруты в Раче",
      ],
      clothingNote:
        "Для верховой езды рекомендуется удобная одежда и закрытая обувь.",
      sectionTitle: sectionTitles.ru,
    },
    zh: {
      title: "隐秘拉查马术探险",
      routeLabel: "拉查 · Kvashkhieti",
      subtitle:
        "在当地向导带领下，骑马穿越未受破坏的山地、古老村庄、高山草甸与高加索壮丽景观。远离人群，发现少数旅行者见过的格鲁吉亚另一面。",
      outline: [
        "有些地方的美丽，无法透过车窗真正感受……",
        "放慢脚步，呼吸拉查清新的山风，像当地人世代相传那样在马背上认识这片土地。",
      ],
      highlights: [
        "小众秘境体验——探索格鲁吉亚最少被发现的地区之一",
        "正宗马术冒险——普通车辆无法到达的山道",
        "壮丽山地景观——森林、草甸、村庄与高加索全景",
        "小型私人团——舒适节奏与个性化服务",
      ],
      includes: [
        "经验丰富的当地向导",
        "根据骑术水平匹配的训练马匹",
        "小型私人团",
        "拉查风景山地路线",
      ],
      clothingNote: "建议穿着舒适服装和封闭式鞋履进行马术活动。",
      sectionTitle: sectionTitles.zh,
    },
  };

  const base = contentByLocale[locale];

  return {
    title: base.title,
    routeLabel: base.routeLabel,
    subtitle: base.subtitle,
    outline: base.outline,
    highlights: base.highlights,
    includes: base.includes,
    clothingNote: base.clothingNote,
    sections: [
      {
        title: base.sectionTitle,
        days: [...routeOptions[locale]],
      },
    ],
  };
}

export function buildRachaHorsebackTourInput(): StoredTourInput & { id: string } {
  const locales: AppLocale[] = ["ka", "en", "ru", "zh"];

  return {
    id: rachaHorsebackTourId,
    destinations: ["batumi"],
    meta: {
      durationKey: "fullDay",
      priceFrom: 150,
      minPeople: 1,
      startTime: "10:00",
      popular: false,
      exclusive: false,
    },
    images: [],
    content: Object.fromEntries(
      locales.map((locale) => [locale, buildContent(locale)]),
    ) as Record<AppLocale, TourContent>,
  };
}
