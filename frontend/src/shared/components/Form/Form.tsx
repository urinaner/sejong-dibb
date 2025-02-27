import React from 'react';
import styled from 'styled-components';

export interface FormField<T> {
  name: keyof T;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'textarea'
    | 'select'
    | 'file'
    | 'url'
    | 'date';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  accept?: string;
  helperText?: string;
}

interface FormProps<T> {
  fields: FormField<T>[];
  values: Partial<T>;
  onChange: (name: keyof T, value: any) => void;
  onFileChange?: (file: File | null, fieldName: keyof T) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitText?: string;
  cancelText?: string;
  title?: string;
  error?: string | null;
  filePreview?: Partial<Record<keyof T, string | null>>;
}

function Form<T>({
  fields,
  values,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitText = '저장',
  cancelText = '취소',
  title,
  error,
  filePreview,
}: FormProps<T>) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      onChange(name as keyof T, Number(value));
    } else {
      onChange(name as keyof T, value);
    }
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof T,
  ) => {
    const file = e.target.files?.[0] || null;
    if (onFileChange) {
      onFileChange(file, fieldName);
    }
  };

  return (
    <FormContainer>
      {title && <FormTitle>{title}</FormTitle>}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormElement onSubmit={onSubmit}>
        {fields.map((field) => (
          <FormGroup key={String(field.name)}>
            <Label>
              {field.label}
              {field.required && <RequiredMark>*</RequiredMark>}
            </Label>

            {field.type === 'textarea' ? (
              <TextArea
                name={String(field.name)}
                value={(values[field.name] as string) || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                rows={field.rows || 4}
              />
            ) : field.type === 'select' ? (
              <Select
                name={String(field.name)}
                value={(values[field.name] as string) || ''}
                onChange={handleChange}
                required={field.required}
              >
                <option value="">선택해주세요</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            ) : field.type === 'file' ? (
              <FileInputContainer>
                {filePreview && filePreview[field.name] ? (
                  <FilePreview>
                    <img
                      src={filePreview[field.name] as string}
                      alt="Preview"
                    />
                  </FilePreview>
                ) : (
                  <FilePlaceholder>파일을 선택해주세요</FilePlaceholder>
                )}
                <FileInputLabel>
                  파일 선택
                  <FileInput
                    type="file"
                    name={String(field.name)}
                    onChange={(e) => handleFileInputChange(e, field.name)}
                    accept={field.accept}
                  />
                </FileInputLabel>
              </FileInputContainer>
            ) : (
              <Input
                type={field.type}
                name={String(field.name)}
                value={(values[field.name] as string) || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}

            {field.helperText && <HelperText>{field.helperText}</HelperText>}
          </FormGroup>
        ))}

        <ButtonGroup>
          <CancelButton
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelText}
          </CancelButton>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? '처리 중...' : submitText}
          </SubmitButton>
        </ButtonGroup>
      </FormElement>
    </FormContainer>
  );
}

// Styled components
const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const RequiredMark = styled.span`
  color: #e53e3e;
  margin-left: 0.25rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilePreview = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FilePlaceholder = styled.div`
  width: 200px;
  height: 200px;
  border: 1px dashed #e2e8f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0aec0;
`;
const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  color: #4a5568;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  width: fit-content;

  &:hover {
    background-color: #edf2f7;
    border-color: #cbd5e0;
  }
`;

const HelperText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #718096;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;

  &:hover:not(:disabled) {
    background-color: #f7fafc;
    border-color: #cbd5e0;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #3182ce;
  border: 1px solid #2b6cb0;
  color: white;

  &:hover:not(:disabled) {
    background-color: #2b6cb0;
  }
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 4px;
  font-size: 0.9rem;
  border: 1px solid #feb2b2;
`;

export default Form;
