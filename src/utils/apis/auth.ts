import axios from "axios";
import { LoginSchema, LoginType } from "../schema/login";

class AuthService {

    /**
     *Sign up user
     * @returns
     */
    async signup(data: LoginType) {
        // const res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         title: "foo",
        //         body: "bar",
        //         userId: 1,
        //     }),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //     },
        // });
        console.log("::::::: in post data", data);
        
        return true;
    }
}
const authService = new AuthService()
export default authService;