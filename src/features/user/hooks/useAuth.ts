// src/features/user/hooks/useAuth.ts
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useLoginMutation, useRegisterMutation, useMeQuery } from '../api/userApi';
import { setCredentials, clearCredentials, setUserInfo } from '../slices/userSlices';
import type { CreateUserInput } from '../types/userTypes';

export function useAuth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  const [loginMutation, loginResult] = useLoginMutation();
  const [registerMutation, registerResult] = useRegisterMutation();
  const {
    data: meData,
    isLoading: meLoading,
    refetch: refetchMe,
  } = useMeQuery(undefined, { skip: !token });

  /** LOGIN */
  const login = useCallback(
    async (email: string, password: string) => {
      const res = await loginMutation({ email, password }).unwrap();
      dispatch(setCredentials({ token: res.login }));
      // Oturum açan kullanıcıyı çek
      const meResp = await refetchMe();
      if (meResp.data) {
        dispatch(
          setUserInfo({
            userId: meResp.data.userId,
            email: meResp.data.email,
            firstName: meResp.data.firstName,
            lastName: meResp.data.lastName,
          })
        );
      }
    },
    [dispatch, loginMutation, refetchMe]
  );

  /** REGISTER */
  const register = useCallback(
    async (input: CreateUserInput) => {
      const res = await registerMutation(input).unwrap();
      dispatch(setCredentials({ token: res.register }));
      // Me bilgisi
      const meResp = await refetchMe();
      if (meResp.data) {
        dispatch(
          setUserInfo({
            userId: meResp.data.userId,
            email: meResp.data.email,
            firstName: meResp.data.firstName,
            lastName: meResp.data.lastName,
          })
        );
      }
    },
    [dispatch, registerMutation, refetchMe]
  );

  /** LOGOUT */
  const logout = useCallback(() => {
    dispatch(clearCredentials());
    // Gerekirse localStorage temizleme vb.
  }, [dispatch]);

  return {
    token,
    user: meData,
    isLoading: meLoading || loginResult.isLoading || registerResult.isLoading,
    login,
    register,
    logout,
  };
}
