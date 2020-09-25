import React, { ReactElement } from 'react';

import Link from 'next/link';

import { useUser } from '../hooks/user';

const Profile = (): ReactElement => {
  const user = useUser();

  const options: { name: string; link: string }[] = [
    { name: 'Scheduled Studies', link: '/scheduled-studies' },
    { name: 'My studies', link: '/my-studies' },
    { name: 'My Profile', link: '/about-me' },
    { name: 'IRB Eligibility', link: '/irb-eligibility' },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My Profile</h1>
      <img src={user.profilePicture} alt="profile" />
      <br />
      {
        <div>
          Hello {user.displayName} <br />
          <br />
        </div>
      }
      {options.map((o) => {
        return (
          <div key={o.link}>
            <Link href={o.link}>{o.name}</Link>
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
