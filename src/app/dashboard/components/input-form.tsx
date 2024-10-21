"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectCodeCombobox } from "./combobox";
import { addNewPaymentEntry } from "../actions";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

type Amount = {
  value: number;
  formatted: string;
};

const formatCurrency = (value: string) => {
  const formattedValue = value
    .replace(/\D/g, "") // Remove non-digit characters
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add thousands separator
  return "Rp " + formattedValue; // Add "Rp" as a prefix
};

const parseCurrency = (value: string) => {
  const numericValue = value
    .replace(/Rp\s?|,/g, "") // Remove "Rp" prefix and commas
    .trim(); // Trim any whitespace
  return Number(numericValue); // Convert to number
};

const validateFields = (
  amount: Amount,
  projectCode: string,
  category: string
) => {
  if (amount.value <= 0) {
    return "Biaya harus lebih dari 0.";
  }
  if (!projectCode) {
    return "Kode Project harus diisi.";
  }
  if (!category) {
    return "Kategori harus dipilih.";
  }
  return "";
};

export default function PaymentForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState<Amount>({ value: 0, formatted: "Rp " });
  const [projectCode, setProjectCode] = useState<string>("");
  const [category, setCategory] = useState<"debit" | "credit" | "saldo">(
    "debit"
  );
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Validate required fields
    const validationError = validateFields(amount, projectCode, category);
    if (validationError) {
      toast.error(validationError); // Show error toast
      setIsSubmitting(false);
      return; // Exit if validation fails
    }

    try {
      await addNewPaymentEntry({
        amount: amount.value.toString(),
        projectCode,
        category,
        description,
      });
      toast.success("Payment submitted successfully!");

      // Reset the state of the form fields
      setAmount({ value: 0, formatted: "Rp " });
      setProjectCode("");
      setCategory("debit"); // Reset to the default category
      setDescription("");

      formRef.current?.reset(); // Optional for uncontrolled inputs
    } catch (error) {
      toast.error("Error submitting payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl mx-auto p-6 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Kode Project</Label>
            <ProjectCodeCombobox setProjectCode={setProjectCode} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Biaya (dalam rupiah)</Label>
            <Input
              id="amount"
              type="text"
              value={amount.formatted}
              onChange={(e) =>
                setAmount({
                  value: parseCurrency(e.target.value),
                  formatted: formatCurrency(e.target.value),
                })
              }
              placeholder="Masukkan biaya"
              required // Make this field required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select
              value={category}
              onValueChange={(value: "debit" | "credit" | "saldo") =>
                setCategory(value)
              }
              required // Make this field required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="saldo">Saldo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-full">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi biaya"
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Payment"}
        </Button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}
