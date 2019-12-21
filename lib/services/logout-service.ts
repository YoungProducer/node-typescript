
// Import prisma
import { prisma, BatchPayload } from '../../prisma/generated/prisma-client';

import { LogoutService } from '../types/services';

export class UserLogoutService implements LogoutService {
    async logout(loginId: string): Promise<boolean> {
        try {
            await prisma.deleteManyTokens({ loginId });

            return true;
        } catch (error) {
            throw error;
        }
    }

    async logoutAll(userId: string): Promise<boolean> {
        try {
            await prisma.deleteManyTokens({ user: { id: userId } });

            return true;
        } catch (error) {
            throw error;
        }
    }
}

export const userLogoutService =  new UserLogoutService();
