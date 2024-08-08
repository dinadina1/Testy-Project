import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { newQuestions } from '../../../actions/questionActions';
import { clearIsQuestionCreated, clearQuestionError } from '../../../slices/questionSlice';

const UploadQuestion = () => {

    const dispatch = useDispatch();
    const { testId } = useParams();
    const { isCreated = false, error = null } = useSelector(state => state.questionState);

    const [data, setData] = useState([]);
    const [uploadError, setUploadError] = useState(null);

    // function to upload file
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });

                // Assuming the data is in the first sheet
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert sheet to JSON
                const sheetData = XLSX.utils.sheet_to_json(sheet);
                setData(sheetData);

            };
            reader.readAsBinaryString(file);
        }
    };

    // function to submit file
    const handleSubmit = (event) => {
        event.preventDefault();

        // check if file selected
        if (!data.length) {
            setUploadError('Please upload a file');
            return toast('Please upload a file', {
                type: 'warning',
                position: 'bottom-center',
            });
        }
        setUploadError(null);

        // check if headers are correct
        const headers = Object.keys(data[0]);
        const expectedHeaders = ['question', 'option1', 'option2', 'option3', 'option4', 'answer', 'difficulty'];
        const headerCheck = headers.every((header) => expectedHeaders.includes(header));
        if (!headerCheck) {
            setUploadError('File headers do not match the expected format');
            return toast('File headers do not match the expected format', {
                type: 'warning',
                position: 'bottom-center',
            });
        }

        // create form data
        let formData = data.map((values) => {
            let options = [
                {
                    optionText: typeof values.option1 === 'string' ? values.option1.replace(/^"|"$/g, '') : values.option1,
                    option: false
                },
                {
                    optionText: typeof values.option2 === 'string' ? values.option2.replace(/^"|"$/g, '') : values.option2,
                    option: false
                },
                {
                    optionText: typeof values.option3 === 'string' ? values.option3.replace(/^"|"$/g, '') : values.option3,
                    option: false
                },
                {
                    optionText: typeof values.option4 === 'string' ? values.option4.replace(/^"|"$/g, '') : values.option4,
                    option: false
                }
            ];

            // find correct optiontext
            let newOptions = options.map((opt) => {
                if (opt.optionText === values.answer) {
                    return {
                        optionText: opt.optionText,
                        option: true
                    }
                }
                return opt;
            })

            // find correct options
            let rightOption = newOptions.map((opt) => {
                return opt.option
            });

            let question = values.question.split(' ');
            question = question.map(word => {
                return word.replace(/^["\\"]|["\\"]$/g, '')
            }).join(' ');

            return {
                questionText: question,
                options: newOptions,
                rightOption: rightOption,
                rightAnswer: typeof values.answer === 'string' ? values.answer.replace(/^"|"$/g, '') : values.answer,
                difficulty: values.difficulty
            }
        })

        dispatch(newQuestions(testId, formData));
    }

    useEffect(() => {
        if (isCreated) {
            toast('Questions Uploaded Successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearIsQuestionCreated())
            });
            setData([]);
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearQuestionError())
            });
        }
    }, [dispatch, isCreated, error]);

    return (
        <div className="flex flex-col items-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileInput">
                        Choose Excel File
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />

                    {
                        uploadError && <div className='text-red-500 text-sm'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block my-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            <span className='my-auto ms-1'>{uploadError}</span>
                        </div>
                    }
                </div>
                {/* Display sample format and format description */}
                <div className="mb-4">
                    <p className="text-gray-600 text-sm">Ensure your Excel file matches the following format:</p>
                    <img src="/images/excel-format.png" alt="Sample Format" className="w-full h-auto mt-2" />
                </div>
                <div className="mb-4">
                    <p className="text-gray-600 text-sm">
                        <b>Format Description:</b> The first row should contain headers like "question", "option1", "option2", "option3", "option4", "answer", "difficulty".
                        Each subsequent row should contain the corresponding data.
                    </p>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UploadQuestion;
