import { useNavigate } from 'react-router-dom';
import CommunityForm from "../components/CommunityPostAndEdit/CommunityForm.tsx";

export default function CommunityEdit() {
    const navigate = useNavigate();
    const handleUpdate = () => {
        navigate(`/CommunityList/CommunityDetail`);
    };
    return <CommunityForm type="edit" onSubmit={handleUpdate} />;
}