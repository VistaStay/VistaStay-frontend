import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Sparkles, Compass, DollarSign, Briefcase } from "lucide-react"; // Icons for experience, location, and budget
import { useDispatch } from "react-redux";
import { submit } from "@/lib/api/features/searchSlice";

export default function Hero() {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: { experience: "", location: "", budget: "" },
  });

  const handleSearch = (values) => {
    // Combine non-empty fields into a single string
    const searchQuery = [values.experience, values.location, values.budget]
      .filter((value) => value.trim() !== "")
      .join(", ");

    dispatch(submit(searchQuery));

    // Reset input fields after submission
    form.reset();
  };

  return (
    <div className="flex flex-col items-center text-white px-8 pt-32 pb-32">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
        Discover Your Perfect Stay with VistaStay!
      </h1>

      <p className="text-xl mb-12 max-w-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
        Describe your dream stay, and let AI find the perfect getaway for you!
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSearch)} className="w-full max-w-3xl flex flex-col gap-4">
          
          {/* Experience Input */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Experience</FormLabel> {/* Increased font size */}
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your desired experience..."
                      className="bg-transparent border border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-0 pl-10" // Added padding for icon
                      {...field}
                    />
                    <span className="absolute left-3 top-3 text-white">
                      <Briefcase size={18} />
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Location Input */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Location</FormLabel> {/* Increased font size */}
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your preferred location..."
                      className="bg-transparent border border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-0 pl-10" // Added padding for icon
                      {...field}
                    />
                    <span className="absolute left-3 top-3 text-white">
                      <Compass size={18} />
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Budget Input */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Budget</FormLabel> {/* Increased font size */}
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter your budget..."
                      className="bg-transparent border border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-0 pl-10" // Added padding for icon
                      {...field}
                    />
                    <span className="absolute left-3 top-3 text-white">
                      <DollarSign size={18} />
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* AI Search Button */}
          <Button type="submit" className="rounded-full w-full flex justify-center items-center gap-x-2 lg:h-12">
            <Sparkles className="mr-2 animate-pulse text-sky-400" style={{ width: "20px", height: "20px" }} />
            <span className="lg:text-lg">AI Search</span>
          </Button>

        </form>
      </Form>
    </div>
  );
}
