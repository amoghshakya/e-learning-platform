import { Inter, Bricolage_Grotesque } from "next/font/google";

// these are variable fonts, better not to specify weights
export const inter = Inter({ subsets: ["latin"], display: "swap" });

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
});
