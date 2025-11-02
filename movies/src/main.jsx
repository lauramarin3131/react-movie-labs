import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
//import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import UpcomingMoviesPage from "./pages/upcomingMoviePage.jsx";
import PopularMoviesPage from "./pages/PopularMoviesPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/NowPlayingMoviesPage";
import ActorDetailsPage from "./pages/ActorDetailsPage.jsx";
import MustWatchPage from "./pages/mustWatchPage";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#17ab93ff", 
    },
    secondary: {
      main: "#00bfff5d", 
    },
    background: {
      default: "#d7c5c5ff",
      paper: "#feb1c9ff",
    },
    text: {
      primary: "#ab4e4eff",
      secondary: "#a75a8bff",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h5: { fontWeight: 600 },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
       <ThemeProvider theme={theme}>
        <CssBaseline /> 
          <BrowserRouter>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
                <Route path="/movies/now_playing" element={<NowPlayingMoviesPage />} />
                <Route path="/movies/must-watch" element={<MustWatchPage />} />

                <Route path="/" element={<HomePage />} />
                <Route path="*" element={ <Navigate to="/" /> } />
              </Routes>
            </MoviesContextProvider>
          </BrowserRouter>
        </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};



const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
