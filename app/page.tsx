import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
interface IBillionsType {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}
export default async function Home() {
  const data: IBillionsType[] = await (
    await fetch("https://billions-api.nomadcoders.workers.dev")
  ).json();

  return (
    <div className={styles.page}>
      {data.map((obj) => (
        <Link key={obj.id} href={`/${obj.id}`}>
          <div className={styles.imgCont}>
            <Image
              src={
                obj.squareImage.includes("undefined")
                  ? ""
                  : obj.squareImage + ""
              }
              alt={obj.id}
              width={200}
              height={200}
            />
          </div>
          <h5>{obj.name}</h5>
          <p>
            <span>{String(obj.netWorth)}</span>
            <span>/</span>
            <span>{obj.industries[0]}</span>
          </p>
        </Link>
      ))}
    </div>
  );
}
