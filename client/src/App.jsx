import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [audioUrl, setAudioUrl] = useState("")
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTranscription()
  }, [])

  const convertTranscription = async () => {

    if (audioUrl.trim() === "") {
      alert("URL is required.")
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/transcription`,
        { audioUrl }
      )

      if (res.status === 201) {
        setAudioUrl("")
        getTranscription()
      }
    } catch (err) {
      console.log(err)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  const getTranscription = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transcription`
      )

      if (res.status === 200) {
        setList(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <input
        type='text'
        value={audioUrl}
        placeholder="Enter audio URL"
        onChange={(e) => setAudioUrl(e.target.value)}
      />

      <button onClick={convertTranscription} disabled={loading}>
        {loading ? "Processing..." : "Convert"}
      </button>

      <br /><br />

      <div>
        {list.length === 0 ? (
          <p>No Data Found</p>
        ) : (
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>audioUrl</th>
                <th>transcription</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p, i) => (
                <tr key={i}>
                  <td>{p.audioUrl}</td>
                  <td>{p.transcription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default App
