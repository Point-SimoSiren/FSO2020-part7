import React, { useState } from 'react'
import  { useField } from './hooks/Index' // Custom hook
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
  useHistory,
} from "react-router-dom"

const Notification = ({ message }) => (
  <h1 style={{ color: 'red', background: 'black' }}>{message}</h1>
)

const CreateNew = ({ addNew, setNotification }) => {
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
    setNotification(`New anecdote ${content.value}  added!`)

    setTimeout(() => {
      setNotification("You can see it listed now!")
    }, 4000)

    setTimeout(() => {
      setNotification("")
    }, 9000)

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={() => {content.clear(); author.clear(); info.clear()}}>reset</button>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>Author: {anecdote.author}</div>
      <div>Info: {anecdote.info}</div>
      <div>Votes: {anecdote.votes}</div>
    </div>
  )
}


const Menu = ({ addNew, anecdotes, setNotification }) => {
  const padding = {
    paddingRight: 5
  }

  const match = useRouteMatch('/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null


  return (
    <div>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Switch>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/create">
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>

        <Route path="/:id">
          <Anecdote anecdote={anecdote} />
        </Route>

        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>

      </Switch>

    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
    such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)


const Footer = () => (
  <div style={{ marginTop: 200 }}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)



const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)


  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} setNotification={setNotification} />
      <Notification message={notification} />
      <Footer />
    </div>
  )
}

export default App