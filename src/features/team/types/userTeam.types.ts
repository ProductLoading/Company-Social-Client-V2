export interface UserTeamEntity {
    id: string;
    joinedAt: string;
    user: {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
  