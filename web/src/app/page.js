// src/pages/index.js
import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/HeroSection';
import PopularTools from '@/components/PopularTools';
import MoreTools from '@/components/MoreTools';
import Footer from '@/components/layout/Footer';

const HomePage = () => {
return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Work Sans','Noto Sans',sans-serif]">
      <Header />
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <HeroSection />
            <PopularTools />
            <MoreTools />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;