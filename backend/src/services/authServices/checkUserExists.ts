import { Op } from "sequelize";
import User from "../../models/user";

const checkUserExists = async (value: string): Promise<boolean> => {
  const userExists = await User.findOne({
    where: {
      [Op.or]: [
        { username: value },
        { email: value },
        { phone: value },
      ],
    },
  });
  if (userExists !== null) {
    return true;
  }
  return false;
};
export default checkUserExists;
