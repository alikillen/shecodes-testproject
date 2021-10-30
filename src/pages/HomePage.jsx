import React, { useState, useEffect } from 'react'

// These are our components
import ProjectCard from '../components/ProjectCard/ProjectCard'

const HomePage = () => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}dares`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);


  const [ name, setName ] = useState('')

  const createProject = async (e) => {
    e.preventDefault()
    const project = {
      title: name,
      dare_description: 'Eat 100 Donuts',
      rules: 'No cheating',
      goal: 100,
      image: 'https://img.taste.com.au/woHAgdO6/w720-h480-cfill-q80/taste/2016/11/cinnamon-donuts-15520-1.jpeg',
      is_open: true,
      created_at: new Date(),
      updated_at: new Date(),
      date_for_dare: new Date(),
      for_charity: 'Tanda',
      charity_url: 'https://my.tanda.co'
    }

    await fetch(`${process.env.REACT_APP_API_URL}dares/`, {
      method: "post",
      headers: {
        "Authorization": `Token ${window.localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
  }

  const token = window.localStorage.getItem('token')
  return (
    <div>
      {
        token ? (
          <div> 
            <h1> You're Logged IN!</h1>
            <form onSubmit={createProject}>
              <div>
                <label htmlFor="username">Enter Project Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </form>
          </div>
        ) : null
      }
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
