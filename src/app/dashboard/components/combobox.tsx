"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusIcon, PlusSquareIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUniqueProjectCodes } from "@/data-access/payment";

export function ProjectCodeCombobox({
  setProjectCode,
}: {
  setProjectCode: (code: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [projectCodes, setProjectCodes] = React.useState<string[]>([]);

  // fetch unique project codes
  React.useEffect(() => {
    const fetchProjectCodes = async () => {
      const codes = await getUniqueProjectCodes();
      setProjectCodes(codes);
    };

    fetchProjectCodes();
  }, []);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setProjectCode(currentValue);
    setOpen(false);
  };

  const handleCustomSelect = () => {
    setValue(inputValue);
    setProjectCode(inputValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Cari kode project ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Ketik kode project..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {projectCodes.filter((code) =>
              code.toLowerCase().includes(inputValue.toLowerCase())
            ).length ? (
              <CommandGroup>
                {projectCodes.map((code) => (
                  <CommandItem
                    key={code}
                    value={code}
                    onSelect={() => handleSelect(code)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {code}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>
                <div className="flex flex-col gap-3 items-center p-1">
                  {inputValue}
                  <Button
                    onClick={handleCustomSelect}
                    className="whitespace-nowrap gap-2 bg-secondary-foreground"
                  >
                    tambah kode baru <PlusIcon size={15} />
                  </Button>
                </div>
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}