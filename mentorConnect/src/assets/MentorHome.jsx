import photo from '../Photos/Photo.png';
import photo2 from '../Photos/Photo2.png';
import HeaderMentor from "./HeaderMentor";
import HomeComponent from './HomeComponent';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeaderMentor></HeaderMentor>
      
      {/* First Section */}
      <div className='relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
        <div className='container mx-auto px-6 flex items-center justify-center min-h-screen'>
          <div className='flex flex-col md:flex-row items-center justify-between w-full gap-12'>
            <div className='flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 space-y-6'>
              <h1 className='text-5xl lg:text-7xl font-sans font-bold leading-tight text-gray-900'>
                Discover Your Inner<br />
                Strength and Create<br />
                a Life You Love
              </h1>
              <p className='text-xl font-sans leading-relaxed text-gray-600'>
                Life Mentors will guide you through a transformational journey of self-<br />
                discovery, helping you identify your unique gifts and talents
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold 
                hover:bg-blue-700 transition-colors duration-300 mt-6">
                Get Started
              </button>
            </div>
            <div className='w-full md:w-1/2'>
              <div className='relative h-[600px]'>
                <img 
                  src={photo} 
                  alt="Inspirational" 
                  className='w-full h-full object-cover rounded-2xl shadow-xl'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Section */}
      <div className='bg-white py-24'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-16'>
            <div className='w-full md:w-1/2'>
              <div className='relative h-[600px]'>
                <img 
                  src={photo2} 
                  alt="Mentor Connect" 
                  className='w-full h-full object-cover rounded-2xl shadow-xl'
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/10 rounded-2xl" />
              </div>
            </div>
            <div className='flex flex-col text-center md:text-left items-center md:items-start w-full md:w-1/2 space-y-6'>
              <h2 className='text-4xl lg:text-5xl font-semibold leading-tight text-gray-900'>
                Helping You Create A Life<br />
                that Aligns with Your Values<br />
                and Passions
              </h2>
              <p className='text-xl leading-relaxed text-gray-600'>
                MentorConnect was founded by a team of passionate and experienced life coaches<br />
                who believe in the power of personal transformation. We offer a range of<br />
                services to help you ignite your inner fire and create a life you love.
              </p>
              <button className="bg-gray-900 text-white px-8 py-3 rounded-lg text-lg font-semibold 
                hover:bg-gray-800 transition-colors duration-300 mt-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacing */}
      <div className="h-16 bg-gray-50"></div>
      
      {/* Third Section */}
      <HomeComponent />
    </div>
  );
};

export default Home;