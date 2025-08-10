


export function validateEmail(email?: string): string | undefined {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email!.trim()) {
        return "Email is required";

    } else if (!emailRegex.test(email!)) {
        return "Please enter a valid email address (e.g., user@example.com)";
    } else {
        return undefined;
    }
}