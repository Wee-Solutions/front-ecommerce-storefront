"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import type { ImageItem } from "@/types/api/product";

export function ProductGallery({
  mainImage,
  images,
  title,
}: {
  mainImage?: ImageItem | null;
  images: ImageItem[];
  title: string;
}) {
  const all: ImageItem[] = [
    ...(mainImage ? [mainImage] : []),
    ...images.filter((img) => img.id !== mainImage?.id),
  ];
  const [active, setActive] = useState(0);
  const current = all[active] ?? mainImage;

  if (!current?.url) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[var(--sf-radius)] bg-[var(--sf-color-surface)] text-[var(--sf-color-muted)]">
        No image
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-[var(--sf-radius)] border border-[var(--sf-color-border)] bg-[var(--sf-color-surface)]">
        <Image
          src={current.url}
          alt={title}
          fill
          priority
          className="object-contain p-4"
          sizes="(max-width:1024px) 100vw, 50vw"
        />
      </div>
      {all.length > 1 && (
        <ul className="flex gap-2 overflow-x-auto pb-1" role="list">
          {all.map((img, i) => (
            <li key={img.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={clsx(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition",
                  i === active
                    ? "border-[var(--sf-color-accent)]"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
                aria-label={`Show image ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
