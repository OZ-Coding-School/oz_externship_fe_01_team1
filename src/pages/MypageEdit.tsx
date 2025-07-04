import profile from '../assets/mypage/profile.svg';
import camera from '../assets/mypage/camera.svg';

import {useState, useEffect, useRef} from "react";

export default function MyPageEdit() {
    const [nickname, setNickname] = useState("오즈오즈");
    const [phoneNumber, setPhoneNumber] = useState("010-1234-1234");
    const [showVerification, setShowVerification] = useState(false);
    const [timer, setTimer] = useState(300);
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState<'idle' | 'send' | 'resend'>('idle');
    const [status, setStatus] = useState<'success' | 'error' | null>(null);
    const [profileImage, setProfileImage] = useState(profile);
    const [duplicateCheckStatus, setDuplicateCheckStatus] = useState<'default' | 'active' | 'success' | 'error'>('default');

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (status === 'success') return;
        let id: NodeJS.Timeout;
        if ((step === 'send' || step === 'resend') && showVerification && timer > 0) {
            id = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(id);
    }, [step, timer, status, showVerification]);

    return (
        <div className="flex max-w-[1200px] mx-auto mt-[80px] mb-[80px]">
            {/* Sidebar */}
            <div className="w-[200px] mr-[40px] text-sm">
                <div className="flex flex-col gap-6">
                    <div className="text-[#000] font-semibold">쪽지 시험</div>
                    <div className="text-[#5F00FF] font-bold border-l-2 border-[#5F00FF] pl-2">내 정보</div>
                    <div className="text-[#000] font-semibold">비밀번호 변경</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white shadow-md rounded-lg p-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-black">내 정보</h1>
                    <button
                        className="bg-[#5F00FF] hover:bg-[#4900CC] text-white font-medium py-[10px] px-[24px] text-sm rounded">
                        저장하기
                    </button>
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-[#5F00FF] mb-4">프로필 수정</h2>
                    <hr/>
                </div>

                {/* Profile Image */}


                <div className="relative w-[120px] h-[120px] rounded-full mx-auto mb-6 mt-[52px]"
                     style={{backgroundColor: "#EDE7F6"}}>
                    <img src={profileImage} alt="profile" className="w-full h-full object-cover rounded-full"/>
                    <div
                        className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[#D1C4E9] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            if (fileInputRef.current) {
                                fileInputRef.current.click();
                            }
                        }}
                    >
                        <img src={camera} alt="edit" className="w-4 h-4"/>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const previewUrl = URL.createObjectURL(file);
                                setProfileImage(previewUrl);
                            }
                        }}
                    />
                </div>

                {/* Profile Section */}
                <section className="mb-10 border-b border-[#e5e5e5] pb-6">

                    <div className="flex flex-col gap-4">
                        <label className="text-sm text-[#333]">닉네임</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className={`rounded px-4 py-2 w-full text-sm border ${
                                    duplicateCheckStatus === 'success'
                                        ? 'border-green-500'
                                        : duplicateCheckStatus === 'error'
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                }`}
                                placeholder="오즈오즈"
                            />
                            <button
                                className={`
                                  px-4 py-2 h-[40px] rounded text-sm whitespace-nowrap border
                                  ${
                                    duplicateCheckStatus === 'active' ? 'text-[#5F00FF] border-[#5F00FF] bg-[#EFE6FC]'
                                        : duplicateCheckStatus === 'success' ? 'text-green-600 border-green-400 bg-white'
                                            : duplicateCheckStatus === 'error' ? 'text-red-500 border-red-400 bg-white'
                                                : 'text-[#4D4D4D] border-[#D1D1D1] bg-[#D1D1D1]'
                                }
                                `}
                                onClick={() => {
                                    setDuplicateCheckStatus('active');
                                    setTimeout(() => {
                                        if (!nickname.trim()) {
                                            setDuplicateCheckStatus('error');
                                            return;
                                        }
                                        const koreanLength = nickname.replace(/[^\uAC00-\uD7A3]/g, '').length;
                                        const otherLength = nickname.replace(/[\uAC00-\uD7A3]/g, '').length;

                                        const hasSpecialChar = /[^a-zA-Z0-9가-힣]/.test(nickname);
                                        if (hasSpecialChar) {
                                            setDuplicateCheckStatus('error');
                                            return;
                                        }

                                        if (nickname === '오즈오즈') {
                                            setDuplicateCheckStatus('error');
                                        } else if (koreanLength > 8 || otherLength > 16) {
                                            setDuplicateCheckStatus('error');
                                        } else {
                                            setDuplicateCheckStatus('success');
                                        }
                                    }, 500);
                                }}
                            >
                                중복확인
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">
                            *한글 8자, 영문 및 숫자 16자까지 혼용할 수 있어요.
                        </p>
                        {duplicateCheckStatus === 'success' && (
                            <p className="text-green-600 text-sm mt-1">✅ Success</p>
                        )}
                        {duplicateCheckStatus === 'error' && (
                            <p className="text-red-500 text-sm mt-1">❌ 동일한 닉네임이 존재하거나 허용되지 않는 문자가 포함되어 있습니다.</p>
                        )}
                        <label className="text-sm text-[#333]">이메일 (아이디)</label>
                        <input
                            type="email"
                            value="ozschool1234@gmail.com"
                            disabled
                            className="border border-gray-200 bg-gray-100 rounded px-4 py-2 text-sm"
                        />
                    </div>
                </section>

                {/* Personal Info Section */}
                <section>
                    <h2 className="text-sm font-semibold text-[#5F00FF] mb-4">개인 정보 수정</h2>
                    <div className="flex flex-col gap-6">
                        <div>
                            <label className="block text-sm mb-1">이름</label>
                            <input
                                type="text"
                                value="김오즈"
                                disabled
                                className="border border-gray-200 bg-gray-100 rounded px-4 py-2 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">휴대전화</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-full text-sm"
                                />
                                <button
                                    onClick={() => {
                                        if (step === 'idle') {
                                            setStep('send');
                                        } else {
                                            setStep('resend');
                                            setTimer(300); // Reset timer when 인증번호 받기 or 재전송
                                            setVerificationCode('');
                                            setStatus(null);
                                            setShowVerification(true);
                                        }
                                    }}
                                    className="border border-[#5F00FF] text-[#5F00FF] px-4 py-2 h-[40px] rounded text-sm whitespace-nowrap bg-[#EFE6FC]"
                                    disabled={!phoneNumber || status === 'success'}
                                >
                                    {step === 'idle' ? '변경' : step === 'send' ? '인증번호 받기' : '재전송'}
                                </button>
                            </div>
                            {showVerification && (
                                <>
                                    <div className="flex gap-2 mt-4 items-center">
                                        <input
                                            type="text"
                                            placeholder="인증 번호"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            className={`border ${
                                                status === 'success' ? 'border-green-500'
                                                    : status === 'error' ? 'border-red-500'
                                                        : 'border-gray-300'
                                            } rounded px-4 py-2 w-full text-sm`}
                                        />
                                        {step !== 'idle' && (
                                            <span className="text-sm text-red-500 whitespace-nowrap">
                                            {`${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`}
                                          </span>
                                        )}
                                        <button
                                            disabled={status === 'success' || timer === 0}
                                            className={`border px-4 py-2 h-[40px] rounded text-sm whitespace-nowrap bg-purple-100 ${
                                                status === 'success' || timer === 0
                                                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                                    : 'border-[#5F00FF] text-[#5F00FF]'
                                            }`}
                                            onClick={() => {
                                                if (verificationCode === '123123') {
                                                    setStatus('success');
                                                    setTimer(0); // Stop the timer on success
                                                } else {
                                                    setShowVerification(true);
                                                    setStatus('error');
                                                }
                                            }}
                                        >
                                            인증번호 확인
                                        </button>
                                    </div>
                                    {status === 'success' && (
                                        <p className="text-green-600 text-sm mt-1">✅ Success</p>
                                    )}
                                    {status === 'error' && (
                                        <p className="text-red-500 text-sm mt-1">❌ 인증번호가 일치하지 않습니다.</p>
                                    )}
                                </>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">생년월일</label>
                            <input
                                type="text"
                                value="2000.12.25"
                                disabled
                                className="border border-gray-200 bg-gray-100 rounded px-4 py-2 w-full text-sm"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
