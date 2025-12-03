export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative flex flex-col md:flex-row items-center justify-between 
      px-4 sm:px-8 md:px-16 lg:px-20 overflow-hidden min-h-[90vh] mb-0 pb-0">
        
        {/* Background Video */}
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/Bk.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>

        {/* Left Content */}
        <div className="relative z-20 max-w-xl text-center md:text-left text-white mt-20 md:mt-0 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#6B8E23]">
            Welcome to GillMart
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Sales 30% off on Everything
          </h2>
          <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed">
            Discover amazing deals on fashion, electronics, and more. 
            Shop smart, shop with GillMart!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <a href="/shop" className="bg-[#6B8E23] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#7FA935] transition duration-300 ease-in-out cursor-pointer text-sm sm:text-base w-full sm:w-auto">
              Shop Now
            </a>
            <a href="/about" className="bg-white text-[#6B8E23] px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer text-sm sm:text-base w-full sm:w-auto">
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative z-20 mt-10 md:mt-0 flex justify-center md:justify-end">
          <img
            src={"/images/Home.png"}
            alt="Shopping"
            className="rounded-xl w-[220px] sm:w-[300px] md:w-[360px] lg:w-[420px] h-auto object-contain"
          />
        </div>
      </section>
    </div>
  )
}
