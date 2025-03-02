import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {hexToBase58} from "./hex2base58";

(async () => {
  // 1. Connect to the Solana cluster (mainnet, testnet, or devnet)
  const connection = new Connection("https://api.devnet.solana.com");

  // 2. Define the sender and recipient public keys
  const senderPublicKey = new PublicKey(
    "6wY9pHyj8dndJ7u9fnmvnBRv63JPkjJqNiDz79thaD8f"
  );
  const recipientPublicKey = new PublicKey(
    "Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE"
  );

  // 3. Define the amount to transfer (in lamports)
  const amount = 0.1 * LAMPORTS_PER_SOL; // 0.1 SOL

  // 4. Create a transfer instruction
  const transferInstruction = SystemProgram.transfer({
    fromPubkey: senderPublicKey,
    toPubkey: recipientPublicKey,
    lamports: amount,
  });

  // 5. Create a new transaction and add the transfer instruction
  const transaction = new Transaction().add(transferInstruction);

  // 6. Fetch the recent blockhash to include in the transaction
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;

  // 7. Set the transaction's fee payer (the sender of the transaction)
  transaction.feePayer = senderPublicKey;

  // 8. Log the unsigned raw transaction
  console.log(transaction);
  console.log(transaction.serializeMessage().toString("hex"));
  console.log(hexToBase58(transaction.serializeMessage().toString("hex")));


  // At this point, the transaction is unsigned and can be serialized or signed
})();
