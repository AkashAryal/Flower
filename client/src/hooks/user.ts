import { atom, useRecoilState } from 'recoil';

const userState = atom<AppUser | null>({
  key: 'user',
  default: null,
});

export const useSetUser = (): ((user: AppUser) => void) => {
  const [, setUser] = useRecoilState(userState);
  return setUser;
};

export const useUser = (): AppUser => {
  const [user] = useRecoilState(userState);
  if (user == null) throw new Error('PrivateComponent must have some bugs.');
  return user;
};
