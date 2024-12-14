import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Adminlogin from './components/Adminlogin';
import Adminsignup from './components/Adminsignup';
import Feeds from './components/Feeds';
import Explore from './components/Explore';
import Contact from './components/Contact';
import Guides from './components/Guides';
import About from './components/About';
import Privacypolicy from './components/Privacypolicy';
import Toprated from './components/Toprated';
import Hidenavbar from './components/Hidenavbar';
import Hidesidebar from './components/Hidesidebar';
import CreateBlogPost from './components/CreateBlogPost';
import PostDetails from './components/PostDetails';
import Myblog from './components/Myblog';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#000005] text-white min-h-screen">
      <BrowserRouter>
        <Hidenavbar />
        <Hidesidebar />
        <div className="flex pt-[70px]">
          <main className="flex-1 ml-0 md:ml-[240px] p-6">
            <Routes>
              <Route path="/login" element={<Adminlogin />} />
              <Route path="/signup" element={<Adminsignup />} />
              <Route path="/" element={<Feeds />} />
              <Route path="/explore/:search" element={<Explore />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/about" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/myblog" element={<Myblog />} />
              <Route path="/createblog" element={<CreateBlogPost />} />
              <Route path="/toprated" element={<Toprated />} />
              <Route path="/privacypolicy" element={<Privacypolicy />} />
              <Route path="/post/:postId" element={<PostDetails />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
