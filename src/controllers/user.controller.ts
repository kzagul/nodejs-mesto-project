import { Request, Response, NextFunction } from 'express';
import { UpdateQuery } from 'mongoose';
import User, { IUser } from '../models/user.model';
import { NotFoundError, BadRequestError, statusCodes } from '../errors';

class UserController {
  static get(req: Request, res: Response, next: NextFunction) {
    User.find({})
      .then((data) => res.json({ data }))
      .catch(next);
  }

  static getById(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    User.findById(userId)
      .orFail(() => {
        throw new NotFoundError('Передан некорректный _id пользователя.');
      })
      .then((data) => res.json({ data }))
      .catch(next);
  }

  static post(req: Request, res: Response, next: NextFunction) {
    const { name, about, avatar }: IUser = req.body;
    User.create({ name, about, avatar })
      .then((user) => res.send(user))
      .catch((error) => {
        if (error.statusCode === statusCodes.BadRequest) {
          return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
        }
        return next;
      });
  }

  static update(update: UpdateQuery<IUser>, req: Request, res: Response, next: NextFunction) {
    // @ts-expect-error
    const userId = req.user._id;
    User.findByIdAndUpdate(userId, update, { new: true, runValidators: true })
      .orFail(() => new NotFoundError('Пользователь с указанным _id не найден'))
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.statusCode === statusCodes.BadRequest) {
          return next(new BadRequestError('Переданы некорректные данные при обновлении пользователя.'));
        }
        return next;
      });
  }

  static updateMe(req: Request, res: Response, next: NextFunction) {
    const { name, about }: Omit<IUser, 'avatar'> = req.body;
    UserController.update({ name, about }, req, res, next);
  }

  static updateMeAvatar(req: Request, res: Response, next: NextFunction) {
    const { avatar }: Pick<IUser, 'avatar'> = req.body;
    UserController.update({ avatar }, req, res, next);
  }
}

export default UserController;
