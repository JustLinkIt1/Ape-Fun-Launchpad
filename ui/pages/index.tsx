import Head from 'next/head';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Chart from '../components/Chart';
import TokenCreator from '../components/TokenCreator';

export default function Home() {
  return (
    <div className="main">
      <Head>
        <title>Ape Fun</title>
      </Head>
      <div className="card">
        <WalletMultiButton />
        <h1>Ape Fun</h1>
        <Chart />
        <TokenCreator />
      </div>
    </div>
  );
}
