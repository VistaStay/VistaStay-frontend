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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <SelectValue placeholder="Select one" />
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
                
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  image: z.string().min(1, { message: "Image URL is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  amenities: z.array(z.string()).optional(),
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
      price: "",
      amenities: [],
      description: "",
    },
  });

  const handleSubmit = async (values) => {
    const { name, location, image, price, description, amenities } = values;
    try {
      toast.loading("Creating hotel...");
      await createHotel({
        name,
        location,
        image,
        price,
        amenities,
        description,
      }).unwrap();
      toast.success("Hotel created successfully");
      form.reset();
    } catch (error) {
      toast.error("Hotel creation failed");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex justify-center mt-6 mb-6">
        <CardTitle className="text-2xl text-center">Create New Hotel</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Image URL" {...field} />
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
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : parseFloat(e.target.value)
                          )
                        }
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amenities"
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
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Creating..." : "Create Hotel"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateHotelForm;