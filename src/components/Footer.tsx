import chatIcon from '../assets/chat.svg';
import blogIcon from '../assets/blog.svg';
import youtubeIcon from '../assets/youtube.svg';
import instagramIcon from '../assets/instagram.svg';

const socialIcons = [
    {src: chatIcon, alt: '톡톡'},
    {src: blogIcon, alt: '블로그'},
    {src: youtubeIcon, alt: '유튜브'},
    {src: instagramIcon, alt: '인스타그램'},
];

const footerLinks = [
    {label: '개인정보처리방침', href: '#'},
    {label: '이용약관', href: '#'},
    {label: '멘토링지원', href: '#'},
];

export default function Footer() {
    return (
        <footer className="bg-[#222222] text-white px-6 md:px-[80px] py-[80px] mt-[140px] text-sm">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-[48px]">
                <div className="flex flex-col md:flex-row justify-between gap-[48px]">
                    <div className="space-y-3">
                        <h2 className="font-bold text-xl text-white">OZ 오즈코딩스쿨</h2>
                        <ul className="text-[#cfcfcf] space-y-1">
                            <li>초격차캠프</li>
                            <li>사업개발캠프</li>
                            <li>프로덕트 디자이너 캠프</li>
                        </ul>
                    </div>
                </div>
                <hr className="border-gray-600"/>
                <div className="text-[#b0b0b0] space-y-4 leading-relaxed text-sm">
                    <div className="flex justify-between items-center text-white">
                        <div className="flex gap-6 items-center">
                            <div className="flex items-center gap-2.5">
                                {footerLinks.map((link, idx) => (
                                    <a key={idx} href={link.href} className="hover:underline">
                                        {link.label}
                                    </a>))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-0">
                            {socialIcons.map((icon, index) => (
                                <img
                                    key={index}
                                    src={icon.src}
                                    alt={icon.alt}
                                    className="w-5 h-5"
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <p>대표자: 이학범 | 사업자 등록번호 : 540-86-00384 | 통신판매업 신고번호 : 2020-경기김포-3725호</p>
                        <p>주소 : 경기도 김포시 사우중로 87 201호 | 이메일 : kdigital@nextrunners.co.kr | 전화 : 070-4099-8219</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}