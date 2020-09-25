import React, { ReactElement } from 'react';

import PrivateComponent from '../hoc/PrivateComponent';

const HomePage = (): ReactElement => {
  return (
    <PrivateComponent>
      <div>Home Page</div>
    </PrivateComponent>
  );
};

export default HomePage;
