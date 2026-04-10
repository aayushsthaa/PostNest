import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required").min(5, "Title must be at least 5 characters"),
  body: z.string().trim().min(1, "Content is required").min(10, "Content must be at least 10 characters"),
});

interface AddPostFormProps {
  onAddPost: (title: string, body: string) => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setFormError('');

    const result = postSchema.safeParse({ title, body });

    if (!result.success) {
      setFormError(result.error.issues[0].message);
      return;
    }

    onAddPost(title, body);
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
        New Post
      </h3>
      
      <div className="flex flex-col gap-6">
        <Input 
          label="Post Title"
          placeholder="Min 5 characters..."
          value={title}
          onChange={(e) => { setTitle(e.target.value); setFormError(''); }}
        />
        
        <Input 
          label="Post Content"
          placeholder="Min 10 characters..."
          value={body}
          onChange={(e) => { setBody(e.target.value); setFormError(''); }}
        />

        {formError && <p className="text-red-500 text-[11px] font-bold uppercase">{formError}</p>}

        <Button variant="primary" type="submit" className="w-fit px-10 py-2.5 font-bold shadow-md active:scale-95 transition-all">
          Create Post
        </Button>
      </div>
    </form>
  );
};

export default AddPostForm;

