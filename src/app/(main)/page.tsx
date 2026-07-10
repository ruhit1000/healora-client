import Categories from '@/components/homepage/Categories';
import Features from '@/components/homepage/Features';
import Hero from '@/components/homepage/Hero';
import Highlights from '@/components/homepage/Highlights';
import Newsletter from '@/components/homepage/Newsletter';
import Services from '@/components/homepage/Services';
import Statistics from '@/components/homepage/Statistics';
import Testimonials from '@/components/homepage/Testimonials';
import React from 'react';

const page = () => {
    return (
        <div>
            <Hero />
            <Features />
            <Services />
            <Categories />
            <Highlights />
            <Statistics />
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default page;