import { useState } from 'react';
import './App.css'

const App = ({notes}) => {
  const [note, setNote] = useState(notes);
  const [newNote, setNewNote] = useState('');
  const [v, setV] = useState(false);
  const [opt, setOpts] = useState('ascending')
  const changeNoteValue = event => {
    setNewNote(event.target.value);
    if (event.target.value === ''){
      setV(false);
    }
    else{
      setV(true);
    }
  }
  const onChangeSelect = event => {
    setOpts(event.target.value);
    if (event.target.value == "descendingyear")
    {
      setNote(note.sort((a, b) => {
        if (a.release_date > b.release_date)
            return -1;
        if (a.release_date < b.release_date)
            return 1;
        return 0;
    }))
    }
    else if (event.target.value == "ascendingyear")
    {
      setNote(note.sort((a, b) => {
        if (a.release_date < b.release_date)
            return -1;
        if (a.release_date > b.release_date)
            return 1;
        return 0;
    }))
    }
    else if (event.target.value == "ascendingrating")
    {
      setNote(note.sort((a, b) => {
        if (a.rt_score < b.rt_score)
            return -1;
        if (a.rt_score > b.rt_score)
            return 1;
        return 0;
    }))
    }
    else if (event.target.value == "descendingrating")
    {
      setNote(note.sort((a, b) => {
        if (a.rt_score > b.rt_score)
            return -1;
        if (a.rt_score < b.rt_score)
            return 1;
        return 0;
    }))
    }
    else if (event.target.value == "ascendingtime")
    {
      setNote(note.sort((a, b) => {
        if (a.running_time < b.running_time)
            return -1;
        if (a.running_time > b.running_time)
            return 1;
        return 0;
    }))
    }
    else if (event.target.value == "descendingtime")
    {
      setNote(note.sort((a, b) => {
        if (a.running_time > b.running_time)
            return -1;
        if (a.running_time < b.running_time)
            return 1;
        return 0;
    }))
    }
  }
  return(
    <>
    <form>
      <input value = {newNote} onChange = {changeNoteValue}/>
    </form>
    <select value = {opt} onChange = {onChangeSelect}>
      <option value = "ascendingyear">Ascending (by year)</option>
      <option value = "descendingyear">Descending (by year)</option>
      <option value = "ascendingrating">Ascending (by score)</option>
      <option value = "descendingrating">Descending (by score)</option>
      <option value = "ascendingtime">Ascending (by runtime)</option>
      <option value = "descendingtime">Descending (by runtime)</option>
    </select>
    {note.map(not => <Displayer vari = {v} notes = {not} search = {newNote}/>)}
    </>
  )
}

const Displayer = ({vari, notes, search}) => {
  const [v2, setV2] = useState(true);
  if (vari == true){
      if (notes.title.toLowerCase().includes(search.toLowerCase())){
        return (
          <>
            <div style = {{display: "flex", flexDirection: "row", alignItems: "baseline", gap: "10px"}}>
              <h1 style = {{color: "#fed043"}}>{notes.title}</h1>
              <button onClick = {() => setV2(!v2)}>{v2 && "show"}{!v2 && "hide"}</button>
            </div>
            {!v2 && <Info film = {notes}/>}
          </>
        ) 
      }
  }
  else{
    return(
      <>
        <Info film = {notes}/>
      </>
    )
  }
}

const Info = ({film}) => {
  return(
    <>
    <div className = 'infoBox'>
      <div style = {{display: "grid", gridTemplateColumns: "600px 100px"}}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "baseline", gap: "10px"}}>
          <h1 style = {{color: "#fed043"}}>{film.title}</h1>
          <p style = {{color: "#03b2f8"}}>{film.release_date}</p>
        </div>
        <div>
          <div style = {{display: "grid", gridTemplateRows: "20px 10px"}}>
            <h5 style = {{color: "#d36a2f"}}>Score:</h5>
            <h1 style = {{color: "#fa9825"}}>{film.rt_score}</h1>
          </div>
        </div>
      </div>
      <div className = 'box'>
        <div style = {{display: "flex", flexDirection: "column", position: "relative", bottom: "30px"}}>
          <div>
            <h6 style = {{color: "#ef8df0"}}>{film.original_title}</h6>
            <img src = {film.movie_banner} height = {250} width = {450}/>
            <p style = {{color: "#ef8df0"}}>{film.description}</p>
          </div>
          <div>
            <p style = {{color: "#625a76"}}>{film.running_time} minutes</p>
          </div>
        </div>
      </div>
      <br />
    </div>
    </>
  )
}

export default App;
