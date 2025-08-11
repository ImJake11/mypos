import ToasEnum from "@/app/lib/enum/toastEnum";
import { UserModel } from "@/app/lib/models/UserModel";
import { toggleProcessDialog, updateProcessDialogCurrentValue, updaterPocessDialogMessage } from "@/app/lib/redux/slice/processSlice";
import { openToas } from "@/app/lib/redux/slice/toastSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect } from "next/navigation";
import { AppDispatch } from "recharts/types/state/store";


export class AuthServices {

    private userCredentials?: UserModel;

    constructor({ credential }: { credential?: UserModel }) {

        if (credential) {
            this.userCredentials = credential;
        }

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

        if (!this.userCredentials) return;

        const { confirmPassword, isAgree, email, password, username } = this.userCredentials;

        if (!email || confirmPassword?.trim() !== password?.trim() || !isAgree || !username) {
            return;
        }


        onLoading(true);
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

            const data = await res.json();

            if (!res.ok) {
                const { error } = data;
                if (onError) onError(error);
                throw new Error("Failed to Sign Up");
            }

            const { role } = data;
            localStorage.setItem("role", role);
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
        router,
    }: {
        onLoading: (isLoading: boolean) => void,
        onError?: (message: string) => void,
        onSuccess?: () => void,
        router: AppRouterInstance,
    }) {

        try {
            if (!this.userCredentials) return;

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

            if (!res.ok) {
                const {
                    error,
                    redirect
                } = await res.json();

                if (res.status === 401) {
                    window.location.href = redirect;
                    return;
                }

                onLoading(false)
                if (onError) onError(error);
                return;
            }

            const { role } = await res.json();
            localStorage.setItem("role", role);
            if (onSuccess) onSuccess();

        } catch (e) {
            onLoading(false);
            if (onError) onError("Failed to sign up");
            throw new Error("Failed to sign up");
        }
    }

    public async signout(
        { dispatch }:
            { dispatch: AppDispatch }) {
        try {

            dispatch(toggleProcessDialog(true))
            dispatch(updaterPocessDialogMessage("Signing out"));
            dispatch(updateProcessDialogCurrentValue(25))
            const res = await fetch("/api/auth/logout", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!res.ok) {
                dispatch(openToas({
                    message: "Failed to signout",
                    type: ToasEnum.ERROR,
                }));
                return;
            }

            const { redirect } = await res.json();

            dispatch(updateProcessDialogCurrentValue(90))
            setTimeout(() => {
                dispatch(updateProcessDialogCurrentValue(100))
                window.location.href = redirect;
            }, 2000);

        } catch (e) {
            console.log(e);
        }
    }
}


