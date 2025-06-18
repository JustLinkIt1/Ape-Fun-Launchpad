import Head from 'next/head';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Chart from '../components/Chart';
import TokenCreator from '../components/TokenCreator';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <Head>
        <title>Ape Fun Launchpad</title>
      </Head>
      <WalletMultiButton />
      <h1>Ape Fun Launchpad</h1>
      <Chart />
      <TokenCreator />
    </div>
  );
}
