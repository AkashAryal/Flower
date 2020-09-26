import React, { ReactElement, useState } from 'react';

import Link from 'next/link';

import firebase from '../fbConfig';
import useProfileFromFirestore from '../hooks/profile';
import { useUser } from '../hooks/user';
import styles from './profile.module.css';

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
          <label htmlFor="fname">Class Year</label>
          <br />
          <input type="text" value={classYear} onChange={(e) => setClassYear(e.target.value)} />
          <br />

          <label htmlFor="lname">Birthday</label>
          <br />
          <input type="text" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          <br />

          <label htmlFor="lname">Major</label>
          <br />
          <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />
          <br />

          <label htmlFor="lname">Self Introduciton</label>
          <br />
          <textarea
            value={selfIntroduction}
            onChange={(e) => setSelfIntroduction(e.target.value)}
          />
          <br />

          <label htmlFor="subject">Interests (comma separated)</label>
          <br />
          <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} />
          <br />

          <label htmlFor="subject">Skills (comma separated)</label>
          <br />
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
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
