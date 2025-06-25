import { useNavigate } from 'react-router-dom';
import CommunityPostAndEditForm from "../components/CommunityPostAndEdit/CommunityPostAndEditForm.tsx";

export default function CommunityEdit() {
    const navigate = useNavigate();
    const handleUpdate = () => {
        navigate(`/CommunityList/CommunityDetail`);
    };
    return <CommunityPostAndEditForm type="edit" onSubmit={handleUpdate} />;
}