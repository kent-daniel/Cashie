import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Assuming you're using Shadcn UI for these components
import { Table } from "@tanstack/react-table";
import { PaymentPresentationDTO } from "../actions";

const PageSizeSelector = ({
  table,
  className,
}: {
  table: Table<PaymentPresentationDTO>;
  className: string;
}) => {
  const pageSizeOptions = [5, 10, 20, 50, 100];

  return (
    <div className={className}>
      <Select
        value={String(table.getState().pagination.pageSize)} // Convert to string as Select expects string values
        onValueChange={(value) => {
          table.setPageSize(Number(value)); // Convert back to number when setting page size
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select page size" />
        </SelectTrigger>
        <SelectContent>
          {pageSizeOptions.map((pageSize) => (
            <SelectItem key={pageSize} value={String(pageSize)}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PageSizeSelector;
