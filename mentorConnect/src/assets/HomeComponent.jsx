import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import photo3 from '../Photos/Photo3.png'; // Ensure the correct extension

const HomeComponent = () => {
  const percentage = 92;
  const percentage2 = 87;

  return (
    <div className='flex flex-row items-center justify-center w-full h-screen bg-gray-100'>
      <div className='flex flex-col w-full md:w-8/12 lg:w-6/12 items-center '>
        {/* Title and Description */}
        <div className='mb-8 '>
          <div className='text-6xl font-semibold mb-6'>
            Your Source for Personal and<br />
            Professional Development
          </div>
          <div className='text-2xl leading-relaxed'>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium<br />
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore<br />
            veritatis et quasi architecto beatae vitae dicta.
          </div>
        </div>

        {/* Progress Bars */}
        <div className='flex flex-row space-x-12 justify-center mt-5'>
          {/* First Progress Bar with Text */}
          <div className='flex flex-col items-center'>
            <div className='w-3/5'>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div className='mt-4 text-3xl font-semibold text-center'>
              Private<br /> Coaching
            </div>
          </div>

          {/* Second Progress Bar with Text */}
          <div className='flex flex-col items-center'>
            <div className='w-3/5'>
              <CircularProgressbar value={percentage2} text={`${percentage2}%`} />
            </div>
            <div className='mt-4 text-3xl font-semibold text-center'>
              Group<br /> Program
            </div>
          </div>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className='w-full md:w-4/12 lg:w-4/12'>
        <img src={photo3} alt="Personal Development" className='w-full h-auto object-cover' />
      </div>
    </div>
  );
};

export default HomeComponent;
