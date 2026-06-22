export type TransferAirport = "batumi" | "kutaisi";

export type TransferDestination = "batumi" | "kobuleti" | "ureki" | "tbilisi";

export type TransferVehicle = "sedan" | "minivan" | "sprinter";

export type TransferRoute = {
  id: string;
  airport: TransferAirport;
  destination: TransferDestination;
  routeKey:
    | "batumiAirportBatumi"
    | "batumiAirportKobuleti"
    | "batumiAirportUreki"
    | "batumiAirportTbilisi"
    | "kutaisiAirportKobuleti"
    | "kutaisiAirportBatumi"
    | "kutaisiAirportTbilisi";
  prices: Record<TransferVehicle, number>;
};

export const transferRoutes: TransferRoute[] = [
  {
    id: "batumi-airport-batumi",
    airport: "batumi",
    destination: "batumi",
    routeKey: "batumiAirportBatumi",
    prices: { sedan: 60, minivan: 80, sprinter: 170 },
  },
  {
    id: "batumi-airport-kobuleti",
    airport: "batumi",
    destination: "kobuleti",
    routeKey: "batumiAirportKobuleti",
    prices: { sedan: 90, minivan: 160, sprinter: 270 },
  },
  {
    id: "batumi-airport-ureki",
    airport: "batumi",
    destination: "ureki",
    routeKey: "batumiAirportUreki",
    prices: { sedan: 130, minivan: 190, sprinter: 300 },
  },
  {
    id: "batumi-airport-tbilisi",
    airport: "batumi",
    destination: "tbilisi",
    routeKey: "batumiAirportTbilisi",
    prices: { sedan: 475, minivan: 625, sprinter: 870 },
  },
  {
    id: "kutaisi-airport-kobuleti",
    airport: "kutaisi",
    destination: "kobuleti",
    routeKey: "kutaisiAirportKobuleti",
    prices: { sedan: 270, minivan: 320, sprinter: 550 },
  },
  {
    id: "kutaisi-airport-batumi",
    airport: "kutaisi",
    destination: "batumi",
    routeKey: "kutaisiAirportBatumi",
    prices: { sedan: 270, minivan: 325, sprinter: 550 },
  },
  {
    id: "kutaisi-airport-tbilisi",
    airport: "kutaisi",
    destination: "tbilisi",
    routeKey: "kutaisiAirportTbilisi",
    prices: { sedan: 470, minivan: 650, sprinter: 900 },
  },
];

export const transferRoutesByAirport = {
  batumi: transferRoutes.filter((route) => route.airport === "batumi"),
  kutaisi: transferRoutes.filter((route) => route.airport === "kutaisi"),
} satisfies Record<TransferAirport, TransferRoute[]>;

export const transferAirports: TransferAirport[] = ["batumi", "kutaisi"];

export const transferVehicles: TransferVehicle[] = ["sedan", "minivan", "sprinter"];

export const transferVehicleImages: Record<TransferVehicle, string> = {
  sedan: "/cars/sedan.jpg",
  minivan: "/cars/minivan.jpg",
  sprinter: "/cars/sprinter.jpg",
};
