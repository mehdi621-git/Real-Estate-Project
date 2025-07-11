import React from 'react'

const About = () => {
  return (
 <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 my-8 mx-auto max-w-3xl">
  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 flex items-center gap-2">
    🏠 About Me
  </h2>
  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
    Welcome! I'm <span className="font-semibold text-slate-900">[Your Name]</span>, the creator of this real estate platform — a place where finding your next home, investment property, or rental becomes easier, faster, and more transparent.
  </p>
  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
    With a strong focus on user experience and modern technology, I built this project to simplify how people browse, compare, and connect with property listings. Whether you're buying, selling, or just exploring the market, my goal is to provide a smooth, trustworthy experience.
  </p>
  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
    I’m passionate about blending real estate insights with smart design and reliable backend systems — ensuring everything from image galleries to filters works just the way you expect.
  </p>
  <p className="mt-6 text-slate-600 font-medium">
    Thanks for visiting. Let’s help you find your next great space!
  </p>
</div>

  )
}

export default About