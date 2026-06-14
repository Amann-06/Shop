const Hero = () => {
  return (
    <div
      className="h-96 rounded-2xl bg-cover bg-center border"
      style={{
        // backgroundImage: 'url("https://www.cnet.com/a/img/resize/7966cdf639d39c5c89baa4e9c576366b13b0419f/hub/2023/04/26/e19ade84-f697-49e4-a1b0-73e09d050f57/moving-boxes-packing-tips-10.jpg?auto=webp&fit=crop&height=675&width=1200")',
      }}
    >
      <div className="h-full flex flex-col py-20 px-10">
        <h1 className="text-4xl font-bold text-white">
          List today. Sell tomorrow.
        </h1>

        <p className="text-white/90 mt-3 max-w-xl">
         From electronics to fashion, discover thousands of listings from real sellers.
        </p>
      </div>
    </div>
  );
};

export default Hero