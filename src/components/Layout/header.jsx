"use client";
import { style } from "@/app/utills/style";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogIn, LogOut, User } from "react-feather";
const Header = () => {
  const session = useSession();
  const status = session.status;
  const UserData = session?.data?.user;
  let UserName = UserData?.name || UserData?.email;

  if (UserName && typeof UserName === "string" && UserName.includes(" ")) {
    UserName = UserName.split(" ")[0];
  }
  // console.log(UserName)
  // console.log(session)
  // console.log(status)
  return (
    <>
      <header className={style.header}>
        <Link className={style.Logo} href="">
          ST PIZZA
        </Link>
        <nav className={`${style.nav}`}>
          <Link href="/">Home</Link>
          <Link href="/MenuePage">Menue</Link>
          <Link href="/#About">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="flex gap-4">
          {status === "authenticated" && (
            <>
              <Link className=" py-2" href={"/profile"}>
                <User className="inline" /> Hello, {UserName}
              </Link>
              <button className={style.btn} onClick={() => signOut()}>
                Logout <LogOut className="inline" />
              </button>
            </>
          )}
          {status !== "authenticated" && (
            <>
              <Link className=" py-2" href={"/Login"}>
                Login <LogIn className="inline" />
              </Link>
              <Link className={`${style.btn}`} href={"/register"}>
                Register
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
