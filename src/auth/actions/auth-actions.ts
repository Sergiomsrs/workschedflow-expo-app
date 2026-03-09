import { authApi } from "../api/authApi";
import { LoginResponse } from "../interfaces/login.response";
import { MeResponse } from "../interfaces/me.response";


const returnUserToken = (data: LoginResponse) => {

    const { role, token } = data;

    return {
        role,
        token,
    };
};

export const authLogin = async (dni: string, password: string) => {
    try {
        const { data } = await authApi.post<LoginResponse>('/auth/login', {
            dni, password
        });

        return returnUserToken(data)

    } catch (error) {
        console.log(error)
        throw new Error('User or password not valid')
    }
}

export const getMe = async (token: string) => {
    try {

        const { data } = await authApi.get<MeResponse>(
            '/emp/me',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return data;

    } catch (error) {
        console.log(error);
        throw new Error('Error getting user info');
    }
}