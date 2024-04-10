import KanbanColumn from '../../components/KanbanColumn/KanbanColumn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchIssues } from '../../redux/features/issuesSlice';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { Issue, IssueCardProps } from '../../types/types'
import { updateIssueState } from '../../redux/features/issuesSlice';
import RepoLoader from '../../components/Repoloader/Repoloader';

const KanbanBoard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { entities: issues, loading } = useSelector((state: RootState) => state.issues);
    const [localIssues, setLocalIssues] = useState<IssueCardProps[]>([]);
    const [isDragged, setIsDragged] = useState(false);

    const onDragStart = (e: { dataTransfer: { setData: (arg0: string, arg1: any) => void; }; }, id: { toString: () => any; }) => {
        e.dataTransfer.setData("text", id.toString());
        console.log('onDragStart');
        setIsDragged(true);
    };

    const onDrop = (title: string, droppedIssueId: number) => {
        let newState: 'open' | 'in progress' | 'closed' = 'open'; 

        if (title === "ToDo") {
            newState = 'open';
        } else if (title === "In Progress") {
            newState = 'in progress';
        } else if (title === "Done") {
            newState = 'closed';
        }
        
        dispatch(updateIssueState({ id: droppedIssueId, newState }));
    };

    const handleRepoLoad = (owner: string, repo: string) => {
        dispatch(fetchIssues({ owner, repo }));
    };

    useEffect(() => {
        if (issues.length > 0 && localIssues.length === 0 && !isDragged) {
            setLocalIssues(transformIssuesToIssueCardProps(issues));
        }
    }, [issues, isDragged]);

    if (loading === 'pending') return <div>Loading...</div>;
    if (loading === 'failed') return <div>Error loading issues</div>;

    const transformIssuesToIssueCardProps = (issues: Issue[]): IssueCardProps[] => {
        return issues.map(issue => ({
            ...issue,
            number: issue.id,
            onDragStart: onDragStart
        }));
    };

    const toDoIssues = issues.filter(issue => issue.state === 'open' && !issue.assignee);
    const inProgressIssues = issues.filter(issue => issue.state === 'in progress' || (issue.state === 'open' && issue.assignee));
    const doneIssues = issues.filter(issue => issue.state === 'closed');    

    return (
        <div>
            <RepoLoader onRepoLoad={handleRepoLoad}/>
            <div className="d-flex justify-content-around w-100">
            <KanbanColumn title="ToDo" issues={transformIssuesToIssueCardProps(toDoIssues)} onDrop={onDrop} />
            <KanbanColumn title="In Progress" issues={transformIssuesToIssueCardProps(inProgressIssues)} onDrop={onDrop} />
            <KanbanColumn title="Done" issues={transformIssuesToIssueCardProps(doneIssues)} onDrop={onDrop} />
            </div>
        </div>
        
    );
};

export default KanbanBoard;