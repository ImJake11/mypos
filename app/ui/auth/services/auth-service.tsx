import { UserModel } from "@/app/lib/models/UserModel";
import { createClient } from "@/app/lib/utils/supabase/supabase";
import { AppDispatch } from "recharts/types/state/store";



export class AuthServices {

    private userCredentials: UserModel;

    constructor({ credential }: { credential: UserModel }) {
        this.userCredentials = credential;
    }


    async signInWithEmail(
        {
            dispatch,
            onSuccess,
            onError,
            onLoading,
        }: {
            dispatch: AppDispatch,
            onLoading: (isLoading: boolean) => void,
            onSuccess?: (message: string) => void,
            onError?: (message: string) => void,
        }
    ) {

        onLoading(true);
        const { email, password, username } = this.userCredentials;
        try {

            if (!email || !username || !password) {
                if (onError) onError("Some required fields are empty");
                return;
            }

            const res = await fetch(`/api/auth`, {
                method: "POST",
                body: JSON.stringify({
                    email, username, password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                if (onError) onError("Sign up failed");
                return;
            }

            if (onSuccess) onSuccess("User created successfully");
            window.localStorage.setItem("email", email);

        } catch (e) {
            if (onError) onError("Something went wrong")
        } finally {
            onLoading(false);
        }

    }
}