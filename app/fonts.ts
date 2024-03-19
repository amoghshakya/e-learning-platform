import { Inter, Bricolage_Grotesque } from "next/font/google";

// these are variable fonts, better not to specify weights
export const body = Inter({ subsets: ["latin"], display: "swap" });

export const heading = Bricolage_Grotesque({
  subsets: ["latin"],
});
