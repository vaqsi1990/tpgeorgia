import type { TourContent } from "@/data/tour-content";
import type { AppLocale } from "@/i18n/routing";
import type { StoredTourInput } from "@/lib/admin-types";
import { adjaraMustSee5nRu, adjaraMustSee5nZh } from "./adjara-5n-must-see-i18n";

export const ADJARA_MUST_SEE_5N_ID = "adjara-must-see-5n";

function buildAdjaraMustSee5nEn(): TourContent {
  return {
    title: "Adjara Must-See Journey",
    routeLabel: "Batumi · Adjara · 6 days / 5 nights",
    subtitle: "Discover the Perfect Balance of Coast, Mountains & Authentic Georgian Culture",
    outline: ["Adjara is a region of remarkable diversity, where the Black Sea coastline meets lush mountain valleys, ancient fortresses, living traditions and one of the world's oldest cultures. This carefully designed journey combines Batumi's vibrant seaside atmosphere with authentic local experiences, breathtaking nature, historical landmarks and the warm hospitality that Georgia is famous for.", "From sailing across Batumi Bay at sunset to sharing homemade wine with a local family, every day reveals another chapter of Adjara's unique story."],
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
          description: "Upon arrival at Batumi or Kutaisi International Airport, meet your representative and transfer to your hotel. After time to relax, your journey begins with an evening exploration of Batumi, Georgia's vibrant Black Sea city where elegant European architecture blends with subtropical landscapes.\n\nDiscover the charming Piazza Square before visiting St. Nicholas Church, one of Batumi's oldest Orthodox churches. Continue to Europe Square, where the statue of Medea holding the Golden Fleece recalls the ancient Greek legend connected to the Kingdom of Colchis modern western Georgia.\n\nA pleasant walk along the famous Batumi Boulevard introduces the city's most iconic landmarks, including Miracle Park, the Alphabet Tower, dedicated to Georgia's unique 33-letter alphabet, and the moving Ali & Nino sculpture, symbolising eternal love across cultures.\n\nYour first day ends with a relaxing yacht cruise across Batumi Bay. Watching the illuminated skyline from the sea is the perfect introduction to Georgia's beautiful Black Sea coast.\n\nOvernight in Batumi\n\nMeals: – / – / –",
        },
        {
          label: "Day 2 | Ancient History & Coastal Nature",
          description: "Today's journey explores two of Adjara's most remarkable landmarks.\n\nBegin at Petra Fortress, a sixth-century Byzantine stronghold dramatically overlooking the Black Sea. Once an important trading centre connecting Europe and Asia, the fortress offers spectacular views while revealing the strategic importance of Georgia's coastline throughout history.\n\nContinue to the magnificent Batumi Botanical Garden, one of the largest botanical gardens in Eastern Europe. Walking through its peaceful paths feels like travelling across different climatic zones, where exotic plants, colourful gardens and subtropical forests meet breathtaking sea views.\n\nIn the afternoon, experience one of Batumi's favourite local traditions with a visit to the famous Fish Market. Select fresh seafood directly from local fishermen before enjoying it freshly prepared in a nearby family-run restaurant a simple but unforgettable taste of the Black Sea.\n\nOvernight in Batumi\n\nMeals: Breakfast",
        },
        {
          label: "Day 3 | Discover the Hidden Side of Adjara",
          description: "Today leaves the coastline behind and explores the authentic mountain landscapes where Adjarian traditions have been preserved for generations.\n\nYour first stop is the unique Borjgalo Ethnographic Museum, where beautifully handcrafted wooden sculptures recreate scenes from traditional Georgian village life. It offers a fascinating introduction to the customs, occupations and everyday life of the region.\n\nContinue to the peaceful Mirveti Waterfall, hidden within lush subtropical forest. Crossing the picturesque wooden bridge and walking beneath ancient trees, you'll discover one of Adjara's most tranquil natural corners.\n\nThe journey continues through the spectacular Machakhela Valley, renowned for its pristine landscapes, traditional villages and centuries-old craftsmanship. The valley was once famous throughout the Caucasus for its skilled master gunsmiths, whose handcrafted Machakhela gun became a symbol of exceptional quality. Today, the region is better known for its breathtaking scenery, warm hospitality and rich cultural heritage. At Gvara Fortress, enjoy panoramic views across the surrounding mountains before experiencing genuine Georgian hospitality during a traditional Adjarian lunch prepared by a local family.\n\nFor those seeking extra adventure, optional zipline and quad-bike experiences are available before returning to Batumi.\n\nOvernight in Batumi\n\nMeals: Breakfast / Lunch",
        },
        {
          label: "Day 4 | Wine, Waterfalls & Georgian Hospitality",
          description: "Today's journey combines history, spectacular nature and one of Georgia's greatest cultural treasures its ancient wine tradition.\n\nBegin at Gonio Fortress, one of the oldest Roman fortresses on the eastern Black Sea coast. Walking through its impressive stone walls reveals more than 2,000 years of history and the strategic importance of this remarkable site.\n\nContinue into the beautiful mountain landscapes of Adjara to visit the powerful Makhuntseti Waterfall and the nearby Queen Tamar Bridge, a beautifully preserved medieval stone bridge that has connected local communities for centuries.\n\nThe day concludes in the warm atmosphere of a traditional family marani (wine cellar). Georgia is recognized as the cradle of wine, with an uninterrupted winemaking tradition spanning over 8,000 years. Here, you'll taste locally produced wines, enjoy homemade Adjarian dishes and experience the genuine hospitality that makes every Georgian table feel like a family celebration.\n\nOvernight in Batumi\n\nMeals: Breakfast / Lunch",
        },
        {
          label: "Day 5 | Leisure Day in Batumi",
          description: "Enjoy a free day to experience Batumi at your own pace.\n\nRelax on the beach, stroll along the boulevard, visit cafés and boutiques, discover museums or simply unwind while enjoying the city's lively atmosphere. Optional excursions can also be arranged for guests wishing to explore even more of Georgia with us.\n\nOvernight in Batumi\n\nMeals: Breakfast",
        },
        {
          label: "Day 6 | Departure",
          description: "After breakfast, check out from your hotel and transfer to Batumi International Airport.\n\nAlthough your journey comes to an end, the memories of Adjara's breathtaking landscapes, rich history, warm hospitality and unforgettable flavours will travel home with you.\n\nMeals: Breakfast",
        },
        ],
      },
    ],
  };
}

function buildAdjaraMustSee5nKa(): TourContent {
  return {
    title: "ეს უნდა ნახო აჭარაში",
    routeLabel: "ბათუმი · აჭარა · 6 დღე / 5 ღამე",
    subtitle: "აღმოაჩინეთ შავი ზღვის სანაპიროს, მთების და ავთენტური ქართული კულტურის იდეალური ჰარმონია",
    outline: ["აჭარა საქართველოს ერთ-ერთი ყველაზე მრავალფეროვანი რეგიონია, სადაც შავი ზღვის სანაპირო ორგანულად ერწყმის მწვანე მთიან ხეობებს, უძველეს ციხესიმაგრეებს, ცოცხალ ტრადიციებსა და მსოფლიოს ერთ-ერთ უძველეს კულტურას. ეს საგულდაგულოდ დაგეგმილი ტური აერთიანებს ბათუმის ზღვისპირა ხიბლს, ავთენტურ ადგილობრივ გამოცდილებებს, შთამბეჭდავ ბუნებას, ისტორიულ ღირსშესანიშნაობებსა და იმ გამორჩეულ სტუმართმოყვარეობას, რომლითაც საქართველო მთელ მსოფლიოშია ცნობილი."],
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
          description: "ბათუმის ან ქუთაისის საერთაშორისო აეროპორტში ჩამოსვლისთანავე დაგხვდებათ ჩვენი წარმომადგენელი, რომელიც სასტუმრომდე კომფორტულ ტრანსფერს უზრუნველყოფს. განთავსებისა და მცირე დასვენების შემდეგ, გაეცნობით ბათუმს შავი ზღვის სანაპიროზე გაშენებულ ქალაქს, სადაც ევროპული არქიტექტურა, თანამედროვე ურბანული სივრცეები და სუბტროპიკული ბუნება განსაკუთრებულ ჰარმონიას ქმნის.\n\nგასეირნებას დავიწყებთ პიაცას მოედნიდან იტალიური არქიტექტურით შთაგონებული ერთ-ერთი ყველაზე გამორჩეული სივრციდან ბათუმში. შემდეგ მოვინახულებთ წმინდა ნიკოლოზის ეკლესიას, ქალაქის ერთ-ერთ უძველეს მართლმადიდებლურ ტაძარს, რომლის ისტორია XIX საუკუნეს უკავშირდება.\n\nმოგზაურობას ევროპის მოედანზე გავაგრძელებთ, სადაც მედეას მონუმენტი ოქროს საწმისით კოლხეთის სამეფოსა და არგონავტების ლეგენდარულ მითს აცოცხლებს. აქვე შეგიძლიათ იხილოთ ევროპის მოედნის არქიტექტურული ანსამბლი, ასტრონომიული საათი და ნეპტუნის შადრევანი, რომლებიც ბათუმის ევროპულ იერს განსაკუთრებულ ხიბლს სძენს.\n\nშემდეგ გავისეირნებთ ბათუმის ცნობილ ბულვარში, მოვინახულებთ სასწაულების პარკს, ქართული ანბანის უნიკალურობას მიძღვნილ ანბანის კოშკს და სიყვარულის სიმბოლოდ ქცეულ მოძრავ ქანდაკებას „ალი და ნინო“, რომელიც სხვადასხვა კულტურის ადამიანებს შორის სიყვარულისა და ერთიანობის იდეას გამოხატავს.\n\nდღე დასრულდება იახტით გასეირნებით შავ ზღვაზე. ზღვის მხრიდან გადაშლილი განათებული ბათუმის პანორამა თქვენი მოგზაურობის პირველი დაუვიწყარი შთაბეჭდილება იქნება.\n\nკვება: – / – / –\n\nღამისთევა ბათუმში",
        },
        {
          label: "დღე 2 | უძველესი ისტორია და შავი ზღვის სანაპიროს ბუნება",
          description: "დღევანდელი დღე აჭარის ორ უმნიშვნელოვანეს ისტორიულ და ბუნებრივ ღირსშესანიშნაობას ეთმობა.\n\nპირველად მოვინახულებთ პეტრას ციხესიმაგრეს VI საუკუნის ბიზანტიურ ციხეს, რომელიც შავი ზღვის სანაპიროს მაღლიდან გადმოჰყურებს. სტრატეგიული მდებარეობის წყალობით, იგი საუკუნეების განმავლობაში ევროპასა და აზიას შორის მნიშვნელოვან სავაჭრო და სამხედრო ცენტრს წარმოადგენდა.\n\nშემდეგ ვეწვევით ბათუმის ბოტანიკურ ბაღს აღმოსავლეთ ევროპის ერთ-ერთ ყველაზე მრავალფეროვან ბოტანიკურ ბაღს. სასიამოვნო საფეხმავლო ბილიკები, ეგზოტიკური მცენარეები, სუბტროპიკული ტყეები და ზღვის პანორამული ხედები აქ განსაკუთრებულ ატმოსფეროს ქმნის.\n\nდღის ბოლოს ბათუმის თევზის ბაზარში ადგილობრივ მეთევზეებს შეხვდებით, თავად შეარჩევთ ახალდაჭერილ თევზსა თუ ზღვის პროდუქტებს და მათ ახლომდებარე საოჯახო რესტორანში დააგემოვნებთ ეს ბათუმის ზღვისპირა ცხოვრების ერთ-ერთი ყველაზე ავთენტური გამოცდილებაა.\n\nღამისთევა ბათუმში\n\nკვება: საუზმე",
        },
        {
          label: "დღე 3 | მაჭახელას საგანძური",
          description: "დღეს ბათუმის სანაპიროს დავტოვებთ და მთიანი აჭარისკენ გავემართებით რეგიონში, სადაც ბუნება, ტრადიციები და სოფლის ცხოვრება დღემდე ავთენტურ სახეს ინარჩუნებს.\n\nპირველი გაჩერება ბორჯღალოს ეთნოგრაფიული მუზეუმია, სადაც ხეზე ხელით ნაკვეთი ფიგურები აჭარის ტრადიციულ ყოფას, საქმიანობასა და ყოველდღიურ ცხოვრებას აცოცხლებს.\n\nშემდეგ მოვინახულებთ მირვეთის ჩანჩქერს, რომელიც სუბტროპიკული ტყის წიაღშია მოქცეული. ხის ხიდზე გადასვლისა და უძველესი ხეების ჩრდილში გასეირნების შემდეგ აღმოაჩენთ აჭარის ერთ-ერთ ყველაზე მშვიდ და თვალწარმტაც ბუნებრივ კუთხეს.\n\nმოგზაურობა გაგრძელდება მაჭახელას ხეობაში რეგიონში, რომელიც გამორჩეულია ხელუხლებელი ბუნებით, ტრადიციული სოფლებითა და მრავალსაუკუნოვანი ხელოსნური კულტურით. მაჭახელა საუკუნეების განმავლობაში ცნობილი იყო თავისი თოფის ოსტატებით, რომელთა მიერ დამზადებული მაჭახელას თოფები მთელ კავკასიაში განსაკუთრებული ხარისხითა და დამზადების ტექნოლოგიით გამოირჩეოდა.\n\nშემდეგ ავალთ გვარას ციხეზე, საიდანაც მთიანი აჭარის ულამაზესი პანორამები იშლება.\n\nდღის განსაკუთრებული ნაწილი ტრადიციული აჭარული სადილია ადგილობრივ ოჯახში, სადაც რეგიონულ კერძებთან ერთად ახლოდან გაეცნობით ქართულ სტუმართმოყვარეობას.\n\nმსურველებისთვის შესაძლებელია დამატებით ზიპლაინით ან კვადროციკლით გასეირნება.\n\nღამისთევა ბათუმში\n\nკვება: საუზმე / სადილი",
        },
        {
          label: "დღე 4 | ღვინო, ჩანჩქერები და აჭარული მარიფათ",
          description: "დღევანდელი დღე აერთიანებს ისტორიას, ბუნებასა და ქართული კულტურის ერთ-ერთ ყველაზე მნიშვნელოვან სიმბოლოს ღვინოს.\n\nმოგზაურობას დავიწყებთ გონიოს ციხესიმაგრით შავი ზღვის აღმოსავლეთ სანაპიროს ერთ-ერთი უძველესი რომაული ციხესიმაგრით, რომლის ისტორია ორ ათასწლეულზე მეტს ითვლის.\n\nშემდეგ მთიანი აჭარის ულამაზესი გზებით გავემართებით მახუნცეთის ჩანჩქერისკენ და მოვინახულებთ შუა საუკუნეების არქიტექტურის გამორჩეულ ნიმუშს თამარ მეფის თაღოვან ხიდს, რომელიც საუკუნეების განმავლობაში აკავშირებდა ადგილობრივ მოსახლეობას.\n\nდღე დასრულდება ოჯახურ მარანში, სადაც გაეცნობით ქართული მეღვინეობის მრავალსაუკუნოვან ტრადიციას. საქართველო ღვინის სამშობლოდ მიიჩნევა, ხოლო ქვევრის ღვინის დაყენების მეთოდი იუნესკოს არამატერიალური კულტურული მემკვიდრეობის ნუსხაშია შეტანილი.\n\nადგილობრივი ღვინის დაგემოვნება, ტრადიციული აჭარული კერძები და მასპინძლების გულთბილი მიღება ამ დღეს განსაკუთრებულად დასამახსოვრებელს გახდის.\n\nღამისთევა ბათუმში\n\nკვება: საუზმე / სადილი",
        },
        {
          label: "დღე 5 | თავისუფალი დღე ბათუმში",
          description: "დღეს შეგიძლიათ ბათუმი საკუთარი სურვილისამებრ აღმოაჩინოთ.\n\nდაისვენეთ ზღვის სანაპიროზე, გაისეირნეთ ბულვარში, მოინახულეთ მუზეუმები, კაფეები, მაღაზიები ან სურვილის შემთხვევაში შეარჩიეთ დამატებითი ექსკურსია შვენთან ერთად. \n\nღამისთევა ბათუმში\n\nკვება: საუზმე",
        },
        {
          label: "დღე 6 | გამგზავრება",
          description: "საუზმის შემდეგ დატოვებთ სასტუმროს და ჩვენი ტრანსპორტი ბათუმის საერთაშორისო აეროპორტში გადაგიყვანთ.\n\nმოგზაურობა დასრულდება, თუმცა აჭარის ზღვისპირა პეიზაჟები, მთების სილამაზე, უძველესი ისტორია, გამორჩეული სტუმართმოყვარეობა და ავთენტური გემოები კიდევ დიდხანს დარჩება თქვენს მოგონებებში.\n\nკვება: საუზმე",
        },
        ],
      },
    ],
  };
}

function buildAdjaraMustSee5nRu(): TourContent {
  return adjaraMustSee5nRu;
}

function buildAdjaraMustSee5nZh(): TourContent {
  return adjaraMustSee5nZh;
}

export function buildAdjaraMustSee5nTourInput(): StoredTourInput & { id: string } {
  const locales: AppLocale[] = ["ka", "en", "ru", "zh"];
  const builders = {
    ka: buildAdjaraMustSee5nKa,
    en: buildAdjaraMustSee5nEn,
    ru: buildAdjaraMustSee5nRu,
    zh: buildAdjaraMustSee5nZh,
  };

  return {
    id: ADJARA_MUST_SEE_5N_ID,
    destinations: ["batumi"],
    meta: {
      durationKey: "5nights6days",
      priceFrom: 1150,
      minPeople: 3,
      startTime: "10:00",
      popular: false,
      exclusive: false,
    },
    images: ["/dest/adjara/adjara.jpg"],
    content: Object.fromEntries(
      locales.map((locale) => [locale, builders[locale]()]),
    ) as Record<AppLocale, TourContent>,
  };
}
