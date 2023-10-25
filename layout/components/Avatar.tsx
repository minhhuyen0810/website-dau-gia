import React from 'react';

interface AvatarProps {
  username: string;
}

const Avatar: React.FC<AvatarProps> = ({ username }) => {
  const initials = username ? username[0].toUpperCase() : '';

  return <div className="avatar">{initials}</div>;
};

export default Avatar;
