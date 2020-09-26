import React, { ReactElement, useState } from 'react';

import Link from 'next/link';

import firebase from '../fbConfig';
import useProfileFromFirestore from '../hooks/profile';
import { useUser } from '../hooks/user';
import styles from './profile.module.css';

const INPUT_CLASSNAME = `text-input ${styles.InputRowInput}`;

const ProfileEditor = ({ profile }: { readonly profile: AppProfile }): ReactElement => {
  const { displayName, email, profilePicture } = useUser();

  const [classYear, setClassYear] = useState(profile.classYear);
  const [birthday, setBirthday] = useState(profile.birthday);
  const [major, setMajor] = useState(profile.major);
  const [selfIntroduction, setSelfIntroduction] = useState(profile.selfIntroduction);
  const [interests, setInterests] = useState(profile.interests.join(','));
  const [skills, setSkills] = useState(profile.skills.join(','));

  const options: { name: string; link: string }[] = [
    { name: 'Scheduled Studies', link: '/scheduled-studies' },
    { name: 'My studies', link: '/my-studies' },
    { name: 'My Profile', link: '/about-me' },
    { name: 'IRB Eligibility', link: '/irb-eligibility' },
  ];

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
      {options.map((o) => (
        <div key={o.link}>
          <Link href={o.link}>{o.name}</Link>
          <br />
          <br />
        </div>
      ))}
      <div className={`card ${styles.ProfileCard}`}>
        <div className="card__header">
          <div className="avatar">
            <img className="avatar__photo" src={profilePicture} alt="Profile" />
            <div className="avatar__intro">
              <h4 className="avatar__name">{`${displayName}'s Profile`}</h4>
            </div>
          </div>
        </div>
        <div className="card__body">
          <div className={styles.InputRow}>
            <label htmlFor="profile-class-year-input">Class Year</label>
            <input
              id="profile-class-year-input"
              type="text"
              className={INPUT_CLASSNAME}
              value={classYear}
              onChange={(e) => setClassYear(e.target.value)}
            />
          </div>
          <div className={styles.InputRow}>
            <label htmlFor="profile-birthday-input">Birthday</label>
            <input
              id="profile-birthday-input"
              type="text"
              className={INPUT_CLASSNAME}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className={styles.InputRow}>
            <label htmlFor="profile-major-input">Major</label>
            <input
              id="profile-major-input"
              type="text"
              className={INPUT_CLASSNAME}
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>
          <div className={styles.InputRow}>
            <label htmlFor="profile-interest-input">Interests (comma separated)</label>
            <input
              id="profile-interest-input"
              type="text"
              className={INPUT_CLASSNAME}
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>
          <div className={styles.InputRow}>
            <label htmlFor="profile-skills-input">Skills (comma separated)</label>
            <input
              id="profile-skills-input"
              type="text"
              className={INPUT_CLASSNAME}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className={styles.InputRow}>
            <label htmlFor="profile-self-intro-input">Self Introduciton</label>
            <textarea
              id="profile-self-intro-input"
              value={selfIntroduction}
              className={INPUT_CLASSNAME}
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

  if (profile == null) return <div>Loading...</div>;
  return <ProfileEditor profile={profile} />;
};

export default ProfilePage;
