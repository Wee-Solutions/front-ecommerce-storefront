"use client";

import { useEffect, useRef } from "react";
import { isGuid } from "@/lib/guards";
import {
  trackSearchProducts,
  trackViewCategory,
  trackViewProduct,
} from "@/features/events/track-events";

export function TrackProductView({ productId }: { productId: string }) {
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    if (!isGuid(productId) || tracked.current === productId) return;
    tracked.current = productId;
    trackViewProduct(productId);
  }, [productId]);

  return null;
}

export function TrackCategoryView({ categoryId }: { categoryId: string }) {
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    if (!isGuid(categoryId) || tracked.current === categoryId) return;
    tracked.current = categoryId;
    trackViewCategory(categoryId);
  }, [categoryId]);

  return null;
}

export function TrackSearchView({ searchTerm }: { searchTerm: string }) {
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    const term = searchTerm.trim();
    if (!term || tracked.current === term) return;
    tracked.current = term;
    trackSearchProducts(term);
  }, [searchTerm]);

  return null;
}
