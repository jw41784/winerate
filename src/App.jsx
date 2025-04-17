import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Star, Heart, LogOut } from "lucide-react";

/* ---------------------------------------------------------------------------
   1. 𝐔𝐈 𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭𝐬 – minimal yet production‑ready                       
   ------------------------------------------------------------------------*/
export const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props}>{children}</div>
);
export const CardHeader = ({ className = "", children, ...p }) => (
  <div className={`border-b px-4 py-3 ${className}`} {...p}>{children}</div>
);
export const CardTitle = ({ className = "", children, ...p }) => (
  <h3 className={`text-base font-semibold ${className}`} {...p}>{children}</h3>
);
export const CardContent = ({ className = "", children, ...p }) => (
  <div className={`px-4 py-3 ${className}`} {...p}>{children}</div>
);

export const Button = ({ variant = "primary", className = "", children, ...p }) => {
  const base = "px-3 py-1.5 rounded text-sm font-medium focus:outline-none focus:ring";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300",
    outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-300",
    ghost: "text-indigo-600 hover:bg-indigo-50",
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...p}>{children}</button>;
};

export const Textarea = ({ className = "", ...p }) => (
  <textarea className={`w-full rounded border border-gray-300 p-2 text-sm focus:ring focus:ring-indigo-200 ${className}`} {...p} />
);

export function Dialog({ triggerLabel, children }) {
  const [open, setOpen] = useState(false);
  if (!open) return <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md animate-scaleIn">
        <CardContent>{children}</CardContent>
        <div className="border-t px-4 py-3 text-right">
          <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Card>
    </div>,
    document.body
  );
}

/* ---------------------------------------------------------------------------
   2. Supabase safe init (placeholders)                                        
   ------------------------------------------------------------------------*/
// Direct initialization with explicit values for GitHub Pages
const supabaseUrl = "https://tddiorfkzneocopywaxo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZGlvcmZrem5lb2NvcHl3YXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NDg3ODgsImV4cCI6MjA2MDQyNDc4OH0.APApYV-MC9J2A7K_ArKfv0aS9vn6fLJxo_tg_xA2Zv8";

export const supabase = createClient(supabaseUrl, supabaseKey, { 
  auth: { 
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

/* ---------------------------------------------------------------------------
   3. Helper rating components                                                 
   ------------------------------------------------------------------------*/
const StarRow = ({ value, onChange }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`h-5 w-5 cursor-pointer ${value >= n ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-400"}`}
        onClick={() => onChange(n)}
      />
    ))}
  </div>
);
const RatingRow = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between py-1 text-sm">
    <span className="capitalize text-gray-700">{label}</span>
    <StarRow value={value} onChange={onChange} />
  </div>
);

/* ---------------------------------------------------------------------------
   4. App                                                                      
   ------------------------------------------------------------------------*/
export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [session, setSession] = useState(null);
  const [wines, setWines] = useState([]);
  const [favs, setFavs] = useState([]);
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub?.subscription.unsubscribe();
  }, []);

  // Load catalogue and user data
  useEffect(() => {
    const loadData = async () => {
      // Load wines
      const { data: wineData } = await supabase.from("wines").select("id,name,vintage");
      setWines(wineData || []);
      
      if (session) {
        // Load user favorites
        const { data: favData } = await supabase
          .from("favourites")
          .select("wine_id")
          .eq("user_id", session.user.id);
        
        if (favData) {
          setFavs(favData.map(f => f.wine_id));
        }
        
        // Load user ratings
        const { data: ratingData } = await supabase
          .from("ratings")
          .select("*")
          .eq("user_id", session.user.id);
        
        if (ratingData) {
          const ratingMap = {};
          ratingData.forEach(r => {
            ratingMap[r.wine_id] = {
              aroma: r.aroma,
              body: r.body,
              flavor: r.flavor,
              finish: r.finish,
              note: r.note
            };
          });
          setRatings(ratingMap);
        }
      }
    };
    
    loadData();
  }, [session]);

  if (!session) return <AuthScreen />;

  const toggleFav = async (id) => {
    if (favs.includes(id)) {
      await supabase.from("favourites").delete().match({ user_id: session.user.id, wine_id: id });
      setFavs(favs.filter((x) => x !== id));
    } else {
      await supabase.from("favourites").insert({ user_id: session.user.id, wine_id: id });
      setFavs([...favs, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">
      <header className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-xl font-bold">WineRate</h1>
        <div className="flex gap-2 items-center">
          <Link className="underline text-sm" to="#">Feed (todo)</Link>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}><LogOut className="h-4 w-4" /></Button>
        </div>
      </header>

      <div className="grid gap-4 max-w-5xl mx-auto sm:grid-cols-2 md:grid-cols-3">
        {wines.map((w) => (
          <Card key={w.id}>
            <CardHeader>
              <CardTitle>{w.name} ({w.vintage})</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog triggerLabel="Rate / Note">
                {['aroma', 'body', 'flavor', 'finish'].map((k) => (
                  <RatingRow
                    key={k}
                    label={k}
                    value={ratings[w.id]?.[k] || 0}
                    onChange={(v) => setRatings((r) => ({ ...r, [w.id]: { ...r[w.id], [k]: v } }))}
                  />
                ))}
                <Textarea
                  rows={3}
                  placeholder="Tasting notes"
                  value={ratings[w.id]?.note || ""}
                  onChange={(e) =>
                    setRatings((r) => ({ ...r, [w.id]: { ...r[w.id], note: e.target.value } }))
                  }
                />
                <div className="mt-3">
                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={async () => {
                      const ratingData = ratings[w.id];
                      if (!ratingData) return;
                      
                      const { data, error } = await supabase
                        .from('ratings')
                        .upsert({
                          user_id: session.user.id,
                          wine_id: w.id,
                          aroma: ratingData.aroma || 0,
                          body: ratingData.body || 0,
                          flavor: ratingData.flavor || 0,
                          finish: ratingData.finish || 0,
                          note: ratingData.note || '',
                          updated_at: new Date().toISOString()
                        });
                        
                      if (error) console.error('Error saving rating:', error);
                    }}
                  >
                    Save Rating
                  </Button>
                </div>
              </Dialog>
              <Button variant={favs.includes(w.id) ? "primary" : "outline"} className="w-full mt-3" onClick={() => toggleFav(w.id)}>
                <Heart className="h-4 w-4 inline mr-1" /> {favs.includes(w.id) ? 'Un‑favourite' : 'Favourite'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AuthScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-indigo-700">
      <Auth 
        supabaseClient={supabase} 
        providers={[]} 
        appearance={{ theme: ThemeSupa }} 
        theme="dark" 
        redirectTo={window.location.origin + window.location.pathname}
      />
    </div>
  );
}