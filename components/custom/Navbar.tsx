import Link from "next/link";
import { Highlighter } from "../ui/highlighter";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { isAuthenticated } from "@/lib/auth-server";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const isUserAauthenticated = await isAuthenticated();
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Highlighter action="underline" color="#FF9800">
            <span className="text-3xl font-bold tracking-widest">
              Lu<span className="text-primary">r</span>a
            </span>
          </Highlighter>
        </Link>

        <div className="flex items-center gap-2">
          <Link href={"/"} className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Link
            href={"/blogs"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Blogs
          </Link>
          <Link
            href={"/create"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isUserAauthenticated ? (
          <SignOutButton />
        ) : (
          <>
            <Link href={"/auth/sign-up"} className={buttonVariants()}>
              Sign up
            </Link>
            <Link
              href={"/auth/sign-in"}
              className={buttonVariants({ variant: "outline" })}
            >
              Sign in
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
