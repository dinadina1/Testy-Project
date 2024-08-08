import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllTests } from '../../actions/testActions';
import { getAllQuestions } from '../../actions/questionActions';
import { getAllAuthUsers } from '../../actions/authActions';

const Dashboard = () => {

  const dispatch = useDispatch();
  const { tests = [] } = useSelector(state => state.testState);
  const { questions = [] } = useSelector(state => state.questionState);
  const { users = [] } = useSelector(state => state.authState);

  useEffect(() => {
    dispatch(getAllTests);
    dispatch(getAllQuestions);
    if(users.length === 0){
      dispatch(getAllAuthUsers())
    }
  }, [])

  return (
    <div className="w-full md:w-5/6 ">
      <h1 className="text-2xl md:text-4xl font-bold ps-6 md:ps-8 my-2">Dashboard</h1>
      <div className="container p-5 md:p-5 flex flex-wrap justify-center gap-3">
        <article className="p-5 w-full md:w-1/4 flex flex-col bg-green-500 rounded text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="size-14 my-auto mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <p className="text-lg font-semibold mx-auto">Tests</p>
          <h1 className="text-center text-5xl font-bold">{tests.length}</h1>
          <hr className="my-3" />
          <Link to="/tests" className="flex justify-between">
            <p className="text-md me-2 my-auto">View in Detail</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 my-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </article>
        <article className="p-5 w-full md:w-1/4 flex flex-col bg-red-500 rounded text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-14 my-auto mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <p className="text-lg font-semibold mx-auto">Questions</p>
          <h1 className="text-center text-5xl font-bold">{questions.length}</h1>
          <hr className="my-3" />
          <Link to="/questions" className="flex justify-between">
            <p className="text-md me-2 my-auto">View in Detail</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 my-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </article>
        <article className="p-5 w-full md:w-1/4 flex flex-col bg-blue-400 rounded text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-14 my-auto mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <p className="text-lg font-semibold mx-auto">Users</p>
          <h1 className="text-center text-5xl font-bold">{users.length}</h1>
          <hr className="my-3" />
          <Link to="/users" className="flex justify-between">
            <p className="text-md me-2 my-auto">View in Detail</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 my-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </article>
      </div>

    </div>
  )
}

export default Dashboard