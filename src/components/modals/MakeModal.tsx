import React, { useEffect, useState } from 'react'
import './MakeModal.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createNote, getNotes } from '../../reducers/notes/noteSlice';
import AddTagModal from './AddTagModal';

// 노트 쓰기 모달
const MakeModal = ({
  setOpenModal,
}: {setOpenModal: any}) => {

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [addTagMode, setAddTagMode] = useState(false); // 태그 추가/적용 모달 창켜기 토글모드
  const [selectedTag, setSelectedTag] = useState([]); // 적용된 태그 목록

  const notes = useAppSelector(getNotes); // 모든 노트 배열 불러오기
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(selectedTag);
  },[selectedTag])


  // 작성중인 본문 배경색 바꾸기
  const changeBgColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const textBox = document.getElementById("contents-box") as HTMLTextAreaElement;

    switch(e.target.value){
      case "lightcoral":
        console.log(e.target.value);
        textBox.style.backgroundColor = "lightcoral"
        break;
      case "lightblue":
        textBox.style.backgroundColor = "lightblue"
        break;
      case "lightsalmon":
        textBox.style.backgroundColor = "lightsalmon"
        break;
      default:
        textBox.style.backgroundColor = "white"
        break;
    }
  }

  // 노트 객체 생성
  const handleCreate = () => {
    const bgColor = document.getElementById("background") as HTMLSelectElement;
    const priority = document.getElementById("priority") as HTMLSelectElement;

    const args = {
      title: title,
      contents: contents,
      tags: selectedTag,
      priority: priority.options[priority.selectedIndex].value,
      background: bgColor.options[bgColor.selectedIndex].value,
    }

    setOpenModal(false);
    dispatch(createNote(args));
    
  }

  // 적용된 태그 지우기
  const handleDeleteTag = (tag: string) => {
    setSelectedTag(prev => {
      return prev.filter(data => data !== tag);
    })
  }
  
  
    return (
      <div className='modal__background'>
        <div className='modal'>

          <div className='modal-header'>
            <p>노트 생성하기</p>
            <button onClick={() => setOpenModal(false)}>x</button>
          </div>
          
          <div className='modal-content'>
            <input 
              className='title' 
              type='text' 
              onChange={(e) => setTitle(e.target.value)} 
              value={title}
            />
            <textarea 
              name="contents" 
              id="contents-box"
              onChange={(e) => setContents(e.target.value)} 
              cols={30} rows={10} 
            />
            <div className='tag-box'>
              { selectedTag.map((tag, index) => (
                <button key={index} className='tag' onClick={() => handleDeleteTag(tag)}>{tag} x</button>
              ))}
            </div>
          </div>

          <div className='modal-bottom'>
            <button onClick={() => setAddTagMode(true)}>AddTag</button>
            { addTagMode && <AddTagModal selectedTag={selectedTag} setSelectedTag={setSelectedTag} setAddTagMode={setAddTagMode} />}

            <form>
              <label htmlFor="background">배경색</label>
              <select name="bg-color" id="background" onChange={changeBgColor}>
                <option value='white'>White</option>
                <option value='lightcoral'>Red</option>
                <option value='lightblue'>Blue</option>
                <option value='lightsalmon'>Orange</option>
              </select>
            </form>
            <form>
              <label htmlFor="priority">우선순위</label>
              <select name='priority' id='priority'>
                <option value='LOW'>Low</option>
                <option value='HIGH'>High</option>
              </select>
            </form>
            <button onClick={() => handleCreate()}>생성하기</button>
          </div>

        </div>
      </div>
    )
  
}

export default MakeModal;