import { useParams } from 'react-router-dom';
import FeedbackForm from "../components/FeedbackForm"
function Feedback() {
    const { activityId } = useParams();
    return (
        <div>
            <h1>Feedback for Activity: {activityId}</h1>
            <FeedbackForm activityId={activityId} />
        </div>
    );
}
export default Feedback;