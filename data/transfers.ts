export type TransferAirport = "batumi" | "kutaisi";

export type TransferVehicle = "sedan" | "minivan" | "sprinter";

export type TransferRoute = {
  id: string;
  airport: TransferAirport;
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
    routeKey: "batumiAirportBatumi",
    prices: { sedan: 60, minivan: 80, sprinter: 170 },
  },
  {
    id: "batumi-airport-kobuleti",
    airport: "batumi",
    routeKey: "batumiAirportKobuleti",
    prices: { sedan: 90, minivan: 160, sprinter: 270 },
  },
  {
    id: "batumi-airport-ureki",
    airport: "batumi",
    routeKey: "batumiAirportUreki",
    prices: { sedan: 130, minivan: 190, sprinter: 300 },
  },
  {
    id: "batumi-airport-tbilisi",
    airport: "batumi",
    routeKey: "batumiAirportTbilisi",
    prices: { sedan: 475, minivan: 625, sprinter: 870 },
  },
  {
    id: "kutaisi-airport-kobuleti",
    airport: "kutaisi",
    routeKey: "kutaisiAirportKobuleti",
    prices: { sedan: 270, minivan: 320, sprinter: 550 },
  },
  {
    id: "kutaisi-airport-batumi",
    airport: "kutaisi",
    routeKey: "kutaisiAirportBatumi",
    prices: { sedan: 270, minivan: 325, sprinter: 550 },
  },
  {
    id: "kutaisi-airport-tbilisi",
    airport: "kutaisi",
    routeKey: "kutaisiAirportTbilisi",
    prices: { sedan: 470, minivan: 650, sprinter: 900 },
  },
];

export const transferAirports: TransferAirport[] = ["batumi", "kutaisi"];

export const transferVehicles: TransferVehicle[] = ["sedan", "minivan", "sprinter"];
