const Hero = () => {
  return (
    <div
      className="h-96 z-0 rounded-2xl bg-cover bg-center border relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&auto=format&fit=crop")',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded-2xl" />

      <div className="relative h-full flex flex-col justify-center px-10">
        <span className="text-xs font-medium text-white/70 uppercase tracking-widest mb-3">
          Shopyy Marketplace
        </span>
        <h1 className="text-4xl font-bold text-white leading-tight max-w-md">
          List today.<br />Sell tomorrow.
        </h1>
        <p className="text-white/80 mt-3 max-w-sm text-sm leading-relaxed">
          From electronics to fashion, discover thousands of listings from real sellers.
        </p>
        <div className="flex gap-3 mt-6">
          <button className="bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
            Shop now
          </button>
          <button className="border border-white/40 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
            Sell an item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;