// src/features/post-file/PostFileItem.tsx
import React from 'react';
import type { PostFile } from './types';

interface Props {
  file: PostFile;
}

const PostFileItem: React.FC<Props> = ({ file }) => {
  return (
    <li>
      <a href={file.url} target="_blank" rel="noreferrer">
        {file.filename}
      </a>{' '}
      ({file.mimetype})
    </li>
  );
};

export default PostFileItem;
