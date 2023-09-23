import axios from "axios";
import { LoginSchema, LoginType } from "../schema/login";
import { config } from "../config";

class AuthService {
    /**
     *Sign up user
     * @returns
     */
    async signup(data: LoginType) {
        try {
            const res =  await axios.post(
                `${config.BASE_URL}/auth/registers`,
                data
            );

            return res.data
        } catch (error) {
            throw error
        }
    }

    async login(data: LoginType) {
        try {
            const res =  await axios.post(
                `${config.BASE_URL}/auth/login`,
                data
            );

            return res.data
        } catch (error) {
            throw error
        }
    }
}
const authService = new AuthService();
export default authService;
