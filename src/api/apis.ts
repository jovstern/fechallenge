export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    catchPhrase: string;
    comments: string;
}

export type Reviewer = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    catchPhrase: string;
    comments: string;
}

export const USERS_URL = 'http://localhost:3001/users';
export const REVIEWERS_URL = 'http://localhost:3001/reviewers';
