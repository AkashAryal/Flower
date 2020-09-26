/**
 * Type definitions for the app that can be used without import.
 * Please reserve it only for model type definition, and prefix every type with App.
 * For all types that are coming from database with an non-email id, you should create two versions
 * of it: one with ID and one without ID.
 */

/** A simplified user object with information extracted from firebase auth. */
type AppUser = {
  readonly displayName: string;
  readonly email: string;
  readonly profilePicture: string;
};

/** A study object with full information from firestore. */
type AppStudy = {
  readonly id: string;
  readonly owner: string;
  readonly projectName: string;
  readonly duration: string;
  readonly rewards: string;
  readonly avaliableTimes: readonly string[];
  readonly description: string;
  readonly eligibility: string;
};

type AppStudyWithoutID = Omit<AppStudy, 'id'>;
type AppStudyWithoutIDOwner = Omit<AppStudyWithoutID, 'owner'>;

type AppStudyWithOccupiedTimes = AppStudy & {
  readonly occupiedTimes: readonly string[];
};

/** A profile object with full information from firestore. */
type AppProfile = {
  readonly displayName: string;
  readonly classYear: string;
  readonly birthday: string;
  readonly major: string;
  readonly selfIntroduction: string;
  readonly interests: readonly string[];
  readonly skills: readonly string[];
};
