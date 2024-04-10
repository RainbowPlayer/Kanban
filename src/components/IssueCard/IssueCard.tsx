import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { IssueCardProps } from '../../types/types';

const IssueCard = ({ id, number, title, state, comments, created_at, user, onDragStart }: IssueCardProps) => {
  const cardBg = state === 'open' ? 'light' : 'dark';
  const textColor = state === 'open' ? 'dark' : 'white';

  return (
    <Card 
      bg={cardBg} 
      text={textColor}
      style={{ width: '18rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,.2)' }}
      onDragStart={(e) => onDragStart(e, id)}
      draggable="true"
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2">
          #{number} opened on {new Date(created_at).toLocaleDateString()} by <a href={user.html_url}>{user.login}</a>
        </Card.Subtitle>
        <Card.Text>
          <Badge pill bg={state === 'open' ? 'primary' : 'secondary'}>{state}</Badge>
          {' '}
          <Badge pill bg="info">
            Comments: {comments}
          </Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default IssueCard;