import logo from "./assets/images/logo.svg";
import convertIcon from "./assets/images/icon-exchange-vertical.svg"
import LiveMarket from "./LiveMarket.tsx";
import CurrencySelector from "./Select/CurrencySelector.tsx";
import './App.css'
import { useRef, type ReactElement } from "react";

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

function Converter() {
  return (
    <div className="converter">
      <h1 className="converter__title">Check the rate</h1>
      <form className="calculator">
        <CalculatorItem title="Send">
          <input name="conversion-value" type="text" value="1,000" className="calculator-item__input"/>
        </CalculatorItem>
        <button type="button" className="calculator__btn" aria-label="Swap currencies">
          <img src={convertIcon} alt="Up and down exchange arrows" />
        </button>
        <CalculatorItem title="Receive">
          <p className="calculator-item__output">1,000</p>
        </CalculatorItem>
      </form>
      <div className="converter__footer"></div>
    </div>
  );
}

function CalculatorItem({ children, title }: { children: ReactElement, title: string }) {
  let triggerRef = useRef(null);
  return (
    <div className="calculator-item" ref={triggerRef}>
      <p className="calculator-item__title">{title}</p>
      <div className="calculator-item__options">
        {children}
        <CurrencySelector triggerRef={triggerRef}/>
      </div>
    </div>
  );
}
