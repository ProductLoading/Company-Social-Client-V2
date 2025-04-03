import { gql } from '@apollo/client';

export const GET_FEED = gql`
query GetFeed {
  feed {
    postId
    title
    content
    postType
    visibilityScope
    createdAt
    updatedAt

    user {
      userId
      firstName
      lastName
    }

    files {
      fileId
      filename
      mimetype
      url
    }

    comments(limit: 2) {
      _id
      content
      createdAt

      files {
        _id
        fileUrl
        fileName
        fileType
      }
    }
  }
}
`;

