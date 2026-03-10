import { BrowserRouter, Routes, Route } from "react-router-dom";
import WomenAlpineSponsorKitBuilder from "./WomenAlpineSponsorKitBuilder";
import Phase1 from "./Phase1";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WomenAlpineSponsorKitBuilder />} />
        <Route path="/phase1" element={<Phase1 />} />
      </Routes>
    </BrowserRouter>
  );
}
