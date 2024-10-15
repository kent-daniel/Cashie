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
import { Input } from "@/components/ui/input";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [isCustom, setIsCustom] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setIsCustom(false);
    setOpen(false);
  };

  const handleCustomSelect = () => {
    setValue(inputValue);
    setIsCustom(true);
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
            {frameworks.filter((fw) =>
              fw.label.toLowerCase().includes(inputValue.toLowerCase())
            ).length ? (
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => handleSelect(framework.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
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
