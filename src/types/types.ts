export interface User {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
}
  
export interface Issue {
    id: number;
    title: string;
    state: 'open' | 'closed';
    comments: number;
    created_at: string;
    updated_at: string;
    user: User;
    assignee: User | null;
}
  
export interface IssueCardProps {
    id: number;
    number: number;
    title: string;
    state: 'open' | 'closed';
    comments: number;
    created_at: string;
    user: User;
}