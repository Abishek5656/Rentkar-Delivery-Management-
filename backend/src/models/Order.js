import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    deliveryAddress: {
      type: String,
      required: [true, 'Delivery address is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'picked', 'delivered'],
      default: 'pending',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // assigned only to partners
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
