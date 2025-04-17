-- Create wines table
CREATE TABLE wines (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  vintage INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create favourites table
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  wine_id INTEGER REFERENCES wines(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, wine_id)
);

-- Create ratings table
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  wine_id INTEGER REFERENCES wines(id) ON DELETE CASCADE,
  aroma INTEGER CHECK (aroma BETWEEN 1 AND 5),
  body INTEGER CHECK (body BETWEEN 1 AND 5),
  flavor INTEGER CHECK (flavor BETWEEN 1 AND 5),
  finish INTEGER CHECK (finish BETWEEN 1 AND 5),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, wine_id)
);

-- Create RLS policies
-- Enable Row Level Security
ALTER TABLE wines ENABLE ROW LEVEL SECURITY;
ALTER TABLE favourites ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Wines are readable by everyone
CREATE POLICY "Wines are viewable by everyone" 
ON wines FOR SELECT USING (true);

-- Favourites are only visible to the user who created them
CREATE POLICY "Favourites are viewable by owner" 
ON favourites FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Favourites are insertable by owner" 
ON favourites FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Favourites are deletable by owner" 
ON favourites FOR DELETE USING (auth.uid() = user_id);

-- Ratings are only visible to the user who created them
CREATE POLICY "Ratings are viewable by owner" 
ON ratings FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Ratings are insertable by owner" 
ON ratings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Ratings are updatable by owner" 
ON ratings FOR UPDATE USING (auth.uid() = user_id);

-- Sample data
INSERT INTO wines (name, vintage) VALUES
('Château Margaux', 2015),
('Opus One', 2018),
('Penfolds Grange', 2017),
('Caymus Special Selection', 2016),
('Tignanello', 2019),
('Dom Pérignon', 2012),
('Sassicaia', 2018),
('Silver Oak', 2017),
('Cloudy Bay Sauvignon Blanc', 2021),
('Krug Grande Cuvée', 2010);