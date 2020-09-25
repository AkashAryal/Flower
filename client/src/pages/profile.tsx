import React, { ReactElement } from "react";

import Link from 'next/link';

const Profile = (): ReactElement => {
  const options: { name: string, link: string }[] = [
    { name: "Scheduled Studies", link: "/scheduled-studies" },
    { name: "My studies", link: "/my-studies" },
    { name: "My Profile", link: "/my-profile" },
    { name: "IRB Eligibility", link: "/irb-eligibility" }
  ]

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My Profile</h1>
      <img src="https://i.stack.imgur.com/34AD2.jpg" alt="profile" />
      <br />

      {
        options.map(o => {
          return (
            <div key={o.link}>
              <Link href={o.link} >
                {o.name}
              </Link>
              <br />
              <br />
            </div>
          );
        })
      }
    </div>
  )
}

export default Profile;
