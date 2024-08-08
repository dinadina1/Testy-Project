import { useSelector } from "react-redux"
import Loader from "../layout/Loader";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedTestRoute ({children}) {
    const {testId} = useParams();
    const {isAuthUser, question, test, loading, error, isTestSubmitted} = useSelector(state => state.userState);

    if(loading && !question && !test){
        return <div className="flex justify-center mt-9">
            <Loader/>
        </div>
    }

    if(isAuthUser){
        return children
    }

    if(!isAuthUser || error){
        sessionStorage.removeItem('userInfo')
        return <Navigate to={`/instruction/${testId}`}/>
    }

    if(isTestSubmitted){
        return <Navigate to={`/test/submit`}/>
    }

}