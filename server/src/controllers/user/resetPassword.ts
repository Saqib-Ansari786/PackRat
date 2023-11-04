import { publicProcedure } from '../../trpc';
import User from '../../models/userModel';
import * as validator from '../../middleware/validators/index';

import { validateResetToken } from '../../utils/prismaHelpers/user';
import {prisma} from "../../prisma/index"
/**
 * Resets the user's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A promise that resolves when the password is successfully reset.
 */
export const resetPassword = async (req, res) => {
  const { resetToken, password } = req.body;

  const user = await validateResetToken(resetToken);

  await prisma.user.update({
    where:{id:user.id},
        data:{
        password:password
        },}
        )
  res.status(200).send({
    message: 'Successfully reset password',
    status: 'success',
    statusCode: 200,
  });
};

export function resetPasswordRoute() {
  return publicProcedure
    .input(validator.resetPassword)
    .mutation(async (opts) => {
      const { resetToken, password } = opts.input;
      const user = await validateResetToken(resetToken);
      await prisma.user.update({
        where:{id:user.id},
            data:{
            password:password
            },}
            )
      return 'Successfully reset password';
    });
}