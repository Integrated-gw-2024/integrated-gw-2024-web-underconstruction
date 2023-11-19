import React, { useEffect, useRef } from "react";

export default function Header() {
    return (
        <header className="archive">
            <div className="archiveLink">
                <a href="https://www.tamabi.ac.jp/integrated/exhibit/graduation_19/" target="_blank" rel="noreferrer">2019</a>
                <a href="https://www.tamabi.ac.jp/integrated/exhibit/graduation_20/" target="_blank" rel="noreferrer">2020</a>
                <a href="https://www.tamabi.ac.jp/integrated/exhibit/graduation_21/" target="_blank" rel="noreferrer">2021</a>
                <a href="https://www.tamabi.ac.jp/integrated/exhibit/graduation_22/" target="_blank" rel="noreferrer">2022</a>
                <a href="https://integrated.jp/gw23/" target="_blank" rel="noreferrer">2023</a>
            </div>
            <span>ARCHIVE</span>
        </header>
    )
}