import React, { ReactElement, useState } from 'react';

import LoadingRing from '../components/LoadingRing';
import firebase from '../fbConfig';
import { useUser } from '../hooks/user';
import { useProfileFromFirestore } from '../hooks/user-data';

const ProfileEditor = ({ profile }: { readonly profile: AppProfile }): ReactElement => {
  const { displayName, email, profilePicture } = useUser();

  const [classYear, setClassYear] = useState(profile.classYear);
  const [birthday, setBirthday] = useState(profile.birthday);
  const [major, setMajor] = useState(profile.major);
  const [selfIntroduction, setSelfIntroduction] = useState(profile.selfIntroduction);
  const [interests, setInterests] = useState(profile.interests.join(','));
  const [skills, setSkills] = useState(profile.skills.join(','));

  // Disable submit if some fields are empty.
  const submitShouldBeDisabled = [classYear, birthday, major, selfIntroduction, interests, skills]
    .map((it) => it.trim())
    .some((it) => it.length === 0);

  const handleSubmit = () => {
    const appProfile: AppProfile = {
      displayName,
      classYear,
      birthday,
      major,
      selfIntroduction,
      interests: interests.split(',').map((it) => it.trim()),
      skills: skills.split(',').map((it) => it.trim()),
    };
    firebase
      .firestore()
      .collection('profiles')
      .doc(email)
      .set(appProfile)
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('You have successfully updated your profile.');
      });
  };

  return (
    <div>
      <div className="card centered-card">
        <div className="card__header">
          <div className="avatar">
            <img className="avatar__photo" src={profilePicture} alt="Profile" />
            <div className="avatar__intro">
              <h2 className="avatar__name">{`${displayName}'s Profile`}</h2>
            </div>
          </div>
        </div>
        <div className="card__body">
          <div className="input-row">
            <label htmlFor="profile-class-year-input">Class Year</label>
            <input
              id="profile-class-year-input"
              type="text"
              value={classYear}
              onChange={(e) => setClassYear(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="profile-birthday-input">Birthday</label>
            <input
              id="profile-birthday-input"
              type="text"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="profile-major-input">Major</label>
            <input
              id="profile-major-input"
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="profile-interest-input">Interests (comma separated)</label>
            <input
              id="profile-interest-input"
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="profile-skills-input">Skills (comma separated)</label>
            <input
              id="profile-skills-input"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label htmlFor="profile-self-intro-input">Self Introduciton</label>
            <textarea
              id="profile-self-intro-input"
              value={selfIntroduction}
              onChange={(e) => setSelfIntroduction(e.target.value)}
            />
          </div>
        </div>

        <div className="card__footer">
          <button
            className="button button--primary button--block"
            disabled={submitShouldBeDisabled}
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = (): ReactElement => {
  const profile = useProfileFromFirestore();

  if (profile == null) return <LoadingRing />;
  return <ProfileEditor profile={profile} />;
};

export default ProfilePage;
