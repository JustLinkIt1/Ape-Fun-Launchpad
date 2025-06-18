import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@solana/wallet-adapter-react-ui';
import { Transaction } from '@solana/web3.js';
import { useState } from 'react';

export default function TokenCreator() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const res = await fetch('/api/create-token', { method: 'POST' });
      const { tx } = await res.json();
      const transaction = Transaction.from(Buffer.from(tx, 'base64'));
      await sendTransaction(transaction, connection);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="token-creator">
      <Button disabled={!publicKey || loading} onClick={onCreate}>
        Create Token
      </Button>
    </div>
  );
}
