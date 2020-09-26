import { useState, useEffect } from 'react';

import firebase from '../fbConfig';
import { useUser } from './user';

const useProfileFromFirestore = (): AppProfile | null => {
  const { displayName, email } = useUser();
  const [profile, setProfile] = useState<AppProfile | null>(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('profiles')
      .doc(email)
      .onSnapshot((snapshot) =>
        setProfile(
          snapshot.exists
            ? (snapshot.data() as AppProfile)
            : {
                displayName,
                classYear: '',
                birthday: '',
                major: '',
                selfIntroduction: '',
                interests: [],
                skills: [],
              }
        )
      );
  }, [displayName, email]);

  return profile;
};

export default useProfileFromFirestore;
