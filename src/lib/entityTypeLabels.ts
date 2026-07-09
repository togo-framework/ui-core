/**
 * entityTypeLabels — bilingual entity-type label lookup.
 *
 * Ported from app/src/lib/entityTypeLabels.ts. Pure: takes a type key + the
 * UI language and returns the localised display label, falling back to the raw
 * type when no translation exists (Rule 8). No context, no fetch (Rule 25).
 */

const ENTITY_TYPE_LABELS: Record<string, { en: string; ar: string }> = {
  state: { en: 'State', ar: 'دولة' },
  government: { en: 'Government', ar: 'حكومة' },
  organization: { en: 'Organization', ar: 'منظمة' },
  institution: { en: 'Institution', ar: 'مؤسسة' },
  individual: { en: 'Individual', ar: 'فرد' },
  person: { en: 'Person', ar: 'شخص' },
  location: { en: 'Location', ar: 'موقع' },
  media: { en: 'Media', ar: 'إعلام' },
  company: { en: 'Company', ar: 'شركة' },
  corporation: { en: 'Corporation', ar: 'شركة' },
  legislation: { en: 'Legislation', ar: 'تشريع' },
  'military-coalition': { en: 'Military Coalition', ar: 'تحالف عسكري' },
  'non-state-actor': { en: 'Non-State Actor', ar: 'جهة غير حكومية' },
  'individual-group': { en: 'Group', ar: 'مجموعة' },
}

/**
 * Returns the translated label for an entity type.
 * Falls back to the raw type string if no translation exists.
 */
export function getEntityTypeLabel(type: string, language: string): string {
  return ENTITY_TYPE_LABELS[type]?.[language === 'ar' ? 'ar' : 'en'] || type
}
