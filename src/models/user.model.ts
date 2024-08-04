import { model, Schema } from 'mongoose';

export interface IUser {
  name: string
  about: string
  avatar: string
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    min: 2,
    max: 30,
    required: true,
  },
  about: {
    type: String,
    min: 2,
    max: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default model<IUser>('user', userSchema);
