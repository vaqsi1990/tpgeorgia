export type BackgroundImagePlacement = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

/** Decorative line-art for the home page (Why Us → Contact voids). */
export const homeBackgroundImages: BackgroundImagePlacement[] = [
  {
    src: "/bgimages/first.png",
    alt: "",
    width: 420,
    height: 420,
    className:
      "pointer-events-none absolute -left-10 top-[16%] w-40 mix-blend-multiply opacity-60 sm:-left-4 sm:w-56 lg:left-[1%] lg:w-72",
  },
  {
    src: "/bgimages/3.png",
    alt: "",
    width: 420,
    height: 420,
    className:
      "pointer-events-none absolute -right-8 top-[20%] w-36 mix-blend-multiply opacity-55 sm:-right-2 sm:w-52 lg:right-[2%] lg:w-64",
  },
  {
    src: "/bgimages/khinkali-2.svg",
    alt: "",
    width: 280,
    height: 280,
    className:
      "pointer-events-none absolute -left-6 top-[34%] w-32 opacity-75 sm:left-[1%] sm:w-44 lg:w-52",
  },
  {
    src: "/bgimages/pitcher.svg",
    alt: "",
    width: 260,
    height: 260,
    className:
      "pointer-events-none absolute -right-4 top-[40%] w-28 opacity-75 sm:right-[2%] sm:w-40 lg:w-48",
  },
  {
    src: "/bgimages/first.png",
    alt: "",
    width: 360,
    height: 360,
    className:
      "pointer-events-none absolute -right-12 top-[55%] hidden w-44 mix-blend-multiply opacity-50 sm:block lg:right-[3%] lg:w-56",
  },
  {
    src: "/bgimages/3.png",
    alt: "",
    width: 360,
    height: 360,
    className:
      "pointer-events-none absolute -left-10 top-[64%] hidden w-40 mix-blend-multiply opacity-50 sm:block lg:left-[2%] lg:w-52",
  },
  {
    src: "/bgimages/khinkali-2.svg",
    alt: "",
    width: 240,
    height: 240,
    className:
      "pointer-events-none absolute right-[5%] top-[78%] w-28 opacity-65 sm:w-36 lg:w-44",
  },
  {
    src: "/bgimages/pitcher.svg",
    alt: "",
    width: 240,
    height: 240,
    className:
      "pointer-events-none absolute left-[4%] top-[88%] w-24 opacity-65 sm:w-32 lg:w-40",
  },
];

/** Decorative line-art for catalog / blog detail pages only. */
export const detailBackgroundImages: BackgroundImagePlacement[] = [
  {
    src: "/bgimages/church.png",
    alt: "",
    width: 420,
    height: 420,
    className:
      "pointer-events-none absolute -right-10 top-[4%] w-40 mix-blend-multiply opacity-60 sm:-right-2 sm:w-56 lg:right-[2%] lg:w-72",
  },
  {
    src: "/bgimages/sec.png",
    alt: "",
    width: 400,
    height: 400,
    className:
      "pointer-events-none absolute -left-12 top-[28%] w-36 mix-blend-multiply opacity-55 sm:-left-4 sm:w-52 lg:left-[2%] lg:w-64",
  },
  {
    src: "/bgimages/barbecue.svg",
    alt: "",
    width: 340,
    height: 280,
    className:
      "pointer-events-none absolute -right-6 top-[55%] w-40 opacity-70 sm:right-[3%] sm:w-52 lg:w-60",
  },
  {
    src: "/bgimages/church.png",
    alt: "",
    width: 360,
    height: 360,
    className:
      "pointer-events-none absolute -left-8 bottom-[12%] hidden w-40 mix-blend-multiply opacity-50 sm:block lg:left-[4%] lg:w-52",
  },
  {
    src: "/bgimages/sec.png",
    alt: "",
    width: 340,
    height: 340,
    className:
      "pointer-events-none absolute -right-8 bottom-[4%] w-36 mix-blend-multiply opacity-50 sm:right-[2%] sm:w-48 lg:w-56",
  },
];
