"use client"

import { useState } from 'react';
import addPages from '@/app/functions/addPages';
import ImageUploading from 'react-images-uploading';


export function Upload({book}) {

  const [images, setImages] = useState([]);

  const maxNumber = 100;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList)
    setImages(imageList);
  };

  const addAll = async () => {
    const res = await addPages(images, book)

    console.log(res)

  }

  return (
    <div className="w-full">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
    
          <div className="flex flex-col gap-6 p-4 w-full mx-auto max-w-150">

            <div className='flex flex-col gap-6 justify-between shadow-div items-center bg-white p-5 rounded-xl w-full'>
                <button className='cursor-pointer border w-full border-dashed p-5 rounded-xl' 
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                >
                Kliknij lub przeciągnij tutaj
                </button>

                <div style={{display: images.length ? "flex" : "none"}} className='w-full gap-4'>
                    <button className='px-5 w-full cursor-pointer py-2.5 bg-red-600 rounded-full text-white' onClick={onImageRemoveAll}>Usuń wszystko</button>
                    <button className='px-5 w-full cursor-pointer py-2.5 bg-blue-600 rounded-full text-white' onClick={addAll}>Dodaj wszystko</button>
                </div>
            </div>
           
            <div className='flex flex-wrap items-start justify-between w-full gap-6'>
                {imageList.map((image, index) => (
                <div key={index} className="flex flex-col w-full justify-between max-w-43 shadow-div bg-white rounded-xl">
                    <img className='w-full object-cover rounded-t-xl' src={image['data_url']} alt="" />
                    <div className="flex justify-between p-4 gap-2">
                        <button className='text-blue-600 cursor-pointer underline' onClick={() => onImageUpdate(index)}>Zaaktualizuj</button>
                        <button className='text-red-600 cursor-pointer underline' onClick={() => onImageRemove(index)}>Usuń</button>
                    </div>
                </div>
                ))}
            </div>
            
          </div>
        )}
      </ImageUploading>
      
    </div>
  );
}