import React from "react";

const getInitials = (name) => {
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[1][0]).toUpperCase();
};

const UserBadge = ({ name, role }) => {
  const initials = getInitials(name);

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
        {initials}
      </div>
      <div>
        <p className="text-sm font-medium">{name}</p>
        {role && <p className="text-xs text-gray-500 capitalize">{role}</p>}
      </div>
    </div>
  );
};

export default UserBadge;
