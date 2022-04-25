import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "INFURA_ID", // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "web3modal", // Required
      infuraId: "INFURA_ID", // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  binancechainwallet: {
    package: true,
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  displayNoInjectedProvider: true,
  disableInjectedProvider: true,
  providerOptions, // required
});

const connectWallet = async () => {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    await window.ethereum.send("eth_requestAccounts");
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    document.querySelector(".connect").innerHTML = account;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>How To Add Web3Modal in React Example</p>
        <button type="button" className="btn btn-primary connect" onClick={connectWallet}>
          Connect Wallet
        </button>
      </header>
    </div>
  );
}

export default App;
