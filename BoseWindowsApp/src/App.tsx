import AncButton from "./components/AncButton";
import { Heading, Text } from "@gruand-co/core";
import "./App.css";

export default function App() {
  return (
    <main id="App" className="old-money-container">
      <header className="app-header">
        <span className="brand-subtitle">ATELIER AUDIO • BOSE SUITE</span>
        <Heading variant="gold" className="app-title">
          Acoustic Controller
        </Heading>
        <div className="gold-divider" />
      </header>

      <section className="app-content">
        <Text className="welcome-text" variant="serif">
          Sélecteur d'atténuation acoustique & d'immersion
        </Text>

        <div className="panel-frame">
          <div className="panel-inner">
            <span className="panel-label">RÉGLAGE ANC</span>
            <AncButton />
          </div>
        </div>
      </section>

      <footer className="app-footer">
        <Text variant="serif" className="footer-status">
          ÉDITION PRIVÉE • APPLICATION NON OFFICIELLE
        </Text>
      </footer>
    </main>
  );
}