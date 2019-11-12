export declare const securityId: unique symbol;

export interface Principal {
    [securityId]: string;
    [attribute: string]: any;
}

export interface UserProfile extends Principal {
    email?: string;
    name?: string;
}

export interface TokenService {
    verifyToken(token: string): Promise<UserProfile>;
    generateToken(userProfile: UserProfile): Promise<string>;
}
