import { Inter } from "next/font/google";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="ja">
            <body>
                {children}
            </body>
        </html>
    );
}
