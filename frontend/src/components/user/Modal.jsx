import React from 'react'

const Modal = ({submitResponses}) => {


    return (
        <div
            id="modal-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50 hidden"
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Confirmation</h2>
                    <hr />
                </div>

                <div className="mb-6">
                    <p>Are you sure you want to submit your answers?</p>
                </div>

                <div className="flex justify-end">
                    <button
                        id="cancel-button"
                        className="text-xl text-gray-600 px-4 py-2 font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        id="confirm-button"
                        className="text-xl text-green-600 px-4 py-2 font-semibold"
                        onClick = {submitResponses}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Modal