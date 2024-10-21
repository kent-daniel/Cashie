import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type DropdownProps = {
  options: { label: string; value: string }[]; // Array of options with labels and values
  onSelect: (val: string) => void; // Callback to handle selection
  placeholder?: string; // Optional placeholder
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(""); // Local state for selected value

  const handleSelection = (value: string) => {
    setSelectedValue(value); // Set local state
    onSelect(value); // Call the parent's onSelect callback
  };

  return (
    <Select value={selectedValue} onValueChange={handleSelection}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
