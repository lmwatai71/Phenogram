import { PostIdea, Strain } from "../types";

export const MOCK_STRAINS: Strain[] = [
  {
    name: "Blue Dream",
    type: "Sativa Dominant Hybrid",
    thc: "18-24%",
    terpenes: ["Myrcene", "Pinene", "Caryophyllene"],
    description: "A legendary West Coast strain. Sweet berry aroma with full-body relaxation and gentle cerebral invigoration."
  },
  {
    name: "OG Kush",
    type: "Hybrid",
    thc: "20-25%",
    terpenes: ["Myrcene", "Limonene", "Caryophyllene"],
    description: "The genetic backbone of West Coast cannabis varieties. Complex aroma with notes of fuel, skunk, and spice."
  },
  {
    name: "Granddaddy Purple",
    type: "Indica",
    thc: "17-23%",
    terpenes: ["Myrcene", "Pinene", "Caryophyllene"],
    description: "Famous for its deep purple bloom and complex grape and berry aroma."
  },
  {
    name: "Jack Herer",
    type: "Sativa",
    thc: "18-24%",
    terpenes: ["Terpinolene", "Caryophyllene", "Myrcene"],
    description: "Capture the creative energy. Spicy, pine-scented sativa that has won numerous awards for its quality."
  }
];

export const MOCK_POST_IDEAS: Record<string, PostIdea[]> = {
  grow: [
    { title: "Time-Lapse Tuesday", format: "Video", description: "A 15-second time-lapse of your canopy stretching over the last week." },
    { title: "Nutrient Shot", format: "Photo", description: "High-contrast macro shot of your feeding mixing setup with a breakdown of your recipe." }
  ],
  session: [
    { title: "Sunset Sesh", format: "Story", description: "Capture the golden hour lighting hitting the smoke. Use the 'Chill' audio track." },
    { title: "Glass Cleaning ASMR", format: "Video", description: "Satisfying clean-up of your favorite piece. Focus on the sounds." }
  ],
  review: [
    { title: "Terpene Deep Dive", format: "Carousel", description: "3 slides: 1. The Bud, 2. The Smell description, 3. The Effect rating." },
    { title: "One Hit Review", format: "Video", description: "Quick reaction video immediately after the first taste." }
  ]
};
