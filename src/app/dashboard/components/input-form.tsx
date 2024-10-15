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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const projectCodes = [
  { value: "PC001", label: "Project Alpha" },
  { value: "PC002", label: "Project Beta" },
  { value: "PC003", label: "Project Gamma" },
  { value: "PC004", label: "Project Delta" },
  { value: "PC005", label: "Project Epsilon" },
];

type Amount = {
  value: number;
  formatted: string;
};

export default function PaymentForm() {
  const [amount, setAmount] = useState<Amount>({ value: 0, formatted: "Rp" });
  const [projectCode, setProjectCode] = useState<string>("");
  const [category, setCategory] = useState<"debit" | "credit">("debit");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log({
        amount: Number(amount),
        projectCode,
        category,
        description,
      });
      setSubmitMessage("Payment submitted successfully!");
    } catch (error) {
      setSubmitMessage("Error submitting payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl mx-auto p-6 rounded-lg shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2 grid-flow-row">
          <Label htmlFor="projectCode">Project Code</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {projectCode
                  ? projectCodes.find((code) => code.value === projectCode)
                      ?.label
                  : "Pilih kode project ..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Cari kode project ..." />
                <CommandEmpty>No project code found.</CommandEmpty>
                <CommandGroup>
                  {projectCodes.map((code) => (
                    <CommandItem
                      key={code.value}
                      onSelect={() => {
                        setProjectCode(
                          code.value === projectCode ? "" : code.value
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          projectCode === code.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {code.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Biaya (dalam rupiah)</Label>
          <Input
            id="amount"
            type="string"
            value={amount.formatted}
            onChange={(e) =>
              setAmount({
                value: parseCurrency(e.target.value),
                formatted: formatCurrency(e.target.value),
              })
            }
            placeholder="Masukkan biaya"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={category}
            onValueChange={(value: "debit" | "credit") => setCategory(value)}
            required
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit">Credit</SelectItem>
              <SelectItem value="debit">Debit</SelectItem>
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

      {submitMessage && (
        <p
          className={`text-center ${
            submitMessage.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {submitMessage}
        </p>
      )}
    </form>
  );
}
