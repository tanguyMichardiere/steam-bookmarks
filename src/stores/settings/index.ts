import { persistentAtom } from "@nanostores/persistent";
import { jsonEncode } from "../utils";

export type Settings = {
  searchUrl: string;
};

export const $settings = persistentAtom<Settings>(
  "settings",
  { searchUrl: "https://www.google.com/search?q=%s" },
  jsonEncode,
);
