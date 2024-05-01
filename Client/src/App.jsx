import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BookmarksPage from "./Pages/Bookmarks/BookmarksPage";
import SwiptoryProvider from "./Context/Context";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <BrowserRouter>
      <SwiptoryProvider>
        <ChakraProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/bookmarks" element={<BookmarksPage />} />
          </Routes>
        </ChakraProvider>
      </SwiptoryProvider>
    </BrowserRouter>
  );
};

export default App;
