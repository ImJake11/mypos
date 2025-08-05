import { UserModel } from "@/app/lib/models/UserModel";
import { redirect } from "next/navigation";


export class AuthServices {

    private userCredentials: UserModel;

    constructor({ credential }: { credential: UserModel }) {
        this.userCredentials = credential;
    }


    async signUpWithEmail(
        {
            onSuccess,
            onError,
            onLoading,
        }: {
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

            const res = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    username,
                    password,
                })
            });

            if (!res.ok) {
                const { error } = await res.json();
                if (onError) onError(error);
                throw new Error("Failed to Sign Up");
            }

            if (onSuccess) onSuccess("Account created successfully");

        } catch (e: any) {
            throw new Error("Failed Sign Up");
        } finally {
            onLoading(false);
        }
    }

    public async signInWithEmail({
        onError,
        onLoading,
        onSuccess,
    }: {
        onLoading: (isLoading: boolean) => void,
        onError?: (message: string) => void,
        onSuccess?: () => void,
    }) {

        try {

            const { email, password } = this.userCredentials;

            if (!email || !password) {
                if (onError) onError("Please fill the required fields");
                return;
            }

            onLoading(true);

            const res = await fetch("/api/auth", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email, password,
                })
            });

            const data = await res.json();

            if (!res.ok) {
                const { error } = data;
                onLoading(false)
                if (onError) onError(error);
                return;
            }

            if (onSuccess) onSuccess();
        } catch (e) {
            onLoading(false)
            throw new Error("Failed to sign up");
        }
    }
}


