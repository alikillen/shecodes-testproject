import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateProjectForm = () => {
  const history = useHistory();
  // initialising our projectinfo as empty strings in state
  const [projectInfo, setProjectInfo] = useState({
    title: '',
    description: '',
    goal: '',
    is_open: '',
    image: '',
  });

  // when inputs on our form change, set them in state
  const handleChange = (event) => {
    const { id, value } = event.target;
    setProjectInfo((prevProject) => {
      return {
        ...prevProject,
        [id]: value,
      };
    });
  };

  // asynchronous postData function
  const postData = async () => {
    console.log('Im posting a project to your API');
    const token = window.localStorage.getItem('token');
    // console logging the token because we had trouble getting it working for authentication for our post req.
    // its possible you could trim your token to make sure it has no whitespace before you set it in localstorage when you login
    console.log("What is token: ", token)

    const response = await fetch(`${process.env.REACT_APP_API_URL}projects/`, {
      method: 'post',
      headers: {
        "Authorization": `Token ${token}`,
        'Content-Type': 'application/json',
      },
      // we are currently just sending a test body object to see if the post req is possible
      // need to send projectInfo object from state instead
      body: JSON.stringify({
        title: "Hello",
        date_created: new Date(),
        description: "Hello Alison",
        goal: 12,
        is_open: true,
        image: 'https://www.google.com/'
      }),
    });

    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // we added an extra check here to confirm token exists before posting but removed it while debugging
    // if (window.localStorage.getItem('token')) {
    postData().then((response) => {
      console.log('response from our API --------', response);
      // window.localStorage.setItem('token', response.token);
      // history.push('/');
    });
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>currently this form button only sends the test object in createProjectForm.jsx</h2>
      <h3>see console log</h3>
      <div>
        <label htmlFor='projectTitle'>Project Title:</label>
        <input
          type='text'
          id='title'
          placeholder='Enter project title'
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='projectDescription'>Project Description:</label>
        <input
          type='text'
          id='description'
          placeholder='Enter project description'
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='projectGoal'>Project Goal:</label>
        <input
          type='text'
          id='goal'
          placeholder='Enter project goal'
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='projectImage'>Project Image:</label>
        <input
          type='text'
          id='image'
          placeholder='enter project Image as string - test'
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='projectIsOpen'>Project Is Open?</label>
        <input
          type='text'
          id='is_open'
          placeholder='is_open'
          onChange={handleChange}
        />
      </div>

      <button type='submit'>Submit New Project</button>
    </form>
  );
};

export default CreateProjectForm;
