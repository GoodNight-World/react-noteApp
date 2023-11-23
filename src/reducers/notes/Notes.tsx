import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Note, deleteNote, getNotes, togglePin } from './noteSlice';
import "./Notes.css"

const Notes = ({tag}: {tag: string}) => {
  const notes = useAppSelector(getNotes);
  const dispatch = useAppDispatch();

  // 노트 삭제
  const handleDelete = (note: Note) => {
    dispatch(deleteNote(note));
  }

  // 고정핀 토글 이벤트
  const handlePin = (id: string) => {
    dispatch(togglePin(id))
  }


  //노트 객체
  const noteObject = (note: Note) => {
    return (
      <div key={note.id} className='note__container' style={{backgroundColor: `${note.background}`}} >
        <span id='title__span'>{note.title}</span>
        { note.pin ? 
          <button id='pinned__btn' onClick={() => handlePin(note.id)}>고정됨</button>
          :
          <button id='pin__btn' onClick={() => handlePin(note.id)}>고정</button>
        }
        <span id='priority__span'>{note.priority}</span>
        <div id='contents__div'>{note.contents}</div>
        {note.tags.map(tag => <span className='mini-tag'>{tag}</span>)}
        <div id='date__div'>
          { note.updated_at === "" ? note.created_at : note.updated_at}
          <button className='delete-note__btn' onClick={() => handleDelete(note)}>삭제</button>
        </div>
      </div>
    )
  }

  
  
  if(tag === 'all'){
    const pinnedNotes = notes.filter(note => note.pin)

    return (
      <div className='notes__root'>
        { notes.length > 0 ?
            <div>
              <h3>{`Pinned Notes(${pinnedNotes.length})`}</h3>
              <div className='notes__container pinned'>
                { pinnedNotes.map(note => noteObject(note)) }
              </div>
              <h3>{`All Notes(${notes.length})`}</h3>
              <div className='notes__container'>
                { notes.map(note => noteObject(note)) }
              </div>
            </div>
            :
            <h2>노트가 없습니다.</h2>
        }
      </div>
    )
  } 
  else {
    const filteredNotes = notes.filter(note => note.tags.includes(tag))
    const pinnedFilteredNotes = filteredNotes.filter(note => note.pin)

    return(
      <div className='notes__root'>
        { filteredNotes.length > 0 ?
          <div>
            <h3>{`Pinned Notes(${pinnedFilteredNotes.length})`}</h3>
            <div className='notes__container'>
              { pinnedFilteredNotes.map(note => noteObject(note)) }
            </div>
            <h3>{`All Notes(${filteredNotes.length})`}</h3>
            <div className='notes__container pinned'>
              { filteredNotes.map(note => noteObject(note)) }
            </div>
          </div>
          :
          <h2>노트가 없습니다.</h2>
        }
      </div>
    )
  }
}

export default Notes;
