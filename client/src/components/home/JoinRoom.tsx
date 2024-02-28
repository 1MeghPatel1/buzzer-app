import joinRoomSchema from "@/schemas/joinRoomSchema";
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

const JoinRoom = () => {
  const form = useForm<z.infer<typeof joinRoomSchema>>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      roomCode: "",
      playerName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof joinRoomSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className="flex min-h-[22rem] min-w-[24rem] flex-col gap-4 rounded-md border  border-gray-100 bg-purple-100 bg-opacity-30 bg-clip-padding px-10 py-6 shadow-2xl backdrop-blur-sm backdrop-filter">
      <h2 className="font-medium italic tracking-wide">
        Want to join an existing Room?
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between space-y-8"
        >
          <FormField
            control={form.control}
            name="roomCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold tracking-wider">
                  Room Code
                </FormLabel>
                <FormControl>
                  <Input placeholder="Room Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="playerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold tracking-wider">
                  Player Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Player Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="uppercase" type="submit">
            Join Room
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JoinRoom;
