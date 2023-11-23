import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { pushTag, tags } from '../../reducers/pageState/pageStateSlice';
import './AddTagModal.css'

// 태그 생성 및 적용 모달
const AddTagModal = ({selectedTag ,setSelectedTag, setAddTagMode}: {selectedTag: string[], setSelectedTag: any, setAddTagMode: any}) => {

    const allTags = useAppSelector(tags); // 모든 태그 배열 불러오기
    const dispatch = useAppDispatch();
    
    // 태그 적용, 미적용 토글 이벤트
    const handlePlus = (tag: string) => {
        setSelectedTag((prev: string[]) => {
            return [...prev, tag]
        })
    }
    const handleMinus = (tag: string) => {
        setSelectedTag((prev: string[]) => {
            return prev.filter((item) => item !== tag)
        })
    }

    // 새로운 태그 추가 이벤트
    const createTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            console.log(e.currentTarget.value);
            dispatch(pushTag(e.currentTarget.value));
        }
    }

    // 모달창 끄기 이벤트
    const exitAddTag = () => {
        setAddTagMode(false);
    }

  return (
    <div className='addTag__background'>
        <div className='addTag__container'>
            <input type='text' onKeyUp={createTag} placeholder='태그 생성(이름 넣고 Enter)' />
            <button onClick={() => exitAddTag()}>x</button>
            { allTags.map((tag, index) => (
                <div key={index} className='addTag__row'>
                    <span>{tag}</span>
                    { selectedTag.includes(tag) ? 
                        <button className={`${tag}`} onClick={() => handleMinus(tag)}>-</button>
                        :
                        <button className={`${tag}`} onClick={() => handlePlus(tag)}>+</button>
                    }
                </div>
            ))}
        </div>
    </div>
  )
}

export default AddTagModal