import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
    getAssociatedTokenAddress,
    createTransferInstruction,
} from "@solana/spl-token";

(async () => {
  // Connect to the Solana devnet
  const connection = new Connection("https://api.devnet.solana.com");

  // Define public keys
  const senderPublicKey = new PublicKey(
    "AxjDZNzJvVGXrZ9TMsjQeHJmhRDQEXSzR1HQLG84fmnH"
  ); // Replace with sender's public key
  const recipientPublicKey = new PublicKey(
    "Cyx9uQ2p1tQyLWxTzosemWeQceAgaSFTDejtVyQbPrfi"
  ); // Replace with recipient's public key
  const tokenMintAddress = new PublicKey(
    "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN" //TRUMP mint address
  ); // Replace with token mint address

  // Get associated token accounts
  const senderTokenAccount = await getAssociatedTokenAddress(
    tokenMintAddress,
    senderPublicKey
  );

  console.log("Sender Token Account: ", senderTokenAccount);
  const recipientTokenAccount = await getAssociatedTokenAddress(
    tokenMintAddress,
    recipientPublicKey
  );
  console.log("Recipient Token Account: ", recipientTokenAccount);

  // Define the amount to transfer (in smallest units)
  const amount = 1 * 10 ** 6; // Replace with the amount of tokens to transfer

  // Create a transfer instruction
  const transferInstruction = createTransferInstruction(
    senderTokenAccount,
    recipientTokenAccount,
    senderPublicKey,
    amount
  );

  // Build the transaction
  const transaction = new Transaction().add(transferInstruction);

  // Fetch the latest blockhash and set it in the transaction
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = senderPublicKey;

  // Serialize the transaction (unsigned)
  const unsignedTransaction = transaction.serialize({
    requireAllSignatures: false,
  });
  console.log(transaction);
  console.log("Unsigned raw Transaction:", unsignedTransaction.toString("hex"));
})();
