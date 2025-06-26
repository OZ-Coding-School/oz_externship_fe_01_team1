import type {ICommand, TextState, TextAreaTextApi} from '@uiw/react-md-editor';

const createBlobURL = (file: File): string => URL.createObjectURL(file);

export const useImageUploadCommand = (): ICommand => ({
    name: 'image-upload',
    keyCommand: 'image-upload',
    buttonProps: {'aria-label': 'Insert image'},
    icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0
      1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5
      12l4.5 6H5l3.5-4.5z"/>
        </svg>
    ),
    execute: async (_: TextState, api: TextAreaTextApi) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            if (file.size > 3 * 1024 * 1024) {
                alert('이미지는 3MB 이하만 업로드할 수 있습니다.');
                return;
            }

            const blobUrl = createBlobURL(file);
            const markdownImage = `![이미지 설명](${blobUrl})`;
            api.replaceSelection(markdownImage);
        };
        input.click();
    },
});