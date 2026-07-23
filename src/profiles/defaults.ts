import type { DyslexiaProfile, NamedProfile, ProfileName } from "../shared/types.js";

export const DEFAULT_PROFILES: Record<ProfileName, DyslexiaProfile> = {
  minimal: {
    language: "en",
    preferredChunkSize: "large",
    headingDensity: "low",
    listPreference: "minimal",
    correctionMode: "ask-when-ambiguous",
    acronymExpansion: false,
    ambiguityWarnings: true,
    technicalTokenProtection: true
  },
  balanced: {
    language: "en",
    maxSentenceLength: 24,
    preferredChunkSize: "medium",
    headingDensity: "medium",
    listPreference: "when-useful",
    correctionMode: "ask-when-ambiguous",
    acronymExpansion: true,
    ambiguityWarnings: true,
    technicalTokenProtection: true,
    explicitExpectedResults: true,
    repeatCriticalContext: false
  },
  guided: {
    language: "en",
    maxSentenceLength: 18,
    preferredChunkSize: "small",
    headingDensity: "high",
    listPreference: "frequent",
    correctionMode: "explain",
    acronymExpansion: true,
    ambiguityWarnings: true,
    technicalTokenProtection: true,
    explicitExpectedResults: true,
    repeatCriticalContext: true,
    forcedChoiceWhenRequested: true
  },
  custom: {
    language: "en",
    technicalTokenProtection: true
  }
};

export function getDefaultProfile(name: ProfileName = "balanced"): NamedProfile {
  return {
    name,
    profile: { ...DEFAULT_PROFILES[name] },
    origin: "default"
  };
}
