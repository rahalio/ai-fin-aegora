import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { SplitChannelShell } from "./shell/SplitChannelShell";
import { LoginView } from "./shell/LoginView";
import { OffersView, OfferDetailView } from "./features/offers/views/OffersView";
import { RmDeskView } from "./features/offers/views/RmDeskView";
import { ConsentView } from "./features/offers/views/ConsentView";
import { AlertsView } from "./features/alerts/views/AlertsView";
import { DisputesView, HoldsView } from "./features/holds/views/HoldsView";
import { CasesView } from "./features/cases/views/CasesView";
import { PoliciesView } from "./features/policies/views/PoliciesView";
import { ModelsView } from "./features/models/views/ModelsView";
import { AuditsView } from "./features/audits/views/AuditsView";

function OfferRoute() {
  const { offerId = "" } = useParams();
  return <OfferDetailView offerId={offerId} />;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route element={<SplitChannelShell />}>
        <Route path="/" element={<Navigate to="/help" replace />} />
        <Route path="/help" element={<OffersView />} />
        <Route path="/help/offers/:offerId" element={<OfferRoute />} />
        <Route path="/rm" element={<RmDeskView />} />
        <Route path="/consent" element={<ConsentView />} />
        <Route path="/protect" element={<AlertsView />} />
        <Route path="/protect/holds" element={<HoldsView />} />
        <Route path="/protect/disputes" element={<DisputesView />} />
        <Route path="/protect/cases" element={<CasesView />} />
        <Route path="/broker" element={<PoliciesView />} />
        <Route path="/models" element={<ModelsView />} />
        <Route path="/audits" element={<AuditsView />} />
      </Route>
    </Routes>
  );
}
