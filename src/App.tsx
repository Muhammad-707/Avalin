import { HashRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppProvider, useApp } from "./store";
import { BottomNav, Toasts } from "./components/UI";

import Home from "./screens/Home";
import Chat from "./screens/Chat";
import Orders from "./screens/Orders";
import OrdersList from "./screens/OrdersList";
import OrderDetail from "./screens/OrderDetail";
import Wallet from "./screens/Wallet";
import Options from "./screens/Options";
import Profile from "./screens/Profile";
import LanguageTheme from "./screens/LanguageTheme";
import Pickup from "./screens/Pickup";
import Info from "./screens/Info";
import Tariffs from "./screens/Tariffs";
import Calculator from "./screens/Calculator";
import Delivery from "./screens/Delivery";
import { Lessons, LessonList } from "./screens/Lessons";
import { News, NewsDetail } from "./screens/News";
import Referral from "./screens/Referral";
import Notifications from "./screens/Notifications";
import Splash from "./screens/Splash";
import Auth from "./screens/Auth";
import "./auth.css";

function Shell({ enter }: { enter: boolean }) {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelector(".scroll")?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className={`shell ${enter ? "enter" : ""}`} ref={ref}>
      <Outlet />
      <Toasts />
      <BottomNav />
    </div>
  );
}

function Root() {
  const { s } = useApp();
  const [splash, setSplash] = useState(true);
  const hideSplash = useCallback(() => setSplash(false), []);
  // animate the app in only when it appears right after onboarding
  const [wasGuest] = useState(!s.registered);

  return (
    <>
      {s.registered ? (
        <HashRouter>
          <Routes>
            <Route element={<Shell enter={wasGuest} />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/list/:key" element={<OrdersList />} />
              <Route path="/orders/o/:id" element={<OrderDetail />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/options" element={<Options />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/language" element={<LanguageTheme />} />
              <Route path="/pickup" element={<Pickup />} />
              <Route path="/info/:slug" element={<Info />} />
              <Route path="/tariffs" element={<Tariffs />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/lessons/:id" element={<LessonList />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      ) : (
        <Auth />
      )}
      {splash && <Splash onDone={hideSplash} />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
