import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from '../interfaces';



const orderSchema = new Schema({

    // name: { type: String, required: true },

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems : [{
        _id      : { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title    : { type: String, required: true },
        size     : { type: String, required: true },
        quantity : { type: Number, required: true },
        slug     : { type: String, required: true },
        image    : { type: String, required: true },
        price    : { type: Number, required: true },
    }],
    shippingAddress: {
        firstName : { type: Schema.Types.ObjectId, required: true }, 
        lastName  : { type: Schema.Types.ObjectId, required: true }, 
        address   : { type: Schema.Types.ObjectId, required: true }, 
        address2  : { type: Schema.Types.ObjectId }, 
        zip       : { type: Schema.Types.ObjectId, required: true }, 
        city      : { type: Schema.Types.ObjectId, required: true }, 
        country   : { type: Schema.Types.ObjectId, required: true }, 
        phone     : { type: Schema.Types.ObjectId, required: true }, 
    },

    numberOfItems : { type: Number, required: true },
    subTotal      : { type: Number, required: true },
    tax           : { type: Number, required: true },
    total         : { type: Number, required: true },

    isPaid        : { type: Boolean, required: true, default: false },
    paidAt        : { type: String },

    

}, {
    timestamps: true,
})

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;