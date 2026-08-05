import type { TourContent } from "@/data/tour-content";
import type { AppLocale } from "@/i18n/routing";
import type { StoredTourInput } from "@/lib/admin-types";
import {
  batumiWesternGeorgia6nRu,
  batumiWesternGeorgia6nZh,
  batumiGeorgiaDiscovery6nRu,
  batumiGeorgiaDiscovery6nZh,
} from "./batumi-6n-i18n";


export const BATUMI_WESTERN_GEORGIA_6N_ID = "batumi-western-georgia-6n";

function buildBatumiWesternGeorgia6nEn(): TourContent {
  return {
    title: "The Best of Western Georgia",
    routeLabel: "Batumi · Western Georgia · 7 days / 6 nights",
    subtitle: "From the Black Sea Coast to Emerald Canyons and Hidden Mountain Traditions",
    outline: ["Western Georgia is a land of extraordinary contrasts, where subtropical beaches meet ancient fortresses, underground caves, emerald canyons and centuries-old traditions. This carefully crafted journey combines the vibrant atmosphere of Batumi with the region's breathtaking natural wonders and authentic cultural experiences.", "Explore historic landmarks, cruise along the Black Sea coastline, discover spectacular caves and canyons, share traditional meals with local families and experience the genuine hospitality that has made Georgia one of the world's most welcoming destinations.", "Every day reveals a different side of western Georgia its history, landscapes, cuisine and unforgettable people."],
    highlights: [],
    includes: [
      "Accommodation with breakfast",
      "Professional certified guide",
      "Comfortable transportation throughout the tour",
      "Entrance tickets according to the itinerary",
      "Meals as specified in the programme",
    ],
    sections: [
      {
        title: "Itinerary",
        days: [
        {
          label: "Day 1 | Welcome to Batumi",
          description: "Upon arrival at Batumi International Airport or Kutaisi International Airport, you will be warmly welcomed by our representative and transferred to your hotel. After time to relax, your journey begins with an evening discovery of Batumi Georgia's lively Black Sea city, where elegant European architecture blends harmoniously with subtropical landscapes.\n\nYour walking tour begins at charming Piazza Square before visiting St. Nicholas Church, one of Batumi's oldest Orthodox churches. Continue to Europe Square, the elegant heart of Batumi, where history and mythology come together. Admire the impressive Statue of Medea holding the Golden Fleece, a reminder of the ancient Kingdom of Colchis and the legend of the Argonauts. Nearby, the beautifully crafted Astronomical Clock and the graceful Neptune Fountain add a distinctive European charm to one of the city's most iconic public squares.\n\nA leisurely walk along Batumi Boulevard introduces the city's most iconic landmarks, including Miracle Park, the Alphabet Tower, celebrating Georgia's unique 33-letter alphabet, and the moving sculpture of Ali & Nino, symbolising love beyond cultural boundaries.\n\nFor an even more memorable evening, guests may choose an optional yacht cruise, offering spectacular views of Batumi's illuminated skyline from the Black Sea.\n\nOvernight in Batumi\n\nMeals: - / - / -",
        },
        {
          label: "Day 2 | Ancient Fortresses, Botanical Wonders & Black Sea Flavours",
          description: "Today's journey explores the rich history and natural beauty of Georgia's Black Sea coastline.\n\nBegin at Petra Fortress, a sixth-century Byzantine stronghold dramatically overlooking the sea. Once an important commercial and military centre connecting Europe and Asia, the fortress offers fascinating historical insights alongside breathtaking coastal views.\n\nContinue to the renowned Batumi Botanical Garden, one of the largest botanical gardens in Eastern Europe. Walking through its peaceful trails feels like travelling across different continents, where exotic plant collections, subtropical forests and panoramic sea views create an unforgettable experience.\n\nAfter exploring the garden, enjoy free time at nearby Green Cape Beach, one of the most picturesque spots on Georgia's Black Sea coast. Guests may relax, swim in the crystal-clear waters, or simply soak up the peaceful seaside atmosphere surrounded by lush subtropical scenery.\n\nLater, visit Batumi's lively Fish Market, where local fishermen bring in the day's catch. Select your preferred seafood before enjoying it freshly prepared in a nearby family-run restaurant a true taste of Batumi's maritime traditions.\n\nOvernight in Batumi\n\nMeals: Breakfast",
        },
        {
          label: "Day 3 | Traditions of Mountainous Adjara",
          description: "Today introduces you to the authentic culture and natural beauty of mountainous Adjara.\n\nThe journey begins at the remarkable Borjgalo Ethnographic Museum, where handcrafted wooden sculptures vividly recreate traditional village life and showcase the customs, occupations and craftsmanship of the region.\n\nContinue to Makhuntseti Waterfall, one of Adjara's most beautiful natural landmarks, before visiting the nearby Queen Tamar Bridge, a beautifully preserved medieval stone bridge that has connected mountain communities for centuries.\n\nThe cultural experience continues with a traditional lunch at a family-run marani (wine cellar). Enjoy homemade Adjarian cuisine paired with locally produced wines while learning about Georgia's 8,000-year-old winemaking tradition and the legendary hospitality that makes every guest feel like part of the family.\n\nOvernight in Batumi\n\nMeals: Breakfast / Lunch",
        },
        {
          label: "Day 4 | Caves, Emerald Canyons & Authentic Georgian Hospitality",
          description: "Today's journey takes you through some of western Georgia's most spectacular natural landscapes before introducing you to the authentic traditions of Samegrelo.\n\nBegin at the magnificent Prometheus Cave, where vast underground halls, impressive stalactites and stalagmites create a fascinating world shaped over millions of years.\n\nThe adventure continues to the breathtaking Martvili Canyon, renowned for its crystal-clear emerald waters and dramatic limestone cliffs. A peaceful boat ride through the canyon offers one of western Georgia's most memorable natural experiences.\n\nThe cultural highlight of the day awaits at Lia Bebo's (grandma) traditional Ethno House, where you'll be welcomed like a family guest. Together with your hosts, you'll prepare Elarji, one of Samegrelo's most iconic dishes, before enjoying a homemade lunch featuring authentic Megrelian cuisine prepared from fresh local ingredients. More than a meal, this is an opportunity to experience the warmth of Georgian hospitality and discover the rich culinary traditions of the region.\n\nAfter lunch, we visit the historic Chkondidi Monastery. A scenic cable car ride takes us up the hill, where the monastery offers not only remarkable historical significance but also beautiful panoramic views over the surrounding landscapes.\n\nOvernight in Batumi\n\nMeals: Breakfast",
        },
        {
          label: "Day 5 | Batumi at Your Own Pace (FREE DAY)",
          description: "Today is yours to enjoy Batumi exactly as you wish.\n\nRelax on the beach, stroll along Batumi Boulevard, discover local cafes and boutiques, visit museums or simply enjoy the city's relaxed seaside atmosphere.\n\nOptional excursions can also be arranged with our team, allowing you to discover even more of Georgia's breathtaking Black Sea region through carefully curated local experiences.\n\nOvernight in Batumi\n\nMeals: Breakfast",
        },
        {
          label: "Day 6 | Leisure Day in Batumi (FREE DAY)",
          description: "Optional Wrangler Adventure - Beyond the Tourist Trails\n\nFor those seeking unforgettable adventure, today offers an exciting optional journey into the remote mountains of Adjara aboard legendary Jeep Wrangler 4×4 vehicles.\n\nLeave the main roads behind as your adventure follows mountain tracks, river crossings and spectacular panoramic viewpoints rarely visited by ordinary travellers.\n\nAlong the way, meet local families, taste organic mountain honey, participate in a traditional cheese-making masterclass, sample homemade wine and chacha, and enjoy a delicious homemade lunch surrounded by breathtaking scenery.\n\nThis unique experience perfectly combines off-road adventure, authentic culture and unforgettable mountain landscapes.\n\nGuests who prefer a more relaxing day may remain in Batumi and enjoy the city's many attractions at their leisure.\n\nOvernight in Batumi\n\nMeals: Breakfast",
        },
        {
          label: "Day 7 | Departure",
          description: "After breakfast, enjoy some free time depending on your flight schedule before transferring to Batumi International Airport.\n\nAs your journey comes to an end, take home unforgettable memories of western Georgia's dramatic landscapes, ancient history, warm hospitality and unique cultural traditions.\n\nMeals: Breakfast",
        },
        ],
      },
    ],
  };
}

function buildBatumiWesternGeorgia6nKa(): TourContent {
  return {
    title: "დასავლეთ საქართველოს გამორჩეული სანახაობები",
    routeLabel: "ბათუმი · დასავლეთ საქართველო · 7 დღე / 6 ღამე",
    subtitle: "დასავლეთ საქართველო გამორჩეული მრავალფეროვნების რეგიონია, სადაც სუბტროპიკული სანაპირო, უძველესი ციხესიმაგრეები, შთამბეჭდავი მღვიმეები, ზურმუხტისფერი კანიონები და მრავალსაუკუნოვანი ტრადიციები ერთმანეთთან საოცარ ჰარმონიაში თანაარსებობს. ეს საგულდაგულოდ დაგეგმილი ტური აერთიანებს ბათუმის ზღვისპირა ხიბლს, ბუნების გამორჩეულ საოცრებებსა და ავთენტურ კულტურულ გამოცდილებებს.",
    outline: ["აღმოაჩინეთ ისტორიული ღირსშესანიშნაობები, მოინახულეთ საქართველოს ყველაზე შთამბეჭდავი ბუნებრივი ძეგლები, დააგემოვნეთ ტრადიციული ქართული სამზარეულო ადგილობრივ ოჯახებთან ერთად და თავად შეიგრძენით ის გულწრფელი სტუმართმოყვარეობა, რომელმაც საქართველო მსოფლიოს ერთ-ერთ ყველაზე მასპინძლურ ქვეყნად აქცია.", "ამ მოგზაურობის ყოველი დღე დასავლეთ საქართველოს ისტორიას, ბუნებას, კულინარიულ ტრადიციებსა და ადამიანებს სრულიად ახალი კუთხით გაგაცნობთ."],
    highlights: [],
    includes: [
      "სასტუმროში განთავსება საუზმით",
      "სერტიფიცირებული პროფესიონალი გიდის მომსახურება",
      "კომფორტული ტრანსპორტირება მთელი ტურის განმავლობაში",
      "პროგრამით გათვალისწინებული შესასვლელი ბილეთები",
      "პროგრამით განსაზღვრული კვება",
    ],
    sections: [
      {
        title: "პროგრამა",
        days: [
        {
          label: "დღე 1 | კეთილი იყოს თქვენი მობრძანება ბათუმში",
          description: "ბათუმის ან ქუთაისის საერთაშორისო აეროპორტში ჩამოსვლისთანავე დაგხვდებათ ჩვენი წარმომადგენელი, რომელიც სასტუმრომდე კომფორტულ ტრანსფერს უზრუნველყოფს. განთავსებისა და მცირე დასვენების შემდეგ, გაეცნობით ბათუმს შავი ზღვის სანაპიროზე გაშენებულ ქალაქს, სადაც ევროპული არქიტექტურა, თანამედროვე ურბანული სივრცეები და სუბტროპიკული ბუნება განსაკუთრებულ ჰარმონიას ქმნის.\n\nგასეირნებას დავიწყებთ პიაცას მოედნიდან იტალიური არქიტექტურით შთაგონებული ბათუმის ერთ-ერთი ყველაზე გამორჩეული სივრციდან. შემდეგ ვეწვევით წმინდა ნიკოლოზის ეკლესიას, ქალაქის ერთ-ერთ უძველეს მართლმადიდებლურ ტაძარს.\n\nმოგზაურობას ევროპის მოედანზე გავაგრძელებთ, სადაც მედეას მონუმენტი ოქროს საწმისით კოლხეთის სამეფოსა და არგონავტების ლეგენდარულ მითს აცოცხლებს. აქვე მდებარეობს ასტრონომიული საათი და ნეპტუნის შადრევანი, რომლებიც ბათუმის ევროპულ იერს განსაკუთრებულ ელეგანტურობას სძენს.\n\nშემდეგ გავისეირნებთ ბათუმის ბულვარში, მოვინახულებთ სასწაულების პარკს, ქართული ანბანის უნიკალურობას მიძღვნილ ანბანის კოშკს და სიყვარულის სიმბოლოდ ქცეულ მოძრავ ქანდაკებას „ალი და ნინო“.\n\nმსურველებს შესაძლებლობა ექნებათ, დღე იახტით გასეირნებით დაასრულონ. ზღვის მხრიდან გადაშლილი განათებული ბათუმის პანორამა თქვენი მოგზაურობის პირველი დაუვიწყარი შთაბეჭდილება იქნება.\n\nღამისთვა ბათუმში\n\nკვება: - / - / -",
        },
        {
          label: "დღე 2 | უძველესი ციხესიმაგრეები, ბოტანიკური საოცრება და შავი ზღვის გემოები",
          description: "დღევანდელი დღე აჭარის ისტორიულ მემკვიდრეობასა და ბუნებრივ მრავალფეროვნებას ეძღვნება.\n\nპირველად მოვინახულებთ VI საუკუნის ბიზანტიურ ციხესიმაგრეს პეტრას, რომელიც საუკუნეების განმავლობაში ევროპასა და აზიას შორის მნიშვნელოვან სავაჭრო და სამხედრო ცენტრს წარმოადგენდა. მისი სტრატეგიული მდებარეობიდან შავი ზღვის სანაპიროს შთამბეჭდავი ხედები იშლება.\n\nშემდეგ ვეწვევით ბათუმის ბოტანიკურ ბაღს აღმოსავლეთ ევროპის ერთ-ერთ ყველაზე მრავალფეროვან ბოტანიკურ ბაღს, სადაც მსოფლიოს სხვადასხვა კონტინენტის მცენარეული კოლექციები, სუბტროპიკული ტყეები და ზღვის ულამაზესი პანორამები ერთმანეთთან ბუნებრივად ერწყმის.\n\nბათუმის ბოტანიკური ბაღის დათვალიერების შემდეგ თავისუფალი დრო გექნებათ მწვანე კონცხზე დასვენებისა და შავი ზღვის სუფთა წყლებში ბანაობისთვის. ზღვისა და სუბტროპიკული ბუნების საოცარი შერწყმა ამ ადგილს აჭარის ერთ-ერთ ყველაზე გამორჩეულ სანაპიროდ აქცევს.\n\nდღის ბოლოს ბათუმის თევზის ბაზარს ვეწვევით, სადაც თავად შეარჩევთ ადგილობრივი მეთევზეების მიერ ახალდაჭერილ თევზსა თუ ზღვის პროდუქტებს და მათ ახლომდებარე საოჯახო რესტორანში დააგემოვნებთ.\n\nღამისთვა ბათუმში\n\nკვება: საუზმე",
        },
        {
          label: "დღე 3 | მთიანი აჭარის ტრადიციები",
          description: "დღევანდელი დღე მთიანი აჭარის ბუნებას, კულტურასა და ტრადიციებს გაგაცნობთ.\n\nპირველი გაჩერება ბორჯღალოს ეთნოგრაფიული მუზეუმია, სადაც ხელით ნაკვეთი ხის ფიგურები თვალწინ აცოცხლებს ძველი აჭარის ყოფას, ტრადიციულ საქმიანობასა და ხელოსნურ კულტურას.\n\nშემდეგ მოვინახულებთ მახუნცეთის ჩანჩქერს აჭარის ერთ-ერთ ყველაზე თვალწარმტაც ბუნებრივ ღირსშესანიშნაობას, ხოლო სულ ახლოს მდებარე თამარ მეფის შუა საუკუნეების ქვის თაღოვანი ხიდი ქართული სამშენებლო ხელოვნების გამორჩეულ ნიმუშს წარმოგვიდგენს.\n\nდღის განსაკუთრებული ნაწილი ტრადიციულ ოჯახურ მარანში გელოდებათ, სადაც დააგემოვნებთ აჭარულ კერძებსა და ადგილობრივ ღვინოს. მასპინძლები გაგიზიარებენ ქართული მეღვინეობის 8 000-წლიან ისტორიასა და იმ სტუმართმოყვარეობას, რომელიც ქართული კულტურის განუყოფელი ნაწილია.\n\nღამისთვევა ბათუმში\n\nკვება: საუზმე / სადილი",
        },
        {
          label: "დღე 4 | მღვიმეები, ზურმუხტისფერი კანიონები და მეგრული ტრადიციები",
          description: "დღევანდელი დღე დასავლეთ საქართველოს ბუნების უნიკალურ საოცრებებსა და სამეგრელოს ავთენტურ კულტურას გაგაცნობთ.\n\nმოგზაურობას დავიწყებთ პრომეთეს მღვიმის მონახულებით ბუნების გამორჩეული ქმნილებით, სადაც მილიონობით წლის განმავლობაში ჩამოყალიბებული სტალაქტიტები, სტალაგმიტები და შთამბეჭდავი მიწისქვეშა დარბაზები ზღაპრულ სამყაროს ქმნის.\n\nშემდეგ გავემართებით მარტვილის კანიონისკენ, რომელიც ზურმუხტისფერი წყლით, მაღალი კირქვის კლდეებითა და ულამაზესი ბუნებით საქართველოს ერთ-ერთ ყველაზე შთამბეჭდავ ბუნებრივ ღირსშესანიშნაობად მიიჩნევა. სურვილის შემთხვევაში შესაძლებელი იქნება კანიონში ნავით გასეირნებაც.\n\nდღის განსაკუთრებული ნაწილი გელოდებათ ლია ბებოს ტრადიციულ ეთნო სახლში, სადაც მეგრული სტუმართმოყვარეობის თბილ გარემოში თავადაც გახდებით კულინარიული გამოცდილების მონაწილე. მასპინძლებთან ერთად მოამზადებთ და გაწელავთ მეგრული სამზარეულოს ერთ-ერთ ყველაზე ცნობილ კერძს ელარჯს, შემდეგ კი დააგემოვნებთ ოჯახური რეცეპტებით მომზადებულ ავთენტურ მეგრულ კერძებს. ეს შეხვედრა საშუალებას მოგცემთ, ახლოდან გაეცნოთ სამეგრელოს კულინარიულ ტრადიციებსა და ადგილობრივი ოჯახის ყოველდღიურ ცხოვრებას.\n\nსადილის შემდეგ მოვინახულებთ ჭყონდიდის მონასტერს საქართველოს ერთ-ერთ მნიშვნელოვან ისტორიულ და სასულიერო ცენტრს. მონასტრამდე საბაგიროთი ავალთ, საიდანაც სამეგრელოს თვალწარმტაცი პანორამული ხედები იშლება და ამ დაუვიწყარ დღეს განსაკუთრებულ დასასრულს სძენს.\n\nღამისთევა ბათუმში\n\nკვება: საუზმე / სადილი",
        },
        {
          label: "დღე 5 | თავისუფალი დღე ბათუმში",
          description: "დღეს ბათუმს საკუთარი სურვილისამებრ აღმოაჩენთ.\n\nდაისვენეთ ზღვის სანაპიროზე, გაისეირნეთ ბათუმის ბულვარში, მოინახულეთ მუზეუმები, კაფეები, რესტორნები და სავაჭრო სივრცეები ან უბრალოდ დატკბით ქალაქის ზღვისპირა ატმოსფეროთი.\n\nსურვილის შემთხვევაში ჩვენი გუნდი სიამოვნებით დაგიგეგმავთ დამატებით ექსკურსიებსა და ინდივიდუალურ გამოცდილებებს, რათა კიდევ უფრო მრავალფეროვანი გახადოთ თქვენი მოგზაურობა დასავლეთ საქართველოში.\n\nღამისთევა ბათუმში\n\nკვება: საუზმე",
        },
        {
          label: "დღე 6 | თავისუფალი დღე ბათუმში",
          description: "დღევანდელი დღე სრულად თქვენს განკარგულებაშია.\n\nშეგიძლიათ დაისვენოთ ზღვის სანაპიროზე, ისიამოვნოთ ბათუმის მრავალფეროვანი კაფეებითა და რესტორნებით ან საკუთარი ინტერესების შესაბამისად დაგეგმოთ დღე.\n\nადრენალინისა და თავგადასავლების მოყვარულთათვის შესაძლებელია დამატებით დაიგეგმოს Wrangler-ის ჯიპ-ტური მთიან აჭარაში. მარშრუტი მოიცავს მიუვალ მონაკვეთებს, მთის პანორამულ ხედებს, ადგილობრივ ოჯახებთან სტუმრობას, ორგანული თაფლისა და ღვინის დეგუსტაციას, ყველის დამზადების მასტერკლასსა და ტრადიციულ ოჯახურ სადილს.\n\nღამისთვეა ბათუმში\n\nკვება: საუზმე",
        },
        {
          label: "დღე 7 | გამგზავრება",
          description: "საუზმის შემდეგ, ფრენის განრიგის შესაბამისად, თავისუფალი დრო გექნებათ, რის შემდეგაც ჩვენი ტრანსპორტი ბათუმის/ქუთაისის საერთაშორისო აეროპორტში გადაგიყვანთ.\n\nმოგზაურობა დასრულდება, თუმცა დასავლეთ საქართველოს მრავალფეროვანი ბუნება, უძველესი ისტორია, გამორჩეული კულინარია და გულითადი სტუმართმოყვარეობა კიდევ დიდხანს დარჩება თქვენს მოგონებებში.\n\nკვება: საუზმე",
        },
        ],
      },
    ],
  };
}

function buildBatumiWesternGeorgia6nRu(): TourContent {
  return batumiWesternGeorgia6nRu;
}

function buildBatumiWesternGeorgia6nZh(): TourContent {
  return batumiWesternGeorgia6nZh;
}

export function buildBatumiWesternGeorgia6nTourInput(): StoredTourInput & { id: string } {
  const locales: AppLocale[] = ["ka", "en", "ru", "zh"];
  const builders = {
    ka: buildBatumiWesternGeorgia6nKa,
    en: buildBatumiWesternGeorgia6nEn,
    ru: buildBatumiWesternGeorgia6nRu,
    zh: buildBatumiWesternGeorgia6nZh,
  };

  return {
    id: BATUMI_WESTERN_GEORGIA_6N_ID,
    destinations: ["batumi"],
    meta: {
      durationKey: "6nights7days",
      priceFrom: 1750,
      minPeople: 3,
      startTime: "10:00",
      popular: false,
      exclusive: false,
    },
    images: ["/dest/adjara/batumi.jpg"],
    content: Object.fromEntries(
      locales.map((locale) => [locale, builders[locale]()]),
    ) as Record<AppLocale, TourContent>,
  };
}

export const BATUMI_GEORGIA_DISCOVERY_6N_ID = "batumi-georgia-discovery-6n";

function buildBatumiGeorgiaDiscovery6nEn(): TourContent {
  return {
    title: "Georgia Discovery",
    routeLabel: "Batumi · Tbilisi · Georgia · 7 days / 6 nights",
    subtitle: "Discover the remarkable diversity of Georgia on a journey that connects the Black Sea coastline with the country's ancient capital, UNESCO World Heritage monuments, spectacular caves and centuries-old cultural traditions.",
    outline: ["From the vibrant streets of Batumi and the emerald canyons of western Georgia to the historic churches of Mtskheta, the colourful districts of Tbilisi and the remarkable cave city of Uplistsikhe, this carefully designed itinerary offers the perfect introduction to Georgia's rich history, breathtaking landscapes and world-renowned hospitality.", "Every day combines authentic local experiences, cultural heritage and unforgettable scenery, allowing you to discover Georgia far beyond the classic tourist routes."],
    highlights: [],
    includes: [
      "Accommodation with breakfast",
      "Professional certified guide",
      "Comfortable transportation throughout the tour",
      "Entrance tickets according to the itinerary",
      "Meals as specified in the programme",
    ],
    sections: [
      {
        title: "Itinerary",
        days: [
        {
          label: "Day 1 | Welcome to Batumi",
          description: "Upon arrival at Batumi International Airport or Kutaisi International Airport, you will be warmly welcomed by our representative and transferred to your hotel. After time to relax, your journey begins with an evening discovery of Batumi Georgia's lively Black Sea city, where elegant European architecture blends harmoniously with subtropical landscapes.\n\nYour walking tour begins at charming Piazza Square before visiting St. Nicholas Church, one of Batumi's oldest Orthodox churches. Continue to Europe Square, the elegant heart of Batumi, where history and mythology come together. Admire the impressive Statue of Medea holding the Golden Fleece, a reminder of the ancient Kingdom of Colchis and the legend of the Argonauts. Nearby, the beautifully crafted Astronomical Clock and the graceful Neptune Fountain add a distinctive European charm to one of the city's most iconic public squares.\n\nA leisurely walk along Batumi Boulevard introduces the city's most iconic landmarks, including Miracle Park, the Alphabet Tower, celebrating Georgia's unique 33-letter alphabet, and the moving sculpture of Ali & Nino, symbolising love beyond cultural boundaries.\n\nFor an even more memorable evening, guests may choose an optional yacht cruise, offering spectacular views of Batumi's illuminated skyline from the Black Sea.\n\nOvernight in Batumi\n\nMeals: - / - / -",
        },
        {
          label: "Day 2 | Ancient Fortresses, Botanical Wonders & Green Cape",
          description: "Today's journey explores the remarkable natural beauty and rich history of Georgia's Black Sea coastline.\n\nBegin at Petra Fortress, a sixth-century Byzantine stronghold dramatically overlooking the sea. Once an important military and commercial centre connecting Europe and Asia, today it offers breathtaking panoramic views where history and nature meet.\n\nContinue to the renowned Batumi Botanical Garden, one of the richest botanical collections in Eastern Europe. Walking through its peaceful trails feels like travelling across different climatic zones, surrounded by exotic plants, subtropical forests and spectacular views of the Black Sea.\n\nAfter exploring the gardens, enjoy free time at Green Cape Beach, one of the most picturesque stretches of coastline near Batumi. Relax by the sea, take a refreshing swim or simply enjoy the peaceful atmosphere where lush greenery meets the crystal-clear waters of the Black Sea.\n\nOvernight in Batumi\n\nMeals: Breakfast / Lunch",
        },
        {
          label: "Day 3 | Caves, Canyons & Megrelian Hospitality",
          description: "Today's adventure takes you deep into the natural wonders of western Georgia.\n\nDiscover the magical underground world of Prometheus Cave, where spectacular chambers, underground rivers and impressive limestone formations have been shaped over millions of years.\n\nThe adventure continues to the breathtaking Martvili Canyon, renowned for its crystal-clear emerald waters and dramatic limestone cliffs. A peaceful boat ride through the canyon offers one of western Georgia's most memorable natural experiences.\n\nThe cultural highlight of the day awaits at Lia Bebo's (grandma) traditional Ethno House, where you'll be welcomed like a family guest. Together with your hosts, you'll prepare Elarji, one of Samegrelo's most iconic dishes, before enjoying a homemade lunch featuring authentic Megrelian cuisine prepared from fresh local ingredients. More than a meal, this is an opportunity to experience the warmth of Georgian hospitality and discover the rich culinary traditions of the region.\n\nAfter lunch, we visit the historic Chkondidi Monastery. A scenic cable car ride takes us up the hill, where the monastery offers not only remarkable historical significance but also beautiful panoramic views over the surrounding landscapes.\n\nIn the evening, travel east towards Tbilisi, where a completely different chapter of your Georgian adventure begins.\n\nOvernight in Tbilisi\n\nMeals: Breakfast / Lunch",
        },
        {
          label: "Day 4 | Tbilisi & Georgia's Ancient Capital",
          description: "Today explores the cultural and spiritual heart of Georgia.\n\nBegin in Mtskheta, Georgia's ancient capital and one of the oldest continuously inhabited cities in the country. Home to UNESCO World Heritage monuments, Mtskheta has served as the spiritual centre of Georgia since the adoption of Christianity in the fourth century.\n\nContinue to Tbilisi, a fascinating city where East and West have met for centuries. Wander through the charming streets of Old Tbilisi, admire its colourful wooden balconies and discover the city's unique blend of architectural styles.\n\nA scenic cable car ride brings you to Narikala Fortress, offering breathtaking panoramic views across the capital before continuing to the historic Metekhi district overlooking the Mtkvari River.\n\nOvernight in Tbilisi\n\nMeals: Breakfast / Lunch",
        },
        {
          label: "Day 5 | Journey Through Georgia's Ancient Past",
          description: "Leaving Tbilisi behind, today's journey follows the historic route back towards western Georgia.\n\nOur first stop is Gori, the birthplace of Joseph Stalin and one of central Georgia's most important regional cities.\n\nWe then continue to Uplistsikhe, one of the oldest rock-hewn settlements in the Caucasus. Dating back to the early Iron Age, this extraordinary cave city once served as an important political, religious and commercial centre along the ancient Silk Road.\n\nWalking through its tunnels, temples, wine cellars and ancient streets offers a fascinating glimpse into Georgia's pre-Christian civilisation and architectural ingenuity.\n\nIn the afternoon, we continue our scenic drive back to Batumi.\n\nOvernight in Batumi\n\nMeals: Breakfast / Lunch",
        },
        {
          label: "Day 6 | Batumi at Your Own Pace (FREE DAY)",
          description: "Today is yours to enjoy Batumi exactly as you wish.\n\nRelax on the beach, stroll along Batumi Boulevard, discover local cafes, markets and boutiques or simply unwind while enjoying the city's vibrant seaside atmosphere.\n\nShould you wish to explore even further, our team will be delighted to arrange additional experiences tailored to your interests, allowing you to discover even more of Georgia's hidden treasures beyond the classic tourist routes.\n\nOvernight in Batumi\n\nMeals: Breakfast",
        },
        {
          label: "Day 7 | Farewell Georgia",
          description: "After breakfast, transfer to Batumi International Airport.\n\nAlthough your journey comes to an end, the memories of Georgia's ancient history, spectacular landscapes, vibrant cities and legendary hospitality will remain with you long after you return home.",
        },
        ],
      },
    ],
  };
}

function buildBatumiGeorgiaDiscovery6nKa(): TourContent {
  return {
    title: "აღმოაჩნე საქართვლო",
    routeLabel: "ბათუმი · თბილისი · საქართველო · 7 დღე / 6 ღამე",
    subtitle: "აღმოაჩინეთ საქართველოს საოცარი მრავალფეროვნება მოგზაურობით, რომელიც შავი ზღვის სანაპიროდან ქვეყნის ისტორიულ და კულტურულ ცენტრამდე მიგიყვანთ. ეს ტური აერთიანებს მსოფლიო მემკვიდრეობის ძეგლებს, შთამბეჭდავ ბუნებრივ საოცრებებს, უძველეს ქალაქებსა და მრავალსაუკუნოვან ტრადიციებს, რომლებმაც საქართველო უნიკალურ ცივილიზაციად ჩამოაყალიბა.",
    outline: [],
    highlights: [],
    includes: [
      "სასტუმროში განთავსება საუზმით",
      "სერტიფიცირებული პროფესიონალი გიდის მომსახურება",
      "კომფორტული ტრანსპორტირება მთელი ტურის განმავლობაში",
      "პროგრამით გათვალისწინებული შესასვლელი ბილეთები",
      "პროგრამით განსაზღვრული კვება",
    ],
    sections: [
      {
        title: "პროგრამა",
        days: [
        {
          label: "დღე 1 | კეთილი იყოს თქვენი მობრძანება ბათუმში",
          description: "ბათუმის ან ქუთაისის საერთაშორისო აეროპორტში ჩამოსვლისთანავე დაგხვდებათ ჩვენი წარმომადგენელი, რომელიც სასტუმრომდე კომფორტულ ტრანსფერს უზრუნველყოფს. განთავსებისა და მცირე დასვენების შემდეგ, გაეცნობით ბათუმს შავი ზღვის სანაპიროზე გაშენებულ ქალაქს, სადაც ევროპული არქიტექტურა, თანამედროვე ურბანული სივრცეები და სუბტროპიკული ბუნება განსაკუთრებულ ჰარმონიას ქმნის.\n\nგასეირნებას დავიწყებთ პიაცას მოედნიდან იტალიური არქიტექტურით შთაგონებული ბათუმის ერთ-ერთი ყველაზე გამორჩეული სივრციდან. შემდეგ ვეწვევით წმინდა ნიკოლოზის ეკლესიას, ქალაქის ერთ-ერთ უძველეს მართლმადიდებლურ ტაძარს.\n\nმოგზაურობას ევროპის მოედანზე გავაგრძელებთ, სადაც მედეას მონუმენტი ოქროს საწმისით კოლხეთის სამეფოსა და არგონავტების ლეგენდარულ მითს აცოცხლებს. აქვე მდებარეობს ასტრონომიული საათი და ნეპტუნის შადრევანი, რომლებიც ბათუმის ევროპულ იერს განსაკუთრებულ ელეგანტურობას სძენს.\n\nშემდეგ გავისეირნებთ ბათუმის ბულვარში, მოვინახულებთ სასწაულების პარკს, ქართული ანბანის უნიკალურობას მიძღვნილ ანბანის კოშკს და სიყვარულის სიმბოლოდ ქცეულ მოძრავ ქანდაკებას „ალი და ნინო“.\n\nმსურველებს შესაძლებლობა ექნებათ, დღე იახტით გასეირნებით დაასრულონ. ზღვის მხრიდან გადაშლილი განათებული ბათუმის პანორამა თქვენი მოგზაურობის პირველი დაუვიწყარი შთაბეჭდილება იქნება.\n\nღამისთვა ბათუმში\n\nკვება: - / - / -",
        },
        {
          label: "დღე 2 | უძველესი ციხესიმაგრეები, ბოტანიკური საოცრება და შავი ზღვის გემოები",
          description: "დღევანდელი დღე აჭარის ისტორიულ მემკვიდრეობასა და ბუნებრივ მრავალფეროვნებას ეძღვნება.\n\nპირველად მოვინახულებთ VI საუკუნის ბიზანტიურ ციხესიმაგრეს პეტრას, რომელიც საუკუნეების განმავლობაში ევროპასა და აზიას შორის მნიშვნელოვან სავაჭრო და სამხედრო ცენტრს წარმოადგენდა. მისი სტრატეგიული მდებარეობიდან შავი ზღვის სანაპიროს შთამბეჭდავი ხედები იშლება.\n\nშემდეგ ვეწვევით ბათუმის ბოტანიკურ ბაღს აღმოსავლეთ ევროპის ერთ-ერთ ყველაზე მრავალფეროვან ბოტანიკურ ბაღს, სადაც მსოფლიოს სხვადასხვა კონტინენტის მცენარეული კოლექციები, სუბტროპიკული ტყეები და ზღვის ულამაზესი პანორამები ერთმანეთთან ბუნებრივად ერწყმის.\n\nბათუმის ბოტანიკური ბაღის დათვალიერების შემდეგ თავისუფალი დრო გექნებათ მწვანე კონცხზე დასვენებისა და შავი ზღვის სუფთა წყლებში ბანაობისთვის. ზღვისა და სუბტროპიკული ბუნების საოცარი შერწყმა ამ ადგილს აჭარის ერთ-ერთ ყველაზე გამორჩეულ სანაპიროდ აქცევს.\n\nდღის ბოლოს ბათუმის თევზის ბაზარს ვეწვევით, სადაც თავად შეარჩევთ ადგილობრივი მეთევზეების მიერ ახალდაჭერილ თევზსა თუ ზღვის პროდუქტებს და მათ ახლომდებარე საოჯახო რესტორანში დააგემოვნებთ.\n\nღამისთვა ბათუმში\n\nკვება: საუზმე / სადილი",
        },
        {
          label: "დღე 3 | მღვიმეები, ზურმუხტისფერი კანიონები და მეგრული ტრადიციები",
          description: "დღევანდელი დღე დასავლეთ საქართველოს ბუნების უნიკალურ საოცრებებსა და სამეგრელოს ავთენტურ კულტურას გაგაცნობთ.\n\nმოგზაურობას დავიწყებთ პრომეთეს მღვიმის მონახულებით ბუნების გამორჩეული ქმნილებით, სადაც მილიონობით წლის განმავლობაში ჩამოყალიბებული სტალაქტიტები, სტალაგმიტები და შთამბეჭდავი მიწისქვეშა დარბაზები ზღაპრულ სამყაროს ქმნის.\n\nშემდეგ გავემართებით მარტვილის კანიონისკენ, რომელიც ზურმუხტისფერი წყლით, მაღალი კირქვის კლდეებითა და ულამაზესი ბუნებით საქართველოს ერთ-ერთ ყველაზე შთამბეჭდავ ბუნებრივ ღირსშესანიშნაობად მიიჩნევა. სურვილის შემთხვევაში შესაძლებელი იქნება კანიონში ნავით გასეირნებაც.\n\nდღის განსაკუთრებული ნაწილი გელოდებათ ლია ბებოს ტრადიციულ ეთნო სახლში, სადაც მეგრული სტუმართმოყვარეობის თბილ გარემოში თავადაც გახდებით კულინარიული გამოცდილების მონაწილე. მასპინძლებთან ერთად მოამზადებთ და გაწელავთ მეგრული სამზარეულოს ერთ-ერთ ყველაზე ცნობილ კერძს ელარჯს, შემდეგ კი დააგემოვნებთ ოჯახური რეცეპტებით მომზადებულ ავთენტურ მეგრულ კერძებს. ეს შეხვედრა საშუალებას მოგცემთ, ახლოდან გაეცნოთ სამეგრელოს კულინარიულ ტრადიციებსა და ადგილობრივი ოჯახის ყოველდღიურ ცხოვრებას.\n\nსადილის შემდეგ მოვინახულებთ ჭყონდიდის მონასტერს საქართველოს ერთ-ერთ მნიშვნელოვან ისტორიულ და სასულიერო ცენტრს. მონასტრამდე საბაგიროთი ავალთ, საიდანაც სამეგრელოს თვალწარმტაცი პანორამული ხედები იშლება და ამ დაუვიწყარ დღეს განსაკუთრებულ დასასრულს სძენს.\n\nკვება: საუზმე / სადილი\n\nღამისთევა თბილისში",
        },
        {
          label: "დღე 4 | საქართველოს დედაქალაქი დაკულტურული ცენტრი",
          description: "დღევანდელი დღე საქართველოს კულტურულ და სულიერ მემკვიდრეობას ეძღვნება.\n\nმოგზაურობას დავიწყებთ მცხეთით  საქართველოს უძველესი დედაქალაქითა და ქვეყნის ერთ-ერთი უმნიშვნელოვანესი ისტორიულ-რელიგიური ცენტრით. სწორედ აქ გავრცელდა საქართველოში ქრისტიანობა IV საუკუნეში, ხოლო დღეს ქალაქი იუნესკოს მსოფლიო კულტურული მემკვიდრეობის ნუსხაში შეტანილი უნიკალური ძეგლებით ამაყობს.\n\nშემდეგ გავემართებით თბილისში ქალაქში, სადაც საუკუნეების განმავლობაში აღმოსავლური და ევროპული კულტურები ერთმანეთთან ბუნებრივად თანაარსებობდა. ძველი თბილისის ვიწრო ქუჩები, ფერადი ხის აივნები და მრავალფეროვანი არქიტექტურა განსაკუთრებულ ატმოსფეროს ქმნის, რომელიც ქალაქის მრავალსაუკუნოვან ისტორიას აცოცხლებს.\n\nსაბაგიროთი ავალთ ნარიყალას ციხემდე, საიდანაც დედაქალაქის ულამაზესი პანორამული ხედები იშლება. შემდეგ მოვინახულებთ მეტეხის ისტორიულ უბანს, რომელიც მტკვრის ხეობას გადმოჰყურებს და თბილისის ერთ-ერთ ყველაზე შთამბეჭდავ ხედს გვთავაზობს.\n\nღამისთევა თბილისში\n\nკვება: საუზმე / სადილი",
        },
        {
          label: "დღე 5 | მოგზაურობა საქართველოს უძველეს ისტორიაში",
          description: "თბილისიდან დასავლეთ საქართველოსკენ მიმავალი გზა კიდევ ერთ მნიშვნელოვან ისტორიულ მოგზაურობად იქცევა.\n\nპირველი გაჩერება გორში გვექნება ქალაქში, რომელიც იოსებ სტალინის დაბადების ადგილითაა ცნობილი და შიდა ქართლის ერთ-ერთ მნიშვნელოვან კულტურულ ცენტრს წარმოადგენს.\n\nშემდეგ მოვინახულებთ უფლისციხეს კავკასიის ერთ-ერთ უძველეს კლდეში ნაკვეთ ქალაქს, რომლის ისტორია ადრეული რკინის ხანიდან იწყება. აბრეშუმის გზის მნიშვნელოვან მონაკვეთზე მდებარე ეს უნიკალური ქალაქი საუკუნეების განმავლობაში მნიშვნელოვან პოლიტიკურ, რელიგიურ და სავაჭრო ცენტრს წარმოადგენდა.\n\nკლდეში ნაკვეთ ქუჩებში, დარბაზებში, ტაძრებსა და ღვინის საწნახლებში გასეირნება საშუალებას მოგცემთ ახლოდან გაეცნოთ საქართველოს წინაქრისტიანულ ისტორიასა და იმ მაღალ სამშენებლო კულტურას, რომელმაც ეს გამორჩეული ძეგლი შექმნა.\n\nშუადღის შემდეგ დასავლეთ საქართველოს მიმართულებით გავემართებით და საღამოს ბათუმში დავბრუნდებით.\n\nღამისთევა ბათუმში\n\nკვება: საუზმე / სადილი",
        },
        {
          label: "დღე 6 | თავისუფალი დღე ბათუმში",
          description: "დღევანდელი დღე სრულად თქვენს განკარგულებაშია.\n\nდაისვენეთ შავი ზღვის სანაპიროზე, გაისეირნეთ ბათუმის ბულვარში, აღმოაჩინეთ ქალაქის მყუდრო კაფეები, ადგილობრივი ბაზრები და სავაჭრო სივრცეები ან უბრალოდ დატკბით ბათუმის ზღვისპირა ატმოსფეროთი.\n\nთუ სურვილი გექნებათ, ჩვენი გუნდი სიამოვნებით დაგიგეგმავთ დამატებით ექსკურსიებსა და ინდივიდუალურ გამოცდილებებს, რომლებიც საქართველოს კიდევ უფრო საინტერესო და ნაკლებად ცნობილ ადგილებს გაგაცნობთ.\n\nღამისთევა ბათუმში\n\nკვება: საუზმე",
        },
        {
          label: "დღე 7 | გამგზავრება",
          description: "საუზმის შემდეგ, ფრენის განრიგის შესაბამისად, თავისუფალი დრო გექნებათ, რის შემდეგაც ჩვენი ტრანსპორტი ბათუმის/ქუთაისის საერთაშორისო აეროპორტში გადაგიყვანთ.\n\nმოგზაურობა დასრულდება, თუმცა დასავლეთ საქართველოს მრავალფეროვანი ბუნება, უძველესი ისტორია, გამორჩეული კულინარია და გულითადი სტუმართმოყვარეობა კიდევ დიდხანს დარჩება თქვენს მოგონებებში.",
        },
        ],
      },
    ],
  };
}

function buildBatumiGeorgiaDiscovery6nRu(): TourContent {
  return batumiGeorgiaDiscovery6nRu;
}

function buildBatumiGeorgiaDiscovery6nZh(): TourContent {
  return batumiGeorgiaDiscovery6nZh;
}

export function buildBatumiGeorgiaDiscovery6nTourInput(): StoredTourInput & { id: string } {
  const locales: AppLocale[] = ["ka", "en", "ru", "zh"];
  const builders = {
    ka: buildBatumiGeorgiaDiscovery6nKa,
    en: buildBatumiGeorgiaDiscovery6nEn,
    ru: buildBatumiGeorgiaDiscovery6nRu,
    zh: buildBatumiGeorgiaDiscovery6nZh,
  };

  return {
    id: BATUMI_GEORGIA_DISCOVERY_6N_ID,
    destinations: ["batumi"],
    meta: {
      durationKey: "6nights7days",
      priceFrom: 2076,
      minPeople: 3,
      startTime: "10:00",
      popular: false,
      exclusive: false,
    },
    images: ["/dest/tbilisi/oldtbilisi.jpg"],
    content: Object.fromEntries(
      locales.map((locale) => [locale, builders[locale]()]),
    ) as Record<AppLocale, TourContent>,
  };
}
