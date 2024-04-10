import IssueCard from '../IssueCard/IssueCard';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { IssueCardProps } from '../../types/types';

interface KanbanColumnProps {
  title: string;
  issues: IssueCardProps[];
  onDrop: (title: string, issueId: number) => void;
}

const KanbanColumn = ({ title, issues, onDrop }: KanbanColumnProps) => {

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const issueId = parseInt(e.dataTransfer.getData("text"), 10);
    onDrop(title, issueId);
    console.log('handleDrop')
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('handleDragOver')
  };

  return (
    <div className="d-flex justify-content-around w-100" onDrop={handleDrop} onDragOver={handleDragOver}>
      <Card className="flex-fill m-1 border border-secondary" style={{ maxWidth: '20rem' }}>
        <Card.Header as="h3" className="text-center">{title}</Card.Header>
        <ListGroup variant="flush">
          {issues.map(issue => (
            <ListGroup.Item key={issue.id} className="border-0 d-flex justify-content-center">
              <IssueCard {...issue} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>

  );
};

export default KanbanColumn;