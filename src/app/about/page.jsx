import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div
      className="container flex flex-col justify-center items-center space-y-8 md:flex-row"
      style={{ minHeight: "93vh" }}
    >
      <div className="text-start max-w-md me-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Hi, I'm Jonas :)
        </h1>
        <p className="scroll-m-20 text-xl text-gray-500 lg:text-2xl mb-2">
          I'm the developer behind LifeIndex.
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          In mid-2023, I made a tool for myself to help me stick to my habits
          and lose weight - something that I have struggled with for years. And
          I'm not the only one. That's why I made it available for the public :)
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          LifeIndex is free. For everyone. If it helps you and you want to "give
          back",{" "}
          <Link
            className="underline underline-offset-4"
            href="mailto:jonas+lifeindex.apex9.io@hauswurz.cloud"
          >
            send me an email
          </Link>{" "}
          and tell me your story. I'd love to hear it! Same goes for any kind of
          questions or feedback :)
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          I wish you <span className="line-through ">good luck</span>{" "}
          <i>much discipline</i> on your journey!
        </p>
        <p className="text-sm text-muted-foreground">Cheers,</p>
        <p className="text-sm text-muted-foreground">Jonas</p>
      </div>
      <div className="flex justify-center">
        <Image
          src="/jonas.jpg"
          alt="Woman with checklist"
          width={368}
          height={100}
        />
      </div>
    </div>
  );
};

export default About;
