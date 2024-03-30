import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { Store } from "@/utils/Store";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { signOut, useSession } from "next-auth/react";
import DropdownLink from "../components/DropdownLink";
import Cookies from 'js-cookie';
const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemCount, setcartItemCount] = useState(0);
  useEffect(() => {
    setcartItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logOutClickHandler = ()=>{
    Cookies.remove('cart');
    dispatch({type: 'CART_RESET'});
    signOut({ callbackUrl: '/Login'});
  }
  return (
    <>
      <Head>
        <title>{title ? title + "-Amazona" : "Amazona"}</title>
        <meta name="Description" content="Ecommerce Website" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div>
        <div className="flex min-h-screen flex-col justify-between">
          <header>
            <nav className="flex h-12 items-center px-4 justify-between shadow-md ">
              <Link href="/">
                <Link href={"/"} className="text-lg font-bold">
                  amazona
                </Link>
              </Link>
              <div>
                <Link className=" p-2 mr-2 relative" href={"/Cart"}>
                  Cart
                  {cartItemCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-[0.3rem] absolute top-0 left-9 text-xs font-bold text-white ">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {status === "Loading" ? (
                  "Loading"
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className={"text-blue-600"}>
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className=" absolute right-0 w-56 bg-gray-100 origin-top-right shadow-lg">
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href = "/profile"
                        >
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href = "/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href = "#"
                          onClick = {logOutClickHandler}
                        >
                          Logout
                        </DropdownLink>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href={"/Login"}>
                    <Link className=" p-2" href={"/Login"}>
                      Login
                    </Link>
                  </Link>
                )}
              </div>
            </nav>
          </header>
          <main className="container m-auto mt-4 px-4">{children}</main>

          <footer className="flex items-center justify-center h-10 shadow-inner">
            <p>Copyrights &copy; 2024 Amazona</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
