import './tag.css';

interface TagProps {
  label: string;
  variant?: 'default' | 'category' | 'status';
  tone?: 'completed' | 'in_progress' | 'production';
  className?: string;
}

function Tag({ label, variant = 'default', tone, className = '' }: TagProps) {
  const classes = [
    variant === 'default' ? 'tag' : `tag tag--${variant}`,
    tone ? `tag--${tone}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{label}</span>;
}

export default Tag;