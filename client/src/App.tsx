import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TranslationsProvider } from "@/lib/translations/context";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import Bars from "@/pages/bars";
import LiveHouses from "@/pages/live-houses";
import Events from "@/pages/events";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import VenuePage from "@/pages/venue";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/bars" component={Bars} />
        <Route path="/bars/:id" component={VenuePage} />
        <Route path="/live" component={LiveHouses} />
        <Route path="/live/:id" component={VenuePage} />
        <Route path="/events" component={Events} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationsProvider>
        <Router />
        <Toaster />
      </TranslationsProvider>
    </QueryClientProvider>
  );
}

export default App;