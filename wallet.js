
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById('balance').innerText = "🔐 Connected: " + accounts[0];
      getBalance(accounts[0]);
    } catch (err) {
      alert("Connection rejected.");
    }
  } else {
    alert("MetaMask not detected.");
  }
}

async function getBalance(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(address);
  const matic = ethers.utils.formatEther(balance);
  document.getElementById('balance').innerText += ` | 💰 MATIC: ${matic}`;
}

async function sendMatic() {
  const recipient = document.getElementById('recipient').value;
  const amount = document.getElementById('amount').value;

  if (!recipient || !amount || !window.ethereum) return;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const tx = {
    to: recipient,
    value: ethers.utils.parseEther(amount)
  };

  try {
    const transaction = await signer.sendTransaction(tx);
    alert("✅ Transaction sent: " + transaction.hash);
  } catch (err) {
    alert("❌ Transaction failed");
  }
}
