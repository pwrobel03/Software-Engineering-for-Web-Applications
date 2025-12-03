import User from "../models/User.js";

export function AddUserRepository(Base) {
    return class extends Base {
        getUsers() {
            // User jest już zainicjowany w models/User.js, więc możemy go używać
            return User.findAll({
                limit: this.defaultLimit,
            });
        }

        getUser(id) {
            return User.findByPk(id);
        }

        createUser(userAttributes) {
            return User.create(userAttributes);
        }

        async updateUser(id, userAttributes) {
            const userToUpdate = await this.getUser(id);
            if (!userToUpdate) {
                throw new Error("User not found");
            }

            const definedUserAttributes = Object.fromEntries(
                Object.entries(userAttributes).filter(
                    ([, v]) => v !== undefined
                )
            );

            userToUpdate.set(definedUserAttributes);
            await userToUpdate.save();
            return userToUpdate;
        }

        deleteUser(id) {
            return User.destroy({
                where: {
                    id,
                },
            });
        }
    };
}
