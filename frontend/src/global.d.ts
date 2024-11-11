declare module 'react-quill' {
  import { Component } from 'react';

  interface QuillEditorProps {
    value?: string;
    onChange?: (
      content: string,
      delta: any,
      source: string,
      editor: any,
    ) => void;
    placeholder?: string;
    theme?: string;
  }

  class QuillEditor extends Component<QuillEditorProps> {}
  export = QuillEditor;
}
