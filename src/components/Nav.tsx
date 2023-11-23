import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setTag, tags } from '../reducers/pageState/pageStateSlice';
import './Nav.css';
import AddTagModal from './modals/AddTagModal';
import EditTagModal from './modals/EditTagModal';

const Nav = () => {
    const dispath = useAppDispatch();
    const tagArr = useAppSelector(tags);

    const [i, setI] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [clicked, setClicked] = useState(0)


    const clickedMenu = (index: number) => {
        const item = document.getElementsByClassName('menu-item');
        item[index].classList.add('current');

        setClicked(prev => {
            item[prev].classList.remove('current');
            return index;
        })
    }

  return (
    <div className='side-nav'>
        <div className='menu-item current' onClick={ () => {
                dispath(setTag('all'))
                clickedMenu(0)
         }}>
            ✉︀Notes
        </div>
        { tagArr.map((tag, index) => (
            <div className='menu-item' key={index} onClick={() => {
                dispath(setTag(tag))
                clickedMenu(index+1)
            }}>
                {tag}
            </div>
        ))}
        <div className='menu-item' onClick={() => {
            setOpenModal(true);
            clickedMenu(i);
        }}>
            ✎Edit Notes
        </div>

        { openModal && <EditTagModal setOpenModal={setOpenModal} />}

        <div className='menu-item'>
            ☁︎Archive
        </div>

        <div className='menu-item'>
            \̅_̅/̷̚Trash
        </div>
    </div>
  )
}

export default Nav