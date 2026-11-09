import type { AppLocale } from "@/i18n/routing";

export const winterDayImages = [
  "/winter/day-1.png",
  "/winter/day-2.png",
  "/winter/day-3.png",
  "/winter/day-4.png",
  "/winter/day-5.png",
  "/winter/day-6.png",
  "/winter/day-7.png",
  "/winter/day-8.png",
] as const;

type WinterDay = {
  day: string;
  title: string;
  route?: string;
  body: string[];
  meal: string;
  stay?: string;
};

type WinterTerm = {
  title: string;
  body: string[];
};

export type WinterTourCopy = {
  title: string;
  eyebrow: string;
  intro: string[];
  highlight: string;
  stats: { value: string; label: string }[];
  priceLabel: string;
  price: string;
  programTitle: string;
  mealLabel: string;
  stayLabel: string;
  days: WinterDay[];
  includedTitle: string;
  included: string[];
  excludedTitle: string;
  excluded: string[];
  familyTitle: string;
  family: string[];
  termsTitle: string;
  terms: WinterTerm[];
  cta: string;
};

const ka: WinterTourCopy = {
  title: "დათოვლილი მთა და ბარი - აჭარული ისტორიები",
  eyebrow: "8 დღე / 7 ღამე | გოდერძი • ბათუმი • მთიანი აჭარა",
  intro: [
    "აღმოაჩინე საქართველოს ზამთრის განსხვავებული ხიბლი თოვლით დაფარული მთები, ზღვისპირა ქალაქის განსაკუთრებული ატმოსფერო ზამთრის სუსხში, უძველესი ტრადიციები და ქართული სტუმართმოყვარეობა.",
    "ეს მოგზაურობა აერთიანებს გოდერძის სამთო თავგადასავლებს, ბათუმის კულტურულ მემკვიდრეობას, აჭარის ულამაზეს ბუნებასა და ავთენტურ გასტრონომიულ გამოცდილებებს.",
  ],
  highlight: "ერთი მოგზაურობა - ორი განსხვავებული სამყარო!",
  stats: [
    { value: "3 ღამე", label: "გოდერძი" },
    { value: "4 ღამე", label: "ბათუმი" },
    { value: "8 დღე", label: "მოგზაურობა" },
  ],
  priceLabel: "ფასი იწყება",
  price: "1083 ევროდან",
  programTitle: "ტურის პროგრამა",
  mealLabel: "კვება",
  stayLabel: "ღამისთევა",
  days: [
    {
      day: "დღე 1",
      title: "კეთილი იყოს თქვენი მობრძანება საქართველოში!",
      route: "ქუთაისი → ბათუმი → გოდერძი",
      body: [
        "დახვედრა ქუთაისის ან ბათუმის საერთაშორისო აეროპორტში (წინასწარ ლოკაციის შეთანხმებით) და გამგზავრება ბათუმის მიმართულებით.",
        "ბათუმში ლანჩისა და ხანმოკლე დასვენების შემდეგ მოგზაურობა გრძელდება მთიანი აჭარისკენ, სამთო კურორტ გოდერძიზე.",
        "სასტუმროში განთავსება და თავისუფალი დრო დასასვენებლად.",
      ],
      meal: "სადილი",
      stay: "გოდერძი",
    },
    {
      day: "დღე 2",
      title: "ზამთრის თავგადასავალი გოდერძიზე",
      body: [
        "სრული დღე თოვლით დაფარულ მთებში! თავისუფალი დრო.",
        "დატკბით გოდერძის უნიკალური ბუნებით, ისრიალეთ თხილამურებით, მიიღეთ მონაწილეობა ზამთრის აქტივობებში ან უბრალოდ დაისვენეთ მთის მშვიდ გარემოში.",
      ],
      meal: "საუზმე/სადილი",
      stay: "გოდერძი",
    },
    {
      day: "დღე 3",
      title: "თოვლი, თავისუფლება და მთის მაგია",
      body: [
        "კიდევ ერთი თავისუფალი დღე გოდერძიზე.",
        "სურვილისამებრ შეგიძლიათ ისარგებლოთ სათხილამურო ტრასებით, გაისეირნოთ თოვლმავლებით, გაერთოთ თოვლში ან გაატაროთ მყუდრო საღამო კოცონთან.",
      ],
      meal: "საუზმე",
      stay: "გოდერძი",
    },
    {
      day: "დღე 4",
      title: "მთებიდან ზღვისკენ - აჭარის ტრადიციები",
      route: "გოდერძი → მთიანი აჭარა → ბათუმი",
      body: [
        "დაახლოებით 13:00 საათზე გამგზავრება ბათუმის მიმართულებით.",
        "გზად მოვინახულებთ მახუნცეთის ჩანჩქერსა და თამარ მეფის ისტორიულ ხიდს.",
        "შემდეგ გველოდება ქართული სტუმართმოყვარეობის განსაკუთრებული გამოცდილება ადგილობრივი მარანი, ღვინის დეგუსტაცია და ტრადიციული ფოლკლორული წარმოდგენა.",
        "საღამოს ჩასვლა ბათუმში და სასტუმროში განთავსება.",
      ],
      meal: "საუზმე/სადილი",
      stay: "ბათუმი",
    },
    {
      day: "დღე 5",
      title: "აღმოაჩინე ბათუმი",
      body: [
        "დღეს გავიცნობთ ბათუმს ქალაქს, სადაც ისტორია, თანამედროვე არქიტექტურა და ზღვისპირა ცხოვრება ერთმანეთს ერწყმის.",
        "მოვინახულებთ ძველ ბათუმს, ევროპის მოედანს, ბათუმის ბულვარსა და ქალაქის მთავარ ღირსშესანიშნაობებს.",
        "ტურის განსაკუთრებული ნაწილი იქნება საბაგირო „არგოთი“ გასეირნება და ბათუმის პანორამული ხედებით დატკბობა.",
      ],
      meal: "საუზმე",
      stay: "ბათუმი",
    },
    {
      day: "დღე 6",
      title: "აჭარის ისტორია, ბუნება და კულტურა",
      body: [
        "დღევანდელი მოგზაურობა აჭარის მრავალფეროვან კულტურულ და ბუნებრივ მემკვიდრეობას ეძღვნება.",
        "ვესტუმრებით ბორჯღალოს ეთნოგრაფიულ მუზეუმს, სადაც აჭარის ტრადიციულ ყოფასა და ხელოსნობას გავეცნობით.",
        "შემდეგ მოვინახულებთ გონიოს ციხეს რეგიონის ერთ-ერთ უმნიშვნელოვანეს ისტორიულ ძეგლს.",
        "მოგზაურობას გავაგრძელებთ მირვეთის ულამაზესი ბუნებისა და მაჭახელას ხეობის ავთენტური სოფლების მიმართულებით.",
      ],
      meal: "საუზმე/სადილი",
      stay: "ბათუმი",
    },
    {
      day: "დღე 7",
      title: "ბათუმი შენს განკარგულებაში",
      body: [
        "თავისუფალი დღე ბათუმში.",
        "გაისეირნეთ ზღვისპირა ბულვარში, აღმოაჩინეთ მყუდრო კაფეები, დააგემოვნეთ ადგილობრივი კერძები, ისიამოვნეთ შოპინგით ან უბრალოდ დაისვენეთ.",
      ],
      meal: "საუზმე",
      stay: "ბათუმი",
    },
    {
      day: "დღე 8",
      title: "ნახვამდის, საქართველო!",
      body: [
        "სასტუმროდან გასვლა და ტრანსფერი ქუთაისის საერთაშორისო აეროპორტში.",
        "მოგზაურობის დასასრული ახალი შთაბეჭდილებებითა და დაუვიწყარი მოგონებებით.",
      ],
      meal: "საუზმე",
    },
  ],
  includedTitle: "რა შედის ტურის ღირებულებაში?",
  included: [
    "7 ღამის განთავსება სასტუმროებში - 3 ღამე გოდერძიზე და 4 ღამე ბათუმში",
    "დახვედრა და გაცილება ქუთაისის საერთაშორისო აეროპორტში",
    "კომფორტული ტრანსპორტირება მთელი ტურის განმავლობაში",
    "პროფესიონალი გიდის მომსახურება ექსკურსიების დროს",
    "საახალწლო გალა ვახშამი",
    "ბათუმის ღირსშესანიშნაობების ტური",
    "მთიანი აჭარის ტური",
    "ღვინის დეგუსტაცია და ფოლკლორული წარმოდგენა",
    "აჭარის კულტურული და ბუნებრივი ღირსშესანიშნაობების ტური",
    "პროგრამით გათვალისწინებული მუზეუმებისა და ღირსშესანიშნაობების შესასვლელი ბილეთები",
    "საბაგირო „არგოს“ ბილეთი",
  ],
  excludedTitle: "რა არ შედის ტურის ღირებულებაში?",
  excluded: [
    "ავიაბილეთები",
    "სათხილამურო აღჭურვილობის ქირაობა და სათხილამურო საბაგიროების საშვები",
    "თოვლმავლებით გასეირნება და სხვა დამატებითი ზამთრის აქტივობები",
    "პროგრამით გაუთვალისწინებელი კვება და სასმელები",
    "პირადი ხარჯები",
    "სამოგზაურო დაზღვევა",
  ],
  familyTitle: "ოჯახური ჯავშნები",
  family: [
    "ოჯახური ჯავშნების შემთხვევაში ტურის ღირებულება და პირობები შესაძლოა განსხვავდებოდეს ბავშვების რაოდენობისა და ასაკის, განთავსების ტიპისა და ინდივიდუალური მოთხოვნების შესაბამისად.",
    "დამატებითი დეტალების დასაზუსტებლად და ინდივიდუალური შეთავაზების მისაღებად გთხოვთ, დაგვიკავშირდეთ.",
  ],
  termsTitle: "დაჯავშნისა და გადახდის პირობები",
  terms: [
    {
      title: "ჯავშნის გაფორმება და დადასტურება",
      body: [
        "დაჯავშნის მოთხოვნის საფუძველზე მომხმარებელს ეგზავნება წინასწარი ჯავშნის დადასტურება და პრო-ფორმა ინვოისი (Proforma Invoice), რომელშიც მითითებულია ტურის ღირებულება, გადახდის პირობები და კომპანიის საბანკო რეკვიზიტები.",
        "ჯავშანი გარანტირებულად ითვლება ტურის სრული ღირებულების 30%-ის წინასწარი შენატანის მიღების შემდეგ.",
      ],
    },
    {
      title: "გადახდის პირობები",
      body: [
        "30% - წინასწარი შენატანი: ირიცხება ჯავშნის გარანტირებული დადასტურებისთვის და არ ექვემდებარება დაბრუნებას.",
        "70% - საბოლოო ანგარიშსწორება: უნდა განხორციელდეს ტურის დაწყებამდე არაუგვიანეს 7 კალენდარული დღისა.",
      ],
    },
    {
      title: "ჯავშნის გაუქმების პირობები",
      body: [
        "მომხმარებლის ინიციატივით ჯავშნის გაუქმების შემთხვევაში წინასწარ გადახდილი 30% არ ბრუნდება, მოქმედი კანონმდებლობის გათვალისწინებით.",
        "საბოლოო გადახდის დადგენილი ვადის დარღვევის შემთხვევაში კომპანია იტოვებს უფლებას გააუქმოს ჯავშანი, წინასწარი შენატანის დაბრუნების გარეშე, მოქმედი კანონმდებლობის შესაბამისად.",
      ],
    },
    {
      title: "გადახდის დადასტურება",
      body: [
        "წინასწარი შენატანის მიღების შემდეგ მომხმარებელს ეგზავნება გარანტირებული ჯავშნის ოფიციალური დადასტურება.",
      ],
    },
  ],
  cta: "შეამოწმეთ ხელმისაწვდომობა",
};

const en: WinterTourCopy = {
  title: "Snowy Mountains and the Coast - Adjarian Stories",
  eyebrow: "8 days / 7 nights | Goderdzi • Batumi • Mountainous Adjara",
  intro: [
    "Discover a different side of Georgia in winter: snow-covered mountains, the special atmosphere of a seaside city in the winter cold, ancient traditions and Georgian hospitality.",
    "This journey brings together Goderdzi's mountain adventures, Batumi's cultural heritage, Adjara's beautiful nature and authentic food experiences.",
  ],
  highlight: "One journey - two different worlds!",
  stats: [
    { value: "3 nights", label: "Goderdzi" },
    { value: "4 nights", label: "Batumi" },
    { value: "8 days", label: "Journey" },
  ],
  priceLabel: "Price from",
  price: "1083 EUR",
  programTitle: "Tour program",
  mealLabel: "Meals",
  stayLabel: "Overnight",
  days: [
    {
      day: "Day 1",
      title: "Welcome to Georgia!",
      route: "Kutaisi → Batumi → Goderdzi",
      body: [
        "Meet at Kutaisi or Batumi International Airport (the location is agreed in advance) and depart towards Batumi.",
        "After lunch and a short rest in Batumi, the journey continues into mountainous Adjara, to the Goderdzi mountain resort.",
        "Check in at the hotel and enjoy free time to rest.",
      ],
      meal: "Lunch",
      stay: "Goderdzi",
    },
    {
      day: "Day 2",
      title: "A winter adventure in Goderdzi",
      body: [
        "A full day in the snow-covered mountains. Free time.",
        "Enjoy Goderdzi's unique nature, ski, join winter activities, or simply rest in the quiet mountain setting.",
      ],
      meal: "Breakfast / Lunch",
      stay: "Goderdzi",
    },
    {
      day: "Day 3",
      title: "Snow, freedom and mountain magic",
      body: [
        "Another free day in Goderdzi.",
        "If you wish, use the ski slopes, ride a snowmobile, play in the snow, or spend a cosy evening by the bonfire.",
      ],
      meal: "Breakfast",
      stay: "Goderdzi",
    },
    {
      day: "Day 4",
      title: "From the mountains to the sea - Adjarian traditions",
      route: "Goderdzi → Mountainous Adjara → Batumi",
      body: [
        "Departure towards Batumi at approximately 13:00.",
        "On the way we visit Makhuntseti Waterfall and the historic Queen Tamar Bridge.",
        "Then a special taste of Georgian hospitality awaits: a local wine cellar, wine tasting and a traditional folklore performance.",
        "Arrive in Batumi in the evening and check in at the hotel.",
      ],
      meal: "Breakfast / Lunch",
      stay: "Batumi",
    },
    {
      day: "Day 5",
      title: "Discover Batumi",
      body: [
        "Today we get to know Batumi, a city where history, modern architecture and seaside life come together.",
        "We visit Old Batumi, Europe Square, the Batumi Boulevard and the city's main landmarks.",
        "A highlight of the tour is a ride on the Argo Cable Car and the panoramic views of Batumi.",
      ],
      meal: "Breakfast",
      stay: "Batumi",
    },
    {
      day: "Day 6",
      title: "The history, nature and culture of Adjara",
      body: [
        "Today's journey is dedicated to Adjara's varied cultural and natural heritage.",
        "We visit the Borjgalo Ethnographic Museum and learn about traditional Adjarian life and craftsmanship.",
        "Then we visit Gonio Fortress, one of the region's most important historic monuments.",
        "The journey continues towards the beautiful nature of Mirveti and the authentic villages of Machakhela Valley.",
      ],
      meal: "Breakfast / Lunch",
      stay: "Batumi",
    },
    {
      day: "Day 7",
      title: "Batumi at your own pace",
      body: [
        "A free day in Batumi.",
        "Walk the seaside boulevard, discover cosy cafés, taste local dishes, enjoy shopping, or simply rest.",
      ],
      meal: "Breakfast",
      stay: "Batumi",
    },
    {
      day: "Day 8",
      title: "Until we meet again, Georgia!",
      body: [
        "Check out of the hotel and transfer to Kutaisi International Airport.",
        "The journey ends with new impressions and unforgettable memories.",
      ],
      meal: "Breakfast",
    },
  ],
  includedTitle: "What's included?",
  included: [
    "7 nights' accommodation - 3 nights in Goderdzi and 4 nights in Batumi",
    "Pick-up and drop-off at Kutaisi International Airport",
    "Comfortable transportation throughout the tour",
    "A professional guide during the excursions",
    "New Year's Eve gala dinner",
    "Batumi sightseeing tour",
    "Mountainous Adjara tour",
    "Wine tasting and folklore performance",
    "Adjara cultural and nature tour",
    "Entrance tickets to the museums and sights included in the program",
    "Argo Cable Car ticket",
  ],
  excludedTitle: "What's not included?",
  excluded: [
    "Flights",
    "Ski equipment rental and ski lift passes",
    "Snowmobile rides and other optional winter activities",
    "Meals and drinks not included in the program",
    "Personal expenses",
    "Travel insurance",
  ],
  familyTitle: "Family bookings",
  family: [
    "For family bookings, the price and conditions may vary according to the number and ages of children, the type of accommodation and individual requirements.",
    "Please contact us for further details and a personal offer.",
  ],
  termsTitle: "Booking and payment terms",
  terms: [
    {
      title: "Reservation and confirmation",
      body: [
        "After a booking request, the customer receives a preliminary booking confirmation and a Proforma Invoice stating the tour price, payment terms and the company's bank details.",
        "The booking is considered guaranteed after a 30% advance payment of the total tour price is received.",
      ],
    },
    {
      title: "Payment terms",
      body: [
        "30% - advance payment: paid to guarantee the booking and is non-refundable.",
        "70% - final payment: due no later than 7 calendar days before the tour starts.",
      ],
    },
    {
      title: "Cancellation",
      body: [
        "If the customer cancels the booking, the 30% paid in advance is not refunded, subject to applicable law.",
        "If the final payment is not received by the stated deadline, the company reserves the right to cancel the booking without refunding the advance payment, in accordance with applicable law.",
      ],
    },
    {
      title: "Payment confirmation",
      body: [
        "After the advance payment is received, the customer is sent an official confirmation of the guaranteed booking.",
      ],
    },
  ],
  cta: "Check Availability",
};

const ru: WinterTourCopy = {
  title: "Заснеженные горы и море - аджарские истории",
  eyebrow: "8 дней / 7 ночей | Годердзи • Батуми • Горная Аджария",
  intro: [
    "Откройте другое очарование зимней Грузии: заснеженные горы, особая атмосфера приморского города в зимнюю стужу, древние традиции и грузинское гостеприимство.",
    "Это путешествие объединяет горные приключения Годердзи, культурное наследие Батуми, прекрасную природу Аджарии и подлинные гастрономические впечатления.",
  ],
  highlight: "Одно путешествие - два разных мира!",
  stats: [
    { value: "3 ночи", label: "Годердзи" },
    { value: "4 ночи", label: "Батуми" },
    { value: "8 дней", label: "Путешествие" },
  ],
  priceLabel: "Цена от",
  price: "1083 евро",
  programTitle: "Программа тура",
  mealLabel: "Питание",
  stayLabel: "Ночь",
  days: [
    {
      day: "День 1",
      title: "Добро пожаловать в Грузию!",
      route: "Кутаиси → Батуми → Годердзи",
      body: [
        "Встреча в международном аэропорту Кутаиси или Батуми (место заранее согласовывается) и отправление в сторону Батуми.",
        "После обеда и короткого отдыха в Батуми путешествие продолжается в горную Аджарию, на горный курорт Годердзи.",
        "Размещение в отеле и свободное время для отдыха.",
      ],
      meal: "Обед",
      stay: "Годердзи",
    },
    {
      day: "День 2",
      title: "Зимнее приключение в Годердзи",
      body: [
        "Полный день в заснеженных горах. Свободное время.",
        "Насладитесь уникальной природой Годердзи, покатайтесь на лыжах, примите участие в зимних активностях или просто отдохните в тишине гор.",
      ],
      meal: "Завтрак / обед",
      stay: "Годердзи",
    },
    {
      day: "День 3",
      title: "Снег, свобода и магия гор",
      body: [
        "Ещё один свободный день в Годердзи.",
        "По желанию можно кататься на трассах, прокатиться на снегоходе, поиграть в снегу или провести уютный вечер у костра.",
      ],
      meal: "Завтрак",
      stay: "Годердзи",
    },
    {
      day: "День 4",
      title: "С гор к морю - традиции Аджарии",
      route: "Годердзи → Горная Аджария → Батуми",
      body: [
        "Отправление в сторону Батуми примерно в 13:00.",
        "По пути посещаем водопад Махунцети и исторический мост царицы Тамары.",
        "Затем особое грузинское гостеприимство: местный винный погреб, дегустация вина и традиционное фольклорное представление.",
        "Вечером прибытие в Батуми и размещение в отеле.",
      ],
      meal: "Завтрак / обед",
      stay: "Батуми",
    },
    {
      day: "День 5",
      title: "Откройте Батуми",
      body: [
        "Сегодня знакомимся с Батуми - городом, где история, современная архитектура и приморская жизнь соединяются вместе.",
        "Посещаем старый Батуми, площадь Европы, Батумский бульвар и главные достопримечательности города.",
        "Особая часть тура - прогулка на канатной дороге «Арго» и панорамные виды Батуми.",
      ],
      meal: "Завтрак",
      stay: "Батуми",
    },
    {
      day: "День 6",
      title: "История, природа и культура Аджарии",
      body: [
        "Сегодняшнее путешествие посвящено разнообразному культурному и природному наследию Аджарии.",
        "Посещаем этнографический музей Борджгало и знакомимся с традиционным бытом и ремёслами Аджарии.",
        "Затем посещаем крепость Гонио - один из важнейших исторических памятников региона.",
        "Путешествие продолжается к прекрасной природе Мирвети и аутентичным сёлам ущелья Мачахела.",
      ],
      meal: "Завтрак / обед",
      stay: "Батуми",
    },
    {
      day: "День 7",
      title: "Батуми в вашем распоряжении",
      body: [
        "Свободный день в Батуми.",
        "Прогуляйтесь по приморскому бульвару, откройте уютные кафе, попробуйте местные блюда, займитесь шопингом или просто отдохните.",
      ],
      meal: "Завтрак",
      stay: "Батуми",
    },
    {
      day: "День 8",
      title: "До встречи, Грузия!",
      body: [
        "Выезд из отеля и трансфер в международный аэропорт Кутаиси.",
        "Путешествие заканчивается новыми впечатлениями и незабываемыми воспоминаниями.",
      ],
      meal: "Завтрак",
    },
  ],
  includedTitle: "Что входит в стоимость?",
  included: [
    "7 ночей в отелях - 3 ночи в Годердзи и 4 ночи в Батуми",
    "Встреча и проводы в международном аэропорту Кутаиси",
    "Комфортный транспорт на протяжении всего тура",
    "Услуги профессионального гида во время экскурсий",
    "Новогодний гала-ужин",
    "Обзорная экскурсия по Батуми",
    "Тур по горной Аджарии",
    "Дегустация вина и фольклорное представление",
    "Тур по культурным и природным достопримечательностям Аджарии",
    "Входные билеты в музеи и к достопримечательностям, предусмотренным программой",
    "Билет на канатную дорогу «Арго»",
  ],
  excludedTitle: "Что не входит в стоимость?",
  excluded: [
    "Авиабилеты",
    "Аренда горнолыжного снаряжения и ски-пассы",
    "Катание на снегоходах и другие дополнительные зимние активности",
    "Питание и напитки, не предусмотренные программой",
    "Личные расходы",
    "Туристическая страховка",
  ],
  familyTitle: "Семейные бронирования",
  family: [
    "При семейном бронировании стоимость и условия тура могут отличаться в зависимости от количества и возраста детей, типа размещения и индивидуальных пожеланий.",
    "Для уточнения деталей и индивидуального предложения, пожалуйста, свяжитесь с нами.",
  ],
  termsTitle: "Условия бронирования и оплаты",
  terms: [
    {
      title: "Оформление и подтверждение брони",
      body: [
        "По запросу на бронирование клиенту направляются предварительное подтверждение брони и проформа-инвойс (Proforma Invoice) с указанием стоимости тура, условий оплаты и банковских реквизитов компании.",
        "Бронь считается гарантированной после получения предоплаты в размере 30% полной стоимости тура.",
      ],
    },
    {
      title: "Условия оплаты",
      body: [
        "30% - предоплата: вносится для гарантированного подтверждения брони и не подлежит возврату.",
        "70% - окончательный расчёт: должен быть произведён не позднее чем за 7 календарных дней до начала тура.",
      ],
    },
    {
      title: "Условия отмены",
      body: [
        "При отмене брони по инициативе клиента заранее оплаченные 30% не возвращаются, с учётом действующего законодательства.",
        "Если окончательная оплата не поступает в установленный срок, компания оставляет за собой право отменить бронь без возврата предоплаты, в соответствии с действующим законодательством.",
      ],
    },
    {
      title: "Подтверждение оплаты",
      body: [
        "После получения предоплаты клиенту направляется официальное подтверждение гарантированной брони.",
      ],
    },
  ],
  cta: "Проверить наличие",
};

const zh: WinterTourCopy = {
  title: "雪山与海岸 - 阿贾拉故事",
  eyebrow: "8 天 / 7 晚 | 戈德尔齐 • 巴统 • 山地阿贾拉",
  intro: [
    "发现格鲁吉亚冬天的另一种魅力：白雪覆盖的山脉、海滨城市在冬日寒意中的特别氛围、古老传统与格鲁吉亚好客之道。",
    "这段旅程汇集了戈德尔齐的山地探险、巴统的文化遗产、阿贾拉优美的自然，以及地道的美食体验。",
  ],
  highlight: "一次旅程 - 两个不同的世界！",
  stats: [
    { value: "3 晚", label: "戈德尔齐" },
    { value: "4 晚", label: "巴统" },
    { value: "8 天", label: "旅程" },
  ],
  priceLabel: "价格起",
  price: "1083 欧元",
  programTitle: "行程安排",
  mealLabel: "用餐",
  stayLabel: "住宿",
  days: [
    {
      day: "第 1 天",
      title: "欢迎来到格鲁吉亚！",
      route: "库塔伊西 → 巴统 → 戈德尔齐",
      body: [
        "在库塔伊西或巴统国际机场迎接（地点事先商定），随后前往巴统。",
        "在巴统午餐并稍作休息后，旅程继续进入山地阿贾拉，前往戈德尔齐山地度假村。",
        "入住酒店，并有自由时间休息。",
      ],
      meal: "午餐",
      stay: "戈德尔齐",
    },
    {
      day: "第 2 天",
      title: "戈德尔齐的冬日探险",
      body: [
        "在白雪覆盖的山中度过完整的一天。自由时间。",
        "享受戈德尔齐独特的自然，滑雪，参加冬季活动，或只是在宁静的山间休息。",
      ],
      meal: "早餐 / 午餐",
      stay: "戈德尔齐",
    },
    {
      day: "第 3 天",
      title: "雪、自由与山的魔力",
      body: [
        "在戈德尔齐再过一个自由日。",
        "您可以按自己的意愿滑雪、乘坐雪地摩托、在雪中玩耍，或在篝火旁度过温馨的夜晚。",
      ],
      meal: "早餐",
      stay: "戈德尔齐",
    },
    {
      day: "第 4 天",
      title: "从群山到海边 - 阿贾拉传统",
      route: "戈德尔齐 → 山地阿贾拉 → 巴统",
      body: [
        "约 13:00 出发前往巴统。",
        "途中参观马洪采蒂瀑布和塔玛尔女王历史石桥。",
        "随后是格鲁吉亚好客的特别体验：当地酒窖、品酒和传统民俗表演。",
        "傍晚抵达巴统并入住酒店。",
      ],
      meal: "早餐 / 午餐",
      stay: "巴统",
    },
    {
      day: "第 5 天",
      title: "发现巴统",
      body: [
        "今天认识巴统，一座历史、现代建筑与海滨生活交融的城市。",
        "参观老巴统、欧洲广场、巴统海滨大道和城市主要地标。",
        "行程的特别部分是乘坐「阿尔戈」缆车，欣赏巴统全景。",
      ],
      meal: "早餐",
      stay: "巴统",
    },
    {
      day: "第 6 天",
      title: "阿贾拉的历史、自然与文化",
      body: [
        "今天的旅程献给阿贾拉丰富的文化与自然遗产。",
        "参观博尔贾洛民俗博物馆，了解阿贾拉的传统生活与手工艺。",
        "随后参观戈尼奥要塞，这是该地区最重要的历史遗迹之一。",
        "旅程继续前往米尔韦蒂的优美自然和马恰赫拉山谷的原汁原味村落。",
      ],
      meal: "早餐 / 午餐",
      stay: "巴统",
    },
    {
      day: "第 7 天",
      title: "巴统由您安排",
      body: [
        "巴统自由日。",
        "在海滨大道散步，发现舒适咖啡馆，品尝当地菜肴，购物，或只是休息。",
      ],
      meal: "早餐",
      stay: "巴统",
    },
    {
      day: "第 8 天",
      title: "再见，格鲁吉亚！",
      body: [
        "退房并送往库塔伊西国际机场。",
        "旅程在新的感受与难忘的回忆中结束。",
      ],
      meal: "早餐",
    },
  ],
  includedTitle: "费用包含什么？",
  included: [
    "酒店住宿 7 晚 - 戈德尔齐 3 晚、巴统 4 晚",
    "库塔伊西国际机场接送",
    "全程舒适交通",
    "游览期间的专业导游服务",
    "新年晚会晚宴",
    "巴统城市观光",
    "山地阿贾拉之旅",
    "品酒与民俗表演",
    "阿贾拉文化与自然之旅",
    "行程中博物馆与景点的门票",
    "「阿尔戈」缆车票",
  ],
  excludedTitle: "费用不包含什么？",
  excluded: [
    "机票",
    "滑雪装备租赁和雪场缆车票",
    "雪地摩托及其他额外冬季活动",
    "行程未列明的餐饮和饮料",
    "个人消费",
    "旅行保险",
  ],
  familyTitle: "家庭预订",
  family: [
    "家庭预订的价格和条件可能因儿童人数与年龄、住宿类型和个人需求而有所不同。",
    "如需进一步细节和个性化报价，请与我们联系。",
  ],
  termsTitle: "预订与付款条款",
  terms: [
    {
      title: "预订与确认",
      body: [
        "收到预订请求后，客人将收到初步预订确认和形式发票（Proforma Invoice），其中列明旅游价格、付款条款和公司银行信息。",
        "收到旅游总价 30% 的预付款后，预订即视为已保证确认。",
      ],
    },
    {
      title: "付款条款",
      body: [
        "30% - 预付款：用于保证确认预订，不予退还。",
        "70% - 尾款：须在行程开始前不晚于 7 个日历日支付。",
      ],
    },
    {
      title: "取消条款",
      body: [
        "如客人主动取消预订，已支付的 30% 不予退还，并遵守适用法律。",
        "如未在规定期限支付尾款，公司保留取消预订且不退还预付款的权利，并遵守适用法律。",
      ],
    },
    {
      title: "付款确认",
      body: ["收到预付款后，客人将收到已保证预订的正式确认。"],
    },
  ],
  cta: "查询可订情况",
};

export const winterTour: Record<AppLocale, WinterTourCopy> = { ka, en, ru, zh };
