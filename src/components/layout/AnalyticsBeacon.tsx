"use client";

import { useEffect } from "react";
import { recordAnalytics } from "@/lib/firestore";

export const AnalyticsBeacon = () => {
  useEffect(() => {
    recordAnalytics("visitors", 1);
  }, []);

  return null;
};
