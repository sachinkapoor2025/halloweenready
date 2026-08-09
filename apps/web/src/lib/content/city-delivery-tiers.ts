/**
 * Secondary city metadata for optional city landing templates.
 * HalloweenReady does not use /send-rakhi-to-* routes.
 */

export type SecondaryCity = {
  slug: string;
  name: string;
  state: string;
  nearbyMetroSlug: string;
  nearbyMetroLabel: string;
};

export const secondaryCities: SecondaryCity[] = [];

export function secondaryCityIntro(slug: string, name: string, state: string): string {
  const place = `${name}, ${state}`;
  return `HalloweenReady ships Halloween decorations, costumes, and party supplies to ${place} with fast domestic USA delivery.`;
}
