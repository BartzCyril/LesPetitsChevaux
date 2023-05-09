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
        <html lang="fr">
        <title>Les petits chevaux</title>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <meta name="description" content="Plongez dans l'univers du jeu des petits chevaux, un classique indémodable ! Notre site offre une expérience captivante de ce jeu de société populaire en version solo contre des bots intelligents. Lancez les dés, déplacez vos pions et stratégisez pour remplir votre écurie le plus rapidement possible. Profitez de graphismes attrayants, de règles fidèles au jeu original et d'une jouabilité immersive. Rejoignez-nous dès maintenant pour vivre des moments de divertissement en solo avec le jeu des petits chevaux."/>
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
