/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  FieldPath,
  Path,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  options?: any[];
  description?: string;
  control: Control<T>;
}

interface ChildrenProps<T extends FieldValues> extends Props<T> {
  children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
}

export function CustomFormField<T extends FieldValues>(
  props: Readonly<ChildrenProps<T>>
) {
  const { name, label, description, control, children } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex justify-start items-start font-bold lg:text-lg">
            {label}
          </FormLabel>
          <FormControl>{children(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function OptionFormField<T extends FieldValues>(
  props: Readonly<ChildrenProps<T>>
) {
  const { name, control } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1">
              <div className="flex flex-row gap-10">
                <div className="w-[360px]  xl:h-[200px] border-2 border-black">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="client" />
                    </FormControl>
                    <img src="" alt="" />
                    <FormLabel className="font-normal">Client</FormLabel>
                  </FormItem>
                </div>
                <div className="w-[360px] lg:h-[150px] xl:h-[200px] border-2 border-black">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="pekerja" />
                    </FormControl>
                    <FormLabel className="font-normal">Pekerja</FormLabel>
                  </FormItem>
                </div>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
