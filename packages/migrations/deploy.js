const {
    Contract,
    Wallet,
    Signer,
    createAccount,
    PublicKey,
  } = require("@solana/web3.js");
  const fs = require("fs");
  
  async function deploy() {
    const connection = new solana.Connection(<YOUR_NODE_URL>);
    const wallet = new Wallet();
    const signer = await wallet.addKey(<YOUR_SEED>);
    const contractProgramId = await connection.getProgramId(
      fs.readFileSync(<COMPILED_WASM_FILE>)
    );
  
    const newAccount = await createAccount(connection, signer);
    console.log("Deploying contract to:", newAccount.publicKey.toBase58());
  
    const contract = new Contract({
      programId: contractProgramId,
      signer: signer,
      wallet: wallet,
    });
  
    // Call the contract's mint function with the required pet data
    const petData = {
      history_of_vaccination: [123456789, 987654321],
      needs_help: true,
    };
    const response = await contract.mint(petData);
  
    console.log("Mint NFT response:", response);
  }
  
  deploy();