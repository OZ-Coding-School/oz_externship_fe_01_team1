import { useNavigate } from 'react-router-dom';
import CommunityPostAndEditForm from "../components/CommunityPostAndEdit/CommunityPostAndEditForm.tsx";


export default function CommunityPost() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/CommunityList/CommunityDetail');
    };

    return <CommunityPostAndEditForm type="create" onSubmit={handleSubmit} />;
}