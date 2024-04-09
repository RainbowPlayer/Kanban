import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { IssueCardProps } from '../../types/types';

const IssueCard = ({ number, title, state, comments, created_at, user }: IssueCardProps) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          #{number} opened on {new Date(created_at).toLocaleDateString()} by <a href={user.html_url}>{user.login}</a>
        </Card.Subtitle>
        <Card.Text>
          <Badge bg={state === 'open' ? 'primary' : 'secondary'}>{state}</Badge>
          <Badge bg="info" style={{ marginLeft: '0.5rem' }}>
            Comments: {comments}
          </Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default IssueCard;
