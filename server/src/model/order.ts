import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    owner: mongoose.Schema.Types.ObjectId; // Siparişi yöneten kullanıcı (Admin/Bayi/Mağaza)
    customerName: string; // Sipariş veren müşteri adı
    customerPhone: string; // Sipariş veren müşteri telefon numarası
    items: { name: string; quantity: number; price: number }[];
    total: number;
    status: "Beklemede" | "Hazırlanıyor" | "Kargoya Verildi" | "Teslim Edildi" | "İptal Edildi";
    date: Date;
}

const OrderSchema = new Schema<IOrder>({
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Kullanıcı ile ilişkilendirme
    customerName: { type: String, required: true }, // Müşteri adı
    customerPhone: { type: String, required: true }, // Müşteri telefon numarası
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
