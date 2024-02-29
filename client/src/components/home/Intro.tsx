import { NotebookPen, Projector } from "lucide-react";
import { Separator } from "../ui/separator";
const Intro = () => {
  return (
    <div className="flex w-[40%] flex-col gap-8">
      <h2 className="text-4xl font-semibold tracking-wide text-[#e11d48] dark:text-primary-foreground">
        BuzzIn! <span className=" text-base italic">Elevating Engagement.</span>
      </h2>
      <Separator />
      <div className="">
        <h3 className="flex gap-2 text-xl tracking-wide">
          <Projector />
          Introduction:
        </h3>
        <p className="text-lg tracking-wide">
          Welcome to BuzzIn! Your go-to for interactive gaming that sparks fun
          and teamwork. From quizzes to trivia challenges, we've got it all
          covered. Get ready to buzz in and ignite excitement in your workplace
          with BuzzIn! Let's play!
        </p>
      </div>
      <div className="">
        <h3 className="flex gap-2 text-xl tracking-wide">
          <NotebookPen />
          Instructions:
        </h3>
        <p className="text-lg">
          Getting started with BuzzIn is easy! Create a new room or join an
          existing one with a unique room code. Share the excitement with your
          colleagues and start buzzing in together!
        </p>
      </div>
    </div>
  );
};

export default Intro;
