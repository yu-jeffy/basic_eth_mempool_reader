const ethers = require('ethers');

// Connect to the Ethereum network using a default provider
const provider = new ethers.getDefaultProvider('mainnet');

// Function to read the Ethereum mempool
async function readEthereumMempool() {
  try {
    // Get the current block number
    const blockNumber = await provider.getBlockNumber();

    // Get the block details
    const block = await provider.getBlockWithTransactions(blockNumber);

    // Format the transactions in the block
    const formattedTransactions = block.transactions.map((transaction, index) => {
      return `Transaction ${index + 1}:
      From: ${transaction.from}
      To: ${transaction.to}
      Value: ${ethers.utils.formatEther(transaction.value)} ETH
      Gas Price: ${ethers.utils.formatUnits(transaction.gasPrice, 'gwei')} Gwei
      Nonce: ${transaction.nonce}\n`;
    });

    // Join the formatted transactions into a single string
    const output = formattedTransactions.join('\n');
    return output;
  } catch (error) {
    console.error('Error reading Ethereum mempool:', error);
    return null;
  }
}

// Call the function to read the Ethereum mempool
readEthereumMempool()
  .then((output) => {
    console.log('Ethereum Mempool Transactions:\n', output);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
