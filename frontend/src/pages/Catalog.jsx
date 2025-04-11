import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { getCategoryDetailsUrl } from '../services/api';
import Card from '../components/course/Card';

const Catalog = () => {
  const { category } = useParams();
  console.log("category", category);

  const [catalogCourse, setCatalogCourse] = useState([]);
  const getCatalogCourse = async () => {
    try {
      const response = await apiConnector("GET", `${getCategoryDetailsUrl}/${category}`);
      console.log("response", response.data.categoryData);
      setCatalogCourse(response.data.categoryData);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCatalogCourse();
  }, [category])
  return (
    <div className='w-full'>
      <h1 className='text-3xl font-bold mb-2'>{catalogCourse.name}</h1>
      <p className='text-gray-600 text-lg mb-4'>{catalogCourse.description}</p>
      <div className='flex flex-wrap gap-2 items-center justify-evenly my-10'>
        {
          catalogCourse?.course?.map((course) => {
            return <Card key={course._id} course={course} />;
          })
        }
      </div>
    </div>
  )
}

export default Catalog

