import { PaginationParams } from '../../middleware/pagination.middleware';
import { IUser, UserModel } from '../../models/user/user.model';

const checkUserExists = async (email: string): Promise<boolean> => {
    const existingUser = await UserModel.findOne({ email }).exec();
    return !!existingUser;
};

const getAllUsers = async (pagination: PaginationParams): Promise<IUser[]> => {
    const { page, limit } = pagination;
    const skipCount = (page - 1) * limit;

    const users = await UserModel.find().skip(skipCount).limit(limit).exec();
    return users;
};

const getUserById = async (userId: string): Promise<IUser | null> => {
    return UserModel.findById(userId).exec();
};

const createUser = async (user: IUser): Promise<IUser> => {
    return UserModel.create(user);
};

const updateUser = async (
    userId: string,
    updatedUser: IUser
): Promise<IUser | null> => {
    return UserModel.findByIdAndUpdate(userId, updatedUser, {
        new: true
    }).exec();
};

const deleteUser = async (userId: string): Promise<IUser | null> => {
    return UserModel.findByIdAndDelete(userId).exec();
};

export default {
    checkUserExists,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
