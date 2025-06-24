import { useNavigate } from 'react-router-dom';
import CommunityForm from "../components/CommunityPostAndEdit/CommunityForm.tsx";


export default function CommunityPost() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/CommunityList/CommunityDetail');
    };

    return <CommunityForm type="create" onSubmit={handleSubmit} />;
}