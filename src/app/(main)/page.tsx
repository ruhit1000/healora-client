import Categories from '@/components/homepage/Categories';
import Features from '@/components/homepage/Features';
import Hero from '@/components/homepage/Hero';
import Highlights from '@/components/homepage/Highlights';
import Services from '@/components/homepage/Services';
import React from 'react';

const page = () => {
    return (
        <div>
            <Hero />
            <Features />
            <Services />
            <Categories />
            <Highlights />
        </div>
    );
};

export default page;