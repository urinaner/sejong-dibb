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

// src/types/global.d.ts
declare interface RequireContext {
  keys(): string[];
  (id: string): string;
  <T>(id: string): T;
  resolve(id: string): string;
  id: string;
}

declare interface NodeRequire {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
  ): RequireContext;
}
