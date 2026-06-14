import logo from "./assets/images/logo.svg";
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

function LiveMarket() {
  return (
    <div className="live-market">
      <p className="live-market__title">&bull; Live markets</p>
      <div className="live-market__rates">
        <div className="live-market__scroller">
          <div className="live-market__item">
            <p className="live-market__currency">1.USD/JPY</p>
            <p className="livemarket__rate">157.91</p>
            <p className="live-market__change-up">▲ +0.04%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">GBP/USD</p>
            <p className="livemarket__rate">1.3575</p>
            <p className="live-market__change-down">▼ -0.22%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">USD/JPY</p>
            <p className="livemarket__rate">157.91</p>
            <p className="live-market__change-up">▲ +0.04%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">GBP/USD</p>
            <p className="livemarket__rate">1.3575</p>
            <p className="live-market__change-down">▼ -0.22%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">USD/JPY</p>
            <p className="livemarket__rate">157.91</p>
            <p className="live-market__change-up">▲ +0.04%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">GBP/USD</p>
            <p className="livemarket__rate">1.3575</p>
            <p className="live-market__change-down">▼ -0.22%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">USD/JPY</p>
            <p className="livemarket__rate">157.91</p>
            <p className="live-market__change-up">▲ +0.04%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">GBP/USD</p>
            <p className="livemarket__rate">1.3575</p>
            <p className="live-market__change-down">▼ -0.22%</p>
          </div>
        </div>
        <div className="live-market__scroller">
          <div className="live-market__item">
            <p className="live-market__currency">1.USD/JPY</p>
            <p className="livemarket__rate">157.91</p>
            <p className="live-market__change-up">▲ +0.04%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">GBP/USD</p>
            <p className="livemarket__rate">1.3575</p>
            <p className="live-market__change-down">▼ -0.22%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">USD/JPY</p>
            <p className="livemarket__rate">157.91</p>
            <p className="live-market__change-up">▲ +0.04%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">GBP/USD</p>
            <p className="livemarket__rate">1.3575</p>
            <p className="live-market__change-down">▼ -0.22%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">USD/JPY</p>
            <p className="livemarket__rate">157.91</p>
            <p className="live-market__change-up">▲ +0.04%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">GBP/USD</p>
            <p className="livemarket__rate">1.3575</p>
            <p className="live-market__change-down">▼ -0.22%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">USD/JPY</p>
            <p className="livemarket__rate">157.91</p>
            <p className="live-market__change-up">▲ +0.04%</p>
          </div>
          <div className="live-market__item">
            <p className="live-market__currency">GBP/USD</p>
            <p className="livemarket__rate">1.3575</p>
            <p className="live-market__change-down">▼ -0.22%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <></>
  );
}
