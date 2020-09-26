import { useEffect } from 'react';

import { atom, useRecoilState } from 'recoil';

import firebase from '../fbConfig';
import { useUser } from './user';

const profileState = atom<AppProfile | null>({
  key: 'app-profile',
  default: null,
});

const appMyStudiesState = atom<readonly AppStudy[]>({
  key: 'app-my-studies',
  default: [],
});

const appMySchedules = atom<readonly AppSchedule[]>({
  key: 'app-my-schedules',
  default: [],
});

export const useProfileFromFirestore = (): AppProfile | null => useRecoilState(profileState)[0];

export const useMyStudiesFromFirestore = (): readonly AppStudy[] =>
  useRecoilState(appMyStudiesState)[0];

export const useMySchedulesFromFirestore = (): readonly AppSchedule[] =>
  useRecoilState(appMySchedules)[0];

export const useUserDataListeners = (): void => {
  const { displayName, email } = useUser();
  const [, setProfile] = useRecoilState(profileState);
  const [, setMyStudies] = useRecoilState(appMyStudiesState);
  const [, setMySchedules] = useRecoilState(appMySchedules);

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
  }, [displayName, email, setProfile]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('studies')
      .where('owner', '==', email)
      .onSnapshot((snapshot) =>
        setMyStudies(snapshot.docs.map((it) => ({ ...it.data(), id: it.id } as AppStudy)))
      );
  }, [email, setMyStudies]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('schedules')
      .where('owner', '==', email)
      .onSnapshot((snapshot) =>
        setMySchedules(snapshot.docs.map((it) => ({ ...it.data(), id: it.id } as AppSchedule)))
      );
  }, [email, setMySchedules]);
};
