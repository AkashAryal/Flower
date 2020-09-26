import React, { ReactElement, useEffect, useState } from 'react';

import Study from '../components/Study';
import firebase from '../fbConfig';

const StudiesPage = (): ReactElement => {
  const [trendingStudies, setTrendingStudies] = useState<readonly AppStudy[] | undefined>();
  const [interestedStudies, setInterestedStudies] = useState<readonly AppStudy[] | undefined>();

  useEffect(() => {
    firebase
      .functions()
      .httpsCallable('getTrending')()
      .then((r) => setTrendingStudies(r.data));
    firebase
      .functions()
      .httpsCallable('getInterested')()
      .then((r) => setInterestedStudies(r.data));
  }, []);

  return (
    <div>
      <p style={{ fontWeight: 'bolder' }}>Trending</p>
      <br />
      {trendingStudies ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {trendingStudies.map((study) => {
            return (
              <div key={study.id}>
                <Study study={study} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
      <br />
      <br />
      {interestedStudies ? (
        <div>
          <p style={{ fontWeight: 'bolder' }}>You may be interested in</p>
          <br />
          {interestedStudies.map((study) => {
            return (
              <div key={study.id}>
                <Study study={study} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default StudiesPage;
