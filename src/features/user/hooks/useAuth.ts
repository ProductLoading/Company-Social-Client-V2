// src/features/user/hooks/useAuth.ts
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useLoginMutation, useRegisterMutation, useMeQuery } from '@/features/user/api/userApi';
import { setCredentials, clearCredentials, setUserInfo } from '@/features/user/slices/userSlices';

export function useAuth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  // RTK Query hook’ları
  const [loginMutation, loginResult] = useLoginMutation();
  const [registerMutation, registerResult] = useRegisterMutation();
  const { data: meData, isLoading: meLoading, refetch: refetchMe } = useMeQuery(undefined, {
    skip: !token, // token yoksa me sorgusunu atla
  });

  /** LOGIN */
  const login = useCallback(
    async (email: string, password: string) => {
      const { login: accessToken } = await loginMutation({ email, password }).unwrap();
      dispatch(setCredentials({ token: accessToken }));
      // Kullanıcı bilgisi çek
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
    async (input: any) => {
      const { register: accessToken } = await registerMutation(input).unwrap();
      dispatch(setCredentials({ token: accessToken }));
      // Kullanıcı bilgisi çek
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
  }, [dispatch]);

  return {
    token,
    user: meData,
    isAuthLoading: meLoading || loginResult.isLoading || registerResult.isLoading,
    login,
    register,
    logout,
  };
}
