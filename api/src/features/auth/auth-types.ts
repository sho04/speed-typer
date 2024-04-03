
interface loginRequest {
    email: string;
    username?: string;
    password: string;
}   

interface loginResponse {
    user: {
        _id: string;
        email: string;
        username: string;

        auth: {
            salt: string;
            password: string;
            token: string;
        }
    }
}