import createRoomSchema from "@/schemas/createRoomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { appSocket } from "@/socket/socket";
import { socketResponse } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const CreateRoom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      roomName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createRoomSchema>) => {
    try {
      setIsLoading(true);
      appSocket
        .timeout(5000)
        .emit(
          "room:create",
          values,
          (_: null, error: socketResponse, res: socketResponse) => {
            if (error) {
              toast({
                title: "Error: Something went wrong!",
                description: error.message,
                variant: "destructive",
              });
            }
            form.reset();
            setIsLoading(false); // Set isLoading to false.
            navigate("/room"); // Navigate to the room page.
            return res; // Return the response from the server.
          },
        );
    } catch (error) {
      if (error instanceof Error)
        toast({
          title: "Error: Something went wrong!",
          description: error.message,
          variant: "destructive",
        });
      return error; // Return the error from the server.
    }
  };

  return (
    <div className="flex min-h-[12rem] min-w-[23rem] flex-col gap-4 rounded-md border border-gray-100  bg-purple-100 bg-opacity-40 bg-clip-padding px-10 py-6 shadow-2xl backdrop-blur-sm backdrop-filter">
      <h2 className="font-medium italic tracking-wide">
        Want to create a new Room?
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between space-y-8"
        >
          <FormField
            control={form.control}
            name="roomName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold tracking-wider">
                  Room Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Room Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="uppercase" type="submit">
            {!isLoading ? (
              "Create Room"
            ) : (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRoom;
