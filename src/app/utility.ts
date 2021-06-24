export class Utility {
    saveToken(token: string) : void {
        localStorage.setItem("token", token);
    }

    getToken(key: string) : string | null{
        return localStorage.getItem(key);
    }
}