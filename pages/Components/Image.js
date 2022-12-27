import React from 'react';
import ImageUploading from 'react-images-uploading';

export function ImageUpload() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
    };

    return (
        <div className="border-[2px] border-[#ffcb04] w-[95%] rounded flex justify-center">
            <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="flex text-center">
                        {images.length == 0 ? <button
                            className='h-32'
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button> : ""}
                        &nbsp;
                        {imageList.map((image, index) => (
                            <div key={index} className="pt-2">
                                <div className='w-40 h-40 mx-auto'>
                                    <img src={image['data_url']} alt="" className='h-[100%] mx-auto' />
                                </div>
                                <div className="image-item__btn-wrapper">
                                    <button className='text-white rounded p-2 m-2 bg-[green]' onClick={() => onImageUpdate(index)}>Update</button>
                                    <button className='text-white rounded p-2 m-2 bg-[red]' onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}