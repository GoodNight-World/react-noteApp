import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { currentMode, currentTag } from './pageStateSlice'
import './Pages.css'
import MakeModal from '../../components/modals/MakeModal';
import { getNotes } from '../notes/noteSlice';
import Notes from '../notes/Notes';

export default function Pages() {
    const mode = useAppSelector(currentMode);
    const tag = useAppSelector(currentTag);
    const notes = useAppSelector(getNotes);
    const [openModal, setOpenModal] = useState(false);

  return (
    <div className='page-container'>
        <header>
            <span className='page-name'>{ tag === 'all'? mode : tag }</span>
            <button className='modal-btn' onClick={() => setOpenModal(true)}>+</button>
        </header>
        <Notes tag={tag} />
        
        {
            openModal ? <MakeModal setOpenModal={setOpenModal} /> : undefined
        }
    </div>
  )
}
