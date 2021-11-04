import React, { useState, useEffect } from 'react'

// These are our components
import ProjectCard from '../components/ProjectCard/ProjectCard'

const HomePage = () => {
  // set projectList as an empty array in our state
  const [projectList, setProjectList] = useState([]);

  // fetches our project list from our API, returns the results in json format
  // then sets the project data in our state so we can use it in our app
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

  // commenting out the createProject function below - as we have created a new page for this

  // const [ name, setName ] = useState('')

  // const createProject = async (e) => {
  //   e.preventDefault()
  //   const project = {
  //     title: name,
  //     dare_description: 'Eat 100 Donuts',
  //     rules: 'No cheating',
  //     goal: 100,
  //     image: 'https://img.taste.com.au/woHAgdO6/w720-h480-cfill-q80/taste/2016/11/cinnamon-donuts-15520-1.jpeg',
  //     is_open: true,
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     date_for_dare: new Date(),
  //     for_charity: 'Tanda',
  //     charity_url: 'https://my.tanda.co'
  //   }

  //   await fetch(`${process.env.REACT_APP_API_URL}projects/`, {
  //     method: "post",
  //     headers: {
  //       "Authorization": `Token ${window.localStorage.getItem('token')}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(project),
  //   })
  // }

  const token = window.localStorage.getItem('token')
  return (
    <div>
      {
        token ? (
          <div> 
            <h1> Token exists in local storage </h1>
            {/* <form onSubmit={createProject}>
              <div>
                <label htmlFor="username">Enter Project Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </form> */}
          </div>
        ) : null
      }

      {/* mapping over our projectList from state */}
      <div id="project-list">
        {projectList.map((project, key) => {
          return (
            <div key={key}>
              <ProjectCard projectData={project}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage
