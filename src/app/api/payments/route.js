import { NextResponse } from "next/server";
import {
  createPayment,
  getAllPayments,
  //   getPaymentById,
  updatePayment,
  deletePayment,
} from "@/data-access/payment";

export async function GET(request) {
  const payments = await getAllPayments();
  return NextResponse.json(payments);
}

export async function POST(request) {
  const paymentData = await request.json();
  try {
    const newPayment = await createPayment(paymentData);
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  const { id, ...paymentData } = await request.json();
  try {
    const updatedPayment = await updatePayment(id, paymentData);
    return NextResponse.json(updatedPayment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  try {
    await deletePayment(id);
    return NextResponse.json({ message: "Payment deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete payment" },
      { status: 400 }
    );
  }
}
