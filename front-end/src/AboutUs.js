import { useState, useEffect } from 'react'
import myPhoto from './myPhoto.jpg'

/**
 * A React component that fetches and displays the "About Us" content.
 */
const AboutUs = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Make a GET request to our new back-end route
    fetch('http://localhost:5002/about-data') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(jsonData => {
        setData(jsonData)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load About Us content.')
      })
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (!data) {
    return <div>Loading About Us...</div>
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{data.title}</h1>
      {data.paragraphs.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
        <img
        src={myPhoto}
        alt="description"
        style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
            maxWidth: '300px',
            height: 'auto',
        }}
        />
    </div>
  )
}

export default AboutUs
