import CommunityPostAndEditForm from "@components/CommunityPostAndEdit/CommunityPostAndEditForm.tsx";
import {useNavigate} from "react-router";


export default function CommunityPost() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/CommunityList/CommunityDetail');
    };

    return (
        <CommunityPostAndEditForm type={"create"} onSubmit={handleSubmit}/>
    );
}