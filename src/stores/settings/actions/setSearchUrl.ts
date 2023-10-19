import { action } from "nanostores";
import { $settings } from "..";

export const setSearchUrl = action(
  $settings,
  "setSearchUrl",
  function ($settings, searchUrl: string) {
    const settings = $settings.get();
    $settings.set({ ...settings, searchUrl: searchUrl.trim() });
  },
);
