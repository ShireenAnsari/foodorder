"use client";
import { style } from "@/app/utills/style";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { LogIn, LogOut, ShoppingCart, User } from "react-feather";
import { CartContext } from "../Appcontext";
const Header = () => {
  const session = useSession();
  const status = session.status;
  const UserData = session?.data?.user;
  let UserName = UserData?.name || UserData?.email;
  const {cartProducts}=useContext(CartContext);

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
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
          {/* {console.log(cartProducts?.length)}
         <ShoppingCart/>
            <Link href={'/'}>CART ({cartProducts?.length})</Link> */}
          
        </div>
      </header>
    </>
  );
};

export default Header;
