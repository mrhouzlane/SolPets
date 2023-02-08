const {TransferTransaction, TransactionEncoder} = require("@solana/web3.js");
const { BN } = require("bn.js");
const { publicKey, secretKey } = require("@solana/web3.js/src/wallet");
const { Connection } = require("@solana/web3.js");
const { createAccountWithLamports} = require("@solana/web3.js/src/utils");


const connection = new Connection("http://api.solana.com");

async function deploy() {
    const sourceKeypair = new secretKey(Buffer.from("your secret key", "hex"));
    const sourcePubkey = publicKey(sourceKeypair.publicKey());

    const petData = {
        historyOfVaccination: [1, 2, 3],
        needsHelp:true,
    };

    //create the NFT on the blockchain 
    const result = await connection.requestAirdrop(sourcePubkey, 1000000000);
    console.log("Airdrop Result: ", result);

    const nftPubkey = new publicKey();
    const nftKeypair = new secretKey();

    const nftTransaction = new TransferTransaction();
    nftTransaction.addData(Buffer.from("mint"), "utf-8");
    nftTransaction.addData(nftPubkey.toBuffer());
    nftTransaction.addData(Buffer.from(JSON.stringify(petData)), "utf-8");

    nftTransaction.addSigner(sourceKeypair);

    const nftTransactionEncoded = TransactionEncoder.encod(nftTransaction);

    // Deploy the transaction
    await connection.sendTransaction(nftTransactionEncoded);
    console.log("NFT deployed");
}

deploy();