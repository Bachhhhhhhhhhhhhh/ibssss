"use client";

import { useEffect, useState } from "react";

/** Returns true only after client hydration — prevents SSR mismatch on dynamic values. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}