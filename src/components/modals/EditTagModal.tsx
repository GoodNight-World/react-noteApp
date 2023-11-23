import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTag, pushTag, tags } from '../../reducers/pageState/pageStateSlice';
import './EditTagModal.css';

const EditTagModal = ({setOpenModal}: any) => {
    
    const allTags = useAppSelector(tags); // 모든 태그 배열 불러오기
    const dispatch = useAppDispatch();

    // 새로운 태그 추가 이벤트
    const createTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            console.log(e.currentTarget.value);
            dispatch(pushTag(e.currentTarget.value));
        }
    }
    
    // 모달창 끄기 이벤트
    const exitAddTag = () => {
        setOpenModal(false);
    }

  return (
    <div className='editTag__background'>
        <div className='editTag__container'>
            <input type='text' onKeyUp={createTag} placeholder='태그 생성(이름 넣고 Enter)' />
            <button onClick={() => exitAddTag()}>x</button>
            { allTags.map((tag, index) => (
                <div key={index} className='editTag__row'>
                    <span>{tag}</span>
                    <button onClick={() => dispatch(deleteTag(tag))}>x</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EditTagModal;