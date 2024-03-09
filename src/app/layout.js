import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/header";
import { Toaster } from "react-hot-toast";
import { Appprovider } from "@/components/Appcontext";

const roboto = Roboto({ subsets: ["latin"] ,weight:['400','500','700']});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-7xl p-4 mx-auto">
          <Appprovider>
          <Toaster/>
        <Header/>
        {children}
          </Appprovider>
       
        </main>
        
       </body>
    </html>
  );
}
