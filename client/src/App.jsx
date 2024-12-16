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
import Explorepost from './components/Explorepost';
import Exploreuser from './components/Exploreuser';
import Exploreuserpost from './components/Exploreuserpost';

function App() {
  return (
      <BrowserRouter>
        <Hidenavbar />
        <Hidesidebar />
        <div className="flex bg-[#F5F5F5]">
          <main className="flex-1 ml-0 p-6">
            <Routes>
              <Route path="/login" element={<Adminlogin />} />
              <Route path="/signup" element={<Adminsignup />} />
              <Route path="/" element={<Feeds />} />
              <Route path="/explore/:search" element={<Explore />} />
              <Route path="/explore/post/:search" element={<Explorepost />} />
              <Route path="/explore/user/:search" element={<Exploreuser />} />
              <Route path="/explore/user/post/:username/:userid" element={<Exploreuserpost />} />
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
  );
}

export default App;
