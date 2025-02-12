import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    customer: string;
    phone: string;
    items: { name: string; quantity: number; price: number }[];
    total: number;
    status: "Beklemede" | "Hazırlanıyor" | "Kargoya Verildi" | "Teslim Edildi" | "İptal Edildi";
    date: Date;
}

const OrderSchema = new Schema<IOrder>({
    customer: { type: String, required: true },
    phone: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: ["Beklemede", "Hazırlanıyor", "Kargoya Verildi", "Teslim Edildi", "İptal Edildi"], default: "Beklemede" },
    date: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>("Order", OrderSchema);
