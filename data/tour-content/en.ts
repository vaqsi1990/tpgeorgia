import type { TourId } from "@/data/tours";
import type { TourContent } from "./types";

export const multiDayTourContentEn: Pick<
  Record<TourId, TourContent>,
  "vardzia" | "svaneti12day"
> = {
  vardzia: {
    title: "12-Day Georgia Discovery Journey",
    routeLabel: "Vardzia Route",
    subtitle: "Culture • Wine • Mountains • History • Sea",
    outline: [
      "Tbilisi & Mtskheta",
      "Kakheti Wine Region",
      "Greater Caucasus & Kazbegi",
      "Vardzia, Khertvisi & Rabati",
      "Borjomi & Kutaisi",
      "Batumi & the Black Sea Coast",
    ],
    sections: [
      {
        title: "Days 1–2: Tbilisi & The Ancient Capital",
        days: [
          {
            label: "Day 1: Arrival in Tbilisi",
            description:
              "Arrival in Georgia's vibrant capital and transfer to the hotel. Discover the charm of Old Tbilisi with its colorful balconies, winding streets, and lively atmosphere. Relax in the famous sulfur baths of Abanotubani and take the cable car to Narikala Fortress for breathtaking views over the city.",
          },
          {
            label: "Day 2: Mtskheta & Jvari – UNESCO Heritage",
            description:
              "Visit Mtskheta, Georgia's ancient capital and one of the country's most important spiritual centers. Explore the 6th-century Jvari Monastery overlooking the confluence of the Aragvi and Mtkvari rivers, followed by a visit to the magnificent Svetitskhoveli Cathedral, a UNESCO World Heritage Site. Return to Tbilisi for an evening at leisure.",
          },
        ],
      },
      {
        title: "Days 3–4: Kakheti Wine Region",
        days: [
          {
            label: "Day 3: Telavi & Family Wineries",
            description:
              "Travel to Kakheti, the birthplace of Georgian wine. Enjoy panoramic views of the Alazani Valley and visit local family-run wineries to discover Georgia's 8,000-year-old winemaking tradition. Experience traditional Qvevri wine tasting and enjoy authentic Georgian hospitality with a traditional supra (feast). Overnight in Telavi.",
          },
          {
            label: "Day 4: Sighnaghi – The City of Love",
            description:
              "Visit the peaceful Bodbe Monastery, one of Georgia's most important pilgrimage sites. Continue to Sighnaghi, a charming hilltop town known as the \"City of Love.\" Wander through its cobblestone streets, admire its colorful architecture, and enjoy spectacular views of the Alazani Valley. Return to Tbilisi.",
          },
        ],
      },
      {
        title: "Days 5–6: The Greater Caucasus Mountains",
        days: [
          {
            label: "Day 5: Georgian Military Highway",
            description:
              "Journey along one of the most scenic roads in the Caucasus. Stop at the turquoise waters of Zhinvali Reservoir, explore the medieval Ananuri Fortress, and admire the breathtaking mountain landscapes of Gudauri. Arrive in Stepantsminda (Kazbegi) for an overnight stay surrounded by the majestic Caucasus Mountains.",
          },
          {
            label: "Day 6: Kazbegi Experience",
            description:
              "Visit the iconic Gergeti Trinity Church, perched high above the valley against the dramatic backdrop of Mount Kazbek. Enjoy free time to immerse yourself in the pristine mountain scenery and peaceful atmosphere of the region. Overnight in Kazbegi.",
          },
        ],
      },
      {
        title: "Days 7–8: Southern Georgia's Historic Treasures",
        days: [
          {
            label: "Day 7: Gori – Uplistsikhe – Vardzia – Khertvisi – Aspindza",
            description:
              "Travel through the heart of Georgia and visit Uplistsikhe, an extraordinary ancient rock-hewn town that dates back to the early Iron Age. Continue south to Vardzia, Georgia's most impressive cave monastery complex, carved into the cliffs during the reign of Queen Tamar. On the way back, stop at the magnificent Khertvisi Fortress, one of the oldest and most strategically important fortresses in Georgia. Overnight in Aspindza.",
          },
          {
            label: "Day 8: Rabati Castle & Borjomi",
            description:
              "After breakfast, visit Rabati Castle in Akhaltsikhe, a beautifully restored fortress where Georgian, Ottoman, and European architectural influences meet. Continue to Borjomi, famous for its mineral springs and picturesque central park. Enjoy a relaxing walk through the park and taste the renowned Borjomi mineral water directly from its natural source. Drive to Kutaisi for an overnight stay.",
          },
        ],
      },
      {
        title: "Days 9–12: Black Sea Coast",
        days: [
          {
            label: "Day 9: Kutaisi to Batumi",
            description:
              "Before departing for Batumi, explore Kutaisi, one of Georgia's oldest cities. Visit Prometheus Cave, known for its impressive underground halls, colorful illuminations, and stunning stalactite formations. Continue to Batumi and enjoy an evening stroll along the seaside boulevard.",
          },
          {
            label: "Day 10: Explore Batumi",
            description:
              "Discover Georgia's vibrant coastal city. Visit the Batumi Botanical Garden, admire the famous Ali & Nino Statue, explore Europe Square, and enjoy the city's unique blend of modern architecture and subtropical charm.",
          },
          {
            label: "Day 11: Batumi & Adjara Experience",
            description:
              "Explore the beautiful landscapes of Adjara. Visit scenic viewpoints, waterfalls, traditional villages, and experience the authentic culture of Georgia's southwestern region. Return to Batumi for an overnight stay.",
          },
          {
            label: "Day 12: Departure",
            description:
              "Enjoy your final morning on the Black Sea coast. Savor a traditional Adjarian Khachapuri before your transfer to Batumi International Airport or return journey to Tbilisi.",
          },
        ],
      },
    ],
    includes: [
      "Transportation throughout the itinerary",
      "Professional guide",
      "Accommodation",
      "Selected meals",
    ],
    highlights: [
      "Authentic wine experiences in Kakheti",
      "UNESCO World Heritage Sites",
      "The breathtaking Caucasus Mountains",
      "Gergeti Trinity Church & Mount Kazbek",
      "Vardzia Cave Monastery, Khertvisi Fortress & Rabati Castle",
      "Borjomi National Park & Mineral Springs",
      "Batumi and the Black Sea Coast",
      "Traditional Georgian cuisine and hospitality",
    ],
  },
  svaneti12day: {
    title: "12-Day Georgia Discovery Journey",
    routeLabel: "Svaneti Route",
    subtitle: "Culture • Wine • Mountains • History • Sea",
    outline: [
      "Tbilisi & Mtskheta",
      "Kakheti Wine Region",
      "Greater Caucasus & Kazbegi",
      "Uplistsikhe & Kutaisi",
      "Svaneti — Mestia & Ushguli",
      "Batumi & the Black Sea Coast",
    ],
    sections: [
      {
        title: "Days 1–2: Tbilisi & The Ancient Capital",
        days: [
          {
            label: "Day 1: Arrival in Tbilisi",
            description:
              "Arrival in Georgia's vibrant capital and check-in. Explore the charming Old Town with its narrow streets and colorful balconies. Relax in the famous sulfur baths of Abanotubani and take the cable car up to Narikala Fortress for panoramic views over the city.",
          },
          {
            label: "Day 2: Mtskheta & Jvari – UNESCO Heritage",
            description:
              "Visit Mtskheta, the ancient capital of Georgia, located just 30–40 minutes from Tbilisi. Discover the 6th-century Jvari Monastery overlooking the confluence of rivers, and the impressive Svetitskhoveli Cathedral, one of the country's most sacred sites. Return to Tbilisi for a relaxed evening.",
          },
        ],
      },
      {
        title: "Days 3–4: Kakheti Wine Region",
        days: [
          {
            label: "Day 3: Telavi & Family Wineries",
            description:
              "Drive to Kakheti, the heart of Georgian wine culture. Enjoy scenic views of the Alazani Valley and visit local family wineries. Experience traditional Qvevri wine tasting and a Georgian supra (feast) filled with food, music, and hospitality. Overnight in Telavi.",
          },
          {
            label: "Day 4: Sighnaghi – City of Love",
            description:
              "Visit Bodbe Monastery, an important spiritual site in Georgia. Explore the charming cobblestone streets of Sighnaghi, known as the \"City of Love,\" and walk along its 18th-century defensive walls overlooking the Alazani Valley. Return to Tbilisi for the night.",
          },
        ],
      },
      {
        title: "Days 5–6: The Greater Caucasus Mountains",
        days: [
          {
            label: "Day 5: Georgian Military Highway → Kazbegi",
            description:
              "Drive along one of the most scenic routes in Georgia. Stop at Zhinvali Reservoir, Ananuri Fortress, and the Gudauri viewpoints. Arrive in Stepantsminda (Kazbegi), surrounded by dramatic mountain landscapes.",
          },
          {
            label: "Day 6: Kazbegi Experience",
            description:
              "Visit the iconic Gergeti Trinity Church, reached by 4x4 or hiking, offering breathtaking views of Mount Kazbek. Enjoy free time in the peaceful mountain village and experience the raw beauty of the Caucasus.",
          },
        ],
      },
      {
        title: "Day 7: Uplistsikhe → Kutaisi",
        days: [
          {
            label: "Day 7: Ancient Caves & Historical City",
            description:
              "Explore Uplistsikhe, an ancient rock-hewn town dating back thousands of years. Continue your journey to Kutaisi, one of the oldest cities in Georgia. Enjoy a relaxed evening walk in the historic center. Overnight in Kutaisi.",
          },
        ],
      },
      {
        title: "Days 8–9: Svaneti – The Alpine Kingdom",
        days: [
          {
            label: "Day 8: Kutaisi → Mestia",
            description:
              "Travel through the Enguri Dam and into the dramatic Caucasus mountains. Arrive in Mestia, the heart of the Svaneti region, famous for its medieval defensive towers. Evening walk and mountain atmosphere.",
          },
          {
            label: "Day 9: Ushguli – UNESCO World Heritage Village",
            description:
              "Take a 4x4 excursion to Ushguli, one of the highest continuously inhabited villages in Europe. Discover ancient stone towers, the Lamaria Church, and breathtaking alpine scenery. Return to Mestia.",
          },
        ],
      },
      {
        title: "Days 10–12: Black Sea Coast – Batumi",
        days: [
          {
            label: "Day 10: Mestia → Batumi",
            description:
              "Descend from the Caucasus Mountains to the Black Sea coast. Arrive in Batumi and enjoy a relaxing evening walk along the boulevard.",
          },
          {
            label: "Day 11: Explore Batumi",
            description:
              "Visit the Batumi Botanical Garden, relax on the beach, and explore the modern seaside city. See the famous Ali & Nino statue and enjoy cozy cafés by the sea.",
          },
          {
            label: "Day 12: Departure",
            description:
              "Enjoy your final morning by the Black Sea. Taste traditional Adjarian khachapuri before departure or transfer.",
          },
        ],
      },
    ],
    includes: [
      "Transportation throughout the itinerary",
      "Professional guide",
      "Accommodation",
      "Selected meals",
    ],
    highlights: [
      "Authentic wine experiences in Kakheti",
      "UNESCO World Heritage Sites",
      "The breathtaking Caucasus Mountains",
      "Gergeti Trinity Church & Mount Kazbek",
      "Uplistsikhe — ancient rock-hewn town",
      "Svaneti — Mestia & Ushguli",
      "Batumi and the Black Sea Coast",
      "Traditional Georgian cuisine and hospitality",
    ],
  },
};
