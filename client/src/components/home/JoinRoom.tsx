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
import { useNavigate } from "react-router-dom";
import { appSocket } from "@/socket/socket";
import { socketResponse } from "@/utils/types";

const JoinRoom = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof joinRoomSchema>>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      roomCode: "",
      playerName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof joinRoomSchema>) => {
    try {
      appSocket
        .timeout(5000)
        .emit(
          "room:join",
          values,
          (error: socketResponse, res: socketResponse) => {
            if (error) {
              console.log(error);
            }
            form.reset();
            navigate("/room");
            return res;
          },
        );
      // Navigate to the room page.
    } catch (error) {
      console.log(error);
      return error; // Return the error from the server.
    }
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
