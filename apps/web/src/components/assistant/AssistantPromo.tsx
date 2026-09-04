"use client";

import { openShoppingAssistant } from "@/components/assistant/ShoppingAssistant";

export function AssistantPromo({
  variant,
  productName,
}: {
  variant: "home" | "category" | "product" | "cart";
  productName?: string;
}) {
  const copy =
    variant === "home"
      ? { title: "Not sure what to choose?", body: "Ask our Halloween assistant.", prompt: undefined }
      : variant === "category"
        ? { title: "Looking for the right Halloween style?", body: "Ask our assistant.", prompt: "Help me narrow this collection" }
        : variant === "product"
          ? {
              title: "Not sure if this is right for you?",
              body: "Ask our Halloween assistant.",
              prompt: productName ? `Looking at ${productName}` : "Help me with this product",
            }
          : { title: "Need a matching item?", body: "Ask our assistant.", prompt: "Suggest something that matches my cart" };

  return (
    <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-violet-50 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-slate-700">
        <span className="mr-1" aria-hidden>
          🎃
        </span>
        <span className="font-semibold">{copy.title}</span> {copy.body}
      </p>
      <button
        type="button"
        onClick={() => openShoppingAssistant(copy.prompt)}
        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
      >
        Help me find something
      </button>
    </div>
  );
}
