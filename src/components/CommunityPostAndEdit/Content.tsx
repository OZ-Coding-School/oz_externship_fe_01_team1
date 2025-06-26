import React from 'react';
import MDEditor, {commands} from '@uiw/react-md-editor';
import {useImageUploadCommand} from '../../hooks/useImageUploadCommand';
import {handleImageDrop} from '../../utils/handleImageDrop';

interface Props {
    markdown: string;
    setMarkdown: React.Dispatch<React.SetStateAction<string>>;
}

export default function Content({markdown, setMarkdown}: Props) {
    const imageUploadCommand = useImageUploadCommand();

    return (
        <section>
            <div
                className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 mt-10 gap-10"
                onDrop={(e) => handleImageDrop(e, setMarkdown)}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className="bg-white" data-color-mode="light">
                    <MDEditor
                        value={markdown}
                        onChange={(val) => setMarkdown(val ?? '')}
                        height={400}
                        preview="live"
                        style={{backgroundColor: 'white', color: 'black'}}
                        previewOptions={{
                            className: 'bg-white text-black',
                            style: {backgroundColor: 'white', color: 'black'},
                            components: {
                                img: ({src, alt}) => (
                                    <img
                                        src={src}
                                        alt={alt}
                                        draggable
                                        onDragStart={(e) =>
                                            e.dataTransfer.setData('text/plain', `![${alt}](${src})`)
                                        }
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const draggedMarkdown = e.dataTransfer.getData('text/plain');
                                            setMarkdown((prev) => {
                                                if (!prev.includes(draggedMarkdown)) return prev;
                                                const removed = prev.replace(draggedMarkdown, '');
                                                return `${removed}\n${draggedMarkdown}`;
                                            });
                                        }}
                                        style={{maxWidth: '100%', cursor: 'move'}}
                                    />
                                ),
                            },
                        }}
                        commands={[...commands.getCommands(), imageUploadCommand]}
                    />
                </div>
            </div>
        </section>
    );
}