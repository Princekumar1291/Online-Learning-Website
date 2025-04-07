import React from 'react'

const TimeLine = () => {
  return (
    <div>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Leadership</time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            We take full responsibility for our actions and decisions, leading by example in the online learning community.
          </p>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Student-Centric</time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Our students will always be our top priority, and we strive to create an environment that fosters their growth and success.
          </p>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Flexibility</time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            We understand the importance of adaptability and provide flexible learning options to meet the diverse needs of our students.
          </p>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Problem Solving</time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            We empower our students to think critically and solve problems effectively, preparing them for real-world challenges.
          </p>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Commitment</time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Our commitment is to provide effective solutions that enhance the learning experience and drive success for our students.
          </p>
        </li>
      </ol>
    </div>
  )
}

export default TimeLine
