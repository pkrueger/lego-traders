import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, default: "https://www.clonebricks.com/wp-content/uploads/2017/03/01-lego-classic-town-minifigure.jpeg" },
    desc: { type: String, maxlength: 1000 },
    userTheme: { type: String }
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

