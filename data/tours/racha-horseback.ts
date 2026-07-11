import type { TourBookingOption, TourContent } from "@/data/tour-content";
import type { AppLocale } from "@/i18n/routing";
import type { StoredTourInput } from "@/lib/admin-types";

export const rachaHorsebackTourId = "racha-signature-horseback";

type RouteOption = {
  id: string;
  label: string;
  description: string;
  kind: "route" | "addon";
};

const routeOptionIds = [
  "kvashkhieti-panorama",
  "five-villages",
  "pockhvrebi",
  "mravaldzali-panorama",
  "shoda-glacier",
  "racha-picnic",
] as const;

const routeOptions: Record<AppLocale, RouteOption[]> = {
  en: [
    {
      id: routeOptionIds[0],
      kind: "route",
      label: "Scenic Village Ride",
      description:
        "Duration: 2–3 hours\nPrice: from 150 GEL / person\nA gentle horseback ride through the peaceful landscapes surrounding Kvashkhieti village. Ideal for beginners and travelers looking for a relaxing introduction to horseback riding.",
    },
    {
      id: routeOptionIds[1],
      kind: "route",
      label: "Five Villages Trail",
      description:
        "Duration: approx. 5 hours\nPrice: from 250 GEL / person\nRide through Kvashkhieti, Seva, Parakheti, Zudali and Chordi, visit the historic Joisubani Shrine, and discover the traditions and rural beauty of Racha.",
    },
    {
      id: routeOptionIds[2],
      kind: "route",
      label: "Pockhvrebi Mountain Adventure",
      description:
        "Duration: 5–6 hours\nPrice: from 350 GEL / person\nAn unforgettable route through the highlands near Shkmeri with wild nature, alpine scenery and spectacular views.",
    },
    {
      id: routeOptionIds[3],
      kind: "route",
      label: "Signature Tour – Mravaldzali Panorama Ride",
      description:
        "Duration: 6 hours\nPrice: from 350 GEL / person\nOne of the most impressive horseback routes in Racha.\nRide toward Mravaldzali, visit the mountain lake and enjoy breathtaking panoramic views of the Greater Caucasus.",
    },
    {
      id: routeOptionIds[4],
      kind: "route",
      label: "Shoda Glacier Expedition",
      description:
        "Duration: 5–6 hours\nPrice: from 350 GEL / person\nJourney toward the magnificent Shoda Glacier and its alpine lake — dramatic mountain landscapes and untouched nature create one of Georgia's most impressive experiences.",
    },
    {
      id: routeOptionIds[5],
      kind: "addon",
      label: "Optional Mountain Picnic",
      description:
        "Enhance your adventure with a traditional picnic prepared from fresh local ingredients.\nEnjoy homemade dishes surrounded by the peaceful nature of Racha — during your ride or at the end of your journey.\nPrice: 70 GEL / person",
    },
  ],
  ka: [
    {
      id: routeOptionIds[0],
      kind: "route",
      label: "კვაშხიეთის პანორამული მარშრუტი",
      description:
        "ხანგრძლივობა: 2–3 საათი\nფასი: 150 ლარიდან / 1 ადამიანი\nმშვიდი და სასიამოვნო გასეირნება კვაშხიეთის ულამაზეს შემოგარენში. იდეალურია დამწყებთათვის და მათთვის, ვისაც სურს რაჭის ბუნების გაცნობა ცხენით, მშვიდ გარემოში.",
    },
    {
      id: routeOptionIds[1],
      kind: "route",
      label: "ხუთი სოფლის მარშრუტი",
      description:
        "ხანგრძლივობა: დაახლოებით 5 საათი\nფასი: 250 ლარიდან / 1 ადამიანი\nგაიარეთ კვაშხიეთი, სევა, ფარახეთი, ზუდალი და ჩორდი, ეწვიეთ ჯოისუბნის ისტორიულ სალოცავს და აღმოაჩინეთ რაჭის სოფლების ავთენტური ცხოვრება და ტრადიციები.",
    },
    {
      id: routeOptionIds[2],
      kind: "route",
      label: "ფოცხვრებით მთების თავგადასავალი",
      description:
        "ხანგრძლივობა: 5–6 საათი\nფასი: 350 ლარიდან / 1 ადამიანი\nდაუვიწყარი მარშრუტი შქმერის მიმდებარე მაღალმთიანეთში, სადაც დაგხვდებათ ველური ბუნება, ალპური პეიზაჟები და შთამბეჭდავი ხედები.",
    },
    {
      id: routeOptionIds[3],
      kind: "route",
      label: "განსაკუთრებული გამოცდილება – მრავალძალის პანორამული ტური",
      description:
        "ხანგრძლივობა: 6 საათი\nფასი: 350 ლარიდან / 1 ადამიანი\nერთ-ერთი ყველაზე შთამბეჭდავი საცხენოსნო მარშრუტი რაჭაში.\nიმოგზაურეთ მრავალძალის მიმართულებით, მოინახულეთ მთის ტბა და დატკბით კავკასიონის პანორამული ხედებით, რომლებიც ამ მოგზაურობას ნამდვილად დაუვიწყარს გახდის.",
    },
    {
      id: routeOptionIds[4],
      kind: "route",
      label: "შოდას მყინვარის ექსპედიცია",
      description:
        "ხანგრძლივობა: 5–6 საათი\nფასი: 350 ლარიდან / 1 ადამიანი\nგაემართეთ შოდას მყინვარისა და ალპური ტბისკენ, სადაც დრამატული მთის ლანდშაფტები და ხელუხლებელი ბუნება ერთ-ერთ ყველაზე შთამბეჭდავ გამოცდილებას ქმნის საქართველოში.",
    },
    {
      id: routeOptionIds[5],
      kind: "addon",
      label: "სურვილისამებრ – რაჭული პიკნიკი",
      description:
        "გაამდიდრეთ თქვენი მოგზაურობა ტრადიციული რაჭული პიკნიკით, რომელიც მზადდება ადგილობრივი, ნატურალური პროდუქტებით.\nმიირთვით ხელნაკეთი კერძები მთის ბუნების საოცარ გარემოში — მარშრუტის განმავლობაში ან ტურის დასრულების შემდეგ.\nფასი: 70 ლარი / 1 ადამიანი",
    },
  ],
  ru: [
    {
      id: routeOptionIds[0],
      kind: "route",
      label: "Живописная прогулка по деревне",
      description:
        "Длительность: 2–3 часа\nЦена: от 150 GEL с человека\nСпокойная верховая прогулка по мирным ландшафтам в окрестностях села Квашхиети. Идеально для новичков и тех, кто ищет расслабляющее знакомство с верховой ездой.",
    },
    {
      id: routeOptionIds[1],
      kind: "route",
      label: "Маршрут пяти деревень",
      description:
        "Длительность: около 5 часов\nЦена: от 250 GEL с человека\nПроедьте через Квашхиети, Сева, Парахети, Зудали и Чорди, посетите историческое святилище Джоисубани и откройте для себя традиции и сельскую красоту Рачи.",
    },
    {
      id: routeOptionIds[2],
      kind: "route",
      label: "Горное приключение Pockhvrebi",
      description:
        "Длительность: 5–6 часов\nЦена: от 350 GEL с человека\nНезабываемый маршрут по высокогорью недалеко от Шкмери с дикой природой, альпийскими пейзажами и захватывающими видами.",
    },
    {
      id: routeOptionIds[3],
      kind: "route",
      label: "Фирменный тур – панорамная прогулка Mravaldzali",
      description:
        "Длительность: 6 часов\nЦена: от 350 GEL с человека\nОдин из самых впечатляющих конных маршрутов в Раче.\nПроедьте в направлении Mravaldzali, посетите горное озеро и полюбуйтесь панорамными видами на Большой Кавказ.",
    },
    {
      id: routeOptionIds[4],
      kind: "route",
      label: "Экспедиция к леднику Shoda",
      description:
        "Длительность: 5–6 часов\nЦена: от 350 GEL с человека\nОтправьтесь к величественному леднику Shoda и его альпийскому озеру, где драматичные горные ландшафты и нетронутая природа создают одно из самых впечатляющих впечатлений в Грузии.",
    },
    {
      id: routeOptionIds[5],
      kind: "addon",
      label: "По желанию – горный пикник",
      description:
        "Дополните приключение традиционным пикником из свежих местных продуктов.\nНасладитесь домашними блюдами на фоне спокойной природы Рачи — во время поездки или в конце маршрута.\nЦена: 70 GEL с человека",
    },
  ],
  zh: [
    {
      id: routeOptionIds[0],
      kind: "route",
      label: "克瓦什希埃蒂村庄风景骑行",
      description:
        "时长：2–3 小时\n价格：每人 150 GEL 起\n在克瓦什希埃蒂村周围宁静的风景中轻松骑马。适合初学者和希望以放松方式初识马术的旅行者。",
    },
    {
      id: routeOptionIds[1],
      kind: "route",
      label: "五村路线",
      description:
        "时长：约 5 小时\n价格：每人 250 GEL 起\n骑马穿越克瓦什希埃蒂、塞瓦、帕拉赫蒂、祖达利和乔尔迪，参观历史悠久的乔伊苏巴尼圣所，感受拉查的传统与乡村之美。",
    },
    {
      id: routeOptionIds[2],
      kind: "route",
      label: "波茨赫夫雷比山地探险",
      description:
        "时长：5–6 小时\n价格：每人 350 GEL 起\n在什克梅里附近的高山中体验难忘路线，欣赏原始自然、高山风光与壮丽景观。",
    },
    {
      id: routeOptionIds[3],
      kind: "route",
      label: "招牌线路 – 姆拉瓦尔德扎利全景骑行",
      description:
        "时长：6 小时\n价格：每人 350 GEL 起\n拉查最具震撼力的马术路线之一。\n前往姆拉瓦尔德扎利，参观山间湖泊，俯瞰大高加索山脉令人叹为观止的全景。",
    },
    {
      id: routeOptionIds[4],
      kind: "route",
      label: "绍达冰川探险",
      description:
        "时长：5–6 小时\n价格：每人 350 GEL 起\n前往绍达冰川及其高山湖泊，壮丽的山地景观与原始自然共同构成格鲁吉亚最难忘的体验之一。",
    },
    {
      id: routeOptionIds[5],
      kind: "addon",
      label: "可选山地野餐",
      description:
        "以当地新鲜食材准备的传统野餐为您的旅程增色。\n在拉查宁静的自然中享用家常美食——骑行途中或旅程结束时。\n价格：70 GEL / 每人",
    },
  ],
};

const closingOutline: Record<AppLocale, string[]> = {
  ka: [
    "არსებობს ადგილები, რომელთა სილამაზეს მანქანის ფანჯრიდან ვერასოდეს შეიგრძნობთ.",
    "შეანელეთ ტემპი, ჩაისუნთქეთ რაჭის სუფთა მთის ჰაერი და აღმოაჩინეთ ეს უნიკალური მხარე ისე, როგორც მას ადგილობრივები საუკუნეების განმავლობაში იცნობდნენ ცხენზე ამხედრებულებმა.",
  ],
  en: [
    "Some places are too beautiful to discover through a car window.",
    "Slow down, breathe the fresh mountain air, and experience Racha the way locals have for generations on horseback.",
  ],
  ru: [
    "Есть места, слишком прекрасные, чтобы увидеть их из окна автомобиля.",
    "Замедлите темп, вдохните свежий горный воздух Рачи и познайте этот край верхом, как местные жители делают это поколениями.",
  ],
  zh: [
    "有些地方的美丽，永远无法从车窗中感受。",
    "放慢脚步，呼吸拉查洁净的山间空气，像当地人几个世纪以来骑马所认识的那样，发现这一独特的一面。",
  ],
};

const whyChooseTitles: Record<AppLocale, string> = {
  ka: "რატომ აირჩიოთ ეს გამოცდილება?",
  en: "Why choose this experience?",
  ru: "Почему стоит выбрать это приключение?",
  zh: "为什么选择这次体验？",
};

const routeSectionTitles: Record<AppLocale, string> = {
  ka: "აირჩიეთ თქვენი თავგადასავალი",
  en: "Choose your adventure",
  ru: "Выберите приключение",
  zh: "选择您的冒险路线",
};

const whyChooseItems: Record<
  AppLocale,
  Array<{ label: string; description: string }>
> = {
  ka: [
    {
      label: "აღმოაჩინეთ ტურისტებისთვის ჯერ კიდევ უცნობი რაჭა",
      description:
        "იმოგზაურეთ საქართველოს ერთ-ერთ ყველაზე ნაკლებად აღმოჩენილ რეგიონში, სადაც ბუნება კვლავ ხელუხლებელია, ხოლო სოფლის ცხოვრება საუკუნეების განმავლობაში თითქმის უცვლელად შემორჩა.",
    },
    {
      label: "დაუვიწყარი საცხენოსნო თავგადასავალი",
      description:
        "გაიარეთ იმ მთის ბილიკებით, რომლებსაც ადგილობრივები საუკუნეების განმავლობაში იყენებდნენ. ეს არის შესაძლებლობა, რაჭა ისე გაიცნოთ, როგორც მას ადგილობრივები იცნობენ.",
    },
    {
      label: "დაუვიწყარი მთის პეიზაჟები",
      description:
        "ტყეები, ალპური მდელოები, ტრადიციული სოფლები, მთის ტბები და კავკასიონის პანორამული ხედები თითოეული მარშრუტი განსხვავებულ შთაბეჭდილებას გპირდებათ.",
    },
    {
      label: "მცირე ჯგუფები",
      description:
        "გასეირნებები ტარდება მცირე ჯგუფებში, რაც უზრუნველყოფს კომფორტულ, უსაფრთხო და ინდივიდუალურ გამოცდილებას.",
    },
    {
      label: "სურვილისამებრ ტრადიციული რაჭული პიკნიკი",
      description:
        "დაასრულეთ თქვენი მოგზაურობა ან შეისვენეთ მარშრუტის განმავლობაში ტრადიციული რაჭული კერძებით, ბუნების საოცარ გარემოში.",
    },
  ],
  en: [
    {
      label: "Discover Racha before the crowds",
      description:
        "Travel through one of Georgia's least-discovered regions, where nature remains untouched and village life has changed little over the centuries.",
    },
    {
      label: "Unforgettable horseback adventure",
      description:
        "Follow mountain trails used by locals for generations — a chance to experience Racha the way its people know it.",
    },
    {
      label: "Spectacular mountain scenery",
      description:
        "Forests, alpine meadows, traditional villages, mountain lakes and panoramic Caucasus views — each route offers a different impression.",
    },
    {
      label: "Small groups",
      description:
        "Rides are run in small groups for a comfortable, safe and personal experience.",
    },
    {
      label: "Optional traditional Racha picnic",
      description:
        "Finish your ride or pause along the trail with traditional Racha dishes in a spectacular natural setting.",
    },
  ],
  ru: [
    {
      label: "Откройте для себя малоизвестную Рачу",
      description:
        "Путешествуйте по одному из наименее известных регионов Грузии, где природа остаётся нетронутой, а деревенская жизнь почти не изменилась за века.",
    },
    {
      label: "Незабываемое конное приключение",
      description:
        "Проедьте по горным тропам, которыми местные жители пользовались поколениями — познайте Рачу так, как её знают местные.",
    },
    {
      label: "Потрясающие горные пейзажи",
      description:
        "Леса, альпийские луга, традиционные сёла, горные озёра и панорамные виды на Кавказ — каждый маршрут дарит своё впечатление.",
    },
    {
      label: "Небольшие группы",
      description:
        "Прогулки проходят в небольших группах для комфортного, безопасного и персонального опыта.",
    },
    {
      label: "По желанию — традиционный рачинский пикник",
      description:
        "Завершите поездку или отдохните по пути с традиционными рачинскими блюдами на фоне потрясающей природы.",
    },
  ],
  zh: [
    {
      label: "发现游客尚未熟知的拉查",
      description:
        "探索格鲁吉亚最少被发现的地区之一，这里的自然仍保持原始风貌，乡村生活世代相传，几乎未曾改变。",
    },
    {
      label: "难忘的马术冒险",
      description:
        "沿着当地人几个世纪以来使用的山路前行——以当地人的方式认识拉查。",
    },
    {
      label: "壮丽的山地景观",
      description:
        "森林、高山草甸、传统村庄、山间湖泊与高加索全景——每条路线都带来不同的感受。",
    },
    {
      label: "小型团体",
      description:
        "骑行以小团体进行，确保舒适、安全且个性化的体验。",
    },
    {
      label: "可选传统拉查野餐",
      description:
        "在壮丽的自然环境中，以传统拉查美食结束旅程或在途中休息。",
    },
  ],
};

function toBookingOptions(locale: AppLocale): TourBookingOption[] {
  return routeOptions[locale].map(({ id, label, description, kind }) => ({
    id,
    label,
    description,
    kind,
  }));
}

function buildRouteDays(locale: AppLocale) {
  return routeOptions[locale]
    .filter((option) => option.kind === "route")
    .map(({ label, description }) => ({ label, description }));
}

function buildProgramSections(locale: AppLocale) {
  const addon = routeOptions[locale].find((option) => option.kind === "addon");

  return [
    {
      title: whyChooseTitles[locale],
      days: whyChooseItems[locale],
    },
    {
      title: routeSectionTitles[locale],
      days: buildRouteDays(locale),
    },
    ...(addon
      ? [
          {
            title: addon.label,
            days: [{ label: "", description: addon.description }],
          },
        ]
      : []),
  ];
}

function buildKaContent(): TourContent {
  return {
    title: "რაჭის ფარული ბილიკები - საცხენოსნო თავგადასავლები",
    routeLabel: "რაჭა · კვაშხიეთი · ერთი დღე",
    subtitle:
      "გაიარეთ ცხენით ხელუხლებელ მთის ბილიკებზე, უძველეს სოფლებში, ალპურ მინდვრებსა და კავკასიონის შთამბეჭდავი ხედების ფონზე. ადგილობრივი გამოცდილი მეგზურების თანხლებით აღმოაჩენთ რაჭას სულ სხვა რაკურსით, რაც ერთეულების ხვედრია.\n\nდაივიწყეთ ხმაურიანი ტურისტული მარშრუტები და შეიგრძენით საქართველოს ერთ-ერთი ყველაზე ავთენტური და მშვიდი რეგიონი შერგებულად, ბუნებასთან სრულ ჰარმონიაში.",
    outline: closingOutline.ka,
    highlights: [],
    includes: [
      "გამოცდილი ადგილობრივი მეგზურები",
      "მომზადებული ცხენები თქვენი დონის მიხედვით",
      "მცირე ჯგუფური გასეირნებები",
      "რაჭის ულამაზესი მთის მარშრუტები",
    ],
    clothingNote:
      "საცხენოსნო გასეირნებისთვის რეკომენდებულია კომფორტული ტანისაცმელი და დახურული ფეხსაცმელი.",
    bookingOptions: toBookingOptions("ka"),
    sections: buildProgramSections("ka"),
  };
}

function buildZhContent(): TourContent {
  return {
    title: "隐秘拉查马术探险",
    routeLabel: "拉查 · 克瓦什希埃蒂 · 1 天",
    subtitle:
      "在当地向导的带领下，骑马穿越未经破坏的山地景观、古老村庄、高山草甸和令人叹为观止的高加索观景点，体验正宗的马术冒险。远离人群，发现少数旅行者才能领略的格鲁吉亚独特一面。",
    outline: closingOutline.zh,
    highlights: [],
    includes: [
      "经验丰富的当地向导",
      "根据骑术水平匹配的训练马匹",
      "小型私人团",
      "拉查风景山地路线",
    ],
    clothingNote: "建议穿着舒适服装和封闭式鞋履进行马术活动。",
    bookingOptions: toBookingOptions("zh"),
    sections: buildProgramSections("zh"),
  };
}

function buildContent(locale: AppLocale): TourContent {
  if (locale === "ka") {
    return buildKaContent();
  }

  if (locale === "zh") {
    return buildZhContent();
  }

  const contentByLocale: Record<
    Exclude<AppLocale, "ka" | "zh">,
    Omit<TourContent, "sections">
  > = {
    en: {
      title: "Horse Riding Adventures in Hidden Racha",
      routeLabel: "Racha · Kvashkhieti · 1 day",
      subtitle:
        "Ride through untouched mountain landscapes, ancient villages, alpine meadows and breathtaking Caucasus viewpoints on an authentic one-day horseback adventure led by local guides.",
      outline: closingOutline.en,
      highlights: [],
      includes: [
        "Experienced local guides",
        "Well-trained horses suited to your riding level",
        "Small private groups",
        "Scenic mountain routes in Racha",
      ],
      clothingNote:
        "Comfortable clothing and closed shoes are recommended for horseback riding.",
    },
    ru: {
      title: "Конные приключения в скрытой Раче",
      routeLabel: "Рача · Квашхиети · 1 день",
      subtitle:
        "Проедьте по нетронутым горным ландшафтам, древним сёлам, альпийским лугам и захватывающим смотровым площадкам Кавказа в аутентичном конном приключении с местными гидами. Уйдите от толп и откройте для себя сторону Грузии, которую редко видят путешественники.",
      outline: closingOutline.ru,
      highlights: [],
      includes: [
        "Опытные местные гиды",
        "Подготовленные лошади с учётом вашего уровня",
        "Небольшие группы",
        "Живописные горные маршруты в Раче",
      ],
      clothingNote:
        "Для верховой езды рекомендуется удобная одежда и закрытая обувь.",
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
    bookingOptions: toBookingOptions(locale),
    sections: buildProgramSections(locale),
  };
}

export function getRachaHorsebackBookingOptions(
  locale: AppLocale,
): TourBookingOption[] {
  return toBookingOptions(locale);
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
