import { AdminOnlyService } from '../types/services';
import { Role, prisma } from '../../prisma/generated/prisma-client';

class AdminService implements AdminOnlyService {
    async setRootsToUser(userId: string, role: Role): Promise<boolean> {
        try {
            await prisma.updateUser({ data: { role }, where: { id: userId } });

            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default new AdminService();
