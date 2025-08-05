import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";


export async function generateValidationToken(email: string,): Promise<string> {

    const random_strings = Array.from({ length: 5 }, () => uuid()).join("-");

    const _tokenList = [random_strings, email,];

    const _token = _tokenList.join(".");

    const _hashedToken = await bcrypt.hash(_token, 10);

    return _hashedToken;

}