const HowItWorks = () => {
  return (
    <div  id="how-it-works" className="border-b-2 border-gray-400 bg-white p-6 sm:p-10">
  <section
    className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16"
  >
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-700 mb-16 text-center">
      How It Works
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Register",
          desc: "Fill up the form entering your JEE rank, category, and preferences to get started with personalized counselling.",
        },
        {
          title: "One-on-One Call",
          desc: "Get on a direct call with our expert counsellors who will understand your goals and answer your questions.",
        },
        {
          title: "Personalized Guidance",
          desc: "Receive smart, customized college recommendations and a step-by-step counselling strategy just for you.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-blue-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-center min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 text-gray-600 font-bold text-xl flex items-center justify-center mx-auto mb-6">
            {i + 1}
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">{item.title}</h3>
          <p className="text-gray-600 text-base">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
</div>


  );
};

export default HowItWorks;
