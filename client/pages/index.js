import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = new io("http://localhost:8000");

const Home = () => {
  const [value, setvalue] = useState("")
  const [allValues, setallValues] = useState([]);

  const sendTodo = () => {
    socket.emit("sendMessage", value);

    socket.on('serverMessage', data => {
      setallValues([...allValues, data])
      // console.log(data)
    })
  }

  socket.on('serverMessage', data => {
    setallValues([...allValues, data])
    // console.log(data)
  })

  useEffect(() => {
    socket.on('serverMessage', data => {
      // console.log(data)
      setallValues([...allValues, data])
    })
  }, [])

  // console.log(allValues)

  const formHandler = e => {
    e.preventDefault()
    sendTodo()
    setvalue("")
  }

  return (
    <div>
      <form onSubmit={formHandler}>
        <input type="text" placeholder="Add input" value={value} onChange={e => setvalue(e.target.value)} />
        <button type="button" >Add Todo</button>
      </form>
      <ul>
        {allValues.map((val, index) => (
          <li key={index}>{val.data}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
