import Content from "../components/CommunityPostAndEdit/Content.tsx";
import Header from "../components/CommunityPostAndEdit/Header.tsx";
import Button from "../components/CommunityPostAndEdit/Button.tsx";

export default function CommunityPost() {
  return (
      <div>
        <Header />
        <Content />
        <Button text={"완료"}/>
      </div>
  )
      ;
}