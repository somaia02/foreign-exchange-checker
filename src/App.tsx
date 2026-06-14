import logo from "./assets/images/logo.svg";
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <LiveMarkets />
      <Content />
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="FX_Checker logo" />
      <p className="header-info">55 CURRENCIES · EOD · ECB DATA</p>
    </header>
  )
}

function LiveMarkets() {
  return (
    <></>
  );
}

function Content() {
  return (
    <></>
  );
}
