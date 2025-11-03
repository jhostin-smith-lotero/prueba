
type anchorPx = {x : number, y: number, h: number, w: number}

export type CatMeta = {hat: anchorPx, acc: anchorPx}
const CAT_META: Record<string, CatMeta> = {
  "/cats/defaultCat.png": {hat:{x: 0, y: 0, h:0, w:0}, acc:{x: 0, y: 0, h:0, w:0}},
  "/cats/tomatoCat.png": {hat:{x: 0, y: 0, h:0, w:0}, acc:{x: 0, y: 0, h:0, w:0}},
  "/cats/tabbyCat.png": {hat:{x: 0, y: 0, h:0, w:0}, acc:{x: 0, y: 0, h:0, w:0}},
  "/cats/orangeTabbyCat.png": {hat:{x: 0, y: 0, h:0, w:0}, acc:{x: 0, y: 0, h:0, w:0}},
};

export function resolveAnchor(sprite: string): CatMeta {
  return CAT_META[sprite] ?? CAT_META["/cats/defaultCat.png"];
}