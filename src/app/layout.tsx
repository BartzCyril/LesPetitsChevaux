import Link from "next/link";
import "./globals.css"
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const header = (
        <header>
            <div className="text-center bg-slate-800 p-8 my-6 rounded-md">
                <Link href="/">
                    <h1 className="text-2xl text-white font-bold">Les petits chevaux</h1>
                </Link>
            </div>
        </header>
    );

    const footer = (
        <footer>
            <div className="border-t border-slate-400 mt-12 py-6 text-center text-slate-400">
                <h3>Cyril</h3>
            </div>
        </footer>
    );

    return (
        <html>
        <title>Les petits chevaux</title>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <link rel="icon" href="/favicon.ico"/>
        <body>
        <div className="mx-auto  max-w-2xl px-6">
            {header}
            {children}
            {footer}
        </div>
        </body>
        </html>
    );
}
