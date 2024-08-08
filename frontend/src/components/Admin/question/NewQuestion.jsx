import React, { useState } from 'react'
import Sidebar from '../../layout/Sidebar'
import WriteQuestion from './WriteQuestion';
import UploadQuestion from './UploadQuestion';

const NewQuestion = () => {

    const [questioncreateWay, setQuestionCreateWay] = useState(true);

    const changeWayToCreateQuestion = () => {
        setQuestionCreateWay(!questioncreateWay);
    }

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <div className='w-full bg-gray-50'>
                    <h1 className="text-left text-3xl md:text-4xl ms-2 md:ms-16 text-gray-800 font-bold pt-5  ">Create New Question</h1>
                    <div className='flex gap-6 ms-2 md:ms-16 mt-5'>
                        <button disabled={questioncreateWay?true:false} onClick={changeWayToCreateQuestion} className={questioncreateWay? ' font-bold text-green-600 underline text-md md:text-lg': 'text-gray-500 font-semibold hover:underline text-md md:text-lg'}>Write questions</button>
                        <button disabled={!questioncreateWay?true:false} onClick={ changeWayToCreateQuestion} className={!questioncreateWay? ' font-bold text-green-600 underline text-md md:text-lg': 'text-gray-500 font-semibold hover:underline text-md md:text-lg'}>Upload questions</button>
                    </div>

                    {
                        questioncreateWay ? (
                            <WriteQuestion />
                        ) : (
                            <UploadQuestion />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default NewQuestion