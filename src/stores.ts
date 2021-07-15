import { writable } from "svelte/store";

function createColorMode() {
  const { subscribe, set, update } = writable("");

  return {
    subscribe,
    toggle: () => update(a => a === "light" || a === "" ? "dark" : "light"),
    setLightMode: () => set("light"),
    setDarkMode: () => set("dark"),
    setMode: (mode) => set(mode),
    reset: () => set("")
  }
}

export const colorMode = createColorMode();