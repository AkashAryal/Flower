import React, { ReactElement, useState } from 'react';

import Link from 'next/link';

import firebase from '../fbConfig';
import { useUser } from '../hooks/user';

const ProfilePage = (): ReactElement => {
  const { displayName, email, profilePicture } = useUser();

  const [classYear, setClassYear] = useState('');
  const [birthday, setBirthday] = useState('');
  const [major, setMajor] = useState('');
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');

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
        setClassYear('');
        setBirthday('');
        setMajor('');
        setSelfIntroduction('');
        setInterests('');
        setSkills('');
      });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My Profile</h1>
      <img src={profilePicture} alt="profile" />
      <br />
      {
        <div>
          Hello {displayName} <br />
          <br />
        </div>
      }
      {options.map((o) => (
        <div key={o.link}>
          <Link href={o.link}>{o.name}</Link>
          <br />
          <br />
        </div>
      ))}
      <br />
      <label htmlFor="fname">Class Year</label>
      <br />
      <input type="text" onChange={(e) => setClassYear(e.target.value)} />
      <br />

      <label htmlFor="lname">Birthday</label>
      <br />
      <input type="text" onChange={(e) => setBirthday(e.target.value)} />
      <br />

      <label htmlFor="lname">Major</label>
      <br />
      <input type="text" onChange={(e) => setMajor(e.target.value)} />
      <br />

      <label htmlFor="lname">Self Introduciton</label>
      <br />
      <textarea onChange={(e) => setSelfIntroduction(e.target.value)} />
      <br />

      <label htmlFor="subject">Interests (comma separated)</label>
      <br />
      <input type="text" onChange={(e) => setInterests(e.target.value)} />
      <br />

      <label htmlFor="subject">Skills (comma separated)</label>
      <br />
      <input type="text" onChange={(e) => setSkills(e.target.value)} />
      <br />

      <input
        type="submit"
        value="Update"
        disabled={submitShouldBeDisabled}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default ProfilePage;
