import mongoose from 'mongoose';

import toJson from '@meanie/mongoose-to-json';
mongoose.plugin(toJson);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);
