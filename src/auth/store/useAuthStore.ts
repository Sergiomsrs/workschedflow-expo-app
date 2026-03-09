import { create } from 'zustand';
import { authLogin, getMe } from "../actions/auth-actions";
import { MeResponse } from "../interfaces/me.response";
import { SecureStorageAdapter } from '../helpers/secure-storage.adapter';


export type AuthStatus = 'authenticated' | 'unAuthenticatd' | 'checking';


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: MeResponse;

    login: (dni: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<boolean>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({

    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (dni: string, password: string) => {

        const resp = await authLogin(dni, password);
        await SecureStorageAdapter.setItem('token', resp.token);

        if (!resp) {
            set({ status: 'unAuthenticatd', token: undefined, user: undefined })
            return false
        }


        const { id, name, lastName, role, secondLastName } = await getMe()


        set({ status: 'authenticated', token: resp.token, user: { id, name, lastName, role, secondLastName } })

        console.log(resp.token)
        console.log(name)

        return true;
    },

    checkStatus: async () => {

        const { token } = get(); // 👈 obtienes el token del estado

        if (!token) {
            set({ status: 'unAuthenticatd', user: undefined });
            return false;
        }

        try {
            const user = await getMe();
            set({ status: 'authenticated', user });
            return true;
        } catch (error) {
            set({ status: 'unAuthenticatd', user: undefined, token: undefined });
            await SecureStorageAdapter.deleteItem('token');
            return false;
        }
    },

    logout: async () => {
        set({ status: 'unAuthenticatd', token: undefined, user: undefined })
        await SecureStorageAdapter.deleteItem('token');
    },
}))