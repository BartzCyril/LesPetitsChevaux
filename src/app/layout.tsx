import Link from "next/link";
import "./globals.css"
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const header = (

        <header>
            <Link href="https://www.gameludo.app/">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">Play now <mark
                className="px-2 text-white rounded dark:bg-blue-500">Ludo</mark> for free !
            </h1>
            </Link>
        </header>
    );

    const footer = (
        <footer>
            <div className="border-t border-slate-400 mt-12 py-6 text-center">
                <h3>Cyril</h3>
            </div>
        </footer>
    );

    return (
        <html lang="fr">
        <title>Play now Ludo online, it&apos;s free !</title>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <meta name="description" content="Plongez dans l'univers du jeu des petits chevaux, un classique indémodable ! Notre site offre une expérience captivante de ce jeu de société populaire en version solo contre des bots intelligents. Lancez les dés, déplacez vos pions et stratégisez pour remplir votre écurie le plus rapidement possible. Profitez de graphismes attrayants, de règles fidèles au jeu original et d'une jouabilité immersive. Rejoignez-nous dès maintenant pour vivre des moments de divertissement en solo avec le jeu des petits chevaux."/>
        <link rel="icon" href="./img/horse.svg"/>
        <body>
        <div className="div-main">
            {header}
            {children}
            {footer}
        </div>
        </body>
        </html>
    );
}
