import logo from "./assets/images/logo.svg";
import LiveMarket from "./LiveMarket.tsx";
import Converter from "./Converter.tsx";
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <LiveMarket />
      <Content />
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="FX_Checker logo" />
      <p className="header__info">55 CURRENCIES · EOD · ECB DATA</p>
    </header>
  )
}

function Content() {
  return (
    <div className="content">
      <Converter />
    </div>
  );
}