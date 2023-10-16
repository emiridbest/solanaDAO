const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;
describe("ayes-vs-nays", () => {
  /* Configure the client */
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.AyesVsNays;
  const voteAccount = anchor.web3.Keypair.generate();
  it("Initializes with 0 votes for ayes and nays", async () => {
	console.log("Testing Initialize...");
	/* The last element passed to RPC methods is always the transaction options. Because voteAccount is being created here, we are required to pass it as a signers array */
	await program.rpc.initialize({
  	accounts: {
    	voteAccount: voteAccount.publicKey,
    	user: provider.wallet.publicKey,
    	systemProgram: SystemProgram.programId,
  	},
  	signers: [voteAccount],
	});
	const account = await program.account.voteAccount.fetch(
  	voteAccount.publicKey
	);
	console.log("Ayes: ", account.ayes.toString());
	console.log("Nays: ", account.nays.toString());
	assert.ok(
  	account.ayes.toString() == 0 && account.nays.toString() == 0
	);
  });
  it("Votes correctly for ayes", async () => {
	console.log("Testing voteAyes...");
	await program.rpc.voteAyes({
  	accounts: {
    	voteAccount: voteAccount.publicKey,
  	},
	});
	const account = await program.account.voteAccount.fetch(
  	voteAccount.publicKey
	);
	console.log("Ayes: ", account.ayes.toString());
	console.log("Nays: ", account.nays.toString());
	assert.ok(
  	account.ayes.toString() == 1 && account.nays.toString() == 0
	);
  });
  it("Votes correctly for nays", async () => {
	console.log("Testing voteNays...");
	await program.rpc.voteNays({
  	accounts: {
    	voteAccount: voteAccount.publicKey,
  	},
	});
	const account = await program.account.voteAccount.fetch(
  	voteAccount.publicKey
	);
	console.log("Ayes: ", account.ayes.toString());
	console.log("Nays: ", account.nays.toString());
	assert.ok(
  	account.ayes.toString() == 1 && account.nays.toString() == 1
	);
  });
});
