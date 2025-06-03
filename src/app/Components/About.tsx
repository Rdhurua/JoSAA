import { FiCheckCircle } from 'react-icons/fi';
import { aboutData } from '../utils/Data';
const About = () => {

  return (
 <div className="border-b-2 border-gray-300 w-full bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6 sm:p-10" id="about">
  <section
    
    className=" max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16"
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-700 mb-10 sm:mb-12 text-center">
      About
    </h2>

    <ul className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto">
      {aboutData.map((text, i) => (
        <li key={i} className="flex items-start gap-3 sm:gap-4">
          <FiCheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
          <span className="flex-1">{text}</span>
        </li>
      ))}
    </ul>
  </section>
</div>



  );
};

export default About;
