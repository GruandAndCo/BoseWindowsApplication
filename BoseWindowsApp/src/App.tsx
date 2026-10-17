import { Heading, Text, Divider } from "@gruand-co/core";
import AncButton from "./components/AncButton";
import BatterySection from "./components/BatteryStatus";
import "./App.css";

export default function App() {
  return (
    <main id="App" className="old-money-container">
      <header className="app-header">
        <Text variant="small" style={{ letterSpacing: "0.35em", color: "#c5a059", textTransform: "uppercase" }}>
          ATELIER AUDIO • BOSE SUITE
        </Text>

        <Heading level={1} variant="gold" className="app-title">
          Acoustic Controller
        </Heading>

        <Divider orientation="horizontal" ornament={true} />
      </header>

      <section className="app-content">
        <Text variant="serif" className="welcome-text">
          Sélecteur d'atténuation acoustique & d'immersion
        </Text>

        <div className="panel-frame">
          <div className="panel-inner">
            <span className="panel-label">MODULE DE CONTRÔLE</span>

            <AncButton />

            <Divider orientation="horizontal" ornament={false} style={{ margin: "1.5rem 0" }} />

            <BatterySection />
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