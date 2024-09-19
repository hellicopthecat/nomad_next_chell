import Image from "next/image";
import style from "./person.module.css";

interface IPersonParams {
  id: string;
}
interface IPersonType {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: string;
  industries: string[];
  financialAssets: [
    {
      exchange: string;
      ticker: string;
      companyName: string;
      numberOfShares: number;
      exerciseOptionPrice: number;
      sharePrice: number;
      currencyCode: string;
      exchangeRate: number;
      interactive: boolean;
      currentPrice: number;
    }
  ];
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}
export async function generateMetadata({params}: {params: IPersonParams}) {
  return {
    title: params.id.replace("-", " ").toUpperCase(),
  };
}

export default async function Person({params}: {params: IPersonParams}) {
  const data: IPersonType = await (
    await fetch(
      `https://billions-api.nomadcoders.workers.dev/person/${params.id}`
    )
  ).json();

  return (
    <div className={style.personCont}>
      <section>
        <div>
          <Image src={data.squareImage} alt={data.id} fill={true} />
        </div>
        <h3>{data.name}</h3>
        <h5>Networth : {`${data.netWorth} Billion`}</h5>
        <h5>Country : {data.country}</h5>
        <h5>Industry : {data.industries}</h5>
        <p>{data.bio}</p>
      </section>

      <section>
        <h3>Financial Assets</h3>
        <div className={style.assetGrid}>
          {data.financialAssets.map((asset) => (
            <div key={asset.companyName} className={style.assetItem}>
              <h4>Company Name : {asset.companyName}</h4>
              <h4>Ticker : {asset.ticker}</h4>
              <h4>
                Exercise Price :
                {!asset.exerciseOptionPrice
                  ? `$ 0`
                  : `$ ${asset.exerciseOptionPrice}`}
              </h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
