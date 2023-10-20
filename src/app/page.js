import Image from "next/image";
import styles from "./page.module.css";
import Sketch from "./components/Sketch";

export default function Home() {
    return (
        <article>
        <Sketch />
            <section>
                <section>
                    <p>
                        under construction...
                        <br />
                        準備中....
                    </p>
                </section>
                <section>
                    <p>
                        多摩美術大学
                        <br />
                        統合デザイン学科
                        <br />
                        卒業修了制作展2O24
                    </p>
                </section>
                <section>
                    <p>
                        01. 18 - <br />
                        01. 21
                    </p>
                </section>
                <section>
                    <p>予約不要</p>
                    <p>No reservation required</p>
                </section>
                <section>
                    <p>
                        01. 18 - <br />
                        01. 21
                    </p>
                </section>
            </section>
            <section>
                <section>
                    <p>TAMA ART UNIVERSITY</p>
                </section>
                <section>DEPARTMENT OF</section>
                <section>INTEGRATED<br />DESIGN<br />GRADUATION<br/>SHOW</section>
                <section>KAMINOGE CAMPUS</section>
            </section>
        </article>
    );
}
