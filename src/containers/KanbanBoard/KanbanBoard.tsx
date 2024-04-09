import KanbanColumn from '../../components/KanbanColumn/KanbanColumn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchIssues } from '../../redux/features/issuesSlice';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store';

const KanbanBoard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { entities: issues, loading } = useSelector((state: RootState) => state.issues);

    useEffect(() => {
        dispatch(fetchIssues());
    }, [dispatch]);

    if (loading === 'pending') return <div>Loading...</div>;
    if (loading === 'failed') return <div>Error loading issues</div>;

    const toDoIssues = issues.filter(issue => issue.state === 'open' && !issue.assignee);
    const inProgressIssues = issues.filter(issue => issue.state === 'open' && issue.assignee);
    const doneIssues = issues.filter(issue => issue.state === 'closed');

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <KanbanColumn title="ToDo" issues={toDoIssues} />
            <KanbanColumn title="In Progress" issues={inProgressIssues} />
            <KanbanColumn title="Done" issues={doneIssues} />
        </div>
    );
};

export default KanbanBoard;
