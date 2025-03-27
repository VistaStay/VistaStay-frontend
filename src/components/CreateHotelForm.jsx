import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateHotelMutation } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

// Define the PersonnelSelect component
const personnelOptions = [
  { value: "wifi", label: "Free Wi-Fi" },
  { value: "restaurant", label: "Restaurant" },
  { value: "tv", label: "Flat-screen TV" },
  { value: "coffee_maker", label: "Coffee maker" },
  { value: "fridge", label: "Fridge" },
  { value: "oven", label: "Oven" },
  { value: "AC", label: "AC" },
];

const PersonnelSelect = ({ value, onChange }) => {
  const handleSelect = (selectedValue) => {
    if (!value.includes(selectedValue)) {
      onChange([...value, selectedValue]);
    }
  };

  const handleRemove = (selectedValue) => {
    onChange(value.filter((option) => option !== selectedValue));
  };

  return (
    <div className="space-y-2">
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="select one" />
        </SelectTrigger>
        <SelectContent>
          {personnelOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((option) => {
          const label = personnelOptions.find((opt) => opt.value === option)?.label;
          return (
            <div
              key={option}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-slate-200 text-slate-900 rounded-md"
            >
              {label}
              <button
                onClick={() => handleRemove(option)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Form schema with amenities field as optional
const formSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  image: z.string().min(1, { message: "Image URL is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }).optional(), // Made optional
  Amenities: z.array(z.string()).optional(), // Made optional
  description: z.string().min(1, { message: "Description is required" }),
});

const CreateHotelForm = () => {
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      image: "",
      price: "", // Default to an empty string
      Amenities: [], // Default to an empty array
      description: "",
    },
  });

  const handleSubmit = async (values) => {
    const { name, location, image, price, description, Amenities } = values;
    try {
      toast.loading("Creating hotel...");
      await createHotel({
        name,
        location,
        image,
        price: price || 0, // Send 0 if price is empty
        Amenities, // Send the amenities even if it's an empty array
        description,
      }).unwrap();
      toast.success("Hotel created successfully");
      form.reset(); // Reset form after successful submission
    } catch (error) {
      toast.error("Hotel creation failed");
    }
  };

  return (
    <Form {...form}>
      <form className="w-1/2" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hotel Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="Image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => {
                      field.onChange(e.target.value === "" ? "" : parseFloat(e.target.value));
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Amenities <span className="text-blue-500 cursor-pointer">?</span>
                </FormLabel>
                <FormControl>
                  <PersonnelSelect value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Hotel"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateHotelForm;
