const { Contract, Wallet, Connection, Keypair } = require("@solana/web3.js");
const fs = require("fs");

describe("Pet NFT Contract", () => {
  let connection;
  let wallet;
  let signer;
  let contract;
  let contractProgramId;

  beforeAll(async () => {
    connection = new Connection(<YOUR_NODE_URL>);
    wallet = new Wallet();
    signer = await wallet.addKey(<YOUR_SEED>);
    contractProgramId = await connection.getProgramId(
      fs.readFileSync(<COMPILED_WASM_FILE>)
    );

    const newAccount = await createAccount(connection, signer);
    console.log("Deploying contract to:", newAccount.publicKey.toBase58());

    contract = new Contract({
      programId: contractProgramId,
      signer: signer,
      wallet: wallet,
    });
  });

  it("should mint a new NFT", async () => {
    const petData = {
      history_of_vaccination: [123456789, 987654321],
      needs_help: true,
    };

    const response = await contract.mint(petData);
    expect(response).toBeTruthy();
  });

  it("should retrieve pet data", async () => {
    const petData = {
      history_of_vaccination: [111111111, 222222222],
      needs_help: false,
    };

    await contract.mint(petData);

    const accountInfo = await connection.getAccountInfo(contract.publicKey);
    const petDataRetrieved = JSON.parse(
      accountInfo.data.toString("utf8")
    );
    expect(petDataRetrieved).toEqual(petData);
  });

  it("should fail to mint NFT with incomplete data", async () => {
    const petData = {
      history_of_vaccination: [],
    };

    try {
      await contract.mint(petData);
      fail("should have thrown an error");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("should fail to mint NFT with unauthorized signer", async () => {
    const petData = {
      history_of_vaccination: [333333333, 444444444],
      needs_help: true,
    };

    const unauthorizedSigner = Keypair.new();
    const unauthorizedWallet = new Wallet();
    await unauthorizedWallet.addKey(unauthorizedSigner.secretKey);

    const unauthorizedContract = new Contract({
      programId: contractProgramId,
      signer: unauthorizedSigner,
      wallet: unauthorizedWallet,
    });

    try {
      await unauthorizedContract.mint(petData);
      fail("should have thrown an error");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});