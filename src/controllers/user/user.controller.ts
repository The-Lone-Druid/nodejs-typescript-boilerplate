import { Request, Response } from 'express';
import { UserServices } from '../../services';
import bcrypt from 'bcrypt';

const getAllUsersController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { page, limit } = req.pagination;
        const users = await UserServices.getAllUsers({ page, limit });
        const usersWithoutPassword = users.map((user) => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });

        res.json(usersWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await UserServices.getUserById(id);
        if (user) {
            const { password, ...userWithoutPassword } = user.toObject();
            res.json(userWithoutPassword);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (await UserServices.checkUserExists(req.body.email)) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const newUser = req.body;
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        newUser.password = hashedPassword;

        const user = await UserServices.createUser(newUser);
        const { password, ...userWithoutPassword } = user.toObject();

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const user = await UserServices.updateUser(id, updatedUser);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await UserServices.deleteUser(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default {
    getAllUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController
};
