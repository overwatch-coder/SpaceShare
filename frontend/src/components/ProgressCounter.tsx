const ProgressCounter = () => {
  return (
    <section className="flex flex-col md:flex-row md:items-center gap-5 md:gap-16 md:justify-center py-5 text-center">
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-5xl text-black">110</h3>
        <p className="font-medium">Houses</p>
      </div>

      <div className="mx-auto md:mx-0 w-40 md:w-[0.5px] h-[0.5px] md:h-20 bg-black/50" />

      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-5xl text-black">52</h3>
        <p className="font-medium">Apartments</p>
      </div>

      <div className="mx-auto md:mx-0 w-40 md:w-[0.5px] h-[0.5px] md:h-20 bg-black/50" />
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-5xl text-black">615</h3>
        <p className="font-medium">Satisfied Guests</p>
      </div>

      <div className="mx-auto md:mx-0 w-40 md:w-[0.5px] h-[0.5px] md:h-20 bg-black/50" />
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-5xl text-black">98</h3>
        <p className="font-medium">Happy Owners</p>
      </div>
    </section>
  );
};

export default ProgressCounter;
