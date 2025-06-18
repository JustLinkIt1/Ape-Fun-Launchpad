import type { NextApiRequest, NextApiResponse } from "next";
import { createBondingCurveTx } from "../../../lib/scripts";
import {
  TEST_DECIMALS,
  TEST_TOKEN_SUPPLY,
  TEST_VIRTUAL_RESERVES,
  TEST_NAME,
  TEST_SYMBOL,
  TEST_URI,
} from "../../../lib/constant";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { Connection, Keypair } from "@solana/web3.js";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const keypairPath = process.env.KEYPAIR || "id.json";
    const secret = Uint8Array.from(
      JSON.parse(fs.readFileSync(keypairPath, "utf-8")),
    );
    const wallet = new NodeWallet(Keypair.fromSecretKey(secret));
    const connection = new Connection(
      process.env.RPC_URL || "https://api.devnet.solana.com",
    );
    const provider = new AnchorProvider(connection, wallet, {
      skipPreflight: true,
      commitment: "confirmed",
    });
    const idl = JSON.parse(
      fs.readFileSync("target/idl/pump_raydium.json", "utf-8"),
    );
    const program = new Program(idl, idl.metadata.address, provider);

    const tx = await createBondingCurveTx(
      TEST_DECIMALS,
      TEST_TOKEN_SUPPLY,
      TEST_VIRTUAL_RESERVES,
      TEST_NAME,
      TEST_SYMBOL,
      TEST_URI,
      wallet.publicKey,
      wallet.publicKey,
      connection,
      program,
    );
    const raw = tx.serialize({ verifySignatures: false }).toString("base64");
    res.status(200).json({ tx: raw });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
