import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loginUser, logout, registerUser } from './userSlice';

export const useUserAuth = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.user);

    const handleLogin = (email: string, password: string) => {
        return dispatch(loginUser({ email, password }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleRegister = (userData: any) => {
        return dispatch(registerUser(userData));
    };

    return {
        token,
        handleLogin,
        handleLogout,
        handleRegister,
    };
};
