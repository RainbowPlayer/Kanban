import IssueCard from '../IssueCard/IssueCard';
import ListGroup from 'react-bootstrap/ListGroup';
import { IssueCardProps } from '../../types/types';

interface KanbanColumnProps {
  title: string;
  issues: IssueCardProps[];
}

const KanbanColumn = ({ title, issues }: KanbanColumnProps) => {

  return (
    <div>
      <h3>{title}</h3>
      <ListGroup>
        {issues.map(issue => (
          <ListGroup.Item key={issue.id}>
            <IssueCard {...issue} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default KanbanColumn;
