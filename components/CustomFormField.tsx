import { E164Number } from "libphonenumber-js/core";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
  error,
}: {
  field: any;
  props: CustomProps;
  error: any;
}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div
          className={`flex rounded-md border border-dark-500 bg-dark-400 ${
            error && "border-red-500"
          }`}
        >
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              alt={props.iconAlt || "Icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        // <div className="flex rounded-md border border-dark-500 bg-dark-400">
        <FormControl>
          <PhoneInput
            defaultCountry="NG"
            placeholder={props.placeholder}
            international
            countryCallingCodeEditable={false}
            withCountryCallingCode
            {...field}
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className={` ${error && "!border !border-red-500"} input-phone`}
          />
        </FormControl>
        // </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div
          className={`${
            error && "!border !border-red-500"
          } flex rounded-md border border-dark-500 bg-dark-400`}
        >
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calender"
            className="ml-2"
          />

          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
              placeholderText={props.placeholder}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label} =
    props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-[#ABB8C4]">{label}</FormLabel>
          )}
          <RenderField field={field} props={props} error={error} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
