import React from 'react';
import Categories from '../../assets/Component/Categories';

function About(props) {
    return (
        <div className='pt-20 pb-4 grid place-items-center'>
            <Categories/>
            <div className='w-1/3 grid gap-6 py-8 place-items-center'>
            <h1 className='text-4xl font-bold'>THE STUD-BUD.</h1>
            
            <p className='text-justify text-lg'>Welcome to the About page of StudBud!</p>
            <p className='text-justify text-lg'>StudBud is not just an app; it's your ultimate academic companion, dedicated to keeping students informed and engaged. In the whirlwind of academic life, it's easy to miss important opportunities and updates. That's where StudBud steps in.</p>
            <p className='text-justify text-lg'>Our mission is simple: to provide you with authentic, up-to-date information regarding academics and student life. We understand that staying in the loop is crucial for your academic journey. StudBud ensures you never miss a beat.</p>
            <p className='text-justify text-lg'>What sets StudBud apart is our commitment to your convenience. We know your time is precious. That's why we offer concise summaries for every article we feature. You get a quick overview before you dive into the full article. It's all about putting you in control of your information.</p>
            <p className='text-justify text-lg'>At StudBud, we believe that knowledge is power. That's why we're here to empower you with insights into your academic world. Whether it's the latest updates, opportunities, or student life tips, StudBud is your go-to source.</p>
            <p className='text-justify text-lg'>Stay informed, make the most of your academic journey, and explore endless opportunities with StudBud. Welcome to a world of authentic, relevant information right at your fingertips.</p>

            </div>
            
        </div>
    );
}

export default About;