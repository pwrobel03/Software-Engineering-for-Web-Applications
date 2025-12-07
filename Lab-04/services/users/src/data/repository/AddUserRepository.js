import bcrypt from "bcrypt"; // Importujemy bibliotekę bcrypt do hash'owania haseł
import User from "../models/User.js";

export function AddUserRepository(Base) {
    return class extends Base {
        getUsers() {
            // User jest już zainicjowany w models/User.js, więc możemy go używać
            return User.findAll({
                limit: this.defaultLimit,
            });
        }

        async getUserByEmail(email) {
            return User.findOne({ where: { email } });
        }

        // Pobranie po ID
        async getUserById(id) {
            return User.findByPk(id);
        }

        async createUser(userAttributes) {
            const { email, password } = userAttributes;
            const hashedPassword = await bcrypt.hash(password, 10);

            // 2. Tworzymy użytkownika z zahaszowanym hasłem
            return User.create({
                email,
                password: hashedPassword,
            });
        }

        //TODO: implement updateUser and deleteUser methods
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
